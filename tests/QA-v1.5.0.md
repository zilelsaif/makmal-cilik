# Makmal Cilik v1.5.0 QA

## Release scope

- Year 5: 10 playable units and 50 playable missions.
- Whole project: 37 units and 185 playable missions (Year 2: 35; Years 3–5: 50 each).
- Version: `v1.5.0 by Zil-el-Saif`; Android `versionCode 5`.
- No APK/AAB, commit, push or deployment.

## Logic, progression and storage

All local `tests/*.test.cjs` suites pass. `year5.test.cjs` completes 800 mission runs across fresh, migrated v1.4.0, partial, unit-complete, year-complete, malformed, blocked and invalid-record saves. It verifies phase guards, meaningful action completion, unlock order, replay, attempts, first-completion timestamps, 10/10 and 50/50 totals, and preservation of Year 2, Year 3, Year 4, settings, profile and unknown fields.

The Year 2, Year 3 and Year 4 logic suites remain green. Mission 1 is always available per unit. Completed missions remain replayable. Blocked storage falls back to usable in-memory state but cannot persist through reload.

## Browser and responsive matrix

`year5-browser.html` exercises five target viewports and eight isolated storage states. Each of the 50 missions is completed twice per state, with checks for Title/Menu/Year navigation, Back/Home, progression, replay, hints, pointer/tap dispatch, 44px controls, clipping, horizontal overflow, counters, finale guards, duplicate completion writes and runtime errors.

| Viewport | Storage states | Expected completion runs |
| --- | ---: | ---: |
| 1366×768 | 8 | 800 |
| 1920×1080 | 8 | 800 |
| 390×844 | 8 | 800 |
| 360×640 | 8 | 800 |
| 800×450 | 8 | 800 |

Final result: **PASS — 400 unit scenarios / 4,000 mission completions**. Every viewport and storage state completed all 50 missions twice with navigation, replay, hints, 44px targets, progress records, no clipping, no horizontal overflow and no application runtime error.

`year5-keyboard.html` also passed all **50 / 50 missions** using actual alternating Enter/Space input (**692 trusted key presses**). The fixture focuses the same semantic controls used by the production game; it does not call activity handlers directly.

A fresh production-page smoke test verified the visible `v1.5.0 by Zil-el-Saif` label, Years 2–5 availability, all 10 Year 5 unit cards, sound persistence across reload, successful enter/exit fullscreen and an empty application console.

## Curriculum adjustments and accuracy

- Electricity uses qualitative models only: series has one path; parallel has multiple paths. No voltage/resistance equations. Mains electricity is shown as adult-supervised and never an activity target.
- Heat flows from higher-temperature to lower-temperature objects; heat and temperature are described separately. Temperature readings use °C.
- Rust is limited to iron-containing materials and requires water plus air in the simplified experiment. All setups are virtual.
- Matter uses observable state properties and phase changes without advanced particle theory.
- The Moon does not change shape; the visible illuminated portion changes with relative positions. Constellation patterns are explicitly simplified and direction use depends on place, time and visibility.
- Machine activities emphasize gears and combinations, avoiding a repeat of the Year 3 pulley and Year 4 lever experiments.

## Accessibility and performance

Every activity uses semantic buttons with textual/checkmark state, visible focus, tap/click and keyboard activation. No mission requires dragging, colour discrimination or audio. Targets are designed at 44px or larger. Reduced-motion rules remove optional animation while preserving static state.

No new production image, SVG, audio or binary asset was generated: **0 new asset bytes**. PICO and existing shared artwork are reused. Year 5 diagrams are code-native. Activities use event delegation and explicit actions rather than running timers, keeping DOM and listener growth bounded.

## Bugs fixed

- Added the missing Year 5 completion-renderer branch discovered by browser QA; unit-five completion no longer falls through to Year 2 content lookup.

## Limitations

No physical Android device or configured emulator was available. Real cutouts/system bars, hardware Back, process restart, screen-reader announcements and OS-level reduced-motion still need device testing. Scientific diagrams are simplified learning models rather than medical, engineering or astronomical scale drawings.
