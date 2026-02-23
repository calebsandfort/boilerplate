# Customizing the AI Agent

This guide explains how to modify and extend the LangGraph AI agent.

## Agent Structure

```
backend/src/agent/
├── graph.py     # StateGraph definition
├── nodes.py    # Graph nodes
├── state.py    # AgentState type
└── prompts.py  # System prompts
```

## Modifying the LLM

Change the model in `backend/src/agent/nodes.py`:

```python
from langchain_openai import ChatOpenAI

# Change model
llm = ChatOpenAI(
    model="gpt-4o",  # Changed from gpt-4o-mini
    temperature=0.7,
)

async def chat_node(state: AgentState) -> AgentState:
    response = await llm.ainvoke(state["messages"])
    return {"messages": [response]}
```

### Available Models

- `gpt-4o` - Latest GPT-4
- `gpt-4o-mini` - Faster, cheaper (current default)
- `gpt-4-turbo` - GPT-4 Turbo
- `o1` - OpenAI reasoning model (different API)

## Adding Custom Prompts

Edit `backend/src/agent/prompts.py`:

```python
SYSTEM_PROMPT = """You are a helpful AI assistant specialized in coding.
You should:
- Provide clear, concise code examples
- Explain concepts simply
- Suggest best practices
"""
```

Use in `nodes.py`:

```python
from langchain_core.messages import HumanMessage, SystemMessage
from .prompts import SYSTEM_PROMPT

async def chat_node(state: AgentState) -> AgentState:
    # Prepend system prompt
    messages = [
        SystemMessage(content=SYSTEM_PROMPT),
        *state["messages"]
    ]
    response = await llm.ainvoke(messages)
    return {"messages": [response]}
```

## Adding New Nodes

### 1. Create the Node

```python
# backend/src/agent/nodes.py

async def research_node(state: AgentState) -> AgentState:
    """Node that performs web research."""
    last_message = state["messages"][-1]
    query = last_message.content

    # Perform research (simplified)
    result = await search_web(query)

    return {"messages": [HumanMessage(content=f"Research results: {result}")]}
```

### 2. Add to Graph

```python
# backend/src/agent/graph.py

from .nodes import chat_node, research_node

def create_graph() -> StateGraph:
    workflow = StateGraph(AgentState)

    # Add nodes
    workflow.add_node("chat", chat_node)
    workflow.add_node("research", research_node)

    # Set entry point
    workflow.set_entry_point("chat")

    # Add conditional edges
    workflow.add_conditional_edges(
        "chat",
        should_research,
        {
            "research": "research",
            "respond": "END"
        }
    )

    workflow.add_edge("research", "chat")

    return workflow.compile(checkpointer=MemorySaver())

def should_research(state: AgentState) -> str:
    """Determine if we need to research."""
    last_message = state["messages"][-1]
    if "research" in last_message.content.lower():
        return "research"
    return "respond"
```

## Adding Tools

Add tools that the agent can use:

```python
from langchain_core.tools import tool

@tool
def calculate(expression: str) -> str:
    """Evaluate a mathematical expression."""
    return str(eval(expression))

# Use with ChatOpenAI
llm_with_tools = llm.bind_tools([calculate])
```

## Conversation Memory

The agent uses `MemorySaver` checkpointer for conversation persistence:

```python
from langgraph.checkpoint.memory import MemorySaver

# Conversation persists across requests
graph = workflow.compile(checkpointer=MemorySaver())
```

For persistent storage:

```python
from langgraph.checkpoint.postgres import PostgresSaver

# Requires database setup
checkpointer = PostgresSaver(connections)
graph = workflow.compile(checkpointer=checkpointer)
```

## Testing the Agent

```python
# backend/src/test_agent.py
from src.agent.graph import create_graph

async def test_agent():
    graph = create_graph()
    config = {"configurable": {"thread_id": "test"}}

    result = await graph.ainvoke(
        {"messages": [HumanMessage(content="Hello!")]},
        config
    )

    print(result["messages"][-1].content)
```

## Best Practices

1. **Always use checkpointer** - Required for `aget_state` calls
2. **Keep nodes small** - Single responsibility
3. **Handle errors** - Return error messages in state
4. **Test incremental** - Build graph step by step
5. **Use type hints** - AgentState TypedDict for clarity

## Next Steps

- [Agent Architecture](../architecture/agent.md) - Detailed agent design
- [CopilotKit Integration](../api/copilotkit.md) - Frontend integration
- [Database Guide](./migrations.md) - Schema management
