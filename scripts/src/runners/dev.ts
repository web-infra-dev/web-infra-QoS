import { join } from 'path';
import {
  cleanCache,
  runCommand,
  DEFAULT_RERUN_TIME,
  getCaseDistPath,
} from '../shared';

export const dev = async (productName: string, caseName: string) => {
  const casePath = join(getCaseDistPath(productName), caseName);

  for (let i = 0; i < DEFAULT_RERUN_TIME; i++) {
    await cleanCache(casePath);

    // cold boot
    await runCommand(casePath, 'npm run dev', {
      PRODUCT_NAME: productName,
      CASE_NAME: caseName,
      WITH_CACHE: 'false',
      CURRENT_INDEX: String(i),
    });

    // hot boot
    await runCommand(casePath, 'npm run dev', {
      PRODUCT_NAME: productName,
      CASE_NAME: caseName,
      WITH_CACHE: 'true',
      CURRENT_INDEX: String(i),
    });
  }
};
