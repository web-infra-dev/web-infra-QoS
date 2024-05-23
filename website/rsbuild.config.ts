import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';

export default defineConfig({
  plugins: [pluginReact(), pluginSass()],
  output: {
    assetPrefix: '/',
    distPath: {
      html: '/',
    },
  },
  html: {
    title: 'Web Infra QoS Dashboard',
    favicon: './src/public/web-infra.png',
  },
  server: {
    proxy: {
      '/data': 'https://web-infra-qos.netlify.app/',
    },
  },
  source: {
    transformImport: [
      {
        libraryName: '@arco-design/web-react',
        libraryDirectory: 'es',
        camelToDashComponentName: false,
        style: 'css',
      },
      {
        libraryName: '@arco-design/web-react/icon',
        libraryDirectory: 'react-icon',
        camelToDashComponentName: false,
      },
    ],
  },
});
