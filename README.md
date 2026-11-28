# CBT Workspace

An English-language, evidence-informed CBT skills workspace for adults. It is organised around the emotion or pattern a person wants to work with, with practical worksheets, flexible practice plans, evidence notes, and clear boundaries around self-guided care.

## What is included

- **26 workspaces:** anger, stress, anxiety, fear, low mood, frustration, guilt, shame, embarrassment, jealousy, rumination, low self-esteem, social anxiety, panic, OCD patterns, trauma reactions, sleep difficulties, perfectionism, health anxiety, chronic pain, adult ADHD skills, body-focused repetitive behaviours, substance-use recovery, eating-disorder CBT, prolonged grief, and CBT for psychosis support.
- **192 emotion-specific exercises plus 13 formulation tools (205 total):** each has a purpose, usage guidance, structured steps, evidence context, and linked sources. Specialist pages now include model-informed material where appropriate, with explicit clinician-led boundaries for higher-risk conditions.
- **91-method therapeutic technique directory:** searchable by intervention family, with the therapeutic approach labelled separately. It covers core CBT, specialist protocols, REBT, ACT, DBT, schema therapy, metacognitive therapy, MBCT, and compassion-focused methods.
- **Eight exercise families:** assessment and formulation, cognitive, behavioural, imagery and memory, attention and metacognitive, emotion regulation and distress tolerance, acceptance and values, and interpersonal communication.
- **Thoughts, beliefs & schemas hub:** a dedicated sidebar resource covering automatic thoughts, intermediate beliefs and rules, core beliefs, schemas, cognitive-maintenance loops, 13 guided tools, and 11 foundational books.
- **Evidence and reading base:** 85 linked sources and a curated reading list spanning CBT, REBT, ACT, DBT, schema therapy, metacognitive therapy, MBCT, and compassion-focused approaches.
- **Daily check-ins:** a simple self-reflection scale, explicitly not a diagnostic score.
- **Private journal:** saved worksheet reflections and check-ins, with JSON export and local deletion controls.
- **Scientific review:** see [docs/SCIENTIFIC_REVIEW.md](docs/SCIENTIFIC_REVIEW.md) for the evidence map, source register, clinical scope, and safety rules.
- **Product and usability audit:** see [docs/PRODUCT_AND_USABILITY_AUDIT.md](docs/PRODUCT_AND_USABILITY_AUDIT.md) for the interface review, interaction fixes, privacy and persistence analysis, accessibility roadmap, and release criteria.

## Run locally

No framework, build step, or third-party JavaScript package is required.

With Python installed:

```bash
python -m http.server 8000
```

Open [http://localhost:8000](http://localhost:8000).

The application uses ES modules, so do not open `index.html` directly with a `file://` URL.

## Quality checks

Requires Node.js 20 or later:

```bash
npm test
```

This checks JavaScript syntax and validates the 26-workspace library, 192 emotion tools, 13 formulation tools, 83 technique-directory entries, evidence references, the expanded anger/stress/fear/anxiety and social-anxiety workspaces, and key safety boundaries.

GitHub Actions workflow files are included under `.github/workflows/`. A repository Actions runner must be enabled for those checks to execute.

## Publish with GitHub Pages

The repository includes a static GitHub Pages deployment workflow at `.github/workflows/pages.yml`.

1. Open **Settings → Pages** in the repository.
2. Under **Build and deployment**, choose **GitHub Actions** as the source.
3. Ensure GitHub Actions are enabled for the repository.
4. Push to `main` or manually run the deployment workflow.

**Repository visibility matters:** GitHub Pages is available for public repositories on GitHub Free. Publishing from a private personal repository requires an eligible paid plan. A Pages site is public by default, even if its source repository is private. Review the current [GitHub Pages eligibility](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages) and [publishing-source instructions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) before enabling public access.

## Privacy

This is a static, browser-only application. It has no account system, server-side journal, analytics, or AI service. Worksheet notes, check-ins, and plan progress are kept in the current browser's local storage. They are not uploaded by this application.

Local storage is **not encrypted**. Anyone with access to the same browser profile or device may be able to read saved entries. Private browsing, clearing site data, or switching devices may remove them. Export important notes and avoid saving sensitive details on a shared or monitored device.

The stylesheet loads optional Google Fonts. If that request is blocked, local system font fallbacks remain available. No journal content is sent with the font request.

## Scientific and clinical scope

This is an educational skills workspace, **not a medical device, diagnostic instrument, or substitute for psychotherapy**. Evidence strength differs by emotion and condition. Some areas provide general CBT-informed exercises, while panic, OCD, trauma, and chronic insomnia include explicit restrictions because parts of their validated treatment protocols require assessment and trained professional support.

The accompanying review is a targeted evidence map, not a formally registered PRISMA systematic review or a complete guideline appraisal. It is dated 27 November 2026 and should be updated when guidelines and research change.

Do not use the site to manage an immediate crisis, risk of harm, abuse, violence, or a medical emergency. Seek appropriate local professional or emergency support when safety is at risk.
