import { join } from 'path';
import {
  copy,
  ensureDir,
  outputJson,
  readFile,
  readJson,
  remove,
} from 'fs-extra';
import {
  ROOT_PATH,
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
  const pkgJson = await readJson(pkgJsonPath);

  // override workspace protocol
  Object.keys(pkgVersions).forEach(key => {
    if (pkgJson.dependencies[key]) {
      pkgJson.dependencies[key] = pkgVersions[key];
    }
    if (pkgJson.devDependencies[key]) {
      pkgJson.devDependencies[key] = pkgVersions[key];
    }
  });

  await outputJson(pkgJsonPath, pkgJson, { spaces: 2 });
};

const parseLockFile = async (casePath: string) => {
  const parser = require('@yarnpkg/lockfile');
  const lockFile = join(casePath, 'yarn.lock');
  const content = await readFile(lockFile, 'utf-8');
  const result = parser.parse(content);
  if (result.type === 'success') {
    return result.object;
  }
  throw new Error(`failed to parse ${lockFile}`);
};

const runInstall = async (casePath: string) => {
  const coldStartTime = performance.now();
  await runCommand(casePath, 'yarn --registry https://registry.npmjs.org/');
  const coldInstallTime = performance.now() - coldStartTime;

  const hotStartTime = performance.now();
  await runCommand(casePath, 'yarn --registry https://registry.npmjs.org/');
  const hotInstallTime = performance.now() - hotStartTime;

  return {
    hotInstallTime,
    coldInstallTime,
  };
};

const getDepCount = async (casePath: string) => {
  const lockInfo = await parseLockFile(casePath);
  return Object.keys(lockInfo).length;
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

export const yarnInstall = async (productName: string, caseName: string) => {
  const repoPath = getRepoPath(getRepoName(productName));
  const tempPath = getTempPath(productName);
  const casePath = join(tempPath, caseName);
  const pkgJsonPath = join(tempPath, caseName, 'package.json');
  const rootPkgJsonPath = join(ROOT_PATH, 'package.json');

  await copyCase(productName, caseName, casePath);
  await setPkgVersion(repoPath, pkgJsonPath);

  // to prevent Usage Error: This project is configured to use pnpm
  const rootPkgJson = await readJson(rootPkgJsonPath);
  const rootPkgJsonBak = await readJson(rootPkgJsonPath);
  delete rootPkgJson.packageManager;
  await outputJson(rootPkgJsonPath, rootPkgJson, { spaces: 2 });

  const { hotInstallTime, coldInstallTime } = await runInstall(casePath);

  await outputJson(rootPkgJsonPath, rootPkgJsonBak, { spaces: 2 });

  const installSize = await getInstallSize(casePath);
  const depCount = await getDepCount(casePath);

  return saveMetrics({
    coldInstallTime: coldInstallTime,
    hotInstallTime: hotInstallTime,
    dependenciesCount: depCount,
    installSize: installSize,
  });
};
