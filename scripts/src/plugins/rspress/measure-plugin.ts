import { join } from 'path';
import glob from 'fast-glob';
import gzipSize from 'gzip-size';
import { readFileSync, statSync } from 'fs';
import type { Metrics } from '../../shared/types';
import { saveMetrics } from '../../shared/fs';
import { removeHash, sum } from '../../shared/utils';

export function measurePlugin() {
  let beforeDevTime: number;
  let beforeBuildTime: number;

  const isDev = process.env.NODE_ENV === 'development';
  const metrics: Metrics = {};

  return {
    name: 'measurePlugin',

    async beforeBuild(_config: any) {
      if (isDev) {
        beforeDevTime = performance.now();
        metrics.beforeDevTime = beforeDevTime;
      } else {
        beforeBuildTime = performance.now();
        metrics.beforeBuildTime = beforeBuildTime;
      }
    },

    async routeGenerated() {
      if (isDev) {
        metrics.routeGenerateTime = performance.now() - beforeDevTime;
      } else {
        metrics.routeGenerateTime = performance.now() - beforeBuildTime;
      }
    },

    async afterBuild(config: any) {
      if (!isDev) {
        const rootDirectory = join(config.root, '../');
        const distDirectory = join(rootDirectory, 'doc_build');
        const files = glob.sync(join(distDirectory, '**', '*.{js,css,html}'));
        const fileSizes: Record<string, number> = {};
        const gzippedSizes: Record<string, number> = {};

        files.forEach(file => {
          const name = removeHash(file.replace(distDirectory, ''));
          const content = readFileSync(file, 'utf-8');
          fileSizes[name] = statSync(file).size;
          gzippedSizes[name] = gzipSize.sync(content);
        });

        metrics.minifiedBundleSize = sum(fileSizes);
        metrics.gzippedBundleSize = sum(gzippedSizes);
      }

      await saveMetrics(metrics);
    },
  };
}
