export type Metrics = {
  // Compile speed
  devHotBootTime: number;
  devColdBootTime: number;
  devHotRecompileTime: number;
  devColdRecompileTime: number;
  buildHotBootTime: number;
  buildColdBootTime: number;
  buildPluginSetupTime: number;
  buildPrepareTime: number;

  // Bundle size
  minifiedBundleSize: number;
  gzippedBundleSize: number;

  // Install Size
  installSize: number;
  npmInstallTime: number;
  pnpmInstallTime: number;
  yarnInstallTime: number;
  dependenciesCount: number;
};

export type MetricsRecord = {
  commitId: string;
  commitTime: string;
  metrics: Partial<Metrics>
};
