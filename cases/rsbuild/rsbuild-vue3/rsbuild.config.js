import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { measurePlugin } from '@modern-js/benchmark-scripts/plugins/rsbuild';

export default defineConfig({
  plugins: [pluginVue(), measurePlugin()],
});
