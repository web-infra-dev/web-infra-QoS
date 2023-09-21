# Modern.js Benchmark

[Online Benchmark](https://web-infra-dev.github.io/modern-js-benchmark/index).

## Data

Benchmark data is stored in the [gh-pages](https://github.com/web-infra-dev/modern-js-benchmark/tree/gh-pages) branch.

## Cases

### app-minimal

Minimal app project, using ua polyfill, no Redux and Router.

### app-initial

Initial app project with TypeScript/Router/Redux enabled.

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

## Metrics

### Bundle Size

The size of the bundles after the build.

- `minified-bundle-size`: the compressed size of bundles.
- `gzipped-bundle-size`: the size of bundles after compression & gzip.

### Compile Speed

- `dev-plugin-setup-time`: the time it takes from the start of the dev command to the completion of loading all plugins. Corresponding hooks: `loadConfig -> loadPlugin`.
- `dev-prepare-time`: the time taken from the time the plugins are loaded to the time when the build prep process is fully completed. Corresponding hooks: `loadPlugin -> prepare`.
- `dev-cold-boot-time`: the time it takes for the dev build to complete without caching. Corresponding hooks: `beforeDev -> afterDev`.
- `dev-hot-boot-time`: the time taken to complete the dev build with cache. Corresponding hooks: `beforeDev -> afterDev`.
- `build-plugin-setup-time`: the time taken from the start of the build command until all plugins have been loaded. Corresponding hooks: `loadConfig -> loadPlugin`.
- `build-prepare-time`: the time taken from when the plugins are loaded to when the build prep process is fully completed. Corresponding hooks: `loadPlugin -> prepare`.
- `build-cold-boot-time`: the time it takes for the build to complete without caching. Corresponding hooks: `beforeBuild -> afterBuild`.
- `build-hot-boot-time`: the time it takes to complete a build with caching. Corresponding hooks: `beforeBuild -> afterBuild`.

### Install Speed

Install npm dependency related metrics.

- `install-size`: the size of node_modules after yarn install .
- `cold-install-time`: yarn install time, with cache and lock file.
- `hot-install-time`: yarn install time, without cache and lock file.
- `dependencies-count`: the total number of dependencies after yarn install.

## Website

### Local Development

```bash
cd website
pnpm install
pnpm dev
```

Then visit https://web-infra-dev.github.io/modern-js-benchmark/index

### Deploy Website

`GitHub Actions` -> `Deploy Website` -> `Run Workflow`.
