from copilotkit import CopilotKitRemoteEndpoint
from copilotkit.integrations.fastapi import add_fastapi_endpoint
from copilotkit.langgraph_agui_agent import LangGraphAGUIAgent
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.agent.graph import agent
from src.api.router import api_router

app = FastAPI(title="Boilerplate API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

sdk = CopilotKitRemoteEndpoint(
    agents=[
        LangGraphAGUIAgent(
            name="chat_agent",
            description="A helpful AI chat assistant.",
            graph=agent,
        )
    ]
)

add_fastapi_endpoint(app, sdk, "/copilotkit")
