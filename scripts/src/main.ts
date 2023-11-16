import logger from 'consola';
import { dev } from './runners/dev';
import { build } from './runners/build';
import {
  DefaultBenchCase,
  cloneRepo,
  getDataPath,
  mergeMetrics,
} from './shared';
import { remove } from 'fs-extra';
import { yarnInstall } from './runners/yarn-install';
import { compare } from './shared/compare';

const productName = process.argv[2] || 'MODERNJS_FRAMEWORK';
const caseName =
  process.argv[3] ||
  DefaultBenchCase[productName as keyof typeof DefaultBenchCase];

async function main() {
  const dataPath = getDataPath(productName);

  await cloneRepo(productName, caseName);

  if (!productName) {
    logger.error(`product not found: ${productName}`);
  }

  if (caseName) {
    process.env.PRODUCT_NAME = productName;
    process.env.CASE_NAME = caseName;
    await remove(dataPath);

    if (process.env.ONLY_INSTALL_SIZE !== 'true') {
      if (productName !== 'MODERNJS_MODULE') {
        await dev(productName, caseName);
      }
      await build(productName, caseName);
    }

    try {
      await yarnInstall(productName, caseName);
    } catch (err) {
      console.log('failed to collect install size metrics:', err);
    }

    const jsonPath = await mergeMetrics(productName, caseName);

    if (process.env.PR_NUMBER) {
      await compare(jsonPath);
    }
  } else {
    logger.error(`Case not found: ${productName} ${caseName}`);
  }
}

main();
