# Modern.js Benchmark

## Data

Benchmark data is stored in the [gh-pages](https://github.com/modern-js-dev/modern-js-benchmark/tree/gh-pages) branch.

## Cases

### mwa-minimal / mwa-minimal-v2

Minimal MWA project, using ua polyfill, no Redux and Router.

### mwa-initial / mwa-initial-v2

Initial MWA v1 project with TypeScript/Router/Redux enabled.

Created by `@modern-js/create`.

### mwa-ssr / mwa-ssr-v2

`mwa-initial` + SSR.

### mwa-ssg / mwa-ssg-v2

`mwa-initial` + SSG.

### mwa-bff-koa / mwa-bff-koa-v2

`mwa-initial` + BFF + Koa.

### mwa-tailwind /  mwa-tailwind-v2

`mwa-initial` + Tailwind CSS.

### mwa-arco-pro / mwa-arco-pro-v2

Arco Pro project.

### mwa-arco-pro-esbuild / mwa-arco-pro-esbuild-v2

`mwa-arco-pro` + esbuild.

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

- `yarn-install-size`: the size of node_modules after yarn install .
- `yarn-cold-install-time`: yarn install time, with cache and lock file.
- `yarn-hot-install-time`: yarn install time, without cache and lock file.
- `yarn-dependencies-count`: the total number of dependencies after yarn install.

## Website

### Local Development

```bash
cd website
pnpm install
pnpm dev
```

Then visit https://modern.js.org/modern-js-benchmark/index.

### Deploy Website

`GitHub Actions` -> `Deploy Website` -> `Run Workflow`.
