import { join } from 'path';
import {
  remove,
  readFile,
  readJson,
  outputJson,
  outputFile,
  pathExists,
} from 'fs-extra';
import logger from 'consola';
import { COMMITS_INFO_PATH, DATA_PATH, MODERN_PATH } from './constant';
import type { Metrics } from './types';
import { getCommitId, getCommitTime } from './git';

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

export async function saveCommitInfo(id: string, time: number) {
  if (await pathExists(COMMITS_INFO_PATH)) {
    const content: Array<{ id: string; time: number }> = await readJson(
      COMMITS_INFO_PATH,
    );

    if (content.find(item => item.id === id)) {
      return;
    }

    content.push({ id, time });
    content.sort((a, b) => a.time - b.time);
    await outputJson(COMMITS_INFO_PATH, content, { spaces: 2 });
  } else {
    outputJson(COMMITS_INFO_PATH, [{ id, time }]);
  }
}

export async function saveMetrics(metrics: Metrics) {
  const { CASE_NAME } = process.env;
  if (!CASE_NAME) {
    logger.log(JSON.stringify(metrics, null, 2) + '\n');
    return;
  }

  const commitId = await getCommitId(MODERN_PATH);
  const commitTime = await getCommitTime(MODERN_PATH);

  const jsonName = `${CASE_NAME}.json`;
  const jsonPath = join(DATA_PATH, commitId, jsonName);

  if (await pathExists(jsonPath)) {
    const content: Metrics = await readJson(jsonPath);
    await outputJson(jsonPath, { ...content, ...metrics }, { spaces: 2 });
  } else {
    await outputJson(jsonPath, metrics, { spaces: 2 });
  }

  await saveCommitInfo(commitId, commitTime);

  logger.success(`Successfully write metrics to ${jsonName}.`);
  logger.log(JSON.stringify(metrics, null, 2) + '\n');
}
