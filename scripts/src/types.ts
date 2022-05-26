export type BundleSize = {
  total: number;
  files: Record<string, number>;
};

export type Metrics = Partial<{
  // Compile speed (dev)
  devHotBootTime: number;
  devColdBootTime: number;
  devHotRecompileTime: number;
  devColdRecompileTime: number;
  devPluginSetupTime: number;
  devPrepareTime: number;

  // Compile speed (build)
  buildHotBootTime: number;
  buildColdBootTime: number;
  buildPluginSetupTime: number;
  buildPrepareTime: number;

  // Bundle size
  minifiedBundleSize: BundleSize;
  gzippedBundleSize: BundleSize;

  // Install Size
  installSize: number;
  npmInstallTime: number;
  pnpmInstallTime: number;
  yarnInstallTime: number;
  dependenciesCount: number;
}>;

export type MetricsRecord = {
  commitId: string;
  commitTime: string;
  metrics: Metrics;
};
