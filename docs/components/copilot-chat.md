# CopilotChat

The CopilotChat component provides the AI chat user interface.

## Location

`frontend/src/components/chat/copilot-chat.tsx`

## Usage

### Basic Popup

```tsx
import { CopilotPopup } from "@copilotkit/react-ui"

export function ChatButton() {
  return (
    <CopilotPopup
      labels={{
        title: "AI Assistant",
        initial: "Hi! How can I help you today?",
        placeholder: "Ask me anything..."
      }}
    />
  )
}
```

### Custom Chat

For more control, use the `useCopilotChat` hook:

```tsx
import { useCopilotChat } from "@copilotkit/react-core"

export function CustomChat() {
  const { messages, input, setInput, sendMessage, isLoading } = useCopilotChat()

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((message) => (
          <div
            key={message.id}
            className={message.role === "user" ? "user-message" : "assistant-message"}
          >
            {message.content}
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type your message..."
          disabled={isLoading}
        />
        <button onClick={sendMessage} disabled={isLoading}>
          {isLoading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  )
}
```

## Labels Customization

| Label | Default | Description |
|-------|---------|-------------|
| `title` | "Copilot" | Chat window title |
| `initial` | "Ask anything..." | Placeholder before first message |
| `placeholder` | "Type your message..." | Input placeholder |
| `sendButton` | "Send" | Send button text |
| `closeButton` | "Close" | Close button text |

## Styling

The component uses Tailwind CSS classes. Customize via:

1. **Tailwind config** - Add custom theme values
2. **CSS variables** - Override ShadCN/ui tokens
3. **Class names** - Use the built-in styling

## Integration with Provider

The chat component requires [CopilotProvider](./copilot-provider.md) to be present in the component tree.

```tsx
// This won't work - no provider
<CopilotPopup /> // ❌

// This works - provider wraps component
<CopilotProvider>
  <CopilotPopup />
</CopilotProvider> // ✅
```

## Next Steps

- [CopilotProvider](./copilot-provider.md) - Required provider setup
- [API Integration](../api/copilotkit.md) - Backend configuration
- [Chat Demo](./chat-demo.html) - Interactive example
