import { EMOTIONS, SOURCES, WORKSHEETS } from "./data.js";

const KEY = "cbt-workspace-v1";
const defaults = { active: "anger", tab: "home", entries: [], checkins: [], completed: {} };
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
    return saved && typeof saved === "object"
      ? { ...defaults, ...saved, entries: Array.isArray(saved.entries) ? saved.entries : [], checkins: Array.isArray(saved.checkins) ? saved.checkins : [], completed: saved.completed || {} }
      : structuredClone(defaults);
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

function renderSidebar() {
  const q = ($("#global-search").value || "").trim().toLowerCase();
  nav.innerHTML = ["Emotions", "Patterns", "Focused care"].map(group => {
    const items = EMOTIONS.filter(e => e.group === group).filter(e => !q || [e.name, e.subtitle, e.description, ...e.tools.map(t => t.title + " " + t.description)].join(" ").toLowerCase().includes(q));
    if (!items.length) return "";
    return `<div class="nav-group"><div class="nav-group-title">${group === "Focused care" ? "FOCUSED CARE" : group.toUpperCase()}</div>${items.map(e => `<button class="emotion-link ${state.active === e.id && state.tab !== "home" && state.tab !== "journal" ? "active" : ""}" type="button" data-emotion="${e.id}" ${state.active === e.id ? 'aria-current="page"' : ""}><span class="emotion-initial">${e.initials}</span><span class="emotion-name">${esc(e.name)}</span><span class="nav-arrow">›</span></button>`).join("")}</div>`;
  }).join("") || '<div class="nav-empty">No matching emotions or tools.</div>';
  $("#emotion-count").textContent = EMOTIONS.length;
}
function renderHeader() {
  $("#breadcrumb-current").textContent = state.tab === "journal" ? "MY JOURNAL" : state.tab === "home" ? "OVERVIEW" : activeEmotion().name.toUpperCase();
}
function tabs() {
  return `<div class="section-tabs" role="tablist" aria-label="Workspace sections">${[["overview","Overview"],["techniques","Techniques"],["plan","My plan"],["journal","My notes"]].map(([id,label]) => `<button type="button" role="tab" aria-selected="${state.tab === id}" class="section-tab ${state.tab === id ? "selected" : ""}" data-tab="${id}">${label}</button>`).join("")}</div>`;
}
function toolCard(tool, index) {
  return `<article class="tool-card"><div class="tool-card-top"><span class="tool-number">${String(index+1).padStart(2,"0")}</span><span class="tool-type">INTERACTIVE TOOL</span></div><h3>${esc(tool.title)}</h3><p>${esc(tool.description)}</p><div class="tool-when"><span>BEST USED</span>${esc(tool.when)}</div><button type="button" class="text-action" data-tool="${tool.id}">Open exercise <span>↗</span></button></article>`;
}
function hero(e) {
  return `<section class="emotion-hero"><div class="hero-content"><div class="eyebrow"><span class="eyebrow-dot"></span>${esc(e.group)} <span class="eyebrow-slash">/</span> PERSONAL WORKSPACE</div><h1>${esc(e.name)}<span class="title-period">.</span></h1><p class="hero-subtitle">${esc(e.subtitle)}</p><div class="hero-status-row"><span class="evidence-pill evidence-${e.evidence.level}"><span></span>${esc(e.evidence.label)}</span><span class="hero-meta">3 practical tools <i>·</i> 4-step practice plan</span></div></div><div class="hero-mark" aria-hidden="true"><div class="hero-orbit orbit-one"></div><div class="hero-orbit orbit-two"></div><div class="hero-monogram">${e.initials}</div><div class="hero-caption">NOTICE <span>·</span> UNDERSTAND <span>·</span> RESPOND</div></div></section>`;
}
function overview(e) {
  const done = e.plan.filter((_,i) => state.completed[`${e.id}:${i}`]).length;
  return `<div class="workspace-layout"><div class="workspace-primary">
    <section class="section-heading"><div><div class="eyebrow muted">START WITH UNDERSTANDING</div><h2>What is happening?</h2></div><span class="section-index">01 / THE MODEL</span></section>
    <article class="model-card"><p class="model-copy">${esc(e.description)}</p><div class="model-flow">${e.model.split(" → ").map((p,i) => `<span class="model-step"><b>${String(i+1).padStart(2,"0")}</b>${esc(p)}</span>`).join('<span class="flow-arrow">→</span>')}</div><div class="model-insight"><span class="insight-mark">i</span><p>${esc(e.why)}</p></div></article>
    <section class="section-heading tool-heading"><div><div class="eyebrow muted">PRACTICAL METHODS</div><h2>Tools to work with</h2></div><button class="subtle-action" type="button" data-tab="techniques">View all techniques →</button></section>
    <div class="tool-grid">${e.tools.map(toolCard).join("")}</div>
    <section class="section-heading plan-heading"><div><div class="eyebrow muted">A SMALL, STRUCTURED START</div><h2>Your practice plan</h2></div><span class="progress-label">${done} of 4 completed</span></section>
    <div class="plan-preview"><div class="progress-track"><span style="width:${done*25}%"></span></div>${e.plan.slice(0,2).map((p,i) => `<div class="plan-preview-item"><span class="plan-step-number">0${i+1}</span><div><strong>${esc(p.title)}</strong><p>${esc(p.detail)}</p></div></div>`).join("")}<button class="plan-link" type="button" data-tab="plan">Open the full plan →</button></div>
  </div><aside class="workspace-aside">
    <article class="side-panel focus-panel"><div class="panel-kicker">YOUR FOCUS</div><h3>What to practise</h3><ul class="focus-list">${e.focus.map(x => `<li><span class="focus-check">✓</span>${esc(x)}</li>`).join("")}</ul><div class="panel-divider"></div><p class="small-note">Choose one skill at a time. Repetition and reflection are more useful than doing everything at once.</p></article>
    <article class="side-panel evidence-panel"><div class="panel-kicker">EVIDENCE SNAPSHOT</div><div class="evidence-score evidence-word">${esc(e.evidence.level.toUpperCase())}<span>/ EVIDENCE</span></div><p>${esc(e.evidence.note)}</p><div class="evidence-links">${links(e.tools.flatMap(t => t.sources))}</div><a class="review-link" href="./docs/SCIENTIFIC_REVIEW.md" target="_blank" rel="noopener">How evidence is rated ↗</a></article>
    <article class="caution-panel"><span class="caution-icon">!</span><div><strong>Important boundaries</strong><p>${esc(e.caution)}</p></div></article>
  </aside></div>`;
}
function techniques(e) {
  return `<section class="tab-intro"><div><div class="eyebrow muted">METHOD LIBRARY</div><h2>Techniques for ${esc(e.name.toLowerCase())}</h2><p>Each method includes its purpose, suggested use, practical steps, and evidence context.</p></div><span class="tab-count">03 METHODS</span></section><div class="technique-list">${e.tools.map((t,i) => `<article class="technique-row"><div class="technique-index">0${i+1}</div><div class="technique-main"><div class="technique-overline">METHOD 0${i+1}</div><h3>${esc(t.title)}</h3><p>${esc(t.description)}</p><div class="technique-detail"><strong>When to use it</strong><span>${esc(t.when)}</span></div><div class="technique-detail"><strong>How it works</strong><ol>${t.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol></div><div class="technique-evidence"><span>EVIDENCE NOTE</span>${esc(t.evidence)}</div><div class="technique-sources">${links(t.sources)}</div></div><div class="technique-side"><span class="worksheet-tag">INTERACTIVE</span><button class="primary-button compact" type="button" data-tool="${t.id}">Open worksheet ↗</button></div></article>`).join("")}</div>`;
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
function render() {
  renderSidebar(); renderHeader();
  if (state.tab === "home") page.innerHTML = homePage();
  else if (state.tab === "journal") page.innerHTML = journalPage();
  else {
    const e = activeEmotion();
    page.innerHTML = hero(e) + tabs() + (state.tab === "techniques" ? techniques(e) : state.tab === "plan" ? planPage(e) : overview(e));
  }
}
function openTool(id) {
  const e = activeEmotion(), tool = e.tools.find(t => t.id === id);
  if (!tool) return;
  const schema = WORKSHEETS[tool.worksheet] || WORKSHEETS.reflection;
  const fields = schema.fields.map(([key,label],i) => `<label class="form-field"><span>${esc(label)}</span><textarea name="${esc(key)}" rows="2" placeholder="Write a few notes..." ${i === 0 ? "autofocus" : ""}></textarea></label>`).join("");
  dialogContent.innerHTML = `<div class="dialog-head"><div><div class="eyebrow muted">INTERACTIVE PRACTICE · ${esc(e.name.toUpperCase())}</div><h2 id="dialog-title">${esc(tool.title)}</h2><p>${esc(schema.intro)}</p></div><button type="button" class="icon-button dialog-close" data-action="close-dialog" aria-label="Close">×</button></div>
  <div class="dialog-method"><strong>Purpose</strong><p>${esc(tool.description)}</p><strong>Suggested steps</strong><ol>${tool.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol></div>
  <div class="worksheet-evidence"><span>EVIDENCE CONTEXT</span><p>${esc(tool.evidence)}</p><div>${links(tool.sources)}</div></div>
  <form class="worksheet-form" data-form="worksheet" data-emotion="${e.id}" data-tool="${tool.id}"><div class="form-section-heading"><span>YOUR REFLECTION</span><small>Saved privately in this browser</small></div>${fields}<div class="dialog-actions"><button type="button" class="outline-button" data-action="close-dialog">Cancel</button><button type="submit" class="primary-button">Save reflection →</button></div></form>`;
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
  const tool = e?.tools.find(x => x.id === form.dataset.tool);
  const values = Object.fromEntries(new FormData(form).entries());
  if (!Object.values(values).some(v => String(v).trim())) { toast("Add at least one reflection before saving."); return; }
  state.entries.unshift({ id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), emotionId: form.dataset.emotion, toolId: form.dataset.tool, toolTitle: tool?.title || "Practice note", createdAt: new Date().toISOString(), values });
  saveState(); dialog.close(); render(); toast("Reflection saved to My notes.");
}
function saveCheckin(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  state.checkins.unshift({ id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()), createdAt: new Date().toISOString(), level: Math.max(0,Math.min(10,Number(data.level)||0)), note: String(data.note||"").trim() });
  saveState(); dialog.close(); render(); toast("Daily check-in saved.");
}
function exportData() {
  const blob = new Blob([JSON.stringify({ exportedAt:new Date().toISOString(), description:"CBT workspace export. This file may contain sensitive personal reflections.", entries:state.entries, checkins:state.checkins, completed:state.completed },null,2)], {type:"application/json"});
  const url = URL.createObjectURL(blob), a = document.createElement("a");
  a.href = url; a.download = "cbt-workspace-" + new Date().toISOString().slice(0,10) + ".json";
  document.body.append(a); a.click(); a.remove(); URL.revokeObjectURL(url); toast("Your data export has been created.");
}
function action(name) {
  if (name === "checkin") openCheckin();
  if (name === "privacy") openPrivacy();
  if (name === "export") exportData();
  if (name === "close-dialog") dialog.close();
  if (name === "clear-data" && confirm("Delete all saved notes, check-ins, and plan progress from this browser? This cannot be undone.")) {
    state = { ...defaults, active:state.active, tab:"journal" }; saveState(); render(); toast("Local workspace data cleared.");
  }
}
document.addEventListener("click", event => {
  const emotion = event.target.closest("[data-emotion]");
  if (emotion) {
    state.active = emotion.dataset.emotion; state.tab = "overview"; saveState(); render();
    $("#sidebar").classList.remove("sidebar-open"); $("#sidebar-scrim").classList.remove("visible"); return;
  }
  const tab = event.target.closest("[data-tab]");
  if (tab) { state.tab = tab.dataset.tab; saveState(); render(); return; }
  const tool = event.target.closest("[data-tool]");
  if (tool) { openTool(tool.dataset.tool); return; }
  const plan = event.target.closest("[data-plan]");
  if (plan) { const key = activeEmotion().id + ":" + plan.dataset.plan; state.completed[key] = !state.completed[key]; saveState(); render(); return; }
  const del = event.target.closest("[data-entry-delete]");
  if (del) { state.entries = state.entries.filter(x => x.id !== del.dataset.entryDelete); saveState(); render(); toast("Note deleted."); return; }
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
$("#global-search").addEventListener("input", renderSidebar);
$("#open-sidebar").addEventListener("click", () => { $("#sidebar").classList.add("sidebar-open"); $("#sidebar-scrim").classList.add("visible"); });
$("#close-sidebar").addEventListener("click", () => { $("#sidebar").classList.remove("sidebar-open"); $("#sidebar-scrim").classList.remove("visible"); });
$("#sidebar-scrim").addEventListener("click", () => { $("#sidebar").classList.remove("sidebar-open"); $("#sidebar-scrim").classList.remove("visible"); });
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
document.addEventListener("keydown", event => {
  if (event.key === "/" && !["INPUT","TEXTAREA"].includes(document.activeElement.tagName)) { event.preventDefault(); $("#global-search").focus(); }
  if (event.key === "Escape") { $("#sidebar").classList.remove("sidebar-open"); $("#sidebar-scrim").classList.remove("visible"); }
});
render();
