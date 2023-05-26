import appTools from '@modern-js/app-tools';
import swcPlugin from '@modern-js/plugin-swc';
import {
  measureBundleSizePlugin,
  measureCompileSpeedPlugin,
} from '@modern-js/benchmark-scripts/plugins';

export default {
  runtime: {
    router: true,
  },
  output: {
    disableTsChecker: true,
  },
  plugins: [appTools(), swcPlugin(), measureCompileSpeedPlugin(), measureBundleSizePlugin()],
};
