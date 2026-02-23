# Architecture

Documentation of the system's design and structure.

## Overview

The boilerplate follows a clean separation of concerns:
- **Frontend**: Next.js handles UI, auth, and database
- **Backend**: FastAPI handles AI/LLM processing
- **Database**: PostgreSQL with Drizzle ORM

## Core Concepts

| Document | Description |
|----------|-------------|
| [System Overview](./overview.md) | High-level architecture |
| [Data Flow](./data-flow.md) | Request/response flows |
| [Component Architecture](./components.md) | Frontend structure |
| [Agent Pipeline](./agent.md) | LangGraph AI agent |

## Architecture Diagrams

- [System Architecture](../diagrams/system-architecture.svg)
- [Auth Flow](../diagrams/auth-flow.svg)
- [AI Chat Flow](../diagrams/ai-chat-flow.svg)
- [Database Flow](../diagrams/database-flow.svg)
- [Component Hierarchy](../diagrams/component-hierarchy.svg)
- [Agent Pipeline](../diagrams/agent-pipeline.svg)

## Key Design Decisions

1. **Auth in Frontend**: Better Auth runs in Next.js API routes
2. **AI in Backend**: LangGraph agents isolated in FastAPI
3. **CopilotKit Proxy**: Frontend proxies all AI traffic to backend
4. **Checkpointer Required**: LangGraph graph needs MemorySaver

## Next Steps

- [Setup Guide](../guides/setup.md) - Get started
- [API Reference](../api/rest.md) - Backend endpoints
- [Components](../components/index.md) - UI components
