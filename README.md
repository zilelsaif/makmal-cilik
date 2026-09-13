# Makmal Cilik

**Eksperimen. Fikir. Temui.**

**v0.8.0 by Zil-el-Saif** — educational Science game for Malaysian primary-school students, with KSSR / DSKP curriculum direction.

## v0.8.0 polish pass

The existing 15 missions retain Ramal → Cuba → Perhati → Fikir → Temui. Shared objectives, concise PICO dialogue, contextual three-level hints, button labels and completion screens make the units consistent. Finales include a mission count and a Year 2 hub route. No curriculum unit or production asset was added.

The compact step rail, portrait action controls, focus fallback and scroll margins improve navigation. Feedback uses text plus colour and respects reduced-motion. Same-step actions retain PICO and the rail; hints retain the workbench. Audio hooks remain optional and silent-safe.

Audit: tests/UX-AUDIT-v0.8.0.md. Final strengthened browser regression passed **100 scenarios / 1,000 completions**: Electricity 40, light 30 and mixture 30 scenarios. All 15 missions also passed real keyboard completion. Sound persistence, fullscreen entry/exit and final application console checks passed. Native reduced-motion emulation and physical Android testing were unavailable.

## Playable content

**15 playable missions across three complete Year 2 units.**

| Elektrik | Terang & Gelap | Campuran |
| --- | --- | --- |
| Kenali Peralatan | Mana Sumber Cahaya? | Apa Dalam Campuran? |
| Nyalakan Mentol | Nyalakan Bilik | Gunakan Magnet |
| Mentol Tidak Menyala | Bayang-Bayang | Ayak Campuran |
| Suis Misteri | Halang Cahaya | Larut atau Tidak? |
| Cabaran Juruteknik | Misteri Dalam Gelap | Cabaran Asingkan Campuran |

Every mission follows **Ramal → Cuba → Perhati → Fikir → Temui**. Other Year 2 units remain placeholders.

Terang & Gelap introduces its own interactions: classify five light/non-light sources, illuminate three room regions, place a ball in a light beam to form a shadow, compare cardboard with clear plastic, and find PICO's flask behind an obstruction. The finale requires a real light source, at least two illuminated regions, moving the obstruction and selecting the revealed flask. Hidden or obstructed items are not interactive. Predictions do not block completion.

Campuran introduces material discovery, magnet pickup, sieving, dissolving tests and a two-step separation finale. Players predict sugar, salt and sand separately, then select a material, add it to fresh water and stir. Sugar/salt dissolve; sand stays visible. The finale removes iron clips with a magnet before sieving sand and pebbles. Wrong tools give gentle feedback and allow retry. No individual grains are interaction targets.

Electricity retains its matching, fixed circuit construction, deterministic repair, switch comparison and technician finale. No generic simulator, advanced electrical theory or generic quiz engine is introduced.

## Run

Serve this repository with a static HTTP server and open index.html. No npm dependencies, build, CDN, framework or backend is needed. Development preview: http://127.0.0.1:4174/. GitHub and Cloudflare Pages remain configured externally; this task does not commit, push or deploy.

## Architecture

The existing non-module JavaScript architecture remains. CSS and JavaScript URLs carry the release version to refresh stale browser caches after upgrades.

- js/content/year2.js: seven units and mission titles.
- js/content/experiments/: mission-specific content. Each unit defines its five missions and learning text in its own content file.
- js/content/experience.js: concise objectives and five PICO lines for each of 15 missions.
- js/engine/experience.js: shared contextual hints and completion presentation.
- css/polish.css: compact layout, focus/scroll treatment and feedback.
- js/engine/experiment.js: shared five-step layout, PICO, hints, lifecycle, replay, focus, progress and cleanup.
- js/engine/mixture.js: separate material/separation/dissolving rules and rendering. Mission content lives in js/content/experiments/mixtures.js.
- js/engine/light.js: independent light/shadow state rules and rendering; does not use circuit logic.
- js/engine/circuit.js: shared Electricity workbench and mission-specific starting states.
- js/engine/interaction.js: matching drag/tap support and circuit terminal input.
- js/engine/pico.js: production mascot and dialogue states.
- js/engine/rewards.js: silent-safe hooks including itemSelected, magnetPickup, sieveAction, stirring, separation, lightOn, itemFound, shadowFormed, correct/wrong, mission and unit completion. No audio files are required.
- js/progress.js: migration, per-unit mission records, derived counts and availability.
- js/router.js / js/app.js: routing, unit hubs and global controls.
- css/mixture.css: trays, tools, water tests, separation animations and responsive layout.
- css/light.css: dark room, illumination, source cards, shadow stage and responsive controls.

