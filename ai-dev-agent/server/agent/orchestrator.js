import path from 'path';
import { planTask } from './planner.js';
import { analyzeRepository } from '../repo/repoAnalyzer.js';
import { learnCodingStyle } from '../memory/styleLearner.js';
import { logTask, updateTaskStatus, upsertMemory } from '../memory/memoryManager.js';
import { generateWithLLM } from '../llm/llmClient.js';
import { runDebugLoop } from './debugger.js';

export async function executeAgentCommand({ projectId = 'default-project', command, projectPath = process.cwd() }) {
  const task = await logTask({ projectId, command, status: 'running' });

  try {
    const absoluteProjectPath = path.resolve(projectPath);
    const repositoryMap = await analyzeRepository(projectId, absoluteProjectPath);
    const styleProfile = await learnCodingStyle(projectId, absoluteProjectPath);
    const plan = planTask(command);

    const reasoning = await generateWithLLM({
      systemPrompt: 'You are a senior MERN autonomous coding agent orchestrator.',
      userPrompt: `Command: ${command}\nPlan: ${JSON.stringify(plan)}\nRepo: ${JSON.stringify(repositoryMap)}\nStyle: ${JSON.stringify(styleProfile)}`
    });

    const debugReport = await runDebugLoop({ runCommand: 'npm run -s lint', cwd: absoluteProjectPath });

    const result = {
      plan,
      repositoryMap,
      styleProfile,
      llmReasoning: reasoning.content,
      debugReport
    };

    await upsertMemory(projectId, `last-command:${command}`, result, ['command-result']);
    await updateTaskStatus(task._id, 'completed', result);

    return result;
  } catch (error) {
    await updateTaskStatus(task._id, 'failed', { message: error.message });
    throw error;
  }
}
