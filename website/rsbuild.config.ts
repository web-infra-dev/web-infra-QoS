import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  output: {
    assetPrefix: '/',
    distPath: {
      html: '/',
    },
  },
  html: {
    title: 'Web Infra QoS Dashboard',
    favicon: './src/web-infra.png',
  },
});
