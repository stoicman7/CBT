# CBT Workspace — Product, UX, and Implementation Audit

**Audit date:** 23 November 2026  
**Repository:** `stoicman7/CBT`  
**Branch reviewed:** `main`  
**Review type:** Focused product and code audit following the exercise-interface redesign  
**Scope:** Navigation, search, workspace overview, exercise cards, worksheet dialog, technique catalogue, local persistence, privacy communication, responsive styling, content structure, and automated validation.

---

## 1. Executive assessment

The CBT Workspace has a useful foundation: it is a lightweight static application, organised around emotion and condition workspaces, with practical tools, source notes, progress plans, and browser-local reflections. Its lack of an account system and server-side journal keeps the deployment relatively simple and avoids transmitting worksheet responses to an application backend.

The main weakness identified in this review was not a lack of content. It was the way content was presented. The worksheet dialog placed the exercise description, instructions, evidence note, and reflection fields in a largely continuous sequence. Increasing the font size improved legibility but also made the page feel like a large block of text. The technique list had a similar density problem: every item exposed its description, usage guidance, full procedure, evidence note, and references at once.

The interface has therefore been changed to use **visual grouping and progressive disclosure**, rather than relying on smaller text to fit more information on screen. Purpose and context are separated into cards, procedural steps are numbered and visually distinct, evidence is available in a disclosure panel, and reflection prompts are grouped into a responsive grid. The technique catalogue now keeps its detail collapsed until requested.

The audit also identified functional issues worth correcting alongside the visual work. The global search promised to find tools but did not provide direct, selectable exercise results. Storage operations could display a success message even when saving to local storage failed. Restored local state was accepted with limited structural validation. These paths have been revised.

The catalogue now contains **25 workspaces, 159 interactive tools, 49 indexed technique-directory entries, and 50 evidence-source records**. The 22 new tools in this update are distributed across the five requested areas: anger (+4), stress (+4), anxiety (+4), fear (+4), and social anxiety (+6). Counts describe catalogue entries, not individually validated treatments.

This is a focused code and product review. It is not a formal accessibility certification, a moderated usability study, a clinical validation study, or a registered systematic review.

---

## 2. Materials and review method

The review inspected the current implementation and supporting files:

- `index.html`: application shell, navigation landmarks, search controls, dialog, and script loading.
- `app.js`: rendering, navigation, search, worksheet opening, submission, browser persistence, export, and deletion flows.
- `styles.css`: layout, typography, responsive breakpoints, exercise dialog, technique directory, and interaction states.
- `data.js`: workspace descriptions, tool definitions, worksheet schemas, evidence notes, and source register.
- `technique-library.js`: method-directory data and classification.
- `tests/smoke-test.mjs` and `package.json`: automated structural and syntax checks.
- `README.md` and `docs/SCIENTIFIC_REVIEW.md`: product claims, scope, evidence statements, and safeguards.

The review used static source inspection and consistency checks against the catalogue. It did not involve a live moderated user study, clinical outcome measurement, or hands-on testing in every browser and assistive technology. A CI or browser run is still needed to establish that the newest commits pass in the deployment environment.

---

## 3. Information architecture and navigation

### What is working

The site separates the user-facing emotional workspaces from the technique reference directory. The workspace overview explains a basic maintenance or response model, offers practical cards, provides a short practice plan, and presents an evidence and caution area. Focused-care pages are distinguished from ordinary emotional experiences. This is an important conceptual separation: an emotion such as fear or anger is not itself a mental disorder, and a page about a condition should not be mistaken for a diagnosis.

The left navigation groups the catalogue into emotions, patterns, and focused care. That gives the site room to grow without forcing all tools into one undifferentiated library.

### Changes made

Workspace section navigation now uses ordinary navigation buttons with a pressed state rather than declaring a tablist without implementing the complete tab keyboard interaction pattern. The mobile menu remains available through its menu and close controls.

The search interface now presents a result panel containing matching workspaces and exact exercise titles. Tool matches are prioritised over general workspace matches. Selecting a tool result switches to the correct workspace and opens that exercise. Keyboard support includes moving from the search field into results with Arrow Down, moving between options with the arrow keys, selecting with Enter, and closing with Escape.

