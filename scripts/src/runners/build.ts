import { join } from 'path';
import {
  cleanCache,
  runCommand,
  CASES_DIST_PATH,
  DEFAULT_RERUN_TIME,
} from '../shared';

export const build = async (caseName: string) => {
  const casePath = join(CASES_DIST_PATH, caseName);

  for (let i = 0; i < DEFAULT_RERUN_TIME; i++) {
    await cleanCache(casePath);

    // cold boot
    await runCommand(casePath, 'npm run build', {
      CASE_NAME: caseName,
      WITH_CACHE: 'false',
      CURRENT_INDEX: String(i),
    });

    // hot boot
    await runCommand(casePath, 'npm run build', {
      CASE_NAME: caseName,
      WITH_CACHE: 'true',
      CURRENT_INDEX: String(i),
    });
  }
};
