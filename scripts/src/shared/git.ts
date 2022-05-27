import execa from 'execa';
import { ROOT_PATH } from './constant';

export async function cloneRepo() {
  const token = process.argv[2];
  const { GITHUB_ACTOR } = process.env;
  const repoURL = token
    ? `https://${GITHUB_ACTOR}:${token}@github.com/modern-js-dev/modern.js.git`
    : 'git@github.com:modern-js-dev/modern.js.git';

  return execa('git', ['clone', '--single-branch', '--depth', '1', repoURL], {
    cwd: ROOT_PATH,
    stderr: 'inherit',
    stdout: 'inherit',
  });
}

export async function getCommitId(cwd: string) {
  const { stdout } = await execa('git', ['rev-parse', '--short', 'HEAD'], { cwd });
  return stdout;
}

export async function getCommitTime(cwd: string) {
  const { stdout } = await execa('git', ['show', '-s', '--format=%ct'], {
    cwd,
  });
  return Number(stdout) * 1000;
}
