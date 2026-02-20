import { HttpAgent } from "@ag-ui/client"
import {
  CopilotRuntime,
  ExperimentalEmptyAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime"
import { NextRequest } from "next/server"

const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8000"

const chat_agent = new HttpAgent({
  url: `${BACKEND_URL}/copilotkit`,
})

const runtime = new CopilotRuntime({
  agents: {
    chat_agent,
  },
})

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    runtime,
    serviceAdapter: new ExperimentalEmptyAdapter(),
    endpoint: "/api/copilotkit",
  })
  return handleRequest(req)
}
