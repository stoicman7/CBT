import assert from "node:assert/strict";
import { EMOTIONS, SOURCES, WORKSHEETS } from "../data.js";

assert.ok(EMOTIONS.length >= 15, "The library should contain a broad set of emotion spaces.");
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

for (const [id, source] of Object.entries(SOURCES)) {
  assert.ok(source.label && source.citation, "Incomplete source metadata: " + id);
  assert.match(source.url, /^https:\/\//, "Source URL must use HTTPS: " + id);
}

assert.ok(EMOTIONS.find(item => item.id === "panic").caution.toLowerCase().includes("do not deliberately induce"));
assert.ok(EMOTIONS.find(item => item.id === "trauma").caution.toLowerCase().includes("do not use this site"));
assert.ok(EMOTIONS.find(item => item.id === "ocd").caution.toLowerCase().includes("self-directed"));
assert.ok(EMOTIONS.find(item => item.id === "sleep").caution.toLowerCase().includes("sleep restriction"));
assert.ok(EMOTIONS.find(item => item.id === "jealousy").caution.toLowerCase().includes("surveillance"));

console.log("CBT smoke tests passed: " + EMOTIONS.length + " emotion spaces, " + toolIds.size + " interactive tools, " + Object.keys(SOURCES).length + " references.");
