# Makmal Cilik

**Eksperimen. Fikir. Temui.**

**v1.0.0 by Zil-el-Saif** — first complete Sains Tahun 2 release: **7 units and 35 playable missions**.

## Playable content

| Unit | Five missions, in order |
| --- | --- |
| Kemahiran Saintifik | Mata Saintis; Kumpul dan Kelas; Ukur Dengan Betul; Apa Akan Berlaku?; Cabaran Saintis Cilik |
| Manusia | Kenali Deria; Apa Yang Kita Rasa?; Tubuh Kita Bergerak; Pilihan Sihat; Misi Jaga Diri |
| Haiwan | Haiwan Perlukan Apa?; Tempat Tinggal Haiwan; Cara Haiwan Bergerak; Anak dan Induk; Selamatkan Haiwan |
| Tumbuhan | Apa Tumbuhan Perlukan?; Tumbuhan Dahaga; Bahagian Tumbuhan; Arah Cahaya; Selamatkan Pokok Layu |
| Terang & Gelap | Mana Sumber Cahaya?; Nyalakan Bilik; Bayang-Bayang; Halang Cahaya; Misteri Dalam Gelap |
| Elektrik | Kenali Peralatan; Nyalakan Mentol; Mentol Tidak Menyala; Suis Misteri; Cabaran Juruteknik |
| Campuran | Apa Dalam Campuran?; Gunakan Magnet; Ayak Campuran; Larut atau Tidak?; Cabaran Asingkan Campuran |

Every mission follows **Ramal → Cuba → Perhati → Fikir → Temui**. Children provide resources, inspect evidence, match, classify, align and read a ruler, test predictions, build/repair circuits and compare observations. Predictions are not scored or penalized. Reflection follows an activity; this is not a bank of multiple-choice questions.

The curriculum direction is Malaysian primary-school Science / KSSR / DSKP. This release follows the project's agreed Year 2 content plan; it does not claim official curriculum certification. Human content is basic senses, movement and general daily care, without medical or advanced anatomy advice. Movements are demonstrated by a screen model; children need not perform them physically. Plant growth takes days in reality and is explicitly a simulation. Ball/ramp tests are simplified demonstrations; the ruler measures the labelled diagram scale, not physical screen centimetres.

## Progress, replay and Year 2 completion

Each unit is independently selectable. Mission 1 is always available; completing a mission unlocks the next. Completed missions remain replayable, even with missing earlier records. Both routing and hub buttons enforce availability.

The existing `makmalCilikData` localStorage key is retained. v0.1.0–v0.9.0 saves migrate with settings, profile, unknown fields and unrelated progress preserved. Future version values remain intact. Invalid records recover safely; blocked storage falls back to memory.

Records live under `progress.year2.{electricity,lightDark,mixtures,plants,animals,humans,scienceSkills}`. Each contains mission1–mission5 with `completed`, `attempts`, `completedAt` and `lastCompletedAt`. Attempts count meaningful starts/restarts, not mistakes. Replay preserves completion and the original completion timestamp. Partial experiment state is not persisted.

Unit and Year 2 totals are derived from the 35 records, without duplicate completion flags. When all records are complete, the mission completion and Year 2 hub offer the **SAINS TAHUN 2 SELESAI!** screen with 7/7 units, 35/35 experiments, return to Year 2, replay any unit and Main Menu. Back/Home preserve saved progress.

## Run and architecture

Serve this repository with a static HTTP server and open `index.html`. Development preview: http://127.0.0.1:4174/. No framework, npm dependency, build, CDN or backend is needed. The existing GitHub / Cloudflare Pages static architecture is preserved. This task does not commit, push or deploy.

The non-module `window.Makmal...` architecture remains. Versioned stylesheet/script URLs refresh release caches.

