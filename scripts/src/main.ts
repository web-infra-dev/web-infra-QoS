import logger from 'consola';
import { dev } from './runners/dev';
import { build } from './runners/build';
import { cloneRepo, saveCommitInfo } from './shared';

const caseName = process.argv[2] || 'mwa-minimal';

async function main() {
  await cloneRepo(caseName);

  if (caseName) {
    await dev(caseName);
    await build(caseName)
    await saveCommitInfo();
  } else {
    logger.error(`Case not found: ${caseName}`);
  }
}

main();
