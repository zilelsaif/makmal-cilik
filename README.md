# Makmal Cilik

**Eksperimen. Fikir. Temui.**

**v1.4.0 by Zil-el-Saif** — Sains Tahun 2, Tahun 3 and Tahun 4: **27 units and 135 playable missions**.

## Year 2 — 35 playable missions

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

## Year 3 — 50 playable missions

| Unit | Five missions, in order |
| --- | --- |
| Kemahiran Saintifik | Mata Pemerhati; Kelas Dengan Bukti; Ukur Tepat; Buat Inferens; Ramal & Uji |
| Peraturan Bilik Sains | Kenali Bahaya; Pilih Tindakan Selamat; Alat Pecah; Tumpahan Makmal; Cabaran Makmal Selamat |
| Manusia | Kenali Jenis Gigi; Struktur Gigi; Jaga Gigi; Pinggan Seimbang; Laluan Makanan |
| Haiwan | Herbivor, Karnivor atau Omnivor?; Cari Makanan; Gigi Haiwan; Teka Daripada Gigi; Cabaran Pemakanan |
| Tumbuh-tumbuhan | Cara Membiak; Biji atau Keratan?; Satu Pokok, Banyak Cara; Mengapa Perlu Membiak?; Makmal Pembiakan |
| Pengukuran | Ukur Luas; Anggar Luas; Isi Padu Kotak; Isi Padu Cecair; Objek Tidak Sekata |
| Ketumpatan | Timbul atau Tenggelam?; Banding Ketumpatan; Ubah Air; Susun Objek; Cabaran Kapal Terapung |
| Asid dan Alkali | Kenali Litmus; Uji Asid; Uji Alkali; Neutral atau Tidak?; Cabaran Bahan Misteri |
| Sistem Suria | Kenali Ahli Sistem Suria; Susun Planet; Panas atau Sejuk; Ikut Orbit; Cabaran Sistem Suria |
| Mesin | Kenali Takal; Angkat Beban; Arah Tarikan; Cari Takal; Bina Sistem Takal |

Activities include inspecting evidence before classifying, arranging sequences, aligning rulers, counting area and volume, reading liquid levels, water displacement, testing floating objects, salt-water and boat models, two-colour litmus tests, planet ordering/orbit steps and a fixed pulley. Every mission retains the five learning phases, three-stage hints, replay and PICO.

