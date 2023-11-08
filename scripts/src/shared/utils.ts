import execa from 'execa';
import { join } from 'path';
import { ROOT_PATH } from './constant';
import { PRODUCT_NAME, REPO_NAME } from './product';

export async function runCommand(
  cwd: string,
  command: string,
  env?: Partial<NodeJS.ProcessEnv>,
) {
  const [file, ...args] = command.split(' ');
  return execa(file, args, {
    cwd,
    shell: true,
    stderr: 'inherit',
    stdout: 'inherit',
    env: env
      ? {
          ...process.env,
          ...env,
        }
      : process.env,
  });
}

export function getRepoName(product: string) {
  return REPO_NAME[product as keyof typeof REPO_NAME];
}

export function getRepoPath(repoName: string) {
  return join(ROOT_PATH, repoName);
}

export function getCaseDistPath(product: string) {
  return join(ROOT_PATH, REPO_NAME[product as keyof typeof REPO_NAME], 'cases');
}

export function getCaseSrcPath(product: string) {
  return join(
    ROOT_PATH,
    'cases',
    PRODUCT_NAME[product as keyof typeof PRODUCT_NAME],
  );
}

export function getTempPath(product: string) {
  return join(
    ROOT_PATH,
    'temp',
    PRODUCT_NAME[product as keyof typeof PRODUCT_NAME],
  );
}

export function getDataPath(product: string) {
  return join(
    ROOT_PATH,
    'data',
    PRODUCT_NAME[product as keyof typeof PRODUCT_NAME],
  );
}

export function getRemoteDataUrl(product: string) {
  return `https://github.com/web-infra-dev/web-infra-QoS/raw/gh-pages/data/${
    PRODUCT_NAME[product as keyof typeof PRODUCT_NAME]
  }`;
}

export function removeHash(filename: string) {
  if (filename.endsWith('.js') || filename.endsWith('.css')) {
    const pairs = filename.split('.');
    const ext = pairs.pop();
    pairs.pop();
    return [...pairs, ext].join('.');
  }
  return filename;
}

export function sum(files: Record<string, number>) {
  return Object.values(files).reduce((ret, num) => ret + num, 0);
}
