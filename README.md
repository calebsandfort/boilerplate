# Full-Stack Boilerplate

A production-ready full-stack boilerplate with Next.js, FastAPI, LangGraph, and CopilotKit.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), TypeScript, Tailwind CSS 4, ShadCN/ui |
| Auth | Better Auth (self-hosted, runs in Next.js API routes) |
| Database | TimescaleDB (PostgreSQL 16 + time-series), Drizzle ORM |
| Backend | FastAPI, Python 3.12, LangGraph, CopilotKit AG-UI |
| AI/LLM | LangGraph agents, CopilotKit frontend SDK, OpenAI |
| Containers | Docker Compose (3 services: db, backend, frontend) |

---

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- [Node.js 22+](https://nodejs.org/) and [pnpm](https://pnpm.io/installation)
- [Python 3.12](https://www.python.org/) and [uv](https://docs.astral.sh/uv/getting-started/installation/)
- An [OpenAI API key](https://platform.openai.com/api-keys)

---

## Getting Started

### 1. Clone and rename

```bash
git clone <repo-url> my-project
cd my-project
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in your values:

```env
# Database — defaults work for local Docker setup
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=boilerplate

# Change the DB name above and in the URL below to match your project
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/boilerplate

# Better Auth — generate a random secret
# Run: openssl rand -base64 32
BETTER_AUTH_SECRET=change-me-to-a-random-secret
BETTER_AUTH_URL=http://localhost:3000

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# Backend URL (used by frontend to reach the FastAPI service)
BACKEND_URL=http://localhost:8000
```

### 3. Start the Docker services

This starts TimescaleDB, the FastAPI backend, and the Next.js frontend with hot reload:

```bash
docker compose up --build
```

Services will be available at:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:8000
- **Database:** localhost:5432

> The first build downloads images and installs dependencies — this takes a few minutes.
> Subsequent starts are much faster: `docker compose up`

### 4. Run database migrations

In a separate terminal, push the Drizzle schema to the database:

```bash
cd frontend
pnpm install
pnpm drizzle-kit push
```

> This creates the auth tables (user, session, account, verification) in your database.

---

## Local Development (without Docker)

If you prefer to run services directly on your machine:

**Database:** You still need PostgreSQL running locally (or use `docker compose up db`).

**Backend:**
```bash
cd backend
uv sync
uv run uvicorn src.main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
pnpm install
pnpm dev
```

---

## Connecting to a New Git Repository

After cloning, detach from the original remote and connect to your own:

```bash
# Remove the original remote
git remote remove origin

# Add your new repository as origin
git remote add origin https://github.com/your-username/your-repo.git

# Push the initial commit
git push -u origin main
```

If you want a clean history (single initial commit):

```bash
# Remove git history entirely
rm -rf .git

# Initialize a fresh repo
git init
git add .
git commit -m "feat: initial project from boilerplate"

# Connect to your remote
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

---

## Project Structure

```
.
├── docker-compose.yml          # Orchestrates db, backend, frontend
├── .env.example                # Template — copy to .env and fill in
├── scripts/
│   └── init-db.sql             # Enables TimescaleDB extension on first run
│
├── frontend/                   # Next.js application
│   ├── src/
│   │   ├── app/                # App Router pages and API routes
│   │   ├── components/         # UI and feature components
│   │   ├── db/schema/          # Drizzle schema definitions
│   │   ├── lib/                # Auth, DB client, utilities
│   │   └── middleware.ts       # Route protection
│   ├── drizzle/                # Generated migrations
│   └── drizzle.config.ts
│
└── backend/                    # FastAPI application
    └── src/
        ├── main.py             # App entry point (load_dotenv FIRST)
        ├── config.py           # Pydantic settings
        ├── agent/              # LangGraph agent (state, nodes, graph)
        └── api/                # REST routes (health, etc.)
```

---

## Useful Commands

### Frontend

```bash
cd frontend
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm test             # Run tests (Vitest)
pnpm test:watch       # Tests in watch mode
pnpm lint             # ESLint
pnpm drizzle-kit push         # Push schema changes to DB
pnpm drizzle-kit generate     # Generate migration files
pnpm drizzle-kit studio       # Open Drizzle Studio (DB browser)
```

### Backend

```bash
cd backend
uv sync                        # Install dependencies
uv run uvicorn src.main:app --reload   # Start dev server
uv run pytest                  # Run tests
```

### Docker Compose

```bash
docker compose up --build      # Build and start all services
docker compose up              # Start (after first build)
docker compose down            # Stop all services
docker compose down -v         # Stop and remove volumes (wipes DB)
docker compose logs -f backend # Stream backend logs
docker compose logs -f frontend
```

---

## Key Architecture Decisions

- **Auth lives in the frontend** — Better Auth runs in Next.js API routes; the FastAPI backend has no auth logic.
- **AI lives in the backend** — LangGraph agents and OpenAI calls are isolated to FastAPI.
- **CopilotKit traffic is proxied** — The frontend `/api/copilotkit` route forwards to the backend; the backend is never exposed directly to the browser.
- **`load_dotenv()` must be first** — `backend/src/main.py` loads the `.env` before any LangChain/OpenAI imports, because `ChatOpenAI` reads `OPENAI_API_KEY` at import time.
- **LangGraph graph requires a checkpointer** — The graph is compiled with `MemorySaver()` so `LangGraphAGUIAgent` can call `aget_state`.
