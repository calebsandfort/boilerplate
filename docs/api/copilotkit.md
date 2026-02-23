# CopilotKit Integration

This document describes the CopilotKit integration between frontend and backend.

## Overview

The AI chat functionality uses the AG-UI Protocol through CopilotKit:

1. Frontend sends messages to `/api/copilotkit`
2. Next.js proxies to FastAPI `/copilotkit` endpoint
3. LangGraph agent processes the request
4. Response streams back to the UI

## Frontend API Route

**File**: `frontend/src/app/api/copilotkit/route.ts`

```typescript
import { CopilotRuntime, HttpAgent } from "@ag-ui/client"

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000"

export async function POST(req: Request) {
  const copilotRuntime = new CopilotRuntime()

  const agent = new HttpAgent({
    url: `${BACKEND_URL}/copilotkit`,
  })

  return copilotRuntime.handler(req, agent)
}
```

**Key Points**:
- Uses `@ag-ui/client` HttpAgent (NOT raw fetch)
- Proxies to backend at `/copilotkit`
- BACKEND_URL defaults to `http://localhost:8000`

## Backend Endpoint

**File**: `backend/src/main.py`

```python
from copilotkit import LangGraphAGUIAgent, add_langgraph_fastapi_endpoint
from fastapi import FastAPI
from .agent.graph import create_graph

app = FastAPI()

graph = create_graph()
agent = LangGraphAGUIAgent(name="chat_agent", graph=graph)

add_langgraph_fastapi_endpoint(app, agent, "/copilotkit")
```

**URL**: `http://localhost:8000/copilotkit`

**Method**: WebSocket upgrade (handled by CopilotKit)

## Agent Name Consistency

The agent name must match across all three locations:

| Location | File | Agent Name |
|----------|------|------------|
| Backend | `backend/src/main.py` | `chat_agent` |
| Frontend API | `frontend/src/app/api/copilotkit/route.ts` | (proxy only) |
| CopilotProvider | `frontend/src/components/providers/copilot-provider.tsx` | `chat_agent` |

## CopilotProvider Configuration

**File**: `frontend/src/components/providers/copilot-provider.tsx`

```tsx
import { CopilotKit } from "@copilotkit/react-core"

export function CopilotProvider({ children }) {
  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit"
      agent="chat_agent"
    >
      {children}
    </CopilotKit>
  )
}
```

## Chat Components

### CopilotPopup

The default chat UI component:

```tsx
import { CopilotPopup } from "@copilotkit/react-ui"

export function ChatButton() {
  return (
    <CopilotPopup
      labels={{
        title: "AI Assistant",
        initial: "Hi! How can I help you today?"
      }}
    />
  )
}
```

### Custom Chat

For custom UI, use `useCopilotChat`:

```tsx
import { useCopilotChat } from "@copilotkit/react-core"

function CustomChat() {
  const { messages, input, setInput, sendMessage } = useCopilotChat()

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>{m.content}</div>
      ))}
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === "Enter" && sendMessage()}
      />
    </div>
  )
}
```

## Next Steps

- [Agent Pipeline](../architecture/agent.md) - LangGraph details
- [Component Docs](../components/copilot-chat.md) - Chat UI reference
