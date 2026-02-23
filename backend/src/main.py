from dotenv import load_dotenv

load_dotenv()

from ag_ui_langgraph import add_langgraph_fastapi_endpoint  # noqa: E402
from copilotkit import LangGraphAGUIAgent  # noqa: E402
from fastapi import FastAPI  # noqa: E402
from fastapi.middleware.cors import CORSMiddleware  # noqa: E402

from src.agent.graph import agent  # noqa: E402
from src.api.router import api_router  # noqa: E402
from src.config import settings  # noqa: E402

app = FastAPI(title="Boilerplate API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)

copilot_agent = LangGraphAGUIAgent(
    name="chat_agent",
    description="A helpful AI chat assistant.",
    graph=agent,
)

add_langgraph_fastapi_endpoint(app, copilot_agent, "/copilotkit")
