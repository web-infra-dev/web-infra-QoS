import appTools from '@modern-js/app-tools';
import {
  MeasureBundleSizePlugin,
  MeasureCompileSpeedPlugin,
} from '@modern-js/benchmark-scripts/plugins';

export default {
  output: {
    polyfill: 'ua',
    disableTsChecker: process.env.NODE_ENV === 'development',
  },
  plugins: [appTools(), MeasureBundleSizePlugin(), MeasureCompileSpeedPlugin()],
};
