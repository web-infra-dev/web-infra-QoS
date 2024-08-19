# Web Infra QoS

[Online Benchmark](https://web-infra-qos.netlify.app).

## Data

Benchmark data is stored in the [gh-pages](https://github.com/web-infra-dev/web-infra-QoS/tree/gh-pages) branch.

## Cases

### app-minimal

Minimal app project, no polyfill or Router.

### app-initial

Initial app project with TypeScript and nested routes enabled.

Created by `@modern-js/create`.

### app-initial-rspack

Initial app project with Rspack.

### app-ssr

`app-initial` + SSR.

### app-ssg

`app-initial` + SSG.

### app-bff-koa

`app-initial` + BFF + Koa.

### app-tailwind

`app-initial` + Tailwind CSS.

### app-arco-pro

Arco Pro project.

### app-arco-pro-swc

`app-arco-pro` + SWC.

### app-arco-pro-esbuild

`app-arco-pro` + esbuild.

### app-arco-pro-rspack

`app-arco-pro` + Rspack.

### module-initial

Initial module project.

Created by `@modern-js/create`.

### module-library

Utils project with `npm-library-with-umd` buildPreset.

### module-library-sourcemap

`module-library` + `sourceMap: true`.

### module-library-noautoexternal

`module-library` + `autoExternal: false`.

### module-library-minify-esbuild

`module-library` + `minify: 'esbuild'` + `target: 'es5'`.

### module-library-minify-terser

`module-library` + `minify: 'terser'` + `target: 'es5'`.

### module-component

Component project with `npm-component` buildPreset.

### rspress-minimal

Minimal doc project.

### rspress-website

Website project with rspress.

### rspress-website-mdxjs

`rspress-website` + `mdxRs: false`.

### rsbuild-react

Rsbuild project + react.

### rsbuild-vue2

Rsbuild project + vue2.

### rsbuild-vue3

Rsbuild project + vue3.

### rsbuild-lit

Rsbuild project + lit.

### rsbuild-svelte

Rsbuild project + svelte.

### rsbuild-vanilla

Rsbuild project + vanilla.

### rsbuild-arco-pro

Arco Pro project with Rsbuild.

### rslib-node-basic

Basic nodejs project with Rslib.

### rslib-react-basic

Basic react component project with Rslib.

## Metrics

### Bundle Size

The size of the bundles after the build.

- `minified-bundle-size`: the compressed size of bundles.
- `gzipped-bundle-size`: the size of bundles after compression & gzip.
- `dist-size`: file size of output in module.
- `gzipped-dist-size`: file size of output in module after gzip.
- `initial-js-size`: initial js size in rspress.
- `gzip-initial-js-size`: initial js size in rspress after gzip.
- `cjs-bundle-size`: the size of cjs formats outputs.
- `cjs-gzip-bundle-size`: the size of cjs formats outputs after gzip.
- `esm-bundle-size`: the size of esm formats outputs.
- `esm-gzip-bundle-size`: the size of esm formats outputs after gzip.

### Compile Speed

- `dev-plugin-setup-time`: the time it takes from the start of the dev command to the completion of loading all plugins. Corresponding hooks: `loadConfig -> loadPlugin`.
- `dev-prepare-time`: the time taken from the time the plugins are loaded to the time when the build prep process is fully completed. Corresponding hooks: `loadPlugin -> prepare`.
- `dev-cold-boot-time`: the time it takes for the dev build to complete without caching. Corresponding hooks: `beforeDev -> afterDev`.
- `dev-hot-boot-time`: the time taken to complete the dev build with cache. Corresponding hooks: `beforeDev -> afterDev`.
- `build-plugin-setup-time`: the time taken from the start of the build command until all plugins have been loaded. Corresponding hooks: `loadConfig -> loadPlugin`.
- `build-prepare-time`: the time taken from when the plugins are loaded to when the build prep process is fully completed. Corresponding hooks: `loadPlugin -> prepare`.
- `build-cold-boot-time`: the time it takes for the build to complete without caching. Corresponding hooks: `beforeBuild -> afterBuild`.
- `build-hot-boot-time`: the time it takes to complete a build with caching. Corresponding hooks: `beforeBuild -> afterBuild`.
- `build-cjs-time`: the time it takes to complete a build task for cjs in module build. Corresponding hooks: `beforeBuildTask -> afterBuildTask`.
- `build-esm-time`: the time it takes to complete a build task for esm in module build. Corresponding hooks: `beforeBuildTask -> afterBuildTask`.
- `build-dts-time`: the time it takes to complete a build task for dts in module build. Corresponding hooks: `beforeBuildTask -> afterBuildTask`.
- `build-cjs-js-time`: the js bundle time it takes to complete a build task for cjs in Rslib.
- `build-esm-js-time`: the js bundle time it takes to complete a build task for esm in Rslib.
- `build-cjs-total-time`: the total time it takes to complete a build task for cjs in Rslib.
- `build-esm-total-time`: the total time it takes to complete a build task for esm in Rslib.
- `route-generate-time`: the time it takes to generate routes in rspress. Corresponding hooks: `beforeBuild -> routeGenerated`.
- `before-dev-time`: the time it takes for the dev command to initialize, in other words, cli cold boot time.
- `before-build-time`: the time it takes for the build command to initialize, in other words, cli cold boot time.

### Install Speed

Install npm dependency related metrics.

- `install-size`: the size of node_modules after yarn install .
- `cold-install-time`: yarn install time, with cache and lock file.
- `hot-install-time`: yarn install time, without cache and lock file.
- `dependencies-count`: the total number of dependencies after yarn install.

## Website

### Local Development

```bash
pnpm run install:webiste
pnpm run dev:website
```

### Deploy Website

`GitHub Actions` -> `Deploy Website` -> `Run Workflow`.

## Run Cases

### Local development

```bash
cd scripts
pnpm start RSBUILD rsbuild-react
```

### Actions

`GitHub Actions` -> `Manual`
