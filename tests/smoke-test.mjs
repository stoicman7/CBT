import assert from "node:assert/strict";
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

assert.ok(toolIds.size >= 113, "The library should contain at least 113 interactive tools.");
assert.ok(EMOTIONS.find(item => item.id === "health-anxiety"), "Health anxiety workspace should be present.");
assert.ok(EMOTIONS.find(item => item.id === "health-anxiety").tools.length >= 3, "Health anxiety needs dedicated tools.");
assert.ok(EMOTIONS.find(item => item.id === "health-anxiety").caution.toLowerCase().includes("medical care"), "Health anxiety must preserve medical-care safeguards.");

assert.ok(EMOTIONS.length >= 25, "The expanded specialist-workspace set should be present.");
for (const required of ["chronic-pain","adult-adhd","body-focused-repetitive-behaviours","substance-use","eating-disorder-cbt","prolonged-grief","psychosis-cbt"]) {
  assert.ok(EMOTIONS.find(item => item.id === required), "Missing specialist workspace: " + required);
}
assert.ok(EMOTIONS.find(item => item.id === "psychosis-cbt").caution.toLowerCase().includes("not self-help treatment"));
assert.ok(EMOTIONS.find(item => item.id === "eating-disorder-cbt").caution.toLowerCase().includes("calorie"));
assert.ok(EMOTIONS.find(item => item.id === "substance-use").caution.toLowerCase().includes("withdrawal"));
assert.ok(EMOTIONS.find(item => item.id === "body-focused-repetitive-behaviours").tools.some(tool => tool.id === "bfrb-competing-response"));

assert.ok(CORE_TECHNIQUES.length >= 49, "The searchable technique directory should contain at least 49 methods.");
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
