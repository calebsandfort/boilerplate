# Authentication Components

This document describes the authentication components and hooks.

## Components

### SignInForm

**Location**: `frontend/src/components/auth/sign-in-form.tsx`

A form component for user sign-in with email and password.

```tsx
import { SignInForm } from "@/components/auth/sign-in-form"

export default function SignInPage() {
  return (
    <div>
      <h1>Sign In</h1>
      <SignInForm />
    </div>
  )
}
```

### SignUpForm

**Location**: `frontend/src/components/auth/sign-up-form.tsx`

A form component for user registration.

```tsx
import { SignUpForm } from "@/components/auth/sign-up-form"

export default function SignUpPage() {
  return (
    <div>
      <h1>Sign Up</h1>
      <SignUpForm />
    </div>
  )
}
```

## Hooks

### useAuth

**Location**: `frontend/src/hooks/use-auth.ts`

Custom hook for session management and authentication actions.

```tsx
import { useAuth } from "@/hooks/use-auth"

function Dashboard() {
  const { session, user, signOut, isLoading } = useAuth()

  if (isLoading) return <div>Loading...</div>

  if (!session) return <div>Please sign in</div>

  return (
    <div>
      <p>Welcome, {user?.name}!</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  )
}
```

**Returns**:
- `session`: Current session object or null
- `user`: Current user object or null
- `signOut()`: Function to sign out the user
- `isLoading`: Boolean for loading state

## Auth Client

**Location**: `frontend/src/lib/auth-client.ts`

Creates the Better Auth client instance.

```typescript
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
})
```

## Auth Configuration

**Location**: `frontend/src/lib/auth.ts`

Better Auth configuration with Drizzle adapter.

```typescript
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db } from "@/lib/db"

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // PostgreSQL
  }),
  emailAndPassword: {
    enabled: true,
  },
})
```

## API Routes

All auth routes are handled by a single catch-all route:

**File**: `frontend/src/app/api/auth/[...all]/route.ts`

```typescript
import { toNextJsHandler } from "better-auth/next-js"
import { auth } from "@/lib/auth"

export const { GET, POST } = toNextJsHandler(auth)
```

## Middleware

**File**: `frontend/src/middleware.ts`

Protects routes by checking session cookies.

```typescript
import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("better-auth.session_token")

  if (!sessionToken) {
    const signInUrl = new URL("/sign-in", request.url)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/chat/:path*"],
}
```

## Validation

Forms use Zod for validation:

```typescript
import { z } from "zod"

const signInSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})
```

## Next Steps

- [Data Flow](../architecture/data-flow.md) - Authentication flow diagram
- [Database Schema](../api/database.md) - Auth tables
- [Auth Demo](./auth-demo.html) - Interactive example
