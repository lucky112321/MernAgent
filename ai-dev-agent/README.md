# Personal MERN AI Developer Agent

## 1. System Architecture Overview
A modular autonomous software engineering assistant built on MERN. It exposes both an Express API and CLI, and provides a React dashboard for live operations. The orchestrator coordinates planning, code reasoning, repository analysis, tool execution, debugging, and persistent memory.

## 2. Component Breakdown
- **LLM Core Brain (`server/llm/llmClient.js`)**: request understanding, code-generation reasoning, debugging guidance.
- **Agent Orchestrator (`server/agent/orchestrator.js`)**: primary control loop and subsystem coordination.
- **Task Planning (`server/agent/planner.js`)**: command-to-step decomposition.
- **Repository Analyzer (`server/repo/repoAnalyzer.js`)**: dependency/framework detection and architecture map creation.
- **Style Learning (`server/memory/styleLearner.js`)**: coding pattern mining and profile persistence.
- **Memory System (`server/memory/memoryManager.js`)**: persistent memory + task history access layer.
- **Tool Engine (`server/tools/*.js`)**: file operations and shell command execution.
- **Debugging Engine (`server/agent/debugger.js`)**: run/analyze/fix suggestion loop.
- **CLI (`cli/agentCLI.js`)**: terminal command surface.
- **Dashboard (`dashboard/`)**: chat, queue, insights, and logs UI.

## 3. Technology Stack
- **Backend**: Node.js, Express, Mongoose, OpenAI SDK
- **Frontend**: React, React Router, Vite
- **Storage**: MongoDB
- **CLI**: Commander.js

## 4. Project Folder Structure
```text
ai-dev-agent/
├── server/
│   ├── agent/
│   ├── config/
│   ├── llm/
│   ├── memory/
│   ├── repo/
│   ├── routes/
│   └── tools/
├── cli/
├── dashboard/
└── database/models/
```

## 5. Implementation of Core Modules
- The orchestrator executes the loop: receive command → analyze repo → learn style → plan steps → invoke LLM → debug cycle → persist memory.
- Debugging engine runs shell checks and asks the LLM for stack-trace-based repair plans.
- Memory manager writes/reads `agent_memory`, `task_history`, `style_profile`, and `project_map`-backed data models.

## 6. Example Code for Each Module
See files:
- `server/agent/orchestrator.js`
- `server/agent/planner.js`
- `server/agent/debugger.js`
- `server/repo/repoAnalyzer.js`
- `server/memory/styleLearner.js`
- `server/tools/fileEditor.js`
- `server/tools/shellRunner.js`

## 7. CLI Implementation
Examples:
- `agent run --command "build authentication system"`
- `agent build-auth`
- `agent fix-login-bug`
- `agent analyze-project`

## 8. React Dashboard Structure
- **Chat**: submit commands to `/api/agent/execute`
- **Task Queue**: render queued/completed jobs
- **Project Insights**: repository and style summaries
- **Logs**: activity and debug stream

## 9. MongoDB Schema Design
Collections implemented in `database/models/`:
- `AgentMemory`: generic key/value memory per project
- `TaskHistory`: command execution history and outcomes
- `StyleProfile`: coding preferences and inferred conventions
- `ProjectMap`: architecture and dependency summaries

## 10. Setup and Installation Guide
1. Install dependencies:
   - `cd ai-dev-agent && npm install`
   - `npm install --prefix cli`
2. Create `.env` in `server/`:
   - `MONGO_URI=mongodb://127.0.0.1:27017/ai_dev_agent`
   - `OPENAI_API_KEY=...`
3. Start services:
   - `npm run server` (API)
   - `npm run dashboard` (UI)
4. Optional CLI global link:
   - `cd cli && npm link`

## 11. Example Agent Commands
- `build authentication system`
- `fix login bug`
- `create API for tasks`
- `analyze project`
- `add notification feature`

## 12. Future Improvements
- Sandboxed patch generation with approval gates
- AST-aware codemods and symbol graph memory
- Multi-agent mode (planner/coder/reviewer)
- Unit and integration test auto-generation
- Git branching and pull-request automation hooks
