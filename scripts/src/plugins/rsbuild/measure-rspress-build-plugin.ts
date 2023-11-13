import type { Metrics } from '../../shared/types';
import { saveMetrics } from '../../shared/fs';
import { InitialJsSizePlugin } from '../rspack/initial-js-size-plugin';

export const measureRspressBuildPlugin = () => ({
  name: 'measureRspressBuildPlugin',

  setup: (api: any) => {
    let beforeDevTime: number;
    let beforeBuildTime: number;

    const isDev = process.env.NODE_ENV === 'development';
    const metrics: Metrics = {};

    api.modifyBundlerChain(async (chain: any) => {
      chain.plugin('InitialJsSizePlugin').use(InitialJsSizePlugin);
    });

    api.onBeforeBuild(() => {
      if (!isDev) {
        beforeBuildTime = performance.now();
      }
    });

    api.onAfterBuild(async () => {
      const buildTime = performance.now() - beforeBuildTime;
      metrics.buildColdBootTime = buildTime;
      await saveMetrics(metrics);
    });

    api.onBeforeStartDevServer(() => {
      if (isDev) {
        beforeDevTime = performance.now();
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
