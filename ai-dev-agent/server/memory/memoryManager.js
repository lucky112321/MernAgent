import { AgentMemory } from '../../database/models/AgentMemory.js';
import { TaskHistory } from '../../database/models/TaskHistory.js';
import { StyleProfile } from '../../database/models/StyleProfile.js';
import { ProjectMap } from '../../database/models/ProjectMap.js';

export async function upsertMemory(projectId, key, value, tags = []) {
  return AgentMemory.findOneAndUpdate(
    { projectId, key },
    { value, tags },
    { upsert: true, new: true }
  );
}

export async function getMemory(projectId, key) {
  return AgentMemory.findOne({ projectId, key }).lean();
}

export async function logTask(payload) {
  return TaskHistory.create(payload);
}

export async function updateTaskStatus(id, status, result = null) {
  return TaskHistory.findByIdAndUpdate(id, { status, result }, { new: true });
}

export async function upsertStyleProfile(projectId, style) {
  return StyleProfile.findOneAndUpdate({ projectId }, style, { upsert: true, new: true });
}

export async function upsertProjectMap(projectId, map) {
  return ProjectMap.findOneAndUpdate({ projectId }, map, { upsert: true, new: true });
}
