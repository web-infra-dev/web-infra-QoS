import { defineConfig } from '@modern-js/app-tools';
import { MeasureCompileSpeedPlugin } from '../../scripts/src/plugins/measure-compile-speed-plugin';

export default defineConfig({
  runtime: {
    router: true,
    state: true,
  },
  output: {
    disableTsChecker: process.env.NODE_ENV === 'development',
  },
  plugins: [MeasureCompileSpeedPlugin()],
});
