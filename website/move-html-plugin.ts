import { CliPlugin, AppTools } from '@modern-js/app-tools';
import { copyFileSync } from 'fs';
import { join } from 'path';

export const moveHTMLPlugin = (): CliPlugin<AppTools> => {
  return {
    setup(api) {
      return {
        afterBuild() {
          const { distDirectory } = api.useAppContext();
          copyFileSync(
            join(distDirectory, 'main', 'index.html'),
            join(distDirectory, 'index.html'),
          );
        },
      };
    },
  };
};
