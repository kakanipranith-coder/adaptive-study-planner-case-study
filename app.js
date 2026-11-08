const STORAGE_KEY = 'resync-study-planner-v1';
const DAILY_SLOTS = [
  { id: 'morning', label: 'Morning focus', time: '07:00–08:30', hours: 1.5 },
  { id: 'late-morning', label: 'Late morning', time: '10:00–11:30', hours: 1.5 },
  { id: 'afternoon', label: 'Afternoon focus', time: '14:00–15:30', hours: 1.5 },
  { id: 'evening', label: 'Evening review', time: '19:00–20:00', hours: 1 }
];
const BUFFER_SLOTS = [
  { id: 'buffer-one', label: 'Buffer slot 1', time: '09:00–11:00', hours: 2 },
  { id: 'buffer-two', label: 'Buffer slot 2', time: '15:00–17:00', hours: 2 }
];
const dateInput = document.getElementById('selected-date');
const slotList = document.getElementById('slot-list');
const status = document.getElementById('sync-status');
let storageWarning = '';

function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function makeStarterState() {
  const today = localDateString();
  return {
    holidays: [],
    exam: 'GATE CS',
    topics: [
      { id: createId(), exam: 'GATE CS', title: 'Dynamic Programming', subject: 'Design & Analysis of Algorithms', date: today, slot: 'morning', importance: 'high', completed: false, completedAt: null },
      { id: createId(), exam: 'GATE CS', title: 'IPv4 Addressing & Subnetting', subject: 'Computer Networks', date: today, slot: 'late-morning', importance: 'high', completed: false, completedAt: null },
      { id: createId(), exam: 'GATE CS', title: 'Graph Theory & Trees', subject: 'Discrete Mathematics', date: today, slot: 'afternoon', importance: 'normal', completed: false, completedAt: null },
      { id: createId(), exam: 'GATE CS', title: 'Context-Free Grammars', subject: 'Automata & Compiler Design', date: today, slot: 'evening', importance: 'high', completed: false, completedAt: null }
    ]
  };
}

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return makeStarterState();
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed.topics) || !Array.isArray(parsed.holidays)) {
      throw new Error('Saved planner data has an unexpected format.');
    }
    const savedExam = parsed.exam || 'GATE CS';
    parsed.topics.forEach((topic) => {
      if (!topic.exam) topic.exam = savedExam;
    });
    return parsed;
  } catch (error) {
    storageWarning = `Saved plan could not be loaded: ${error.message}`;
    return makeStarterState();
  }
}

