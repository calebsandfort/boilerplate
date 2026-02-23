# Agent Pipeline

This document details the LangGraph AI agent implementation in the backend.

## Overview

The backend uses LangGraph to create a stateful AI agent that:
- Maintains conversation history via MemorySaver checkpointer
- Processes messages through a StateGraph
- Uses OpenAI's GPT-4o-mini model

## Agent Architecture

![Agent Pipeline](../diagrams/agent-pipeline.svg)

## File Structure

```
backend/src/agent/
├── graph.py       # LangGraph StateGraph definition
├── nodes.py      # Graph nodes (chat processing)
├── state.py      # AgentState TypedDict
└── prompts.py    # System prompts
```

## State Definition

**File**: `backend/src/agent/state.py`

```python
from typing import TypedDict, Annotated
from langchain_core.messages import BaseMessage
from operator import add

class AgentState(TypedDict):
    messages: Annotated[list[BaseMessage], add]
```

## Graph Construction

**File**: `backend/src/agent/graph.py`

```python
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from .state import AgentState
from .nodes import chat_node

def create_graph() -> StateGraph:
    workflow = StateGraph(AgentState)

    # Add node
    workflow.add_node("chat", chat_node)

    # Set entry point
    workflow.set_entry_point("chat")

    # Add edge to end
    workflow.add_edge("chat", END)

    # Compile with checkpointer (REQUIRED)
    return workflow.compile(checkpointer=MemorySaver())
```

**Critical**: The graph MUST have a checkpointer (MemorySaver) because `LangGraphAGUIAgent.run()` calls `aget_state` which requires it.

## Chat Node

**File**: `backend/src/agent/nodes.py`

```python
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)

async def chat_node(state: AgentState) -> AgentState:
    response = await llm.ainvoke(state["messages"])
    return {"messages": [response]}
```

## Agent Initialization

**File**: `backend/src/main.py`

```python
from copilotkit import LangGraphAGUIAgent
from .agent.graph import create_graph

# Create graph instance
graph = create_graph()

# Create agent (NOTE: Use LangGraphAGUIAgent, NOT LangGraphAgent)
agent = LangGraphAGUIAgent(
    name="chat_agent",
    graph=graph,
)

# Add endpoint
add_langgraph_fastapi_endpoint(
    app,
    agent,
    "/copilotkit"
)
```

## Key Integration Points

| Component | Class/Function | Purpose |
|-----------|----------------|---------|
| Agent | `LangGraphAGUIAgent` | AG-UI protocol agent |
| Graph | `StateGraph` | State machine definition |
| Checkpointer | `MemorySaver` | Conversation persistence |
| Node | `chat_node` | LLM invocation |
| LLM | `ChatOpenAI` | OpenAI GPT-4o-mini |

## Customizing the Agent

### Change the Model

Edit `backend/src/agent/nodes.py`:

```python
llm = ChatOpenAI(model="gpt-4o", temperature=0.7)
```

### Add Custom Nodes

```python
async def tool_node(state: AgentState) -> AgentState:
    # Custom logic
    return {"messages": [...]}
```

Then add to graph:

```python
workflow.add_node("tools", tool_node)
workflow.add_edge("chat", "tools")
```

### Add System Prompt

Edit `backend/src/agent/prompts.py` and pass to LLM in `chat_node`.

## Next Steps

- [API Reference](../api/copilotkit.md) - CopilotKit integration
- [Custom Agent Guide](../guides/custom-agent.md) - Extension examples
