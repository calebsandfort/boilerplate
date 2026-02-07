"use client"

import { CopilotChat as CopilotChatUI } from "@copilotkit/react-ui"
import "@copilotkit/react-ui/styles.css"

export function CopilotChat() {
  return (
    <div className="h-full w-full">
      <CopilotChatUI
        labels={{
          title: "AI Assistant",
          initial: "Hi! How can I help you today?",
        }}
      />
    </div>
  )
}
