import logger from 'consola';
import { dev } from './runners/dev';
import { build } from './runners/build';
import { cloneRepo, getDataPath, mergeMetrics } from './shared';
import { remove } from 'fs-extra';
import { yarnInstall } from './runners/yarn-install';
import { getBinarySize } from './runners/binary-size';

const productName = process.argv[2];
const caseName = process.argv[3];

async function main() {
  const dataPath = getDataPath(productName);

  await cloneRepo(productName, caseName);

  if (!productName) {
    logger.error(`product not found: ${productName}`);
  }

  process.env.PRODUCT_NAME = productName;
  process.env.CASE_NAME = caseName;

  await remove(dataPath);

  if (!caseName) {
    throw new Error('Missing case name!');
  }

  // Rspack only need to get binary size
  if (productName === 'RSPACK') {
    await getBinarySize();
    await mergeMetrics(productName, caseName);
    return;
  }

  if (process.env.ONLY_INSTALL_SIZE !== 'true') {
    if (productName !== 'RSLIB') {
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
}

main();
