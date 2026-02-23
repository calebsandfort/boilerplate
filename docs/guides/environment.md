# Environment Configuration

This guide details all environment variables used in the project.

## Overview

Environment variables are managed through a single `.env` file at the project root, with symlinks to frontend and backend directories.

```
boilerplate/
├── .env                    # Main environment file
├── frontend/.env          # Symlink → ../.env
└── backend/.env          # Symlink → ../.env
```

## Required Variables

### Database

| Variable | Default | Description |
|----------|---------|-------------|
| `POSTGRES_USER` | `postgres` | Database username |
| `POSTGRES_PASSWORD` | `postgres` | Database password |
| `POSTGRES_DB` | `boilerplate` | Database name |
| `DATABASE_URL` | — | Full connection string |
| `DB_PORT` | `5432` | Database port |

**DATABASE_URL format**:
```
postgresql://[user]:[password]@[host]:[port]/[database]
```

### Authentication

| Variable | Description |
|----------|-------------|
| `BETTER_AUTH_SECRET` | Secret for session encryption (min 32 chars) |
| `BETTER_AUTH_URL` | Frontend URL for auth callbacks |

Generate a secure secret:
```bash
openssl rand -base64 32
```

### OpenAI

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key |

Get your key from: https://platform.openai.com/api-keys

### Backend

| Variable | Default | Description |
|----------|---------|-------------|
| `BACKEND_URL` | `http://localhost:8000` | Backend API URL |
| `BACKEND_PORT` | `8000` | Backend server port |

### Frontend

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_BETTER_AUTH_URL` | `http://localhost:3000` | Public auth URL |

## Example .env File

```env
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=boilerplate
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/boilerplate
DB_PORT=5432

# Better Auth
BETTER_AUTH_SECRET=your-super-secret-key-at-least-32-characters-long
BETTER_AUTH_URL=http://localhost:3000

# OpenAI
OPENAI_API_KEY=sk-your-openai-api-key

# Backend
BACKEND_URL=http://localhost:8000
BACKEND_PORT=8000

# Frontend (public)
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

## Loading Order

**Critical**: In `backend/src/main.py`, `dotenv.load_dotenv()` MUST be called before any LangChain/OpenAI imports:

```python
# main.py - CORRECT
import dotenv
dotenv.load_dotenv()  # Load FIRST

from langchain_openai import ChatOpenAI  # Now safe to import
# ...
```

This is required because `ChatOpenAI` reads `OPENAI_API_KEY` at import time.

## Development vs Production

### Development

Use localhost URLs:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/boilerplate
BACKEND_URL=http://localhost:8000
BETTER_AUTH_URL=http://localhost:3000
```

### Production

Use production URLs:
```env
DATABASE_URL=postgresql://user:password@prod-host:5432/prod-db
BACKEND_URL=https://api.yourdomain.com
BETTER_AUTH_URL=https://yourdomain.com
```

## Next Steps

- [Setup Guide](./setup.md) - Initial setup
- [Development Workflow](./development.md) - Running locally
- [API Reference](../api/rest.md) - Backend endpoints
