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
  beforeBulidCjsTime?: number;
  bulidCjsTime?: number;
  bulidEsmTime?: number;
  bulidDtsTime?: number;

  // Bundle size
  minifiedBundleSize?: number;
  gzippedBundleSize?: number;
  distSize?: number;
  gzippedDistSize?: number;

  // Install Size
  installSize?: number;
  hotInstallTime?: number;
  coldInstallTime?: number;
  dependenciesCount?: number;
};
