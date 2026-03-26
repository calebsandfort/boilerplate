#!/usr/bin/env bash
set -e

SESSION="boilerplate"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Start only the database
echo "Starting database..."
docker compose up -d db

# If already in a tmux session, warn and exit
if [ -n "$TMUX" ]; then
  echo "Already inside a tmux session. Run this outside of tmux."
  exit 1
fi

# Kill existing session if it exists
tmux kill-session -t "$SESSION" 2>/dev/null || true

# Create new detached session, start in project root
tmux new-session -d -s "$SESSION" -c "$ROOT"

# Split vertically to create top row (backend + frontend) and bottom (api)
tmux split-window -v -t "$SESSION" -c "$ROOT"

# Select top pane and split horizontally for backend/frontend
tmux select-pane -t "$SESSION:0.0"
tmux split-window -h -t "$SESSION" -c "$ROOT"

# Top-left: backend
tmux send-keys -t "$SESSION:0.0" "cd backend && uv run uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload" Enter

# Top-right: frontend
tmux send-keys -t "$SESSION:0.1" "cd frontend && pnpm dev" Enter

# Bottom: API
tmux send-keys -t "$SESSION:0.2" "set -a && source $ROOT/.env && set +a && cd api && dotnet watch run" Enter

# Focus backend pane
tmux select-pane -t "$SESSION:0.0"

# Attach
tmux attach-session -t "$SESSION"
