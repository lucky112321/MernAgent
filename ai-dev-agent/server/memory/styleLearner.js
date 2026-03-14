import fs from 'fs/promises';
import path from 'path';
import { upsertStyleProfile } from './memoryManager.js';

const JS_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx']);

export async function learnCodingStyle(projectId, projectPath) {
  const style = {
    namingPreference: 'camelCase',
    functionStyle: 'arrow',
    apiPattern: 'REST',
    componentPattern: 'functional-react',
    notes: []
  };

  const files = await fs.readdir(projectPath, { withFileTypes: true });
  const jsFiles = files.filter((entry) => entry.isFile() && JS_EXTENSIONS.has(path.extname(entry.name)));

  for (const file of jsFiles.slice(0, 20)) {
    const content = await fs.readFile(path.join(projectPath, file.name), 'utf-8');
    if (/function\s+[A-Z]/.test(content)) style.notes.push('Contains PascalCase function declarations');
    if (/const\s+\w+\s*=\s*async\s*\(/.test(content)) style.functionStyle = 'async-arrow';
    if (/router\.(get|post|put|delete)/.test(content)) style.apiPattern = 'REST-express-router';
    if (/useState\(/.test(content)) style.componentPattern = 'hooks-react';
  }

  return upsertStyleProfile(projectId, style);
}
