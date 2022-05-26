import { defineConfig } from '@modern-js/app-tools';
import { MeasureBuildSpeedPlugin } from '../../scripts/src/plugins/measure-build-speed-plugin';

export default defineConfig({
  runtime: {
    router: true,
    state: true,
  },
  plugins: [MeasureBuildSpeedPlugin()],
});