- `js/content/year2.js`: hub units and mission summaries.
- `js/content/experiments/new-units.js`: all 15 Haiwan, Manusia and Kemahiran Saintifik mission definitions, dialogue, observations and reflection.
- `js/engine/discovery.js`: small care, matching, inspection, movement, classification, measurement and prediction/test primitives for the new units only.
- `css/discovery.css`: responsive activity diagrams, cards and Year 2 finale.
- `js/engine/year-completion.js`: derived Year 2 completion screen.
- `js/engine/experiment.js`: shared phases, mounting, focus, replay, audio dispatch and cleanup.
- `js/engine/experience.js`: standardized three-stage hints and shared completion presentation.
- `js/engine/{circuit,light,mixture,plants}.js`: existing independent activity engines; new biological/scientific logic is not added to them.
- `js/engine/interaction.js`: existing drag/tap alternatives and circuit terminals.
- `js/engine/pico.js`: existing production mascot.
- `js/engine/rewards.js`: silent-safe hooks, including movement, measurement, classification, observation and Year 2 completion. Audio files are optional.
- `js/progress.js`: migration, records, availability and derived totals.
- `js/router.js` / `js/app.js`: routing, all seven unit hubs and global controls.

## Assets and accessibility

Follow `ASSET-GUIDELINES.md`. The official visual target in `assets/reference/` guides blue framing, rounded white cards and green/yellow accents; it is never production artwork.

New production assets:

| File | Bytes |
| --- | ---: |
| assets/experiments/animals/rabbit.webp | 8,434 |
| assets/experiments/animals/animals.svg | 2,549 |
| assets/experiments/humans/senses.svg | 1,355 |
| **New total** | **12,338** |

Rabbit artwork was generated in the Codex workflow and optimized to WebP. Animal/sense sprites are simple native SVG. Body poses, ruler, shape groups and ramp diagrams use SVG/CSS. See `assets/experiments/animals/ASSET-PROVENANCE.md`. PICO (17,468 bytes), all seven unit icons and existing experiment assets are reused. All production imagery totals 105,593 bytes; the unused-in-UI reference image is separate (2,027,103 bytes). No duplicate production imagery or oversized SVG was found.

All new missions support click, tap and keyboard Enter/Space with semantic controls, visible focus, text/checkmark state and targets at least 44px. No mission requires dragging. Reduced-motion rules disable optional movement and transitions; static results remain visible. Compact screens intentionally scroll vertically, with Back/Home and experiment controls available.

## QA

See **`tests/QA-v1.0.0.md`** and **`tests/UX-AUDIT-v1.0.0.md`**. The earlier `tests/UX-AUDIT-v0.8.0.md` is retained.

Final browser matrices passed **250 scenarios / 2,500 mission completions** at 1366×768, 1920×1080, 390×844, 360×640 and 800×450. All 35 missions were covered at every size with replay, storage, navigation, hit targets, counters and error/overflow checks. All 15 new missions were additionally completed with actual Enter/Space input. Fullscreen and sound persistence were checked through the normal UI.

Run Node tests with `node tests/<name>.test.cjs`: discovery, plants, mixture, light, electricity-unit, circuit, experiment and experience. Discovery covers 450 mission runs, invalid-action guards, wrong predictions, ruler alignment, resets, migration and totals.

Browser fixtures, opened through the static server, use isolated disposable in-memory saves:

- `tests/release-browser.html`: 120 scenarios / 1,200 completions for the new units.
- `tests/electricity-unit-browser.html`: 40 / 400.
- `tests/light-browser.html`: 30 / 300.
- `tests/mixture-browser.html`: 30 / 300.
- `tests/plants-browser.html`: 30 / 300.

## Known limitations

Other school years and Buku Makmal/profile/achievement pages remain placeholders. No XP, stars, full achievement logic, login, backend, ads, analytics or final sound files. Storage blocked by the browser cannot persist through reload. No physical Android device, Android packaging or Play Store readiness testing; touch-style events and responsive browser layouts were tested. OS-level reduced-motion and screen-reader testing were not performed. Scientific scenes are deliberately simplified. No next milestone has been started.
