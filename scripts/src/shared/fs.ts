import axios from 'axios';
import { join } from 'path';
import {
  remove,
  readFile,
  readJson,
  outputJson,
  outputFile,
  pathExists,
  readJsonSync,
  outputJsonSync,
} from 'fs-extra';
import logger from 'consola';
import type { Metrics } from './types';
import { getCommitId, getCommitTime } from './git';
import {
  getDataPath,
  getRemoteDataUrl,
  getRepoName,
  getRepoPath,
} from './utils';
import { ProxyAgent } from 'proxy-agent';

export async function cleanCache(casePath: string) {
  await remove(join(casePath, 'node_modules', '.cache'));

  if (casePath.includes('modern.js')) {
    await remove(join(casePath, 'node_modules', '.modern.js'));
  }
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

export async function getMetricsPath(productName: string, caseName: string) {
  const jsonName = `${caseName}.json`;
  return {
    jsonName,
    jsonPath: join(getDataPath(productName), jsonName),
    remoteURL: `${getRemoteDataUrl(productName)}/${jsonName}`,
  };
}

export async function saveMetrics(metrics: Metrics) {
  const { PRODUCT_NAME, CASE_NAME, CURRENT_INDEX = '0' } = process.env;
  if (!PRODUCT_NAME) {
    logger.log('missing PRODUCT_NAME.');
    logger.log(JSON.stringify(metrics, null, 2) + '\n');
    return;
  }

  if (!CASE_NAME) {
    logger.log('missing CASE_NAME.');
    logger.log(JSON.stringify(metrics, null, 2) + '\n');
    return;
  }

  const index = Number(CURRENT_INDEX);
  const { jsonPath, jsonName } = await getMetricsPath(PRODUCT_NAME, CASE_NAME);

  if (await pathExists(jsonPath)) {
    const content: Metrics[] = readJsonSync(jsonPath);

    if (content[index]) {
      Object.assign(content[index], metrics);
    } else {
      content.push(metrics);
    }

    outputJsonSync(jsonPath, content, { spaces: 2 });
  } else {
    outputJsonSync(jsonPath, [metrics], { spaces: 2 });
  }

  logger.success(`Successfully write metrics to ${jsonName}.`);
  logger.log(JSON.stringify(metrics, null, 2) + '\n');
}

const average = (nums: number[]) =>
  nums.reduce((ret, num) => ret + num, 0) / nums.length;

const cleanData = (nums: number[]) => {
  console.log('Origin data: ', nums);
  nums = nums.filter(num => num !== undefined);

  nums.sort((a, b) => a - b);

  if (nums.length > 3) {
    // remove max value
    nums.pop();
    // remove min value
    nums.shift();
  }

  console.log('After filter data: ', nums);
  return nums;
};

export async function mergeMetrics(productName: string, caseName: string) {
  const { jsonPath, jsonName, remoteURL } = await getMetricsPath(
    productName,
    caseName,
  );

  if (await pathExists(jsonPath)) {
    const allMetrics: Metrics[] = await readJson(jsonPath);
    const firstMetrics = allMetrics[0];
    let result: Record<string, unknown> = {};
    const keys = Object.keys(firstMetrics) as Array<keyof Metrics>;

    keys.forEach(key => {
      console.log('Key: ', key);
      const val = firstMetrics[key];
      if (typeof val === 'number') {
        const values = allMetrics.map(metrics => metrics[key]) as number[];
        result[key] = average(cleanData(values));
      } else {
        result[key] = val;
      }
    });

    const repoPath = getRepoPath(getRepoName(productName));
    const id = await getCommitId(repoPath);
    const time = await getCommitTime(repoPath);

    let allData = {};
    try {
      if (process.env.http_proxy) {
        const agent = new ProxyAgent();
        axios.defaults.httpAgent = agent;
        axios.defaults.httpsAgent = agent;
      }
      const response = await axios.get(remoteURL);
      allData = response.data;
      console.log(`Save metrics:`);
      console.log(JSON.stringify(result, null, 2));
    } catch (err) {
      console.log('err: ', err);
      console.log(`Remote metrics may not exist: ${remoteURL}`);
    }

    allData = { ...allData, [id]: { time, ...result } };

    await outputJson(jsonPath, allData);
    logger.success(`Successfully merged metrics to ${jsonName}.`);
  }
}
