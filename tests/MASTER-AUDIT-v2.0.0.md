# MASTER AUDIT — Makmal Cilik v2.0.0

## Executive Summary

Makmal Cilik v2.0.0 retains exactly 6 school years, 58 units and 290 playable missions. The audit prioritised curriculum/science statements and then duplication, progression, interaction, language, accessibility, state, responsive behavior and release packaging. No year, unit or mission was added or removed. One repeated Year 3 discovery sequence was corrected, shared release UI was added, and reproducible renderer/test issues were fixed.

## Curriculum Audit

| Year | Units | Missions | Result and changes |
| --- | ---: | ---: | --- |
| 1 | 10 | 50 | Audited for direct observation, safe senses, living/non-living, body/plant parts, magnet poles, absorption, Earth and construction. Content retained; hub language shortened and stale copied CSS removed. |
| 2 | 7 | 35 | Audited simple skills, humans, animals, plants, light, circuits and mixtures. Existing scope retained. Circuit and plant wording already distinguishes model behavior from real time/safety. |
| 3 | 10 | 50 | Audited comparison, measurement, classification, density, litmus, Solar System and fixed pulley. Five Asid dan Alkali discoveries were specialised to their actual evidence. |
| 4 | 10 | 50 | Audited variables/relationships in humans, classification, photosynthesis, light, sound, energy, materials, Earth and machines. Content retained; hub/PICO language now stresses relationships and explanation. |
| 5 | 10 | 50 | Audited systems and multi-step reasoning in food webs, electricity, heat, rust, matter, Moon/buruj and machines. Content retained; hub/PICO language now stresses systems and change. |
| 6 | 11 | 55 | Audited evidence, interpretation and design across microorganisms, interactions, conservation, force, speed, preservation, waste, eclipses, constellations and machines. Content retained; hub language now stresses evidence and design. |

No structural curriculum change was required.

## Science Accuracy Audit

Reviewed statements include living/non-living characteristics; safe senses; plant needs and functions; animal body parts/classification; complete circuits; the qualified series/parallel brightness model; reflection/refraction; vibration and sound; transformations of energy; heat transfer versus temperature; changes of state; qualitative density; litmus evidence; microorganisms; rust requiring water and air; force/friction; speed as distance divided by time; chains/webs; reproduction; Moon phases; Solar System; eclipse geometry; constellations; and simple/compound machines.

Corrections: Year 3 litmus discoveries now distinguish the general indicator rule, acid evidence, alkali evidence, neutral evidence and inference for mystery samples. Safety wording remains virtual and forbids tasting/touching unknown materials. No technically false baseline statement was retained during the focused search.

## Duplicate Mission Audit

Exact-discovery analysis of the 255 data-driven Year 1/3/4/5/6 records found one duplicate group: all five Year 3 acid/alkali missions shared the same discovery. It was replaced with five evidence-specific conclusions. A repeat scan reports 255 unique discoveries for 255 missions. Year 2's 35 specialised engines were reviewed through their content and regression suites; repeated five-stage labels remain deliberate shared structure rather than duplicate curriculum.

## Learning Progression Audit

The release labels and mission designs now communicate the progression clearly: Year 1 observes/identifies; Year 2 predicts and tests simple outcomes; Year 3 compares/measures/classifies; Year 4 investigates relationships; Year 5 follows systems and transformations; Year 6 evaluates evidence and designs solutions. Higher-year records contain longer evidence sequences, fair-test controls, measurements, networks, diagnoses and design choices rather than copies of Year 1 activities.

## Language Audit

Visible recurring terms remain `Ramal`, `Cuba`, `Perhati`, `Fikir`, `Temui`, `misi`, `unit`, `eksperimen`, `Selesai`, `Seterusnya` and `Cuba lagi`. Hub subtitles no longer describe mature content as merely “baharu”; they state the expected thinking level. Year 1 retains short sentences and one-action prompts. English occurs only in technical/project identifiers or necessary proper names, with Malay visible labels.

## PICO Audit

Year 1 uses a short celebration. Years 4 and 5 no longer share identical completion dialogue: Year 4 refers to relationships/results; Year 5 to systems/change; Year 6 retains an evidence-oriented voice. PICO guidance is phase-specific and does not reveal the complete answer before the activity.

## Gameplay Variety Audit

The content registry uses select, inspect, match, sequence, classify, compare, manipulate, measure, simulate, diagnose, construct, investigate, network and design patterns. Year 2 retains custom circuit, light, mixture, plant and discovery engines. Predictions do not score the pupil; Perhati and Fikir depend on activity evidence.

## Accessibility Audit

