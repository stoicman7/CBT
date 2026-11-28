import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { EMOTIONS, SOURCES, WORKSHEETS } from "../data.js";
import { CORE_TECHNIQUES } from "../technique-library.js";
import { FORMULATION_SECTIONS, FORMULATION_TOOLS, FORMULATION_BOOKS } from "../formulation.js";
import { EXERCISE_FAMILY_ORDER, exerciseFamily, groupExercises } from "../exercise-taxonomy.js";

assert.ok(EMOTIONS.length >= 26, "The library should contain a broad set of emotion spaces.");
const ids = EMOTIONS.map(item => item.id);
assert.equal(new Set(ids).size, ids.length, "Emotion IDs must be unique.");

const allowedLevels = new Set(["strong", "moderate", "foundational", "limited"]);
const toolIds = new Set();

for (const emotion of EMOTIONS) {
  assert.ok(emotion.name && emotion.subtitle && emotion.description, "Missing core content for " + emotion.id);
  assert.ok(allowedLevels.has(emotion.evidence.level), "Invalid evidence label for " + emotion.id);
  assert.ok(emotion.evidence.note.length > 40, "Evidence note too short for " + emotion.id);
  assert.equal(emotion.plan.length, 4, emotion.id + " must have a four-step plan");
  assert.ok(emotion.focus.length >= 3, emotion.id + " needs practical focus areas");
  assert.ok(emotion.caution.length > 30, emotion.id + " needs a safety boundary");
  for (const tool of emotion.tools) {
    assert.ok(!toolIds.has(tool.id), "Tool ID is duplicated: " + tool.id);
    toolIds.add(tool.id);
    assert.ok(WORKSHEETS[tool.worksheet], "Missing worksheet " + tool.worksheet + " for " + tool.id);
    assert.ok(tool.steps.length >= 3, "Tool " + tool.id + " needs practical steps");
    assert.ok(tool.when && tool.evidence, "Tool " + tool.id + " needs usage and evidence notes");
    for (const sourceId of tool.sources) assert.ok(SOURCES[sourceId], "Unknown source " + sourceId + " used by " + tool.id);
  }
}

assert.equal(toolIds.size, 192, "The emotion workspaces should contain 192 unique interactive tools.");
assert.ok(EMOTIONS.find(item => item.id === "health-anxiety"), "Health anxiety workspace should be present.");
assert.ok(EMOTIONS.find(item => item.id === "health-anxiety").tools.length >= 3, "Health anxiety needs dedicated tools.");
assert.ok(EMOTIONS.find(item => item.id === "health-anxiety").caution.toLowerCase().includes("medical care"), "Health anxiety must preserve medical-care safeguards.");
for (const prefix of ["anger-trigger","anger-early","anger-rumination","anger-boundary","anger-consequence","anger-repair","stress-demand","stress-problem","stress-time","stress-perfectionism","stress-recovery","stress-worry","anxiety-maintenance","anxiety-reassurance","anxiety-attention","anxiety-coping","anxiety-post","anxiety-behavioural","fear-expectancy","fear-context","fear-safety","fear-approach","fear-imaginal","fear-learning","anger-interpretation-check","anger-need-request","anger-pause-return","anger-vulnerability-plan","stress-control-influence-map","stress-priority-triage","stress-anticipatory-plan","stress-workload-conversation","anxiety-avoidance-cost-map","anxiety-worry-trigger-chain","anxiety-coping-evidence-log","anxiety-valued-approach-step","fear-real-risk-check","fear-coping-prediction-review","fear-values-approach-choice","fear-setback-reengagement","social-anxiety-safety-map","social-anxiety-anticipatory-review","social-anxiety-conversation-experiment","social-anxiety-impression-evidence","social-anxiety-core-rule-test","social-anxiety-video-feedback-prep","embarrassment-event-review","embarrassment-audience-test","embarrassment-replay","embarrassment-proportionate-repair","panic-act-respond-to-the-moment","ocd-values-alongside-erp","trauma-present-time-orientation","sleep-worry-and-belief-review","health-anxiety-metacognitive-loop","adhd-implementation-intention","bfrb-trigger-and-context-map","ed-session-preparation","psychosis-coping-review"]) {
  const tool = EMOTIONS.flatMap(item => item.tools).find(item => item.id.startsWith(prefix));
  assert.ok(tool && tool.steps.length >= 5, "New focused-audit tools must contain at least five steps: " + prefix);
}


