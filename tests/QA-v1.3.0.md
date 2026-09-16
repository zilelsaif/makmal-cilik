# Makmal Cilik v1.3.0 — release QA

Tested 16–17 September 2026. Work is limited to the existing repository; no commit, push, deployment or v1.4.0 work.

## Files Changed

- Runtime/version: `index.html`, `package.json`, `package-lock.json`, `android/app/build.gradle`.
- Shared integration: `js/app.js`, `js/router.js`, `js/progress.js`, `js/engine/experiment.js`, `js/engine/experience.js`.
- New content: `js/content/year3/index.js` plus ten unit files.
- New presentation/engines: seven files in `js/engine/year3/` and `css/year3.css`.
- Assets: seven SVGs and provenance in `assets/experiments/year3/`.
- Documentation: `README.md`, this QA report. Existing fixture version expectations updated; new Year 3 logic/browser/keyboard fixtures and regression runner; Android fixture extended to both years.

## New Engine Modules

`core.js` owns Year 3 phase guards and presentation helpers; `sorting.js` handles evidence inspection/classification and ordered actions; `measurement.js` handles ruler/grid/cubes/liquid/displacement plus ramp inquiry; `density.js` handles flotation/boat and propagation models; `acid-alkali.js` handles paired litmus observations; `solar-pulley.js` handles orbit/temperature and fixed-pulley models; `screens.js` renders hub, unit and completion screens. Existing shared input, PICO, hints, audio hooks and save handling remain in use.

## Implemented coverage

All 50 Year 3 missions use Ramal → Cuba → Perhati → Fikir → Temui. Prediction is unpenalized; observation and reflection follow meaningful activity. All ten units are independently selectable, with five sequential missions each.

| Unit | Coverage |
| --- | --- |
| Kemahiran Saintifik | Leaf evidence, classification, zero-aligned ruler, inference from evidence, ramp prediction/test records |
| Peraturan Bilik Sains | Inspect hazards, select safe actions, order broken-glass/spill response, safety review |
| Manusia | Tooth types/layers, dental care sequence, balanced food groups, food passage sequence |
| Haiwan | Diet categories, food choices, tooth evidence, infer diet, mixed diet challenge |
| Tumbuh-tumbuhan | Propagation methods, seed/cutting comparison, multiple methods, importance, simulated growth of seed and cutting |
| Pengukuran | Area squares, half-square estimate, unit-cube layers, eye-level liquid reading, displacement difference |
| Ketumpatan | Float/sink tests, same-volume material comparison, salt/stir egg model, classification after testing, hollow boat/cargo model |
| Asid dan Alkali | Red/blue litmus, acid/alkali/neutral sample tests, three mystery classifications after both papers |
| Sistem Suria | Members, eight-planet order, Venus temperature exception, stepped orbits, Earth/Neptune comparison |
| Mesin | Fixed-pulley parts, load movement, opposite directions, applications, ordered assembly and pull |

Exact mission titles are listed in README. Year 2 retains all seven units and 35 missions.

## Automated logic QA — PASS

All `tests/*.test.cjs` suites passed: android-shell, audio-readiness, build-web, circuit, discovery, electricity-unit, experience, experiment, light, mixture, plants and year3.

`year3.test.cjs`: 800 mission runs (50 × eight storage states × completion/replay), invalid-action and phase guards, unpenalized wrong predictions, reflection gate, resets, unlocks, original completion timestamps, year totals and preservation of Year 2/settings/profile. Independent assertions cover litmus colours, salt-water result change, baseline-before-displacement, pulley direction/assembly and orbit setup guards.

## Year 3 responsive/browser QA — PASS

`year3-browser.html`: **400 unit scenarios / 4,000 mission completions**. Every mission completed twice at every target viewport for every storage fixture.

| CSS viewport | Missions | Result |
| --- | ---: | --- |
| 1366 × 768 | 50 + replay, all storage fixtures | PASS |
| 1920 × 1080 | 50 + replay, all storage fixtures | PASS |
| 390 × 844 | 50 + replay, all storage fixtures | PASS |
| 360 × 640 | 50 + replay, all storage fixtures | PASS |
| 800 × 450 | 50 + replay, all storage fixtures | PASS |

Checks run at each phase and interaction: no document horizontal overflow, no clipped button/heading/paragraph content, targets at least 44px, unobstructed centre hit-testing, semantic controls, three-stage hints, touch-style pointer/click events, exactly one completion write per completion, no duplicated audio dispatch and no uncaught errors/unhandled rejections. Back/Home, hub counts, completion guards, all 50 records, all ten unit totals, finale and replay were checked. Vertically scrolling content is intentional on small screens.

## Storage QA — PASS

Fresh, migrated v1.2.0, partial Year 3, one complete unit, full Year 3, malformed JSON, blocked storage and malformed mission records were tested. Replay runs in every fixture. Same `makmalCilikData` key; Year 2, settings, profile and unknown fields remain unchanged. Derived Year 3 completion avoids conflicting flags. Mission 1 always remains available; completed missions remain replayable. Blocked storage is memory-only by design.

## Keyboard QA

**PASS: all 50 missions completed using actual Enter/Space input (783 trusted key events).** `year3-keyboard.html` uses disposable saves and an on-screen next-control guide; the external driver sends actual Enter/Space events, checked as trusted input. The fixture does not auto-click mission controls.

## Year 2 regression / Android simulation

**PASS: all regression suites.** `regression-v1.3.html` completed the five existing Year 2 browser matrices:

