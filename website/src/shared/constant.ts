import type { LineOptions } from '@antv/g2plot';

export const BASE_PADDING = 24;

export const PRODUCT = {
  MODERNJS_FRAMEWORK: 'modernjs-framework',
  MODERNJS_MODULE: 'modernjs-module',
  RSBUILD: 'rsbuild',
  RSPRESS: 'rspress',
  RSPACK: 'rspack',
};

export const MENU = {
  BUNDLE_SIZE: 'bundle-size',
  COMPILE_SPEED: 'compile-speed',
  INSTALL_SPEED: 'install-speed',
  CLI_SPEED: 'cli-speed',
};

type ProductKey = keyof typeof PRODUCT;

type CaseorMetrics = {
  [key in typeof PRODUCT[ProductKey]]: string[];
};

export const PRODUCT_CASES: CaseorMetrics = {
  [PRODUCT.MODERNJS_FRAMEWORK]: [
    'app-minimal',
    'app-initial',
    'app-initial-rspack',
    'app-tailwind',
    'app-ssr',
    'app-ssg',
    'app-bff-koa',
    'app-arco-pro',
    'app-arco-pro-swc',
    'app-arco-pro-esbuild',
    'app-arco-pro-rspack',
  ],
  [PRODUCT.MODERNJS_MODULE]: [
    'module-initial',
    'module-library',
    'module-library-sourcemap',
    'module-library-noautoexternal',
  ],
};

export const BUNDLE_SIZE_DEFAULT_CASE = {
  [PRODUCT.MODERNJS_FRAMEWORK]: ['app-initial', 'app-initial-rspack'],
  [PRODUCT.MODERNJS_MODULE]: ['module-initial', 'module-library'],
};
export const BUNDLE_SIZE_METRICS = {
  [PRODUCT.MODERNJS_FRAMEWORK]: ['minifiedBundleSize', 'gzippedBundleSize'],
  [PRODUCT.MODERNJS_MODULE]: ['distSize', 'gzippedDistSize'],
};

export const COMPILE_SPEED_DEFAULT_CASE = {
  [PRODUCT.MODERNJS_FRAMEWORK]: ['app-arco-pro', 'app-arco-pro-rspack'],
  [PRODUCT.MODERNJS_MODULE]: ['module-initial', 'module-library'],
};
export const COMPILE_SPEED_METRICS = {
  [PRODUCT.MODERNJS_FRAMEWORK]: [
    'buildColdBootTime',
    'buildHotBootTime',
    'buildPluginSetupTime',
    'buildPrepareTime',
    'devColdBootTime',
    'devHotBootTime',
    'devPluginSetupTime',
    'devPrepareTime',
  ],
  [PRODUCT.MODERNJS_MODULE]: ['buildColdBootTime', 'buildPluginSetupTime'],
};

export const INSTALL_SPEED_DEFAULT_CASE = {
  [PRODUCT.MODERNJS_FRAMEWORK]: ['app-initial', 'app-initial-rspack'],
  [PRODUCT.MODERNJS_MODULE]: ['module-initial', 'module-library'],
};
export const INSTALL_SPEED_METRICS = {
  [PRODUCT.MODERNJS_FRAMEWORK]: [
    'installSize',
    'dependenciesCount',
    'coldInstallTime',
    'hotInstallTime',
  ],
  [PRODUCT.MODERNJS_MODULE]: [
    'installSize',
    'dependenciesCount',
    'coldInstallTime',
    'hotInstallTime',
  ],
};

export const PUBLIC_PATH = 'https://web-infra-dev.github.io/web-infra-QoS';

export const LINE_CHART_DEFAULT_CONFIG: Partial<LineOptions> = {
  height: 400,
  seriesField: 'category',
  xField: 'x',
  yField: 'y',
  xAxis: {
    label: {
      formatter: (text: string) => text.split(' ')[0],
    },
    nice: true,
  },
  yAxis: {
    nice: true,
  },
  point: {
    size: 3,
  },
  stepType: 'vh',
  slider: {
    start: 0,
    end: 1,
  },
};
