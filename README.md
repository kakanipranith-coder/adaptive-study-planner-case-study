# Resync — Adaptive Study Planner

A lightweight study planner that runs in your browser without a backend or package installation.

## Run it

Open `index.html` in a modern browser. Your topics, completion status, and holiday dates are saved in that browser's local storage on the current device.

## Use the planner

- Choose a date with the date picker or move one day at a time with the arrow buttons.
- Add topics to one of the daily study slots and check them off when finished.
- Use a topic's **Move to** menu to reschedule it to another slot within the previous week or the next two weeks.
- Sundays include two extra buffer slots. Use **Mark as holiday** to add the same slots to another date.
- Select a month to view planned topics, completed topics, completion rate, active study days, and the completion log.
- Choose GATE CS, GATE EE, GATE ME, UPSC CSE, JEE Main, NEET UG, CAT, GRE, or manual priorities. The selected exam has its own topic list and monthly report; changing exams hides topics belonging to other exams.
- Selecting an exam displays its curated important-topic suggestions. Add suggestions individually to that exam's plan. You can also add your own topics and use **Prioritize & reschedule topics** to rank unfinished topics. Overdue topics are assigned to Sunday or holiday buffer slots first; completed topics are left unchanged.
- The separate `study-agent.js` file provides the exam-specific suggestions, checks topic titles and subjects against the selected exam's topic map, and previews matches while you type.

The study agent uses curated suggestions and keyword matching in your browser; it does not call an AI service or guarantee exam weightage. Unmatched topics are flagged for review. Check the official syllabus. Starter topics are scoped to GATE CS.
