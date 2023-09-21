export type BundleSize = {
  total: number;
};

export type Metrics = {
  // Compile speed (dev)
  devHotBootTime?: number;
  devColdBootTime?: number;
  devHotRecompileTime?: number;
  devColdRecompileTime?: number;
  devPluginSetupTime?: number;
  devPrepareTime?: number;

  // Compile speed (build)
  buildHotBootTime?: number;
  buildColdBootTime?: number;
  buildPluginSetupTime?: number;
  buildPrepareTime?: number;

  // Bundle size
  minifiedBundleSize?: BundleSize;
  gzippedBundleSize?: BundleSize;

  // Install Size
  yarnInstallSize?: number;
  yarnHotInstallTime?: number;
  yarnColdInstallTime?: number;
  yarnDependenciesCount?: number;
};
