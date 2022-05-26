import execa from 'execa';
import logger from 'consola';
import { join } from 'path';
import {
  remove,
  readFile,
  writeFile,
  existsSync,
  readJsonSync,
  outputJsonSync,
} from 'fs-extra';
import type { Metrics } from './types';

export const ROOT_PATH = join(__dirname, '..', '..');
export const MODERN_PATH = join(ROOT_PATH, 'modern.js');
export const METRICS_PATH = join(ROOT_PATH, 'metrics');
export const CASES_SRC_PATH = join(ROOT_PATH, 'cases');
export const CASES_DIST_PATH = join(MODERN_PATH, 'cases');

export function saveMetrics(metrics: Metrics) {
  const { CASE_NAME } = process.env;
  if (!CASE_NAME) {
    return;
  }

  const jsonName = `${CASE_NAME}.json`;
  const jsonPath = join(METRICS_PATH, jsonName);

  if (existsSync(jsonPath)) {
    const content: Metrics = readJsonSync(jsonPath);
    outputJsonSync(jsonPath, { ...content, ...metrics }, { spaces: 2 });
  } else {
    outputJsonSync(jsonPath, metrics, { spaces: 2 });
  }

  logger.success(`Successfully write metrics to ${jsonName}.`);
  logger.log(JSON.stringify(metrics, null, 2) + '\n');
}

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

export async function cleanCache(casePath: string) {
  await remove(join(casePath, 'node_modules', '.cache'));
  await remove(join(casePath, 'node_modules', '.modern.js'));
}

export async function cloneRepo(repoURL: string, cwd: string) {
  return execa('git', ['clone', '--single-branch', '--depth', '1', repoURL], {
    cwd,
    stderr: 'inherit',
    stdout: 'inherit',
  });
}

export async function updateFile(
  filePath: string,
  replaceFn: (content: string) => string,
) {
  const content = await readFile(filePath, 'utf-8');
  const newContent = replaceFn(content);

  if (newContent !== content) {
    await writeFile(filePath, newContent);
  }
}
