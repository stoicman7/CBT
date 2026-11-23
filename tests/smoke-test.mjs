import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { EMOTIONS, SOURCES, WORKSHEETS } from "../data.js";
import { CORE_TECHNIQUES } from "../technique-library.js";

assert.ok(EMOTIONS.length >= 25, "The library should contain a broad set of emotion spaces.");
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

assert.ok(toolIds.size >= 159, "The library should contain at least 159 interactive tools.");
assert.ok(EMOTIONS.find(item => item.id === "health-anxiety"), "Health anxiety workspace should be present.");
assert.ok(EMOTIONS.find(item => item.id === "health-anxiety").tools.length >= 3, "Health anxiety needs dedicated tools.");
assert.ok(EMOTIONS.find(item => item.id === "health-anxiety").caution.toLowerCase().includes("medical care"), "Health anxiety must preserve medical-care safeguards.");
for (const prefix of ["anger-trigger","anger-early","anger-rumination","anger-boundary","anger-consequence","anger-repair","stress-demand","stress-problem","stress-time","stress-perfectionism","stress-recovery","stress-worry","anxiety-maintenance","anxiety-reassurance","anxiety-attention","anxiety-coping","anxiety-post","anxiety-behavioural","fear-expectancy","fear-context","fear-safety","fear-approach","fear-imaginal","fear-learning","anger-interpretation-check","anger-need-request","anger-pause-return","anger-vulnerability-plan","stress-control-influence-map","stress-priority-triage","stress-anticipatory-plan","stress-workload-conversation","anxiety-avoidance-cost-map","anxiety-worry-trigger-chain","anxiety-coping-evidence-log","anxiety-valued-approach-step","fear-real-risk-check","fear-coping-prediction-review","fear-values-approach-choice","fear-setback-reengagement","social-anxiety-safety-map","social-anxiety-anticipatory-review","social-anxiety-conversation-experiment","social-anxiety-impression-evidence","social-anxiety-core-rule-test","social-anxiety-video-feedback-prep"]) {
  const tool = EMOTIONS.flatMap(item => item.tools).find(item => item.id.startsWith(prefix));
  assert.ok(tool && tool.steps.length >= 5, "New focused-audit tools must contain at least five steps: " + prefix);
}


const socialWorkspace = EMOTIONS.find(item => item.id === "social-anxiety");
assert.ok(socialWorkspace && socialWorkspace.tools.length >= 9, "Social anxiety needs at least nine dedicated tools.");
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

assert.ok(CORE_TECHNIQUES.length >= 49, "The searchable technique directory should contain at least 49 methods.");
const appSource = await readFile(new URL("../app.js", import.meta.url), "utf8");
assert.ok(appSource.includes("function renderTechniqueLibrary()"), "The technique directory renderer should exist.");
assert.ok(appSource.includes("function renderSearchResults()"), "Global search should render direct workspace and exercise results.");
assert.ok(appSource.includes("data-search-tool"), "Search results should identify exact tools.");
assert.ok(appSource.includes("practice-step-list"), "The worksheet should render visually separated practice steps.");
assert.ok(appSource.includes("if (!saveState())"), "Save actions should not show success after local persistence fails.");
assert.ok(appSource.includes("${links(item.sources)}"), "The technique directory should use the shared source-link renderer.");
assert.ok(!appSource.includes("${sourceLinks(item.sources)}"), "The technique directory must not call an undefined source-link helper.");
assert.ok(appSource.includes('data-library-category'), "Technique category filters should be wired to the app.");

const techniqueIds = new Set();
const categories = new Set();
for (const technique of CORE_TECHNIQUES) {
  assert.ok(!techniqueIds.has(technique.id), "Duplicate technique directory entry: " + technique.id);
  techniqueIds.add(technique.id);
  categories.add(technique.category);
  assert.ok(technique.title && technique.description && technique.when && technique.caution, "Incomplete technique directory entry: " + technique.id);
  assert.ok(technique.classification, "Technique classification missing: " + technique.id);
  for (const sourceId of technique.sources) assert.ok(SOURCES[sourceId], "Unknown source " + sourceId + " used by directory technique " + technique.id);
}
assert.ok(categories.size >= 6, "The technique directory should cover at least six method families.");
assert.ok(CORE_TECHNIQUES.some(item => item.classification === "Specialist protocol"), "Specialist methods must be explicitly classified.");
assert.ok(CORE_TECHNIQUES.some(item => item.classification === "Core CBT"), "Core CBT methods must be explicitly classified.");
assert.ok(CORE_TECHNIQUES.some(item => item.classification === "Metacognitive therapy"), "Related therapies must remain separately classified.");
assert.ok(CORE_TECHNIQUES.some(item => item.classification === "Acceptance and commitment therapy"), "ACT methods must remain separately classified.");

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
