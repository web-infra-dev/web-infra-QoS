import { join } from 'path';
import { readFileSync, statSync } from 'fs';
import glob from 'fast-glob';
import gzipSize from 'gzip-size';
import { saveMetrics } from '../shared/fs';

function removeHash(filename: string) {
  if (filename.endsWith('.js') || filename.endsWith('.css')) {
    const pairs = filename.split('.');
    const ext = pairs.pop();
    pairs.pop();
    return [...pairs, ext].join('.');
  }
  return filename;
}

function sum(files: Record<string, number>) {
  return Object.values(files).reduce((ret, num) => ret + num, 0);
}

export const MeasureBundleSizePlugin = () => ({
  name: 'MeasureBundleSizePlugin',

  pre: ['MeasureCompileSpeedPlugin'],

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
          minifiedBundleSize: {
            total: sum(fileSizes),
            files: fileSizes,
          },
          gzippedBundleSize: {
            total: sum(gzippedSizes),
            files: gzippedSizes,
          },
        });
      },
    };
  },
});
