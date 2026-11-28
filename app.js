import { EMOTIONS, SOURCES, WORKSHEETS } from "./data.js";
import { CORE_TECHNIQUES } from "./technique-library.js";
import { FORMULATION_SECTIONS, FORMULATION_TOOLS, FORMULATION_BOOKS } from "./formulation.js";

const KEY = "cbt-workspace-v1";
const defaults = { active: "anger", tab: "home", entries: [], checkins: [], completed: {}, libraryCategory: "All" };
let state = readState();
let toastTimer;
const $ = (s, root = document) => root.querySelector(s);
const page = $("#page-content");
const nav = $("#emotion-nav");
const dialog = $("#tool-dialog");
const dialogContent = $("#dialog-content");

function readState() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || "null");
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) return structuredClone(defaults);
    const validTabs = new Set(["home", "journal", "library", "formulation", "overview", "techniques", "plan"]);
    const entries = Array.isArray(saved.entries)
      ? saved.entries.filter(item => item && typeof item === "object" && typeof item.createdAt === "string" && typeof item.toolTitle === "string" && item.values && typeof item.values === "object")
      : [];
    const checkins = Array.isArray(saved.checkins)
      ? saved.checkins.filter(item => item && typeof item === "object" && typeof item.createdAt === "string" && Number.isFinite(Number(item.level)))
      : [];
    return {
      ...defaults,
      ...saved,
      active: EMOTIONS.some(item => item.id === saved.active) ? saved.active : defaults.active,
      tab: validTabs.has(saved.tab) ? saved.tab : defaults.tab,
      entries,
      checkins,
      completed: saved.completed && typeof saved.completed === "object" && !Array.isArray(saved.completed) ? saved.completed : {},
      libraryCategory: typeof saved.libraryCategory === "string" ? saved.libraryCategory : defaults.libraryCategory
    };
  } catch { return structuredClone(defaults); }
}
function saveState() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); return true; }
  catch { toast("Storage is unavailable or full. Export your notes."); return false; }
}
function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
}
function activeEmotion() { return EMOTIONS.find(e => e.id === state.active) || EMOTIONS[0]; }
function toast(message) {
  const node = $("#toast");
  node.textContent = message;
  node.classList.add("visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => node.classList.remove("visible"), 3000);
}
function formatDate(date) {
  try { return new Intl.DateTimeFormat("en", { month:"short", day:"numeric", year:"numeric" }).format(new Date(date)); }
  catch { return "Saved note"; }
}
function links(ids) {
  return [...new Set(ids || [])].map(id => {
    const s = SOURCES[id];
    return s ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} <span>↗</span></a>` : "";
  }).join("");
}


const EXERCISE_FAMILY_ORDER = ["Assessment & formulation","Cognitive methods","Behavioural methods","Attention & metacognitive methods","Emotion regulation & distress tolerance","Acceptance & values","Interpersonal & communication"];
const EXERCISE_FAMILY_NOTES = {
  "Assessment & formulation":"Map triggers, patterns, maintaining loops, and context before choosing an intervention.",
  "Cognitive methods":"Work with automatic thoughts, appraisals, assumptions, rules, and beliefs.",
  "Behavioural methods":"Change action patterns through practice, activity, approach, experiments, and skills rehearsal.",
  "Attention & metacognitive methods":"Notice where attention goes and change unhelpful worry, rumination, checking, or replay loops.",
  "Emotion regulation & distress tolerance":"Manage arousal, urges, and intense emotion so an effective response becomes possible.",
  "Acceptance & values":"Make room for difficult internal experiences and choose safe actions linked to personal values.",
  "Interpersonal & communication":"Practise requests, boundaries, repair, and respectful communication."
};
function exerciseFamily(tool) {
  if (tool.family && EXERCISE_FAMILY_ORDER.includes(tool.family)) return tool.family;
  const t=(tool.id+" "+tool.title+" "+tool.description).toLowerCase();
  if (/(boundary|request|relationship|conversation|refusal|assertive|communication|repair|interpersonal|accommodation|apology)/.test(t)) return "Interpersonal & communication";
  if (/(values?|valued|acceptance|willingness|defusion|unhook|committed.action|toward.move)/.test(t)) return "Acceptance & values";
  if (/(worry|ruminat|replay|attention|mindful|checking|reassurance|post.event|mode.shift|thought.loop|mental.ritual)/.test(t)) return "Attention & metacognitive methods";
  if (/(arousal|pause|urge|coping|recovery|regulation|distress|reset|calm|vulnerability|emotion|sleep|tolerance)/.test(t)) return "Emotion regulation & distress tolerance";
  if (/(experiment|exposure|avoidance|activity|graded.task|approach|practice|habit|schedule|activation|stimulus|pacing|rehears|task.start|pattern.break|learning.review)/.test(t)) return "Behavioural methods";
  if (/(thought|belief|prediction|reappraisal|interpret|rule|standard|responsibility|evidence|story|label|facts|continuum|meaning|self-esteem|catastroph|attribution|assumption)/.test(t)) return "Cognitive methods";
  if (/(map|cycle|chain|audit|diary|monitor|track|trigger|warning|inventory|functional.analysis|record)/.test(t)) return "Assessment & formulation";
  return "Assessment & formulation";
}
function groupExercises(tools) {
  const groups=new Map();
  for (const tool of tools) {
    const family=exerciseFamily(tool);
    if(!groups.has(family)) groups.set(family,[]);
    groups.get(family).push(tool);
  }
  return EXERCISE_FAMILY_ORDER.filter(f=>groups.has(f)).map(f=>[f,groups.get(f)]);
}

function renderSidebar() {
  const q = state.tab === "library" ? "" : ($("#global-search").value || "").trim().toLowerCase();
  nav.innerHTML = ["Emotions", "Patterns", "Focused care"].map(group => {
    const items = EMOTIONS.filter(e => e.group === group).filter(e => !q || [e.name, e.subtitle, e.description, ...e.tools.map(t => t.title + " " + t.description)].join(" ").toLowerCase().includes(q));
    if (!items.length) return "";
    return `<div class="nav-group"><div class="nav-group-title">${group === "Focused care" ? "FOCUSED CARE" : group.toUpperCase()}</div>${items.map(e => `<button class="emotion-link ${state.active === e.id && !["home","journal","library","formulation"].includes(state.tab) ? "active" : ""}" type="button" data-emotion="${e.id}" ${state.active === e.id && !["home","journal","library"].includes(state.tab) ? 'aria-current="page"' : ""}><span class="emotion-initial">${e.initials}</span><span class="emotion-name">${esc(e.name)}</span><span class="nav-arrow">›</span></button>`).join("")}</div>`;
  }).join("") || '<div class="nav-empty">No matching emotions or tools.</div>';
  $("#emotion-count").textContent = EMOTIONS.length;
}
function renderSearchResults() {
  const input = $("#global-search"), results = $("#search-results");
  if (!input || !results) return;
  const query = input.value.trim().toLowerCase();
  if (!query) { results.hidden = true; results.innerHTML = ""; input.setAttribute("aria-expanded", "false"); return; }
  const hits = [];
  for (const emotion of EMOTIONS) {
    const workspaceText = [emotion.name, emotion.subtitle, emotion.description].join(" ").toLowerCase();
    if (workspaceText.includes(query)) hits.push({ emotion, tool: null });
    for (const tool of emotion.tools) {
      const toolText = [tool.title, tool.description, tool.when].join(" ").toLowerCase();
      if (toolText.includes(query)) hits.push({ emotion, tool });
    }
  }
  const ordered = [...hits.filter(hit => hit.tool), ...hits.filter(hit => !hit.tool)].slice(0, 9);
  results.innerHTML = ordered.length
    ? ordered.map(({ emotion, tool }) => `<button type="button" class="search-result" role="option" aria-selected="false" data-search-emotion="${esc(emotion.id)}" data-search-tool="${esc(tool?.id || "")}"><span class="search-result-main">${esc(tool?.title || emotion.name)}</span><small>${esc(emotion.name)} · ${tool ? "Interactive exercise" : "Workspace"}</small></button>`).join("")
    : '<div class="search-no-results">No matching tools or workspaces.</div>';
  results.hidden = false;
  input.setAttribute("aria-expanded", "true");
}
function renderHeader() {
  $("#breadcrumb-current").textContent = state.tab === "journal" ? "MY JOURNAL" : state.tab === "home" ? "OVERVIEW" : state.tab === "library" ? "TECHNIQUE LIBRARY" : state.tab === "formulation" ? "THOUGHTS, BELIEFS & SCHEMAS" : activeEmotion().name.toUpperCase();
}
function tabs() {
  return `<nav class="section-tabs" aria-label="Workspace sections">${[["overview","Overview"],["techniques","Techniques"],["plan","My plan"],["journal","My notes"]].map(([id,label]) => `<button type="button" aria-pressed="${state.tab === id}" class="section-tab ${state.tab === id ? "selected" : ""}" data-tab="${id}">${label}</button>`).join("")}</nav>`;
}
function toolCard(tool, index, family = exerciseFamily(tool)) {
  return `<article class="tool-card">
    <div class="tool-card-top"><span class="tool-number">${String(index+1).padStart(2,"0")}</span><span class="tool-type">${esc(family)}</span></div>
    <h3>${esc(tool.title)}</h3>
    <p>${esc(tool.description)}</p>
    <div class="tool-when"><span>USE THIS WHEN</span><div>${esc(tool.when)}</div></div>
    <button type="button" class="text-action" data-tool="${esc(tool.id)}"><span>Open exercise</span><span aria-hidden="true">↗</span></button>
  </article>`;
}
function hero(e) {
  return `<section class="emotion-hero"><div class="hero-content"><div class="eyebrow"><span class="eyebrow-dot"></span>${esc(e.group)} <span class="eyebrow-slash">/</span> PERSONAL WORKSPACE</div><h1>${esc(e.name)}<span class="title-period">.</span></h1><p class="hero-subtitle">${esc(e.subtitle)}</p><div class="hero-status-row"><span class="evidence-pill evidence-${e.evidence.level}"><span></span>${esc(e.evidence.label)}</span><span class="hero-meta">${e.tools.length} practical tools <i>·</i> 4-step practice plan</span></div></div><div class="hero-mark" aria-hidden="true"><div class="hero-orbit orbit-one"></div><div class="hero-orbit orbit-two"></div><div class="hero-monogram">${e.initials}</div><div class="hero-caption">NOTICE <span>·</span> UNDERSTAND <span>·</span> RESPOND</div></div></section>`;
}
function overview(e) {
  const done = e.plan.filter((_,i) => state.completed[`${e.id}:${i}`]).length;
  return `<div class="workspace-layout"><div class="workspace-primary">
    <section class="section-heading"><div><div class="eyebrow muted">START WITH UNDERSTANDING</div><h2>What is happening?</h2></div><span class="section-index">01 / THE MODEL</span></section>
    <article class="model-card"><p class="model-copy">${esc(e.description)}</p><div class="model-flow">${e.model.split(" → ").map((p,i) => `<span class="model-step"><b>${String(i+1).padStart(2,"0")}</b>${esc(p)}</span>`).join('<span class="flow-arrow">→</span>')}</div><div class="model-insight"><span class="insight-mark">i</span><p>${esc(e.why)}</p></div></article>
    <section class="section-heading tool-heading"><div><div class="eyebrow muted">PRACTICAL METHODS</div><h2>Tools to work with</h2></div><button class="subtle-action" type="button" data-tab="techniques">View all techniques →</button></section>
    <div class="exercise-family-list">${groupExercises(e.tools).map(([family,tools]) => `<section class="exercise-family"><header class="exercise-family-heading"><div><span class="eyebrow muted">EXERCISE TYPE</span><h3>${esc(family)}</h3><p>${esc(EXERCISE_FAMILY_NOTES[family])}</p></div><span class="family-count">${tools.length} ${tools.length === 1 ? "TOOL" : "TOOLS"}</span></header><div class="tool-grid">${tools.map((tool,index) => toolCard(tool,index,family)).join("")}</div></section>`).join("")}</div>
    <section class="section-heading plan-heading"><div><div class="eyebrow muted">A SMALL, STRUCTURED START</div><h2>Your practice plan</h2></div><span class="progress-label">${done} of 4 completed</span></section>
    <div class="plan-preview"><div class="progress-track"><span style="width:${done*25}%"></span></div>${e.plan.slice(0,2).map((p,i) => `<div class="plan-preview-item"><span class="plan-step-number">0${i+1}</span><div><strong>${esc(p.title)}</strong><p>${esc(p.detail)}</p></div></div>`).join("")}<button class="plan-link" type="button" data-tab="plan">Open the full plan →</button></div>
  </div><aside class="workspace-aside">
    <article class="side-panel focus-panel"><div class="panel-kicker">YOUR FOCUS</div><h3>What to practise</h3><ul class="focus-list">${e.focus.map(x => `<li><span class="focus-check">✓</span>${esc(x)}</li>`).join("")}</ul><div class="panel-divider"></div><p class="small-note">Choose one skill at a time. Repetition and reflection are more useful than doing everything at once.</p></article>
    <article class="side-panel evidence-panel"><div class="panel-kicker">EVIDENCE SNAPSHOT</div><div class="evidence-score evidence-word">${esc(e.evidence.level.toUpperCase())}<span>/ EVIDENCE</span></div><p>${esc(e.evidence.note)}</p><div class="evidence-links">${links(e.tools.flatMap(t => t.sources))}</div><a class="review-link" href="./docs/SCIENTIFIC_REVIEW.md" target="_blank" rel="noopener">How evidence is rated ↗</a></article>
    <article class="caution-panel"><span class="caution-icon">!</span><div><strong>Important boundaries</strong><p>${esc(e.caution)}</p></div></article>
  </aside></div>`;
}
function techniques(e) {
  const groups = groupExercises(e.tools);
  return '<section class="tab-intro"><div><div class="eyebrow muted">METHOD LIBRARY</div><h2>Techniques for ' + esc(e.name.toLowerCase()) + '</h2><p>Browse exercises grouped by their primary intervention type. Open the steps or launch a structured worksheet when ready.</p></div><span class="tab-count">' + String(e.tools.length).padStart(2,"0") + ' METHODS</span></section>' +
    '<div class="exercise-family-list">' + groups.map(([family,tools]) => '<section class="exercise-family"><header class="exercise-family-heading"><div><span class="eyebrow muted">EXERCISE TYPE</span><h3>' + esc(family) + '</h3><p>' + esc(EXERCISE_FAMILY_NOTES[family]) + '</p></div><span class="family-count">' + tools.length + ' METHODS</span></header><div class="technique-list">' +
    tools.map((t,i) => '<article class="technique-row"><div class="technique-index">' + String(i+1).padStart(2,"0") + '</div><div class="technique-main"><div class="technique-overline">' + esc(family) + '</div><h3>' + esc(t.title) + '</h3><p>' + esc(t.description) + '</p><div class="technique-when"><strong>When it may help</strong><span>' + esc(t.when) + '</span></div><details class="technique-expand"><summary>View suggested steps <span>' + t.steps.length + ' steps</span></summary><ol class="technique-step-list">' + t.steps.map(x=>'<li>'+esc(x)+'</li>').join("") + '</ol></details><details class="technique-evidence"><summary>Evidence context and sources</summary><p>' + esc(t.evidence) + '</p><div class="technique-sources">' + links(t.sources) + '</div></details></div><div class="technique-side"><span class="worksheet-tag">PRACTICE TOOL</span><button class="primary-button compact" type="button" data-tool="' + esc(t.id) + '">Open exercise <span aria-hidden="true">↗</span></button></div></article>').join("") + '</div></section>').join("") + '</div>';
}

function renderTechniqueLibrary() {
  const query = ($("#global-search")?.value || "").trim().toLowerCase();
  const categories = ["All", ...new Set(CORE_TECHNIQUES.map(item => item.category))];
  const visible = CORE_TECHNIQUES.filter(item => {
    const categoryMatch = state.libraryCategory === "All" || item.category === state.libraryCategory;
    const searchText = [item.title,item.classification,item.category,item.description,item.when,item.caution].join(" ").toLowerCase();
    return categoryMatch && (!query || searchText.includes(query));
  });
  return `<section class="library-hero">
    <div class="eyebrow"><span class="eyebrow-dot"></span>REFERENCE DIRECTORY / CBT METHODS</div>
    <h1>CBT technique library<span class="title-period">.</span></h1>
    <p>A structured map of common CBT procedures, specialist treatment components, and related third-wave approaches. Each entry identifies the kind of method and its boundaries.</p>
    <div class="library-metrics"><span><strong>${CORE_TECHNIQUES.length}</strong> indexed methods</span><span><strong>${new Set(CORE_TECHNIQUES.map(x=>x.category)).size}</strong> method families</span><span><strong>${CORE_TECHNIQUES.filter(x=>x.classification === "Specialist protocol").length}</strong> specialist components</span></div>
  </section>
  <div class="library-notice"><strong>How to use this directory</strong><p>There is no single finite list of every CBT technique: manuals and diagnosis-specific protocols contain overlapping procedures and variations. This directory maps the principal methods identified in the scientific audit. Some techniques require a trained clinician. Related approaches are labelled separately rather than misrepresented as classical CBT.</p></div>
  <div class="library-toolbar"><div class="library-filters" role="group" aria-label="Filter techniques by family">${categories.map(category=>`<button type="button" class="library-filter ${state.libraryCategory===category?"active":""}" data-library-category="${esc(category)}">${esc(category)}</button>`).join("")}</div><span class="library-result-count">${visible.length} OF ${CORE_TECHNIQUES.length} METHODS</span></div>
  ${visible.length ? `<div class="library-grid">${visible.map(item=>`<article class="library-card">
    <div class="library-card-meta"><span class="library-category">${esc(item.category)}</span><span class="library-class ${item.classification === "Specialist protocol" ? "specialist" : item.classification === "Core CBT" ? "core" : "related"}">${esc(item.classification)}</span></div>
    <h3>${esc(item.title)}</h3>
    <p>${esc(item.description)}</p>
    <div class="library-use"><strong>Typical use</strong><span>${esc(item.when)}</span></div>
    <div class="library-boundary"><strong>Boundary</strong><span>${esc(item.caution)}</span></div>
    <div class="library-sources">${links(item.sources)}</div>
  </article>`).join("")}</div>` : `<div class="empty-state"><div class="empty-mark">00</div><h3>No matching methods</h3><p>Try another search term or select a different method family.</p></div>`}
  <div class="library-note"><strong>Clinical scope</strong><p>A technique is not a treatment by itself. Whether it is appropriate depends on formulation, diagnosis where relevant, risk, medical context, and practitioner competence. Read the evidence review before treating any item as a programme.</p><a href="./docs/SCIENTIFIC_REVIEW.md" target="_blank" rel="noopener">Read the full scientific audit ↗</a></div>`;
}

function planPage(e) {
  const done = e.plan.filter((_,i) => state.completed[`${e.id}:${i}`]).length;
  return `<section class="plan-page"><div class="tab-intro"><div><div class="eyebrow muted">PROGRESSIVE PRACTICE</div><h2>A plan you can work through</h2><p>This is a flexible skills-practice sequence, not a fixed clinical treatment protocol. Repeat or adapt each step.</p></div><div class="plan-progress"><strong>${done}/4</strong><span>steps complete</span></div></div><div class="large-progress-track"><span style="width:${done*25}%"></span></div><div class="plan-steps">${e.plan.map((p,i) => { const checked = !!state.completed[`${e.id}:${i}`]; return `<article class="plan-step ${checked ? "completed" : ""}"><button type="button" class="step-check ${checked ? "checked" : ""}" data-plan="${i}" aria-label="${checked ? "Mark as not complete" : "Mark as complete"}">${checked ? "✓" : ""}</button><div class="step-content"><div class="step-meta">STEP 0${i+1}</div><h3>${esc(p.title)}</h3><p>${esc(p.detail)}</p></div><span class="step-state">${checked ? "COMPLETED" : "UP NEXT"}</span></article>`; }).join("")}</div><div class="plan-note"><span>↗</span><p>Progress is saved only in this browser. Completion is a personal reminder, not a clinical measure of recovery.</p></div></section>`;
}
function journalPage() {
  const entries = [...state.entries].sort((a,b) => b.createdAt.localeCompare(a.createdAt));
  const checkins = [...state.checkins].sort((a,b) => b.createdAt.localeCompare(a.createdAt));
  return `<section class="journal-page"><div class="tab-intro"><div><div class="eyebrow muted">PRIVATE PRACTICE SPACE</div><h2>Your notes & check-ins</h2><p>Entries are stored on this device in this browser. They are not sent to a server.</p></div><button class="outline-button" type="button" data-action="export">Export my data ↓</button></div>
  <div class="journal-summary"><div><strong>${entries.length}</strong><span>Saved exercises</span></div><div><strong>${checkins.length}</strong><span>Daily check-ins</span></div><div><strong>${Object.values(state.completed).filter(Boolean).length}</strong><span>Plan steps checked</span></div></div>
  <div class="journal-columns"><div><div class="journal-section-title"><h3>Exercise notes</h3><span>${entries.length} SAVED</span></div>${entries.length ? entries.map(entry => { const e = EMOTIONS.find(x => x.id === entry.emotionId); return `<article class="journal-entry"><div class="entry-head"><span class="entry-category">${esc(e?.name || "Workspace")}</span><time>${formatDate(entry.createdAt)}</time></div><h4>${esc(entry.toolTitle)}</h4><div class="entry-preview">${Object.entries(entry.values || {}).filter(([,v]) => String(v).trim()).slice(0,2).map(([k,v]) => `<p><b>${esc(k.replace(/([A-Z])/g," $1"))}</b> · ${esc(v)}</p>`).join("")}</div><button type="button" class="delete-entry" data-entry-delete="${entry.id}">Delete note</button></article>`; }).join("") : '<div class="empty-state"><div class="empty-mark">01</div><h3>No exercise notes yet</h3><p>Open a technique and save a reflection. Your notes will appear here.</p></div>'}</div>
  <div><div class="journal-section-title"><h3>Daily check-ins</h3><span>${checkins.length} SAVED</span></div>${checkins.length ? checkins.map(c => `<article class="checkin-entry"><div class="entry-head"><span class="entry-category">DAILY CHECK-IN</span><time>${formatDate(c.createdAt)}</time></div><div class="checkin-score">${c.level}<small>/ 10</small></div>${c.note ? `<p>${esc(c.note)}</p>` : ""}</article>`).join("") : '<div class="empty-state compact-empty"><div class="empty-mark">02</div><h3>No check-ins yet</h3><p>Use the daily check-in to notice how you are doing over time.</p></div>'}</div></div>
  <div class="data-controls"><div><strong>Your data, your choice</strong><p>Export a copy before clearing this browser's saved entries.</p></div><button type="button" class="danger-text-button" data-action="clear-data">Clear all local data</button></div></section>`;
}
function homePage() {
  const notes = state.entries.length;
  const done = Object.values(state.completed).filter(Boolean).length;
  const groups = [["Emotions", EMOTIONS.filter(e => e.group === "Emotions")], ["Patterns", EMOTIONS.filter(e => e.group === "Patterns")], ["Focused care", EMOTIONS.filter(e => e.group === "Focused care")]];
  return `<section class="home-hero"><div class="eyebrow"><span class="eyebrow-dot"></span>YOUR PERSONAL SKILLS SPACE</div><h1>Make room for a<br><span>different response.</span></h1><p>Understand what you feel. Explore the patterns around it. Practise a more deliberate way forward.</p><div class="home-hero-actions"><button class="primary-button" type="button" data-emotion="anger">Explore an emotion →</button><button class="home-text-button" type="button" data-action="checkin">Start a daily check-in</button></div><div class="home-hero-art" aria-hidden="true"><div class="art-ring ring-a"></div><div class="art-ring ring-b"></div><div class="art-core">CBT<span>.</span></div></div></section>
  <section class="home-stats"><div><span>YOUR PRACTICE</span><strong>${done}</strong><small>Plan steps checked</small></div><div><span>REFLECTIONS</span><strong>${notes}</strong><small>Exercises saved</small></div><div><span>EMOTION SPACES</span><strong>${EMOTIONS.length}</strong><small>Structured workspaces</small></div></section>
  ${groups.map(([group,items], index) => `<section class="home-section ${group === "Focused care" ? "focus-section" : ""}"><div class="home-section-heading"><div><div class="eyebrow muted">${index === 0 ? "START WITH WHAT YOU FEEL" : index === 1 ? "RECURRING THINKING PATTERNS" : "SPECIALISED PATTERNS"}</div><h2>${group === "Emotions" ? "Choose an emotion" : group === "Patterns" ? "Work with a pattern" : "Condition-focused spaces"}</h2><p>${group === "Focused care" ? "Disorder-specific methods with stronger clinical boundaries." : "Explore explanations, practical tools, and a structured plan."}</p></div><span>0${index+1} / ${group.toUpperCase()}</span></div><div class="${group === "Focused care" ? "focus-card-grid" : "emotion-card-grid"}">${items.map(e => group === "Focused care" ? `<button type="button" class="focus-card" data-emotion="${e.id}"><span class="focus-card-code">${e.initials}</span><strong>${esc(e.name)}</strong><small>${esc(e.evidence.label)}</small><span class="card-arrow">↗</span></button>` : `<button type="button" class="emotion-card" data-emotion="${e.id}"><span class="emotion-card-initial">${e.initials}</span><span class="emotion-card-copy"><strong>${esc(e.name)}</strong><small>${esc(e.subtitle)}</small></span><span class="emotion-card-arrow">↗</span></button>`).join("")}</div></section>`).join("")}
  <section class="home-disclaimer"><span class="disclaimer-mark">i</span><div><strong>Use this as a skills workspace, not a diagnosis.</strong><p>Self-guided exercises can support reflection and practice, but cannot assess risk, diagnose a condition, or replace personalised care. Some methods on this site are intended to be used with a trained practitioner.</p><a href="./docs/SCIENTIFIC_REVIEW.md" target="_blank" rel="noopener">Read the scientific and safety review ↗</a></div></section>`;
}
function renderFormulationHub() {
  const levels = FORMULATION_SECTIONS.find(x => x.id === "levels");
  const families = groupExercises(FORMULATION_TOOLS);
  return '<section class="formulation-hero"><div class="eyebrow"><span class="eyebrow-dot"></span>COGNITIVE CONCEPTUALIZATION / SKILL HUB</div><h1>Thoughts, beliefs & schemas<span class="title-period">.</span></h1><p>Learn to spot automatic thoughts, identify intermediate rules, map core beliefs and schemas, and choose a method that fits the pattern you are trying to understand.</p><div class="formulation-hero-metrics"><span><strong>3</strong> cognitive levels</span><span><strong>' + FORMULATION_TOOLS.length + '</strong> guided tools</span><span><strong>7</strong> therapeutic models covered</span></div></section>' +
  '<div class="formulation-notice"><strong>Start with a specific situation, not a label.</strong><p>A formulation is a revisable explanation of how context, learning history, thoughts, emotions, body responses, behaviours, and coping interact. It is not a diagnosis, personality test, or proof that all distress comes from thinking.</p></div>' +
  '<section class="formulation-levels"><div class="section-heading"><div><div class="eyebrow muted">THE COGNITIVE MAP</div><h2>From an event to a recurring belief</h2></div><span class="section-index">01 / CONCEPTUALIZE</span></div><div class="belief-level-grid">' +
  levels.points.map(([name,desc],i) => '<article class="belief-level-card"><span>' + String(i+1).padStart(2,"0") + '</span><h3>' + esc(name) + '</h3><p>' + esc(desc) + '</p></article>').join("") +
  '</div><p class="formulation-section-note">' + esc(levels.body) + '</p><div class="formulation-citations">' + links(levels.sources) + '</div></section>' +
  '<section class="formulation-knowledge"><div class="section-heading"><div><div class="eyebrow muted">KNOWLEDGE BASE</div><h2>How to identify and understand patterns</h2></div><span class="section-index">02 / LEARN</span></div>' +
  FORMULATION_SECTIONS.filter(x=>x.id!=="levels").map((section,i) => '<details class="formulation-knowledge-card" ' + (i===0?'open':'') + '><summary><span><small>' + esc(section.kicker) + '</small><b>' + esc(section.title) + '</b></span><span class="evidence-toggle" aria-hidden="true">+</span></summary><div class="formulation-knowledge-body"><p>' + esc(section.body) + '</p><ul>' +
  section.points.map(([name,desc]) => '<li><strong>' + esc(name) + '</strong><span>' + esc(desc) + '</span></li>').join("") +
  '</ul><div class="technique-sources">' + links(section.sources) + '</div></div></details>').join("") + '</section>' +
  '<section class="formulation-tools"><div class="section-heading"><div><div class="eyebrow muted">INTERACTIVE PRACTICE</div><h2>Tools for each level</h2><p>Choose one method that matches the question you are trying to answer. You do not need to complete them all.</p></div><span class="family-count">' + FORMULATION_TOOLS.length + ' TOOLS</span></div>' +
  families.map(([family,tools]) => '<section class="exercise-family"><header class="exercise-family-heading"><div><span class="eyebrow muted">METHOD FAMILY</span><h3>' + esc(family) + '</h3><p>' + esc(EXERCISE_FAMILY_NOTES[family]) + '</p></div><span class="family-count">' + tools.length + ' TOOLS</span></header><div class="tool-grid">' +
  tools.map((tool,index) => toolCard(tool,index,family)).join("") + '</div></section>').join("") + '</section>' +
  '<section class="formulation-reading"><div class="section-heading"><div><div class="eyebrow muted">FOUNDATIONAL READING</div><h2>Core books and clinical references</h2><p>Books are model references; they do not replace independent research and guideline review.</p></div><span class="section-index">03 / READ</span></div><div class="formulation-book-grid">' +
  FORMULATION_BOOKS.map(book => '<article class="formulation-book-card"><span class="book-author">' + esc(book.author) + '</span><h3>' + esc(book.title) + '</h3><p>' + esc(book.note) + '</p><div class="technique-sources">' + links([book.source]) + '</div></article>').join("") + '</div></section>' +
  '<section class="formulation-boundary"><strong>Clinical boundaries</strong><p>Do not use this hub to self-diagnose a schema, infer abuse or childhood causes, or deliberately intensify distress. Imagery rescripting, chair work, trauma processing, and complex mode work require appropriate clinical assessment and practitioner competence. Keep real-world safety, discrimination, illness, and material conditions in the formulation.</p><a href="./docs/SCIENTIFIC_REVIEW.md" target="_blank" rel="noopener">Read the scientific and clinical review ↗</a></section>';
}

function render() {
  renderSidebar(); renderHeader(); renderSearchResults();
  if (state.tab === "home") page.innerHTML = homePage();
  else if (state.tab === "journal") page.innerHTML = journalPage();
  else if (state.tab === "library") page.innerHTML = renderTechniqueLibrary();
  else if (state.tab === "formulation") page.innerHTML = renderFormulationHub();
  else {
    const e = activeEmotion();
    page.innerHTML = hero(e) + tabs() + (state.tab === "techniques" ? techniques(e) : state.tab === "plan" ? planPage(e) : overview(e));
  }
}
function openTool(id) {
  const isFormulation = state.tab === "formulation";
  const e = isFormulation ? { id:"formulation", name:"Thoughts, beliefs & schemas" } : activeEmotion();
  const tool = isFormulation ? FORMULATION_TOOLS.find(t=>t.id===id) : e.tools.find(t => t.id === id);
  if (!tool) return;
  const schema = WORKSHEETS[tool.worksheet] || WORKSHEETS.reflection;
  const fields = schema.fields.map(([key,label],i) => `<label class="form-field"><span class="field-caption"><b>${String(i+1).padStart(2,"0")}</b><span>${esc(label)}</span></span><textarea name="${esc(key)}" rows="3" aria-label="${esc(label)}" placeholder="A few words or bullet points are enough..." ${i === 0 ? "autofocus" : ""}></textarea></label>`).join("");
  dialogContent.innerHTML = `<div class="dialog-head practice-dialog-head"><div><div class="eyebrow muted">INTERACTIVE PRACTICE <span class="eyebrow-slash">/</span> ${esc(e.name.toUpperCase())}</div><h2 id="dialog-title">${esc(tool.title)}</h2><p id="dialog-intro">${esc(schema.intro)}</p><div class="practice-meta"><span>${tool.steps.length} guided steps</span><span>${schema.fields.length} reflection prompts</span><span>Private to this browser</span></div></div><button type="button" class="icon-button dialog-close" data-action="close-dialog" aria-label="Close exercise">×</button></div>
  <div class="practice-intro-grid">
    <section class="practice-purpose-card"><span class="practice-kicker">01 <i>/</i> PURPOSE</span><h3>What this exercise is for</h3><p>${esc(tool.description)}</p></section>
    <section class="practice-when-card"><span class="practice-kicker">BEFORE YOU START</span><h3>When to use it</h3><p>${esc(tool.when)}</p></section>
  </div>
  <section class="practice-steps-section" aria-labelledby="practice-steps-title">
    <div class="practice-section-heading"><div><span class="practice-kicker">02 <i>/</i> METHOD</span><h3 id="practice-steps-title">Work through the steps</h3><p>Take them one at a time. You do not need perfect answers.</p></div><span class="practice-step-count">${tool.steps.length} STEPS</span></div>
    <ol class="practice-step-list">${tool.steps.map((step,i) => `<li><span class="practice-step-number">${String(i+1).padStart(2,"0")}</span><p>${esc(step)}</p></li>`).join("")}</ol>
  </section>
  <details class="practice-evidence"><summary><span><b>Evidence context and limitations</b><small>Why this tool is included and what it does not establish</small></span><span class="evidence-toggle" aria-hidden="true">+</span></summary><div class="practice-evidence-content"><p>${esc(tool.evidence)}</p><div class="technique-sources">${links(tool.sources)}</div></div></details>
  <form class="worksheet-form practice-reflection" data-form="worksheet" data-emotion="${e.id}" data-tool="${tool.id}">
    <div class="practice-section-heading reflection-heading"><div><span class="practice-kicker">03 <i>/</i> REFLECTION</span><h3>Make a note of your response</h3><p>Short notes are fine. Leave any prompt blank if it does not fit.</p></div><span class="reflection-local-note">Saved on this device</span></div>
    <div class="reflection-field-grid">${fields}</div>
    <div class="dialog-actions"><button type="button" class="outline-button" data-action="close-dialog">Close</button><button type="submit" class="primary-button">Save reflection <span aria-hidden="true">↗</span></button></div>
  </form>`;
  dialog.showModal();
}
function openCheckin() {
  dialogContent.innerHTML = `<div class="dialog-head"><div><div class="eyebrow muted">A MOMENT TO CHECK IN</div><h2 id="dialog-title">How are you doing today?</h2><p>A quick snapshot, not a diagnostic score. There is no right answer.</p></div><button type="button" class="icon-button dialog-close" data-action="close-dialog" aria-label="Close">×</button></div><form class="worksheet-form checkin-form" data-form="checkin"><label class="form-field"><span>How manageable does today feel right now?</span><div class="range-line"><input type="range" min="0" max="10" value="5" name="level" id="mood-range"><output id="mood-output">5 / 10</output></div><div class="range-ends"><span>Very difficult</span><span>Very manageable</span></div></label><label class="form-field"><span>What is most present for you?</span><textarea name="note" rows="3" placeholder="A feeling, a situation, or something you need..."></textarea></label><div class="dialog-actions"><button type="button" class="outline-button" data-action="close-dialog">Cancel</button><button type="submit" class="primary-button">Save check-in →</button></div></form>`;
  dialog.showModal();
  const range = $("#mood-range", dialog);
  range?.addEventListener("input", () => { $("#mood-output", dialog).textContent = range.value + " / 10"; });
}
function openPrivacy() {
  dialogContent.innerHTML = '<div class="dialog-head"><div><div class="eyebrow muted">DATA & PRIVACY</div><h2 id="dialog-title">Your reflections stay on this device.</h2><p>This application does not create an account or send your notes to a server.</p></div><button type="button" class="icon-button dialog-close" data-action="close-dialog" aria-label="Close">×</button></div><div class="privacy-details"><div><strong>Local browser storage</strong><p>Saved exercises, check-ins, and plan progress are kept in your browser local storage.</p></div><div><strong>What this means</strong><p>Private browsing, clearing site data, or switching devices may remove or hide your notes. Anyone with access to this browser profile may be able to view them.</p></div><div><strong>Your controls</strong><p>Export your data from My notes, or clear it at any time. Avoid saving information that would put you at risk if someone else accessed this device.</p></div></div><div class="dialog-actions"><button type="button" class="primary-button" data-action="close-dialog">Understood</button></div>';
  dialog.showModal();
}
function saveWorksheet(form) {
  const e = EMOTIONS.find(x => x.id === form.dataset.emotion);
  const tool = form.dataset.emotion === "formulation" ? FORMULATION_TOOLS.find(x=>x.id===form.dataset.tool) : e?.tools.find(x => x.id === form.dataset.tool);
  const values = Object.fromEntries(new FormData(form).entries());
  if (!Object.values(values).some(v => String(v).trim())) { toast("Add at least one reflection before saving."); return; }
  const entry = { id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), emotionId: form.dataset.emotion, toolId: form.dataset.tool, toolTitle: tool?.title || "Practice note", createdAt: new Date().toISOString(), values };
  state.entries.unshift(entry);
  if (!saveState()) { state.entries = state.entries.filter(item => item.id !== entry.id); return; }
  dialog.close(); render(); toast("Reflection saved to My notes.");
}
function saveCheckin(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  const checkin = { id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), createdAt: new Date().toISOString(), level: Math.max(0,Math.min(10,Number(data.level)||0)), note: String(data.note||"").trim() };
  state.checkins.unshift(checkin);
  if (!saveState()) { state.checkins = state.checkins.filter(item => item.id !== checkin.id); return; }
  dialog.close(); render(); toast("Daily check-in saved.");
}
function exportData() {
  const blob = new Blob([JSON.stringify({ exportedAt:new Date().toISOString(), description:"CBT workspace export. This file may contain sensitive personal reflections.", entries:state.entries, checkins:state.checkins, completed:state.completed },null,2)], {type:"application/json"});
  const url = URL.createObjectURL(blob), a = document.createElement("a");
  a.href = url; a.download = "cbt-workspace-" + new Date().toISOString().slice(0,10) + ".json";
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  toast("Your data export has been created.");
}
function action(name) {
  if (name === "checkin") openCheckin();
  if (name === "privacy") openPrivacy();
  if (name === "export") exportData();
  if (name === "close-dialog") dialog.close();
  if (name === "clear-data" && confirm("Delete all saved notes, check-ins, and plan progress from this browser? This cannot be undone.")) {
    const previous = state;
    state = { ...defaults, active:previous.active, tab:"journal" };
    if (!saveState()) { state = previous; return; }
    render(); toast("Local workspace data cleared.");
  }
}
document.addEventListener("click", event => {
  const searchResult = event.target.closest("[data-search-emotion]");
  if (searchResult) {
    const searchEmotion = searchResult.dataset.searchEmotion;
    if (searchEmotion === "formulation") state.tab = "formulation";
    else { state.active = searchEmotion; state.tab = "overview"; }
    const toolId = searchResult.dataset.searchTool;
    $("#global-search").value = "";
    saveState(); render();
    if (toolId) openTool(toolId);
    return;
  }
  if (!event.target.closest(".topbar-actions")) $("#search-results").hidden = true;
  const emotion = event.target.closest("[data-emotion]");
  if (emotion) {
    state.active = emotion.dataset.emotion; state.tab = "overview"; saveState(); render();
    $("#sidebar").classList.remove("sidebar-open"); $("#sidebar-scrim").classList.remove("visible"); return;
  }
  const tab = event.target.closest("[data-tab]");
  if (tab) { state.tab = tab.dataset.tab; saveState(); render(); return; }
  const libraryCategory = event.target.closest("[data-library-category]");
  if (libraryCategory) { state.libraryCategory = libraryCategory.dataset.libraryCategory; render(); return; }
  const tool = event.target.closest("[data-tool]");
  if (tool) { openTool(tool.dataset.tool); return; }
  const plan = event.target.closest("[data-plan]");
  if (plan) { const key = activeEmotion().id + ":" + plan.dataset.plan; const previous = !!state.completed[key]; state.completed[key] = !previous; if (!saveState()) { state.completed[key] = previous; return; } render(); return; }
  const del = event.target.closest("[data-entry-delete]");
  if (del) { const previous = state.entries; state.entries = previous.filter(x => x.id !== del.dataset.entryDelete); if (!saveState()) { state.entries = previous; return; } render(); toast("Note deleted."); return; }
  const actionButton = event.target.closest("[data-action]");
  if (actionButton) { action(actionButton.dataset.action); return; }
  if (event.target.closest("[data-home]")) { state.tab = "home"; saveState(); render(); }
});
document.addEventListener("submit", event => {
  const form = event.target.closest("form[data-form]");
  if (!form) return;
  event.preventDefault();
  if (form.dataset.form === "worksheet") saveWorksheet(form);
  if (form.dataset.form === "checkin") saveCheckin(form);
});
$("#global-search").addEventListener("input", () => { renderSidebar(); renderSearchResults(); if (state.tab === "library") page.innerHTML = renderTechniqueLibrary(); });
$("#global-search").addEventListener("keydown", event => {
  if (event.key === "ArrowDown") {
    const first = $(".search-result", $("#search-results"));
    if (first) { event.preventDefault(); first.focus(); }
  }
  if (event.key === "Enter") {
    const first = $(".search-result", $("#search-results"));
    if (first) { event.preventDefault(); first.click(); }
  }
  if (event.key === "Escape") {
    $("#search-results").hidden = true;
    $("#global-search").setAttribute("aria-expanded", "false");
  }
});
$("#search-results").addEventListener("keydown", event => {
  const options = [...$("#search-results").querySelectorAll('[role="option"]')];
  const current = options.indexOf(document.activeElement);
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const direction = event.key === "ArrowDown" ? 1 : -1;
    options[Math.max(0, Math.min(options.length - 1, current + direction))]?.focus();
  }
  if (event.key === "Escape") {
    $("#global-search").focus();
    $("#search-results").hidden = true;
    $("#global-search").setAttribute("aria-expanded", "false");
  }
});
$("#open-sidebar").addEventListener("click", () => { $("#sidebar").classList.add("sidebar-open"); $("#sidebar-scrim").classList.add("visible"); });
$("#close-sidebar").addEventListener("click", () => { $("#sidebar").classList.remove("sidebar-open"); $("#sidebar-scrim").classList.remove("visible"); });
$("#sidebar-scrim").addEventListener("click", () => { $("#sidebar").classList.remove("sidebar-open"); $("#sidebar-scrim").classList.remove("visible"); });
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
document.addEventListener("keydown", event => {
  if (event.key === "/" && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)) { event.preventDefault(); $("#global-search").focus(); }
  if (event.key === "Escape") { $("#sidebar").classList.remove("sidebar-open"); $("#sidebar-scrim").classList.remove("visible"); }
});
render();
