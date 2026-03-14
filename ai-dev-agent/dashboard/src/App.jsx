import { NavLink, Route, Routes } from 'react-router-dom';
import ChatPage from './pages/ChatPage.jsx';
import TaskQueuePage from './pages/TaskQueuePage.jsx';
import ProjectInsightsPage from './pages/ProjectInsightsPage.jsx';
import LogsPage from './pages/LogsPage.jsx';

export default function App() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>AI Dev Agent</h2>
        <nav>
          <NavLink to="/">Chat</NavLink>
          <NavLink to="/tasks">Task Queue</NavLink>
          <NavLink to="/insights">Project Insights</NavLink>
          <NavLink to="/logs">Logs</NavLink>
        </nav>
      </aside>
      <main className="content">
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/tasks" element={<TaskQueuePage />} />
          <Route path="/insights" element={<ProjectInsightsPage />} />
          <Route path="/logs" element={<LogsPage />} />
        </Routes>
      </main>
    </div>
  );
}
