import { runShellCommand } from '../tools/shellRunner.js';
import { generateWithLLM } from '../llm/llmClient.js';

export async function runDebugLoop({ runCommand, cwd }) {
  const execution = await runShellCommand(runCommand, cwd);

  if (execution.success) {
    return {
      status: 'healthy',
      execution,
      fixSuggestion: null
    };
  }

  const analysis = await generateWithLLM({
    systemPrompt: 'You are an autonomous MERN debugging engine. Produce concise fix guidance.',
    userPrompt: `Analyze this failure and provide fix plan:\n\nCommand: ${runCommand}\n\nSTDERR:\n${execution.stderr}`
  });

  return {
    status: 'error_detected',
    execution,
    fixSuggestion: analysis.content
  };
}
