import mongoose from 'mongoose';

const styleProfileSchema = new mongoose.Schema(
  {
    projectId: { type: String, index: true, required: true, unique: true },
    namingPreference: { type: String, default: 'camelCase' },
    functionStyle: { type: String, default: 'arrow' },
    apiPattern: { type: String, default: 'REST' },
    componentPattern: { type: String, default: 'functional-react' },
    notes: [String]
  },
  { timestamps: true }
);

export const StyleProfile = mongoose.model('StyleProfile', styleProfileSchema);
