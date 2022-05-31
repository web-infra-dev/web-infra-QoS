import { renameSync } from 'fs';
import { join } from 'path';

export const MoveHTMLPlugin = () => {
  return {
    setup(api) {
      return {
        afterBuild() {
          const { distDirectory } = api.useAppContext();
          renameSync(
            join(distDirectory, 'main', 'index.html'),
            join(distDirectory, 'index.html'),
          );
        },
      };
    },
  };
};
