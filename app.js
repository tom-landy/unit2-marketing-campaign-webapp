const PASS_PERCENT = 70;
const STORAGE_KEY = "unit2_revision_progress_v4";

const topics = [
  {
    id: "activity1-core",
    title: "1. Activity 1 Core Requirements",
    description: "Aims, SMART objectives, and analysis of market and competitor data.",
    questions: [
      {
        prompt: "What is the best distinction between a marketing aim and a marketing objective?",
        options: [
          "An aim is broad direction; an objective is specific and measurable",
          "An aim is always numerical; an objective is always descriptive",
          "Aims and objectives are identical terms",
          "Objectives are only used after a campaign ends"
        ],
        answer: 0
      },
      {
        prompt: "Which objective is strongest for measuring campaign effectiveness?",
        options: [
          "Improve engagement soon",
          "Increase website conversion rate from 2% to 3.5% by the end of term",
          "Post more often on social media",
          "Reach everyone in the local area"
        ],
        answer: 1
      },
      {
        prompt: "When analysing competitors, which finding is most useful for planning?",
        options: [
          "Their office opening times",
          "Their favorite brand colors",
          "Their channel strategy, pricing, and value proposition",
          "How many followers they had three years ago"
        ],
        answer: 2
      },
      {
        prompt: "Why does market analysis improve campaign quality?",
        options: [
          "It helps match offer and message to real customer demand",
          "It removes the need for objectives",
          "It guarantees success regardless of budget",
          "It only matters for design decisions"
        ],
        answer: 0
      },
      {
        prompt: "Which metric is most useful when a campaign aim is increasing sales actions?",
        options: [
          "Conversion rate",
          "Logo recognition in one class",
          "Number of internal meetings",
          "Total number of colors used in ads"
        ],
        answer: 0
      },
      {
        prompt: "A competitor offers a lower price but weaker service quality. What is a sensible response?",
        options: [
          "Adjust positioning to emphasise value, not just price",
          "Ignore competitors completely",
          "Copy every competitor message directly",
          "Remove all market analysis from the rationale"
        ],
        answer: 0
      },
      {
        prompt: "What makes objective-setting weak in a rationale?",
        options: [
          "Objectives with no baseline, target value, or timeframe",
          "Objectives linked to specific KPIs",
          "Objectives tied to audience behavior",
          "Objectives informed by research evidence"
        ],
        answer: 0
      },
      {
        prompt: "Which statement best links research to strategic choice?",
        options: [
          "Survey findings show 17-19 students prefer short video, so we prioritise short-form channels",
          "We chose channels based on what we like to use",
          "We chose the cheapest channel without audience data",
          "We set goals after writing the final plan"
        ],
        answer: 0
      }
    ]
  },
  {
    id: "activity1-evaluation",
    title: "2. Reliability And Validity",
    description: "Evaluate evidence quality and justify the rationale.",
    questions: [
      {
        prompt: "Scenario: A local gym surveys the same 12 existing premium members every month using identical questions. Results are consistent, but the new campaign targets non-members aged 16-19. Is this evidence reliable or valid for the campaign decision?",
        options: [
          "Reliable but not valid",
          "Valid but not reliable",
          "Both reliable and valid",
          "Neither reliable nor valid"
        ],
        answer: 0
      },
      {
        prompt: "Scenario: A campaign team uses one anonymous social media comment ('best product ever') as the main reason to increase ad spend, without any wider sample or source checks. Is this evidence reliable or valid?",
        options: [
          "Reliable but not valid",
          "Valid but not reliable",
          "Both reliable and valid",
          "Neither reliable nor valid"
        ],
        answer: 3
      },
      {
        prompt: "Which research source is most likely both reliable and valid for choosing a student channel strategy?",
        options: [
          "A recent survey of 300 students in the target age group, with clear sampling method",
          "A teacher's personal opinion based on one class",
          "A two-year-old national article with no method details",
          "A competitor's advertisement claims"
        ],
        answer: 0
      },
      {
        prompt: "A data source is internally consistent but collected from the wrong customer segment. What is the best judgement?",
        options: [
          "Reliable but low validity for this decision",
          "Fully valid because results are consistent",
          "Both invalid and unreliable by default",
          "Valid only if the sample size is small"
        ],
        answer: 0
      },
      {
        prompt: "Which is the strongest justification statement?",
        options: [
          "We chose TikTok because 68% of our target audience uses it daily and CPC is lower than alternatives",
          "We chose TikTok because it is popular",
          "We chose TikTok because another brand did",
          "We chose TikTok because the logo looks modern"
        ],
        answer: 0
      },
      {
        prompt: "In a high-scoring rationale, evaluation of evidence should:",
        options: [
          "Acknowledge limits or bias and explain impact on decisions",
          "Accept all sources equally",
          "Avoid comparing sources",
          "Focus on presentation style only"
        ],
        answer: 0
      },
      {
        prompt: "If research comes from a large sample but from five years ago in a fast-changing market, the key issue is:",
        options: [
          "Validity may be reduced due to lack of current relevance",
          "Reliability is automatically zero",
          "The source is always best because of sample size",
          "No evaluation is required"
        ],
        answer: 0
      },
      {
        prompt: "What is the strongest way to improve validity before final decisions?",
        options: [
          "Triangulate with current data from the exact target audience",
          "Use only one persuasive source",
          "Remove all conflicting evidence",
          "Prioritise sources with the best design only"
        ],
        answer: 0
      }
    ]
  },
  {
    id: "activity2-plan",
    title: "3. Activity 2 Plan Components",
    description: "Full 7 Ps marketing mix plus message and media choices.",
    questions: [
      {
        prompt: "Which option correctly lists all 7 Ps?",
        options: [
          "Product, Price, Place, Promotion, People, Process, Physical Evidence",
          "Product, Price, Place, Promotion, Positioning, Packaging, Performance",
          "Product, Price, Promotion, Persona, Process, Physical Evidence, Profit",
          "Product, Price, Place, Promotion only"
        ],
        answer: 0
      },
      {
        prompt: "If a campaign has strong promotion but weak product decisions, what is the likely outcome?",
        options: [
          "Short-term attention but weak conversion and retention",
          "Guaranteed long-term growth",
          "No need for pricing strategy",
          "No need to monitor results"
        ],
        answer: 0
      },
      {
        prompt: "What makes a marketing message persuasive for a chosen segment?",
        options: [
          "It links customer pain point to a clear value proposition and CTA",
          "It uses as many slogans as possible",
          "It avoids specific benefits",
          "It focuses only on company history"
        ],
        answer: 0
      },
      {
        prompt: "Best practice for media selection is to:",
        options: [
          "Prioritise channels where target audience attention and intent are highest",
          "Use every platform equally",
          "Choose channels based on what the team personally prefers",
          "Ignore channel performance data"
        ],
        answer: 0
      },
      {
        prompt: "Which example best represents the 'People' element of the 7 Ps?",
        options: [
          "Staff training quality and customer-facing behavior",
          "Social media ad frequency",
          "Warehouse location only",
          "Headline font choice"
        ],
        answer: 0
      },
      {
        prompt: "Which action most clearly strengthens 'Process'?",
        options: [
          "Reducing checkout steps from 6 to 3 to lower drop-off",
          "Changing brand colors monthly",
          "Increasing office decorations",
          "Posting ads at random times"
        ],
        answer: 0
      },
      {
        prompt: "In services marketing, 'Physical Evidence' often refers to:",
        options: [
          "The tangible cues that build trust, such as testimonials and packaging",
          "Only product price",
          "Only channel choice",
          "Only internal staffing schedules"
        ],
        answer: 0
      },
      {
        prompt: "Which pricing strategy is most aligned with premium positioning?",
        options: [
          "Value-based pricing supported by quality proof points",
          "Always being the cheapest option",
          "Random price changes with no rationale",
          "Matching any competitor regardless of brand fit"
        ],
        answer: 0
      }
    ]
  },
  {
    id: "activity2-delivery",
    title: "4. Budget, Timescale, And Format",
    description: "Plan must be costed, scheduled, and suitable for exam expectations.",
    questions: [
      {
        prompt: "Which budgeting approach best supports campaign control?",
        options: [
          "One total figure with no breakdown",
          "Channel-level breakdown linked to expected outcomes",
          "Only costs from week one",
          "Budgeting after campaign launch"
        ],
        answer: 1
      },
      {
        prompt: "Why is phasing a timescale across pre-launch, launch, and review useful?",
        options: [
          "It enables sequencing, resource planning, and performance checks",
          "It removes the need for SMART objectives",
          "It guarantees media effectiveness",
          "It is mainly for visual presentation"
        ],
        answer: 0
      },
      {
        prompt: "Appropriate format for the exam means the plan should be:",
        options: [
          "Professional, concise, and logically structured for assessment decisions",
          "Informal and conversational",
          "Mostly visual with minimal written reasoning",
          "A list of ideas with no prioritisation"
        ],
        answer: 0
      },
      {
        prompt: "Which plan is most evaluable after launch?",
        options: [
          "Actions linked to costs, timeline, and measurable KPIs",
          "Creative ideas with no measurable targets",
          "A completed poster with no budget data",
          "Competitor notes only"
        ],
        answer: 0
      },
      {
        prompt: "What is the main risk of setting budget only as one total figure?",
        options: [
          "You cannot judge cost-effectiveness by channel",
          "You automatically improve ROI",
          "You remove the need for timescales",
          "You increase validity of all evidence"
        ],
        answer: 0
      },
      {
        prompt: "A strong timescale should include:",
        options: [
          "Milestones, owners, and review points",
          "Only a campaign start date",
          "Only a campaign end date",
          "No references to monitoring"
        ],
        answer: 0
      },
      {
        prompt: "Which KPI pairing is most useful for channel performance review?",
        options: [
          "CTR and conversion rate",
          "Logo size and ad color",
          "Team mood and office temperature",
          "Number of meetings and coffee spend"
        ],
        answer: 0
      },
      {
        prompt: "Why should planned actions be prioritised in the exam format?",
        options: [
          "It helps show strategic judgment and feasibility under constraints",
          "It allows omission of evidence",
          "It removes the need for a budget",
          "It replaces the 7 Ps"
        ],
        answer: 0
      }
    ]
  },
  {
    id: "submission",
    title: "5. Required Exam Submission",
    description: "Integrate theory into final rationale and plan quality.",
    questions: [
      {
        prompt: "When finalising the rationale, what best demonstrates strategic coherence?",
        options: [
          "Aims, evidence, and recommended actions all align to the same target segment",
          "Each section uses a different target audience",
          "Objectives are unrelated to research findings",
          "Message and channels are chosen before any analysis"
        ],
        answer: 0
      },
      {
        prompt: "Which revision is most likely to improve campaign ROI before submission?",
        options: [
          "Reallocate budget from high-cost low-conversion channel to better-performing one",
          "Add more decorative visuals",
          "Increase message length across all ads",
          "Remove KPI targets to simplify the plan"
        ],
        answer: 0
      },
      {
        prompt: "What does a strong final quality check include?",
        options: [
          "Checking that every recommendation is supported by data and linked to objectives",
          "Checking spelling only",
          "Removing all numerical data",
          "Replacing analysis with opinions"
        ],
        answer: 0
      },
      {
        prompt: "Which complete submission set is required at the end of the exam?",
        options: [
          "Rationale only",
          "Campaign plan only",
          "Rationale, budgeted marketing campaign plan, and authentication form",
          "Notes and a slide deck"
        ],
        answer: 2
      },
      {
        prompt: "Which revision action best improves the quality of final submission documents?",
        options: [
          "Cross-check every recommendation against the original objectives and evidence",
          "Add extra design effects and remove analysis",
          "Delete competitor references to save space",
          "Replace KPIs with general statements"
        ],
        answer: 0
      },
      {
        prompt: "Before submitting, why is consistency across both documents important?",
        options: [
          "It shows the plan logically follows from the rationale",
          "It is only needed for spelling checks",
          "It avoids having to include budget",
          "It allows different target audiences in each section"
        ],
        answer: 0
      },
      {
        prompt: "If the rationale recommends Instagram and the plan budgets only for print flyers, this is mainly a problem of:",
        options: [
          "Strategic misalignment between analysis and execution",
          "Excessive use of terminology",
          "Overly detailed formatting",
          "Too many review checkpoints"
        ],
        answer: 0
      },
      {
        prompt: "What should students do if evidence sources conflict before submission?",
        options: [
          "Evaluate strengths/limits of each source and justify the final choice",
          "Ignore all conflicting data",
          "Choose the source with the best-looking chart",
          "Remove evidence discussion entirely"
        ],
        answer: 0
      }
    ]
  }
];

