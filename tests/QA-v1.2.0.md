# Makmal Cilik v1.2.0 — Android polish QA

Date: 2026-09-16. Existing repository only. No commit/push. No curriculum addition or v1.3.0 work.

## Web regression

| Suite | Scenarios passed | Mission completions |
| --- | ---: | ---: |
| Electricity | 40 | 400 |
| Terang & Gelap | 30 | 300 |
| Campuran | 30 | 300 |
| Tumbuhan | 30 | 300 |
| Haiwan / Manusia / Kemahiran Saintifik | 120 | 1,200 |
| Total | 250 | 2,500 |

All 35 missions were completed and replayed at **1366×768, 1920×1080, 390×844, 360×640 and 800×450**. Browser fixtures use isolated disposable memory saves. No horizontal overflow, clipped targets, duplicate completion/audio hooks or application errors were reported. Progression, hints, wrong-action guards, completion dates, replay and Back/Home checks passed. Tests cover fresh, older, partial, complete, malformed and blocked saves.

All 11 Node suites passed: experiment, circuit, electricity-unit, light, mixture, plants, discovery, experience, android-shell, build-web and audio-readiness. Current-version assertions are 1.2.0; old-version migration inputs remain intentional.

Normal web UI displayed **v1.2.0 by Zil-el-Saif**. Sound setting survived reload and was restored to its original muted setting; fullscreen entered and exited. Enter/Space navigation remained operational. No application console errors were found.

## Native branding and APK

App label **Makmal Cilik**; package **com.zilelsaif.makmalcilik** unchanged; Android versionName **1.2.0**, versionCode **2**. Min SDK 24, target/compile SDK 36. No dependency added.

Original code-native flask replaces template art. Adaptive icon has separate vector foreground and blue background; square/round legacy PNGs exist at 48, 72, 96, 144 and 192px. Android 12+ system splash supplies flask, pale blue background and 200×80dp wordmark slot; legacy launch background uses a lightweight layer-list. Wordmark includes Makmal Cilik and the tagline. Templates/oversized splash PNGs were removed. Icon and wordmark previews were visually inspected; actual OS rendering still needs device testing.

Asset manifest: `assets/branding/ASSET-PROVENANCE.md`. Total listed branding assets **55,731 bytes**; largest individual asset **11,592 bytes**. Master SVG **548 bytes**; splash wordmark PNG **7,534 bytes**. PICO and all curriculum assets reused unchanged. Regeneration script is optional; ordinary builds do not require Pillow/Python.

Fresh debug build succeeded: **BUILD SUCCESSFUL in 6m 56s**, 90 tasks (52 executed, 38 up-to-date), exit code 0. Existing batch regenerated www, synced Capacitor, built APK and printed its path. No signing change.

APK: `android/app/build/outputs/apk/debug/app-debug.apk`

Size: **4,147,164 bytes** (about 3.96 MiB).

SHA-256: `886fe34a79dccb14b53ae208eb58b215574ce3fb8b4ff05efd8f8408a8f0794f`.

Archive verification: all **55** canonical web files match bundled bytes. Bundle before bridge injection: **333,648 bytes**. No remote server URL, reference artwork, tests or node_modules bundled. aapt confirmed name, package, version and SDK levels. New icon/splash resources are present; default Capacitor artwork is absent. Framework splash compatibility resources are retained.

## Back, exit and resume

Node and browser bridge simulations confirm mission → unit → Year 2 → year selection → main menu → title. Back from the title opens **Keluar dari Makmal Cilik?** with **Batal** and **Keluar**. Back cancels an open dialog. Only explicit Keluar calls native exit. Duplicate Back events within 250ms are ignored. Exit calls are guarded while pending.

Singleton initialization installs one listener per native event. Backgrounding closes the exit overlay and stops optional audio. Resume does not recreate the mission, add listeners or mutate saved progress. Browser mode remains a no-op for the native bridge. App restart intentionally starts at Title; partial experiments are not persisted after process death.

## Safe areas, orientation and touch

Five native-bridge browser scenarios passed **175 mission checks** (35 × 5), with simulated top/bottom 24px and side 12px insets. Each mission made a prediction, swapped viewport width/height, resumed and restored orientation: DOM/state and stored data stayed unchanged. No overflow or application errors. Duplicate event handling, dialog controls, finale navigation and native fullscreen hiding were also checked.

