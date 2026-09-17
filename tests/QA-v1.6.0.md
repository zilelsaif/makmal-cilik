# Makmal Cilik v1.6.0 QA

## Release scope

- Year 6: 11 playable units and 55 playable missions.
- Whole project: 48 units and 240 playable missions (Year 2: 35; Years 3–5: 50 each; Year 6: 55).
- Version: `v1.6.0 by Zil-el-Saif`; Android `versionCode 6`.
- No APK/AAB, commit, push or deployment.

## Logic, progression and storage

All local `tests/*.test.cjs` suites pass. `year6.test.cjs` completes 880 mission runs across fresh, migrated v1.5.0, partial, unit-complete, year-complete, malformed, blocked and invalid-record saves. It verifies phase guards, meaningful activity completion, sequential unlock, replay, attempts, first-completion timestamps, 11/11 and 55/55 totals, and preservation of Years 2–5, settings, profile and unknown fields.

Mission 1 remains available in every unit. Completed missions remain replayable. Storage blocked by the browser falls back to usable in-memory state but cannot persist through reload.

## Browser and responsive matrix

`year6-browser.html` exercises five target viewports and eight isolated storage states. Each mission is completed twice per state with checks for Title/Menu/Year navigation, Back/Home, progression, replay, hints, pointer/tap dispatch, 44px controls, clipping, horizontal overflow, counters, completion guards, duplicate writes and runtime errors.

| Viewport | Storage states | Expected completion runs |
| --- | ---: | ---: |
| 1366×768 | 8 | 880 |
| 1920×1080 | 8 | 880 |
| 390×844 | 8 | 880 |
| 360×640 | 8 | 880 |
| 800×450 | 8 | 880 |

Final result: **PASS — 440 unit scenarios / 4,400 mission completions**. Every viewport and storage state completed all 55 missions twice with navigation, replay, hints, 44px targets, progress records, no clipping, no horizontal overflow and no application runtime error.

`year6-keyboard.html` passed all **55 / 55 missions** using actual alternating Enter/Space input (**743 trusted key presses**). The fixture focuses the same semantic production controls and does not call activity handlers directly.

A fresh production-page smoke test verified `v1.6.0 by Zil-el-Saif`, all 11 Year 6 unit cards, sound persistence after reload, fullscreen enter/exit and an empty application console.

## Curriculum adjustments and accuracy

- Microorganism activities use fictional virtual samples and explicitly avoid home culturing.
- Ecological relationships are limited to observable Year 6 examples; habitat change is modelled without graphic imagery.
- Malaysian examples include the Malayan tiger, turtles and Rafflesia; conservation status is described broadly rather than as a live legal database.
- Force remains qualitative. Speed uses `speed = distance ÷ time` with metres, seconds and m/s.
- Food preservation is virtual and does not provide unsafe home-processing instructions.
- Waste prevention is prioritised before reuse and recycling; batteries use a special collection route.
- Eclipse models warn never to look directly at the Sun, explain that eclipses do not occur monthly, and are labelled not to scale.
- Year 6 constellation content deepens direction, seasonal visibility and multi-source navigation rather than repeating only recognition.
- Machine content emphasizes evaluation, diagnosis and safe compound-machine design rather than repeating earlier pulley/lever activities.

## Accessibility and performance

All activities use semantic buttons, textual/checkmark state, visible focus, click/tap and Enter/Space activation. No mission requires dragging, colour discrimination or audio. Targets are designed at 44px or larger. Reduced-motion rules remove optional animation while preserving state.

No new production bitmap, SVG, audio or binary asset was generated: **0 new asset bytes**. Models are code-native. Explicit actions and event delegation avoid running simulation timers and listener growth.

## Bugs fixed

- Added Year 6-aware experiment, hint, completion, routing and Back/Home branches instead of allowing Year 6 definitions to fall through earlier-year engines.
- Extended old-save normalization and regression expectations to include a safe empty `progress.year6` container.

## Limitations

No physical Android device or configured emulator was available. Real cutouts/system bars, hardware Back, process restart, screen-reader announcements and OS-level reduced-motion require device testing. Scientific and astronomical models are simplified and not to physical scale.