const state = loadState();
if (!state.exam) state.exam = 'GATE CS';

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    status.textContent = storageWarning || 'Saved on this device';
    status.classList.toggle('status-warning', Boolean(storageWarning));
  } catch (error) {
    status.textContent = `Save failed: ${error.message}`;
    status.classList.add('status-warning');
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function dateFromString(value) {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(value, options = { weekday: 'long', month: 'long', day: 'numeric' }) {
  return dateFromString(value).toLocaleDateString(undefined, options);
}

function slotsForDate(date) {
  const slots = [...DAILY_SLOTS];
  const isSunday = dateFromString(date).getDay() === 0;
  const isHoliday = state.holidays.includes(date);
  if (isSunday || isHoliday) slots.push(...BUFFER_SLOTS);
  return slots;
}

function selectedDateTopics() {
  return state.topics.filter((topic) => topic.exam === state.exam && topic.date === dateInput.value);
}

function selectedExamTopics() {
  return state.topics.filter((topic) => topic.exam === state.exam);
}

function slotDestinationOptions() {
  const start = dateFromString(dateInput.value);
  const destinations = [];
  for (let offset = -7; offset < 14; offset++) {
    const date = new Date(start);
    date.setDate(start.getDate() + offset);
    const dateValue = localDateString(date);
    for (const slot of slotsForDate(dateValue)) {
      destinations.push({
        value: `${dateValue}|${slot.id}`,
        label: `${formatDate(dateValue, { weekday: 'short', month: 'short', day: 'numeric' })} · ${slot.label} (${slot.time})`
      });
    }
  }
  return destinations;
}

function getTopicPriority(topic) {
  return StudyAgent.rankTopic(topic, state.exam);
}

function renderExamTopics() {
  const exam = state.exam;
  document.getElementById('add-topic-heading').textContent = `Add a topic to ${exam}`;
  const heading = document.getElementById('exam-topics-heading');
  const list = document.getElementById('exam-topic-list');
  heading.textContent = `Important topics for ${exam}`;
  const recommendations = StudyAgent.getRecommendedTopics(exam);
  if (!recommendations.length) {
    list.innerHTML = '<p class="empty-recommendations">Select a listed exam to see exam-specific suggestions. For another exam, add your own topics below.</p>';
    return;
  }
  const alreadyPlanned = selectedExamTopics();
  list.innerHTML = recommendations.map((topic, index) => {
    const added = alreadyPlanned.some((entry) =>
      entry.title.toLowerCase() === topic.title.toLowerCase()
      && entry.subject.toLowerCase() === topic.subject.toLowerCase()
    );
    return `<article class="exam-topic">
      <div><strong>${escapeHTML(topic.title)}</strong><small>${escapeHTML(topic.subject)} · High priority</small></div>
      <button class="btn ${added ? 'btn-added' : 'btn-outline'}" type="button" data-action="add-recommendation" data-topic-index="${index}" ${added ? 'disabled' : ''}>
        ${added ? 'In your plan' : 'Add topic'}
      </button>
    </article>`;
  }).join('');
}

function renderTopicDetectionPreview() {
  const title = document.getElementById('topic-title').value.trim();
  const subject = document.getElementById('topic-subject').value.trim();
  const preview = document.getElementById('topic-detection-preview');
  if (!title && !subject) {
    preview.textContent = `The study agent will check this topic against ${state.exam}.`;
    preview.classList.remove('detected', 'unmatched');
    return;
  }
  const detection = StudyAgent.detectTopic({ title, subject }, state.exam);
  if (detection.matched) {
    preview.textContent = `Detected for ${state.exam}: ${detection.area}`;
    preview.classList.add('detected');
    preview.classList.remove('unmatched');
  } else {
    preview.textContent = `No clear ${state.exam} syllabus match yet. Check the topic wording or verify it against the official syllabus.`;
    preview.classList.add('unmatched');
    preview.classList.remove('detected');
  }
}

function renderAssistantResult(rankedTopics = null, bufferedCount = 0) {
  const result = document.getElementById('assistant-result');
  if (!rankedTopics) {
    result.innerHTML = '<p>Choose your exam and run the assistant to rank your unfinished topics and update your plan.</p>';
    return;
  }
  if (!rankedTopics.length) {
    result.innerHTML = '<p>There are no unfinished topics to reschedule.</p>';
    return;
  }
  result.innerHTML = `
    <p class="assistant-summary">Prioritized ${rankedTopics.length} unfinished ${rankedTopics.length === 1 ? 'topic' : 'topics'} and placed them into upcoming slots.${bufferedCount ? ` Moved ${bufferedCount} overdue ${bufferedCount === 1 ? 'topic' : 'topics'} into Sunday or holiday buffers.` : ''}</p>
    <ol class="priority-list">${rankedTopics.slice(0, 5).map(({ topic, priority }) => {
      const slot = slotsForDate(topic.date).find((entry) => entry.id === topic.slot);
      const detectedArea = priority.detection.matched ? ` · ${priority.detection.area}` : '';
      return `<li>
        <div><strong>${escapeHTML(topic.subject)} — ${escapeHTML(topic.title)}</strong>
          <small>${escapeHTML(priority.reasons.join(' · '))}</small></div>
        <span>${escapeHTML(formatDate(topic.date, { weekday: 'short', month: 'short', day: 'numeric' }))} · ${escapeHTML(slot ? slot.label : topic.slot)}${escapeHTML(detectedArea)}</span>
      </li>`;
    }).join('')}</ol>
    ${rankedTopics.length > 5 ? `<p class="assistant-more">And ${rankedTopics.length - 5} more prioritized topics are in your plan.</p>` : ''}
  `;
}

function prioritizeAndReschedule() {
  const startDate = dateInput.value;
  const pendingTopics = selectedExamTopics()
    .filter((topic) => !topic.completed)
    .map((topic) => ({ topic, priority: getTopicPriority(topic) }))
    .sort((first, second) =>
      second.priority.score - first.priority.score
      || first.topic.date.localeCompare(second.topic.date)
      || first.topic.title.localeCompare(second.topic.title)
    );

  if (!pendingTopics.length) {
    renderAssistantResult([]);
    return;
  }

  const overdueTopics = pendingTopics.filter(({ topic }) => topic.date < startDate);
  const bufferDestinations = [];
  for (let offset = 0; bufferDestinations.length < overdueTopics.length && offset < 366; offset++) {
    const date = dateFromString(startDate);
    date.setDate(date.getDate() + offset);
    const dateValue = localDateString(date);
    for (const slot of slotsForDate(dateValue).filter((entry) => entry.id.startsWith('buffer-'))) {
      bufferDestinations.push({ date: dateValue, slot: slot.id });
    }
  }

  const assignments = new Map();
  overdueTopics.forEach(({ topic }, index) => {
    if (bufferDestinations[index]) assignments.set(topic.id, { ...bufferDestinations[index], buffered: true });
  });

  const remainingTopics = pendingTopics.filter(({ topic }) => !assignments.has(topic.id));
  const regularDestinations = [];
  for (let offset = 0; regularDestinations.length < remainingTopics.length && offset < 366; offset++) {
    const date = dateFromString(startDate);
    date.setDate(date.getDate() + offset);
    const dateValue = localDateString(date);
    for (const slot of DAILY_SLOTS) {
      regularDestinations.push({ date: dateValue, slot: slot.id, buffered: false });
    }
  }
  if (regularDestinations.length < remainingTopics.length) {
    status.textContent = 'Could not create enough schedule slots.';
    status.classList.add('status-warning');
    return;
  }

  remainingTopics.forEach(({ topic }, index) => {
    assignments.set(topic.id, regularDestinations[index]);
  });

  pendingTopics.forEach(({ topic }) => {
    const assignment = assignments.get(topic.id);
    topic.date = assignment.date;
    topic.slot = assignment.slot;
  });
  const scheduledTopics = pendingTopics.map(({ topic, priority }) => ({
    topic,
    priority,
    buffered: assignments.get(topic.id).buffered
  }));
  const bufferedCount = scheduledTopics.filter((entry) => entry.buffered).length;
  renderAssistantResult(scheduledTopics, bufferedCount);
  renderDay();
  renderReport();
  saveState();
}

function updateOverview() {
  const topics = selectedDateTopics();
  const completed = topics.filter((topic) => topic.completed).length;
  const examTopics = selectedExamTopics();
  const allCompleted = examTopics.filter((topic) => topic.completed).length;
  const overall = examTopics.length ? Math.round((allCompleted / examTopics.length) * 100) : 0;
  const hours = topics.reduce((sum, topic) => {
    const slot = slotsForDate(topic.date).find((item) => item.id === topic.slot);
    return sum + (slot ? slot.hours : 0);
  }, 0);

  document.getElementById('today-count').textContent = `${completed} / ${topics.length}`;
  document.getElementById('progress-val').textContent = `${overall}%`;
  document.getElementById('progress-bar').style.width = `${overall}%`;
  document.getElementById('velocity-val').textContent = `${hours} hrs`;
}

function renderDay() {
  const date = dateInput.value;
  if (!date) return;
  const slots = slotsForDate(date);
  const topics = selectedDateTopics();
  const isHoliday = state.holidays.includes(date);
  const isSunday = dateFromString(date).getDay() === 0;

  document.getElementById('day-heading').textContent = formatDate(date);
  document.getElementById('day-note').textContent = isHoliday
    ? 'Holiday plan: use the extra buffer slots to catch up or take a proper break.'
    : isSunday
      ? 'Sunday buffer day: use the extra slots for catch-up, revision, or rest.'
      : 'Check off completed topics, or move them to a different study slot.';
  document.getElementById('holiday-toggle').textContent = isHoliday ? 'Remove holiday' : 'Mark as holiday';

  const destinations = slotDestinationOptions();
  slotList.innerHTML = slots.map((slot) => {
    const slotTopics = topics.filter((topic) => topic.slot === slot.id);
    const isBuffer = slot.id.startsWith('buffer-');
    return `
      <article class="slot-card${isBuffer ? ' buffer-slot' : ''}">
        <div class="slot-time">${slot.time}</div>
        <div class="slot-content">
          <div class="slot-title-row">
            <h3>${escapeHTML(slot.label)}</h3>
            ${isBuffer ? '<span class="buffer-tag">FLEXIBLE</span>' : ''}
          </div>
          ${slotTopics.length ? `<ul class="topic-list">${slotTopics.map((topic) => {
            const detection = StudyAgent.detectTopic(topic, state.exam);
            return `
            <li class="topic-item${topic.completed ? ' completed' : ''}" data-topic-id="${escapeHTML(topic.id)}">
              <label class="topic-check">
                <input type="checkbox" data-action="complete" ${topic.completed ? 'checked' : ''} aria-label="Mark ${escapeHTML(topic.title)} complete">
                <span class="topic-copy">
                  <strong>${escapeHTML(topic.title)}</strong>
                  <small>${escapeHTML(topic.subject)}</small>
                  <span class="exam-match ${detection.matched ? 'is-matched' : 'needs-review'}">${detection.matched ? `✓ ${escapeHTML(state.exam)} · ${escapeHTML(detection.area)}` : `Review for ${escapeHTML(state.exam)}`}</span>
                </span>
              </label>
              <div class="topic-actions">
                <label class="importance-label">Priority
                  <select data-action="importance" aria-label="Set importance for ${escapeHTML(topic.title)}">
                    <option value="normal" ${(topic.importance || 'normal') === 'normal' ? 'selected' : ''}>Normal</option>
                    <option value="high" ${topic.importance === 'high' ? 'selected' : ''}>High</option>
                    <option value="revision" ${topic.importance === 'revision' ? 'selected' : ''}>Revision</option>
                  </select>
                </label>
                <label class="move-label">Move to
                  <select data-action="move" aria-label="Move ${escapeHTML(topic.title)} to another slot">
                    ${destinations.map((destination) => `
                      <option value="${escapeHTML(destination.value)}" ${destination.value === `${topic.date}|${topic.slot}` ? 'selected' : ''}>
                        ${escapeHTML(destination.label)}
                      </option>`).join('')}
                  </select>
                </label>
                <button class="delete-topic" type="button" data-action="delete" aria-label="Delete ${escapeHTML(topic.title)}">×</button>
              </div>
            </li>`;
          }).join('')}</ul>` : '<p class="empty-slot">Nothing planned yet</p>'}
        </div>
      </article>`;
  }).join('');

  const topicSlotSelect = document.getElementById('topic-slot');
  topicSlotSelect.innerHTML = slots.map((slot) => `
    <option value="${escapeHTML(slot.id)}">${escapeHTML(slot.label)} · ${slot.time}</option>
  `).join('');
  updateOverview();
}

function renderReport() {
  const month = document.getElementById('report-month').value;
  const examTopics = selectedExamTopics();
  const planned = examTopics.filter((topic) => topic.date.startsWith(month));
  const completed = examTopics.filter((topic) => topic.completedAt && topic.completedAt.startsWith(month));
  const activeDays = new Set(completed.map((topic) => topic.completedAt)).size;
  const rate = planned.length ? Math.round((completed.length / planned.length) * 100) : 0;

  document.getElementById('monthly-completed').textContent = completed.length;
  document.getElementById('monthly-planned').textContent = planned.length;
  document.getElementById('monthly-rate').textContent = `${rate}%`;
  document.getElementById('monthly-days').textContent = activeDays;

  const dailyCompletions = new Map();
  for (const topic of completed) {
    const dayTopics = dailyCompletions.get(topic.completedAt) || [];
    dayTopics.push(topic);
    dailyCompletions.set(topic.completedAt, dayTopics);
  }
  const reportLog = document.getElementById('report-log');
  if (!dailyCompletions.size) {
    reportLog.innerHTML = '<p class="empty-report">Finished topics will appear here as you complete them.</p>';
    return;
  }
  reportLog.innerHTML = [...dailyCompletions.entries()]
    .sort(([first], [second]) => second.localeCompare(first))
    .map(([date, dayTopics]) => `
      <div class="report-day">
        <div class="report-day-heading">
          <strong>${escapeHTML(formatDate(date, { weekday: 'short', month: 'short', day: 'numeric' }))}</strong>
          <span>${dayTopics.length} ${dayTopics.length === 1 ? 'topic' : 'topics'} completed</span>
        </div>
        <ul>${dayTopics.map((topic) => `<li>${escapeHTML(topic.subject)} — ${escapeHTML(topic.title)}</li>`).join('')}</ul>
      </div>
    `).join('');
}

function render() {
  renderDay();
  renderReport();
  renderExamTopics();
  saveState();
}

document.getElementById('previous-day').addEventListener('click', () => {
  const date = dateFromString(dateInput.value);
  date.setDate(date.getDate() - 1);
  dateInput.value = localDateString(date);
  renderDay();
});

document.getElementById('next-day').addEventListener('click', () => {
  const date = dateFromString(dateInput.value);
  date.setDate(date.getDate() + 1);
  dateInput.value = localDateString(date);
  renderDay();
});

dateInput.addEventListener('change', renderDay);
document.getElementById('report-month').addEventListener('change', renderReport);
document.getElementById('topic-title').addEventListener('input', renderTopicDetectionPreview);
document.getElementById('topic-subject').addEventListener('input', renderTopicDetectionPreview);

document.getElementById('holiday-toggle').addEventListener('click', () => {
  const date = dateInput.value;
  if (state.holidays.includes(date)) {
    state.holidays = state.holidays.filter((holiday) => holiday !== date);
  } else {
    state.holidays.push(date);
  }
  render();
});

document.getElementById('topic-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const title = String(formData.get('title')).trim();
  const subject = String(formData.get('subject')).trim();
  if (!title || !subject) return;

  state.topics.push({
    id: createId(),
    exam: state.exam,
    title,
    subject,
    date: dateInput.value,
    slot: String(formData.get('slot')),
    importance: String(formData.get('importance')),
    completed: false,
    completedAt: null
  });
  form.reset();
  render();
  renderTopicDetectionPreview();
  renderExamTopics();
});

slotList.addEventListener('change', (event) => {
  const target = event.target;
  const item = target.closest('[data-topic-id]');
  if (!item) return;
  const topic = state.topics.find((entry) => entry.id === item.dataset.topicId);
  if (!topic) return;

  if (target.dataset.action === 'complete') {
    topic.completed = target.checked;
    topic.completedAt = target.checked ? topic.date : null;
    render();
  } else if (target.dataset.action === 'move') {
    const [date, slot] = target.value.split('|');
    topic.date = date;
    topic.slot = slot;
    render();
  } else if (target.dataset.action === 'importance') {
    topic.importance = target.value;
    saveState();
  }
});

slotList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action="delete"]');
  if (!button) return;
  const item = button.closest('[data-topic-id]');
  state.topics = state.topics.filter((topic) => topic.id !== item.dataset.topicId);
  render();
});

