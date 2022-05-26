import { performance } from 'perf_hooks';
import { saveTempMetrics } from '../shared';
import type { CliPlugin } from '@modern-js/core';
import type { Metrics } from '../types';

const pluginStartTime = performance.now();

export const MeasureBuildSpeedPlugin = (): CliPlugin => ({
  setup(api) {
    let beforeBuildTime: number;
    const setupTime = performance.now();
    const metrics: Partial<Metrics> = {};
    const isColdBoot = process.env.WITH_CACHE === 'false';

    if (isColdBoot) {
      metrics.buildPluginSetupTime = performance.now() - pluginStartTime;
    }

    return {
      prepare: () => {
        if (isColdBoot) {
          metrics.buildPrepareTime = performance.now() - setupTime;
        }
      },

      beforeBuild: () => {
        beforeBuildTime = performance.now();
      },

      afterBuild: () => {
        const buildTime = performance.now() - beforeBuildTime;

        if (isColdBoot) {
          metrics.buildColdBootTime = buildTime;
        } else {
          metrics.buildHotBootTime = buildTime;
        }

        saveTempMetrics(api.useAppContext().appDirectory, metrics);
      },
    };
  },
});
