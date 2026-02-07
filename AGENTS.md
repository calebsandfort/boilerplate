# Boilerplate Project AGENTS.md

[This is an example project-level CLAUDE.md file. Place this in your project root.]

## Project Overview

[Brief description of your project - what it does, tech stack]

## Critical Rules

### 1. Code Organization

- Many small files over few large files
- High cohesion, low coupling
- 200-400 lines typical, 800 max per file
- Organize by feature/domain, not by type

### 2. Code Style

- No emojis in code, comments, or documentation
- Immutability always - never mutate objects or arrays
- No console.log in production code
- Proper error handling with try/catch
- Input validation with Zod or similar

### 3. Testing

- TDD: Write tests first
- 80% minimum coverage
- Unit tests for utilities
- Integration tests for APIs
- E2E tests for critical flows

### 4. Security

- No hardcoded secrets
- Environment variables for sensitive data
- Validate all user inputs
- Parameterized queries only
- CSRF protection enabled

---

## Development Guide

### 1. Design System & Brand Guidelines

The UI must feel professional, stoic, and authoritative. Avoid "gamified" elements. Use high information density suitable for professional workstations.

#### Color Palette (The "Imperial Synthesis")

- **Primary (The General/Strategy):** Amber-500 (#F59E0B) to Amber-700 (#B45309).
- **Secondary (The Philosopher/Mindset):** Violet-400 (#A78BFA) to Fuchsia-500 (#D946EF).
- **Background:** Slate-950 (#020617) for main areas; Slate-900 (#0F172A) for surface layers.
- **Borders:** Slate-800 (#1E293B) for standard; Amber-500/20 or Violet-500/20 for active states.

#### Typography

- **Headings:** Sans-serif, high tracking-tight (e.g., Inter, Geist, or System Sans).
- **Quotes/Insight:** Serif, italic (e.g., Georgia or System Serif).
- **System Logs:** Monospaced (e.g., JetBrains Mono or Fira Code).

### 2. Tech Stack

- **Frontend:** 
    - Next.js
    - React with Vite
    - TypeScript
    - Shadcn/ui
    - Zod
    - React Hook Form
    - Tailwind CSS
    - Lucide-React
    - CopilotKit
    - Self-Hosted Authentication:
        - Better Auth
        - PostgresSQL

- **Backend:**
    - Drizzle ORM for Better Auth
    - FastAPI (Python) for AI/ML endpoints.
        - LangGraph for agentic workflows
        - CopilotKit
- **Database:** TimescaleDB (PostgreSQL) for time-series performance and mental state tracking.
- **AI Integration:** Multimodal Vision models for chart analysis; LLMs for behavioral coaching.
- **Testing:** Vitest for frontend, Pytest for backend.
- **Package Management:**
  - **Node.js projects:** Use pnpm for package management.
  - **Python projects:** Use uv for dependency management.