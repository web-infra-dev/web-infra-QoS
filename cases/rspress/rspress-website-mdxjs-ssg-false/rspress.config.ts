import path from 'path';
import { defineConfig } from '@rspress/core';
import { measurePlugin } from '@modern-js/benchmark-scripts/plugins/rspress';
import { measureRspressBuildPlugin } from '@modern-js/benchmark-scripts/plugins/rsbuild';
import { pluginSass } from '@rsbuild/plugin-sass';

export default defineConfig({
  markdown: {
    checkDeadLinks: true,
  },
  ssg: false,
  root: 'docs',
  title: 'Rspress',
  description: 'Rspack based static site generator',
  lang: 'en',
  logo: {
    light:
      'https://lf3-static.bytednsdoc.com/obj/eden-cn/rjhwzy/ljhwZthlaukjlkulzlp/rspress/rspress-navbar-logo-0904.png',
    dark: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/rjhwzy/ljhwZthlaukjlkulzlp/rspress/rspress-navbar-logo-dark-0904.png',
  },
  icon: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/uhbfnupenuhf/rspress/rspress-logo.png',
  builderConfig: {
    plugins: [measureRspressBuildPlugin(), pluginSass()],
    dev: {
      startUrl: false,
    },
    source: {
      define: {
        'process.env.DOCUMATE_BACKEND_URL': JSON.stringify(
          process.env.DOCUMATE_BACKEND_URL,
        ),
      },
    },
    html: {
      tags: [
        // Configure Google Analytics
        {
          tag: 'script',
          attrs: {
            async: true,
            src: 'https://www.googletagmanager.com/gtag/js?id=G-66B2Z6KG0J',
          },
        },
        {
          tag: 'script',
          children: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-66B2Z6KG0J');`,
        },
      ],
    },
  },
  route: {
    exclude: ['**/fragments/**'],
  },
  themeConfig: {
    enableContentAnimation: true,
    footer: {
      message: '© 2023 Bytedance Inc. All Rights Reserved.',
    },
    hideNavbar: 'auto',
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/web-infra-dev/rspress',
      },
      {
        icon: 'discord',
        mode: 'link',
        content:
          'https://discord.com/channels/977448667919286283/1161653869080756245',
      },
    ],
    locales: [
      {
        lang: 'zh',
        label: '简体中文',
        editLink: {
          docRepoBaseUrl:
            'https://github.com/web-infra-dev/rspress/tree/main/packages/document/docs',
          text: '📝 在 GitHub 上编辑此页',
        },
        prevPageText: '上一篇',
        nextPageText: '下一篇',
        outlineTitle: '目录',
      },
      {
        lang: 'en',
        label: 'English',
        editLink: {
          docRepoBaseUrl:
            'https://github.com/web-infra-dev/rspress/tree/main/packages/document/docs',
          text: '📝 Edit this page on GitHub',
        },
      },
    ],
  },
  plugins: [measurePlugin()],
});
