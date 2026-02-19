# Unit 2 Revision Webapp

Exam-aligned revision app for **Unit 2: Developing a Marketing Campaign**.

## Alignment

- Activity 1 (Rationale, 34 marks) checklist coverage
- Activity 2 (Campaign Plan, 36 marks) checklist coverage
- Required submission items coverage
- Progressive checkpoint quizzes tied to exam requirements

## Features

- All checkpoint topics accessible at any time
- Per-topic scoring plus total score (best attempts)
- Learner name + leaderboard submission
- Mixed-practice quiz available at any time
- Shared class leaderboard (submit + live ranking)
- Progress saved in browser local storage

## Run Locally

Run the Flask app so leaderboard APIs are available:

```bash
cd /Users/tomlandy/Desktop/Codex/unit2-marketing-campaign-webapp
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python server.py
```

Then visit `http://localhost:8000`.

## Deploy On Render

- Use `/Users/tomlandy/Desktop/Codex/unit2-marketing-campaign-webapp/render.yaml` as your blueprint.
- Ensure the service has a persistent disk mounted at `/var/data` (already defined in `render.yaml`).
- Leaderboard data is stored in SQLite at `/var/data/leaderboard.db`.
