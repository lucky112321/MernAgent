import express from 'express';
import { executeAgentCommand } from '../agent/orchestrator.js';

const router = express.Router();

router.post('/execute', async (req, res) => {
  try {
    const { projectId, command, projectPath } = req.body;
    if (!command) {
      return res.status(400).json({ error: 'command is required' });
    }

    const result = await executeAgentCommand({ projectId, command, projectPath });
    return res.json({ ok: true, result });
  } catch (error) {
    return res.status(500).json({ ok: false, error: error.message });
  }
});

export default router;
