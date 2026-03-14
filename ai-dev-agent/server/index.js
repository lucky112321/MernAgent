import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import agentRoutes from './routes/agentRoutes.js';
import { connectDB } from './config/db.js';

const app = express();

app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'ai-dev-agent-server' });
});

app.use('/api/agent', agentRoutes);

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`AI Dev Agent server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to database', error);
    process.exit(1);
  });
