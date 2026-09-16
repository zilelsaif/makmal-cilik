# Makmal Cilik

**Eksperimen. Fikir. Temui.**

**v1.2.0 by Zil-el-Saif** — Android polish and debug packaging for the complete Sains Tahun 2 release: **7 units and 35 playable missions**.

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

Serve this repository with a static HTTP server and open `index.html`. Development preview: http://127.0.0.1:4174/. The browser game still needs no framework, npm installation, build, CDN or backend. Android packaging uses the Capacitor dependencies described below. The existing GitHub / Cloudflare Pages static architecture is preserved. This task does not commit, push or deploy.

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

## v1.0.0 curriculum QA

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

Other school years and Buku Makmal/profile/achievement pages remain placeholders. No XP, stars, full achievement logic, login, backend, ads, analytics or final sound files. Storage blocked by the browser cannot persist through reload. No physical Android device or Play Store readiness testing; touch-style events and responsive browser layouts were tested. OS-level reduced-motion and screen-reader testing were not performed. Scientific scenes are deliberately simplified. No v1.3.0 work has been started.

## v1.1.0 — Android debug shell

App identity: **Makmal Cilik**, `com.zilelsaif.makmalcilik`. Capacitor core/Android/CLI 8.5.2 and the App plugin 8.1.1 are pinned in package-lock.json. The App plugin handles native Back; no analytics, ads, purchase, orientation or audio plugin was added. Capacitor's built-in SystemBars handles insets.

Canonical source remains `index.html`, `css/`, `js/` and `assets/` at repository root. **Do not edit `www/` or `android/app/src/main/assets/public/`**: both are generated. `scripts/build-web.cjs` recreates only `www/`, refuses linked source/output directories, copies runtime file types and excludes reference artwork, tests, dotfiles and documentation. Current bundle: 54 files / 332,172 bytes before Capacitor bridge injection. No remote server URL is configured; the APK uses bundled local files.

### Windows debug workflow

Requirements: Node.js 22+, JDK 21+ (JAVA_HOME), Android SDK Platform 36 with Build Tools installed, and internet for the initial dependency downloads. Android Studio can open the generated `android/` project. The existing machine used Microsoft JDK 21, SDK 36 and Gradle 8.14.3.

```bat
npm ci
build-android-debug.bat
```

The script regenerates www, syncs Capacitor, detects the SDK (ANDROID_HOME, ANDROID_SDK_ROOT, then the standard Windows SDK location), creates a local debug key if needed and invokes Gradle. Each failure stops the script. Output:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

Useful commands:

```bat
npm run build:web
npm run sync:android
npm run android:open
```

Gradle/npm packaging caches and the debug key are ignored under `.cache/`; generated www and Android build outputs are also ignored. Keep `.cache/debug.keystore` if you want subsequent debug APKs to use the same signing identity. The standard debug key is not production signing. The build script prints the final APK path only after success. No release AAB or Play Store signing workflow is provided.

### Android behavior

- Back inside a mission returns safely to its unit; subsequent presses follow the existing screen hierarchy. Only the title screen offers a cancelable exit dialog. Back while that dialog is open dismisses it. Browser navigation remains unchanged.
- The browser fullscreen control is hidden in native Android; system bars remain available. The browser version retains its existing fullscreen behavior and error handling.
- Portrait and landscape are not locked. CSS uses safe-area env values and Capacitor's inset variables for status/navigation bars and cutouts. Existing tap/click alternatives remain; no drag-only mission was introduced.
- The `makmalCilikData` schema is unchanged. v1.0.0 records migrate to v1.1.0 while retaining settings, profile and mission records. WebView DOM storage is enabled by Capacitor and local origin remains stable. A browser website's save does not automatically transfer into the Android app's separate storage. Clearing app data/uninstalling can remove progress.
- App restart and rotation persistence on a real device still require device validation; no connected Android device or configured emulator was available in this session. Native Back/inset tests use a simulated bridge and do not replace native testing.

Debug APK successfully built and archive-verified (4,312,551 bytes). All 35 missions passed the v1.1.0 browser matrices: 250 scenarios / 2,500 completions. Five additional simulated Android shell scenarios passed. See `tests/QA-v1.1.0.md` for build output verification and web/shell regression results. The native launcher/splash remain Capacitor template assets for this debug milestone. npm audit reports three moderate development-only findings through CLI → xcode → uuid; those iOS tooling dependencies are not part of the Android APK. No forced dependency downgrade/override was applied.

References: [Capacitor environment setup](https://capacitorjs.com/docs/getting-started/environment-setup), [App Back API](https://capacitorjs.com/docs/apis/app), and the installed `@capacitor/core/system-bars.md` documentation.

## v1.2.0 — Android polish

Launcher branding now uses the original blue/white/yellow flask mark, adaptive foreground/background and all five legacy densities (square and round). The launch screen uses the flask, Makmal Cilik wordmark and “Eksperimen. Fikir. Temui.”, with Android 12+ system splash resources and a lightweight legacy layer-list. No default Capacitor artwork remains. See `assets/branding/ASSET-PROVENANCE.md` for source, generation and byte sizes.

Built-in SystemBars uses LIGHT (dark icons on our pale lab background), CSS insets and an initial viewport-fit hint. MainActivity enables edge-to-edge and gives the WebView a matching background while local HTML loads. Safe-area CSS accounts for all four sides and bounds the exit dialog. No extra native dependency was added. Both orientations remain enabled.

Native Back follows mission → unit → Tahun 2 → year selection → main menu → title. At the title, “Keluar dari Makmal Cilik?” offers **Batal** / **Keluar**; Back cancels the dialog. Duplicate Back events within 250ms are ignored. App backgrounding dismisses the exit dialog and stops optional audio; resuming retains the mounted mission without re-registering listeners or rewriting progress. Tap feedback is native-scoped. All 35 missions retain tap/click and keyboard alternatives.

v1.1.0 saves migrate to v1.2.0 with the same key/schema/origin and original completion timestamps. App restart returns to Title with saved progress; partial experiment state is intentionally not restored after process death. No sound pack was added: unregistered sounds stay silent and blocked playback is caught.

The Windows workflow above is unchanged: `build-android-debug.bat` regenerates www, syncs Capacitor and builds the debug APK, stopping on errors. Current APK: **v1.2.0, versionCode 2**, package **com.zilelsaif.makmalcilik**, **4,147,164 bytes** at `android/app/build/outputs/apk/debug/app-debug.apk`. All 55 local web files were archive-verified; there is no remote server URL. Keep the existing local debug keystore to update an installed debug app without changing signing identity.

QA and physical-device checklist: `tests/QA-v1.2.0.md`. No device or configured emulator was available: real system bars/cutouts, launcher/splash transitions, hardware Back, Home/resume and process restart still need physical validation. This is a debug APK, not a Play Store release. Earlier version sections above are historical records.
