import type { LineOptions } from '@antv/g2plot';

export const MENU = {
  BUNDLE_SIZE: 'bundle-size',
  COMPILE_SPEED: 'compile-speed',
  INSTALL_SPEED: 'install-speed',
  TEST_COVERAGE: 'test-coverage',
};

export const BASE_PADDING = 24;

export const CASES = [
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
];

export const BUNDLE_SIZE_DEFAULT_CASE = ['app-initial', 'app-initial-rspack'];
export const BUNDLE_SIZE_METRICS = ['minifiedBundleSize', 'gzippedBundleSize'];

export const COMPILE_SPEED_DEFAULT_CASE = [
  'app-arco-pro',
  'app-arco-pro-rspack',
];
export const COMPILE_SPEED_METRICS = [
  'buildColdBootTime',
  'buildHotBootTime',
  'buildPluginSetupTime',
  'buildPrepareTime',
  'devColdBootTime',
  'devHotBootTime',
  'devPluginSetupTime',
  'devPrepareTime',
];

export const INSTALL_SPEED_DEFAULT_CASE = ['app-initial', 'app-initial-rspack'];
export const INSTALL_SPEED_METRICS = [
  'installSize',
  'dependenciesCount',
  'coldInstallTime',
  'hotInstallTime',
];

export const PUBLIC_PATH =
  'https://web-infra-dev.github.io/web-infra-QoS';
export const COMMITS_INFO_URL = PUBLIC_PATH + '/data/commits-info.json';

export const LINE_CHART_DEFAULT_CONFIG: Partial<LineOptions> = {
  height: 400,
  seriesField: 'category',
  xField: 'x',
  yField: 'y',
  xAxis: {
    label: {
      formatter: (text: string) => text.split(' ')[0],
    },
  },
  point: {
    size: 3,
  },
  stepType: 'vh',
};