for (const schemaId of ["angerSkills","stressPlan","anxietyExperiment","fearPractice","socialAnxiety","embarrassment"]) {
  const schema = WORKSHEETS[schemaId];
  assert.ok(schema && schema.title && schema.intro, "Missing dedicated worksheet schema: " + schemaId);
  assert.ok(schema.fields.length >= 5, "Dedicated worksheet needs enough reflection prompts: " + schemaId);
  const fieldIds = schema.fields.map(([field]) => field);
  assert.equal(new Set(fieldIds).size, fieldIds.length, "Worksheet field IDs must be unique: " + schemaId);
  assert.ok(schema.fields.every(([field,label]) => field && label), "Worksheet labels must be complete: " + schemaId);
}

const embarrassmentWorkspace = EMOTIONS.find(item => item.id === "embarrassment");
assert.ok(embarrassmentWorkspace, "The separate embarrassment workspace should be present.");
assert.equal(embarrassmentWorkspace.tools.length, 4, "Embarrassment should have four dedicated tools.");
assert.equal(embarrassmentWorkspace.evidence.level, "foundational", "Embarrassment must not be presented as a validated stand-alone treatment.");
assert.ok(embarrassmentWorkspace.evidence.note.toLowerCase().includes("no universal stand-alone cbt"), "Embarrassment evidence must distinguish emotion research from treatment evidence.");
assert.ok(embarrassmentWorkspace.caution.toLowerCase().includes("social anxiety"), "Embarrassment must preserve the boundary with clinical social-anxiety care.");

const socialWorkspace = EMOTIONS.find(item => item.id === "social-anxiety");
assert.ok(socialWorkspace, "The social-anxiety workspace should be present.");
assert.equal(socialWorkspace.tools.length, 12, "Social anxiety should contain twelve dedicated tools.");
assert.ok(socialWorkspace.tools.some(tool => tool.id === "social-anxiety-video-feedback-prep"), "The social-anxiety workspace should include clinician-guided video-feedback preparation.");
for (const requiredId of ["anger","stress","fear","anxiety"]) {
  const workspace = EMOTIONS.find(item => item.id === requiredId);
  assert.ok(workspace.tools.length >= 13, requiredId + " must contain at least thirteen dedicated tools.");
  assert.equal(new Set(workspace.tools.map(tool => tool.id)).size, workspace.tools.length, requiredId + " tool IDs must be unique.");
  for (const tool of workspace.tools) {
    assert.ok(tool.description.length > 45, requiredId + " tool descriptions must be substantive: " + tool.id);
    assert.ok(tool.steps.length >= 3, requiredId + " tools must contain at least three actionable steps: " + tool.id);
    assert.ok(tool.sources.length >= 1, requiredId + " tools must cite at least one source: " + tool.id);
  }
}
const styleSource = await readFile(new URL("../styles.css", import.meta.url), "utf8");
assert.match(styleSource, /\.tool-card > p\s*\{[^}]*font-size:\s*17px/s, "Exercise card descriptions must match the main reading size.");
assert.match(styleSource, /\.form-field textarea\s*\{[^}]*font-size:\s*17px/s, "Worksheet inputs must be comfortably readable.");
assert.match(styleSource, /\.dialog-method ol,?\s*\.worksheet-evidence p\s*\{[^}]*font-size:\s*16px/s, "Legacy instruction styles must remain readable.");
assert.match(styleSource, /\.practice-step-list li p\s*\{[^}]*font-size:\s*17px/s, "Exercise steps must use the main reading size in separate cards.");
assert.match(styleSource, /\.reflection-field-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2/s, "Reflection fields should use a structured desktop grid.");
assert.match(styleSource, /\.technique-expand summary/, "Technique steps should use progressive disclosure.");


assert.ok(EMOTIONS.length >= 25, "The expanded specialist-workspace set should be present.");
for (const required of ["chronic-pain","adult-adhd","body-focused-repetitive-behaviours","substance-use","eating-disorder-cbt","prolonged-grief","psychosis-cbt"]) {
  assert.ok(EMOTIONS.find(item => item.id === required), "Missing specialist workspace: " + required);
}
assert.ok(EMOTIONS.find(item => item.id === "psychosis-cbt").caution.toLowerCase().includes("not self-help treatment"));
assert.ok(EMOTIONS.find(item => item.id === "eating-disorder-cbt").caution.toLowerCase().includes("calorie"));
assert.ok(EMOTIONS.find(item => item.id === "substance-use").caution.toLowerCase().includes("withdrawal"));
assert.ok(EMOTIONS.find(item => item.id === "body-focused-repetitive-behaviours").tools.some(tool => tool.id === "bfrb-competing-response"));

