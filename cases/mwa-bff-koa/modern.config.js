import appTools from '@modern-js/app-tools';
import bffPlugin from '@modern-js/plugin-bff';
import koaPlugin from '@modern-js/plugin-koa';
import {
  measureBundleSizePlugin,
  measureCompileSpeedPlugin,
} from '@modern-js/benchmark-scripts/plugins';

export default {
  runtime: {
    router: true,
  },
  output: {
    disableTsChecker: process.env.NODE_ENV === 'development',
  },
  plugins: [appTools(), bffPlugin(), koaPlugin(), measureBundleSizePlugin(), measureCompileSpeedPlugin()],
};