The search panel is labelled as a listbox and the input exposes combobox semantics and its expanded state. These changes improve the structure for assistive technologies, but they do not replace real screen-reader testing.

### Remaining improvement

The current global search is a compact result picker, not a full search-results page. A later iteration could add category filters, a visible result count, highlighted matching terms, and a no-results suggestion. Search should also be tested with very long titles, punctuation, accented text, and keyboard-only navigation.

---

## 4. Exercise cards and workspace overview

### Problem found

The previous card design tried to show too much information in a compact card. The description, usage context, and action competed for attention. Three columns could make the available line length too short, particularly as the descriptive copy had intentionally been increased to the same reading size as the main page text.

### Changes made

The main exercise grid now uses two columns on desktop and one column on narrow screens. Cards have a clearer sequence:

1. A small index and exercise-type label.
2. A distinct title.
3. A readable description.
4. A separate context area explaining when the exercise may be useful.
5. A full-width action row.

The visual structure uses restrained borders, spacing, and surface contrast. The main text remains large; metadata is smaller because it is not the substantive exercise content. The intended result is better scanning without hiding important instructions or reducing them back to miniature text.

### Further recommendation

The current workspace overview still displays all cards for a selected area. When a workspace grows much larger, it would benefit from meaningful groups such as **understand the pattern**, **change a response**, **practise a behaviour**, and **review progress**. Do not add decorative categories unless each tool has a defensible reason to belong in that group. A future “recommended starting point” should be based on transparent selection logic, not an unsupported claim that the site can choose the clinically correct exercise.

---

## 5. Interactive worksheet redesign

### Problem found

The previous dialog was essentially a document: purpose, suggested steps, evidence context, and reflection labels were rendered as adjacent blocks. Raising the type size alone made the interface longer but did not create a clear sequence. The user had to infer where the method ended and where personal reflection began.

### New visual sequence

The dialog now has four separate stages:

**A. Orientation**

The title and short introduction sit in a clear header. Small metadata chips show the number of steps, reflection prompts, and where notes are stored. The header stays visible while scrolling so the exercise title remains identifiable.

**B. Purpose and context**

Two cards distinguish what the exercise is intended to help with from when it may be useful. These answer different questions and should not be merged into one long paragraph.

**C. Method**

Each suggested step is displayed in an individually bordered, numbered card. Desktop uses two columns where space permits; mobile switches to one column. The user can move through the procedure visually instead of reading a dense numbered list.

**D. Reflection**

A separate section introduces the writing task. Each prompt has a numbered label and an independently sized text area. The desktop layout uses two columns, while smaller screens use one column. The user is explicitly told that short notes are acceptable and that a prompt can be left blank when it does not fit.

The evidence explanation is hidden behind a disclosure control. The exercise remains usable without forcing the user to read the evidence note every time, but the note and source links are still available. The evidence is not concealed as a claim of certainty: the disclosure is explicitly labelled as evidence context and limitations.

The save bar remains visible near the bottom of the dialog. The dialog has a larger maximum width than before, with a mobile-specific layout and readable text sizes.

### Why the new design is preferable

The interface now separates **learning the exercise**, **understanding the steps**, and **writing a personal response**. It provides structure without making every information element visually equal. It also reduces the apparent length of a worksheet by allowing optional evidence to stay closed until needed.

A future refinement could add an optional progress indicator for the procedural steps. This should not force a user to complete every step or present progress as a measure of psychological improvement. It should only indicate which instructions have been viewed or checked.

---

## 6. Technique directory

The technique directory previously rendered each item's description, use context, full steps, evidence note, and references in a long repeated card. The revised version uses progressive disclosure:

- The default view shows the method's identity and concise description.
- “When it may help” has its own readable context panel.
- Suggested steps expand on demand.
- Evidence context and sources expand separately.
- The action to open the interactive worksheet remains visible.

This structure is especially important because the directory contains methods with different status. Core CBT procedures, specialist protocol components, and related approaches must not be presented as interchangeable or as if every method is a stand-alone treatment. The classification labels remain in the catalogue; the interface change is about density, not changing what each method claims to be.

---

## 7. Search and interaction audit

The search control previously filtered navigation content but did not fulfil the stronger user expectation created by the placeholder text: finding and opening a particular exercise. The new result panel searches workspace text and tool titles/descriptions/use contexts, places exact tool matches first, and opens the selected exercise directly.

