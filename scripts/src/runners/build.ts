import { join } from 'path';
import {
  cleanCache,
  runCommand,
  DEFAULT_RERUN_TIME,
  getCaseDistPath,
} from '../shared';

export const build = async (productName: string, caseName: string) => {
  const casePath = join(getCaseDistPath(productName), caseName);
  console.log('casePath: ', casePath);

  for (let i = 0; i < DEFAULT_RERUN_TIME; i++) {
    await cleanCache(casePath);

    // cold boot
    await runCommand(casePath, 'npm run build', {
      PRODUCT_NAME: productName,
      CASE_NAME: caseName,
      WITH_CACHE: 'false',
      CURRENT_INDEX: String(i),
    });

    // hot boot
    if (productName === 'MODERNJS_FRAMEWORK') {
      await runCommand(casePath, 'npm run build', {
        PRODUCT_NAME: productName,
        CASE_NAME: caseName,
        WITH_CACHE: 'true',
        CURRENT_INDEX: String(i),
      });
    }
  }
};
