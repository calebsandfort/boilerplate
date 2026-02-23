# Database Migrations

This guide covers managing database schema changes with Drizzle.

## Migration Commands

### Generate Migration

Create a new migration file:

```bash
cd frontend
pnpm db:generate
```

This compares your schema to the database and generates SQL in `drizzle/` folder.

### Push to Database

Apply migrations to your database:

```bash
cd frontend
pnpm db:push
```

This syncs your schema without creating migration files (for development).

### Open Studio

Launch Drizzle Studio for visual database exploration:

```bash
cd frontend
pnpm db:studio
```

Opens http://localhost:4983

## Schema Files

```
frontend/src/db/schema/
├── auth.ts     # Better Auth tables
└── index.ts   # Export all schemas
```

### Adding a New Table

1. Create schema in `frontend/src/db/schema/`:

```typescript
// frontend/src/db/schema/tasks.ts
import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core"

export const tasks = pgTable("tasks", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  completed: boolean("completed").default(false),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})
```

2. Export in `index.ts`:

```typescript
export * from "./tasks"
```

3. Run migration:

```bash
pnpm db:generate
pnpm db:push
```

## Common Operations

### Add Column

```typescript
// In schema file
export const users = pgTable("users", {
  // existing columns...
  bio: text("bio"),  // Add this
})
```

### Rename Table

```typescript
// Create new table with new name
export const todos = pgTable("todos", {
  // ...
})

// Run generate to get rename statement
```

### Drop Table

Remove from schema, then run:

```bash
pnpm db:generate
# Review the generated SQL carefully!
pnpm db:push
```

## Working with Data

### Query

```typescript
import { db } from "@/lib/db"
import { tasks } from "@/db/schema"

const allTasks = await db.select().from(tasks)
const userTasks = await db.select().from(tasks)
  .where(eq(tasks.userId, userId))
```

### Insert

```typescript
import { db } from "@/lib/db"
import { tasks } from "@/db/schema"

await db.insert(tasks).values({
  id: crypto.randomUUID(),
  title: "New task",
  userId: user.id,
})
```

### Update

```typescript
import { db } from "@/lib/db"
import { tasks } from "@/db/schema"
import { eq } from "drizzle-orm"

await db.update(tasks)
  .set({ completed: true })
  .where(eq(tasks.id, taskId))
```

### Delete

```typescript
import { db } from "@/lib/db"
import { tasks } from "@/db/schema"
import { eq } from "drizzle-orm"

await db.delete(tasks)
  .where(eq(tasks.id, taskId))
```

## Migration Files

Generated migrations are stored in `drizzle/` folder:

```
drizzle/
├── 0000_gray_wolverine.sql
├── 0001_fuzzy_mister_fantastic.sql
└── meta/
    ├── _journal.json
    └── 0000_snapshot.json
```

### Manual Migration

If you need to run SQL directly:

```bash
psql $DATABASE_URL -f path/to/migration.sql
```

## Troubleshooting

### Migration Failed

Check the error message and:
1. Review the generated SQL
2. Check for conflicts with existing data
3. Run with `--verbose` flag

### Reset Database

⚠️ This deletes all data!

```bash
# Drop all tables
pnpm db:push --force

# Or drop database and recreate
```

### Large Migrations

For big changes, split into smaller migrations:

1. Add new column (nullable)
2. Backfill data
3. Add NOT NULL constraint

## Best Practices

1. **Always review generated SQL** before pushing
2. **Test migrations** in development first
3. **Back up production** before running migrations
4. **Keep migrations small** and focused
5. **Never edit** generated migration files

## Next Steps

- [Database Schema Reference](../api/database.md) - Schema details
- [Development Workflow](./development.md) - Testing changes
