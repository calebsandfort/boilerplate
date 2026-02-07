import { CopilotChat } from "@/components/chat/copilot-chat"

export default function ChatPage() {
  return (
    <main className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex-1 overflow-hidden">
        <CopilotChat />
      </div>
    </main>
  )
}