Keyboard behaviour was added for moving from the search field to results, moving between results, selecting a result, and closing the panel. A click outside the top-bar search area closes the visible result list. The input's expanded state is updated as results appear or disappear.

The UI should still be tested for focus restoration after selecting or closing results, high zoom, narrow viewport clipping, and screen-reader announcements. The current static tests can check that the handlers exist; they cannot prove that the interaction feels correct on a real device.

---

## 8. Browser persistence, data integrity, and export

### Problems found

A local-storage write can fail, for example because browser storage is disabled or full. A success message should not be shown when the write did not occur. Restored local state also needs basic shape validation: browser storage can contain stale, malformed, or manually edited data.

### Changes made

The state loader now checks the active workspace, selected tab, journal entry array, check-in array, completion object, and library category before accepting them. Invalid or unrecognised values fall back to safe defaults or are excluded from restored records.

Worksheet and check-in saves now check the return value from the persistence operation. If storage fails, the application restores the previous in-memory collection and does not close the dialog or announce that the reflection was saved. Plan completion and note deletion similarly roll back when persistence fails. The clear-data action preserves the previous state if the updated state cannot be written.

Export still uses a generated JSON file. The temporary object URL is revoked after a short delay so the browser has time to initiate the download.

### Remaining tests

A complete persistence test should cover disabled storage, quota errors, malformed JSON, partially valid records, old records with missing optional fields, export of non-ASCII text, empty exports, and deletion after a failed save. Manual verification should confirm that users can recover notes after refreshing the page and can distinguish “saved locally” from “downloaded as an export.”

---

## 9. Content and clinical-scope audit

The site now contains 159 interactive tools across 25 workspaces. In this update, 22 tools were added: four each to anger, stress, general anxiety, and fear, and six to social anxiety. Five dedicated worksheet schemas were added for those new groups of procedures.

The additions are intentionally labelled as educational or practice aids. An exercise can adapt a recognised CBT procedure without becoming an independently validated treatment. The presence of a technique in a professional treatment guideline does not establish that a short self-guided worksheet reproduces the full protocol.

### Anger

The additions focus on interpretation checking, specific requests, planned pauses with a safe return condition, and contextual vulnerability monitoring. The content avoids cathartic venting, intimidation, revenge, and the assumption that anger itself is pathological. The safety text makes clear that immediate risk of violence requires distance and urgent support, not self-guided worksheet work.

### Stress

The additions address control versus influence, workload triage, anticipation, and a structured workload conversation. They explicitly preserve the distinction between individual coping and systemic conditions. A worksheet cannot resolve unsafe work, discrimination, inadequate staffing, financial insecurity, or unreasonable external demands.

### Anxiety

The additions map avoidance, worry-response loops, coping evidence, and valued action. They do not suggest avoiding legitimate health or safety advice. A reassurance-seeking exercise must never tell a user to ignore new symptoms or stop appropriate professional contact.

### Fear

The additions put objective risk assessment before approach planning. Exposure is not framed as a challenge to prove courage. Reasonable safety precautions remain in place, and the self-guided material does not direct users into objectively hazardous situations. Trauma-memory processing, panic-sensation induction, and OCD exposure and response prevention remain outside the self-guided scope.

### Social anxiety

The six new items cover safety behaviours, anticipatory processing, low-stakes conversation experiments, self-impression versus observable evidence, rigid performance rules, and clinician-guided video-feedback preparation. Video feedback is explicitly described as a clinician-guided component: users are not encouraged to record themselves and scrutinise footage repeatedly. Persistent or impairing social anxiety should be directed toward competent, disorder-specific care rather than represented as something a generic confidence worksheet can treat.

### Evidence discipline

The source register now has 50 records. New source records cover a 2025 social-anxiety psychotherapy network meta-analysis, an updated fear/safety-learning meta-analysis, a specific-phobia exposure meta-analysis, and a 2025 internet-CBT versus health-promotion trial for stress-related disorders. Each new tool includes a source reference and its own evidence note.

Evidence labels should remain conservative. The catalogue size is a product inventory measure, not a treatment-efficacy measure. The scientific review document records the distinction between core CBT procedures, specialist components, related approaches, and educational practice aids.

---

## 10. Privacy and data communication

