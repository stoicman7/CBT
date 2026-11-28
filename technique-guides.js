import { CORE_TECHNIQUES } from "./technique-library.js";

export const TECHNIQUE_GUIDES = {
  "formulation-5areas": {
    "aim": "Build a shared, testable picture of how context, appraisals, emotion, physiology and actions interact.",
    "steps": [
      "Choose one recent episode and describe the context in observable terms.",
      "Record the thought or image and the meaning it carried.",
      "Name each emotion and rate its intensity; note bodily responses.",
      "Describe actions, avoidance, checking or reassurance.",
      "Draw only links supported by the example, including feedback loops and external conditions.",
      "Choose one change point and revise the map after testing it."
    ],
    "questions": [
      "What changed first?",
      "What did the response help with immediately?",
      "What keeps the cycle going outside the person?"
    ],
    "review": "A useful formulation predicts where a small change may alter the cycle and remains open to revision.",
    "pitfalls": "Do not make the five areas a one-way causal claim or imply that external adversity is only a thinking problem."
  },
  "functional-analysis": {
    "aim": "Understand what precedes and follows a behaviour, including the function it serves in context.",
    "steps": [
      "Define the behaviour precisely, without a moral label.",
      "Record the antecedent: setting, event, internal cue and vulnerabilities.",
      "Describe the action itself in observable terms.",
      "Map immediate and delayed consequences separately.",
      "Ask what the behaviour obtains, avoids, changes or communicates.",
      "Identify a feasible alternative response or environmental adjustment and review its effects."
    ],
    "questions": [
      "What happened just before?",
      "What changed immediately after?",
      "What need or function did the behaviour serve?"
    ],
    "review": "Look for a repeatable pattern across examples while preserving exceptions and context.",
    "pitfalls": "Do not infer motive from one incident or ignore reinforcement, access, power, sensory needs or material conditions."
  },
  "self-monitoring": {
    "aim": "Collect a small, relevant sample of real-world data when memory or general impressions are unreliable.",
    "steps": [
      "Choose one question the record should answer and a short review period.",
      "Select only the few variables needed: context, cue, thought, feeling, action or outcome.",
      "Use brief, neutral entries close to the event where practical.",
      "Record exceptions and missing data rather than filling gaps from memory.",
      "Review at the planned time for patterns that affect the formulation.",
      "Stop or simplify if recording increases checking, rumination, shame or symptom preoccupation."
    ],
    "questions": [
      "What decision will this information help make?",
      "What is the smallest useful record?",
      "Is monitoring itself becoming part of the problem?"
    ],
    "review": "The record should inform one practical decision, not become a second job or a ritual.",
    "pitfalls": "Excessive tracking can increase monitoring and compulsive certainty-seeking; use a defined purpose and end point."
  },
  "guided-discovery": {
    "aim": "Help the person examine an appraisal and generate their own evidence-based understanding through collaboration.",
    "steps": [
      "Agree on one question that matters to the person now.",
      "Clarify the thought in the person's own words and what each phrase means.",
      "Explore evidence that supports the thought and evidence that complicates it.",
      "Ask what another fair-minded perspective might notice without supplying the answer.",
      "Consider implications of each interpretation and what remains uncertain.",
      "Summarise the person's own conclusion and decide whether action or an experiment is needed."
    ],
    "questions": [
      "What makes that conclusion seem true?",
      "What information might be missing?",
      "What would you say to someone you care about in the same situation?"
    ],
    "review": "The person should leave with a more precise question or credible conclusion, not a therapist-approved slogan.",
    "pitfalls": "Avoid leading questions, cross-examination, reassurance, debate or pressure to reach a positive alternative."
  },
  "downward-arrow": {
    "aim": "Explore the personal meaning attached to a thought and identify tentative assumptions or core-belief themes.",
    "steps": [
      "Start with one specific automatic thought from a recent situation.",
      "Ask once: if that thought were true, what would it mean about the person or situation?",
      "Explore the next meaning only if it remains useful and tolerable.",
      "Write each answer verbatim and distinguish a fear, rule, value, memory and broad belief.",
      "Check whether the theme recurs in independent situations and note counterexamples.",
      "Stop when inquiry becomes repetitive, speculative, shaming or destabilising."
    ],
    "questions": [
      "What would be the hardest part if this were true?",
      "What does this seem to say about you, others or the future?",
      "Where else does this theme appear—and where does it not?"
    ],
    "review": "A candidate belief is more credible when it recurs across situations and helps explain coping patterns; it remains a hypothesis.",
    "pitfalls": "There is no guaranteed hidden answer. Do not force childhood explanations or repeatedly probe painful meanings."
  },
  "core-belief-map": {
    "aim": "Map recurring global conclusions and the conditional rules and coping strategies organised around them.",
    "steps": [
      "Collect examples from different situations, relationships and time periods.",
      "Write the recurring self-, other- or world-related conclusion in the person's own language.",
      "Identify related conditional assumptions, attitudes and rules.",
      "Map how the belief influences attention, memory, predictions and coping.",
      "Record supporting evidence and examples that do not fit.",
      "Rate conviction by context and plan a fair, safe test or new source of information."
    ],
    "questions": [
      "What rule seems to govern your response?",
      "What do you predict if you do not follow it?",
      "What evidence does the belief leave out?"
    ],
    "review": "A useful map explains several episodes without reducing the person to a label.",
    "pitfalls": "Do not infer a stable core belief from one episode or ignore real experiences of harm and exclusion."
  },
  "cognitive-distortions": {
    "aim": "Use common thinking-pattern labels as prompts for curiosity, then evaluate the actual appraisal.",
    "steps": [
      "Write the exact thought before naming a pattern.",
      "Ask what conclusion is being drawn and from which facts.",
      "Check whether a familiar pattern may be present, such as mind-reading or overgeneralisation.",
      "Look for context, base rates, missing information and alternative explanations.",
      "Decide whether the thought is inaccurate, partly accurate, uncertain or accurate but difficult.",
      "Choose a proportionate response based on evidence, not the label."
    ],
    "questions": [
      "What is the inference here?",
      "What would count as evidence against it?",
      "Could this be accurate in this particular context?"
    ],
    "review": "The result should be a more precise appraisal, not simply a different distortion label.",
    "pitfalls": "Do not use labels as diagnoses or to discredit accurate perceptions of danger, discrimination or disrespect."
  },
  "thought-record": {
    "aim": "Evaluate one emotionally important automatic thought against the full evidence and develop a credible response.",
    "steps": [
      "Describe the specific situation and select one emotion to examine.",
      "Record the automatic thought or image exactly as it appeared; rate conviction and emotion intensity.",
      "List concrete evidence supporting the thought, not interpretations repeated as facts.",
      "List evidence that complicates it, exceptions and information still unknown.",
      "Write a balanced response that includes difficult facts and what they do not prove.",
      "Re-rate conviction and emotion; choose an action and review what was learned."
    ],
    "questions": [
      "What is the strongest evidence for this thought?",
      "What is the strongest evidence that complicates it?",
      "What would be a fair, complete summary?"
    ],
    "review": "Check conviction, emotion and action again; no mood change is required for the exercise to be useful.",
    "pitfalls": "Avoid forced positivity, debating every intrusive thought or repeated records that become reassurance rituals."
  },
  "decatastrophising": {
    "aim": "Clarify a feared outcome and distinguish its probability, impact and coping demands.",
    "steps": [
      "State the feared event in specific, observable terms.",
      "Separate possibility from probability and identify the time frame.",
      "Estimate likely impact while considering ordinary and worst-case outcomes separately.",
      "Identify resources, supports, choices and coping options if it occurred.",
      "Consider what could reduce likelihood or impact through practical action.",
      "Write a realistic contingency plan and leave unknowable uncertainty unresolved."
    ],
    "questions": [
      "What exactly do you fear will happen?",
      "How likely is it, given the available evidence?",
      "If it happened, what could you do next?"
    ],
    "review": "The goal is a proportionate appraisal and a usable contingency plan, not certainty that nothing bad will happen.",
    "pitfalls": "Do not minimise real dangers or substitute this exercise for medical, legal, safeguarding or safety advice."
  },
  "reattribution": {
    "aim": "Develop a more balanced account of responsibility by identifying multiple contributing factors.",
    "steps": [
      "Define the outcome and separate what is known from assumptions about blame.",
      "List people, circumstances, timing, resources and constraints that contributed.",
      "Estimate each contribution using evidence rather than guilt or anger intensity.",
      "Compare the full picture with the original single-cause explanation.",
      "Identify what responsibility genuinely belongs to the person and what belongs elsewhere.",
      "Choose proportionate repair, boundary-setting or practical action."
    ],
    "questions": [
      "What else contributed?",
      "What was within your control at the time?",
      "What responsibility remains yours—and what does not?"
    ],
    "review": "A more accurate account should clarify ownership and support appropriate action without erasing accountability.",
    "pitfalls": "Never use a responsibility pie to excuse abuse, coercion, deliberate harm or systemic injustice."
  },
  "continuum": {
    "aim": "Replace a global, all-or-nothing judgement with a specific scale anchored in observable examples.",
    "steps": [
      "Define the exact quality or behaviour being judged.",
      "Set realistic lower and upper anchors without making them moral judgements.",
      "Create intermediate anchors using concrete examples.",
      "Place the current example using observable evidence.",
      "Compare the evidence with the original absolute label.",
      "Identify what a more nuanced description would mean behaviourally."
    ],
    "questions": [
      "What would 0 and 100 actually look like?",
      "What examples belong in the middle?",
      "What does this rating say about one behaviour—not your worth?"
    ],
    "review": "The person should describe the issue with more precision and less global language.",
    "pitfalls": "Do not turn the scale into a score of human value or compare people as if worth were measurable."
  },
  "advantages-disadvantages": {
    "aim": "Make the short- and long-term functions of a belief or behaviour visible before deciding whether to change it.",
    "steps": [
      "Define the belief, rule or behaviour being considered.",
      "List immediate advantages and costs of keeping it.",
      "List immediate advantages and costs of changing it.",
      "Add delayed consequences for relationships, functioning, health and values.",
      "Include what the strategy protects and what it prevents the person from learning.",
      "Choose a small, safe trial or decide to retain, adapt or replace the strategy."
    ],
    "questions": [
      "What relief does this give right now?",
      "What does it cost over time?",
      "What would a safer, more flexible alternative preserve?"
    ],
    "review": "The review should explain the function of the strategy and identify a realistic next choice.",
    "pitfalls": "Do not treat all costs as equal or use a list to delay urgent protection or necessary action."
  },
  "coping-cards": {
    "aim": "Create a brief, personally credible cue for a response that has already been developed and tested.",
    "steps": [
      "Choose one predictable trigger or decision point.",
      "Select the balanced learning or skill that was useful in that context.",
      "Write it in the person's own everyday words, in one or two short sentences.",
      "Add one clear action cue rather than a string of reassurances.",
      "Check that the wording acknowledges uncertainty and real risks.",
      "Use it once at the relevant moment, then act; revise only after meaningful learning."
    ],
    "questions": [
      "What do you need to remember at that moment?",
      "What is the next effective action?",
      "Does this card help you act, or invite repeated checking?"
    ],
    "review": "A useful card prompts flexible action and is used less as the skill becomes familiar.",
    "pitfalls": "Do not turn cards into compulsive reassurance or a way to dismiss new symptoms."
  },
  "positive-data": {
    "aim": "Collect specific counterexamples that gradually test a broad negative belief.",
    "steps": [
      "State the core belief in neutral, tentative language.",
      "Choose a behaviour or experience that would count as relevant evidence against it.",
      "Record concrete actions, not generic praise or ratings from others.",
      "Include context, effort, impact and limitations honestly.",
      "Review entries periodically and compare them with the global belief.",
      "Build a nuanced belief that includes strengths and areas for growth."
    ],
    "questions": [
      "What did you do that does not fit the old belief?",
      "What evidence would you accept if it concerned someone else?",
      "What does this example show—and what does it not show?"
    ],
    "review": "Look for a more balanced, evidence-based self-view across repeated examples, not an instant reversal.",
    "pitfalls": "Do not create a compliment quota, ignore mistakes or use logging to seek approval."
  },
  "imagery-elicitation": {
    "aim": "Identify a brief mental image or memory that carries an emotional meaning when words are unavailable.",
    "steps": [
      "Choose a specific, recent and tolerable situation.",
      "Notice whether a picture, remembered scene, imagined audience or future event appeared.",
      "Describe only the brief image as it naturally appeared; do not embellish or replay it.",
      "Ask what the image seems to imply or predict.",
      "Separate the image's meaning from observable evidence in the present situation.",
      "Stop if distress rises sharply; use present-focused support or discuss it with a clinician."
    ],
    "questions": [
      "What picture flashed through your mind?",
      "What did the image seem to say about you or others?",
      "What information does the image leave out?"
    ],
    "review": "The image and its meaning become easier to distinguish from the current facts.",
    "pitfalls": "Do not direct self-guided trauma-memory reliving, flashback processing or imagery rescripting."
  },
  "behavioural-experiment": {
    "aim": "Test an idiosyncratic belief through a safe, observable action that can generate new information.",
    "steps": [
      "Specify the belief and why it matters in the person's formulation.",
      "Translate it into a prediction an observer could verify.",
      "Design the smallest relevant, ethical experiment with clear boundaries.",
      "Identify safety behaviours or biases that could invalidate the test; change them only when safe and agreed.",
      "Carry out the action and record what actually happened.",
      "Compare prediction and outcome, identify alternative explanations and plan follow-up learning."
    ],
    "questions": [
      "What would we see if the prediction were true?",
      "What would count as disconfirming or mixed evidence?",
      "What did you learn beyond whether the feared event happened?"
    ],
    "review": "Record prediction, observed outcome, degree of surprise and transferable learning; one experiment rarely settles a broad belief.",
    "pitfalls": "Experiments are not dares or exposure to hazards. Do not test medical, legal, consent or high-consequence risks."
  },
  "behavioural-activation": {
    "aim": "Restore contact with meaningful activity and reinforcement when low mood and withdrawal form a self-maintaining loop.",
    "steps": [
      "Map recent activity and mood without judging productivity.",
      "Notice withdrawal and loss of pleasure, mastery, connection or routine.",
      "Select a personally meaningful, realistic activity that fits current capacity.",
      "Schedule a specific time, place and first action; reduce one barrier.",
      "Carry it out without waiting for motivation to arrive first.",
      "Review completion, barriers and experience—not just mood."
    ],
    "questions": [
      "What has dropped out of life recently?",
      "Which activity offers connection, mastery, pleasure or meaning?",
      "What made the step easier or harder?"
    ],
    "review": "Track activity and functioning over time; mood may lag behind action.",
    "pitfalls": "Do not prescribe overactivity or imply depression is laziness. Adapt for disability, fatigue, poverty and caregiving."
  },
  "graded-task": {
    "aim": "Break a large or avoided task into observable steps that build capability and reduce overwhelm.",
    "steps": [
      "Define the task outcome and what counts as a first step.",
      "List the steps in order, making each small enough to start.",
      "Estimate effort and identify the easiest useful entry point.",
      "Schedule the first step and prepare materials or environment.",
      "Complete it, record what happened and decide whether to repeat or progress.",
      "If stuck, redesign the step instead of treating it as failure."
    ],
    "questions": [
      "What is the first action that takes only a few minutes?",
      "What is the obstacle: clarity, energy, skill, fear or access?",
      "What would make the next step one level easier?"
    ],
    "review": "Progress is measured by completed behaviours and learning about barriers, not perfect productivity.",
    "pitfalls": "Do not keep shrinking goals without examining structural barriers, fatigue, executive-function needs or unrealistic demands."
  },
  "structured-problem-solving": {
    "aim": "Resolve a practical, partly controllable problem through a sequenced decision process.",
    "steps": [
      "Define one problem in concrete terms and separate it from the emotions around it.",
      "Set a realistic goal and distinguish controllable from uncontrollable elements.",
      "Generate several options before evaluating them.",
      "Compare feasibility, cost, benefits, risks and values.",
      "Choose one option and break it into actions with responsibilities and timing.",
      "Try it, review the result and modify the plan or redefine the problem."
    ],
    "questions": [
      "What part can actually be influenced?",
      "What options have not been considered?",
      "What is the smallest action that tests the plan?"
    ],
    "review": "The outcome is a practical action and a review point, even if the entire problem cannot be solved.",
    "pitfalls": "Do not use endless analysis to seek certainty or assume an individual can solve structural problems alone."
  },
  "graded-exposure": {
    "aim": "Approach objectively safe avoided situations in a planned, repeated way to test predictions and build new learning.",
    "steps": [
      "Define the feared prediction and situations being avoided.",
      "Assess actual hazards separately from anxiety and identify sensible precautions.",
      "Build a collaborative hierarchy or choose a suitable experiment linked to the formulation.",
      "Agree how to approach the situation and which nonessential safety behaviours are maintaining fear.",
      "Repeat the approach and attend to what happens, not only anxiety level.",
      "Review prediction, outcome, learning and how the learning may generalise."
    ],
    "questions": [
      "What does the person predict will happen?",
      "What safety behaviour might prevent learning?",
      "What did the situation show, even if anxiety remained?"
    ],
    "review": "Track expectancy violation, new learning, approach and functioning—not just habituation.",
    "pitfalls": "Exposure is not flooding or entering real danger. Complex anxiety, trauma and OCD need protocol-specific care."
  },
  "interoceptive-exposure": {
    "aim": "In panic-focused CBT, test catastrophic interpretations of bodily sensations through clinician-planned, medically screened exercises.",
    "steps": [
      "Clarify the feared bodily sensation and catastrophic meaning in the panic formulation.",
      "Complete appropriate medical and risk screening with a qualified clinician.",
      "Select a protocol-specific exercise and agree precautions and monitoring.",
      "Make a clear prediction before the exercise.",
      "Conduct the exercise only under the clinician's agreed plan and observe the outcome.",
      "Review the feared meaning, new learning and remaining safety behaviours."
    ],
    "questions": [
      "What sensation is feared?",
      "What does the person predict the sensation means?",
      "What happened during the agreed exercise?"
    ],
    "review": "The clinical review focuses on the feared interpretation and learning, not making sensations disappear.",
    "pitfalls": "Never provide unsupervised instructions to induce breathlessness, dizziness, heart-rate changes or other symptoms."
  },
  "imaginal-exposure": {
    "aim": "Process avoided traumatic memories or feared scenarios within a validated, clinician-delivered protocol.",
    "steps": [
      "Confirm the indication and treatment formulation with a trauma-trained practitioner.",
      "Review stabilisation, current safety, dissociation, risk and consent.",
      "Agree on the manual, pacing, therapeutic rationale and session structure.",
      "Conduct memory or scenario processing only within the treatment protocol.",
      "Process meanings, emotions, avoidance and links to present functioning with practitioner support.",
      "Review learning, between-session support, risk and the next planned step."
    ],
    "questions": [
      "What makes this protocol appropriate now?",
      "How will current safety and dissociation be monitored?",
      "What meaning or avoidance process is being addressed?"
    ],
    "review": "Progress is reviewed against protocol outcomes and functioning, not self-directed exposure intensity.",
    "pitfalls": "This is not a self-guided journaling exercise or instruction to relive trauma."
  },
  "response-prevention": {
    "aim": "Within OCD treatment, reduce rituals and neutralising responses so feared uncertainty can be approached without completing compulsions.",
    "steps": [
      "Map obsessional triggers, overt and covert rituals, reassurance and avoidance.",
      "Agree a formulation-driven plan with an OCD-trained clinician.",
      "Identify a safe, proportionate exposure target and the response to prevent.",
      "Plan how to handle mental rituals, reassurance and family accommodation where relevant.",
      "Carry out the agreed exposure and response-prevention practice with appropriate support.",
      "Review learning, distress, ritual urges and the next clinically agreed step."
    ],
    "questions": [
      "What counts as the ritual—including mental neutralising?",
      "What uncertainty is the person practising allowing?",
      "What reassurance or accommodation may undermine learning?"
    ],
    "review": "Review whether rituals and avoidance are changing and functioning is expanding.",
    "pitfalls": "Do not prescribe ERP hierarchies or tell users to stop safety-critical medical monitoring. Specialist assessment is essential."
  },
  "stimulus-control": {
    "aim": "In CBT-I, strengthen the bed–sleep association by changing cues and responses that maintain wakefulness in bed.",
    "steps": [
      "Use only within an appropriate insomnia assessment and CBT-I plan.",
      "Review sleep pattern, sleep opportunity, routines, safety and relevant health factors.",
      "Agree specific stimulus-control instructions from the validated programme.",
      "Apply the agreed plan consistently while recording only information needed for review.",
      "Review adherence, sleep pattern and daytime effects with the clinician.",
      "Adjust for comorbidities, disability, medication, shift work or safety-sensitive occupations."
    ],
    "questions": [
      "What cues have become associated with wakefulness?",
      "Which instruction belongs to the clinician's CBT-I plan?",
      "What daytime safety or health factors affect suitability?"
    ],
    "review": "Progress is judged by sleep continuity and daytime functioning across time, not one night.",
    "pitfalls": "Do not give generic or restrictive sleep instructions without checking protocol and clinical suitability."
  },
  "habit-reversal": {
    "aim": "Reduce a repetitive habit through awareness of early links, competing responses and cue/environment changes.",
    "steps": [
      "Define the behaviour and its early warning signs without shame.",
      "Record context, sensory cues, urges and what happens immediately before it.",
      "Identify a safe competing response that is physically incompatible with the habit.",
      "Adjust stimuli or access to cues without punishment or painful restraint.",
      "Practise the response early and consistently, with agreed support.",
      "Review frequency, tissue damage, distress and barriers; seek specialist care when needed."
    ],
    "questions": [
      "What is the earliest detectable urge or movement?",
      "What competing response is safe and feasible?",
      "Which environmental cue can be changed?"
    ],
    "review": "Monitor behaviour and functional impact without excessive tracking.",
    "pitfalls": "Avoid punitive strategies, restraints, injury or treating the habit as a moral failure."
  },
  "role-play": {
    "aim": "Rehearse an interaction or skill in a controlled setting and use feedback to refine behaviour.",
    "steps": [
      "Define the interaction and the outcome the person wants.",
      "Identify relevant words, tone, posture and boundaries.",
      "Run a brief first attempt without interruption.",
      "Give specific, respectful feedback and identify one change.",
      "Repeat the role-play with the adjustment and consider different responses.",
      "Plan a safe real-world practice opportunity and review afterwards."
    ],
    "questions": [
      "What is the one sentence you need to say?",
      "What response do you expect, and how could you respond?",
      "What would make the rehearsal more realistic?"
    ],
    "review": "Look for greater clarity, confidence and behavioural flexibility—not perfect performance.",
    "pitfalls": "Do not rehearse confrontation where it could increase danger; choose safety planning instead."
  },
  "assertiveness": {
    "aim": "Communicate a need, request, refusal or boundary clearly while respecting both parties' rights.",
    "steps": [
      "Clarify the goal and whether direct communication is safe.",
      "Describe observable facts without accusation.",
      "State the feeling, need or impact briefly and specifically.",
      "Make a clear request or boundary with realistic options.",
      "Listen to the answer and negotiate where appropriate.",
      "Plan what you will do if the request is refused or the boundary is crossed."
    ],
    "questions": [
      "What do you want the other person to understand?",
      "What specific request can they answer?",
      "What boundary can you uphold yourself?"
    ],
    "review": "Review whether the message was clear and values-consistent, not whether the other person agreed.",
    "pitfalls": "Assertiveness does not guarantee compliance and may increase danger in abusive or coercive relationships."
  },
  "cognitive-rehearsal": {
    "aim": "Convert an intention into a brief mental and practical plan that anticipates obstacles without becoming endless rumination.",
    "steps": [
      "Specify the action and the situation in which it needs to happen.",
      "Imagine the sequence of observable actions once, briefly and realistically.",
      "Identify likely obstacles or points where the plan could fail.",
      "Create an if–then response for each important obstacle.",
      "Prepare materials, cues or support in the environment.",
      "Try the action and update the plan from actual feedback."
    ],
    "questions": [
      "What will you do first, where and when?",
      "What is the most likely obstacle?",
      "What will you do if it occurs?"
    ],
    "review": "The plan should reduce friction and lead to action; success is judged in the real situation.",
    "pitfalls": "Do not let rehearsal become repeated mental checking, perfectionistic preparation or avoidance."
  },
  "relaxation-training": {
    "aim": "Practise a chosen relaxation skill as an adjunct for tension or arousal when suitable.",
    "steps": [
      "Explain that relaxation is a skill, not a requirement to become calm.",
      "Choose a suitable method such as progressive muscle relaxation or gentle breathing.",
      "Learn the sequence with comfortable intensity and without straining.",
      "Notice tension and release or observe breathing without forcing it.",
      "Practise briefly at planned times, not only during crisis.",
      "Review comfort, usefulness and adverse reactions; adapt or stop if needed."
    ],
    "questions": [
      "Which bodily cue is the practice intended to address?",
      "Does body attention feel safe and tolerable?",
      "Is the practice being used flexibly or as a safety ritual?"
    ],
    "review": "Assess whether tension or functioning improves in the intended context.",
    "pitfalls": "Relaxation is not suitable for everyone and should not replace problem-solving, exposure learning or medical care."
  },
  "applied-relaxation": {
    "aim": "Use a structured applied-relaxation programme to recognise tension and deploy relaxation in everyday situations.",
    "steps": [
      "Complete clinical assessment and agree the treatment model with a trained practitioner.",
      "Learn progressive relaxation and identify early signs of tension.",
      "Practise shorter and more portable relaxation procedures under guidance.",
      "Apply the skill to progressively more realistic situations as directed.",
      "Review use, context and outcomes rather than relying on relaxation only at peak anxiety.",
      "Revise the programme with the practitioner if response is inadequate."
    ],
    "questions": [
      "What is the earliest cue of tension?",
      "Which level of practice has been learned?",
      "Is relaxation becoming a condition for facing situations?"
    ],
    "review": "Review skill acquisition and everyday functioning as part of structured treatment.",
    "pitfalls": "This is a treatment programme, not an isolated deep-breathing tip or universal substitute for CBT."
  },
  "activity-pacing": {
    "aim": "Balance activity and rest to reduce boom–bust cycles while preserving meaningful function in a personalised pain-care plan.",
    "steps": [
      "Map a typical activity pattern, including overactivity on good days and crashes afterwards.",
      "Select a meaningful activity and establish a sustainable starting level with the care team.",
      "Break activity into manageable periods with planned flexibility.",
      "Increase or adjust activity according to agreed function-based criteria, not a rigid rule.",
      "Record function, flare patterns and recovery needs without over-monitoring symptoms.",
      "Review pacing with the clinician and investigate new or worsening symptoms appropriately."
    ],
    "questions": [
      "What pattern leads to a flare or prolonged recovery?",
      "What level is sustainable across better and worse days?",
      "What matters enough to pace towards?"
    ],
    "review": "Review function, participation and predictability of activity over time.",
    "pitfalls": "Do not impose fixed limits or use pacing to dismiss new symptoms or replace medical assessment."
  },
  "craving-coping": {
    "aim": "Identify high-risk cues and prepare a recovery response within evidence-based substance-use treatment.",
    "steps": [
      "Map common triggers, internal states, access and high-risk situations.",
      "Clarify the urge, expected reward and short-term consequence anticipated.",
      "Prepare a coping response, refusal skill or route away from the cue.",
      "Identify support contacts and what to do if risk increases.",
      "Review the episode afterwards without shame and update the recovery plan.",
      "Coordinate with the treatment team about medication, withdrawal risk and relapse prevention."
    ],
    "questions": [
      "What cue tends to precede the urge?",
      "What does the substance promise in that moment?",
      "Who or what can interrupt the high-risk sequence?"
    ],
    "review": "Track functioning, risk and recovery-plan use with treatment support.",
    "pitfalls": "This is not withdrawal management, overdose care or a stand-alone addiction treatment."
  },
  "regular-eating": {
    "aim": "Support regular eating as a component of clinician-delivered CBT-ED, based on diagnosis and treatment plan.",
    "steps": [
      "Use only with an eating-disorder clinician and an agreed treatment plan.",
      "Clarify which eating pattern is being addressed and what medical monitoring is required.",
      "Follow the personalised structure set by the care team rather than app-generated targets.",
      "Record relevant thoughts, feelings and barriers only as directed.",
      "Discuss restriction, bingeing, compensatory behaviour or physical symptoms promptly with the team.",
      "Review adherence and adjustments collaboratively; do not change the plan independently."
    ],
    "questions": [
      "What does the clinical plan ask you to practise?",
      "What barrier needs practical support?",
      "What should be reported to the care team?"
    ],
    "review": "Review recovery, safety and adherence to specialist treatment, not app-generated weight or calorie metrics.",
    "pitfalls": "The app must not prescribe calories, weights, meal plans, dieting or compensatory behaviours."
  },
  "imagery-rescripting": {
    "aim": "A clinician-guided imagery procedure that updates the meaning and emotional response of a distressing image within a clear formulation.",
    "steps": [
      "Clarify the target image, current problem and rationale with a trained practitioner.",
      "Assess stability, dissociation, risk and readiness; agree pacing and consent.",
      "Use the treatment-specific imagery procedure rather than an improvised script.",
      "Develop a response or perspective that addresses the unmet need or meaning in the formulation.",
      "Return to the present and process the experience with the clinician.",
      "Review effects, adverse reactions and follow-up support before further work."
    ],
    "questions": [
      "What current belief or need is linked to the image?",
      "What safeguards and pacing are necessary?",
      "How will the session be closed and reviewed?"
    ],
    "review": "Outcomes require clinical review of the target problem, functioning and tolerability.",
    "pitfalls": "Do not provide self-guided trauma rescripting or present this as a universal treatment."
  },
  "relapse-prevention": {
    "aim": "Consolidate learning, detect early warning signs and plan proportionate responses to future setbacks.",
    "steps": [
      "List what has improved and which skills or changes contributed.",
      "Identify personal early warning signs and contexts that raise vulnerability.",
      "Distinguish a lapse or difficult day from a full return to the previous pattern.",
      "Write a short response plan with actions, supports and thresholds for seeking help.",
      "Identify skills that need occasional rehearsal and routines that protect progress.",
      "Schedule a review point and update the plan from lived experience."
    ],
    "questions": [
      "What are the earliest signs that things are slipping?",
      "What would you do within the first day or week?",
      "When would you ask for extra help?"
    ],
    "review": "A useful plan is brief, specific and increases confidence in responding to setbacks.",
    "pitfalls": "Avoid framing relapse as failure or assuming self-management is enough for severe or recurrent illness."
  },
  "between-session-practice": {
    "aim": "Translate a session insight into a small real-world practice task with a clear learning purpose.",
    "steps": [
      "Agree the skill or hypothesis the practice is intended to develop.",
      "Choose a specific context, action and time that fit the person's life.",
      "Define what to record and what not to monitor.",
      "Anticipate barriers and agree a fallback version of the task.",
      "Review what happened, including partial attempts and unexpected outcomes.",
      "Adjust the next task collaboratively rather than automatically assigning more work."
    ],
    "questions": [
      "What is the learning purpose?",
      "What is the smallest realistic version?",
      "What will we learn even if it does not go as planned?"
    ],
    "review": "The review should focus on learning and barriers, not compliance or perfection.",
    "pitfalls": "Practice should be collaborative and feasible; avoid blame when it is not completed."
  },
  "progress-review": {
    "aim": "Review whether the formulation, goals and intervention are producing meaningful change.",
    "steps": [
      "Return to agreed goals and identify what matters to the person now.",
      "Review repeated indicators of symptoms, functioning, quality of life and behaviour.",
      "Compare progress over time rather than one isolated good or bad day.",
      "Ask what has helped, what has not and what remains unexplained.",
      "Consider whether the formulation or treatment focus needs to change.",
      "Agree the next step, including assessment or referral if progress is insufficient."
    ],
    "questions": [
      "What has changed in daily life?",
      "What evidence suggests this method is or is not helping?",
      "What should we do differently?"
    ],
    "review": "Look at outcomes the person values and combine measures with lived experience.",
    "pitfalls": "Do not use a single score as a verdict or continue an ineffective approach without review."
  },
  "attention-training": {
    "aim": "In MCT, practise flexible control over attention rather than trying to force calm or suppress thoughts.",
    "steps": [
      "Explain the target: rigid self-focused attention and repetitive threat monitoring.",
      "Select a brief auditory environment with several distinct, safe sounds.",
      "Practise shifting attention deliberately between sounds and then widening attention.",
      "Notice the ability to shift and sustain attention, not whether anxiety disappears.",
      "Repeat only as prescribed within a coherent MCT formulation.",
      "Review whether the person can disengage from internal monitoring more flexibly."
    ],
    "questions": [
      "Where does attention become stuck?",
      "Can attention be shifted deliberately without suppressing thought?",
      "Does this serve the MCT formulation rather than become distraction?"
    ],
    "review": "Review attentional flexibility and the cognitive-attentional syndrome within treatment.",
    "pitfalls": "Do not present ATT as generic relaxation or a replacement for a full MCT protocol."
  },
  "detached-mindfulness": {
    "aim": "Notice thoughts as mental events without elaborating, suppressing or treating them as commands.",
    "steps": [
      "Identify a recurring worry or rumination cue.",
      "Label the event neutrally as a thought, image or mental process.",
      "Allow it to remain present without debating or completing the thought.",
      "Return attention to the chosen activity or external environment.",
      "Notice whether the mind has re-engaged and gently disengage again.",
      "Review the process rather than judging whether the thought disappeared."
    ],
    "questions": [
      "Can the thought be noticed without answering it?",
      "What happens when you do not elaborate the worry?",
      "Is attention more flexible afterwards?"
    ],
    "review": "The target is less engagement with repetitive processing, not thought suppression.",
    "pitfalls": "If the exercise becomes another effort to neutralise thoughts, revisit the MCT rationale with a trained practitioner."
  },
  "cognitive-defusion": {
    "aim": "Change the relationship to a thought so it has less automatic control over behaviour.",
    "steps": [
      "Identify a thought pulling behaviour away from a chosen direction.",
      "Name it as a thought: 'I am noticing the thought that…'.",
      "Experiment with a defusion method that feels useful and respectful.",
      "Notice the thought's words and effects without debating whether it is true.",
      "Reconnect with the present situation and identify a value-consistent action.",
      "Act with the thought present and review workability rather than symptom reduction."
    ],
    "questions": [
      "What is your mind telling you to do?",
      "Can you notice the thought as a thought?",
      "What action would serve your values even if the thought stays?"
    ],
    "review": "Review whether behaviour became more flexible, not whether the thought vanished.",
    "pitfalls": "Defusion is not denial, forced distancing or ignoring accurate warnings."
  },
  "values-clarification": {
    "aim": "Identify chosen life directions and translate them into observable qualities of action.",
    "steps": [
      "Explore life domains that matter without imposing social expectations.",
      "Describe qualities of action the person wants to embody in each domain.",
      "Distinguish values from goals and rules imposed by others.",
      "Choose one value that matters in the present context.",
      "Identify a small behaviour that expresses it within real constraints.",
      "Review whether the action felt chosen and meaningful; revise if it was compliance."
    ],
    "questions": [
      "What kind of person do you want to be in this situation?",
      "Would this still matter without praise or certainty?",
      "What small action expresses it today?"
    ],
    "review": "A value should guide repeated choices and remain freely chosen and contextual.",
    "pitfalls": "Do not turn values into moral demands or targets that override illness, safety, disability or constraints."
  },
  "distress-tolerance": {
    "aim": "Use short-term strategies to survive an intense moment without making the situation more dangerous or worse.",
    "steps": [
      "Check immediate safety and whether urgent help is needed.",
      "Name the emotion, urge and problem that can or cannot be changed now.",
      "Choose one safe distress-tolerance skill that matches the situation.",
      "Practise it for a defined period and notice its effect without demanding calm.",
      "Return to problem-solving or interpersonal action when the crisis intensity has passed.",
      "Review which skill was tolerable and update a broader plan with support if episodes recur."
    ],
    "questions": [
      "Is the situation safe right now?",
      "What must be survived, and what can be changed later?",
      "Which skill fits rather than escalates the situation?"
    ],
    "review": "Review whether the strategy enabled effective next steps and reduced impulsive action.",
    "pitfalls": "Skills are not crisis care. High-risk distress, self-harm or suicidality require professional or emergency support."
  },
  "mindfulness-decentering": {
    "aim": "Practise noticing thoughts and feelings as passing experiences rather than facts or commands.",
    "steps": [
      "Choose a brief, tolerable mindfulness practice and explain its purpose.",
      "Notice present sensations, thoughts and feelings as they arise.",
      "Label mental activity gently without analysing its content.",
      "Allow changes in experience without trying to force them away.",
      "Widen attention to the present task or surroundings.",
      "Review whether the person can respond more flexibly to thoughts and mood shifts."
    ],
    "questions": [
      "Can you notice the thought rather than become the thought?",
      "What comes and goes when you stop elaborating?",
      "Does the practice help you choose your next response?"
    ],
    "review": "Look for a more decentered relationship to thoughts and improved response flexibility.",
    "pitfalls": "Mindfulness can be uncomfortable; adapt or stop if dissociation, panic or trauma activation increases."
  },
  "psychoeducation": {
    "aim": "Build an accurate, collaborative understanding of the problem and rationale for treatment.",
    "steps": [
      "Ask what the person already understands and what explanation they find useful.",
      "Offer a concise model using their own recent example.",
      "Explain what the model does and does not claim.",
      "Check understanding and invite disagreement or missing context.",
      "Link the explanation to one practical skill or experiment.",
      "Revisit the model as new information emerges."
    ],
    "questions": [
      "What makes sense in this explanation?",
      "What does not fit your experience?",
      "How would this model change what we try next?"
    ],
    "review": "Good psychoeducation increases shared understanding and informed choice, not passive agreement.",
    "pitfalls": "Avoid jargon, overgeneralisation or implying that a model explains everything."
  },
  "collaborative-agenda": {
    "aim": "Agree a focused, shared plan for a session or learning period.",
    "steps": [
      "Ask what feels most important to address today.",
      "Review previously agreed goals and urgent developments.",
      "Turn broad concerns into one or two workable topics.",
      "Agree the order and expected use of the time.",
      "Check whether the agenda reflects the person's priorities.",
      "Summarise decisions and leave space for emerging concerns."
    ],
    "questions": [
      "What would make this time useful?",
      "What needs attention first?",
      "What should we make sure not to miss?"
    ],
    "review": "A useful agenda gives direction while remaining flexible and collaborative.",
    "pitfalls": "Do not impose a fixed agenda or treat structure as more important than safety or priorities."
  },
  "session-feedback": {
    "aim": "Use feedback to check the person's experience and improve the shared work.",
    "steps": [
      "Ask what felt useful, confusing, uncomfortable or irrelevant.",
      "Invite feedback about pace, collaboration, cultural fit and accessibility.",
      "Listen without defending the intervention or pressuring agreement.",
      "Clarify misunderstandings and repair ruptures where possible.",
      "Agree a practical adjustment for next time.",
      "Review whether the adjustment improved engagement or outcomes."
    ],
    "questions": [
      "What did I miss?",
      "Was anything too fast, unclear or unhelpful?",
      "What should we change?"
    ],
    "review": "Feedback should affect the plan and strengthen collaboration.",
    "pitfalls": "Do not solicit feedback as a formality or penalise disagreement."
  },
  "scheduled-worry": {
    "aim": "Set aside a defined time to address practical worries while reducing repeated engagement outside that period.",
    "steps": [
      "Notice a worry and briefly record its topic without solving it immediately.",
      "Check whether there is an urgent action or safety issue now.",
      "If not urgent, return to the present task and defer detailed thinking to the agreed worry period.",
      "At that time, separate solvable problems from hypothetical uncertainty.",
      "Take a concrete problem-solving step where possible; practise allowing uncertainty where no action is available.",
      "Review whether postponement helps or becomes another checking ritual."
    ],
    "questions": [
      "Does this worry require action now?",
      "What part is solvable and what part is hypothetical?",
      "What would happen if you did not continue thinking about it?"
    ],
    "review": "Look for less time spent in unproductive worry and more timely action on solvable problems.",
    "pitfalls": "Do not defer urgent medical or safeguarding action. Worry postponement differs across CBT and MCT."
  },
  "systematic-desensitisation": {
    "aim": "A clinician-guided behaviour-therapy method pairing graded approach with a relaxation response in selected presentations.",
    "steps": [
      "Assess the target fear and confirm the protocol is suitable.",
      "Teach and practise a tolerable relaxation procedure if part of the model.",
      "Construct a graded hierarchy of objectively safe cues or situations.",
      "Approach items in the planned sequence with practitioner guidance.",
      "Review fear, expectancy and approach while avoiding real hazards.",
      "Reassess whether the method remains appropriate or a different exposure model is indicated."
    ],
    "questions": [
      "What is the feared cue at each level?",
      "What makes the hierarchy safe and graded?",
      "What learning occurred at this step?"
    ],
    "review": "Track approach and the intended learning, not only immediate anxiety reduction.",
    "pitfalls": "This is a specialised protocol with varying relevance; do not conflate it with all forms of modern exposure."
  },
  "coping-skills-training": {
    "aim": "Teach, model and rehearse a specific skill that addresses a defined vulnerability or situation.",
    "steps": [
      "Identify the behaviour or capability that needs development.",
      "Explain and demonstrate the skill in concrete terms.",
      "Break it into observable components and practise each part.",
      "Use feedback and repeat in a supportive setting.",
      "Plan a real-world practice opportunity and identify likely barriers.",
      "Review use and outcome, then refine the skill."
    ],
    "questions": [
      "What exactly needs to be learned?",
      "Can the skill be observed and rehearsed?",
      "What support helps transfer it to daily life?"
    ],
    "review": "The skill should generalise to the situations for which it was selected.",
    "pitfalls": "Do not teach generic coping tips without linking them to a formulation or reviewing transfer."
  },
  "rebt-abcde": {
    "aim": "Use the REBT ABCDE framework to identify the belief process behind an emotional or behavioural consequence.",
    "steps": [
      "A: describe the activating event without adding interpretation.",
      "B: identify beliefs, especially rigid demands, awfulising, low frustration tolerance or global rating.",
      "C: describe emotional and behavioural consequences.",
      "D: dispute the belief for logic, evidence and practical usefulness.",
      "E: formulate a flexible preference, tolerance and unconditional acceptance.",
      "Choose effective action while preserving boundaries and realistic needs."
    ],
    "questions": [
      "What did you demand of yourself, others or reality?",
      "Is the demand logical and supported by facts?",
      "What preference could replace the demand?"
    ],
    "review": "Review both the belief and the action that follows; rational beliefs need not produce pleasant emotions immediately.",
    "pitfalls": "Do not dispute real harm or use acceptance to excuse abusive behaviour."
  },
  "rebt-disputation": {
    "aim": "Examine a rigid belief through logical, empirical and pragmatic questions and build a flexible alternative.",
    "steps": [
      "Write the belief as it appears, including absolutist words.",
      "Test its logic: does a preference imply a necessity?",
      "Test its evidence: what facts support and challenge it?",
      "Test its usefulness: does holding it help achieve chosen goals?",
      "Formulate a flexible preference and a high-frustration-tolerance response.",
      "Practise the new philosophy in a concrete situation."
    ],
    "questions": [
      "Where is the must or demand?",
      "What evidence makes it a necessity rather than a preference?",
      "What happens when you hold the belief?"
    ],
    "review": "A useful alternative is rational, believable and action-guiding, not merely more pleasant.",
    "pitfalls": "Avoid arguing with a person's pain or replacing one rigid demand with another."
  },
  "rebt-unconditional-acceptance": {
    "aim": "Separate the worth of a human being from the evaluation of a specific action, trait or outcome.",
    "steps": [
      "Identify the global rating being applied to self or another person.",
      "Specify the behaviour, consequence or quality that can legitimately be evaluated.",
      "Notice how one action is being generalised to the whole person.",
      "Replace global worth-rating with a specific, nuanced evaluation.",
      "Preserve accountability, boundaries, repair and the right to disengage.",
      "Practise a statement accepting human fallibility without approving harmful behaviour."
    ],
    "questions": [
      "What exactly was wrong or harmful?",
      "Does one action define an entire person?",
      "What accountability or boundary is still required?"
    ],
    "review": "Look for less global condemnation alongside clear responsibility and choices.",
    "pitfalls": "Acceptance does not mean approval, reconciliation, permissiveness or remaining unsafe."
  },
  "rebt-rational-imagery": {
    "aim": "Practise a flexible emotional response to an imagined activating event within REBT, ideally with trained guidance.",
    "steps": [
      "Choose a manageable situation and define the emotional target.",
      "Identify the rigid belief and the emotion it produces.",
      "Imagine the event briefly while noticing the belief and response.",
      "Practise shifting the belief towards a rational preference and adaptive emotion.",
      "Keep the imagined situation realistic and the new response believable.",
      "Review whether the rational philosophy can be applied in real life."
    ],
    "questions": [
      "What demand appears in the image?",
      "What rational belief could be practised?",
      "What emotion is adaptive without pretending the event is pleasant?"
    ],
    "review": "The target is a more workable emotional response, not eliminating all discomfort.",
    "pitfalls": "Imagery can intensify distress; do not use self-guided trauma reliving or emotional flooding."
  },
  "act-acceptance-willingness": {
    "aim": "Practise making room for internal experiences when struggling with them is narrowing behaviour.",
    "steps": [
      "Identify the private experience and efforts being used to suppress or control it.",
      "Check whether there is an external problem or safety issue requiring action first.",
      "Notice sensations and thoughts with openness and choice.",
      "Distinguish willingness from liking, approving or resigning yourself.",
      "Choose a safe, values-consistent action with discomfort present.",
      "Review workability and behavioural flexibility."
    ],
    "questions": [
      "What are you trying not to feel or think?",
      "What does the struggle cost?",
      "What action matters even if discomfort remains?"
    ],
    "review": "Review whether life becomes less organised around avoiding internal experiences.",
    "pitfalls": "Acceptance is not submission, tolerating abuse or abandoning medical treatment."
  },
  "act-choice-point": {
    "aim": "Map triggers, hooks, away-moves and toward-moves to clarify behavioural choice.",
    "steps": [
      "Name the difficult situation or internal trigger.",
      "Identify the thought, feeling, memory or urge that hooks attention.",
      "Describe the away-move used to escape, control or avoid the experience.",
      "Identify the value or quality of action that matters here.",
      "Choose a small toward-move that is safe and feasible.",
      "Review the direction of behaviour, not whether the feeling disappeared."
    ],
    "questions": [
      "What is the hook?",
      "What does the away-move cost?",
      "What would a toward-move look like next?"
    ],
    "review": "The map should lead to a concrete, values-guided action.",
    "pitfalls": "Do not label protective avoidance as unhelpful when it prevents genuine danger."
  },
  "act-self-as-context": {
    "aim": "Build a flexible observing perspective so experiences are noticed without becoming the whole identity.",
    "steps": [
      "Choose a mild thought, feeling or self-description to observe.",
      "Notice the experience as content that changes over time.",
      "Use perspective-taking language such as 'I notice I am having…'.",
      "Observe multiple experiences without selecting one as the whole self.",
      "Return to the current situation and chosen value.",
      "Review whether this perspective supports flexible action."
    ],
    "questions": [
      "What are you noticing right now?",
      "Can you observe the thought without becoming its label?",
      "What remains important in how you act?"
    ],
    "review": "Look for increased perspective-taking and flexibility, not dissociation or emotional distance.",
    "pitfalls": "Do not use this to detach from relationships and responsibilities."
  },
  "act-committed-action": {
    "aim": "Translate chosen values into sustained, observable behaviour with flexible problem-solving around barriers.",
    "steps": [
      "Choose a value direction that is genuinely the person's own.",
      "Define a behaviour that expresses it and is within current influence.",
      "Break it into specific near-term steps and a realistic schedule.",
      "Anticipate internal barriers and practise acceptance or defusion as needed.",
      "Act, review and adjust the route without abandoning the value.",
      "Build a sustainable pattern and revisit whether the direction remains chosen."
    ],
    "questions": [
      "What action would express the value?",
      "What barrier might show up?",
      "How can the plan be flexible without becoming avoidance?"
    ],
    "review": "Measure repeated value-consistent action and quality of life rather than symptom reduction alone.",
    "pitfalls": "Values are not productivity quotas; adapt for illness, access, disability, poverty and caregiving."
  },
  "dbt-chain-analysis": {
    "aim": "Analyse a target behaviour in sequence to identify vulnerability factors, links and intervention points.",
    "steps": [
      "Name the target behaviour operationally and without judgement.",
      "List vulnerability factors and the prompting event.",
      "Trace links in order: thoughts, sensations, emotions, urges, actions and environmental events.",
      "Record immediate and delayed consequences and what reinforced the pattern.",
      "Identify missing links and points where skills or support could be inserted.",
      "Create a prevention or repair plan and review it with the DBT team when relevant."
    ],
    "questions": [
      "What happened immediately before the behaviour?",
      "What was the first link you could notice?",
      "Where could a skill realistically be used?"
    ],
    "review": "The chain should reveal specific change points and inform a solution analysis.",
    "pitfalls": "For self-harm, suicidal behaviour or violence, an app worksheet is insufficient; use clinical safety support."
  },
  "dbt-check-facts": {
    "aim": "Examine whether an emotion and its action urge fit observable facts before selecting a DBT response.",
    "steps": [
      "Describe the prompting event in observable terms.",
      "Separate facts from assumptions, interpretations and predictions.",
      "Identify actual threat, loss, injustice or boundary issue.",
      "Check whether the emotion and intensity fit the whole context.",
      "Choose problem-solving, an effective boundary, opposite action where indicated, or distress tolerance.",
      "Review what information or action is still needed."
    ],
    "questions": [
      "What would a camera record?",
      "What did you infer about intent?",
      "Does the emotion fit the facts—or signal a real issue?"
    ],
    "review": "The outcome is a better-matched action, not necessarily a less intense emotion.",
    "pitfalls": "Never use Check the Facts to invalidate real danger, discrimination or boundary violations."
  },
  "dbt-opposite-action": {
    "aim": "Use a safe opposite action when the emotion and its urge do not fit the facts or are ineffective.",
    "steps": [
      "Check the facts and identify the emotion and urge.",
      "Decide whether the emotion fits the facts and whether the urge is effective.",
      "If the emotion does not fit, identify an action opposite to the urge.",
      "Make the opposite action observable and complete enough to send a different signal.",
      "Repeat only as appropriate and review effectiveness.",
      "If the emotion fits the facts, use problem-solving or boundary-setting instead."
    ],
    "questions": [
      "Does the emotion fit the facts?",
      "What is the action urge?",
      "What would an effective opposite action be?"
    ],
    "review": "Review effectiveness and context, not whether the person forced an emotion away.",
    "pitfalls": "Do not use against fear of actual danger or anger signalling a genuine violation."
  },
  "dbt-stop": {
    "aim": "Interrupt impulsive action with a brief pause so attention can return to present and effective choice.",
    "steps": [
      "Stop the immediate action if pausing is safe.",
      "Take a step back physically or mentally from the trigger.",
      "Observe facts, sensations, thoughts, emotion and urge.",
      "Proceed mindfully by identifying the outcome that matters.",
      "Choose one effective next action or a time to return to the problem.",
      "Review whether the pause changed the response."
    ],
    "questions": [
      "What is the urge asking you to do?",
      "What facts need attention?",
      "What response will be effective in five minutes?"
    ],
    "review": "Review whether the pause enabled deliberate action rather than simple suppression.",
    "pitfalls": "Do not delay emergency action, leaving danger or needed medical care."
  },
  "dbt-tipp": {
    "aim": "Use selected physiological crisis-survival skills to reduce extreme arousal within an agreed DBT plan.",
    "steps": [
      "Confirm the person is safe and this is not a medical emergency.",
      "Select only the TIPP element suitable for the person's health and clinician plan.",
      "Review contraindications before temperature, breathing or intense-exercise components.",
      "Practise the agreed skill briefly and monitor tolerance.",
      "Stop immediately if symptoms worsen or the practice feels unsafe.",
      "Follow with problem-solving or support once arousal permits."
    ],
    "questions": [
      "Which part of TIPP is appropriate and safe?",
      "Are there medical or medication contraindications?",
      "What effective action follows the crisis skill?"
    ],
    "review": "The skill is short-term crisis survival followed by effective action and care.",
    "pitfalls": "Never provide unsupervised extreme cold, breath-holding or strenuous exercises; medical suitability matters."
  },
  "dbt-self-soothe": {
    "aim": "Use chosen sensory experiences to tolerate distress without escalating the situation.",
    "steps": [
      "Check the environment is safe and identify the immediate distress.",
      "Choose one sensory input that is comfortable and available.",
      "Engage with it deliberately for a short period.",
      "Notice whether distress is tolerable enough to choose the next action.",
      "Combine with other skills or support if needed.",
      "Review whether it helped without avoiding an actionable problem."
    ],
    "questions": [
      "Which sense feels most grounding or soothing?",
      "What is safe, accessible and non-triggering?",
      "What problem still needs addressing?"
    ],
    "review": "Review whether the skill supported safe coping and return to effective action.",
    "pitfalls": "Sensory strategies are individual; adapt for trauma, neurodivergence, pain and sensitivities."
  },
  "dbt-radical-acceptance": {
    "aim": "Acknowledge an unchangeable fact in the present without approving it or abandoning action where possible.",
    "steps": [
      "Name the reality that cannot be changed in this moment.",
      "Notice ways the mind is fighting, denying or demanding a different past.",
      "Acknowledge facts in plain language, including pain and consequences.",
      "Distinguish acceptance from approval, forgiveness or passivity.",
      "Identify what can still be changed, repaired or protected.",
      "Return to acceptance as needed while taking effective action."
    ],
    "questions": [
      "What fact is already true?",
      "What does resisting it add?",
      "What remains within your power or responsibility?"
    ],
    "review": "Acceptance may reduce secondary struggle and clarify the next available choice.",
    "pitfalls": "Do not encourage acceptance of abuse, injustice or preventable danger as if it must be endured."
  },
  "dbt-willingness": {
    "aim": "Practise choosing effective participation over rigid resistance when action is needed.",
    "steps": [
      "Notice the moment of wilfulness, refusal or rigid insistence.",
      "Identify the fear, value or need behind the resistance without judgement.",
      "Check the facts and whether the requested action is safe and appropriate.",
      "Turn the mind towards willingness as a choice, possibly more than once.",
      "Take one effective action while retaining legitimate boundaries.",
      "Review whether the action serves goals and values."
    ],
    "questions": [
      "What am I refusing to acknowledge or do?",
      "Is the resistance protecting a valid boundary?",
      "What would effectiveness look like here?"
    ],
    "review": "Review whether the person can choose a more effective response without self-abandonment.",
    "pitfalls": "Willingness is not compliance with coercion or surrender of rights."
  },
  "dbt-dear-man": {
    "aim": "Structure a clear interpersonal request or refusal while staying focused and negotiating realistically.",
    "steps": [
      "Describe the situation using observable facts.",
      "Express feelings or needs briefly without blaming.",
      "Assert the request or boundary clearly.",
      "Reinforce why a workable response matters without threats or manipulation.",
      "Stay mindful of the objective and repeat the request as needed.",
      "Appear confident in wording and posture while remaining respectful.",
      "Negotiate possible alternatives without abandoning essential limits."
    ],
    "questions": [
      "What is the objective?",
      "What exact request can be answered?",
      "What alternatives are acceptable—and what is not negotiable?"
    ],
    "review": "Review whether the message was clear, respectful and aligned with goals and self-respect.",
    "pitfalls": "Not appropriate where assertion increases danger; this skill cannot control another person's response."
  },
  "dbt-give": {
    "aim": "Protect relationship effectiveness through validation and respectful communication while discussing a difficult issue.",
    "steps": [
      "Identify whether preserving the relationship is a priority in this interaction.",
      "Use a gentle tone and avoid unnecessary judgement.",
      "Show interest by listening and asking relevant questions.",
      "Validate the other person's understandable experience without pretending agreement.",
      "Keep communication genuine and clear about your own position.",
      "Review whether connection was preserved without abandoning boundaries."
    ],
    "questions": [
      "What might make their response understandable?",
      "What can you validate without agreeing?",
      "How can you remain genuine and clear?"
    ],
    "review": "Review mutual understanding and relationship impact, not whether conflict disappeared.",
    "pitfalls": "Do not use relationship skills to appease abuse or accept disrespect."
  },
  "dbt-fast": {
    "aim": "Maintain self-respect during an interaction by staying fair, values-consistent and truthful.",
    "steps": [
      "Identify the self-respect principle at stake.",
      "Check fairness to yourself and the other person.",
      "Avoid unnecessary apologies while retaining genuine accountability.",
      "Stay aligned with personal values and state them clearly.",
      "Be truthful and avoid exaggeration or manipulation.",
      "Review whether the response preserved dignity and realistic boundaries."
    ],
    "questions": [
      "What value do you want to stand for?",
      "What apology is genuine and what is appeasement?",
      "What truth needs to be said plainly?"
    ],
    "review": "Review self-respect and relationship effects together without demanding a perfect outcome.",
    "pitfalls": "Self-respect effectiveness is not stubbornness or refusal to repair genuine harm."
  },
  "dbt-please": {
    "aim": "Review physical and routine vulnerability factors that may affect emotion regulation.",
    "steps": [
      "Notice relevant health, sleep, nourishment, medication and activity factors without self-blame.",
      "Identify which factors are changeable and which require medical or practical support.",
      "Choose one realistic action within the care plan.",
      "Plan how to handle barriers such as access, disability, work or caregiving.",
      "Seek clinical advice for medical changes or symptoms.",
      "Review whether vulnerability support improves stability over time."
    ],
    "questions": [
      "What vulnerability factor is most relevant today?",
      "What support or accommodation is missing?",
      "What is one feasible action?"
    ],
    "review": "Review routine support and access to care, not moral compliance.",
    "pitfalls": "Do not turn PLEASE into medical advice or blame people for illness, poverty or inaccessible care."
  },
  "dbt-cope-ahead": {
    "aim": "Rehearse a plan for a foreseeable difficult situation and identify skills to use at likely decision points.",
    "steps": [
      "Choose an upcoming situation and define the desired effective behaviour.",
      "Identify likely triggers, links, urges and environmental complications.",
      "Select specific skills for the points where they are most useful.",
      "Imagine carrying out the plan realistically, including obstacles.",
      "Prepare supports, boundaries and a fallback action.",
      "Review after the event what worked and what needs revision."
    ],
    "questions": [
      "What is most likely to derail you?",
      "Which skill fits each point in the sequence?",
      "What will you do if the first plan is not possible?"
    ],
    "review": "Compare rehearsal with actual events and update the plan.",
    "pitfalls": "Do not turn rehearsal into exhaustive worry or assume it guarantees success."
  },
  "dbt-mindfulness-observe-describe": {
    "aim": "Practise noticing an event and describing it without adding judgement or inference.",
    "steps": [
      "Choose a present-moment cue or manageable situation.",
      "Observe what is occurring in the body, mind and environment.",
      "Describe facts in neutral language without adding motives or evaluations.",
      "Notice judgements as mental events rather than suppressing them.",
      "Return attention to the chosen task or interaction.",
      "Review whether this improved clarity or effective action."
    ],
    "questions": [
      "What did you directly observe?",
      "Which words are interpretations or judgements?",
      "What changes when you describe only what is present?"
    ],
    "review": "Review whether observations became more precise and less fused with assumptions.",
    "pitfalls": "Adapt or stop if internal observation increases dissociation, panic or trauma distress."
  },
  "dbt-validation": {
    "aim": "Communicate that an emotional response is understandable in context while preserving accuracy and accountability.",
    "steps": [
      "Listen for facts and context shaping the response.",
      "Reflect the emotion or need in precise, nonjudgmental language.",
      "Check understanding rather than assuming you know the meaning.",
      "Acknowledge what makes sense without endorsing inaccurate conclusions or harmful actions.",
      "Offer problem-solving or a boundary where needed.",
      "Review whether the person felt understood and what change is still needed."
    ],
    "questions": [
      "What makes this response understandable?",
      "What can be validated without agreeing with the interpretation?",
      "What change or boundary remains necessary?"
    ],
    "review": "Validation should increase understanding and make effective change more possible.",
    "pitfalls": "Validation is not reassurance, agreement, excuse-making or a replacement for safety."
  },
  "dbt-dialectical-synthesis": {
    "aim": "Hold two apparently competing truths together and search for a more complete, effective position.",
    "steps": [
      "Identify the two rigid positions or truths in tension.",
      "State what is valid in each without creating false equivalence.",
      "Identify facts, power differences, context and safety constraints.",
      "Look for a synthesis that includes what matters from both positions.",
      "Choose an action that reflects the more complete view.",
      "Review whether the synthesis is realistic and fair."
    ],
    "questions": [
      "What is true on each side?",
      "What fact is being left out?",
      "Where is synthesis possible—and where is a clear boundary required?"
    ],
    "review": "Review whether thinking became more flexible without erasing responsibility or harm.",
    "pitfalls": "Do not manufacture balance between abuse and a reasonable response."
  },
  "schema-mode-map": {
    "aim": "Observe schema modes as temporary states and coping responses within a broader, tentative formulation.",
    "steps": [
      "Choose a recent trigger and describe present-day facts.",
      "Notice changes in emotion, body, attention, thought and action urge.",
      "Use tentative language for the mode or state; do not label identity.",
      "Identify the need or boundary that may be active.",
      "Notice the coping response and its short- and long-term effects.",
      "Consider a grounded response and whether clinician-guided schema work is indicated."
    ],
    "questions": [
      "Which state seems active now?",
      "What need or vulnerability does it signal?",
      "What coping mode is being used?"
    ],
    "review": "Look for recurring patterns while recording exceptions and contextual triggers.",
    "pitfalls": "Do not infer childhood trauma or diagnose a schema from one episode or checklist."
  },
  "schema-imagery-rescripting": {
    "aim": "Use therapist-guided imagery work to address a distressing memory or image and its unmet need or meaning.",
    "steps": [
      "Establish a schema formulation and indication with a trained schema therapist.",
      "Assess readiness, stability, consent, dissociation and risk.",
      "Use the therapist's planned imagery procedure and pacing.",
      "Explore the need, meaning and response within the clinical exercise.",
      "Return to the present and process the experience with support.",
      "Review effects and follow-up before further memory work."
    ],
    "questions": [
      "What schema or need is being targeted?",
      "What pacing and safeguards are necessary?",
      "How will the clinician evaluate the impact?"
    ],
    "review": "Review against the clinical formulation and functional outcomes, including adverse effects.",
    "pitfalls": "Never provide unsupervised trauma imagery or rescripting instructions."
  },
  "schema-chair-work": {
    "aim": "Use therapist-facilitated chair dialogues to make conflicting modes, needs and perspectives observable.",
    "steps": [
      "Agree on the treatment target and explain the exercise and consent options.",
      "Select the modes or internal positions relevant to the formulation.",
      "Structure the dialogue with the therapist guiding boundaries and pacing.",
      "Identify needs, unmet experiences and healthier responses.",
      "Integrate the learning and return to present orientation.",
      "Review emotional impact and therapeutic follow-up."
    ],
    "questions": [
      "Which mode or voice is being represented?",
      "What does it need or fear?",
      "What would a healthy adult response communicate?"
    ],
    "review": "Learning is integrated into schema formulation and future behaviour.",
    "pitfalls": "Chair work can be emotionally intense; it is not a self-guided performance or a substitute therapist."
  },
  "schema-pattern-breaking": {
    "aim": "Replace a familiar coping response with a small, safe behaviour that meets the underlying need more directly.",
    "steps": [
      "Identify the recurring trigger and usual coping response.",
      "Clarify what the response protects against and what it costs.",
      "Identify the legitimate need, value or boundary under the pattern.",
      "Choose a small alternative behaviour that is safe and realistic.",
      "Plan support and obstacles; keep essential protective behaviour.",
      "Review what happened and what was learned about the pattern."
    ],
    "questions": [
      "What does the old response help you avoid?",
      "What need is underneath it?",
      "What alternative protects the need with fewer costs?"
    ],
    "review": "Review real-world behaviour and whether the new response is sustainable.",
    "pitfalls": "Do not remove genuine safety behaviours, accommodations or boundaries."
  },
  "schema-limited-reparenting": {
    "aim": "A bounded therapist-delivered relational strategy within schema therapy, governed by treatment frame and ethics.",
    "steps": [
      "Understand the schema formulation and unmet need within professional treatment.",
      "Establish clear roles, limits, consent and therapeutic goals.",
      "Use validation, consistency and appropriate responsiveness within the agreed frame.",
      "Support recognition of needs and development of healthy-adult responses.",
      "Monitor dependency, boundaries, culture, attachment dynamics and treatment progress.",
      "Review the strategy in supervision and adapt to the person's needs."
    ],
    "questions": [
      "What unmet need is the intervention addressing?",
      "Are roles and limits clear?",
      "How is autonomy being strengthened?"
    ],
    "review": "Review safety, autonomy, therapeutic alliance and schema-related outcomes.",
    "pitfalls": "This is a specialist clinical strategy, not something an app or untrained helper can simulate."
  },
  "schema-flashcards": {
    "aim": "Create concise reminders of a balanced schema response and the action that expresses it.",
    "steps": [
      "Identify one recurring schema trigger and coping response.",
      "Write a balanced alternative that is credible and evidence-linked.",
      "Include the need or boundary the person wants to protect.",
      "Add one specific healthy-adult action for the trigger.",
      "Keep the card brief and revise only with meaningful new learning.",
      "Use it to support action, not repeated reassurance or argument with thoughts."
    ],
    "questions": [
      "What old message appears?",
      "What is a fairer and more nuanced response?",
      "What action reflects that response?"
    ],
    "review": "Review whether the card supports different behaviour and gradually becomes less necessary.",
    "pitfalls": "Do not use cards as forced affirmations or reassurance rituals."
  },
  "cft-compassionate-imagery": {
    "aim": "Use a safe, personally tolerable compassion image to evoke warmth, steadiness and courage.",
    "steps": [
      "Assess whether imagery is comfortable and offer non-imagery alternatives.",
      "Identify the qualities the image should represent, not a perfect fantasy figure.",
      "Build a brief image at a manageable pace and notice reactions.",
      "Connect those qualities with the current difficulty and legitimate needs.",
      "Use a compassionate response that still allows accountability and boundaries.",
      "Review tolerability and stop or adapt if imagery increases distress."
    ],
    "questions": [
      "What quality would be helpful here?",
      "Does the image feel safe and believable?",
      "What would compassionate courage do next?"
    ],
    "review": "Review whether the exercise supports a kinder and more effective response.",
    "pitfalls": "Imagery can be difficult; do not force it or use it as trauma treatment."
  },
  "cft-compassionate-letter": {
    "aim": "Write from a balanced compassionate perspective that acknowledges suffering, responsibility and practical next steps.",
    "steps": [
      "Name the difficulty and harsh self-criticism surrounding it.",
      "Write as a fair, warm and wise perspective—not exaggerated praise.",
      "Acknowledge pain and context without denying responsibility.",
      "Include what a caring person would want the individual to understand.",
      "Identify a realistic next action or repair.",
      "Read once, notice the response and revise language that feels false or shaming."
    ],
    "questions": [
      "What would a fair and caring perspective recognise?",
      "What responsibility remains?",
      "What supportive action is realistic?"
    ],
    "review": "The letter should feel credible and support action, not merely offer reassurance.",
    "pitfalls": "Do not use compassion to excuse harm or force positivity that feels false."
  },
  "mbct-three-minute-space": {
    "aim": "Use brief mindfulness to notice current experience and widen attention, as one element of an MBCT programme.",
    "steps": [
      "Pause and notice what is present in thoughts, emotions and body sensations.",
      "Narrow attention gently to a chosen anchor if comfortable.",
      "Notice when attention wanders without criticism.",
      "Widen attention to include body and surroundings.",
      "Choose the next action mindfully.",
      "Review as an attentional skill, not a symptom test."
    ],
    "questions": [
      "What is present right now?",
      "Where is attention resting?",
      "What is the next mindful action?"
    ],
    "review": "Review present-moment contact and re-engagement, not whether calm occurred.",
    "pitfalls": "This is not full MBCT or relapse prevention; adapt if breath or body focus is uncomfortable."
  },
  "mbct-body-scan": {
    "aim": "Develop nonjudgmental awareness of bodily sensations within a structured mindfulness programme.",
    "steps": [
      "Choose a comfortable posture and short agreed duration.",
      "Move attention through body regions without trying to change sensations.",
      "Notice neutral, pleasant or unpleasant experience with curiosity.",
      "If attention wanders, return gently or use an external anchor.",
      "Stop or adapt if pain, panic, dissociation or trauma activation rises.",
      "Review tolerability and what adaptation is needed."
    ],
    "questions": [
      "What sensations are actually present?",
      "Can you notice without fixing or judging?",
      "Would external grounding be more suitable?"
    ],
    "review": "Review awareness and tolerability rather than relaxation or pain reduction.",
    "pitfalls": "Body focus is not suitable for everyone and should be adapted or stopped when destabilising."
  },
  "dbt-wise-mind": {
    "aim": "Integrate emotional information and reasoned facts to choose an effective response.",
    "steps": [
      "Pause and name the emotion and action urge.",
      "State observable facts and what remains unknown.",
      "Identify values, goals and boundaries at stake.",
      "Consider a response integrating emotion and reason without treating either as infallible.",
      "Choose one effective action and define the next step.",
      "Review whether the action fits the situation and values."
    ],
    "questions": [
      "What is emotion telling you?",
      "What do the facts show?",
      "What action integrates both while preserving safety?"
    ],
    "review": "Review effectiveness of the chosen action, not whether a mystical inner answer appeared.",
    "pitfalls": "Do not treat intuition as proof or ignore evidence and safety."
  },
  "dbt-improve": {
    "aim": "Use temporary crisis-survival strategies to make an unchangeable moment more tolerable.",
    "steps": [
      "Confirm immediate safety and identify what cannot be changed right now.",
      "Choose one optional element that is personally meaningful and appropriate.",
      "Use the strategy briefly and deliberately.",
      "Notice whether distress becomes more tolerable without demanding that it vanish.",
      "Return to problem-solving or support when possible.",
      "Review what helped and update the crisis plan if needed."
    ],
    "questions": [
      "What cannot be changed in this moment?",
      "Which strategy is culturally and personally appropriate?",
      "What action follows when the moment passes?"
    ],
    "review": "This is a bridge through distress, not a solution to the underlying problem.",
    "pitfalls": "Do not use it to remain in danger or delay urgent care; spiritual elements are optional."
  },
  "dbt-pros-cons": {
    "aim": "Compare acting on an urge with choosing an alternative, including short- and long-term consequences.",
    "steps": [
      "Define the urge and the behaviour it pulls towards.",
      "List short- and long-term consequences of acting on the urge.",
      "List short- and long-term consequences of not acting on it.",
      "Include impact on values, safety, relationships and future choices.",
      "Choose the most effective available action and identify the skill needed.",
      "Review the choice afterwards without self-judgement."
    ],
    "questions": [
      "What does the urge promise immediately?",
      "What will it cost later?",
      "What becomes possible if you do not act on it?"
    ],
    "review": "Review whether the chosen action protects longer-term goals and safety.",
    "pitfalls": "Do not use the worksheet to delay emergency action or ignore valid self-protection."
  },
  "dbt-mindfulness-what-how": {
    "aim": "Practise DBT mindfulness WHAT skills and HOW skills as separate but complementary components.",
    "steps": [
      "Choose a manageable activity or moment.",
      "Observe what is present without immediately changing it.",
      "Describe the experience in factual language.",
      "Participate fully in the chosen activity when safe.",
      "Practise HOW skills: nonjudgmental, one-mindful and effective.",
      "Review which component was useful and adapt if attention becomes uncomfortable."
    ],
    "questions": [
      "What can you observe?",
      "How can you be nonjudgmental, one-mindful and effective?",
      "What action fits the situation?"
    ],
    "review": "Review whether attention and action became more effective.",
    "pitfalls": "Do not use mindfulness to ignore external danger or dissociate from a difficult situation."
  },
  "dbt-diary-card": {
    "aim": "Use brief, agreed clinical monitoring to support structured DBT treatment review.",
    "steps": [
      "Agree target behaviours, urges, emotions and skills with the DBT clinician.",
      "Keep the recording schedule short and consistent with the treatment plan.",
      "Record only agreed measures, without unnecessary narrative.",
      "Bring the card to the planned review and discuss missing or difficult entries openly.",
      "Use clinical review to identify patterns, treatment targets and skill needs.",
      "Adjust the record if it becomes burdensome or compulsive."
    ],
    "questions": [
      "What did the treatment team agree to monitor?",
      "What pattern requires discussion?",
      "Is the card helping treatment or adding burden?"
    ],
    "review": "Review data with the treating team and connect it to treatment targets.",
    "pitfalls": "A diary card is not crisis monitoring or a secure place for high-risk disclosures in an unprotected app."
  },
  "dbt-self-validation": {
    "aim": "Recognise the understandable context of an emotion while retaining accuracy and responsibility.",
    "steps": [
      "Name the emotion and describe its intensity without judgement.",
      "Identify facts and context that make the response understandable.",
      "Acknowledge the need, value or history being touched.",
      "Separate validation of emotion from endorsement of every interpretation or action.",
      "Offer a supportive and effective next response.",
      "Review whether self-invalidation decreased without losing accountability."
    ],
    "questions": [
      "What makes this emotion understandable?",
      "What need or context deserves recognition?",
      "What action is still needed?"
    ],
    "review": "Review whether the person can hold validation and change together.",
    "pitfalls": "Validation is not proof of interpretation, excuse-making or agreement."
  },
  "act-drop-anchor": {
    "aim": "Use brief grounding to reconnect with the present and re-engage with a chosen action.",
    "steps": [
      "Notice that attention has been pulled into a thought, feeling or memory.",
      "Name the internal experience without debating it.",
      "Connect with the feet, posture or another tolerable sensory cue.",
      "Notice a few neutral features of the environment.",
      "Identify the next value-consistent action and take a small step.",
      "Review whether action became more available even if discomfort remained."
    ],
    "questions": [
      "What is happening inside right now?",
      "What is present in the environment?",
      "What small action matters next?"
    ],
    "review": "Review present-moment contact and re-engagement, not whether distress vanished.",
    "pitfalls": "Adapt if body attention is uncomfortable; do not use grounding to tolerate danger."
  },
  "rebt-rational-coping-statements": {
    "aim": "Create brief reminders of rational beliefs after the belief has been examined and revised.",
    "steps": [
      "Identify the rigid belief that was disputed.",
      "Write the flexible preference in plain language.",
      "Include tolerance of discomfort and non-global evaluation where relevant.",
      "Make the statement believable and specific to the trigger.",
      "Pair it with effective action rather than repeating it for certainty.",
      "Review whether it supports flexibility or has become rote reassurance."
    ],
    "questions": [
      "What preference replaces the demand?",
      "Can you tolerate difficulty without calling it unbearable?",
      "What practical action follows?"
    ],
    "review": "A useful statement supports an effective choice and can be revised when facts change.",
    "pitfalls": "Do not use formulaic phrases to suppress emotion or reassure compulsively."
  }
};

