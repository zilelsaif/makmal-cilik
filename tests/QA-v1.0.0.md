# Makmal Cilik v1.0.0 — release QA

Date: 2026-09-15. Local static preview, Codex in-app Chromium browser. Repository-only changes; no commit, push or deployment.

## Result

**All seven Year 2 units and all 35 missions are playable.** Every mission was exercised at all five target sizes. Final browser matrices passed 250 scenarios / 2,500 mission completions. The new-unit matrix was also run successfully before the final ruler polish (another 1,200 completions), and all 15 new missions were completed through actual Enter/Space input. **Total verified completed browser runs: 3,715 mission completions.** Interrupted early attempts are excluded from that total.

## Browser scenarios

| Fixture | Scenarios | Mission completions in final pass | Result |
| --- | ---: | ---: | --- |
| electricity-unit-browser.html | 40 | 400 | PASS |
| light-browser.html | 30 | 300 | PASS |
| mixture-browser.html | 30 | 300 | PASS |
| plants-browser.html | 30 | 300 | PASS |
| release-browser.html | 120 | 1,200 | PASS |
| **Total** | **250** | **2,500** | **PASS** |

Fixtures run real app DOM, rendering, interactions and storage adapters in isolated iframe documents. Test saves are disposable memory stores, not the normal game's save. Controls receive touch-style pointer events followed by clicks; hit testing checks that the control centre is not intercepted. These are browser automation tests, not physical touchscreen tests.

Every new-unit scenario completes each of five missions twice, checks hint stages, negative choices, completion exactly once per run, replay attempts/timestamps, phase guards, reset, Back/Home and independent unit data. Long-run repeated navigation tests detect stale hints/state and duplicate audio dispatch. Old-unit fixtures retain their full circuit/light/mixture/plant guards and replay coverage.

## Viewport coverage

| CSS viewport | Existing 20 missions | New 15 missions | Year 2 finale | Overflow / clipped controls |
| --- | --- | --- | --- | --- |
| 1366×768 | PASS | PASS | PASS | None |
| 1920×1080 | PASS | PASS | PASS | None |
| 390×844 | PASS | PASS | PASS | None |
| 360×640 | PASS | PASS | PASS | None |
| 800×450 | PASS | PASS | PASS | None |

All sizes are explicit iframe CSS dimensions in the matrices. Normal-page visual checks additionally covered portrait title/menu, animal care, movement/body controls, ruler and finale. The desktop browser's display scaling was compensated for a directly measured normal-page 360×640 check; scrollWidth was 347px with the vertical scrollbar, below the 360px viewport. Vertical scrolling on compact screens is intentional. Normal-page screenshots supplement the matrix; they are not the source of exact-size matrix coverage.

Checks include text scroll bounds, button height ≥44px, horizontal document bounds, PICO stability within a phase, semantic five-step indicator, visible phase content, return controls and tap interception. Full-page screenshots can repeat sticky elements; DOM and normal viewport views were used to distinguish screenshot stitching from real duplicate controls.

## Storage tests

The 120 new scenarios comprise five viewports × three units × eight conditions:

1. Fresh/no data.
2. v0.9.0 data with all four old units complete.
3. Partial new-unit progress (including a later completed mission).
4. Current new unit complete.
5. All seven units complete.
6. Malformed JSON.
7. Invalid mission records / attempts.
8. Blocked localStorage.

Every scenario includes replay. Original completedAt, settings, profile, unknown fields and other units remain unchanged. Mission 1 remains available, completed later missions can replay, and sequential unlocks work. Blocked storage remains usable in memory; it cannot survive a real reload. Derived totals equal the mission records. Incomplete saves cannot open the Year 2 finale route.

Actual normal-page reload preserved 32/35 progress during keyboard testing, then the final completed hub showed 35/35 and 7/7. No save was manually edited to reach these counts.

## Keyboard and accessibility

All 15 new missions were completed with supported browser Enter/Space operations on semantic buttons. This includes inspection before matching, all animal/body movements, care, both measured strips, both ramp predictions and the five-part science finale. No dragging is needed. Focus outlines were visible and the shared renderer restores focus after redraw. Text and checkmarks accompany colour changes. The three Year 2 finale buttons were tested: return to hub, choose any unit to replay, and Main Menu.

Reduced-motion CSS disables optional movement/transitions and leaves static observed results. OS preference emulation and screen-reader testing were not performed. No physical Android device test.

## Regression and global controls

- Title Screen, Main Menu, Pilih Tahun, all seven hubs, mission intros/completions and unit finales passed.
- All 20 old missions passed their existing browser regression suites on v1.0.0.
- Sound toggled through UI, remained enabled after reload, then was restored to the original disabled preference.
- Fullscreen button entered and exited fullscreen; fullscreenchange-driven label/pressed state changed correctly, without an application error.
- Back/Home and replay retained saved completion.
- Final normal-page and fixture console error logs were empty; fixtures also captured page errors/unhandled rejections and reported none.

## Automated logic tests

All eight Node suites passed:

- discovery.test.cjs: 450 new mission runs, invalid action guards, wrong prediction acceptance, zero alignment, reflection/observation gates, reset, v0.9 migration, 35-record totals and blocked storage.
- experiment.test.cjs: 20 original matching runs and save cases.
- circuit.test.cjs: 20 circuit runs.
- electricity-unit.test.cjs: 90 repair/switch/finale runs.
- light.test.cjs: 125 activity runs.
- mixture.test.cjs: 150 activity runs.
- plants.test.cjs: 150 activity runs.
- experience.test.cjs: shared presentation and 60 contextual hint paths across the original 15 missions.

JavaScript syntax checks and git diff whitespace checks passed.

## Issues found and fixed

- Corrected a care-feedback spelling error (“Bersedia”).
- Science finale described measuring a ball but reused the strip picture: it now renders a round ball with guide lines to ruler endpoints. Strip activities retain their own diagrams. The full 120-scenario matrix passed again after this correction.
- Local preview/browser sessions were interrupted during QA; the loopback server and browser session were recovered and completed runs were verified. This was an environment interruption, not an application failure. No interrupted attempt is claimed as a successful run.

No progression, duplicate completion, replay/timestamp, touch interception or horizontal overflow failure remained in the completed test matrices.

## Performance and assets

New assets: rabbit.webp 8,434 bytes; animals.svg 2,549 bytes; senses.svg 1,355 bytes. Total new imagery 12,338 bytes. All production image/SVG assets total 105,593 bytes. Reference PNG 2,027,103 bytes is excluded from production and never rendered. Largest production SVG is the existing mixtures sprite, 3,557 bytes. Hash audit found no duplicate production images.

No framework or new runtime dependency. The new investigation engine introduces no timers/listeners; it reuses the shared experiment lifecycle. The existing AbortController detaches experiment listeners, interaction cleanup is called on navigation, and audio is stopped on exit/restart. PICO and live regions are retained during same-phase updates; only the bounded activity workbench redraws. New movement effects use CSS, with no ongoing simulation loop. A formal memory profiler benchmark was not run.

## Known limitations

Simplified educational simulations, no official curriculum certification claim, no final audio files, no physical Android/device/Play Store test, no screen-reader or OS reduced-motion test. Other school years and non-learning menu placeholders remain unimplemented. No next milestone work.

## Version

**Makmal Cilik v1.0.0** — visible `v1.0.0 by Zil-el-Saif` verified.
