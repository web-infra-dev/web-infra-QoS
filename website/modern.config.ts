import { defineConfig } from '@modern-js/app-tools';
import { MoveHTMLPlugin } from './move-html-plugin';

export default defineConfig({
  output: {
    title: 'Modern.js Benchmark',
    favicon: './src/favicon.ico',
    assetPrefix: 'https://modern.js.org/modern-js-benchmark/',
    htmlPath: '/',
    disableSourceMap: true,
  },
  dev: {
    proxy: {
      'https://modern.js.org/modern-js-benchmark/index':
        'http://localhost:8080/',
      'https://modern.js.org/static': 'http://localhost:8080/static',
    },
  },
  plugins: [MoveHTMLPlugin()],
  tools: {
    esbuild: {},
  },
});
