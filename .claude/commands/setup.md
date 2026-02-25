# Setup Project

This command performs all the steps necessary to get the project up and running after cloning.

## Steps

1. **Install frontend dependencies**
   ```bash
   cd frontend && pnpm install
   ```

2. **Install backend dependencies**
   ```bash
   cd backend && uv sync
   ```

3. **Copy environment files**
   ```bash
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   ```

4. **Start Docker services (database)**
   ```bash
   docker-compose up -d db
   ```

5. **Start backend server**
   ```bash
   cd backend && uv run uvicorn src.main:app --reload
   ```

6. **Start frontend server**
   ```bash
   cd frontend && pnpm dev
   ```

## Verification

After setup, verify the following endpoints:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Backend Health: http://localhost:8000/health
