# Setup Guide

This guide covers the initial setup of the aurelius-ledger project.

## Prerequisites

- **Node.js** 18+ (for frontend)
- **Python** 3.10+ (for backend)
- **pnpm** (frontend package manager)
- **uv** (backend package manager)
- **Docker** & Docker Compose

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd aurelius-ledger

# Install frontend dependencies
cd frontend && pnpm install

# Install backend dependencies
cd ../backend && uv sync
```

### 2. Environment Variables

The project uses a root `.env` for Docker Compose plus scoped `.env` files in each service directory:

```bash
# Copy example env files
cp .env.example .env
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

Edit the files with your settings:

**frontend/.env:**
```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/aurelius-ledger

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-min-32-chars-long
BETTER_AUTH_URL=http://localhost:3000

# Backend
BACKEND_URL=http://localhost:8000
```

**backend/.env:**
```env
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/aurelius-ledger

# OpenAI
OPENAI_API_KEY=sk-your-openai-key

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-min-32-chars-long
BETTER_AUTH_URL=http://localhost:3000

# Ports
DB_PORT=5432
BACKEND_PORT=8000
```

### 3. Start Services

```bash
# Start all services with Docker Compose
docker-compose up -d

# Or run locally (requires PostgreSQL running)
cd frontend && pnpm dev
cd backend && uv run uvicorn src.main:app --reload
```

### 4. Verify Setup

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Backend Health: http://localhost:8000/health

## Project Structure

```
aurelius-ledger/
├── frontend/          # Next.js application
│   ├── src/
│   │   ├── app/     # Pages and API routes
│   │   ├── components/ # React components
│   │   ├── lib/     # Utilities
│   │   └── db/      # Database schema
│   ├── package.json
│   └── drizzle.config.ts
├── backend/          # FastAPI application
│   ├── src/
│   │   ├── agent/   # LangGraph agent
│   │   ├── api/     # REST endpoints
│   │   └── main.py  # Entry point
│   ├── pyproject.toml
│   └── .python-version
├── docker-compose.yml
├── .env
└── README.md
```

## Common Issues

### Port Already in Use

If ports 3000, 5432, or 8000 are in use:

```bash
# Kill processes on common ports
lsof -ti:3000 | xargs kill -9
lsof -ti:5432 | xargs kill -9
lsof -ti:8000 | xargs kill -9
```

### Database Connection Failed

Ensure PostgreSQL is running:

```bash
docker-compose up -d db
```

### Missing Dependencies

```bash
# Frontend
cd frontend && pnpm install

# Backend
cd backend && uv sync
```

## Next Steps

- [Environment Configuration](./environment.md) - Detailed env var reference
- [Development Workflow](./development.md) - Running locally
- [Architecture Overview](../architecture/overview.md) - System design
