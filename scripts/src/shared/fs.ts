import { join } from 'path';
import {
  remove,
  readFile,
  outputFile,
  outputJsonSync,
  readJsonSync,
  existsSync,
} from 'fs-extra';
import logger from 'consola';
import { METRICS_PATH } from './constant';
import type { Metrics } from './types';

export async function cleanCache(casePath: string) {
  await remove(join(casePath, 'node_modules', '.cache'));
  await remove(join(casePath, 'node_modules', '.modern.js'));
}

export async function updateFile(
  filePath: string,
  replaceFn: (content: string) => string,
) {
  const content = await readFile(filePath, 'utf-8');
  const newContent = replaceFn(content);

  if (newContent !== content) {
    await outputFile(filePath, newContent);
  }
}

export function saveMetrics(metrics: Metrics) {
  const { CASE_NAME } = process.env;
  if (!CASE_NAME) {
    logger.log(JSON.stringify(metrics, null, 2) + '\n');
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