The product is a static browser-based application. Exercise notes, check-ins, and plan progress are stored in the current browser's local storage. The application does not provide user accounts or a server-side journal.

This is convenient but must not be confused with encrypted storage. Local storage is not encrypted by the application. Other people with access to the same browser profile or device may be able to inspect saved entries. Clearing browser data, private browsing, browser changes, or device changes may make entries unavailable.

The privacy explanation should remain visible and direct. Any future cloud synchronisation feature would be a significant architecture and privacy change requiring authentication, access control, transport and storage security, retention rules, deletion controls, and an updated privacy notice. It should not be added casually to a mental-health journaling product.

The stylesheet loads optional Google Fonts. The site should retain its local font fallbacks when that external request is blocked. Personal journal content should never be included in font or analytics requests.

---

## 11. Accessibility and responsive-design status

The updated implementation includes readable exercise text, semantic buttons for workspace navigation, a labelled search control and result list, keyboard search interactions, responsive exercise and reflection grids, and reduced-motion handling already present in the stylesheet.

These are positive implementation features, not proof of conformance. The audit has not established WCAG 2.2 AA conformance. A later validation pass should include:

- Contrast measurements for muted labels, metadata, links, borders, and disabled states.
- Keyboard-only navigation through the sidebar, modal, disclosures, forms, and search results.
- Focus visibility and focus restoration when the dialog closes.
- Screen-reader checks for dialog naming, search-result announcements, field labels, and save feedback.
- Zoom and reflow checks at 200% and 400%.
- Touch target measurements on the smallest supported mobile viewport.
- Testing with reduced motion and with external fonts blocked.

Do not remove the 17px substantive text to fit more content. If a layout is crowded, change the grouping, spacing, or disclosure model instead.

---

## 12. Prioritised roadmap

### Priority 1 — verify the current release

1. Run the repository's Node 20 quality workflow on the latest commit.
2. Test the new exercise modal in a desktop browser and a narrow mobile viewport.
3. Verify direct exercise search, keyboard selection, and closing behaviour.
4. Test successful and failed local-storage writes and confirm the messages are accurate.
5. Test the export file and confirm that Unicode text and all expected records are present.

### Priority 2 — accessibility validation

1. Run axe or an equivalent automated scan.
2. Complete keyboard-only and screen-reader checks.
3. Measure text and control contrast, including hover, focus, and muted states.
4. Test 200% and 400% zoom and screen reflow.

### Priority 3 — product refinement

1. Organise large workspaces into meaningful, evidence-consistent groups.
2. Add a clear “start here” explanation that distinguishes reflection, behavioural experiments, and clinician-guided methods.
3. Consider optional step progress that tracks worksheet navigation without implying clinical improvement.
4. Add a search results page only if the result panel becomes crowded.
5. Continue reviewing the source register and guideline links on a regular schedule.

### Priority 4 — maintain scientific and ethical discipline

1. Keep diagnosis-specific treatment protocols separate from general emotion skills.
2. Review safety boundaries whenever new exposure, trauma, health, or interpersonal tools are introduced.
3. Never claim that a tool is clinically validated because the source technique appears in a guideline.
4. Avoid converting every theoretical construct into an interactive worksheet. Tools should solve a clear user task and have an identifiable evidence or educational rationale.

---

## 13. Acceptance criteria for future changes

A change should not be considered complete unless:

- The relevant workspace still loads and the tool opens from both the overview card and the technique list.
- Every tool uses an existing worksheet schema or a newly tested schema.
- Every newly added tool has a unique ID, a clear purpose, a realistic use context, actionable steps, an evidence note, and valid source IDs.
- New content does not contradict the workspace's safety boundary.
- Exercise content remains readable at the main text size without becoming visually undifferentiated.
- Desktop and mobile layouts remain usable.
- Search and keyboard access still work.
- Persistence failures do not produce false success messages.
- The repository's automated checks pass in CI.
- The scientific review and README counts match the actual data.

**Overall conclusion:** the site had enough content to be useful, but its presentation and a few interaction details were not keeping pace with the size of its library. The current update addresses the largest friction points by separating information into stages, making search genuinely actionable, protecting local-save feedback, and expanding the five requested workspaces with conservative evidence labels and clinical boundaries. Browser-level validation remains the next release gate.