| Fixture | Scenarios | Mission completions |
| --- | ---: | ---: |
| release-browser (Haiwan, Manusia, Kemahiran Saintifik) | 120 | 1,200 |
| electricity-unit-browser | 40 | 400 |
| light-browser | 30 | 300 |
| mixture-browser | 30 | 300 |
| plants-browser | 30 | 300 |
| **Year 2 total** | **250** | **2,500** |

All 35 missions were completed and replayed at all five target viewports, with hints, activity guards, storage, navigation, counters, hit targets and overflow/error checks. Combined Year 2 + Year 3 automated browser matrices cover **650 scenarios / 6,500 completions**, plus 50 actual-keyboard Year 3 completions.

`android-browser.html`: **all five Android shell scenarios passed**, covering Back routing, rotation/resume preservation, native listener counts, safe areas, both year finales, cancel/confirm exit and all **85 missions** (425 mission navigation/lifecycle cases). Native simulation is not physical device testing. No app console errors or unhandled errors were reported. The final colour-only pulley change was included in this last Android simulation and the rerun Year 3 logic suite.

## Global controls and visual review

Visible version, Title → Main Menu → Year Selection → Year 3 → Unit navigation, sound toggle/reload persistence and fullscreen enter/exit passed through the normal UI. The original mute setting was restored. No console errors were captured. Portrait hub review confirmed all ten unit images loaded and document width matched the 390px viewport.

## Performance and asset audit

Seven new SVG files total **4,892 bytes**; largest is the shared sprite at **2,641 bytes**. No duplicate hashes in the new SVG set. Existing PICO, branding and four Year 2 unit icons are reused. Reference artwork is excluded from production output. No new raster assets or framework/dependency were required.

| File | Bytes |
| --- | ---: |
| diagrams.svg | 2,641 |
| icon-lab-rules.svg | 269 |
| icon-measurement.svg | 641 |
| icon-density.svg | 321 |
| icon-acid-alkali.svg | 319 |
| icon-solar-system.svg | 288 |
| icon-machines.svg | 413 |

Year 3 domains add no listeners, intervals, animation frames or autonomous timers. Shared mount uses AbortController, disposes pointer listeners and stops optional audio when leaving. Redraw replaces the workbench rather than accumulating scenes; mascot/live-region/step rail stay stable during a phase. Manual orbit/growth steps avoid animation cleanup and reduced-motion conflicts. Long-run replay checks found no duplicate completion/audio events. After 50 keyboard completions and returning to Main Menu, the DOM contained zero experiment roots and one PICO (111 elements total). No heap profiler or real low-end device benchmark is claimed.

Production bundle: **81 files / 450,404 bytes**, excluding test/reference/docs. `npm run sync:android` passed; all 81 bundled files were byte-compared against Android public assets successfully. Android versionName is 1.3.0 and versionCode is 3; no packaging redesign. Existing APK from the earlier milestone is not claimed as a newly built v1.3.0 APK.

## Issues fixed

- Increased the fixed-pulley load label contrast by using a pale blue load behind the existing dark text; no layout or interaction changed.
- Restored dependency versions/resolved URLs accidentally touched by a broad version replacement; package-lock now changes only the two project version fields. No dependency upgrade.
- Updated the historical exact-save test to accept the migration-safe empty Year 3 default while still comparing all previous fields exactly.
- Added event-loop yields to the large browser fixture to keep the test runner responsive; no gameplay delay or timer was added.
- Browser automation timeouts and a stopped preview server were recovered without erasing saves. Capacitor's sandbox profile lookup failure was resolved by running the normal sync command with authorized permissions.

## Curriculum and limitations

Topics were checked against the KPM-authored [Dokumen Penjajaran KSSR Sains Tahap 1 Edisi 3, Year 3 section](https://ecentral.my/wp-content/uploads/2024/09/DOKUMEN-PENJAJARAN_KSSR-SAINS-TAHAP-1_EDISI-3.pdf), hosted by a third party. This is alignment, not official certification or an exhaustive assessment syllabus.

Solar facts checked against NASA: [planet temperatures](https://science.nasa.gov/solar-system/temperatures-across-our-solar-system/), [Neptune's 165-year orbit](https://science.nasa.gov/neptune/neptune-facts/), and [orbital data](https://science.nasa.gov/learn/basics-of-space-flight/chapter1-2/). Models are simplified and labelled as not to scale. Plant and orbital time are compressed; density is qualitative. A fixed pulley changes direction without claiming reduced weight. Chemical tests are virtual and explicitly prohibit tasting/touching unknown materials.

No real Android device/emulator, OS screen reader, or OS reduced-motion setting was exercised in this milestone. CSS reduced-motion rules remain present. No final sound pack, login, analytics, backend, ads, cloud sync, Play Store release, signed AAB or other school-year content. Partial experiment state is intentionally not persisted through process death.

## Year 3 Completion / Progression

The completion screen derives 10/10 units and 50/50 missions from saved records, shows PICO and unit names, and offers return/replay/Home controls. All units are accessible; mission availability is sequential within each unit, with Mission 1 always accessible and completed missions always replayable. Replay resets only the experiment state and retains the first completion timestamp.

## Accessibility

All 50 Year 3 missions passed actual Enter/Space completion. Click/tap alternatives, visible focus, semantic buttons, textual state labels and minimum 44px targets remain. There are no drag-only tasks. CSS reduced-motion rules remain; orbit/growth models advance manually. Screen-reader and OS reduced-motion testing remain limitations, not claimed passes.

## Version

**Makmal Cilik v1.3.0** — visible text **v1.3.0 by Zil-el-Saif**.

**ALL 10 YEAR 3 UNITS ARE PLAYABLE.**

**ALL 50 YEAR 3 MISSIONS ARE PLAYABLE.**

**ALL 35 YEAR 2 MISSIONS REMAIN PLAYABLE.**
