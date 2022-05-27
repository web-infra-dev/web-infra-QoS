import logger from 'consola';
import { dev } from './runners/dev';
import { build } from './runners/build';
import { cloneRepo, saveCommitInfo } from './shared';

const cases = [
  {
    name: 'mwa-minimal',
    runners: [dev, build],
  },
  {
    name: 'mwa-initial',
    runners: [dev, build],
  },
  {
    name: 'mwa-arco-pro',
    runners: [dev, build],
  },
];

const currentCase = process.argv[2] || cases[0].name;

async function main() {
  await cloneRepo();

  const caseToRun = cases.find(task => task.name === currentCase);

  if (caseToRun) {
    for (const runner of caseToRun.runners) {
      await runner(caseToRun.name);
    }
    await saveCommitInfo();
  } else {
    logger.error(`case name not found: ${currentCase}`);
  }
}

main();
