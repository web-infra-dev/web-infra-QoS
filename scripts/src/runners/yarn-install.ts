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
  CASES_SRC_PATH,
  MODERN_PATH,
  TEMP_PATH,
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

const getModernPkgInfo = async () => {
  const pkgs = fastGlob.sync(
    join(MODERN_PATH, 'packages', '**', 'package.json'),
    {
      ignore: ['!**/node_modules/**', '!**/tests/**', '!**/compiled/**'],
    },
  );

  const jsons = await Promise.all(pkgs.map(pkg => readJson(pkg)));
  const names = jsons.map(json => json.name);

  return jsons
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
    });
};

const copyCase = async (caseName: string, casePath: string) => {
  await remove(TEMP_PATH);
  await ensureDir(TEMP_PATH);
  await copy(join(CASES_SRC_PATH, caseName), casePath);
};

const getResolutions = async (pkgJsonPath: string) => {
  const modernPkgInfo = await getModernPkgInfo();
  const modernPkgNames = modernPkgInfo.map(item => item.json.name);
  const pkgJson = await readJson(pkgJsonPath);
  const allDeps = Object.keys(getAllDeps(pkgJson));
  const modernDeps = allDeps.filter(dep => modernPkgNames.includes(dep));
  const resolutions: Record<string, string> = {};

  const addResolution = (depName: string) => {
    if (resolutions[depName]) {
      return;
    }
    const matchedJson = modernPkgInfo.find(item => item.json.name === depName);

    if (!matchedJson) {
      console.log('not matched', depName);
      return;
    }

    if (matchedJson.json.version) {
      resolutions[depName] = matchedJson.json.version;
    }

    matchedJson.innerDeps.forEach(addResolution);
  };

  modernDeps.forEach(addResolution);

  return resolutions;
};

const setResolutions = async (pkgJsonPath: string) => {
  const resolutions = await getResolutions(pkgJsonPath);
  const pkgJson = await readJson(pkgJsonPath);

  // override workspace protocol
  Object.keys(resolutions).forEach(key => {
    if (pkgJson.dependencies[key]) {
      pkgJson.dependencies[key] = resolutions[key];
    }
    if (pkgJson.devDependencies[key]) {
      pkgJson.devDependencies[key] = resolutions[key];
    }
  });

  await outputJson(
    pkgJsonPath,
    {
      ...pkgJson,
      resolutions,
    },
    { spaces: 2 },
  );
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

  return new Promise<number>((resolve, reject) => {
    getFolderSize(nodeModulesPath, (err: Error, size: number) => {
      if (err) {
        reject(err);
      }
      resolve(size);
    });
  });
};

export const yarnInstall = async (caseName: string) => {
  const casePath = join(TEMP_PATH, caseName);
  const pkgJsonPath = join(TEMP_PATH, caseName, 'package.json');

  await copyCase(caseName, casePath);
  await setResolutions(pkgJsonPath);

  const { hotInstallTime, coldInstallTime } = await runInstall(casePath);
  const installSize = await getInstallSize(casePath);
  const depCount = await getDepCount(casePath);

  return saveMetrics({
    yarnColdInstallTime: coldInstallTime,
    yarnHotInstallTime: hotInstallTime,
    yarnDependenciesCount: depCount,
    yarnInstallSize: installSize,
  });
};
