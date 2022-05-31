export const MENU = {
  BUNDLE_SIZE: 'bundle-size',
  COMPILE_SPEED: 'compile-speed',
};

export const CASES = [
  'mwa-minimal',
  'mwa-initial',
  'mwa-ssr',
  'mwa-arco-pro',
  'mwa-arco-pro-esbuild',
];

export const BUNDLE_SIZE_DEFAULT_CASE = ['mwa-minimal', 'mwa-initial']; 
export const COMPILE_SPEED_DEFAULT_CASE = ['mwa-arco-pro', 'mwa-arco-pro-esbuild'];

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

export const COMMITS_INFO_URL = './commits-info.json';
