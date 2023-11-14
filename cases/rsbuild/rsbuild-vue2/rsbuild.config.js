import { defineConfig } from '@rsbuild/core';
import { pluginVue2 } from '@rsbuild/plugin-vue2';
import { measurePlugin } from '@modern-js/benchmark-scripts/plugins/rsbuild';

export default defineConfig({
  plugins: [pluginVue2(), measurePlugin()],
});
