# Makmal Cilik

**Eksperimen. Fikir. Temui.**

**v0.5.0 by Zil-el-Saif** — educational Science game for Malaysian primary-school students, with KSSR / DSKP curriculum direction.

## This milestone

**All five Sains Tahun 2 — Elektrik missions are playable**, with sequential progression and replay:

1. **Kenali Peralatan** — identify and match battery, bulb, wire and switch.
2. **Nyalakan Mentol** — build three fixed connections and close the switch.
3. **Mentol Tidak Menyala** — repair one deterministic broken connection between Suis A and Mentol A; the other two wires and closed switch are already set.
4. **Suis Misteri** — actively try closed and open switch states before advancing, then compare their effects on the bulb.
5. **Cabaran Juruteknik** — repair the final missing wire and close the switch to restore the lab lamp; finish with an Electricity unit checklist.

Every mission follows **Ramal → Cuba → Perhati → Fikir → Temui**. Predictions in Missions 2–5 do not block completion. Circuit work uses large fixed terminals, immediate gentle feedback and progressive hints. There is no freehand wiring or generic circuit simulator.

The seven Year 2 hubs remain. Other Year 2 units contain placeholders only. No XP, stars, achievements system, backend or packaging is included.

## Run

Serve this repository with any static HTTP server and open index.html. No npm dependencies or build step are needed. Development preview: http://127.0.0.1:4174/. GitHub and Cloudflare Pages remain configured externally; this task does not commit, push or deploy.

## Architecture

The existing non-module JavaScript and central router are retained.

- js/app.js: screens, global controls, experiment mounting and cleanup.
- js/router.js: title, mainMenu, yearSelect, year2, unitDetail, missionPlaceholder and experiment routes. Back returns to the logical parent; Home returns to Main Menu.
- js/progress.js: version, safe defaults, storage migration and independent Mission 1–5 progress and derived unlock/unit status.
- js/content/year2.js: seven units and five mission records per unit.
- js/content/experiments/electricity-mission1.js: component content and learning-step definitions.
- js/engine/experiment.js: guarded learning state and experiment rendering.
- js/engine/interaction.js: pointer dragging, tap/keyboard matching, terminal selection and cleanup.
- js/content/experiments/electricity-mission2.js: fixed terminal pairs, paths and PICO dialogue.
- js/engine/circuit.js: shared circuit rules, mission-specific initial states/observations and workbench rendering, mounted by the shared experiment engine.
- js/content/experiments/electricity-missions3-5.js: repair, switch comparison and finale content; reuses the Mission 2 workbench definition.
- css/circuit.css: responsive circuit, SVG wire paths, switch lever and bulb glow.
- js/engine/pico.js: reusable mascot portrait and dialogue states.
- js/engine/rewards.js: optional sound hooks; no sound assets are registered or requested.
- css/experiment.css: workbench, learning rail, hints, PICO and responsive experiment layouts.

## Progress

The key remains makmalCilikData. v0.1.0 through v0.4.0 saves migrate safely, retaining settings, profile, unknown fields and existing progress. Future schema versions remain intact. Missing/malformed storage uses defaults; unavailable storage uses memory only.

progress.year2.electricity.mission1 through mission5 each store completed, attempts, completedAt and lastCompletedAt. Attempts count started runs, not mistakes. Completion updates the corresponding mission to Selesai; Electricity counts all five completed records. Unit completion is derived from those records, avoiding a conflicting stored flag. Replay preserves completion and the first completion timestamp. An unfinished learning step is not resumed after reload.

Mission 1 is always available. A mission becomes available after its predecessor is completed, and already completed missions remain replayable even if an earlier record is missing. v0.4.0 users with Missions 1–2 completed immediately unlock Mission 3. Locked cards show Akan Datang and explain the prerequisite; the router also enforces availability. Malformed data cannot lock Mission 1. The finale displays UNIT ELEKTRIK SELESAI! only when all five records are completed.

## Visual assets

No new raster assets in v0.5.0: **0 bytes**. Battery, bulb and production PICO (with the science-flask chest emblem) are reused. Wire paths, connector indicators, the moving switch lever and bulb illumination are rendered with SVG/CSS.

The official reference in assets/reference guides the visual language and is never production artwork. Follow ASSET-GUIDELINES.md.

Generated and integrated for v0.3.0:

| Asset | Dimensions | Bytes |
| --- | --- | ---: |
| assets/experiments/electricity/mission1/battery.webp | 320 × 320 | 6600 |
| assets/experiments/electricity/mission1/bulb.webp | 320 × 320 | 5702 |
| assets/experiments/electricity/mission1/wire.webp | 320 × 320 | 4372 |
| assets/experiments/electricity/mission1/switch.webp | 320 × 320 | 7894 |
| assets/mascot/pico.webp | 384 × 384 | 17468 |

Total: 42,036 bytes. Existing seven Year 2 icons are retained. PICO now uses an actual generated portrait; neutral, thinking, happy, hint and success dialogue treatments share that portrait. No unused expression assets were generated. Missing images fall back to readable labels/mascot fallback.

## QA

Run:

- `node tests/experiment.test.cjs` — Mission 1 rules, 20 repeated runs, migration and blocked storage.
- `node tests/circuit.test.cjs` — Mission 2 rules, 20 repeated runs and independent save records.
- `node tests/electricity-unit.test.cjs` — 90 runs of Missions 3–5, deterministic resets, switch-state gates, migration, recovery, replay timestamps and derived completion.
- `tests/electricity-unit-browser.html` — 30 isolated browser scenarios: six save states across five sizes, each completing every mission twice (300 completions). Also checks prerequisite routing, touch-style taps after pointer movement, reset with active hints, Back/Home from every pre-completion phase of Missions 3–5, repeated listeners/attempts, completion firing once, unrelated saves and layout.
- `tests/browser.html` and `tests/circuit-browser.html` — retained Mission 1/2 regression suites, including wrong inputs, hint, replay, cancellation and image fallback. Mission 2 fixtures explicitly satisfy the Mission 1 prerequisite.

Browser fixtures use disposable in-memory saves and do not modify normal game saves. Required sizes: **1366×768, 1920×1080, 390×844, 360×640, 800×450**. No horizontal overflow or clipped text/controls was detected in the full-unit matrix. All missions completed at each size. Terminals remain at least 44px; vertical scrolling is intentional on small/low-height screens.

Mouse and keyboard interactions are exercised in the preview. Mission 3/5 repair uses tap/click or Enter without dragging; Mission 4 uses Enter/Space. Visible focus is preserved when terminal buttons become disabled. PICO and component assets are reused. Celebration and switch transitions respect reduced-motion CSS. Audio hooks for connection, switch, bulb, repair, mission and unit completion remain silent-safe without audio files.

## Limitations

Only Electricity experiments are playable. Other Year 2 units remain placeholders. No final audio effects, physical-device Android testing or OS-level reduced-motion emulation is included. With blocked storage, progress remains in memory only. Partial experiment state is not resumed after reload. No v0.6.0 work, commit, push or deployment is included.
