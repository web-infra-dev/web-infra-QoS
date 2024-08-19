import logger from 'consola';
import { dev } from './runners/dev';
import { build } from './runners/build';
import { cloneRepo, getDataPath, mergeMetrics } from './shared';
import { remove } from 'fs-extra';
import { yarnInstall } from './runners/yarn-install';

const productName = process.argv[2];
const caseName = process.argv[3];

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
      if (productName !== 'MODERNJS_MODULE' && productName !== 'RSLIB') {
        await dev(productName, caseName);
      }
      await build(productName, caseName);
    }

    try {
      await yarnInstall(productName, caseName);
    } catch (err) {
      console.log('failed to collect install size metrics:', err);
    }

    await mergeMetrics(productName, caseName);
  } else {
    logger.error(`Case not found: ${productName} ${caseName}`);
  }
}

main();
