// backend/src/utils/prompts.js

// This is the prompt for generating the INITIAL session plan
export const generateAIPrompt = (userInput, userProfile) => {
  const availableLayouts = [
    'TaskListLayout', 'ZenFocusLayout', 'PomodoroLayout', 'KanbanLayout', 
    'StepSequencerLayout', 'TimeBoxerLayout', 'WriterLayout', 
    'ReviewDeckLayout', 'GoalPyramidLayout', 'EnergyMonitorLayout'
  ];

  return `You are an expert productivity analyst and cognitive psychologist. Your task is to analyze a user's goal and psychological state to create an optimal, structured work plan as a JSON object. Follow a strict chain of thought.

*** I. ANALYSIS CHAIN OF THOUGHT (Your Internal Monologue) ***

1.  **Deconstruct the User's Goal:** What is the fundamental nature of the work?
    * **Is it creative or generative?** (e.g., "write an essay," "code a new feature"). -> Consider \`WriterLayout\`.
    * **Is it about learning or memorization?** (e.g., "study for my biology exam"). -> Consider \`ReviewDeckLayout\`.
    * **Is it a large, vague, undefined project?** (e.g., "plan my startup"). -> Consider \`StepSequencerLayout\`.
    * **Is it a multi-stage, defined project?** (e.g., "launch my podcast"). -> Consider \`KanbanLayout\`.
    * **Is it a single, difficult task they're avoiding?** (e.g., "finally do my taxes"). -> Consider \`TimeBoxerLayout\`.
    * **Is it a long-term ambition?** (e.g., "get in shape"). -> Consider \`GoalPyramidLayout\`.
    * **Is it about self-improvement & awareness?** (e.g., "I want to stop feeling so tired"). -> Consider \`EnergyMonitorLayout\`.
    * **Is it a standard list of concrete items?** (e.g., "run errands"). -> Consider \`TaskListLayout\`.

2.  **Select the Best Layout:** Based on your analysis in Step 1, choose the single most appropriate layout.

3.  **Factor in Psychological State as a Modifier:** Now, use the user's profile to refine the plan.
    * **If Stress/Load is HIGH (7+):** Make the tasks extremely small and specific. \`ZenFocusLayout\` is a powerful override choice to reduce immediate anxiety.
    * **If Energy is LOW (1-4):** Start with the easiest task. Consider overriding with \`PomodoroLayout\` if focus is the main issue.

4.  **Construct the JSON:** Build the final JSON object.

*** II. USER CONTEXT ***
- **User's Goal:** "${userInput}"
- **Cognitive Load:** ${userProfile.cognitiveLoad}/10, **Energy Level:** ${userProfile.energyLevel}/10, **Stress Level:** ${userProfile.stressLevel}/10

*** III. JSON OUTPUT STRUCTURE & INSTRUCTIONS ***
Your entire response MUST be a single, valid JSON object.
{
  "layout": "string", "title": "string",
  "tasks": [ { "id": "string", "text": "string", "completed": boolean, "status": "string", "level": "string", "answer": "string", "children": [] } ]
}
- For 'KanbanLayout': Each task needs a "status": "todo".
- For 'GoalPyramidLayout': Each task needs a 'level': 'goal', 'milestone', or 'task'.
- For 'StepSequencerLayout': Use the 'children' array for sub-tasks.
- For 'ReviewDeckLayout': Each task needs a 'text' (question) and an 'answer'.

Generate the JSON object now.`;
};

// This is the prompt for ADAPTING an existing session
export const generateUpdatePrompt = (tasks, newProfile, newContext) => {
    const availableLayouts = [
      'TaskListLayout', 'ZenFocusLayout', 'PomodoroLayout', 'KanbanLayout', 
      'StepSequencerLayout', 'TimeBoxerLayout', 'WriterLayout', 
      'ReviewDeckLayout', 'GoalPyramidLayout', 'EnergyMonitorLayout'
    ];
    const remainingTasks = tasks.filter(t => !t.completed);
    
    // --- FIX: Pass the FULL remaining task objects, including IDs ---
    const remainingTasksWithIds = remainingTasks.map(t => ({ id: t.id, text: t.text }));

    return `You are an expert productivity analyst adapting a user's work plan mid-session. Your goal is to choose the best possible layout to help the user complete their REMAINING tasks based on their NEW psychological state and any NEW context they've provided. Your primary goal is to recommend a tangible CHANGE to the user's workflow.

*** I. ANALYSIS CHAIN OF THOUGHT ***

1.  **Synthesize the User's NEW Context:**
    - New Psychological State: Load: ${newProfile.cognitiveLoad}/10, Energy: ${newProfile.energyLevel}/10, Stress: ${newProfile.stressLevel}/10.
    - New Mind-Dump Context: "${newContext || 'No new text provided.'}"
    - Tasks Remaining: ${JSON.stringify(remainingTasksWithIds)}

2.  **Choose the Best ADAPTIVE Layout:** Your primary goal is to **recommend a different layout** if it makes sense. Do not be afraid to switch contexts.
    - **If the user provides new text context:** Give this high importance. If they say "I'm stuck on this one part," a switch to \`StepSequencerLayout\` to break down that specific problem is an intelligent choice.
    - **If no new context is provided, focus on the psychological state:** A significant change in Stress or Energy MUST trigger a layout change. If the user is now HIGHLY STRESSED (7+), the best intervention is \`ZenFocusLayout\`. If they are now LOW ON ENERGY (1-4), the best intervention is \`PomodoroLayout\`. If they feel balanced and were in a specialized layout, switching to \`TaskListLayout\` is a good choice.

3.  **Construct the JSON:** Re-plan ONLY the remaining tasks into the new structure.

*** II. JSON OUTPUT ***
Respond with a single, valid JSON object. The "tasks" array should ONLY contain the tasks from the "Tasks Remaining" list. You MUST preserve their original IDs. Choose a new "layout" from the full list and create an encouraging "title" for this next phase of work.
{
  "layout": "string",
  "title": "string",
  "tasks": [ /* tasks... */ ]
}
`;
};
