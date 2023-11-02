import { performance } from 'perf_hooks';
import { saveMetrics } from '../../shared/fs';
import type { Metrics } from '../../shared/types';

const pluginStartTime = performance.now();

export const measureCompileSpeedPlugin = () => ({
  name: 'measureCompileSpeedPlugin',

  setup() {
    let beforeDevTime: number;
    let beforeBuildTime: number;
    const setupStartTime = performance.now();
    const metrics: Metrics = {};

    const isDev = process.env.NODE_ENV === 'development';
    const isCold = process.env.WITH_CACHE === 'false';

    let webpackCompiler: any;

    const MAX_TIME = 10 * 60 * 1000; // 10 min
    const timeout = setTimeout(() => {
      console.error('Compile time exceed 10mins, exit process.');
      process.exit(1);
    }, MAX_TIME);

    if (isCold) {
      const pluginSetupTime = performance.now() - pluginStartTime;
      if (isDev) {
        metrics.devPluginSetupTime = pluginSetupTime;
      } else {
        metrics.buildPluginSetupTime = pluginSetupTime;
      }
    }

    return {
      prepare: () => {
        if (isCold) {
          const prepareTime = performance.now() - setupStartTime;
          if (isDev) {
            metrics.devPrepareTime = prepareTime;
          } else {
            metrics.buildPrepareTime = prepareTime;
          }
        }
      },

      beforeDev: () => {
        if (isDev) {
          beforeDevTime = performance.now();
        }
      },

      beforeBuild: () => {
        if (!isDev) {
          beforeBuildTime = performance.now();
        }
      },

      afterCreateCompiler: ({ compiler }: any) => {
        webpackCompiler = compiler;
      },

      afterDev: async () => {
        const devTime = performance.now() - beforeDevTime;

        if (isCold) {
          metrics.devColdBootTime = devTime;
        } else {
          metrics.devHotBootTime = devTime;
        }

        await saveMetrics(metrics);

        webpackCompiler.close(() => {
          clearTimeout(timeout);
          process.exit(0);
        });
      },

      afterBuild: async () => {
        const buildTime = performance.now() - beforeBuildTime;

        if (isCold) {
          metrics.buildColdBootTime = buildTime;
        } else {
          metrics.buildHotBootTime = buildTime;
        }

        clearTimeout(timeout);
        await saveMetrics(metrics);
      },
    };
  },
});