document.getElementById('exam-topic-list').addEventListener('click', (event) => {
  const button = event.target.closest('[data-action="add-recommendation"]');
  if (!button) return;
  const recommendation = StudyAgent.getRecommendedTopics(state.exam)[Number(button.dataset.topicIndex)];
  if (!recommendation) return;
  const exists = selectedExamTopics().some((topic) =>
    topic.title.toLowerCase() === recommendation.title.toLowerCase()
    && topic.subject.toLowerCase() === recommendation.subject.toLowerCase()
  );
  if (exists) {
    renderExamTopics();
    return;
  }
  state.topics.push({
    id: createId(),
    exam: state.exam,
    title: recommendation.title,
    subject: recommendation.subject,
    date: dateInput.value,
    slot: document.getElementById('topic-slot').value || DAILY_SLOTS[0].id,
    importance: recommendation.importance,
    completed: false,
    completedAt: null
  });
  render();
  renderExamTopics();
});

dateInput.value = localDateString();
const examSelect = document.getElementById('exam-select');
examSelect.value = state.exam;
examSelect.addEventListener('change', () => {
  state.exam = examSelect.value;
  saveState();
  renderDay();
  renderReport();
  renderTopicDetectionPreview();
  renderExamTopics();
  renderAssistantResult();
});
document.getElementById('prioritize-button').addEventListener('click', prioritizeAndReschedule);
renderExamTopics();
renderTopicDetectionPreview();
const now = new Date();
document.getElementById('report-month').value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
render();
