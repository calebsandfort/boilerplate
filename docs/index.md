# Boilerplate Documentation

Welcome to the AI-powered full-stack boilerplate documentation. This project provides a production-ready foundation with Next.js, FastAPI, LangGraph, and CopilotKit integration.

## Overview

This boilerplate implements a modern AI-powered application architecture:

- **Frontend**: Next.js 15 with App Router, Tailwind CSS, ShadCN/ui
- **Backend**: FastAPI with LangGraph for AI agent orchestration
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth (self-hosted)
- **AI Integration**: CopilotKit with LangGraph (AG-UI Protocol)

## Quick Links

### Getting Started
- [Setup Guide](./guides/setup.md) - Initial project setup
- [Environment Configuration](./guides/environment.md) - Environment variables
- [Development Workflow](./guides/development.md) - Running the project locally

### Architecture
- [System Overview](./architecture/overview.md) - High-level architecture
- [Data Flow](./architecture/data-flow.md) - Request/response flow
- [Component Architecture](./architecture/components.md) - Frontend component structure
- [Agent Pipeline](./architecture/agent.md) - LangGraph AI agent details

### API Reference
- [REST Endpoints](./api/rest.md) - Backend API endpoints
- [CopilotKit Integration](./api/copilotkit.md) - AI chat integration
- [Database Schema](./api/database.md) - Drizzle schema reference

### Components
- [CopilotProvider](./components/copilot-provider.md) - AI context provider
- [CopilotChat](./components/copilot-chat.md) - Chat UI component
- [Authentication](./components/auth.md) - Auth forms and hooks

### Guides
- [Adding New API Routes](./guides/api-routes.md) - Extending the backend
- [Customizing the AI Agent](./guides/custom-agent.md) - Modifying LangGraph
- [Database Migrations](./guides/migrations.md) - Managing schema changes

## Project Structure

```
boilerplate/
├── docs/                    # Documentation
│   ├── architecture/        # System architecture
│   ├── api/                 # API reference
│   ├── components/          # Component docs
│   ├── guides/              # How-to guides
│   └── diagrams/            # SVG diagrams
├── frontend/                # Next.js application
│   └── src/
│       ├── app/             # Pages and API routes
│       ├── components/      # React components
│       ├── lib/            # Utilities and config
│       └── db/             # Database schema
├── backend/                # FastAPI application
│   └── src/
│       ├── agent/          # LangGraph agent
│       ├── api/           # REST endpoints
│       └── main.py        # Entry point
└── docker-compose.yml      # Service orchestration
```

## Key Technologies

| Technology | Purpose |
|------------|---------|
| Next.js 15 | Frontend framework |
| FastAPI | Backend API |
| LangGraph | AI agent orchestration |
| CopilotKit | AI UI integration |
| Drizzle | Database ORM |
| Better Auth | Authentication |

## Need Help?

- Check the [guides](./guides/) for step-by-step instructions
- Review the [architecture](./architecture/) for system design
- Explore [components](./components/) for UI implementation details
