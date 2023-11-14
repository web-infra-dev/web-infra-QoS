import { defineConfig } from '@rsbuild/core';
import { measurePlugin } from '@modern-js/benchmark-scripts/plugins/rsbuild';

export default defineConfig({
  plugins: [measurePlugin()],
});
