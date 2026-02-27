const GAME_MODE = "game";
const ROUND_TIME = 20;
const MAX_LIVES = 3;
const QUESTION_COUNT = 16;

const questionBank = [
  { topic: "Aims", prompt: "A campaign aim should primarily:", options: ["Set broad direction", "List exact costs", "Choose a single channel", "Replace objectives"], answer: 0 },
  { topic: "SMART", prompt: "Which is most SMART?", options: ["Get more likes soon", "Increase enquiries by 20% in 6 weeks", "Be more creative", "Advertise everywhere"], answer: 1 },
  { topic: "Research", prompt: "Most useful competitor data is:", options: ["Logo colors", "Channel + price strategy", "Office size", "Staff uniforms"], answer: 1 },
  { topic: "Reliability", prompt: "Reliable evidence is:", options: ["Consistent and method sound", "One opinion only", "Always latest regardless of source", "Only colorful charts"], answer: 0 },
  { topic: "Validity", prompt: "Valid evidence for Year 11 students should come from:", options: ["Year 11 sample", "General adult sample", "One teacher", "Old national report only"], answer: 0 },
  { topic: "7 Ps", prompt: "Which is in the 7 Ps?", options: ["People", "Popularity", "Performance", "Persona"], answer: 0 },
  { topic: "People", prompt: "The People element focuses on:", options: ["Staff interactions and service", "Ad budget only", "Distribution location only", "Product packaging only"], answer: 0 },
  { topic: "Process", prompt: "Best Process improvement:", options: ["Reduce checkout steps", "Change logo weekly", "Post at random times", "Raise prices only"], answer: 0 },
  { topic: "Physical Evidence", prompt: "Physical Evidence in services might be:", options: ["Testimonials and visible quality cues", "Hashtag frequency", "Office rent", "Competitor profit"], answer: 0 },
  { topic: "Budget", prompt: "Strong budgeting uses:", options: ["Channel-level spend breakdown", "Single total only", "No costs until end", "Only design costs"], answer: 0 },
  { topic: "Timescale", prompt: "A strong timescale includes:", options: ["Milestones and reviews", "Start date only", "End date only", "No ownership"], answer: 0 },
  { topic: "Media", prompt: "Best channel selection is based on:", options: ["Audience behavior + objective fit", "Team preference", "Newest app only", "Lowest effort"], answer: 0 },
  { topic: "Message", prompt: "Strong message should:", options: ["Link pain point to value + CTA", "Be vague", "Avoid benefits", "Only discuss business history"], answer: 0 },
  { topic: "Evaluation", prompt: "Useful KPI pair for campaign success:", options: ["CTR + conversion rate", "Brand color + font", "Meetings + coffee", "Post length + logo size"], answer: 0 },
  { topic: "Submission", prompt: "Required final set includes:", options: ["Rationale + budgeted plan + authentication", "Plan only", "Rationale only", "Slides only"], answer: 0 },
  { topic: "Justification", prompt: "Best justification statement is:", options: ["Decision linked to target data and objective", "We liked this platform", "Competitor used it", "It looked modern"], answer: 0 },
  { topic: "Scenario", prompt: "Consistent survey from wrong segment is:", options: ["Reliable but less valid", "Valid but not reliable", "Both fully strong", "Neither by definition"], answer: 0 },
  { topic: "Scenario", prompt: "One anonymous comment as core evidence is:", options: ["Neither reliable nor valid", "Reliable only", "Valid only", "Both"], answer: 0 },
  { topic: "Price", prompt: "Premium positioning usually uses:", options: ["Value-based pricing", "Always lowest price", "Random price changes", "Competitor copy pricing"], answer: 0 },
  { topic: "Review", prompt: "If channels underperform, best action is:", options: ["Reallocate budget based on data", "Ignore results", "Increase all spend equally", "Remove KPIs"], answer: 0 }
];

const learnerNameInput = document.getElementById("learner-name");
const startButton = document.getElementById("start-game");
const setupStatus = document.getElementById("setup-status");

const setupPanel = document.getElementById("setup-panel");
const gamePanel = document.getElementById("game-panel");
const resultsPanel = document.getElementById("results-panel");

const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const streakEl = document.getElementById("streak");
const timeLeftEl = document.getElementById("time-left");
const progressEl = document.getElementById("progress");
const questionTopicEl = document.getElementById("question-topic");
const questionTextEl = document.getElementById("question-text");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("round-feedback");

