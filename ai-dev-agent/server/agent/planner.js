export function planTask(command) {
  const normalized = command.toLowerCase();

  if (normalized.includes('authentication') || normalized.includes('auth')) {
    return [
      'Create MongoDB user schema',
      'Create JWT auth service',
      'Implement Express auth routes',
      'Build React login and signup UI',
      'Add protected route middleware',
      'Run tests and smoke checks'
    ];
  }

  if (normalized.includes('analyze project')) {
    return [
      'Scan repository files',
      'Detect framework and dependencies',
      'Generate project architecture map',
      'Persist repository summary to memory'
    ];
  }

  if (normalized.includes('fix') || normalized.includes('bug')) {
    return [
      'Reproduce issue with command execution',
      'Capture logs and stack traces',
      'Identify likely fault location',
      'Generate and apply patch',
      'Re-run checks and confirm fix'
    ];
  }

  return [
    'Analyze repository context',
    'Break down feature into backend and frontend tasks',
    'Generate implementation changes',
    'Apply code updates',
    'Execute validation commands',
    'Update memory and task history'
  ];
}
