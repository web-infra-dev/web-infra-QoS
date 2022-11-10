import type { LineOptions } from '@antv/g2plot';

export const MENU = {
  BUNDLE_SIZE: 'bundle-size',
  COMPILE_SPEED: 'compile-speed',
  INSTALL_SPEED: 'install-speed',
  TEST_COVERAGE: 'test-coverage',
};

export const BASE_PADDING = 24;

export const CASES = [
  'mwa-minimal',
  'mwa-minimal-v2',
  'mwa-initial',
  'mwa-initial-v2',
  'mwa-tailwind',
  'mwa-ssr',
  'mwa-ssg',
  'mwa-bff-koa',
  'mwa-bff-express',
  'mwa-arco-pro',
  'mwa-arco-pro-esbuild',
];

export const BUNDLE_SIZE_DEFAULT_CASE = ['mwa-initial', 'mwa-initial-v2'];
export const BUNDLE_SIZE_METRICS = ['minifiedBundleSize', 'gzippedBundleSize'];

export const COMPILE_SPEED_DEFAULT_CASE = ['mwa-initial', 'mwa-initial-v2'];
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

export const INSTALL_SPEED_DEFAULT_CASE = ['mwa-initial', 'mwa-initial-v2'];
export const INSTALL_SPEED_METRICS = [
  'yarnInstallSize',
  'yarnDependenciesCount',
  'yarnColdInstallTime',
  'yarnHotInstallTime',
];

export const COMMITS_INFO_URL = './data/commits-info.json';

export const LINE_CHART_DEFAULT_CONFIG: Partial<LineOptions> = {
  height: 400,
  seriesField: 'category',
  xField: 'x',
  yField: 'y',
  xAxis: {
    label: {
      formatter: text => text.split(' ')[0],
    },
  },
  point: {
    size: 3,
  },
};
