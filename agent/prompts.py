def planner_prompt(user_prompt) -> str:
    plannerPrompt = f"""
        You are the PLANNER agent. Convert the user prompt into a COMPLETE engineering project plan

        User request: {user_prompt}
        """
    return plannerPrompt

def architect_prompt(plan: str) -> str:
    architectPrompt = f"""
        You are the ARCHITECT agent. Given this project plan, break it down into specific engineering tasks.

        RULES:
        - For each FILE in the plan, create one or more implementation tasks.
        - In each task description:
            - Specfiy exacltly what to implement.
            - Name the variables, functions, classes, and components to be created.
            - Mention how this task depends on or will be used by previous tasks.
            - Include integration details: imports, expected function signatures, data flow.
        - Order tasks so that dependencies are implemented first.
        - Each step must be SELF-CONTAINED but also carry forward the relevant context from previous steps.

        Project Plan: {plan}
        """
    return architectPrompt