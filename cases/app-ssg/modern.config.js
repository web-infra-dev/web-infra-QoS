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
    disableTsChecker: true,
  },
  plugins: [appTools(), ssgPlugin(), measureBundleSizePlugin(), measureCompileSpeedPlugin()],
};
