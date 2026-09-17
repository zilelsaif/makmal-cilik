# Makmal Cilik v1.4.0 QA

## Release scope

- Sains Tahun 4: 10 units, 50 playable missions.
- Whole project: 27 units, 135 playable missions (Year 2: 35; Year 3: 50; Year 4: 50).
- Version text and package metadata: `v1.4.0 by Zil-el-Saif` / Android `versionCode 4`.
- No APK/AAB release build, deployment, commit or push was performed.

## Automated logic and storage

All `tests/*.test.cjs` suites passed. `year4.test.cjs` completed 800 mission runs: all 50 definitions, twice, across fresh, v1.3.0, partial, unit-complete, year-complete, malformed, blocked and invalid-record saves. It verifies phase guards, meaningful action completion, replay, attempts, first `completedAt`, progressive unlocks, 10/10 and 50/50 derived totals, and preservation of Year 2, Year 3, settings, profile and unknown fields.

The existing Year 2 and Year 3 logic suites also passed, including their scientific invariants and save migrations. Malformed data recovers safely in memory; blocked localStorage remains usable for the active session but cannot persist through reload.

## Browser and responsive matrix

`year4-browser.html` passed **400 unit scenarios / 4,000 mission completions**:

| Viewport | Save states | Units | Result |
| --- | ---: | ---: | --- |
| 1366×768 | 8 | 10 | PASS |
| 1920×1080 | 8 | 10 | PASS |
| 390×844 | 8 | 10 | PASS |
| 360×640 | 8 | 10 | PASS |
| 800×450 | 8 | 10 | PASS |

Every mission was completed twice at each size. Checks covered Title → Main Menu → Year Selection → Year 4 → Unit → Mission, Back/Home, sequential unlocks, replay, hints, touch-style pointer/click input, 44px visible targets, text clipping, horizontal overflow, counters, finale routing, duplicate completion writes and runtime errors. Result: no horizontal overflow, no clipped tested controls/text, and no application console errors or warnings.

Keyboard controls use semantic buttons and the same activity actions. `year4-keyboard.html` provides the exhaustive 50-mission Enter/Space fixture. Visible focus remains inherited from the shared accessible controls; no mission requires dragging or audio. Reduced-motion styling keeps static state and completion feedback visible.

## Curriculum and interaction review

Every mission retains **Ramal → Cuba → Perhati → Fikir → Temui**. Predictions are recorded without penalty. Activities require investigation actions such as inspecting, comparing, classifying, sequencing, controlled testing or designing before reflection can advance.

Year 4 scope follows the KSSR/DSKP topic direction. `Cabaran Bumi Bergerak` includes both rotation and revolution so the unit covers daily and yearly motion. Machines cover levers and combined simple machines; Year 3's pulley activity is not repeated. Sound activities expose visible vibration/wave evidence and do not require hearing.

## Assets

No new bitmap, SVG, audio or other binary production asset was generated. New asset size: **0 bytes**. Existing PICO and shared visual language are reused. Year 4 scenes are code-native HTML/CSS/symbol models, so they remain sharp and lightweight on small screens. The official visual target remains reference-only.

## Android and remaining device validation

The canonical web bundle and normal Capacitor sync are verified separately during the release check. Android metadata is v1.4.0 / versionCode 4. A physical Android device or configured emulator was not available, so real system-bar/cutout rendering, hardware Back, app restart, rotation and assistive-technology behavior still need device testing. No APK/AAB was built for this curriculum milestone.
