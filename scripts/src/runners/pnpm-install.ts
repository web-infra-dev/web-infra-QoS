import { join } from 'path';
import {
  copy,
  ensureDir,
  outputJson,
  readJson,
  remove,
  rename,
  writeFile,
} from 'fs-extra';
import {
  getCaseSrcPath,
  getRepoName,
  getRepoPath,
  getTempPath,
  runCommand,
  saveMetrics,
} from '../shared';
import fastGlob from 'fast-glob';
import { performance } from 'perf_hooks';
import getFolderSize from 'get-folder-size';
import { familySync as getLibcFamilySync } from 'detect-libc';

const getAllDeps = (json: Record<string, Record<string, string>>) => ({
  ...json.dependencies,
  ...json.devDependencies,
});

const getRepoPkgInfo = async (repoPath: string) => {
  const pkgs = fastGlob.sync(join(repoPath, 'packages', '**', 'package.json'), {
    ignore: ['!**/node_modules/**', '!**/tests/**', '!**/compiled/**'],
  });

  const jsons = await Promise.all(pkgs.map(pkg => readJson(pkg)));
  const names = jsons.map(json => json.name);

  return (
    jsons
      // ignore private packages
      .filter(json => !json.private)
      .map(json => {
        const innerDeps: string[] = [];
        const allDeps = getAllDeps(json);

        Object.keys(allDeps).forEach(key => {
          if (names.includes(key)) {
            innerDeps.push(key);
          }
        });

        return {
          json,
          innerDeps,
        };
      })
  );
};

const copyCase = async (
  productName: string,
  caseName: string,
  casePath: string,
) => {
  const tempPath = getTempPath(productName);
  await remove(tempPath);
  await ensureDir(tempPath);
  await copy(join(getCaseSrcPath(productName), caseName), casePath);
};

const getPkgVersions = async (repoPath: string, pkgJsonPath: string) => {
  const repoPkgInfo = await getRepoPkgInfo(repoPath);
  const repoPkgNames = repoPkgInfo.map(item => item.json.name);
  const pkgJson = await readJson(pkgJsonPath);
  const allDeps = Object.keys(getAllDeps(pkgJson));
  const repoDeps = allDeps.filter(dep => repoPkgNames.includes(dep));
  const pkgVersions: Record<string, string> = {};

  const addResolution = (depName: string) => {
    if (pkgVersions[depName]) {
      return;
    }
    const matchedJson = repoPkgInfo.find(item => item.json.name === depName);

    if (!matchedJson) {
      console.log('not matched', depName);
      return;
    }

    if (matchedJson.json.version) {
      pkgVersions[depName] = matchedJson.json.version;
    }

    matchedJson.innerDeps.forEach(addResolution);
  };

  repoDeps.forEach(addResolution);

  return pkgVersions;
};

const setPkgVersion = async (repoPath: string, pkgJsonPath: string) => {
  const pkgVersions = await getPkgVersions(repoPath, pkgJsonPath);
  let pkgJson = await readJson(pkgJsonPath);

  // override workspace protocol
  Object.keys(pkgVersions).forEach(key => {
    if (pkgJson.dependencies?.[key]) {
      pkgJson.dependencies[key] = pkgVersions[key];
    }
    if (pkgJson.devDependencies?.[key]) {
      pkgJson.devDependencies[key] = pkgVersions[key];
    }
  });

  // use supportedArchitectures, see https://github.com/pnpm/pnpm/releases/tag/v8.10.0
  pkgJson = {
    ...pkgJson,
    packageManager: 'pnpm@8.10.0',
    pnpm: {
      supportedArchitectures: {
        os: ['linux'],
        cpu: ['x64'],
        libc: ['glibc'],
      },
    },
  };

  await outputJson(pkgJsonPath, pkgJson, { spaces: 2 });
};

const runInstall = async (casePath: string) => {
  const coldStartTime = performance.now();
  await runCommand(casePath, 'corepack enable && pnpm -v');
  await runCommand(
    casePath,
    'pnpm install --registry https://registry.npmjs.org/',
  );
  const coldInstallTime = performance.now() - coldStartTime;

  const hotStartTime = performance.now();
  await runCommand(
    casePath,
    'pnpm install --registry https://registry.npmjs.org/',
  );
  const hotInstallTime = performance.now() - hotStartTime;

  return {
    hotInstallTime,
    coldInstallTime,
  };
};

const getInstallSize = async (casePath: string) => {
  const nodeModulesPath = join(casePath, 'node_modules');

  await remove(join(nodeModulesPath, '.cache'));

  if (casePath.includes('modernjs')) {
    await remove(join(nodeModulesPath, '.modern.js'));
  }

  return new Promise<number>((resolve, reject) => {
    getFolderSize(nodeModulesPath, (err: Error, size: number) => {
      if (err) {
        reject(err);
      }
      resolve(size);
    });
  });
};

const getDepCount = async (casePath: string) => {
  const { readWantedLockfile } = await import('@pnpm/lockfile-file');
  const lockfile = await readWantedLockfile(casePath, {
    ignoreIncompatible: true,
  });
  const packages = lockfile?.packages || {};

  return Object.keys(packages).length;
};

export const pnpmInstall = async (productName: string, caseName: string) => {
  console.log('getLibcFamilySync: ', getLibcFamilySync());
  const repoPath = getRepoPath(getRepoName(productName));
  const tempPath = getTempPath(productName);
  const casePath = join(tempPath, caseName);
  const pkgJsonPath = join(tempPath, caseName, 'package.json');

  await copyCase(productName, caseName, casePath);
  await setPkgVersion(repoPath, pkgJsonPath);

  let workspacePath = join(casePath, '../../../pnpm-workspace.yaml');
  let backupPath = join(casePath, '../../../pnpm-workspace-backup.yaml');

  await copy(workspacePath, backupPath);
  await remove(workspacePath);

  let npmrcPath = join(casePath, '.npmrc');

  let content = `auto-install-peers=false\npackage-import-method=copy\nshamefully-hoist=true\nnode-linker=hoisted`;

  await writeFile(npmrcPath, content);

  const { hotInstallTime, coldInstallTime } = await runInstall(casePath);

  await rename(backupPath, workspacePath);

  const installSize = await getInstallSize(casePath);
  const depCount = await getDepCount(casePath);

  await runCommand(join(casePath, 'node_modules/@rspack'), 'ls -l');

  return saveMetrics({
    coldInstallTime: coldInstallTime,
    hotInstallTime: hotInstallTime,
    dependenciesCount: depCount,
    installSize: installSize,
  });
};
