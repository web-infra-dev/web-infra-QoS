import logger from 'consola';
import { dev } from './runners/dev';
import { build } from './runners/build';
import { cloneRepo, DATA_PATH, mergeMetrics, saveCommitInfo } from './shared';
import { remove } from 'fs-extra';
import { yarnInstall } from './runners/yarn-install';

const caseName = process.argv[2] || 'mwa-minimal';

async function main() {
  await cloneRepo(caseName);

  if (caseName) {
    process.env.CASE_NAME = caseName;
    await remove(DATA_PATH);

    if (process.env.ONLY_INSTALL_SIZE !== 'true') {
      await dev(caseName);
      await build(caseName);
    }
    await yarnInstall(caseName);
    await mergeMetrics(caseName);
    await saveCommitInfo();
  } else {
    logger.error(`Case not found: ${caseName}`);
  }
}

main();
