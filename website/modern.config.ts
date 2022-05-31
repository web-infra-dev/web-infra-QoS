import { defineConfig } from '@modern-js/app-tools';

export default defineConfig({
  output: {
    title: 'Modern.js Benchmark',
    favicon: './src/favicon.ico',
    assetPrefix: 'https://modern.js.org/modern-js-benchmark/',
  },
  dev: {
    proxy: {
      'https://modern.js.org/modern-js-benchmark/index':
        'http://localhost:8080/',
      'https://modern.js.org/static': 'http://localhost:8080/static',
    },
  },
});
