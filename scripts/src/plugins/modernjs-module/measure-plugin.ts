import { performance } from 'perf_hooks';
import { join } from 'path';
import { readFileSync, statSync } from 'fs';
import glob from 'fast-glob';
import gzipSize from 'gzip-size';
import { saveMetrics } from '../../shared/fs';
import type { Metrics } from '../../shared/types';
import { removeHash, sum } from '../../shared/utils';

const pluginStartTime = performance.now();

export const measurePlugin = () => ({
  name: 'measurePlugin',

  setup(api: any) {
    let beforeBuildTime: number;
    let beforeBulidCjsTime: number;
    let beforeBuildEsmTime: number;
    let beforeBuildDtsTime: number;

    const metrics: Metrics = {};

    const pluginSetupTime = performance.now() - pluginStartTime;
    metrics.buildPluginSetupTime = pluginSetupTime;

    return {
      beforeBuild: () => {
        beforeBuildTime = performance.now();
        metrics.beforeBuildTime = beforeBuildTime;
      },

      beforeBuildTask: (config: any) => {
        if (config.dts === false) {
          if (config.format === 'cjs') {
            // build cjs
            beforeBulidCjsTime = performance.now();
          } else if (config.format === 'esm') {
            // build esm
            beforeBuildEsmTime = performance.now();
          }
        } else {
          // build dts
          beforeBuildDtsTime = performance.now();
        }
      },

      afterBuildTask: (options: any) => {
        if (options.config.dts === false) {
          if (options.config.format === 'cjs') {
            // build cjs
            metrics.bulidCjsTime = performance.now() - beforeBulidCjsTime;
          } else if (options.config.format === 'esm') {
            // build esm
            metrics.bulidEsmTime = performance.now() - beforeBuildEsmTime;
          }
        } else {
          // build dts
          metrics.bulidDtsTime = performance.now() - beforeBuildDtsTime;
        }
      },

      afterBuild: async () => {
        const buildTime = performance.now() - beforeBuildTime;

        metrics.buildColdBootTime = buildTime;

        const { appDirectory } = api.useAppContext();
        const distDirectory = join(appDirectory, 'dist');
        const files = glob.sync(join(distDirectory, '**', '*.{js,css,d.ts}'));
        const fileSizes: Record<string, number> = {};
        const gzippedSizes: Record<string, number> = {};

        files.forEach(file => {
          const name = removeHash(file.replace(distDirectory, ''));
          const content = readFileSync(file, 'utf-8');
          fileSizes[name] = statSync(file).size;
          gzippedSizes[name] = gzipSize.sync(content);
        });

        metrics.distSize = sum(fileSizes);
        metrics.gzippedDistSize = sum(gzippedSizes);

        await saveMetrics(metrics);
      },
    };
  },
});
