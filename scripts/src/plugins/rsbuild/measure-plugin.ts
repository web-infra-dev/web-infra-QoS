import { join } from 'path';
import glob from 'fast-glob';
import gzipSize from 'gzip-size';
import { readFileSync, statSync } from 'fs';
import { removeHash, sum } from '../../shared/utils';
import type { Metrics } from '../../shared/types';
import { saveMetrics } from '../../shared/fs';

export const measurePlugin = () => ({
  name: 'measurePlugin',

  setup: (api: any) => {
    let beforeDevTime: number;
    let beforeBuildTime: number;

    const isDev = process.env.NODE_ENV === 'development';
    const metrics: Metrics = {};

    api.onBeforeBuild(() => {
      if (!isDev) {
        beforeBuildTime = performance.now();
        metrics.beforeBuildTime = beforeBuildTime;
      }
    });

    api.onAfterBuild(async () => {
      const buildTime = performance.now() - beforeBuildTime;
      metrics.buildColdBootTime = buildTime;

      const distDirectory = api.context.distPath;
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

      await saveMetrics(metrics);
    });

    api.onBeforeStartDevServer(() => {
      if (isDev) {
        beforeDevTime = performance.now();
        metrics.beforeDevTime = beforeDevTime;
      }
    });

    api.onDevCompileDone(async () => {
      const devTime = performance.now() - beforeDevTime;
      metrics.devColdBootTime = devTime;
      await saveMetrics(metrics);
      process.exit(0);
    });
  },
});
