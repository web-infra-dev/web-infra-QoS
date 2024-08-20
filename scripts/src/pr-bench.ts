import { dev } from './runners/dev';
import { build } from './runners/build';
import {
  DefaultBenchCase,
  ValidMetricsForCase,
  cloneRepo,
  getDataPath,
  mergeMetrics,
} from './shared';
import { remove } from 'fs-extra';
import { yarnInstall } from './runners/yarn-install';

const productName = process.argv[2];

async function prBench() {
  const dataPath = getDataPath(productName);
  await remove(dataPath);

  const cases = DefaultBenchCase[productName as keyof typeof DefaultBenchCase];

  for (const caseName of cases) {
    await cloneRepo(productName, caseName);

    process.env.PRODUCT_NAME = productName;
    process.env.CASE_NAME = caseName;

    if (productName !== 'MODERNJS_MODULE' && productName !== 'RSLIB') {
      await dev(productName, caseName);
    }

    await build(productName, caseName);

    if (
      ValidMetricsForCase[
        caseName as keyof typeof ValidMetricsForCase
      ]?.includes('installSize') ||
      !ValidMetricsForCase[caseName as keyof typeof ValidMetricsForCase]
    ) {
      try {
        await yarnInstall(productName, caseName);
      } catch (err) {
        console.log('failed to collect install size metrics:', err);
      }
    }

    await mergeMetrics(productName, caseName);
  }
}

prBench();
