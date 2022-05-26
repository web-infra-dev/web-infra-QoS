import { join } from 'path';
import { CASES_PATH, runCommand, cleanCache } from '../shared';

export const dev = async (caseName: string) => {
  const casePath = join(CASES_PATH, caseName);

  await cleanCache(casePath);

  // cold boot dev
  await runCommand(casePath, 'npm run dev', {
    WITH_CACHE: 'false',
  });

  // hot boot dev
  await runCommand(casePath, 'npm run dev', {
    WITH_CACHE: 'true',
  });
};
