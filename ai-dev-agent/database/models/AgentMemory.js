import mongoose from 'mongoose';

const agentMemorySchema = new mongoose.Schema(
  {
    projectId: { type: String, index: true, required: true },
    key: { type: String, required: true },
    value: { type: mongoose.Schema.Types.Mixed, required: true },
    tags: [String]
  },
  { timestamps: true }
);

agentMemorySchema.index({ projectId: 1, key: 1 }, { unique: true });

export const AgentMemory = mongoose.model('AgentMemory', agentMemorySchema);
