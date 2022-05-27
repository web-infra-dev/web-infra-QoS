import { performance } from 'perf_hooks';
import { saveMetrics } from '../shared/fs';
import type { Metrics } from '../shared/types';

const pluginStartTime = performance.now();

export const MeasureCompileSpeedPlugin = () => ({
  name: 'MeasureCompileSpeedPlugin',

  setup() {
    let beforeDevTime: number;
    let beforeBuildTime: number;
    const setupStartTime = performance.now();
    const metrics: Metrics = {};

    const isDev = process.env.NODE_ENV === 'development';
    const isCold = process.env.WITH_CACHE === 'false';

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

      afterDev: () => {
        const devTime = performance.now() - beforeDevTime;

        if (isCold) {
          metrics.devColdBootTime = devTime;
        } else {
          metrics.devHotBootTime = devTime;
        }

        saveMetrics(metrics);
        process.exit(0);
      },

      afterBuild: () => {
        const buildTime = performance.now() - beforeBuildTime;

        if (isCold) {
          metrics.buildColdBootTime = buildTime;
        } else {
          metrics.buildHotBootTime = buildTime;
        }

        saveMetrics(metrics);
      },
    };
  },
});
