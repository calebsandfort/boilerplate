from langchain_core.messages import SystemMessage
from langchain_openai import ChatOpenAI

from src.agent.prompts import SYSTEM_PROMPT
from src.agent.state import AgentState


async def chat_node(state: AgentState) -> AgentState:
    model = ChatOpenAI(model="gpt-4o-mini", temperature=0.7)
    messages = [SystemMessage(content=SYSTEM_PROMPT), *state["messages"]]
    response = await model.ainvoke(messages)
    return {"messages": [response]}
