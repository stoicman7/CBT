import { EMOTIONS, SOURCES, WORKSHEETS } from "./data.js";
import { CORE_TECHNIQUES } from "./technique-library.js";
import { FORMULATION_SECTIONS, FORMULATION_TOOLS } from "./formulation.js";
import { EXERCISE_FAMILY_ORDER, EXERCISE_FAMILY_NOTES, exerciseFamily, groupExercises } from "./exercise-taxonomy.js";
import { TECHNIQUE_GUIDES } from "./technique-guides.js";
import { THOUGHT_SPOTTING_GUIDE } from "./automatic-thought-guide.js";

const KEY = "cbt-workspace-v1";
const defaults = { active: "anger", tab: "home", entries: [], checkins: [], completed: {}, libraryCategory: "All", libraryApproach: "All" };
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
      libraryCategory: typeof saved.libraryCategory === "string" ? saved.libraryCategory : defaults.libraryCategory,
      libraryApproach: typeof saved.libraryApproach === "string" ? saved.libraryApproach : defaults.libraryApproach
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
    const source = SOURCES[id];
    return source ? `<a href="${esc(source.url)}" target="_blank" rel="noopener">${esc(source.label)} <span>↗</span></a>` : "";
  }).join("");
}

function renderSidebar() {
  const q = state.tab === "library" ? "" : ($("#global-search").value || "").trim().toLowerCase();
  nav.innerHTML = ["Emotions", "Patterns", "Focused care"].map(group => {
    const items = EMOTIONS.filter(e => e.group === group).filter(e => !q || [e.name, e.subtitle, e.description, ...e.tools.map(t => t.title + " " + t.description)].join(" ").toLowerCase().includes(q));
    if (!items.length) return "";
    return `<div class="nav-group"><div class="nav-group-title">${group === "Focused care" ? "FOCUSED CARE" : group.toUpperCase()}</div>${items.map(e => `<button class="emotion-link ${state.active === e.id && !["home","journal","library","formulation"].includes(state.tab) ? "active" : ""}" type="button" data-emotion="${e.id}" ${state.active === e.id && !["home","journal","library"].includes(state.tab) ? 'aria-current="page"' : ""}><span class="emotion-initial">${e.initials}</span><span class="emotion-name">${esc(e.name)}</span><span class="nav-arrow">›</span></button>`).join("")}</div>`;
  }).join("") || '<div class="nav-empty">No matching emotions or tools.</div>';
  $("#emotion-count").textContent = EMOTIONS.length;
  const formulationLink = $(".formulation-nav-link");
  if (formulationLink) {
    formulationLink.classList.toggle("active", state.tab === "formulation");
    if (state.tab === "formulation") formulationLink.setAttribute("aria-current", "page");
    else formulationLink.removeAttribute("aria-current");
  }
}
function renderSearchResults() {
  const input = $("#global-search"), results = $("#search-results");
  if (!input || !results) return;
  const query = input.value.trim().toLowerCase();
  if (!query) { results.hidden = true; results.innerHTML = ""; input.setAttribute("aria-expanded", "false"); return; }
  const hits = [];
  for (const emotion of EMOTIONS) {
    const workspaceText = [emotion.name, emotion.subtitle, emotion.description].join(" ").toLowerCase();
    if (workspaceText.includes(query)) hits.push({ emotion, tool: null, kind: "emotion" });
    for (const tool of emotion.tools) {
      const toolText = [tool.title, tool.description, tool.when].join(" ").toLowerCase();
      if (toolText.includes(query)) hits.push({ emotion, tool, kind: "emotion" });
    }
  }
  const formulationWorkspace = { id: "formulation", name: "Thoughts, beliefs & schemas" };
  for (const tool of FORMULATION_TOOLS) {
    const toolText = [tool.title, tool.description, tool.when, tool.approach].join(" ").toLowerCase();
    if (toolText.includes(query)) hits.push({ emotion: formulationWorkspace, tool, kind: "formulation" });
  }
  const libraryWorkspace = { id: "library", name: "Therapeutic technique library" };
  for (const tool of CORE_TECHNIQUES) {
    const toolText = [tool.title, tool.description, tool.when, tool.approach, tool.methodType, tool.category].join(" ").toLowerCase();
    if (toolText.includes(query)) hits.push({ emotion: libraryWorkspace, tool, kind: "library" });
  }
  const ordered = [...hits.filter(hit => hit.tool), ...hits.filter(hit => !hit.tool)].slice(0, 9);
  results.innerHTML = ordered.length
    ? ordered.map(({ emotion, tool, kind }) => `<button type="button" class="search-result" role="option" aria-selected="false" data-search-emotion="${esc(emotion.id)}" data-search-kind="${esc(kind || "emotion")}" data-search-tool="${esc(tool?.id || "")}" data-search-category="${esc(kind === "library" ? tool.category : "")}" data-search-approach="${esc(kind === "library" ? tool.approach : "")}"><span class="search-result-main">${esc(tool?.title || emotion.name)}</span><small>${esc(emotion.name)} · ${tool ? esc(kind === "library" ? tool.approach : kind === "formulation" ? "Formulation exercise" : "Interactive exercise") : "Workspace"}</small></button>`).join("")
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
    <div class="tool-card-top"><span class="tool-number">${String(index+1).padStart(2,"0")}</span><span class="tool-type">${esc(family)}</span>${tool.approach ? `<span class="tool-approach">${esc(tool.approach)}</span>` : ""}</div>
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
  const approaches = ["All", ...new Set(CORE_TECHNIQUES.map(item => item.approach))];
  const visible = CORE_TECHNIQUES.filter(item => {
    const guide = TECHNIQUE_GUIDES[item.id];
    const categoryMatch = state.libraryCategory === "All" || item.category === state.libraryCategory;
    const approachMatch = state.libraryApproach === "All" || item.approach === state.libraryApproach;
    const guideText = guide ? [guide.aim, ...(guide.steps||[]), ...(guide.questions||[]), guide.review, guide.pitfalls] : [];
    const searchText = [item.title,item.methodType,item.approach,item.category,item.description,item.when,item.caution,item.evidenceNote,...guideText].join(" ").toLowerCase();
    return categoryMatch && approachMatch && (!query || searchText.includes(query));
  });
  const compass = [
    ["Understand a repeating pattern","Assessment & formulation","Map the sequence and what keeps it going."],
    ["Examine an appraisal or rule","Cognitive methods","Clarify the exact thought, meaning or assumption and test it fairly."],
    ["Test a prediction or change a habit","Behavioural methods","Use an observable, proportionate action to learn or practise a new response."],
    ["Work with a mental picture","Imagery & memory methods","Identify what an image means; specialist memory work requires trained care."],
    ["Interrupt worry or rigid attention","Attention & metacognitive methods","Change how attention engages with repetitive thinking."],
    ["Respond to intense emotion or urges","Emotion regulation & distress tolerance","Choose a skill that fits the facts, safety and immediate need."],
    ["Move towards a chosen direction","Acceptance & values","Make room for internal experiences and take a values-consistent step."],
    ["Handle a difficult interaction","Interpersonal & communication","Practise requests, boundaries, validation and repair where safe."]
  ];
  return `<section class="library-hero method-explorer-hero">
    <div class="eyebrow"><span class="eyebrow-dot"></span>METHOD EXPLORER / CLINICAL SKILL MAP</div>
    <h1>Explore the methods<span class="title-period">.</span></h1>
    <p>Go beyond a technique name. Each guide explains what the method targets, how to apply it, the questions that sharpen the work, what to review afterwards, and where its limits matter.</p>
    <div class="library-metrics"><span><strong>${CORE_TECHNIQUES.length}</strong> method guides</span><span><strong>${categories.length-1}</strong> intervention families</span><span><strong>${approaches.length-1}</strong> models / protocols</span><span><strong>${CORE_TECHNIQUES.filter(x=>x.methodType === "Specialist protocol component").length}</strong> specialist components</span></div>
  </section>
  <section class="method-compass">
    <div class="section-heading"><div><div class="eyebrow muted">CHOOSE BY THE QUESTION</div><h2>What are you trying to change?</h2><p>Start with the process maintaining the difficulty—not with the most familiar technique.</p></div><span class="section-index">01 / ORIENT</span></div>
    <div class="method-compass-grid">${compass.map(([title,family,note])=>`<button type="button" class="method-compass-card" data-library-category="${esc(family)}"><span>${esc(family)}</span><strong>${esc(title)}</strong><small>${esc(note)}</small></button>`).join("")}</div>
  </section>
  <div class="library-notice"><strong>How to use a method guide</strong><p>First clarify the target and the person's formulation. Then choose one method that fits, agree a small and safe practice, observe what happens, and review the learning. Similar-looking techniques may have different rationales across CBT, REBT, ACT, DBT, MCT, MBCT and schema therapy. A technique is not a treatment by itself.</p></div>
  <div class="library-toolbar">
    <div class="library-filter-block"><span class="library-filter-label">Filter by intervention family</span><div class="library-filters" role="group" aria-label="Filter methods by intervention family">${categories.map(category=>`<button type="button" class="library-filter ${state.libraryCategory===category?"active":""}" data-library-category="${esc(category)}">${esc(category)}</button>`).join("")}</div></div>
    <div class="library-filter-block"><span class="library-filter-label">Filter by therapeutic model or protocol</span><div class="library-filters library-approaches" role="group" aria-label="Filter methods by therapeutic model or protocol">${approaches.map(approach=>`<button type="button" class="library-filter ${state.libraryApproach===approach?"active":""}" data-library-approach="${esc(approach)}">${esc(approach)}</button>`).join("")}</div></div>
    <span class="library-result-count">${visible.length} OF ${CORE_TECHNIQUES.length} METHODS</span>
  </div>
  ${visible.length ? `<div class="library-grid method-guide-grid">${visible.map(item=>{
    const guide = TECHNIQUE_GUIDES[item.id];
    return `<article class="library-card method-guide-card">
      <div class="library-card-meta"><span class="library-category">${esc(item.category)}</span><span class="library-class ${item.methodType === "Specialist protocol component" ? "specialist" : item.methodType === "Core CBT method" ? "core" : "related"}">${esc(item.methodType)}</span><span class="library-approach">${esc(item.approach)}</span></div>
      <h3>${esc(item.title)}</h3>
      <p class="method-card-aim">${esc(item.description)}</p>
      <div class="library-use"><strong>When it may fit</strong><span>${esc(item.when)}</span></div>
      <details class="method-explainer">
        <summary><span><b>Explore the full method</b><small>Rationale · sequence · questions · review · limits</small></span><span class="evidence-toggle" aria-hidden="true">+</span></summary>
        <div class="method-explainer-body">
          <section class="method-detail-block"><span class="method-detail-label">01 / TARGET AND RATIONALE</span><p>${esc(guide.aim)}</p></section>
          <section class="method-detail-block"><span class="method-detail-label">02 / HOW TO APPLY IT</span><ol class="method-procedure-list">${guide.steps.map((step,i)=>`<li><span>${String(i+1).padStart(2,"0")}</span><p>${esc(step)}</p></li>`).join("")}</ol></section>
          <section class="method-detail-block"><span class="method-detail-label">03 / QUESTIONS THAT SHARPEN THE WORK</span><ul class="method-question-list">${guide.questions.map(q=>`<li>${esc(q)}</li>`).join("")}</ul></section>
          <section class="method-detail-block"><span class="method-detail-label">04 / WHAT TO REVIEW</span><p>${esc(guide.review)}</p></section>
          <section class="method-detail-block method-pitfall-block"><span class="method-detail-label">05 / COMMON TRAPS AND BOUNDARIES</span><p>${esc(guide.pitfalls)}</p><p>${esc(item.caution)}</p></section>
          <section class="method-detail-block method-evidence-block"><span class="method-detail-label">06 / EVIDENCE AND SCOPE</span><p>${esc(guide.evidenceScope)}</p>${item.evidenceNote ? `<p>${esc(item.evidenceNote)}</p>` : ""}</section>
          <div class="technique-sources">${links(item.sources)}</div>
        </div>
      </details>
    </article>`;
  }).join("")}</div>` : `<div class="empty-state"><div class="empty-mark">00</div><h3>No matching methods</h3><p>Try another search term or select a different intervention family or model.</p></div>`}
  <div class="library-note"><strong>Clinical scope</strong><p>Match the method to the person's formulation, goals, preferences, culture, risk and access to care. Specialist protocol components require appropriate assessment and delivery. The evidence for a complete treatment package does not automatically establish the effectiveness of one isolated technique.</p><a href="./docs/SCIENTIFIC_REVIEW.md" target="_blank" rel="noopener">Read the scientific and clinical review ↗</a></div>`;
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
  <div class="journal-columns"><div><div class="journal-section-title"><h3>Exercise notes</h3><span>${entries.length} SAVED</span></div>${entries.length ? entries.map(entry => { const e = EMOTIONS.find(x => x.id === entry.emotionId); return `<article class="journal-entry"><div class="entry-head"><span class="entry-category">${esc(e?.name || (entry.emotionId === "formulation" ? "Thoughts, beliefs & schemas" : "Workspace"))}</span><time>${formatDate(entry.createdAt)}</time></div><h4>${esc(entry.toolTitle)}</h4><div class="entry-preview">${Object.entries(entry.values || {}).filter(([,v]) => String(v).trim()).slice(0,2).map(([k,v]) => `<p><b>${esc(k.replace(/([A-Z])/g," $1"))}</b> · ${esc(v)}</p>`).join("")}</div><button type="button" class="delete-entry" data-entry-delete="${entry.id}">Delete note</button></article>`; }).join("") : '<div class="empty-state"><div class="empty-mark">01</div><h3>No exercise notes yet</h3><p>Open a technique and save a reflection. Your notes will appear here.</p></div>'}</div>
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
  const g = THOUGHT_SPOTTING_GUIDE;
  const families = groupExercises(FORMULATION_TOOLS);
  return '<section class="formulation-hero thought-guide-hero"><div class="eyebrow"><span class="eyebrow-dot"></span>COGNITIVE CONCEPTUALIZATION / PRACTICAL FIELD GUIDE</div><h1>Thoughts, beliefs & schemas<span class="title-period">.</span></h1><p>A practical system for noticing the cognition behind an emotional shift, separating it from feelings and facts, exploring its meaning, and deciding when a deeper belief formulation is actually useful.</p><div class="formulation-hero-metrics"><span><strong>' + FORMULATION_TOOLS.length + '</strong> guided tools</span><span><strong>' + g.protocol.length + '</strong> capture stages</span><span><strong>' + g.workedExamples.length + '</strong> worked examples</span></div></section>' +
  '<div class="formulation-notice"><strong>Start with a specific episode—not a diagnosis or a search for a hidden belief.</strong><p>Automatic thoughts may be words, images, predictions, memories or meanings. They are hypotheses about how a situation was appraised. A blank answer is acceptable. The goal is accurate observation and useful choice, not finding something negative in every feeling.</p></div>' +
  '<section class="thought-recognition-section"><div class="section-heading"><div><div class="eyebrow muted">01 / NOTICE THE CUE</div><h2>Where automatic thoughts show up</h2><p>Look for a shift in the response. The cue helps you locate the moment; it does not prove which thought occurred.</p></div><span class="section-index">RECOGNITION</span></div><div class="thought-cue-grid">' +
  g.recognitionCues.map((x,i)=>'<article class="thought-cue-card"><span class="cue-number">'+String(i+1).padStart(2,"0")+'</span><h3>'+esc(x.name)+'</h3><p>'+esc(x.detail)+'</p></article>').join("") +
  '</div></section>' +
  '<section class="thought-capture-section"><div class="section-heading"><div><div class="eyebrow muted">02 / CAPTURE THE MOMENT</div><h2>A seven-stage thought-spotting protocol</h2><p>Move from one concrete event to an accurate record. Do not rush to challenge a thought before you have identified it.</p></div><span class="section-index">FIELD SEQUENCE</span></div><ol class="thought-capture-timeline">' +
  g.protocol.map((x,i)=>'<li><span class="capture-step-number">'+String(i+1).padStart(2,"0")+'</span><div><h3>'+esc(x.title)+'</h3><p>'+esc(x.body)+'</p></div></li>').join("") +
  '</ol><button class="primary-button" type="button" data-tool="formulation-thought-capture">Open guided thought capture <span aria-hidden="true">↗</span></button></section>' +
  '<section class="thought-types-section"><div class="section-heading"><div><div class="eyebrow muted">03 / RECOGNISE THE FORM</div><h2>Not every automatic thought is a sentence</h2><p>Capture the form that actually occurred; do not translate every experience into words if that changes its meaning.</p></div><span class="section-index">COGNITIVE FORMS</span></div><div class="thought-types-grid">' +
  g.cognitionTypes.map(x=>'<article class="thought-type-card"><h3>'+esc(x.name)+'</h3><blockquote>'+esc(x.example)+'</blockquote><p>'+esc(x.distinction)+'</p></article>').join("") +
  '</div></section>' +
  '<section class="thought-sort-section"><div class="section-heading"><div><div class="eyebrow muted">04 / SEPARATE THE COMPONENTS</div><h2>Thought, emotion, body and behaviour are not interchangeable</h2><p>A clear record prevents an emotion label or a physical sensation from being mistaken for the appraisal that may have accompanied it.</p></div><span class="section-index">DISTINCTIONS</span></div><div class="thought-sort-table">' +
  g.discrimination.map(x=>'<article class="thought-sort-row"><div><strong>'+esc(x.label)+'</strong><small>'+esc(x.test)+'</small></div><p>'+esc(x.example)+'</p></article>').join("") +
  '</div><button class="outline-button" type="button" data-tool="formulation-sort-episode">Practise sorting an episode</button></section>' +
  '<section class="thought-question-section"><div class="section-heading"><div><div class="eyebrow muted">05 / ASK BETTER QUESTIONS</div><h2>A question bank for different emotional contexts</h2><p>Use a few fitting prompts. Do not ask every question or lead the person towards a presumed answer.</p></div><span class="section-index">ELICITATION</span></div>' +
  g.questionBank.map((group,i)=>'<details class="thought-question-group" '+(i===0?'open':'')+'><summary><span><small>QUESTION SET '+String(i+1).padStart(2,"0")+'</small><b>'+esc(group.group)+'</b></span><span class="evidence-toggle" aria-hidden="true">+</span></summary><ul>'+group.questions.map(q=>'<li>'+esc(q)+'</li>').join("")+'</ul></details>').join("") +
  '</section>' +
  '<section class="thought-troubleshooting-section"><div class="section-heading"><div><div class="eyebrow muted">06 / WHEN YOU GET STUCK</div><h2>Common difficulties—and what to try instead</h2><p>The answer is not to push harder. Change the question, return to the situation or stop when the process becomes unhelpful.</p></div><span class="section-index">TROUBLESHOOTING</span></div><div class="thought-troubleshooting-grid">' +
  g.troubleshooting.map(x=>'<article class="thought-troubleshooting-card"><h3>'+esc(x.problem)+'</h3><p>'+esc(x.response)+'</p></article>').join("") +
  '</div></section>' +
  '<section class="thought-examples-section"><div class="section-heading"><div><div class="eyebrow muted">07 / SEE THE DIFFERENCE</div><h2>Worked examples</h2><p>Each example separates the event, cognition, emotion, image, meaning and behaviour. The balanced response is not a claim that the feared interpretation is impossible.</p></div><span class="section-index">APPLICATION</span></div><div class="thought-example-grid">' +
  g.workedExamples.map((x,i)=>'<details class="thought-example-card" '+(i===0?'open':'')+'><summary><span><small>EXAMPLE '+String(i+1).padStart(2,"0")+'</small><b>'+esc(x.title)+'</b></span><span class="evidence-toggle" aria-hidden="true">+</span></summary><div class="thought-example-body">'+[['Situation',x.situation],['Emotion',x.emotion],['Automatic thought',x.thought],['Image',x.image],['Personal meaning',x.meaning],['Behaviour / urge',x.behaviour],['Balanced perspective',x.balanced],['Learning point',x.learning]].map(([k,v])=>'<div><strong>'+k+'</strong><p>'+esc(v)+'</p></div>').join("")+'</div></details>').join("") +
  '</div></section>' +
  '<section class="thought-record-section"><div class="section-heading"><div><div class="eyebrow muted">08 / RECORD AND EVALUATE</div><h2>A structured record—from capture to response</h2><p>Use this order to avoid jumping from an emotion straight to a positive alternative.</p></div><span class="section-index">RECORD QUALITY</span></div><ol class="thought-record-steps">' +
  g.thoughtRecord.map((x,i)=>'<li><span>'+String(i+1).padStart(2,"0")+'</span><div><strong>'+esc(x[0])+'</strong><p>'+esc(x[1])+'</p></div></li>').join("") +
  '</ol><button class="primary-button" type="button" data-tool="formulation-thought-record">Open thought record <span aria-hidden="true">↗</span></button></section>' +
  '<section class="belief-bridge-section"><div class="section-heading"><div><div class="eyebrow muted">09 / EXPLORE MEANING CAREFULLY</div><h2>From automatic thought to a broader belief</h2><p>Move deeper only when repeated examples support it and the exploration remains useful.</p></div><span class="section-index">FORMULATION</span></div><div class="belief-bridge-grid">' +
  g.beliefBridge.map((x,i)=>'<article class="belief-bridge-card"><span>'+String(i+1).padStart(2,"0")+'</span><h3>'+esc(x.level)+'</h3><blockquote>'+esc(x.example)+'</blockquote><p>'+esc(x.question)+'</p></article>').join("") +
  '</div><div class="belief-bridge-note">'+g.formulationPrinciples.map(x=>'<p>'+esc(x)+'</p>').join("")+'</div></section>' +
  '<section class="formulation-knowledge"><div class="section-heading"><div><div class="eyebrow muted">10 / KNOWLEDGE MAP</div><h2>Learn the wider cognitive model</h2><p>These concepts help organise repeated observations. They are not labels to assign after one event.</p></div><span class="section-index">CONCEPTS</span></div><div class="belief-level-grid">' +
  levels.points.map((x,i)=>'<article class="belief-level-card"><span>'+String(i+1).padStart(2,"0")+'</span><h3>'+esc(x[0])+'</h3><p>'+esc(x[1])+'</p></article>').join("") +
  '</div><p class="formulation-section-note">'+esc(levels.body)+'</p><div class="formulation-citations">'+links(levels.sources)+'</div>' +
  FORMULATION_SECTIONS.filter(x=>x.id!=="levels").map((section,i)=>'<details class="formulation-knowledge-card" '+(i===0?'open':'')+'><summary><span><small>'+esc(section.kicker)+'</small><b>'+esc(section.title)+'</b></span><span class="evidence-toggle" aria-hidden="true">+</span></summary><div class="formulation-knowledge-body"><p>'+esc(section.body)+'</p><ul>'+section.points.map(([name,desc])=>'<li><strong>'+esc(name)+'</strong><span>'+esc(desc)+'</span></li>').join("")+'</ul><div class="technique-sources">'+links(section.sources)+'</div></div></details>').join("") +
  '</section>' +
  '<section class="formulation-tools"><div class="section-heading"><div><div class="eyebrow muted">11 / PRACTISE AND APPLY</div><h2>Tools for each stage</h2><p>Choose a tool that matches the question. You do not need to complete every worksheet.</p></div><span class="family-count">'+FORMULATION_TOOLS.length+' TOOLS</span></div>' +
  families.map(([family,tools])=>'<section class="exercise-family"><header class="exercise-family-heading"><div><span class="eyebrow muted">METHOD FAMILY</span><h3>'+esc(family)+'</h3><p>'+esc(EXERCISE_FAMILY_NOTES[family])+'</p></div><span class="family-count">'+tools.length+' TOOLS</span></header><div class="tool-grid">'+tools.map((tool,index)=>toolCard(tool,index,family)).join("")+'</div></section>').join("") +
  '</section>' +
  '<section class="formulation-boundary"><strong>Clinical boundaries and quality checks</strong><ul>'+g.clinicalBoundaries.map(x=>'<li>'+esc(x)+'</li>').join("")+'</ul><div class="technique-sources">'+links(g.sources)+'</div><a href="./docs/SCIENTIFIC_REVIEW.md" target="_blank" rel="noopener">Read the scientific and clinical review ↗</a></section>';
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
    const searchKind = searchResult.dataset.searchKind || "emotion";
    const toolId = searchResult.dataset.searchTool;
    if (searchKind === "library") {
      state.tab = "library";
      state.libraryCategory = searchResult.dataset.searchCategory || "All";
      state.libraryApproach = searchResult.dataset.searchApproach || "All";
      $("#global-search").value = "";
    } else if (searchKind === "formulation") {
      state.tab = "formulation"; $("#global-search").value = "";
    } else {
      state.active = searchEmotion; state.tab = "overview"; $("#global-search").value = "";
    }
    saveState(); render();
    if (toolId && searchKind !== "library") openTool(toolId);
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
  const libraryApproach = event.target.closest("[data-library-approach]");
  if (libraryApproach) { state.libraryApproach = libraryApproach.dataset.libraryApproach; render(); return; }
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
