import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  output: {
    assetPrefix: '/',
    disableSourceMap: true,
    distPath: {
      html: '/',
    },
  },
  html: {
    title: 'Web Infra QoS Dashboard',
    favicon: './src/web-infra.png',
  },
  tools: {
    rspack: {
      experiments: {
        rspackFuture: {
          // https://github.com/web-infra-dev/rspack/issues/4770
          newResolver: false,
        },
      },
    },
  },
});
