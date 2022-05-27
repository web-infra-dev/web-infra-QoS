import {
  MeasureBundleSizePlugin,
  MeasureCompileSpeedPlugin,
} from '@modern-js/benchmark-scripts/plugins';

export default {
  runtime: {
    router: true,
    state: true,
  },
  server: {
    ssr: true
  },
  output: {
    disableTsChecker: process.env.NODE_ENV === 'development',
  },
  plugins: [MeasureBundleSizePlugin(), MeasureCompileSpeedPlugin()],
};
