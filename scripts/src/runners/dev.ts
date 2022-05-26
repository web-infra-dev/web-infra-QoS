import { join } from 'path';
import { CASES_DIST_PATH, runCommand, cleanCache } from '../shared';

export const dev = async (caseName: string) => {
  const casePath = join(CASES_DIST_PATH, caseName);

  await cleanCache(casePath);

  // cold boot dev
  await runCommand(casePath, 'npm run dev', {
    CASE_NAME: caseName,
    WITH_CACHE: 'false',
  });

  // hot boot dev
  await runCommand(casePath, 'npm run dev', {
    CASE_NAME: caseName,
    WITH_CACHE: 'true',
  });
};
