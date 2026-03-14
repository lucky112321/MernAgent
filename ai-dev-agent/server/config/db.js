import mongoose from 'mongoose';

export async function connectDB() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai_dev_agent';
  await mongoose.connect(mongoUri, {
    autoIndex: true
  });
  return mongoose.connection;
}
