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
    title: 'Web Infra QoS Dashboard',
    favicon: './src/web-infra.png',
  },
  plugins: [appTools({ bundler: 'experimental-rspack' }), moveHTMLPlugin()],
});
