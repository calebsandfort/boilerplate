"use client"

import { CopilotKit } from "@copilotkit/react-core"

interface CopilotProviderProps {
  children: React.ReactNode
}

export function CopilotProvider({ children }: CopilotProviderProps) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit" agent="chat_agent">
      {children}
    </CopilotKit>
  )
}