const fiftyButton = document.getElementById("fifty-fifty");
const extraTimeButton = document.getElementById("extra-time");

const finalSummary = document.getElementById("final-summary");
const submitButton = document.getElementById("submit-score");
const refreshButton = document.getElementById("refresh-leaderboard");
const playAgainButton = document.getElementById("play-again");
const submitStatus = document.getElementById("submit-status");
const leaderboardTable = document.getElementById("leaderboard-table");

let state = {
  learnerName: "",
  questions: [],
  index: 0,
  score: 0,
  lives: MAX_LIVES,
  streak: 0,
  timeLeft: ROUND_TIME,
  timerId: null,
  usedFifty: false,
  usedExtraTime: false,
  locked: false
};

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickQuestions() {
  return shuffle(questionBank).slice(0, QUESTION_COUNT).map((question) => {
    const options = question.options.map((text, idx) => ({ text, originalIdx: idx }));
    return { ...question, shuffledOptions: shuffle(options) };
  });
}

function updateStats() {
  scoreEl.textContent = state.score;
  livesEl.textContent = state.lives;
  streakEl.textContent = state.streak;
  timeLeftEl.textContent = state.timeLeft;
  progressEl.textContent = `${state.index + 1}/${state.questions.length}`;
}

function clearTimer() {
  if (state.timerId) {
    clearInterval(state.timerId);
    state.timerId = null;
  }
}

function startTimer() {
  clearTimer();
  state.timerId = setInterval(() => {
    state.timeLeft -= 1;
    timeLeftEl.textContent = state.timeLeft;
    if (state.timeLeft <= 0) {
      clearTimer();
      handleAnswer(-1);
    }
  }, 1000);
}

function renderQuestion() {
  const question = state.questions[state.index];
  state.timeLeft = ROUND_TIME;
  state.locked = false;
  feedbackEl.textContent = "";

  questionTopicEl.textContent = `Topic: ${question.topic}`;
  questionTextEl.textContent = question.prompt;

  optionsEl.innerHTML = question.shuffledOptions
    .map(
      (option, idx) =>
        `<button class="option-btn" data-option-index="${idx}">${option.text}</button>`
    )
    .join("");

  optionsEl.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      handleAnswer(Number(button.dataset.optionIndex));
    });
  });

  updateStats();
  startTimer();
}

function lockOptions() {
  optionsEl.querySelectorAll("button").forEach((button) => {
    button.disabled = true;
  });
}

function styleAnswers(correctOriginalIdx, selectedOriginalIdx) {
  optionsEl.querySelectorAll("button").forEach((button, btnIdx) => {
    const originalIdx = state.questions[state.index].shuffledOptions[btnIdx].originalIdx;
    if (originalIdx === correctOriginalIdx) {
      button.classList.add("correct");
    }
    if (selectedOriginalIdx === originalIdx && selectedOriginalIdx !== correctOriginalIdx) {
      button.classList.add("wrong");
    }
  });
}

function handleAnswer(selectedShuffledIdx) {
  if (state.locked) {
    return;
  }
  state.locked = true;
  clearTimer();

  const question = state.questions[state.index];
  const correctOriginalIdx = question.answer;
  const selectedOriginalIdx =
    selectedShuffledIdx >= 0 ? question.shuffledOptions[selectedShuffledIdx].originalIdx : -1;

  const isCorrect = selectedOriginalIdx === correctOriginalIdx;

  if (isCorrect) {
    state.streak += 1;
    const base = 100;
    const speedBonus = state.timeLeft * 3;
    const streakBonus = state.streak * 10;
    state.score += base + speedBonus + streakBonus;
    feedbackEl.textContent = `Correct. +${base + speedBonus + streakBonus} points`;
  } else {
    state.streak = 0;
    state.lives -= 1;
    feedbackEl.textContent = selectedOriginalIdx === -1 ? "Time up. -1 life" : "Incorrect. -1 life";
  }

  lockOptions();
  styleAnswers(correctOriginalIdx, selectedOriginalIdx);
  updateStats();

  if (state.lives <= 0) {
    setTimeout(endGame, 900);
    return;
  }

  const isLast = state.index >= state.questions.length - 1;
  if (isLast) {
    setTimeout(endGame, 900);
    return;
  }

  setTimeout(() => {
    state.index += 1;
    renderQuestion();
  }, 900);
}

