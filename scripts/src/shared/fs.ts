import axios from 'axios';
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
import {
  DATA_PATH,
  MODERN_PATH,
  REMOTE_DATA_URL,
  COMMITS_INFO_PATH,
} from './constant';
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

export async function saveCommitInfo() {
  const id = await getCommitId(MODERN_PATH);
  const time = await getCommitTime(MODERN_PATH);

  let content: Array<{ id: string; time: number }>;

  try {
    const response = await axios.get(`${REMOTE_DATA_URL}/commits-info.json`);
    content = response.data;
  } catch (err) {
    logger.error('failed to get commit-info.json: ', { id, time });
    logger.error(err);
    return;
  }

  if (content.find(item => item.id === id)) {
    return;
  }

  content.push({ id, time });
  content.sort((a, b) => a.time - b.time);
  await outputJson(COMMITS_INFO_PATH, content, { spaces: 2 });
}

async function getMetricsPath(caseName: string) {
  const commitId = await getCommitId(MODERN_PATH);
  const jsonName = `${caseName}.json`;
  return {
    jsonName,
    jsonPath: join(DATA_PATH, commitId, jsonName),
    remoteURL: `${REMOTE_DATA_URL}/${commitId}/${caseName}.json`,
  };
}

export async function saveMetrics(metrics: Metrics) {
  const { CASE_NAME, CURRENT_INDEX } = process.env;
  if (!CASE_NAME || !CURRENT_INDEX) {
    logger.log('missing CASE_NAME or CURRENT_INDEX.');
    logger.log(JSON.stringify(metrics, null, 2) + '\n');
    return;
  }

  const index = Number(CURRENT_INDEX);
  const { jsonPath, jsonName } = await getMetricsPath(CASE_NAME);

  if (await pathExists(jsonPath)) {
    const content: Metrics[] = await readJson(jsonPath);

    if (content[index]) {
      Object.assign(content[index], metrics);
    } else {
      content.push(metrics);
    }

    await outputJson(jsonPath, content, { spaces: 2 });
  } else {
    await outputJson(jsonPath, [metrics], { spaces: 2 });
  }

  logger.success(`Successfully write metrics to ${jsonName}.`);
  logger.log(JSON.stringify(metrics, null, 2) + '\n');
}

const average = (nums: number[]) =>
  nums.reduce((ret, num) => ret + num, 0) / nums.length;

const cleanData = (nums: number[]) => {
  nums.sort();
  // remove max value
  nums.pop();
  // remove min value
  nums.shift();
  return nums;
};

export async function mergeMetrics(caseName: string) {
  const { jsonPath, jsonName, remoteURL } = await getMetricsPath(caseName);

  if (await pathExists(jsonPath)) {
    const allMetrics: Metrics[] = await readJson(jsonPath);
    const firstMetrics = allMetrics[0];
    let result: Record<string, unknown> = {};
    const keys = Object.keys(firstMetrics) as Array<keyof Metrics>;

    keys.forEach(key => {
      const val = firstMetrics[key];
      if (typeof val === 'number') {
        const values = allMetrics.map(metrics => metrics[key]) as number[];
        result[key] = average(cleanData(values));
      } else {
        result[key] = val;
      }
    });

    try {
      const response = await axios.get(remoteURL);
      const remoteResult = response.data;
      result = { ...remoteResult, ...result };
      console.log(`Merge result metrics:`);
      console.log(JSON.stringify(remoteResult, null, 2));
    } catch (err) {
      console.log(`Remote metrics may not exist: ${remoteURL}`);
    }

    await outputJson(jsonPath, result, { spaces: 2 });
    logger.success(`Successfully merged metrics to ${jsonName}.`);
    logger.log(JSON.stringify(result, null, 2) + '\n');
  }
}
