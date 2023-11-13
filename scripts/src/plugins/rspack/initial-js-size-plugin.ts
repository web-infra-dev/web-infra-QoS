import gzipSize from 'gzip-size';
import { saveMetrics } from '../../shared/fs';
import type { Metrics } from '../../shared/types';

export class InitialJsSizePlugin {
  readonly name: string;

  constructor() {
    this.name = 'InitialJsSizePlugin';
  }

  apply(compiler: any) {
    if (process.env.NODE_ENV === 'production') {
      const metrics: Metrics = {};

      compiler.hooks.emit.tapAsync(
        this.name,
        async (compilation: any, callback: any) => {
          const outputFiles = Object.keys(compilation.assets);

          const jsFiles = outputFiles.filter(file => file.endsWith('.js'));

          if (jsFiles.length > 1) {
            const filteredJsFiles = jsFiles.filter(
              file => !file.includes('async'),
            );
            const totalSize = filteredJsFiles.reduce((size, file) => {
              const asset = compilation.assets[file];
              size += asset.size();
              return size;
            }, 0);
            const totalGzipSize = await Promise.all(
              filteredJsFiles.map(async file => {
                const asset = compilation.assets[file];
                const fileContent = asset.source();
                const size = gzipSize.sync(fileContent);
                return size;
              }),
            ).then(sizes => sizes.reduce((acc, size) => acc + size, 0));

            metrics.initialJsSize = totalSize;
            metrics.gzipInitialJsSize = totalGzipSize;

            await saveMetrics(metrics);
          }

          callback();
        },
      );
    }
  }
}
