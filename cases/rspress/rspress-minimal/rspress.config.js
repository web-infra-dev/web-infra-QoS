import * as path from 'path';
import { defineConfig } from '@rspress/core';
import { measurePlugin } from '@modern-js/benchmark-scripts/plugins/rspress';
import { measureRspressBuildPlugin } from '@modern-js/benchmark-scripts/plugins/rsbuild';

export default defineConfig({
  root: path.join(__dirname, 'doc'),
  plugins: [measurePlugin()],
  builderConfig: {
    plugins: [measureRspressBuildPlugin()],
  },
});