## Progress and replay

The key remains makmalCilikData. v0.1.0–v0.7.0 data migrates safely. Unknown fields, profile, settings, Electricity records, timestamps and unrelated Year 2 progress remain intact. Future version values are preserved. Missing/malformed data uses safe defaults; unavailable storage falls back to memory.

Records are separate under progress.year2.electricity, progress.year2.lightDark and progress.year2.mixtures. Each holds mission1–mission5 with completed, attempts, completedAt and lastCompletedAt. Attempts count meaningful starts/restarts, not mistakes. Replay retains completion and the original completedAt. Partial activity state is intentionally not persisted.

Each unit's Mission 1 is always available. Completing a mission opens the next; completed missions remain replayable, including when earlier records are missing. Both the hub and router enforce progression. Counts and unit completion are derived from mission records, avoiding inconsistent flags. Hubs show actual progress; other units remain 0 / 5. Back returns to the current unit, Home to Main Menu.

## Visual assets and interaction

Official reference: assets/reference/makmal-cilik-visual-target.png. It guides visual style and is never embedded as production artwork. Follow ASSET-GUIDELINES.md.

New v0.7 asset: **assets/experiments/mixtures/objects.svg — 3,557 bytes**, eleven used material/tool symbols. Reused v0.6 asset: **assets/experiments/light-dark/objects.svg — 3,305 bytes**, a shared SVG sprite with ten simple science/object symbols. No new raster assets. Production PICO, Electricity images and unit icons are reused. Darkness and light use lightweight CSS gradients; shadow geometry uses CSS shapes. No Canvas, WebGL, physics libraries or external assets.

All new missions use semantic buttons: mouse clicks, touch-style taps and Enter/Space. No dragging is required. Light controls remain outside dark visual layers. Hidden items have no action button until illumination and obstruction rules allow them. Focus stays visible; targets are at least 44px. Reduced-motion disables pickup, sieving, stirring, dissolving and existing movement/celebration animations.

## QA

Node tests:

- node tests/experience.test.cjs — shared hints, presentation, completion and v0.7 save retention.
- node tests/experiment.test.cjs — 20 Mission 1 rule/reset runs and storage cases.
- node tests/circuit.test.cjs — 20 Mission 2 circuit runs and independent saves.
- node tests/electricity-unit.test.cjs — 90 Electricity Missions 3–5 runs, progression/replay and migration.
- node tests/mixture.test.cjs — 150 runs including wrong tools, sequence, per-material predictions, stale/duplicate guards and v0.6 migration.
- node tests/light.test.cjs — 125 light activity runs, hidden-item guards, wrong actions, observation gates, resets and independent unit storage.

Browser fixtures (open via the static server):

- tests/mixture-browser.html — 30 scenarios: fresh, v0.7, partial/full Campuran, malformed and blocked storage across five viewports; 300 mission completions. Includes title/menu/year selection, current mission titles, input hit tests, replay, state guards and preservation of both existing units.
- tests/light-browser.html — 30 scenarios: six storage conditions × five viewports, every light mission completed twice (300 completions). Covers fresh data, v0.5.0 Electricity completion, partial/full light progress, malformed data, blocked storage, replay, timestamps, unrelated state, reset, Back/Home, hit-testing and hidden objects.
- tests/electricity-unit-browser.html — expanded to 40 Electricity regression scenarios (400 completions), including blocked storage and v0.7 saves, including matching, circuit construction, repair, both switch states, finale, progression, replay and persistence.
- tests/browser.html and tests/circuit-browser.html retain focused earlier regression coverage.

Browser fixtures use disposable in-memory saves and do not modify normal game saves. Actual preview interactions also verify keyboard controls and visual states.

Target sizes: **1366×768, 1920×1080, 390×844, 360×640 and 800×450**. All three final strengthened matrices passed without horizontal overflow or clipped controls. Layer hit tests verify that visual overlays do not intercept taps. Vertical scrolling is intentional on compact screens.

## Limitations

Only Elektrik, Terang & Gelap and Campuran are playable. Other units, Buku Makmal and achievements remain placeholders. No XP/stars, backend, login, ads, analytics, audio files or Android packaging. Touch-style input is simulated; no physical Android test or OS-level reduced-motion emulation was performed. Blocked storage cannot survive reload. No v0.9.0 work is included.
