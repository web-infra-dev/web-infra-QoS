import execa from 'execa';
import { join } from 'path';
import { ROOT_PATH } from './constant';
import { PRODUCT_NAME, REPO_NAME } from './product';

export async function runCommand(
  cwd: string,
  command: string,
  env?: Partial<NodeJS.ProcessEnv>,
) {
  const [file, ...args] = command.split(' ');
  return execa(file, args, {
    cwd,
    shell: true,
    stderr: 'inherit',
    stdout: 'inherit',
    env: env
      ? {
          ...process.env,
          ...env,
        }
      : process.env,
  });
}

export function getRepoName(product: string) {
  return REPO_NAME[product as keyof typeof REPO_NAME];
}

export function getRepoPath(repoName: string) {
  return join(ROOT_PATH, repoName);
}

export function getCaseDistPath(product: string) {
  return join(ROOT_PATH, REPO_NAME[product as keyof typeof REPO_NAME], 'cases');
}

export function getCaseSrcPath(product: string) {
  return join(
    ROOT_PATH,
    'cases',
    PRODUCT_NAME[product as keyof typeof PRODUCT_NAME],
  );
}

export function getTempPath(product: string) {
  return join(
    ROOT_PATH,
    'temp',
    PRODUCT_NAME[product as keyof typeof PRODUCT_NAME],
  );
}

export function getDataPath(product: string) {
  return join(
    ROOT_PATH,
    'data',
    PRODUCT_NAME[product as keyof typeof PRODUCT_NAME],
  );
}

export function getRemoteDataUrl(product: string) {
  return `https://github.com/web-infra-dev/web-infra-QoS/raw/gh-pages/data/${
    PRODUCT_NAME[product as keyof typeof PRODUCT_NAME]
  }`;
}

export function getCommitLink(product: string, commitId: string) {
  return `https://github.com/web-infra-dev/${getRepoName(
    product,
  )}/commit/${commitId}`;
}

export function removeHash(filename: string) {
  if (filename.endsWith('.js') || filename.endsWith('.css')) {
    const pairs = filename.split('.');
    const ext = pairs.pop();
    pairs.pop();
    return [...pairs, ext].join('.');
  }
  return filename;
}

export function sum(files: Record<string, number>) {
  return Object.values(files).reduce((ret, num) => ret + num, 0);
}

export function addContentToPnpmPackages(
  content: string,
  addWorkspace: string,
): string {
  // Split the content into lines
  const lines = content.split('\n');

  // Find the start and end of the packages section
  let packagesStart = -1;
  let packagesEnd = -1;
  let inPackages = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('packages:')) {
      packagesStart = i;
      inPackages = true;
    } else if (inPackages) {
      // Check if this line starts with a new top-level field (non-indented)
      if (
        line.length > 0 &&
        !line.startsWith(' ') &&
        !line.startsWith('-') &&
        line.endsWith(':')
      ) {
        packagesEnd = i - 1;
        break;
      }

      // Or if it's the last line
      if (i === lines.length - 1) {
        packagesEnd = i;
      }
    }
  }

  // If we found the packages section
  if (packagesStart >= 0 && packagesEnd >= 0) {
    // Check if 'cases/*' already exists
    const hasCases = lines
      .slice(packagesStart, packagesEnd + 1)
      .some(line => line.includes(addWorkspace));

    if (!hasCases) {
      // Find the last package entry (line starting with -)
      let lastPackageIndex = -1;
      for (let i = packagesEnd; i >= packagesStart; i--) {
        if (lines[i].trim().startsWith('-')) {
          lastPackageIndex = i;
          break;
        }
      }

      if (lastPackageIndex >= 0) {
        // Insert after the last package entry
        const indent = lines[lastPackageIndex].match(/^\s*/)?.[0] || '';
        lines.splice(lastPackageIndex + 1, 0, `${indent}${addWorkspace}`);
      } else {
        // No packages found, add after packages: with proper indentation
        const indent = lines[packagesStart].match(/^\s*/)?.[0] || '';
        lines.splice(packagesStart + 1, 0, `${indent}  ${addWorkspace}`);
      }
    }
  }

  return lines.join('\n');
}
