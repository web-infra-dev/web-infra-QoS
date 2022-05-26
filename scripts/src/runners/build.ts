import { join } from 'path';
import { CASES_PATH, runCommand } from '../shared';
import { remove } from 'fs-extra';

export const build = async (caseName: string) => {
  const casePath = join(CASES_PATH, caseName);

  // clean webpack cache
  await remove(join(casePath, 'node_modules', '.cache'));

  // cold boot build
  await runCommand(casePath, 'npm run build', {
    WITH_CACHE: 'false',
  });
  
  // hot boot build
  await runCommand(casePath, 'npm run build', {
    WITH_CACHE: 'true',
  });
};
