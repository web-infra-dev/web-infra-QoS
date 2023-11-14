import { defineConfig } from '@rsbuild/core';
import { measurePlugin } from '@modern-js/benchmark-scripts/plugins/rsbuild';

export default defineConfig({
  html: {
    template: './src/index.html',
  },
  plugins: [measurePlugin()],
});