Native CSS uses all four env(safe-area-inset-*) values and Capacitor CSS fallback variables. Body, sticky top navigation, bottom controls, toast and exit modal account for insets. The built-in SystemBars plugin uses LIGHT (dark system icons on pale content) and viewport-fit cover hint; MainActivity enables edge-to-edge and matching WebView background. No device-specific inset constants are used in production. Older WebViews are handled by Capacitor's native-padding fallback.

Activity configChanges preserves WebView across orientation/screen-size changes; no portrait/landscape lock. Full regression covers tap-style input, controls at least 44px, targets and scroll access. Existing drag alternatives, semantic buttons, focus and reduced-motion CSS remain. Native pressed feedback added; no hover-dependent feature introduced.

These are browser/layout and simulated bridge checks, **not proof of physical gesture navigation, 3-button bars, cutouts or real rotation**.

## Storage and audio

v1.1.0 → v1.2.0 migration retains settings, profile, mission completion, timestamps and unrelated fields. Storage key/schema and Android origin unchanged. Existing blocked/malformed-save fallbacks pass. Browser website and Android app saves are separate; no transfer is claimed.

Audio readiness tests cover muted/unregistered hooks, rejected play promises and idempotent stop. No final sound assets added; missing hooks stay silent. Existing browser matrices check duplicate audio events. Native pause stops active audio; resume does not autoplay.

## Issues found and fixed

- Template native icon/splash replaced with project branding and optimized resources.
- Exit heading/buttons aligned to requested Malay copy.
- Rapid duplicate Back events could skip parents: 250ms guard added.
- Backgrounding could leave an exit overlay or optional audio active: lifecycle cleanup added without remounting missions.
- Exit modal did not explicitly account for all cutout insets: native bounds added.
- System-bar appearance previously followed device dark mode despite a light UI: fixed light-content appearance and matching launch/WebView backgrounds.
- First build hit stale incremental Android resource linking after moving the foreground from a version-qualified directory. A targeted :app:clean removed stale generated output; the unchanged canonical resources then built successfully. No Gradle internals or workaround dependency added.
- Audio test initially checked a cross-context rejected promise before its catch microtask settled; fixture now waits one event-loop turn. No production audio fault was found.

## Physical-device checklist (pending)

ADB found no connected device; emulator list was empty. Native launch, system bars and lifecycle cannot be claimed tested on hardware.

- [ ] Install/update this debug APK using the existing signing key; confirm app name/icon in launcher and recents.
- [ ] Cold-launch: branded splash, readable wordmark, no template image or white flash.
- [ ] Open Title, Main Menu, Year Selection, Year 2, each unit and missions.
- [ ] Portrait and landscape: rotate mid-interaction; selection/circuit/switch state remains.
- [ ] Gesture navigation and classic 3-button navigation: header/footer/controls clear bars and side cutouts.
- [ ] Hardware/predictive Back follows every parent; rapid duplicate event does not skip; title dialog Batal/Back cancel, Keluar exits.
- [ ] Complete a mission, replay, press Home, reopen; progress/date/settings remain and no duplicate effects/listeners appear.
- [ ] Kill/restart app: saved completion/mute retained, Title opens; partial experiment reset is expected.
- [ ] Tap terminals/labels/switches at small sizes; scroll does not accidentally activate controls; no drag-only requirement.
- [ ] Mute toggle persists; no audible playback is expected until production sounds are registered.
- [ ] Test at least Android 7–11 and Android 12+/current WebView for legacy/adaptive splash and safe-area behavior.

## Limitations

Debug APK only. No physical-device/emulator run, Play Store production signing, release AAB or release-readiness claim. Final audio absent. No new curriculum/backend/analytics/ads. Standard upstream flatDir warnings remain. Previously documented moderate development-only CLI → xcode → uuid audit findings are unchanged; no dependency override was introduced.

Implementation guidance: installed Capacitor SystemBars documentation and [Android splash screen guidance](https://developer.android.com/develop/ui/views/launch/splash-screen). Actual platform launch transitions remain on the device checklist.
