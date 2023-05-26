import appTools from '@modern-js/app-tools';
import {
  measureBundleSizePlugin,
  measureCompileSpeedPlugin,
} from '@modern-js/benchmark-scripts/plugins';

export default {
  output: {
    polyfill: 'ua',
    disableTsChecker: true,
  },
  plugins: [appTools(), measureBundleSizePlugin(), measureCompileSpeedPlugin()],
};
