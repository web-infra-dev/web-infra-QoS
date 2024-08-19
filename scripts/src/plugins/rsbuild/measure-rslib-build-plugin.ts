import { join } from 'path';
import glob from 'fast-glob';
import gzipSize from 'gzip-size';
import { readFileSync, statSync } from 'fs';
import { removeHash, sum } from '../../shared/utils';
import type { Metrics } from '../../shared/types';
import { saveMetrics } from '../../shared/fs';

export const measureRslibBuildPlugin = () => ({
  name: 'measureRslibBuildPlugin',

  setup: (api: any) => {
    let beforeBuildTime: number;
    let environmentName: string;

    const metrics: Metrics = {};

    api.onBeforeBuild(() => {
      beforeBuildTime = performance.now();
      metrics.beforeBuildTime = beforeBuildTime;
    });

    api.onAfterEnvironmentCompile({
      handler: async ({ environment }: { environment: any }) => {
        environmentName = environment.name;
        const buildTime = performance.now() - beforeBuildTime;

        const distDirectory = environment.distPath;
        const files = glob.sync(
          join(distDirectory, '**', '*.{js,cjs,mjs,css,html}'),
        );

        const fileSizes: Record<string, number> = {};
        const gzippedSizes: Record<string, number> = {};

        files.forEach(file => {
          const name = removeHash(file.replace(distDirectory, ''));
          const content = readFileSync(file, 'utf-8');
          fileSizes[name] = statSync(file).size;
          gzippedSizes[name] = gzipSize.sync(content);
        });

        if (environmentName === 'cjs') {
          metrics.buildCjsJsTime = buildTime;
          metrics.cjsBundleSize = sum(fileSizes);
          metrics.cjsGzipBundleSize = sum(gzippedSizes);
        }
        if (environmentName === 'esm') {
          metrics.buildEsmJsTime = buildTime;
          metrics.esmBundleSize = sum(fileSizes);
          metrics.esmGzipBundleSize = sum(gzippedSizes);
        }
      },
      order: 'post',
    });

    api.onAfterBuild({
      handler: async () => {
        const totalTime = performance.now() - beforeBuildTime;
        if (environmentName === 'cjs') {
          metrics.buildCjsTotalTime = totalTime;
        }
        if (environmentName === 'esm') {
          metrics.buildEsmTotalTime = totalTime;
        }
        await saveMetrics(metrics);
      },
      order: 'post',
    });
  },
});
