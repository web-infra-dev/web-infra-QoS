import { join } from 'path';
import { readFileSync, statSync } from 'fs';
import glob from 'fast-glob';
import gzipSize from 'gzip-size';
import { saveMetrics } from '../../shared/fs';
import { removeHash, sum } from '../../shared/utils';

export const measureBundleSizePlugin = () => ({
  name: 'measureBundleSizePlugin',

  pre: ['measureCompileSpeedPlugin'],

  setup(api: any) {
    if (process.env.NODE_ENV === 'development') {
      return;
    }

    return {
      async afterBuild() {
        const { distDirectory } = api.useAppContext();
        const files = glob.sync(join(distDirectory, '**', '*.{js,css,html}'));
        const fileSizes: Record<string, number> = {};
        const gzippedSizes: Record<string, number> = {};

        files.forEach(file => {
          const name = removeHash(file.replace(distDirectory, ''));
          const content = readFileSync(file, 'utf-8');
          fileSizes[name] = statSync(file).size;
          gzippedSizes[name] = gzipSize.sync(content);
        });

        await saveMetrics({
          minifiedBundleSize: sum(fileSizes),
          gzippedBundleSize: sum(gzippedSizes),
        });
      },
    };
  },
});
