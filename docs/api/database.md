# Database Schema

This document describes the database schema managed by Drizzle ORM.

## Schema Files

```
frontend/src/db/schema/
├── auth.ts     # Better Auth tables
└── index.ts   # Schema exports
```

## Auth Tables

**File**: `frontend/src/db/schema/auth.ts`

The schema follows Better Auth's requirements for PostgreSQL.

### User Table

| Column | Type | Description |
|--------|------|-------------|
| id | `text` (PK) | Unique user ID |
| name | `text` | User's display name |
| email | `text` | User's email address |
| emailVerified | `boolean` | Whether email is verified |
| image | `text` | Avatar URL |
| createdAt | `timestamp` | Creation timestamp |
| updatedAt | `timestamp` | Last update timestamp |

### Session Table

| Column | Type | Description |
|--------|------|-------------|
| id | `text` (PK) | Unique session ID |
| expiresAt | `timestamp` | Expiration time |
| token | `text` | Session token |
| ipAddress | `text` | Client IP (nullable) |
| userAgent | `text` | Client user agent (nullable) |
| userId | `text` (FK) | Reference to user |

### Account Table

| Column | Type | Description |
|--------|------|-------------|
| id | `text` (PK) | Unique account ID |
| accountId | `text` | Provider's account ID |
| providerId | `text` | Auth provider (google, email, etc.) |
| userId | `text` (FK) | Reference to user |
| accessToken | `text` | OAuth access token |
| refreshToken | `text` | OAuth refresh token |
| idToken | `text` | OAuth ID token |
| accessTokenExpiresAt | `timestamp` | Token expiration |
| refreshTokenExpiresAt | `timestamp` | Refresh expiration |
| scope | `text` | OAuth scopes |
| password | `text` | Hashed password (for email auth) |
| createdAt | `timestamp` | Creation timestamp |
| updatedAt | `timestamp` | Last update timestamp |

### Verification Table

| Column | Type | Description |
|--------|------|-------------|
| id | `text` (PK) | Unique verification ID |
| identifier | `text` | What to verify (email) |
| value | `text` | Verification token/value |
| expiresAt | `timestamp` | Expiration time |
| createdAt | `timestamp` | Creation timestamp (nullable) |

## Database Configuration

**File**: `frontend/drizzle.config.ts`

```typescript
import { defineConfig } from "drizzle-kit"

export default defineConfig({
  schema: "./src/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
```

## Connection

**File**: `frontend/src/lib/db.ts`

```typescript
import { drizzle } from "drizzle-orm/postgres-js"
import * as schema from "@/db/schema"

const client = postgres(process.env.DATABASE_URL!)

export const db = drizzle(client, { schema })
```

## Environment Variable

```
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/boilerplate
```

## Running Migrations

```bash
# Generate migration
pnpm db:generate

# Push to database
pnpm db:push
```

See `package.json` for full migration commands.

## Next Steps

- [Authentication Components](../components/auth.md) - Using auth in components
- [Database Guide](../guides/migrations.md) - Migration management
