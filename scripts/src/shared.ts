import execa from 'execa';
import logger from 'consola';
import { join } from 'path';
import { readJsonSync, writeJsonSync, existsSync, remove } from 'fs-extra';
import type { Metrics } from './types';

export const CASES_PATH = join(__dirname, '..', '..', 'cases');
export const METRICS_FILE = 'metrics.json';

export function saveTempMetrics(outputPath: string, metrics: Partial<Metrics>) {
  const jsonPath = join(outputPath, METRICS_FILE);

  if (existsSync(jsonPath)) {
    const content = readJsonSync(jsonPath) as Partial<Metrics>;
    writeJsonSync(jsonPath, { ...content, ...metrics }, { spaces: 2 });
  } else {
    writeJsonSync(jsonPath, metrics, { spaces: 2 });
  }

  logger.success(
    `Successfully write metrics to ${jsonPath.replace(CASES_PATH, '')}.`,
  );
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
