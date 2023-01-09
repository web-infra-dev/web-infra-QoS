import appTools, { defineConfig } from '@modern-js/app-tools';
import proxyPlugin from '@modern-js/plugin-proxy';
import { moveHTMLPlugin } from './move-html-plugin';

export default defineConfig({
  output: {
    assetPrefix: 'https://modern.js.org/modern-js-benchmark/',
    disableSourceMap: true,
    distPath: {
      html: '/',
    },
  },
  html: {
    title: 'Modern.js Benchmark',
    favicon: './src/favicon.ico',
  },
  dev: {
    proxy: {
      'https://modern.js.org/modern-js-benchmark/index':
        'http://localhost:8080/',
      'https://modern.js.org/static': 'http://localhost:8080/static',
    },
  },
  plugins: [appTools(), proxyPlugin(), moveHTMLPlugin()],
  tools: {
    esbuild: {},
  },
});
