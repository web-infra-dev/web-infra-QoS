import { defineConfig } from '@modern-js/app-tools';

export default defineConfig({
  dev: {
    proxy: {
      'https://modern.js.org/modern-js-benchmark/index.html':
        'http://localhost:8080/',
      'https://modern.js.org/static': 'http://localhost:8080/static',
    },
  },
});
