import { join } from 'path';
import { CASES_DIST_PATH, runCommand, cleanCache } from '../shared';

export const build = async (caseName: string) => {
  const casePath = join(CASES_DIST_PATH, caseName);

  await cleanCache(casePath);

  // cold boot build
  await runCommand(casePath, 'npm run build', {
    CASE_NAME: caseName,
    WITH_CACHE: 'false',
  });

  // hot boot build
  await runCommand(casePath, 'npm run build', {
    CASE_NAME: caseName,
    WITH_CACHE: 'true',
  });
};
