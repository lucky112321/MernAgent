import mongoose from 'mongoose';

const taskHistorySchema = new mongoose.Schema(
  {
    projectId: { type: String, index: true, required: true },
    command: { type: String, required: true },
    plan: [{ type: String }],
    result: { type: mongoose.Schema.Types.Mixed },
    status: { type: String, enum: ['pending', 'running', 'completed', 'failed'], default: 'pending' }
  },
  { timestamps: true }
);

export const TaskHistory = mongoose.model('TaskHistory', taskHistorySchema);