const pathCards = document.getElementById("path-cards");
const activeTopic = document.getElementById("active-topic");
const quizContainer = document.getElementById("quiz-container");
const gradeQuizButton = document.getElementById("grade-quiz");
const nextTopicButton = document.getElementById("next-topic");
const quizResult = document.getElementById("quiz-result");
const mixedContainer = document.getElementById("mixed-container");
const mixedGradeButton = document.getElementById("grade-mixed");
const mixedResult = document.getElementById("mixed-result");
const learnerNameInput = document.getElementById("learner-name");
const totalScoreDisplay = document.getElementById("total-score");
const submitLeaderboardButton = document.getElementById("submit-leaderboard");
const refreshLeaderboardButton = document.getElementById("refresh-leaderboard");
const leaderboardTable = document.getElementById("leaderboard-table");
const statusMessage = document.getElementById("status-message");

let state = {
  completed: {},
  activeTopicId: topics[0].id,
  learnerName: ""
};

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return;
  }

  try {
    const parsed = JSON.parse(raw);
    const validTopicIds = new Set(topics.map((topic) => topic.id));

    const completed = {};
    if (parsed.completed && typeof parsed.completed === "object") {
      Object.entries(parsed.completed).forEach(([id, value]) => {
        if (
          validTopicIds.has(id) &&
          value &&
          typeof value.bestPercent === "number" &&
          typeof value.bestScore === "number" &&
          typeof value.totalQuestions === "number"
        ) {
          completed[id] = {
            bestPercent: value.bestPercent,
            bestScore: value.bestScore,
            totalQuestions: value.totalQuestions
          };
        }
      });
    }

    state = {
      completed,
      activeTopicId: validTopicIds.has(parsed.activeTopicId)
        ? parsed.activeTopicId
        : topics[0].id,
      learnerName: typeof parsed.learnerName === "string" ? parsed.learnerName : ""
    };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function getTopicIndex(topicId) {
  return topics.findIndex((topic) => topic.id === topicId);
}

function getNextTopic(topicId) {
  const index = getTopicIndex(topicId);
  if (index < 0 || index >= topics.length - 1) {
    return null;
  }
  return topics[index + 1];
}

function calculateTotalBestScore() {
  const totalPossible = topics.reduce((sum, topic) => sum + topic.questions.length, 0);
  const totalEarned = topics.reduce((sum, topic) => {
    return sum + (state.completed[topic.id]?.bestScore || 0);
  }, 0);
  const percent = Math.round((totalEarned / totalPossible) * 100);

  return { totalEarned, totalPossible, percent };
}

function renderTotalScore() {
  const { totalEarned, totalPossible, percent } = calculateTotalBestScore();
  totalScoreDisplay.textContent = `Total score (best attempts): ${totalEarned}/${totalPossible} (${percent}%)`;
}

function updateNextTopicButton() {
  const nextTopic = getNextTopic(state.activeTopicId);

  if (!nextTopic) {
    nextTopicButton.disabled = true;
    nextTopicButton.textContent = "All Topics Complete";
    return;
  }

  nextTopicButton.disabled = false;
  nextTopicButton.textContent = `Next Topic: ${nextTopic.title}`;
}

function renderPath() {
  pathCards.innerHTML = topics
    .map((topic, idx) => {
      const best = state.completed[topic.id]?.bestPercent;
      const status = typeof best === "number" ? "Attempted" : "Ready";
      const bestText = typeof best === "number" ? `Best: ${best}%` : "Not attempted";

      return `
        <article class="path-card">
          <h3>${topic.title}</h3>
          <p>${topic.description}</p>
          <p class="status unlocked">${status}</p>
          <p class="small">${bestText}</p>
          <button class="btn btn-primary" data-topic-index="${idx}">
            Practice Topic
          </button>
        </article>
      `;
    })
    .join("");

  pathCards.querySelectorAll("button[data-topic-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const topic = topics[Number(button.dataset.topicIndex)];
      state.activeTopicId = topic.id;
      saveState();
      renderActiveTopicQuiz();
      document.getElementById("topic-quiz").scrollIntoView({ behavior: "smooth" });
    });
  });
}

