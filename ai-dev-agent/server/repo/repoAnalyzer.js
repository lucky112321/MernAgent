import fs from 'fs/promises';
import path from 'path';
import { upsertProjectMap } from '../memory/memoryManager.js';

async function safeReadJson(filePath) {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function analyzeRepository(projectId, projectPath) {
  const packageJson = await safeReadJson(path.join(projectPath, 'package.json'));
  const deps = {
    ...(packageJson?.dependencies || {}),
    ...(packageJson?.devDependencies || {})
  };

  const dependencies = Object.keys(deps);
  const map = {
    framework: dependencies.includes('react') ? 'React' : 'Unknown',
    backend: dependencies.includes('express') ? 'Express' : 'Unknown',
    database: dependencies.includes('mongoose') || dependencies.includes('mongodb') ? 'MongoDB' : 'Unknown',
    dependencies,
    directories: (await fs.readdir(projectPath, { withFileTypes: true }))
      .filter((d) => d.isDirectory())
      .map((d) => d.name),
    summary: `Detected ${dependencies.length} dependencies.`
  };

  await upsertProjectMap(projectId, map);
  return map;
}
