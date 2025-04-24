import type { LineOptions } from '@antv/g2plot';

export const BASE_PADDING = 24;

export const PRODUCT = {
  MODERNJS_FRAMEWORK: 'modernjs-framework',
  RSBUILD: 'rsbuild',
  RSLIB: 'rslib',
  RSPRESS: 'rspress',
  RSPACK: 'rspack',
};

export const MENU = {
  BUNDLE_SIZE: 'bundle-size',
  COMPILE_SPEED: 'compile-speed',
  INSTALL_SPEED: 'install-speed',
  CLI_SPEED: 'cli-speed',
  BINARY_SIZE: 'binary-size',
};

type ProductKey = keyof typeof PRODUCT;

type CaseorMetrics = {
  [key in (typeof PRODUCT)[ProductKey]]: string[];
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
  [PRODUCT.RSPRESS]: [
    'rspress-minimal',
    'rspress-website-mdxjs',
    'rspress-website-mdxjs-ssg-false',
  ],
  [PRODUCT.RSBUILD]: [
    'rsbuild-react',
    'rsbuild-react-app-10k',
    'rsbuild-arco-pro',
    'rsbuild-vue3',
    'rsbuild-lit',
    'rsbuild-svelte',
    'rsbuild-vanilla',
  ],
  [PRODUCT.RSLIB]: ['rslib-node-basic', 'rslib-react-basic'],
};

export const BUNDLE_SIZE_DEFAULT_CASE = {
  [PRODUCT.MODERNJS_FRAMEWORK]: ['app-initial', 'app-initial-rspack'],
  [PRODUCT.RSPRESS]: ['rspress-website-mdxjs', 'rspress-website-mdxjs-ssg-false'],
  [PRODUCT.RSBUILD]: ['rsbuild-react', 'rsbuild-arco-pro'],
  [PRODUCT.RSLIB]: ['rslib-node-basic', 'rslib-react-basic'],
};
export const BUNDLE_SIZE_METRICS = {
  [PRODUCT.MODERNJS_FRAMEWORK]: ['minifiedBundleSize', 'gzippedBundleSize'],
  [PRODUCT.RSPRESS]: [
    'gzipInitialJsSize',
    'initialJsSize',
    'minifiedBundleSize',
    'gzippedBundleSize',
  ],
  [PRODUCT.RSBUILD]: ['minifiedBundleSize', 'gzippedBundleSize'],
  [PRODUCT.RSLIB]: [
    'esmBundleSize',
    'cjsBundleSize',
    'esmGzipBundleSize',
    'cjsGzipBundleSize',
  ],
};

export const COMPILE_SPEED_DEFAULT_CASE = {
  [PRODUCT.MODERNJS_FRAMEWORK]: ['app-arco-pro', 'app-arco-pro-rspack'],
  [PRODUCT.RSPRESS]: ['rspress-website-mdxjs', 'rspress-website-mdxjs-ssg-false'],
  [PRODUCT.RSBUILD]: ['rsbuild-react', 'rsbuild-arco-pro'],
  [PRODUCT.RSLIB]: ['rslib-node-basic', 'rslib-react-basic'],
};
export const COMPILE_SPEED_METRICS = {
  [PRODUCT.MODERNJS_FRAMEWORK]: [
    'buildColdBootTime',
    'buildHotBootTime',
    'beforeBuildTime',
    'buildPluginSetupTime',
    'buildPrepareTime',
    'devColdBootTime',
    'devHotBootTime',
    'beforeDevTime',
    'devPluginSetupTime',
    'devPrepareTime',
  ],
  [PRODUCT.RSPRESS]: [
    'buildColdBootTime',
    'devColdBootTime',
    'beforeBuildTime',
    'beforeDevTime',
    'routeGenerateTime',
  ],
  [PRODUCT.RSBUILD]: [
    'buildColdBootTime',
    'devColdBootTime',
    'beforeBuildTime',
    'beforeDevTime',
  ],
  [PRODUCT.RSLIB]: [
    'buildEsmTotalTime',
    'buildCjsTotalTime',
    'buildEsmJsTime',
    'buildCjsJsTime',
    'beforeBuildTime',
  ],
};

export const INSTALL_SPEED_DEFAULT_CASE = {
  [PRODUCT.MODERNJS_FRAMEWORK]: ['app-initial', 'app-initial-rspack'],
  [PRODUCT.RSPRESS]: ['rspress-minimal', 'rspress-website-mdxjs'],
  [PRODUCT.RSBUILD]: ['rsbuild-vanilla', 'rsbuild-react'],
  [PRODUCT.RSLIB]: ['rslib-node-basic', 'rslib-react-basic'],
};
export const DEFAULT_INSTALL_SPEED_METRICS = [
  'installSize',
  'dependenciesCount',
  'coldInstallTime',
  'hotInstallTime',
];
export const INSTALL_SPEED_METRICS = {
  [PRODUCT.MODERNJS_FRAMEWORK]: DEFAULT_INSTALL_SPEED_METRICS,
  [PRODUCT.RSPRESS]: DEFAULT_INSTALL_SPEED_METRICS,
  [PRODUCT.RSBUILD]: DEFAULT_INSTALL_SPEED_METRICS,
  [PRODUCT.RSLIB]: DEFAULT_INSTALL_SPEED_METRICS,
};

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
};