function renderQuizSet(questions, rootIdPrefix) {
  function shuffleOptions(options) {
    const shuffled = options.map((text, originalIndex) => ({ text, originalIndex }));
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  return questions
    .map(
      (question, qIdx) => `
        <article class="quiz-item">
          <p><strong>${qIdx + 1}. ${question.prompt}</strong></p>
          <div class="quiz-options">
            ${shuffleOptions(question.options)
              .map(
                (option) => `
                  <label>
                    <input type="radio" name="${rootIdPrefix}-q${qIdx}" value="${option.originalIndex}" />
                    <span>${option.text}</span>
                  </label>
                `
              )
              .join("")}
          </div>
        </article>
      `
    )
    .join("");
}

function renderActiveTopicQuiz() {
  const topic = topics.find((entry) => entry.id === state.activeTopicId) || topics[0];
  activeTopic.textContent = `Current topic: ${topic.title}`;
  quizContainer.innerHTML = renderQuizSet(topic.questions, topic.id);
  quizResult.textContent = "";
  updateNextTopicButton();
}

function gradeTopicQuiz() {
  const topic = topics.find((entry) => entry.id === state.activeTopicId) || topics[0];
  let score = 0;

  topic.questions.forEach((question, idx) => {
    const selected = document.querySelector(`input[name="${topic.id}-q${idx}"]:checked`);
    if (selected && Number(selected.value) === question.answer) {
      score += 1;
    }
  });

  const percent = Math.round((score / topic.questions.length) * 100);
  const existingBestScore = state.completed[topic.id]?.bestScore || 0;
  const bestScore = Math.max(existingBestScore, score);
  const bestPercent = Math.round((bestScore / topic.questions.length) * 100);

  state.completed[topic.id] = {
    bestPercent,
    bestScore,
    totalQuestions: topic.questions.length
  };

  saveState();
  renderPath();
  renderTotalScore();

  const message =
    percent >= PASS_PERCENT
      ? `Checkpoint score: ${score}/${topic.questions.length} (${percent}%).`
      : `Checkpoint score: ${score}/${topic.questions.length} (${percent}%). Review and retake to improve.`;

  quizResult.textContent = message;
  updateNextTopicButton();
}

function getMixedQuestions() {
  return topics.flatMap((topic) => topic.questions.slice(0, 2));
}

function renderMixedPractice() {
  mixedContainer.innerHTML = renderQuizSet(getMixedQuestions(), "mixed");
  mixedResult.textContent = "";
}

function gradeMixedPractice() {
  const mixedQuestions = getMixedQuestions();
  let score = 0;

  mixedQuestions.forEach((question, idx) => {
    const selected = document.querySelector(`input[name="mixed-q${idx}"]:checked`);
    if (selected && Number(selected.value) === question.answer) {
      score += 1;
    }
  });

  const percent = Math.round((score / mixedQuestions.length) * 100);
  mixedResult.textContent = `Mixed practice score: ${score}/${mixedQuestions.length} (${percent}%).`;
}

function renderLeaderboard(rows) {
  if (!Array.isArray(rows) || rows.length === 0) {
    leaderboardTable.innerHTML = "<p class=\"small\">No submissions yet.</p>";
    return;
  }

  leaderboardTable.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
          <th>Percent</th>
          <th>Updated</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (row, idx) => `
              <tr>
                <td>${idx + 1}</td>
                <td>${row.learner_name}</td>
                <td>${row.best_score}/${row.total_possible}</td>
                <td>${row.best_percent}%</td>
                <td>${new Date(row.updated_at).toLocaleString()}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

async function fetchLeaderboard() {
  leaderboardTable.innerHTML = "<p class=\"small\">Loading leaderboard...</p>";
  try {
    const response = await fetch("/api/leaderboard?limit=30");
    if (!response.ok) {
      throw new Error("Failed to fetch leaderboard");
    }
    const payload = await response.json();
    renderLeaderboard(payload.entries || []);
  } catch {
    leaderboardTable.innerHTML =
      "<p class=\"small\">Leaderboard unavailable. Start with the Flask server on Render/local.</p>";
  }
}

async function submitToLeaderboard() {
  const learnerName = state.learnerName.trim();
  if (!learnerName) {
    statusMessage.textContent = "Enter learner name before submitting to leaderboard.";
    return;
  }

  const total = calculateTotalBestScore();

  try {
    const response = await fetch("/api/leaderboard/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        learner_name: learnerName,
        best_score: total.totalEarned,
        total_possible: total.totalPossible
      })
    });

    if (!response.ok) {
      throw new Error("Failed to submit leaderboard score");
    }

    const payload = await response.json();
    statusMessage.textContent = `Leaderboard updated. Current rank: #${payload.rank}.`;
    fetchLeaderboard();
  } catch {
    statusMessage.textContent =
      "Could not submit leaderboard score. Check server deployment and try again.";
  }
}

loadState();
learnerNameInput.value = state.learnerName;
renderPath();
renderActiveTopicQuiz();
renderMixedPractice();
renderTotalScore();
fetchLeaderboard();

gradeQuizButton.addEventListener("click", gradeTopicQuiz);
nextTopicButton.addEventListener("click", () => {
  const nextTopic = getNextTopic(state.activeTopicId);
  if (!nextTopic) {
    return;
  }
  state.activeTopicId = nextTopic.id;
  saveState();
  renderActiveTopicQuiz();
});
mixedGradeButton.addEventListener("click", gradeMixedPractice);
learnerNameInput.addEventListener("input", () => {
  state.learnerName = learnerNameInput.value;
  saveState();
});
submitLeaderboardButton.addEventListener("click", submitToLeaderboard);
refreshLeaderboardButton.addEventListener("click", fetchLeaderboard);
