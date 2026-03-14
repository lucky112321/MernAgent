#!/usr/bin/env node
import { Command } from 'commander';

const API_BASE = process.env.AGENT_API || 'http://localhost:5000/api/agent';
const program = new Command();

async function executeCommand(command, projectPath = process.cwd(), projectId = 'default-project') {
  const response = await fetch(`${API_BASE}/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command, projectPath, projectId })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || 'Agent request failed');
  }

  return data.result;
}

program
  .name('agent')
  .description('Personal MERN AI Developer Agent CLI')
  .version('1.0.0');

program
  .command('run')
  .description('Run a natural-language agent command')
  .requiredOption('-c, --command <text>', 'Command text for the agent')
  .option('-p, --project-path <path>', 'Project root path', process.cwd())
  .option('-i, --project-id <id>', 'Project ID', 'default-project')
  .action(async (options) => {
    try {
      const result = await executeCommand(options.command, options.projectPath, options.projectId);
      console.log(JSON.stringify(result, null, 2));
    } catch (error) {
      console.error(`Agent CLI error: ${error.message}`);
      process.exit(1);
    }
  });

program
  .command('build-auth')
  .description('Shortcut: Build authentication system')
  .action(async () => {
    const result = await executeCommand('build authentication system');
    console.log(JSON.stringify(result, null, 2));
  });

program
  .command('fix-login-bug')
  .description('Shortcut: Fix login bug')
  .action(async () => {
    const result = await executeCommand('fix login bug');
    console.log(JSON.stringify(result, null, 2));
  });

program
  .command('analyze-project')
  .description('Shortcut: Analyze project')
  .action(async () => {
    const result = await executeCommand('analyze project');
    console.log(JSON.stringify(result, null, 2));
  });

program.parse(process.argv);
