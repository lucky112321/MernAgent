import { useState } from 'react';
import { runAgentCommand } from '../services/api.js';

export default function ChatPage() {
  const [command, setCommand] = useState('analyze project');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await runAgentCommand(command);
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <h1>Chat</h1>
      <form onSubmit={handleSubmit} className="chat-form">
        <input value={command} onChange={(e) => setCommand(e.target.value)} placeholder="build authentication system" />
        <button type="submit" disabled={loading}>{loading ? 'Running...' : 'Run'}</button>
      </form>
      {error && <p className="error">{error}</p>}
      {result && <pre className="panel">{JSON.stringify(result, null, 2)}</pre>}
    </section>
  );
}