function useFiftyFifty() {
  if (state.usedFifty || state.locked) {
    return;
  }

  const question = state.questions[state.index];
  const wrongButtons = [];

  optionsEl.querySelectorAll("button").forEach((button, idx) => {
    const originalIdx = question.shuffledOptions[idx].originalIdx;
    if (originalIdx !== question.answer) {
      wrongButtons.push(button);
    }
  });

  shuffle(wrongButtons)
    .slice(0, 2)
    .forEach((button) => {
      button.disabled = true;
      button.style.opacity = "0.35";
    });

  state.usedFifty = true;
  fiftyButton.disabled = true;
}

function useExtraTime() {
  if (state.usedExtraTime || state.locked) {
    return;
  }
  state.timeLeft += 10;
  timeLeftEl.textContent = state.timeLeft;
  state.usedExtraTime = true;
  extraTimeButton.disabled = true;
}

function endGame() {
  clearTimer();
  gamePanel.hidden = true;
  resultsPanel.hidden = false;

  const maxScore = QUESTION_COUNT * (100 + ROUND_TIME * 3 + 60);
  const percent = Math.round((state.score / maxScore) * 100);
  finalSummary.textContent = `Final score: ${state.score} (${percent}%). Lives remaining: ${Math.max(0, state.lives)}.`;
}

async function fetchLeaderboard() {
  leaderboardTable.innerHTML = "<p class=\"small\">Loading...</p>";
  try {
    const response = await fetch(`/api/leaderboard?limit=25&mode=${GAME_MODE}`);
    if (!response.ok) {
      throw new Error("fetch failed");
    }
    const payload = await response.json();
    const rows = payload.entries || [];
    if (!rows.length) {
      leaderboardTable.innerHTML = "<p class=\"small\">No game submissions yet.</p>";
      return;
    }

    leaderboardTable.innerHTML = `
      <table>
        <thead>
          <tr><th>Rank</th><th>Name</th><th>Score</th><th>%</th><th>Updated</th></tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (row, idx) =>
                `<tr><td>${idx + 1}</td><td>${row.learner_name}</td><td>${row.best_score}/${row.total_possible}</td><td>${row.best_percent}%</td><td>${new Date(row.updated_at).toLocaleString()}</td></tr>`
            )
            .join("")}
        </tbody>
      </table>
    `;
  } catch {
    leaderboardTable.innerHTML = "<p class=\"small\">Leaderboard unavailable.</p>";
  }
}

async function submitScore() {
  if (!state.learnerName) {
    submitStatus.textContent = "Set learner name before submitting.";
    return;
  }

  const maxScore = QUESTION_COUNT * (100 + ROUND_TIME * 3 + 60);

  try {
    const response = await fetch("/api/leaderboard/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        learner_name: state.learnerName,
        best_score: state.score,
        total_possible: maxScore,
        mode: GAME_MODE
      })
    });

    if (!response.ok) {
      throw new Error("submit failed");
    }

    const payload = await response.json();
    submitStatus.textContent = `Score submitted. Rank: #${payload.rank}.`;
    fetchLeaderboard();
  } catch {
    submitStatus.textContent = "Submission failed. Check deployment and try again.";
  }
}

function startGame() {
  const learnerName = learnerNameInput.value.trim();
  if (!learnerName) {
    setupStatus.textContent = "Enter learner name to start.";
    return;
  }

  setupStatus.textContent = "";
  submitStatus.textContent = "";

  state = {
    learnerName,
    questions: pickQuestions(),
    index: 0,
    score: 0,
    lives: MAX_LIVES,
    streak: 0,
    timeLeft: ROUND_TIME,
    timerId: null,
    usedFifty: false,
    usedExtraTime: false,
    locked: false
  };

  localStorage.setItem("unit2_game_name", learnerName);

  setupPanel.hidden = true;
  resultsPanel.hidden = true;
  gamePanel.hidden = false;

  fiftyButton.disabled = false;
  extraTimeButton.disabled = false;
  renderQuestion();
}

function resetToSetup() {
  clearTimer();
  setupPanel.hidden = false;
  gamePanel.hidden = true;
  resultsPanel.hidden = true;
  feedbackEl.textContent = "";
}

startButton.addEventListener("click", startGame);
fiftyButton.addEventListener("click", useFiftyFifty);
extraTimeButton.addEventListener("click", useExtraTime);
submitButton.addEventListener("click", submitScore);
refreshButton.addEventListener("click", fetchLeaderboard);
playAgainButton.addEventListener("click", resetToSetup);

const savedName = localStorage.getItem("unit2_game_name");
if (savedName) {
  learnerNameInput.value = savedName;
}

fetchLeaderboard();
