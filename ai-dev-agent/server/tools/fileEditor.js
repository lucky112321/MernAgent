import fs from 'fs/promises';
import path from 'path';

export async function readFile(filePath) {
  return fs.readFile(filePath, 'utf-8');
}

export async function writeFile(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, content, 'utf-8');
  return { filePath, bytes: Buffer.byteLength(content, 'utf-8') };
}

export async function appendFile(filePath, content) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.appendFile(filePath, content, 'utf-8');
  return { filePath, appendedBytes: Buffer.byteLength(content, 'utf-8') };
}

export async function patchFile(filePath, searchValue, replaceValue) {
  const existing = await fs.readFile(filePath, 'utf-8');
  const updated = existing.replace(searchValue, replaceValue);
  await fs.writeFile(filePath, updated, 'utf-8');
  return { filePath, updated: existing !== updated };
}
