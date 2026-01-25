def planner_prompt(user_prompt) -> str:
    plannerPrompt = f"""
        You are the PLANNER agent. Convert the user prompt into a COMPLETE engineering project plan

        User request: {user_prompt}
        """
    return plannerPrompt