import { moduleTools, defineConfig } from "@modern-js/module-tools";
import { measurePlugin } from '@modern-js/benchmark-scripts/plugins/modernjs-module';

export default defineConfig({
  plugins: [moduleTools(), measurePlugin()],
  buildPreset: "npm-library-with-umd",
  buildConfig: {
    minify: "terser",
  },
});
