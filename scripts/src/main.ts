import { copy, pathExists } from 'fs-extra';
import { dev } from './runners/dev';
import { build } from './runners/build';
import {
  cloneRepo,
  ROOT_PATH,
  runCommand,
  updateFile,
  MODERN_PATH,
  CASES_SRC_PATH,
  CASES_DIST_PATH,
} from './shared';
import { join } from 'path';

const tasks = [
  {
    caseName: 'mwa-basic',
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

  await cloneRepo('git@github.com:modern-js-dev/modern.js.git', ROOT_PATH);
  await copy(CASES_SRC_PATH, CASES_DIST_PATH);

  // add cases folder to workspace config
  await updateFile(
    join(MODERN_PATH, 'pnpm-workspace.yaml'),
    content => `${content}\n - 'cases/*'`,
  );

  await runCommand(MODERN_PATH, 'pnpm link ../scripts');
  await runCommand(MODERN_PATH, 'pnpm install --ignore-scripts');
  await runCommand(MODERN_PATH, 'pnpm prepare');
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