const EVIDENCE_SCOPE = {
  "formulation-5areas": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "functional-analysis": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "self-monitoring": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "guided-discovery": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "downward-arrow": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "core-belief-map": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "cognitive-distortions": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "thought-record": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "decatastrophising": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "reattribution": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "continuum": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "advantages-disadvantages": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "coping-cards": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "positive-data": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "imagery-elicitation": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "behavioural-experiment": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "behavioural-activation": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "graded-task": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "structured-problem-solving": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "graded-exposure": "A component of a condition-specific protocol. Evidence and indications apply to the complete manualised programme and trained delivery; they do not validate this isolated procedure as self-help.",
  "interoceptive-exposure": "A component of a condition-specific protocol. Evidence and indications apply to the complete manualised programme and trained delivery; they do not validate this isolated procedure as self-help.",
  "imaginal-exposure": "A component of a condition-specific protocol. Evidence and indications apply to the complete manualised programme and trained delivery; they do not validate this isolated procedure as self-help.",
  "response-prevention": "A component of a condition-specific protocol. Evidence and indications apply to the complete manualised programme and trained delivery; they do not validate this isolated procedure as self-help.",
  "stimulus-control": "A component of a condition-specific protocol. Evidence and indications apply to the complete manualised programme and trained delivery; they do not validate this isolated procedure as self-help.",
  "habit-reversal": "A component of a condition-specific protocol. Evidence and indications apply to the complete manualised programme and trained delivery; they do not validate this isolated procedure as self-help.",
  "role-play": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "assertiveness": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "cognitive-rehearsal": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "relaxation-training": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "applied-relaxation": "A component of a condition-specific protocol. Evidence and indications apply to the complete manualised programme and trained delivery; they do not validate this isolated procedure as self-help.",
  "activity-pacing": "A component of a condition-specific protocol. Evidence and indications apply to the complete manualised programme and trained delivery; they do not validate this isolated procedure as self-help.",
  "craving-coping": "A component of a condition-specific protocol. Evidence and indications apply to the complete manualised programme and trained delivery; they do not validate this isolated procedure as self-help.",
  "regular-eating": "A component of a condition-specific protocol. Evidence and indications apply to the complete manualised programme and trained delivery; they do not validate this isolated procedure as self-help.",
  "imagery-rescripting": "A component of a condition-specific protocol. Evidence and indications apply to the complete manualised programme and trained delivery; they do not validate this isolated procedure as self-help.",
  "relapse-prevention": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "between-session-practice": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "progress-review": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "attention-training": "An MCT procedure. Use within a coherent metacognitive formulation; brief practice alone is not a complete MCT protocol.",
  "detached-mindfulness": "An MCT procedure. Use within a coherent metacognitive formulation; brief practice alone is not a complete MCT protocol.",
  "cognitive-defusion": "An ACT process or exercise. Evidence is primarily about coherent ACT programmes and process models; this single exercise is not equivalent to ACT treatment.",
  "values-clarification": "An ACT process or exercise. Evidence is primarily about coherent ACT programmes and process models; this single exercise is not equivalent to ACT treatment.",
  "distress-tolerance": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "mindfulness-decentering": "A practice drawn from MBCT. Evidence for MBCT concerns a structured multi-session programme, not the isolated practice alone.",
  "psychoeducation": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "collaborative-agenda": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "session-feedback": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "scheduled-worry": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "systematic-desensitisation": "A component of a condition-specific protocol. Evidence and indications apply to the complete manualised programme and trained delivery; they do not validate this isolated procedure as self-help.",
  "coping-skills-training": "A core CBT procedure commonly used within formulation-driven treatment. Evidence for CBT programmes does not mean this technique works alone or is suitable for every problem.",
  "rebt-abcde": "An REBT procedure. Evidence is interpreted in the context of REBT interventions; a single worksheet is not a full REBT treatment.",
  "rebt-disputation": "An REBT procedure. Evidence is interpreted in the context of REBT interventions; a single worksheet is not a full REBT treatment.",
  "rebt-unconditional-acceptance": "An REBT procedure. Evidence is interpreted in the context of REBT interventions; a single worksheet is not a full REBT treatment.",
  "rebt-rational-imagery": "An REBT procedure. Evidence is interpreted in the context of REBT interventions; a single worksheet is not a full REBT treatment.",
  "act-acceptance-willingness": "An ACT process or exercise. Evidence is primarily about coherent ACT programmes and process models; this single exercise is not equivalent to ACT treatment.",
  "act-choice-point": "An ACT process or exercise. Evidence is primarily about coherent ACT programmes and process models; this single exercise is not equivalent to ACT treatment.",
  "act-self-as-context": "An ACT process or exercise. Evidence is primarily about coherent ACT programmes and process models; this single exercise is not equivalent to ACT treatment.",
  "act-committed-action": "An ACT process or exercise. Evidence is primarily about coherent ACT programmes and process models; this single exercise is not equivalent to ACT treatment.",
  "dbt-chain-analysis": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "dbt-check-facts": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "dbt-opposite-action": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "dbt-stop": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "dbt-tipp": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "dbt-self-soothe": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "dbt-radical-acceptance": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "dbt-willingness": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "dbt-dear-man": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "dbt-give": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "dbt-fast": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "dbt-please": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "dbt-cope-ahead": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "dbt-mindfulness-observe-describe": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "dbt-validation": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "dbt-dialectical-synthesis": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "schema-mode-map": "A schema-therapy method or concept. Clinical outcomes are associated with structured treatment and trained delivery; experiential and relational work requires specialist competence.",
  "schema-imagery-rescripting": "A schema-therapy method or concept. Clinical outcomes are associated with structured treatment and trained delivery; experiential and relational work requires specialist competence.",
  "schema-chair-work": "A schema-therapy method or concept. Clinical outcomes are associated with structured treatment and trained delivery; experiential and relational work requires specialist competence.",
  "schema-pattern-breaking": "A schema-therapy method or concept. Clinical outcomes are associated with structured treatment and trained delivery; experiential and relational work requires specialist competence.",
  "schema-limited-reparenting": "A schema-therapy method or concept. Clinical outcomes are associated with structured treatment and trained delivery; experiential and relational work requires specialist competence.",
  "schema-flashcards": "A schema-therapy method or concept. Clinical outcomes are associated with structured treatment and trained delivery; experiential and relational work requires specialist competence.",
  "cft-compassionate-imagery": "A compassion-focused practice. Evidence varies by population and programme; do not infer stand-alone efficacy from inclusion in a broader approach.",
  "cft-compassionate-letter": "A compassion-focused practice. Evidence varies by population and programme; do not infer stand-alone efficacy from inclusion in a broader approach.",
  "mbct-three-minute-space": "A practice drawn from MBCT. Evidence for MBCT concerns a structured multi-session programme, not the isolated practice alone.",
  "mbct-body-scan": "A practice drawn from MBCT. Evidence for MBCT concerns a structured multi-session programme, not the isolated practice alone.",
  "dbt-wise-mind": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "dbt-improve": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "dbt-pros-cons": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "dbt-mindfulness-what-how": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "dbt-diary-card": "A component of a condition-specific protocol. Evidence and indications apply to the complete manualised programme and trained delivery; they do not validate this isolated procedure as self-help.",
  "dbt-self-validation": "A DBT skill or treatment component. Evidence for comprehensive DBT or structured skills programmes does not establish the effectiveness of this one skill in isolation.",
  "act-drop-anchor": "An ACT process or exercise. Evidence is primarily about coherent ACT programmes and process models; this single exercise is not equivalent to ACT treatment.",
  "rebt-rational-coping-statements": "An REBT procedure. Evidence is interpreted in the context of REBT interventions; a single worksheet is not a full REBT treatment."
};

export function getTechniqueGuide(id) {
  const guide = TECHNIQUE_GUIDES[id];
  if (!guide) return null;
  return { ...guide, evidenceScope: EVIDENCE_SCOPE[id] || "Evidence depends on the complete therapeutic approach and clinical context; this entry is educational, not a stand-alone treatment." };
}
