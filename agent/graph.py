from dotenv import load_dotenv
from langchain_core.globals import set_verbose, set_debug
from langchain_groq import ChatGroq
from langgraph.constants import END
from langgraph.graph import StateGraph
from langchain.agents import create_agent

from prompts import *
from states import *
from tools import write_file, read_file, get_current_directory, list_files

load_dotenv()
set_debug(True)
set_verbose(True)


llm = ChatGroq(model="openai/gpt-oss-120b")


def planner_agent(state: dict) -> dict:
    user_prompt = state["user_prompt"]
    resp = llm.with_structured_output(Plan).invoke(planner_prompt(user_prompt))
    if resp is None:
        raise ValueError("Planner agent returned no response")
    return {"plan": resp}

def architect_agent(state: dict) -> dict:
    plan: Plan = state["plan"]
    resp = llm.with_structured_output(TaskPlan).invoke(architect_prompt(plan))
    if resp is None:
        raise ValueError("Architect agent returned no response")
    resp.plan = plan
    return {"task_plan": resp}

def developer_agent(state: dict) -> None:
    steps: list[ImplementationTask] = state["task_plan"].implementation_steps
    developer_tools = [write_file, read_file, get_current_directory, list_files]
    agent = create_agent(llm, tools=developer_tools)
    agent.invoke({"messages": [developer_prompt(steps)]})



graph = StateGraph(dict)
graph.add_node("planner", planner_agent)
graph.add_node("architect", architect_agent)
graph.add_node("developer", developer_agent)
graph.add_edge("planner", "architect")
graph.add_edge("architect", "developer")
graph.set_entry_point("planner")

agent = graph.compile()

if __name__ == "__main__":
    user_prompt = "create a simple calculator web application"

    result = agent.invoke({"user_prompt": user_prompt})
    print(result)