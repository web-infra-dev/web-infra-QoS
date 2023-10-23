import appTools, { defineConfig } from '@modern-js/app-tools';
import { moveHTMLPlugin } from './move-html-plugin';

export default defineConfig<'rspack'>({
  output: {
    assetPrefix: 'https://web-infra-dev.github.io/web-infra-QoS/',
    disableSourceMap: true,
    distPath: {
      html: '/',
    },
  },
  html: {
    title: 'Modern.js Benchmark',
    favicon: './src/favicon.ico',
  },
  plugins: [appTools({ bundler: 'experimental-rspack' }), moveHTMLPlugin()],
});