assert.ok(CORE_TECHNIQUES.length >= 91, "The searchable technique directory should contain at least 91 methods.");
const appSource = await readFile(new URL("../app.js", import.meta.url), "utf8");
const indexSource = await readFile(new URL("../index.html", import.meta.url), "utf8");
assert.ok(indexSource.includes('data-tab="formulation"'), "The thoughts and beliefs hub must be accessible from the sidebar.");
assert.ok(appSource.includes("function renderTechniqueLibrary()"), "The technique directory renderer should exist.");
assert.ok(appSource.includes("function renderFormulationHub()"), "The dedicated formulation hub should render.");
assert.ok(appSource.includes("groupExercises(e.tools)"), "Emotion exercises should be grouped by their intervention family.");
assert.ok(appSource.includes("data-library-approach"), "Technique directory should filter independently by therapeutic approach.");
assert.ok(appSource.includes("searchKind === \"library\""), "Global search should navigate to technique-library results.");
assert.ok(appSource.includes("function renderSearchResults()"), "Global search should render direct workspace and exercise results.");
assert.ok(appSource.includes("data-search-tool"), "Search results should identify exact tools.");
assert.ok(appSource.includes("practice-step-list"), "The worksheet should render visually separated practice steps.");
assert.ok(appSource.includes("if (!saveState())"), "Save actions should not show success after local persistence fails.");
assert.ok(appSource.includes("${links(item.sources)}"), "The technique directory should use the shared source-link renderer.");
assert.ok(!appSource.includes("${sourceLinks(item.sources)}"), "The technique directory must not call an undefined source-link helper.");
assert.ok(appSource.includes('data-library-category'), "Technique category filters should be wired to the app.");


assert.equal(FORMULATION_SECTIONS.length, 7, "The formulation hub should cover its seven core knowledge sections.");
assert.equal(FORMULATION_TOOLS.length, 14, "The formulation hub should contain fourteen guided tools.");
assert.ok(FORMULATION_TOOLS.some(tool => tool.id === "formulation-image-capture" && exerciseFamily(tool) === "Imagery & memory methods"), "The formulation hub should include a bounded automatic mental-image exercise.");
assert.ok(FORMULATION_BOOKS.length >= 11, "The formulation hub should include a substantial foundational reading list.");
for (const section of FORMULATION_SECTIONS) for (const sourceId of section.sources) assert.ok(SOURCES[sourceId], "Unknown source " + sourceId + " used by formulation section " + section.id);
for (const book of FORMULATION_BOOKS) assert.ok(SOURCES[book.source], "Unknown source " + book.source + " used by formulation book " + book.title);
assert.ok(SOURCES.actComparativeNMA2026, "The formulation hub should include current comparative ACT evidence.");
const formulationIds = new Set();
for (const tool of FORMULATION_TOOLS) {
  assert.ok(!toolIds.has(tool.id) && !formulationIds.has(tool.id), "Duplicate formulation tool ID: " + tool.id);
  formulationIds.add(tool.id);
  assert.ok(WORKSHEETS[tool.worksheet], "Missing formulation worksheet: " + tool.worksheet);
  assert.ok(tool.steps.length >= 5 && tool.when && tool.evidence, "Incomplete formulation tool: " + tool.id);
  assert.ok(EXERCISE_FAMILY_ORDER.includes(exerciseFamily(tool)), "Unclassified formulation tool: " + tool.id);
  for (const sourceId of tool.sources) assert.ok(SOURCES[sourceId], "Unknown source " + sourceId + " used by formulation tool " + tool.id);
}
for (const emotion of EMOTIONS) {
  const grouped = groupExercises(emotion.tools);
  assert.equal(grouped.reduce((n,[,items]) => n + items.length, 0), emotion.tools.length, "Every exercise must appear in exactly one family for " + emotion.id);
  for (const tool of emotion.tools) assert.ok(EXERCISE_FAMILY_ORDER.includes(exerciseFamily(tool)), "Unclassified exercise: " + tool.id);
}

