import os
import sqlite3
from datetime import datetime, timezone

from flask import Flask, jsonify, request, send_from_directory


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
os.makedirs(DATA_DIR, exist_ok=True)
DATABASE_PATH = os.getenv("DATABASE_PATH", os.path.join(DATA_DIR, "leaderboard.db"))
PORT = int(os.getenv("PORT", "8000"))

app = Flask(__name__, static_folder=BASE_DIR, static_url_path="")


def get_conn():
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    with get_conn() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS leaderboard (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                learner_name TEXT NOT NULL,
                learner_key TEXT NOT NULL UNIQUE,
                mode TEXT NOT NULL DEFAULT 'revision',
                best_score INTEGER NOT NULL,
                total_possible INTEGER NOT NULL,
                best_percent INTEGER NOT NULL,
                updated_at TEXT NOT NULL
            )
            """
        )
        cols = conn.execute("PRAGMA table_info(leaderboard)").fetchall()
        col_names = {col["name"] for col in cols}
        if "mode" not in col_names:
            conn.execute("ALTER TABLE leaderboard ADD COLUMN mode TEXT NOT NULL DEFAULT 'revision'")
        conn.execute(
            """
            CREATE INDEX IF NOT EXISTS idx_leaderboard_rank
            ON leaderboard (mode, best_percent DESC, best_score DESC, updated_at ASC)
            """
        )


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def normalized_key(name: str) -> str:
    return " ".join(name.strip().lower().split())


def compute_rank(conn, mode: str, best_percent: int, best_score: int) -> int:
    row = conn.execute(
        """
        SELECT COUNT(*) AS better_count
        FROM leaderboard
        WHERE mode = ?
          AND (best_percent > ?
           OR (best_percent = ? AND best_score > ?))
        """,
        (mode, best_percent, best_percent, best_score),
    ).fetchone()
    return int(row["better_count"]) + 1


@app.get("/api/health")
def api_health():
    return jsonify({"ok": True})


@app.get("/api/leaderboard")
def api_leaderboard():
    try:
        limit = int(request.args.get("limit", "30"))
    except ValueError:
        limit = 30
    limit = max(1, min(limit, 200))

    mode = str(request.args.get("mode", "revision")).strip().lower() or "revision"

    with get_conn() as conn:
        rows = conn.execute(
            """
            SELECT learner_name, best_score, total_possible, best_percent, updated_at
            FROM leaderboard
            WHERE mode = ?
            ORDER BY best_percent DESC, best_score DESC, updated_at ASC
            LIMIT ?
            """,
            (mode, limit),
        ).fetchall()

    entries = [
        {
            "learner_name": row["learner_name"],
            "best_score": row["best_score"],
            "total_possible": row["total_possible"],
            "best_percent": row["best_percent"],
            "updated_at": row["updated_at"],
        }
        for row in rows
    ]

    return jsonify({"entries": entries})


@app.post("/api/leaderboard/submit")
def api_leaderboard_submit():
    payload = request.get_json(silent=True) or {}

    learner_name = str(payload.get("learner_name", "")).strip()
    mode = str(payload.get("mode", "revision")).strip().lower() or "revision"
    if not learner_name:
        return jsonify({"error": "learner_name is required"}), 400
    if len(learner_name) > 80:
        return jsonify({"error": "learner_name too long"}), 400

    try:
        best_score = int(payload.get("best_score", 0))
        total_possible = int(payload.get("total_possible", 0))
    except (TypeError, ValueError):
        return jsonify({"error": "best_score and total_possible must be integers"}), 400

    if total_possible <= 0:
        return jsonify({"error": "total_possible must be > 0"}), 400
    if best_score < 0:
        return jsonify({"error": "best_score must be >= 0"}), 400

    best_score = min(best_score, total_possible)
    best_percent = round((best_score / total_possible) * 100)
    learner_key = f"{mode}:{normalized_key(learner_name)}"
    timestamp = now_iso()

    with get_conn() as conn:
        existing = conn.execute(
            """
            SELECT learner_name, best_score, total_possible, best_percent
            FROM leaderboard
            WHERE learner_key = ?
            """,
            (learner_key,),
        ).fetchone()

        should_update = True
        if existing is not None:
            existing_percent = int(existing["best_percent"])
            existing_score = int(existing["best_score"])
            if best_percent < existing_percent:
                should_update = False
            if best_percent == existing_percent and best_score <= existing_score:
                should_update = False

        if existing is None:
            conn.execute(
                """
                INSERT INTO leaderboard (
                    learner_name, learner_key, mode, best_score, total_possible, best_percent, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    learner_name,
                    learner_key,
                    mode,
                    best_score,
                    total_possible,
                    best_percent,
                    timestamp,
                ),
            )
        elif should_update:
            conn.execute(
                """
                UPDATE leaderboard
                SET learner_name = ?, mode = ?, best_score = ?, total_possible = ?, best_percent = ?, updated_at = ?
                WHERE learner_key = ?
                """,
                (
                    learner_name,
                    mode,
                    best_score,
                    total_possible,
                    best_percent,
                    timestamp,
                    learner_key,
                ),
            )

        current = conn.execute(
            """
            SELECT learner_name, best_score, total_possible, best_percent, updated_at
            FROM leaderboard
            WHERE learner_key = ?
            """,
            (learner_key,),
        ).fetchone()

        rank = compute_rank(conn, mode, int(current["best_percent"]), int(current["best_score"]))

    return jsonify(
        {
            "rank": rank,
            "entry": {
                "learner_name": current["learner_name"],
                "best_score": current["best_score"],
                "total_possible": current["total_possible"],
                "best_percent": current["best_percent"],
                "updated_at": current["updated_at"],
            },
        }
    )


@app.get("/")
def root():
    return send_from_directory(BASE_DIR, "index.html")


@app.get("/<path:path>")
def static_files(path):
    return send_from_directory(BASE_DIR, path)


init_db()


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=PORT)
