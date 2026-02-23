# Components

This section documents the UI components used in the boilerplate.

## Core Components

### Providers

| Component | Description |
|-----------|-------------|
| [CopilotProvider](./copilot-provider.md) | AI chat context provider |

### Chat

| Component | Description |
|-----------|-------------|
| [CopilotChat](./copilot-chat.md) | Chat UI component |
| [Chat Demo](./chat-demo.html) | Interactive chat example |

### Authentication

| Component | Description |
|-----------|-------------|
| [Auth Forms](./auth.md) | Sign in/up components and hooks |
| [Auth Demo](./auth-demo.html) | Interactive auth example |

## ShadCN/UI Components

The project includes standard ShadCN/ui components in `frontend/src/components/ui/`:

- Button
- Input
- Label
- Form
- Card
- Avatar
- Dropdown Menu

These follow the standard ShadCN/ui patterns and are customized via Tailwind CSS.

## Using Components

### Import

```tsx
import { ComponentName } from "@/components/path/component"
```

### Props

All components accept standard React props plus component-specific props defined in their TypeScript interfaces.

## Next Steps

- [Architecture Overview](../architecture/overview.md) - System design
- [Development Guide](../guides/development.md) - Using components
