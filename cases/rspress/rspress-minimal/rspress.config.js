import * as path from 'path';
import { defineConfig } from 'rspress/config';
import { measurePlugin } from '@modern-js/benchmark-scripts/plugins/rspress';
import { measureRsbuildPlugin } from '@modern-js/benchmark-scripts/plugins/rsbuild';

export default defineConfig({
  root: path.join(__dirname, 'doc'),
  plugins: [measurePlugin()],
  builderPlugins: [measureRsbuildPlugin()],
});