Content follows the Year 3 topics in the KPM-authored [Dokumen Penjajaran KSSR Sains Tahap 1 Edisi 3](https://ecentral.my/wp-content/uploads/2024/09/DOKUMEN-PENJAJARAN_KSSR-SAINS-TAHAP-1_EDISI-3.pdf); this is topic alignment, not official certification. Chemical activities are virtual: never taste or directly touch unknown materials. Diagrams are not to physical scale. Plant growth and orbit time are compressed; density models are qualitative. Venus is identified as the hottest planet, rather than assuming the nearest planet is hottest. A fixed pulley changes pull direction and does not claim to reduce the load's weight.

### Year 3 architecture and saves

- `js/content/year3/index.js` and ten unit files separate content from rendering.
- `js/engine/year3/core.js` shares phase guards, feedback and hints; `sorting.js`, `measurement.js`, `density.js`, `acid-alkali.js` and `solar-pulley.js` implement the small activity models.
- `js/engine/year3/screens.js` renders the hub, mission lists and year celebration; `css/year3.css` handles responsive presentation.
- Shared experiment, progress, router, PICO, audio and Android integration remain in use.

The same save key is retained. v1.2.0 saves gain `progress.year3` safely while keeping Year 2, settings, profile and unrelated fields. Records are `progress.year3[unitId].mission1` through `mission5`, each with completion, attempts and timestamps. Completion totals are derived independently for each year. Mission 1 always remains available; each completion unlocks the next mission in that unit. Completed missions remain replayable and preserve their first completion timestamp. All ten units are independently selectable.

Year 3 completion shows **SAINS TAHUN 3 SELESAI!**, **10 / 10 units** and **50 / 50 experiments**, with replay and navigation controls. See `tests/QA-v1.3.0.md` for final verification and limitations.

## Year 4 — 50 playable missions

| Unit | Five missions, in order |
| --- | --- |
| Kemahiran Saintifik | Perhati Dengan Teliti; Cari Pemboleh Ubah; Bina Hipotesis; Uji Dengan Adil; Penyiasatan Saintis |
| Manusia | Laluan Udara; Tarik dan Hembus Nafas; Oksigen dan Karbon Dioksida; Kadar Pernafasan; Cabaran Model Pernafasan |
| Haiwan | Organ Pernafasan Haiwan; Cara Haiwan Bernafas; Vertebrata atau Invertebrata?; Kenali Kumpulan Vertebrata; Cabaran Pengelasan Haiwan |
| Tumbuhan | Tumbuhan Bergerak Balas; Arah Cahaya; Akar Mencari Air; Daun Bertindak Balas; Cabaran Fotosintesis |
| Sifat Cahaya | Cahaya Bergerak Lurus; Misteri Bayang-Bayang; Cermin Memantul; Cahaya Membelok; Makmal Cahaya |
| Bunyi | Bunyi Daripada Getaran; Bunyi Ke Semua Arah; Gema!; Bunyi Baik atau Mengganggu?; Cabaran Kurangkan Bunyi |
| Tenaga | Dari Mana Tenaga Datang?; Kenali Bentuk Tenaga; Tenaga Berubah Bentuk; Boleh Diperbaharui atau Tidak?; Jejak Tenaga |
| Bahan | Dari Mana Bahan Datang?; Kenali Sifat Bahan; Pilih Bahan Sesuai; Serap atau Kalis Air?; Jurutera Bahan |
| Bumi | Tarikan Bumi; Jatuh Ke Mana?; Putaran Bumi; Siang dan Malam; Cabaran Bumi Bergerak |
| Mesin | Kenali Mesin Ringkas; Pilih Alat Yang Sesuai; Tuas Membantu; Mesin Dalam Kehidupan; Cabaran Cipta Mesin |

Year 4 uses evidence inspection, classification, controlled comparisons, ordered investigations and design choices. Sound activities always include visible vibration/wave evidence, so audio is not required. Earth content distinguishes 24-hour rotation from the roughly 365¼-day revolution. Machines focus on levers, simple-machine selection and complex machines without repeating the Year 3 pulley simulator.

Content is separated in `js/content/year4/`; reusable phase and activity logic lives in `js/engine/year4/`; responsive models and cards live in `css/year4.css`. Saves use `progress.year4[unitId].mission1` through `mission5`. Migration from v1.3.0 preserves Year 2, Year 3, settings, profile, unknown fields and first-completion timestamps. Ten unit totals and the 50-mission year total are derived from mission records.

Year 4 completion shows **SAINS TAHUN 4 SELESAI!**, **10 / 10 units** and **50 / 50 experiments**. See `tests/QA-v1.4.0.md` for the final matrix.

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

Historical v1.0.0 production assets:

| File | Bytes |
| --- | ---: |
| assets/experiments/animals/rabbit.webp | 8,434 |
| assets/experiments/animals/animals.svg | 2,549 |
| assets/experiments/humans/senses.svg | 1,355 |
| **New total** | **12,338** |

Rabbit artwork was generated in the Codex workflow and optimized to WebP. Animal/sense sprites are simple native SVG. Body poses, ruler, shape groups and ramp diagrams use SVG/CSS. See `assets/experiments/animals/ASSET-PROVENANCE.md`. PICO (17,468 bytes), all seven unit icons and existing experiment assets are reused. Before v1.3.0, production imagery totalled 105,593 bytes; the unused-in-UI reference image is separate (2,027,103 bytes). No duplicate production imagery or oversized SVG was found.

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

Years 1, 5 and 6 and Buku Makmal/profile/achievement pages remain placeholders. No XP, stars, full achievement logic, login, backend, ads, analytics or final sound files. Storage blocked by the browser cannot persist through reload. No physical Android device or Play Store readiness testing; touch-style events and responsive browser layouts were tested. OS-level reduced-motion and screen-reader testing were not performed. Scientific scenes are deliberately simplified.

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

## v1.3.0 asset additions

Seven compact code-native SVG files add six hub icons and a shared evidence sprite (4,892 bytes total). See `assets/experiments/year3/ASSET-PROVENANCE.md`. Existing PICO, branding, Year 2 icons and artwork are reused. No new raster illustration or duplicate PICO was required; diagrams remain crisp at mobile sizes. The visual target stays reference-only.

Year 3 controls are semantic buttons with visible focus, textual state labels, at least 44px targets, and click/tap/Enter/Space alternatives. No activity requires dragging. Orbit and growth models advance by explicit actions rather than running timers. Reduced-motion styling and existing Android safe-area rules remain intact.

The v1.3.0 production web bundle contains 81 files (450,404 bytes before Capacitor bridge injection). Android source metadata is v1.3.0 / versionCode 3 and normal Capacitor sync passed. No new APK or release AAB was built for this curriculum milestone; previous APK sizes above are historical.

Final v1.3.0 QA passed: 400 Year 3 scenarios / 4,000 completions, 250 Year 2 scenarios / 2,500 completions, all 50 Year 3 missions via actual Enter/Space, and five Android bridge simulations covering all 85 missions. All five requested viewports passed without horizontal overflow or application errors. See `tests/QA-v1.3.0.md` for the measured scope and remaining physical-device limitations.

## v1.4.0 — complete Sains Tahun 4

Ten Year 4 units add 50 playable missions while reusing the shared PICO, navigation, progress, audio hooks and five-phase experiment shell. The release contains **135 playable missions** in total: 35 for Year 2, 50 for Year 3 and 50 for Year 4. No new raster or binary production asset was needed; the Year 4 laboratory models use lightweight HTML/CSS and child-friendly symbols.

Final browser QA passed **400 Year 4 unit scenarios / 4,000 mission completions** across 1366×768, 1920×1080, 390×844, 360×640 and 800×450. Eight save states at every size cover fresh, v1.3.0, partial, complete, malformed and blocked storage. All local Node suites pass, including 800 Year 4 logic runs and the full Year 2/3 regressions. Android metadata is **v1.4.0 / versionCode 4**; normal web build and Capacitor sync are part of the release check. No APK/AAB was built, and no commit, push or deployment is performed by this work.
