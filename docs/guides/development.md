# Development Workflow

This guide covers how to develop and run the project locally.

## Running Services

### Using Docker Compose (Recommended)

Start all services with one command:

```bash
docker-compose up -d
```

This starts:
- PostgreSQL database (port 5432)
- FastAPI backend (port 8000)
- Next.js frontend (port 3000)

View logs:
```bash
docker-compose logs -f
```

Stop services:
```bash
docker-compose down
```

### Running Locally

#### 1. Start Database

```bash
# Using Docker
docker run -d \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=boilerplate \
  -p 5432:5432 \
  timescale/timescaledb:latest-pg16
```

#### 2. Start Backend

```bash
cd backend

# Install dependencies (first time)
uv sync

# Run development server
uv run uvicorn src.main:app --reload --port 8000
```

#### 3. Start Frontend

```bash
cd frontend

# Install dependencies (first time)
pnpm install

# Run development server
pnpm dev
```

## Development URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Next.js app |
| Backend API | http://localhost:8000 | FastAPI |
| Backend Docs | http://localhost:8000/docs | API documentation |
| Backend Health | http://localhost:8000/health | Health check |

## Development Tools

### Database Management

```bash
# Generate migration
cd frontend
pnpm db:generate

# Push schema to database
pnpm db:push

# Open DB studio
pnpm db:studio
```

### Backend REPL

```bash
cd backend
uv run python -c "
from src.agent.graph import create_graph
graph = create_graph()
print(graph.get_graph().draw_ascii())
"
```

## Common Development Tasks

### Adding a New API Route

1. Create route file in `backend/src/api/`
2. Register in `backend/src/main.py`

```python
from fastapi import APIRouter
from .your_route import router

app.include_router(router, prefix="/api")
```

### Adding a Frontend Page

1. Create page in `frontend/src/app/`

```tsx
// frontend/src/app/new-page/page.tsx
export default function NewPage() {
  return <div>New Page</div>
}
```

### Modifying the AI Agent

1. Edit `backend/src/agent/nodes.py` for LLM changes
2. Edit `backend/src/agent/graph.py` for graph changes
3. Edit `backend/src/agent/prompts.py` for prompt changes

## Hot Reloading

Both frontend and backend support hot reloading:

- **Frontend**: Changes to React components reload automatically
- **Backend**: Python files reload on change (via `--reload`)

## Debugging

### Frontend

```bash
# Run with debugging
pnpm dev --debug
```

### Backend

```bash
# Run with verbose logging
uv run uvicorn src.main:app --reload --log-level debug

# Open Python REPL
cd backend
uv run python
```

## Code Quality

### Frontend

```bash
# Type check
cd frontend
pnpm typecheck

# Lint
pnpm lint

# Format
pnpm format
```

### Backend

```bash
# Type check (mypy)
cd backend
uv run mypy src

# Format
uv run ruff format src

# Lint
uv run ruff check src
```

## Next Steps

- [Setup Guide](./setup.md) - Initial setup
- [Custom Agent Guide](./custom-agent.md) - Modifying LangGraph
- [API Routes Guide](./api-routes.md) - Adding new endpoints
