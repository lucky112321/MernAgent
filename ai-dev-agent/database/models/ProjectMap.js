import mongoose from 'mongoose';

const projectMapSchema = new mongoose.Schema(
  {
    projectId: { type: String, index: true, required: true, unique: true },
    framework: String,
    backend: String,
    database: String,
    dependencies: [String],
    directories: [String],
    summary: String
  },
  { timestamps: true }
);

export const ProjectMap = mongoose.model('ProjectMap', projectMapSchema);
