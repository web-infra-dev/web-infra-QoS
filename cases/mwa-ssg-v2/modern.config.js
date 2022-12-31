import appTools from '@modern-js/app-tools';
import ssgPlugin from '@modern-js/plugin-ssg';
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
    ssg: true,
    disableTsChecker: process.env.NODE_ENV === 'development',
  },
  plugins: [appTools(), ssgPlugin(), MeasureBundleSizePlugin(), MeasureCompileSpeedPlugin()],
};
