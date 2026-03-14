const API_BASE = import.meta.env.VITE_AGENT_API || 'http://localhost:5000/api/agent';

export async function runAgentCommand(command) {
  const response = await fetch(`${API_BASE}/execute`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ command, projectId: 'dashboard-project' })
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Failed to run command');
  return data.result;
}
