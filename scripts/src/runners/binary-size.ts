import { join, parse } from 'path';
import { getRepoName, getRepoPath, runCommand, saveMetrics } from '../shared';
import glob from 'fast-glob';
import { statSync } from 'fs';

export const getBinarySize = async () => {
  const repoPath = getRepoPath(getRepoName('RSPACK'));

  await runCommand(repoPath, 'cargo codegen');
  await runCommand(repoPath, 'pnpm run build:binding:release');

  const binaryPath = glob.sync(
    join(repoPath, 'crates/node_binding/rspack.*.node'),
    {
      absolute: true,
    },
  );

  if (!binaryPath.length) {
    throw new Error('Binary file not found!');
  }

  const data: Record<string, number> = {};

  for (const path of binaryPath) {
    const size = statSync(path).size;
    data[parse(path).name] = size;
  }

  return saveMetrics(data);
};
