import { copy, pathExists } from 'fs-extra';
import { dev } from './runners/dev';
import { build } from './runners/build';
import {
  cloneRepo,
  runCommand,
  updateFile,
  MODERN_PATH,
  CASES_SRC_PATH,
  CASES_DIST_PATH,
} from './shared';
import { join } from 'path';

const tasks = [
  {
    caseName: 'mwa-minimal',
    runners: [dev, build],
  },
  {
    caseName: 'mwa-initial',
    runners: [dev, build],
  },
  {
    caseName: 'mwa-arco-pro',
    runners: [dev, build],
  },
];

async function cloneModernJs() {
  if (await pathExists(MODERN_PATH)) {
    return;
  }

  await cloneRepo();
  await copy(CASES_SRC_PATH, CASES_DIST_PATH);

  // run prepare before linking cases
  await runCommand(MODERN_PATH, 'pnpm i --ignore-scripts');
  await runCommand(MODERN_PATH, 'pnpm prepare');

  // add cases folder to workspace config
  await updateFile(
    join(MODERN_PATH, 'pnpm-workspace.yaml'),
    content => `${content}\n - 'cases/*'`,
  );

  // lock @types/react version
  await updateFile(join(MODERN_PATH, 'package.json'), content => {
    const json = JSON.parse(content);
    json.pnpm = {
      overrides: {
        ...json.pnpm?.overrides,
        '@types/react': '^17',
        '@types/react-dom': '^17',
      },
    };
    return JSON.stringify(json, null, 2);
  });

  await runCommand(MODERN_PATH, 'pnpm link ../scripts');
  await runCommand(MODERN_PATH, 'pnpm i --ignore-scripts --no-frozen-lockfile');
}

async function main() {
  await cloneModernJs();

  for (const task of tasks) {
    for (const runner of task.runners) {
      await runner(task.caseName);
    }
  }
}

main();
