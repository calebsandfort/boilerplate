# Adding API Routes

This guide covers how to add new API endpoints to the backend.

## Backend Routes (FastAPI)

### Creating a New Route

1. Create route file:

```python
# backend/src/api/items.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class Item(BaseModel):
    name: str
    description: str | None = None

@router.get("/items")
async def list_items():
    return {"items": []}

@router.post("/items")
async def create_item(item: Item):
    return {"id": "1", **item.model_dump()}
```

2. Register in main.py:

```python
# backend/src/main.py
from fastapi import FastAPI
from .api.items import router as items_router

app = FastAPI()

app.include_router(items_router, prefix="/api", tags=["items"])
```

### Route Patterns

```python
@router.get("/resource")           # List
@router.get("/resource/{id}")       # Get by ID
@router.post("/resource")           # Create
@router.put("/resource/{id}")      # Update
@router.delete("/resource/{id}")   # Delete
```

## Frontend Routes (Next.js)

### API Route

Create a route handler:

```typescript
// frontend/src/app/api/my-resource/route.ts
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({ data: "example" })
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json({ id: "1", ...body })
}
```

### Server Action

For form submissions:

```typescript
// frontend/src/app/actions.ts
"use server"

import { z } from "zod"

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
})

export async function createUser(formData: FormData) {
  const data = {
    email: formData.get("email"),
    name: formData.get("name"),
  }

  const validated = schema.parse(data)

  // Call backend API
  const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validated),
  })

  if (!response.ok) {
    throw new Error("Failed to create user")
  }

  return response.json()
}
```

## Authentication

### Protected Routes (Backend)

```python
from fastapi import Depends, HTTPException
from copilotkit import LangGraphAGUIAgent

# Add authentication dependency
async def get_current_user(token: str = Depends(oauth2_scheme)):
    # Validate token
    user = await validate_token(token)
    if not user:
        raise HTTPException(status_code=401)
    return user

@router.get("/protected")
async def protected_route(user = Depends(get_current_user)):
    return {"user": user}
```

### Protected Routes (Frontend)

```typescript
// frontend/src/middleware.ts
import { NextRequest, NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("better-auth.session_token")

  if (!sessionToken) {
    return NextResponse.redirect(new URL("/sign-in", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/protected/:path*"],
}
```

## Error Handling

### Backend

```python
from fastapi import HTTPException

@router.get("/resource/{id}")
async def get_resource(id: str):
    resource = await db.get(id)
    if not resource:
        raise HTTPException(status_code=404, detail="Resource not found")
    return resource
```

### Frontend

```typescript
try {
  const response = await fetch("/api/resource")
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail)
  }
  return response.json()
} catch (error) {
  console.error("Failed to fetch:", error)
  throw error
}
```

## Validation

Use Pydantic (backend) or Zod (frontend):

### Backend (Pydantic)

```python
from pydantic import BaseModel, Field

class CreateItem(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    price: float = Field(..., gt=0)
    description: str | None = Field(None, max_length=500)
```

### Frontend (Zod)

```typescript
import { z } from "zod"

const itemSchema = z.object({
  name: z.string().min(1).max(100),
  price: z.number().positive(),
  description: z.string().max(500).optional(),
})
```

## Next Steps

- [REST API Reference](../api/rest.md) - Existing endpoints
- [Database Schema](../api/database.md) - Data models
- [Development Workflow](./development.md) - Testing routes
