import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { measurePlugin } from '@modern-js/benchmark-scripts/plugins/rsbuild';

export default defineConfig({
  plugins: [pluginReact(), measurePlugin()],
});
