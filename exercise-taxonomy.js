export const EXERCISE_FAMILY_ORDER = [
  "Assessment & formulation",
  "Cognitive methods",
  "Behavioural methods",
  "Imagery & memory methods",
  "Attention & metacognitive methods",
  "Emotion regulation & distress tolerance",
  "Acceptance & values",
  "Interpersonal & communication"
];

export const EXERCISE_FAMILY_NOTES = {
  "Assessment & formulation": "Map triggers, patterns, maintaining loops, and context before choosing an intervention.",
  "Cognitive methods": "Work with automatic thoughts, appraisals, assumptions, rules, and beliefs.",
  "Behavioural methods": "Change action patterns through practice, activity, approach, experiments, and skills rehearsal.",
  "Imagery & memory methods": "Work with mental images, memory representations, and experiential methods where appropriate and safely supported.",
  "Attention & metacognitive methods": "Notice where attention goes and change unhelpful worry, rumination, checking, or replay loops.",
  "Emotion regulation & distress tolerance": "Manage arousal, urges, and intense emotion so an effective response becomes possible.",
  "Acceptance & values": "Make room for difficult internal experiences and choose safe actions linked to personal values.",
  "Interpersonal & communication": "Practise requests, boundaries, repair, and respectful communication."
};

const FAMILY_ALIASES = {
  "Emotion regulation": "Emotion regulation & distress tolerance",
  "Emotion regulation / distress tolerance": "Emotion regulation & distress tolerance",
  "Interpersonal methods": "Interpersonal & communication",
  "Behavioural & exposure": "Behavioural methods",
  "Imagery & memory": "Imagery & memory methods"
};

export function exerciseFamily(tool) {
  const declared = FAMILY_ALIASES[tool.family] || tool.family;
  if (declared && EXERCISE_FAMILY_ORDER.includes(declared)) return declared;

  const t = (tool.id + " " + tool.title + " " + tool.description).toLowerCase();

  if (/(imagery|rescripting|visualisation|visualization|chair.work|mental.image)/.test(t)) return "Imagery & memory methods";
  if (/(values?|valued|acceptance|willingness|defusion|unhook|committed.action|toward.move|towards.move)/.test(t)) return "Acceptance & values";
  if (/(behavioural.experiment|behavioral.experiment|experiment|exposure|avoidance|graded.task|approach|practice|habit|schedule|activation|stimulus.control|pacing|rehears|task.start|pattern.break|learning.review)/.test(t)) return "Behavioural methods";
  if (/(boundary|request|relationship|refusal|assertive|communication|repair|interpersonal|accommodation|apology|validation|dear.man|give.skill|self.respect)/.test(t)) return "Interpersonal & communication";
  if (/(worry|ruminat|replay|attention|mindful|checking|reassurance|post.event|mode.shift|thought.loop|mental.ritual|detached.mindfulness)/.test(t)) return "Attention & metacognitive methods";
  if (/(arousal|pause|urge|coping|recovery|regulation|distress|reset|calm|vulnerability|emotion|tolerance|grounding|self.sooth|stop.skill|crisis.survival)/.test(t)) return "Emotion regulation & distress tolerance";
  if (/(thought|belief|prediction|reappraisal|interpret|rule|standard|responsibility|evidence|story|label|facts|continuum|meaning|self-esteem|catastroph|attribution|assumption|demand|abcde|appraisal)/.test(t)) return "Cognitive methods";
  if (/(map|cycle|chain|audit|diary|monitor|track|trigger|warning|inventory|functional.analysis|record|formulation|assessment)/.test(t)) return "Assessment & formulation";
  return "Assessment & formulation";
}

export function groupExercises(tools) {
  const groups = new Map();
  for (const tool of tools) {
    const family = exerciseFamily(tool);
    if (!groups.has(family)) groups.set(family, []);
    groups.get(family).push(tool);
  }
  return EXERCISE_FAMILY_ORDER.filter(family => groups.has(family)).map(family => [family, groups.get(family)]);
}
