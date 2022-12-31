import appTools from '@modern-js/app-tools';
import {
  MeasureBundleSizePlugin,
  MeasureCompileSpeedPlugin,
} from '@modern-js/benchmark-scripts/plugins';

export default {
  runtime: {
    router: true,
    state: true,
  },
  output: {
    disableTsChecker: process.env.NODE_ENV === 'development',
  },
  plugins: [appTools(), MeasureBundleSizePlugin(), MeasureCompileSpeedPlugin()],
};
