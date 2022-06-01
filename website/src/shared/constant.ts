import type { LineOptions } from '@antv/g2plot';

export const MENU = {
  BUNDLE_SIZE: 'bundle-size',
  COMPILE_SPEED: 'compile-speed',
};

export const BASE_PADDING = 24;

export const CASES = [
  'mwa-minimal',
  'mwa-initial',
  'mwa-ssr',
  'mwa-arco-pro',
  'mwa-arco-pro-esbuild',
];

export const BUNDLE_SIZE_DEFAULT_CASE = ['mwa-minimal', 'mwa-initial'];
export const COMPILE_SPEED_DEFAULT_CASE = [
  'mwa-arco-pro',
  'mwa-arco-pro-esbuild',
];

export const BUNDLE_SIZE_METRICS = ['minifiedBundleSize', 'gzippedBundleSize'];

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

export const COMMITS_INFO_URL = './data/commits-info.json';

export const LINE_CHART_DEFAULT_CONFIG: Partial<LineOptions> = {
  height: 400,
  seriesField: 'category',
  xField: 'date',
  xAxis: {
    label: {
      formatter: text => text.split(' ')[0],
    },
  },
  point: {
    size: 3,
  },
};
