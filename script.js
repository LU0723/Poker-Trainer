'use strict';

// =====================================================================
// APPLICATION STATE
// =====================================================================
const state = {
  selectedPosition: 'All',  // 'All' | 'UTG' | 'HJ' | 'CO' | 'BTN' | 'SB'
  currentScenario:  null,
  totalAnswered:    0,
  totalCorrect:     0,
  awaitingNext:     false,
};

// =====================================================================
// ACTION DEFINITIONS
// Add new actions here to extend the decision list (Call, 3bet, etc.).
// Each action: { id, label, type }
//   id    → must match a value used in RFI_DATA ('open' | 'fold')
//   label → displayed in the action list
//   type  → controls dot colour: fold | open | call | raise
// =====================================================================
const RFI_ACTIONS = [
  { id: 'open', label: 'Open 2.5x', type: 'open' },
  { id: 'fold', label: 'Fold',      type: 'fold' },
];

// Short labels for feedback text ("CO should Open A9s")
const ACTION_LABEL = { open: 'Open', fold: 'Fold' };

// =====================================================================
// TABLE CONSTANTS
// =====================================================================
const POS_TO_SEAT = {
  UTG: 'seat-utg', HJ: 'seat-hj', CO: 'seat-co',
  BTN: 'seat-btn', SB: 'seat-sb', BB: 'seat-bb',
};

const DEFAULT_STACKS = {
  UTG: 100, HJ: 100, CO: 100, BTN: 100, SB: 99.5, BB: 99,
};

// =====================================================================
// DOM REFS
// =====================================================================
const startBtn        = document.getElementById('start-btn');
const backBtn         = document.getElementById('back-btn');
const posBtns         = document.querySelectorAll('.pos-btn');
const potValue        = document.getElementById('pot-value');
const actionListEl    = document.getElementById('action-list');
const feedbackPanel   = document.getElementById('feedback-panel');
const feedbackVerdict = document.getElementById('feedback-verdict');
const feedbackDetail  = document.getElementById('feedback-detail');
const btnNext         = document.getElementById('btn-next');
const statAccuracy    = document.getElementById('stat-accuracy');
const statQuestions   = document.getElementById('stat-questions');

// =====================================================================
// SCREEN ROUTING
// =====================================================================
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

// =====================================================================
// POSITION FILTER
// =====================================================================
posBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    posBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.selectedPosition = btn.dataset.pos;
  });
});

// =====================================================================
// SCENARIO GENERATION
// Pulls a random position (respecting filter) and a random hand from
// that position's RFI_DATA chart.
// Avoids repeating the exact same position+hand back-to-back.
// =====================================================================
function generateScenario() {
  const allPositions = Object.keys(RFI_DATA);

  // Build position pool based on filter
  const pool = state.selectedPosition === 'All'
    ? allPositions
    : allPositions.filter(p => p === state.selectedPosition);

  // Guard: if filter matches nothing (shouldn't happen), fall back to all
  const activePool = pool.length > 0 ? pool : allPositions;

  let position, hand, attempts = 0;

  do {
    position = activePool[Math.floor(Math.random() * activePool.length)];
    const hands = Object.keys(RFI_DATA[position]);
    hand = hands[Math.floor(Math.random() * hands.length)];
    attempts++;
  } while (
    // Avoid immediate repeat of the same spot (max 5 tries)
    attempts < 5 &&
    state.currentScenario !== null &&
    hand     === state.currentScenario.heroHand &&
    position === state.currentScenario.heroPosition
  );

  return {
    heroPosition:  position,
    heroHand:      hand,
    potSize:       1.5,
    correctAction: RFI_DATA[position][hand], // 'open' | 'fold'
  };
}

// =====================================================================
// TABLE: LOAD SCENARIO
// Resets the table visual and action list for a new question.
// =====================================================================
function loadScenario(scenario) {
  state.currentScenario = scenario;
  state.awaitingNext    = false;

  // Pot display
  potValue.textContent = scenario.potSize + 'bb';

  // Hero seat — clear all, then highlight the correct one
  document.querySelectorAll('.seat').forEach(seat => {
    seat.classList.remove('hero-seat');
    seat.querySelector('.seat-hand').textContent = '';
  });
  const heroEl = document.getElementById(POS_TO_SEAT[scenario.heroPosition]);
  heroEl.classList.add('hero-seat');
  heroEl.querySelector('.seat-hand').textContent = scenario.heroHand;

  // Stacks
  Object.entries(DEFAULT_STACKS).forEach(([pos, val]) => {
    const el = document.getElementById(POS_TO_SEAT[pos]);
    if (el) el.querySelector('.seat-stack').textContent = val;
  });

  // Rebuild action list
  renderActionList();

  // Hide previous feedback
  feedbackPanel.classList.add('hidden');
}

// =====================================================================
// ACTION LIST: RENDER
// Re-creates the clickable rows from RFI_ACTIONS.
// To support a scenario-specific action set, pass scenario.availableActions
// or extend this function when adding Call / 3bet / etc.
// =====================================================================
function renderActionList() {
  actionListEl.innerHTML = '';

  RFI_ACTIONS.forEach(action => {
    const btn = document.createElement('button');
    btn.className    = 'action-item';
    btn.dataset.id   = action.id;
    btn.dataset.type = action.type;
    btn.innerHTML = `
      <span class="action-dot"></span>
      <span class="action-label">${action.label}</span>
      <span class="action-chevron">›</span>
    `;
    btn.addEventListener('click', () => handleAnswer(action.id));
    actionListEl.appendChild(btn);
  });
}

// =====================================================================
// ANSWER HANDLER
// Locks the list, applies result styling, shows feedback.
// =====================================================================
function handleAnswer(chosenId) {
  if (state.awaitingNext) return;
  state.awaitingNext = true;

  const scenario = state.currentScenario;
  const correct  = chosenId === scenario.correctAction;

  state.totalAnswered++;
  if (correct) state.totalCorrect++;

  // Style each action item
  document.querySelectorAll('.action-item').forEach(item => {
    item.disabled = true;
    const id = item.dataset.id;

    if (id === chosenId) {
      item.classList.add(correct ? 'chosen-correct' : 'chosen-incorrect');
    } else if (!correct && id === scenario.correctAction) {
      item.classList.add('correct-answer'); // reveal correct answer on wrong pick
    } else {
      item.classList.add('unchosen');
    }
  });

  // Feedback text
  const actionName = ACTION_LABEL[scenario.correctAction] || scenario.correctAction;
  feedbackVerdict.textContent = correct ? 'Correct!' : 'Incorrect';
  feedbackVerdict.className   = 'feedback-verdict ' + (correct ? 'correct' : 'incorrect');
  feedbackDetail.innerHTML    =
    `${scenario.heroPosition} should <strong>${actionName}</strong> ${scenario.heroHand}`;

  feedbackPanel.classList.remove('hidden');

  refreshStats();
}

// =====================================================================
// STATS
// =====================================================================
function refreshStats() {
  statAccuracy.textContent =
    state.totalAnswered > 0
      ? Math.round((state.totalCorrect / state.totalAnswered) * 100) + '%'
      : '—';
  statQuestions.textContent = state.totalAnswered;
}

// =====================================================================
// EVENTS
// =====================================================================
startBtn.addEventListener('click', () => {
  state.totalAnswered   = 0;
  state.totalCorrect    = 0;
  state.currentScenario = null;
  refreshStats();
  loadScenario(generateScenario());
  showScreen('screen-training');
});

backBtn.addEventListener('click', () => showScreen('screen-home'));

btnNext.addEventListener('click', () => loadScenario(generateScenario()));
