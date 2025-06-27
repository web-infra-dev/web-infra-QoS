import execa from 'execa';
import { copy, pathExists, remove } from 'fs-extra';
import { updateFile } from './fs';
import {
  addContentToPnpmPackages,
  getCaseDistPath,
  getCaseSrcPath,
  getRepoName,
  getRepoPath,
  runCommand,
} from './utils';
import { join } from 'path';
import { ROOT_PATH } from './constant';

export async function cloneRepo(productName: string, caseName: string) {
  const repoName = getRepoName(productName);
  const localRepoPath = getRepoPath(repoName);
  const { COMMIT_ID, PR_NUMBER } = process.env;

  if (PR_NUMBER) {
    await remove(localRepoPath);
  }

  if (!(await pathExists(localRepoPath))) {
    const repoURL = `https://github.com/web-infra-dev/${repoName}.git`;

    const options = ['clone'];

    if (!COMMIT_ID && !PR_NUMBER) {
      options.push('--single-branch');
      options.push('--depth', '1');
    }

    await execa('git', [...options, repoURL], {
      cwd: ROOT_PATH,
      stderr: 'inherit',
      stdout: 'inherit',
    });

    if (COMMIT_ID) {
      await execa('git', ['checkout', COMMIT_ID], {
        cwd: localRepoPath,
        stderr: 'inherit',
        stdout: 'inherit',
      });
    }

    if (PR_NUMBER) {
      const branchName = String(new Date().valueOf());
      await execa(
        'git',
        ['fetch', 'origin', `pull/${PR_NUMBER}/head:${branchName}`],
        {
          cwd: localRepoPath,
          stderr: 'inherit',
          stdout: 'inherit',
        },
      );
      await execa('git', ['checkout', `${branchName}`], {
        cwd: localRepoPath,
        stderr: 'inherit',
        stdout: 'inherit',
      });
    }
  }

  if (process.env.ONLY_INSTALL_SIZE === 'true') {
    return;
  }

  if (productName === 'RSPACK') {
    await runCommand(localRepoPath, 'corepack enable && pnpm -v');
    await runCommand(localRepoPath, 'pnpm i');
    return;
  }

  await copy(
    join(getCaseSrcPath(productName), caseName),
    join(getCaseDistPath(productName), caseName),
  );

  // run prepare before linking cases
  await runCommand(localRepoPath, 'corepack enable && pnpm -v');
  await runCommand(localRepoPath, 'pnpm i --ignore-scripts');
  await runCommand(localRepoPath, 'pnpm prepare');

  // add cases folder to workspace config
  await updateFile(join(localRepoPath, 'pnpm-workspace.yaml'), content =>
    addContentToPnpmPackages(content, "- 'cases/*'"),
  );

  // rename prepare scripts to avoid executing
  // pnpm link will execute complete process of pnpm install in pnpm v10.
  await updateFile(
    join(localRepoPath, 'package.json'),
    content => `${content.replace(`"prepare":`, `"prepare-ignore":`)}`,
  );

  await runCommand(localRepoPath, 'pnpm link ../scripts');

  // since rsbuild set hoist-pattern[]=[], we manually delete this config to run cases deps install
  if (productName === 'RSBUILD' && caseName === 'rsbuild-arco-pro') {
    await updateFile(join(localRepoPath, '.npmrc'), content =>
      content.replace(/^\s*hoist-pattern\[\]=\[\].*$/gm, ''),
    );
    await runCommand(localRepoPath, 'pnpm i --force --no-frozen-lockfile');
  }

  await runCommand(
    localRepoPath,
    'pnpm i --ignore-scripts --no-frozen-lockfile',
  );
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
