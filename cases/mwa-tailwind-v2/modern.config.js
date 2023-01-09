import appTools from '@modern-js/app-tools';
import tailwindcssPlugin from '@modern-js/plugin-tailwindcss';
import {
  measureBundleSizePlugin,
  measureCompileSpeedPlugin,
} from '@modern-js/benchmark-scripts/plugins';

export default {
  runtime: {
    router: true,
    state: true,
  },
  output: {
    disableTsChecker: process.env.NODE_ENV === 'development',
  },
  plugins: [appTools(), tailwindcssPlugin(), measureBundleSizePlugin(), measureCompileSpeedPlugin()],
};
