export enum PRODUCT_NAME {
  MODERNJS_FRAMEWORK = 'modernjs-framework',
  MODERNJS_MODULE = 'modernjs-module',
  RSBUILD = 'rsbuild',
  RSPRESS = 'rspress',
  RSPACK = 'rspack',
}

export enum REPO_NAME {
  MODERNJS_FRAMEWORK = 'modern.js',
  MODERNJS_MODULE = 'modern.js',
  RSBUILD = 'rsbuild',
  RSPRESS = 'rspress',
  RSPACK = 'rspack',
}

export const DefaultBenchCase = {
  MODERNJS_FRAMEWORK: ['app-arco-pro-rspack'],
  MODERNJS_MODULE: ['module-library'],
  RSPRESS: ['rspress-website'],
  RSBUILD: ['rsbuild-react', 'rsbuild-arco-pro'],
};

export const ValidMetricsForCase = {
  'rsbuild-react': [
    'coldInstallTime',
    'hotInstallTime',
    'dependenciesCount',
    'installSize',
  ],
  'rsbuild-arco-pro': [
    'devColdBootTime',
    'buildColdBootTime',
    'beforeBuildTime',
    'beforeDevTime',
    'minifiedBundleSize',
    'gzippedBundleSize',
  ],
};
