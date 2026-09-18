# Makmal Cilik v1.7.0 QA

## Scope

- Version: `v1.7.0 by Zil-el-Saif`; Android `versionCode 7` / `versionName 1.7.0`.
- Year 1: 10 units, 50 playable missions.
- Full curriculum registry: 58 units and 290 playable missions (Y1 50, Y2 35, Y3 50, Y4 50, Y5 50, Y6 55).

## Year 1 curriculum and reading load

All requested unit and mission names are exact. Missions use 2–5 visible actions, two prediction choices, short one-action instructions, large controls and concise discoveries. Sound observation has text/visual feedback and remains solvable while muted. No activity asks a child to taste or smell a real item. Moving machines are explicitly separated from living things; magnet attraction/repulsion, virtual absorption, basic Earth surfaces and structure stability remain within the requested introductory scope. No curriculum-title adjustment was needed.

## Automated mission and storage QA

`tests/year1.test.cjs` completed all 50 definitions twice across eight storage conditions (800 runs): fresh, migrated/legacy, partial, completed unit, completed year, malformed, blocked and malformed records. It verifies guarded steps, hints, replay, preserved `completedAt`, sequential unlock, unknown compatible data and Years 2–6 preservation. The all-years fixture verifies exactly 58 completed units / 290 missions and `allYearsComplete() === true`; incomplete data remains false.

The complete Node regression suite passes for circuit, light, mixtures, plants, discovery, shared experience, Android shell/audio/build and Years 1–6. Existing Year suites cover 35 Year 2 missions, 50 each for Years 3–5 and 55 Year 6 missions.

## Responsive and interaction QA

`tests/year1-browser.html` runs every Year 1 mission twice at 1366×768, 1920×1080, 390×844, 360×640 and 800×450 across fresh, migrated, partial, unit-complete, year-complete, malformed, blocked and bad-record saves. It checks tap hit testing, >=44 px global targets (Year 1 CSS uses 54 px), hints, Back/Home, replay, counters, completion writes, clipped text, horizontal overflow and application errors.

`tests/year1-keyboard.html` covers all 50 missions through the browser's Enter/Space control path. Controls remain semantic buttons with visible global focus; no mission requires drag, audio, or colour alone. Reduced motion rules disable Year 1 animation and transitions.

Cross-year smoke coverage verifies Year 1 → Year 6, Year 6 → Year 1, Year 2 → Year 5 and Year 5 → Year 3 routing without stale content, counter or screen state. Sound persistence, fullscreen enter/exit and the production console are checked on the real application page.

## Performance and assets

The production web build contains 105 files / 624,270 bytes. New Year 1 source CSS/JS totals 29,522 bytes. Rendering remains on demand and the shared document listener/experiment disposal path is retained. No bitmap, WebP or SVG production asset was generated (0 bytes); existing PICO plus CSS and semantic pictorial cues are reused.

## Bugs fixed

- Added missing Year 1 route, renderer, experiment, hint and completion dispatch.
- Added migration-safe `progress.year1` without replacing Years 2–6 or unknown fields.
- Made generated choice IDs deterministic for stable replay and QA.
- Added exact all-years totals and prevented `allYearsComplete` from succeeding early.
- Added child-sized Year 1 controls and responsive card wrapping.
- Updated legacy migration regression to account for the new empty Year 1 store.

## Known limitations

The v1.7 milestone does not include the v2.0 master finale, final sound library, backend/cloud sync, analytics, APK/AAB generation or device QA. Year 1 illustrations intentionally use CSS/emoji-style pictorial cues rather than new bitmap assets.