All mission actions render as semantic buttons and support click/tap. Years 1, 3, 4, 5 and 6 completed every mission through real alternating Enter/Space inputs: 255 missions total (3,487 key activations). The 35 Year 2 workflows use the same native-button activation path and were exercised across all controls in browser regression; no custom control is drag-only. Sound/listening activities include visual/text evidence. Year 1 keeps 54 px controls; general QA enforces approximately 44 px. Focus styles and reduced-motion rules remain active.

## Keyboard QA

- Year 1: 50/50, 611 Enter/Space activations.
- Year 3: 50/50, 783 activations.
- Year 4: 50/50, 658 activations.
- Year 5: 50/50, 692 activations.
- Year 6: 55/55, 743 activations.
- Year 2: 35/35 semantic-button workflows and shared engine controls verified; representative global navigation, sound and fullscreen used real Enter/Space.

No focus trap or double completion was observed.

## Responsive QA

Every one of the 290 missions was completed twice at 1366×768, 1920×1080, 390×844, 360×640 and 800×450. Year 1 additionally ran 400 unit/storage/viewport combinations (4,000 completions). Years 3–6 ran 205 unit/viewport combinations (2,050 completions). Year 2 ran all 35 missions through its five unit-engine suites at all five viewports. Checks cover hit targets, clipped text, primary controls, horizontal overflow, navigation, hints, replay and runtime errors. Result: no application overflow, clipping or console error.

## Storage/Migration QA

v1.7 saves migrate to v2.0.0 while preserving `progress.year1` through `progress.year6`, settings, profile, original timestamps and compatible unknown fields. Fresh, legacy, partial, unit/year complete, all-years complete, malformed JSON, missing/bad records, blocked storage, replay and reload paths pass. Replay preserves the first `completedAt`; attempts continue according to existing rules.

## Cross-Year QA

Real browser transitions passed: 1→6, 6→2, 2→5, 5→3, 3→4 and 4→1. Each destination displayed its own heading/registry and no stale mission, dialogue, CSS, counter, hint or temporary state was observed. Android Back remains covered by its dedicated suite.

## Performance Audit

Canonical source: 436,227 bytes JavaScript and 74,744 bytes CSS. Production build: 107 files / 628,462 bytes. Production visual assets: 26 files / 111,033 bytes. Screens replace their DOM on route changes; the experiment mount disposer removes active handlers/state; progress data is registry-based; no framework was added. The master module adds one compact renderer rather than per-year copies.

## Asset Audit

The 2,027,103-byte official reference PNG remains excluded from production packaging. No content asset has a duplicate hash; identical zero-byte `.gitkeep` placeholders are non-production. Existing PICO, WebP module artwork and local SVG experiment diagrams are retained. No new visual asset was needed.

## Architecture Audit

Reviewed content registries, year engines, router, progress, completion, experience, interaction and PICO. Added a shared `MakmalMaster` renderer and `allYearsSummary()` rather than duplicating totals in each year. Removed stale Year 6 selector remnants from Year 1 CSS. Large year engines remain separate because a broad consolidation would risk curriculum-specific behavior; this is intentionally deferred.

## Security/Privacy Audit

Runtime source contains no external URL, fetch, XHR, WebSocket, analytics, tracker, account or personal-data transmission. All runtime files are local. The unused Android `INTERNET` permission was removed. Data remains localStorage-only.

## Master Completion QA

The route is guarded and redirects to Pilih Tahun until `allYearsComplete()` is true. It unlocks only at exactly 6/6 years, 58/58 units and 290/290 missions. The screen and compact progress view passed complete/incomplete scenarios at all five viewports. Pilih Tahun, Main Semula, Menu Utama and Back work without deleting progress.

## Bugs Found

- **P1:** A polish replacement during this audit corrupted five renderer identifiers/text files; caught by browser regression before release.
- **P2:** Five Year 3 acid/alkali missions repeated the same discovery despite different evidence.
- **P2:** No master completion route/view existed for the already-calculated all-years state.
- **P2:** Android template requested unused Internet permission.
- **P3:** Year 1 CSS contained unreachable selectors copied from Year 6.
- **P3:** Year 4/5 completion dialogue and several hub subtitles were unnecessarily repetitive.

## Bugs Fixed

All listed bugs were fixed. The five screen files were restored exactly from HEAD before controlled edits. `screen-registry.test.cjs` now asserts every renderer's exact global name to prevent recurrence.

## Deferred Issues

A final audio pack, device testing, APK/AAB, signing, Play Store work and a large cross-year engine consolidation remain outside v2.0 scope.

## Known Limitations

Curriculum alignment is project-level and is not an official Ministry certification. Scientific diagrams and time-based processes are simplified models and are labelled accordingly. No cloud sync or account recovery exists because storage is deliberately local-first.

## Final Totals

- 6 / 6 years
- 58 / 58 units
- 290 / 290 playable missions
- Version: Makmal Cilik v2.0.0
