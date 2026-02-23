# CopilotProvider

The CopilotProvider wraps the application with CopilotKit context, enabling AI chat functionality throughout your app.

## Location

`frontend/src/components/providers/copilot-provider.tsx`

## Usage

```tsx
import { CopilotKit } from "@copilotkit/react-core"

export function CopilotProvider({ children }) {
  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit"
      agent="chat_agent"
    >
      {children}
    </CopilotKit>
  )
}
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `runtimeUrl` | `string` | Yes | API route that handles CopilotKit requests |
| `agent` | `string` | Yes | Agent name (must match backend) |
| `children` | `ReactNode` | Yes | Child components |

## Setup

The provider must be set up in the app layout:

**File**: `frontend/src/app/providers.tsx`

```tsx
"use client"

import { CopilotProvider } from "@/components/providers/copilot-provider"

export function Providers({ children }) {
  return (
    <CopilotProvider>
      {children}
    </CopilotProvider>
  )
}
```

**File**: `frontend/src/app/layout.tsx`

```tsx
import { Providers } from "./providers"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
```

## How It Works

1. Wraps the app with CopilotKit React context
2. Provides `useCopilotChat` and `useCopilot` hooks to descendants
3. Routes messages through the specified `runtimeUrl`
4. Manages conversation state and streaming

## Related Components

- [CopilotChat](./copilot-chat.md) - Chat UI component
- [API Integration](../api/copilotkit.md) - Backend setup
