import { exec } from 'child_process';

export function runShellCommand(command, cwd = process.cwd()) {
  return new Promise((resolve) => {
    exec(command, { cwd, timeout: 120000 }, (error, stdout, stderr) => {
      resolve({
        command,
        cwd,
        success: !error,
        code: error?.code ?? 0,
        stdout,
        stderr
      });
    });
  });
}
