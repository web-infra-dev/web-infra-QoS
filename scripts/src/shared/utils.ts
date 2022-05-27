import execa from 'execa';

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
