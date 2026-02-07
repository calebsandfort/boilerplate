from langgraph.graph import StateGraph

from src.agent.graph import agent, build_graph


def test_build_graph_returns_compiled_graph() -> None:
    compiled = build_graph()
    assert compiled is not None


def test_agent_is_compiled() -> None:
    assert agent is not None
    assert hasattr(agent, "invoke")