const techniqueIds = new Set();
const categories = new Set();
for (const technique of CORE_TECHNIQUES) {
  assert.ok(!techniqueIds.has(technique.id), "Duplicate technique directory entry: " + technique.id);
  techniqueIds.add(technique.id);
  categories.add(technique.category);
  assert.ok(technique.title && technique.description && technique.when && technique.caution, "Incomplete technique directory entry: " + technique.id);
  assert.ok(technique.methodType && technique.approach, "Technique family, method status, and approach must be explicit: " + technique.id);
  assert.ok(EXERCISE_FAMILY_ORDER.includes(technique.category), "Technique must use a primary exercise family: " + technique.id);
  for (const sourceId of technique.sources) assert.ok(SOURCES[sourceId], "Unknown source " + sourceId + " used by directory technique " + technique.id);
}
assert.equal(categories.size, 8, "The technique directory should use the eight standard exercise families.");
assert.ok(CORE_TECHNIQUES.every(item => item.methodType && item.approach && EXERCISE_FAMILY_ORDER.includes(item.category)), "Every directory entry must keep method family, therapeutic approach, and status separate.");
assert.ok(CORE_TECHNIQUES.some(item => item.methodType === "Specialist protocol component"), "Specialist methods must be explicitly classified.");
assert.ok(CORE_TECHNIQUES.some(item => item.methodType === "Core CBT method"), "Core CBT methods must be explicitly classified.");
assert.ok(CORE_TECHNIQUES.some(item => item.approach.includes("(MCT)")), "Metacognitive therapy methods must remain separately classified.");
assert.ok(CORE_TECHNIQUES.some(item => item.approach.includes("(ACT)")), "ACT methods must remain separately labelled.");
assert.ok(CORE_TECHNIQUES.some(item => item.approach.includes("(MBCT)")), "MBCT methods must remain separately labelled.");
assert.ok(CORE_TECHNIQUES.some(item => item.approach.includes("(CFT)")), "CFT methods must remain separately labelled.");
for (const required of ["dbt-wise-mind","dbt-improve","dbt-pros-cons","dbt-mindfulness-what-how","dbt-diary-card","dbt-self-validation","act-drop-anchor","rebt-rational-coping-statements"]) assert.ok(CORE_TECHNIQUES.some(item => item.id === required), "Missing expanded method: " + required);
assert.ok(CORE_TECHNIQUES.some(item => item.approach.includes("(DBT)")), "DBT methods must remain separately labelled.");
assert.ok(CORE_TECHNIQUES.some(item => item.approach.includes("(REBT)")), "REBT methods must remain separately labelled.");
assert.ok(CORE_TECHNIQUES.some(item => item.approach.includes("(MCT)")), "MCT methods must remain separately labelled.");
assert.ok(CORE_TECHNIQUES.every(item => ["Core CBT method","Specialist protocol component","Related therapy approach"].includes(item.methodType)), "Technique method status must use a consistent vocabulary.");
assert.ok(CORE_TECHNIQUES.some(item => item.approach.includes("(REBT)")), "REBT methods must remain separately classified.");
assert.ok(CORE_TECHNIQUES.some(item => item.approach.includes("(DBT)")), "DBT methods must remain separately classified.");
assert.ok(CORE_TECHNIQUES.some(item => item.approach.includes("Schema therapy")), "Schema-therapy methods must remain separately classified.");

for (const [id, source] of Object.entries(SOURCES)) {
  assert.ok(source.label && source.citation, "Incomplete source metadata: " + id);
  assert.match(source.url, /^https:\/\//, "Source URL must use HTTPS: " + id);
}

assert.ok(EMOTIONS.find(item => item.id === "panic").caution.toLowerCase().includes("do not deliberately induce"));
assert.ok(EMOTIONS.find(item => item.id === "trauma").caution.toLowerCase().includes("do not use this site"));
assert.ok(EMOTIONS.find(item => item.id === "ocd").caution.toLowerCase().includes("self-directed"));
assert.ok(EMOTIONS.find(item => item.id === "sleep").caution.toLowerCase().includes("sleep restriction"));
assert.ok(EMOTIONS.find(item => item.id === "jealousy").caution.toLowerCase().includes("tracking"));

console.log("CBT smoke tests passed: " + EMOTIONS.length + " workspaces, " + toolIds.size + " interactive tools, " + CORE_TECHNIQUES.length + " technique directory entries, " + Object.keys(SOURCES).length + " references.");
