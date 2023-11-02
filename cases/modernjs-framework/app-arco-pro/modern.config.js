import { appTools } from '@modern-js/app-tools';
import {
  measureBundleSizePlugin,
  measureCompileSpeedPlugin,
} from '@modern-js/benchmark-scripts/plugins/modernjs-framework';

export default {
  runtime: {
    router: true,
  },
  output: {
    disableTsChecker: true,
  },
  plugins: [appTools(), measureCompileSpeedPlugin(), measureBundleSizePlugin()],
};
