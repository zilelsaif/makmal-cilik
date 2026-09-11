# Makmal Cilik

**Eksperimen. Fikir. Temui.**

**v0.4.0 by Zil-el-Saif** — educational Science game for Malaysian primary-school students, with KSSR / DSKP curriculum direction.

## This milestone

Electricity Mission 2, **Nyalakan Mentol**, is now playable. Choose two large terminals to snap each of three fixed wire connections into place, then close the switch. The bulb lights only when all connections are complete and the switch is closed. Opening the switch turns it off. Prediction accepts either answer, followed by hands-on construction, a four-part observation sequence, one mission-specific reflection and discovery. Wrong connections give gentle feedback and can be retried immediately.

Electricity Mission 1, **Kenali Peralatan**, is the first playable experiment. Children identify Bateri, Mentol, Wayar and Suis through **Ramal → Cuba → Perhati → Fikir → Temui**. Prediction and reflection give gentle feedback; matching supports dragging, selecting a label then tapping an object, and keyboard controls. Observation introduces each component in sequence. Hints and PICO guide the activity.

The seven Year 2 units and their five-mission structures remain. Electricity Missions 1 and 2 are playable. All other missions retain the in-game future-milestone message. This is a fixed educational circuit, not a generic simulator. There is no XP, stars, achievements, generic quiz engine, backend or Android packaging.

## Run

Serve this repository with any static HTTP server and open index.html. No npm dependencies or build step are needed. Development preview: http://127.0.0.1:4174/. GitHub and Cloudflare Pages remain configured externally; this task does not commit, push or deploy.

## Architecture

The existing non-module JavaScript and central router are retained.

- js/app.js: screens, global controls, experiment mounting and cleanup.
- js/router.js: title, mainMenu, yearSelect, year2, unitDetail, missionPlaceholder and experiment routes. Back returns to the logical parent; Home returns to Main Menu.
- js/progress.js: version, safe defaults, storage migration and independent Mission 1/2 progress.
- js/content/year2.js: seven units and five mission records per unit.
- js/content/experiments/electricity-mission1.js: component content and learning-step definitions.
- js/engine/experiment.js: guarded learning state and experiment rendering.
- js/engine/interaction.js: pointer dragging, tap/keyboard matching, terminal selection and cleanup.
- js/content/experiments/electricity-mission2.js: fixed terminal pairs, paths and PICO dialogue.
- js/engine/circuit.js: Mission 2 state rules and workbench rendering, mounted by the shared experiment engine.
- css/circuit.css: responsive circuit, SVG wire paths, switch lever and bulb glow.
- js/engine/pico.js: reusable mascot portrait and dialogue states.
- js/engine/rewards.js: optional sound hooks; no sound assets are registered or requested.
- css/experiment.css: workbench, learning rail, hints, PICO and responsive experiment layouts.

## Progress

The key remains makmalCilikData. v0.1.0, v0.2.0 and v0.3.0 saves migrate safely, retaining settings, profile, unknown fields and existing progress. Future schema versions remain intact. Missing/malformed storage uses defaults; unavailable storage uses memory only.

progress.year2.electricity.mission1 and mission2 each store completed, attempts, completedAt and lastCompletedAt. Attempts count started runs, not mistakes. Completion updates the corresponding mission to Selesai; Electricity shows 2 / 5 eksperimen only when both missions are complete. Replay preserves completion and the first completion timestamp. An unfinished learning step is not resumed after reload.

## Visual assets

No new raster assets in v0.4.0: **0 bytes**. Battery, bulb and production PICO (with the science-flask chest emblem) are reused. Wire paths, connector indicators, the moving switch lever and bulb illumination are rendered with SVG/CSS.

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

v0.4.0 adds `node tests/circuit.test.cjs` (20 repeated circuit runs and migration/replay checks) and `tests/circuit-browser.html` (20 isolated scenarios: four save states across all five requested viewports, two full completions each). It verifies wrong connections, incomplete/closed circuits, complete/open circuits, complete/closed circuits, progressive hints, mid-experiment reset, Back/Home, Mission 3 placeholder, independent saves, control sizing and overflow. Touch-style checks use synthetic pointer events plus taps; actual mouse and keyboard interactions are also exercised in the preview.

Both missions retain the shared five-step renderer, replay lifecycle, cleanup, PICO and silent-safe audio hooks. Mission 2 supports tap-then-tap and Enter/Space; it does not require dragging or freehand drawing. Terminals are at least 44px. Vertical scrolling is intentional on smaller or low-height screens.

Run node tests/experiment.test.cjs for state rules, 20 repeated runs, progression gates, hints, reset, migration, replay retention and blocked storage.

Open tests/browser.html through the local server and select Run storage and replay scenarios. The disposable iframe storage does not alter normal game saves. Fresh, v0.2.0, malformed, blocked and completed saves each pass three full completions/replays, including attempt counts, navigation, cancellation and image fallback checks. Cancellation is synthetic, not physical-device touch testing.

All five learning phases were exercised at measured CSS viewports 1366×768, 1920×1080, 390×844, 360×640 and 800×450. No horizontal overflow or clipped text/control boxes was detected; vertical scrolling keeps activity controls reachable. Desktop and portrait layouts were visually inspected. Dragging, tap matching and keyboard matching were exercised. Sound settings survive reload and fullscreen enters/exits. The rapid-tap suppression issue found during QA was fixed so a new pointer action is not discarded as a previous drag click.

## Limitations

Only Missions 1 and 2 are playable. There are no actual sound effects yet. PICO expression treatments share one image. No physical Android device was tested. Reduced-motion CSS is included; OS-level reduced-motion emulation was not exercised. With blocked storage, progress cannot survive a reload. Mission 3–5 remain placeholders. No v0.5.0 work is included.
