import appTools from '@modern-js/app-tools';
import ssgPlugin from '@modern-js/plugin-ssg';
import {
  measureBundleSizePlugin,
  measureCompileSpeedPlugin,
} from '@modern-js/benchmark-scripts/plugins';

export default {
  runtime: {
    router: true,
  },
  output: {
    ssg: true,
    disableTsChecker: process.env.NODE_ENV === 'development',
  },
  plugins: [appTools(), ssgPlugin(), measureBundleSizePlugin(), measureCompileSpeedPlugin()],
};
