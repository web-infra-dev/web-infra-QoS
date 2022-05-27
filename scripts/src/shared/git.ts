import execa from 'execa';
import { copy, pathExists } from 'fs-extra';
import { updateFile } from './fs';
import { runCommand } from './utils';
import { join } from 'path';
import {
  ROOT_PATH,
  MODERN_PATH,
  CASES_DIST_PATH,
  CASES_SRC_PATH,
} from './constant';

export async function cloneRepo() {
  if (await pathExists(MODERN_PATH)) {
    return;
  }

  const { GITHUB_ACTOR, GITHUB_TOKEN, COMMIT_ID } = process.env;
  const repoURL = GITHUB_TOKEN
    ? `https://${GITHUB_ACTOR}:${GITHUB_TOKEN}@github.com/modern-js-dev/modern.js.git`
    : 'git@github.com:modern-js-dev/modern.js.git';

  const options = ['clone', '--single-branch'];
  if (!COMMIT_ID) {
    options.push('--depth', '1');
  }

  await execa('git', [...options, repoURL], {
    cwd: ROOT_PATH,
    stderr: 'inherit',
    stdout: 'inherit',
  });

  if (COMMIT_ID) {
    await execa('git', ['checkout', COMMIT_ID], {
      cwd: ROOT_PATH,
      stderr: 'inherit',
      stdout: 'inherit',
    });
  }

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

export async function getCommitId(cwd: string) {
  const { stdout } = await execa('git', ['rev-parse', '--short', 'HEAD'], {
    cwd,
  });
  return stdout;
}

export async function getCommitTime(cwd: string) {
  const { stdout } = await execa('git', ['show', '-s', '--format=%ct'], {
    cwd,
  });
  return Number(stdout) * 1000;
}
