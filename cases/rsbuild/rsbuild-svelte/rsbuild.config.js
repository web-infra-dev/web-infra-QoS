import { defineConfig } from '@rsbuild/core';
import { pluginSvelte } from '@rsbuild/plugin-svelte';
import { measurePlugin } from '@modern-js/benchmark-scripts/plugins/rsbuild';

export default defineConfig({
  plugins: [pluginSvelte(), measurePlugin()],
});
