import { appTools } from '@modern-js/app-tools';
import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss';
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
  plugins: [appTools(), tailwindcssPlugin(), measureBundleSizePlugin(), measureCompileSpeedPlugin()],
};
