# Makmal Cilik v1.1.0 — Android packaging QA

Date: 2026-09-16. Changes limited to the existing repository. No curriculum content added, no commit/push, no v1.2.0 work.

## Web regression

All five final browser matrices passed on v1.1.0:

| Suite | Scenarios | Mission completions |
| --- | ---: | ---: |
| Electricity | 40 | 400 |
| Terang & Gelap | 30 | 300 |
| Campuran | 30 | 300 |
| Tumbuhan | 30 | 300 |
| Haiwan / Manusia / Kemahiran Saintifik | 120 | 1,200 |
| Total | 250 | 2,500 |

Coverage: all 35 missions at 1366×768, 1920×1080, 390×844, 360×640 and 800×450. No horizontal overflow, clipped controls, intercepted tap targets, duplicate completion or application error reported. Existing hints, replay, progression, timestamps, Back/Home and silent-safe audio checks passed. All eight existing Node suites also passed with the updated version expectation.

Normal browser UI displayed `v1.1.0 by Zil-el-Saif`; the existing 35/35 save remained intact. Sound persisted after reload and was restored to its initial disabled setting. Browser fullscreen entered/exited correctly. Normal preview console error logs were empty.

## Native shell simulation

`android-browser.html` passed five viewport scenarios, exercising **175 mission Back routes** (35 × 5), safe-area CSS with simulated 24px top/bottom and 12px side insets, unit/year/finale navigation, singleton Back registration and explicit exit confirmation. Native fullscreen is hidden. Back during the exit dialog cancels it. App exit occurs only after choosing Keluar from the title-screen dialog.

`android-shell.test.cjs` passed route hierarchy, cancel/confirm exit, one native listener, browser no-op and v1.0.0 save migration. These are simulated native bridge tests, not Android device tests.

## Packaging

Capacitor init, Android add and sync succeeded. Versions are pinned: core/Android/CLI 8.5.2; App plugin 8.1.1. App identity is `com.zilelsaif.makmalcilik` / Makmal Cilik. Android versionName 1.1.0, versionCode 1; minimum SDK 24, target/compile SDK 36. Java 21 and Gradle 8.14.3 were used.

`build-web.test.cjs` verified that all 54 generated files match canonical source bytes; stale generated files are removed, and tests, node_modules, reference artwork and documentation are excluded. Bundle size before bridge injection: 332,172 bytes. Sources remain at repository root. `www/` and native copied web assets are generated and ignored.

APK archive verification passed: all 54 web files matched www exactly; AppPlugin was included; tests, reference assets and node_modules were absent. Capacitor config contains no remote server URL. Android aapt confirmed the app identity, version, label and SDK levels.

Final complete batch rerun: **BUILD SUCCESSFUL in 1m 44s**, exit code 0; 90 actionable tasks (18 executed, 72 up-to-date). The script printed the expected APK path. Log retained locally at `.cache/android-debug-build.log`.

Output: `android/app/build/outputs/apk/debug/app-debug.apk`

Verified APK size: **4,312,551 bytes**.

Verified SHA-256: `729659cbcf60e74aefb377f60d8b3f8105bba83294d4233180a6d8b81144ca02`.

## Storage and orientation

No schema change beyond version migration. The `makmalCilikData` key, settings, profile, unknown fields, completion and timestamps are preserved. Capacitor Android Bridge.java explicitly enables DOM storage. No server hostname/scheme override changes the app origin. Website saves and Android app saves are separate origins; automatic transfer is not claimed.

The generated activity handles orientation/screen-size changes and has no orientation lock. Existing progress writes occur on mission completion/start and settings changes. Partial experiment state remains intentionally transient. Safe-area env values and Capacitor SystemBars CSS variables protect system bars/cutouts; browser-only layouts remain unchanged. Hover transforms are disabled on non-hover devices; all missions retain tap alternatives with no drag-only requirement.

## Build issues and fixes

- Full Gradle distribution download timed out. The wrapper now uses the smaller official binary distribution, and the installed matching distribution was reused in a repository-local cache.
- Custom repository-local debug keystore initially did not exist. The configuration helper now generates the standard debug-only key automatically, retaining it on later builds.
- Unscoped assembleDebug attempted unnecessary library annotation artifacts and hit a Google Maven timeout. The script now targets `:app:assembleDebug` only.
- Optional Google Services build hooks were removed; no Firebase/analytics service is configured.
- Build script stops on failure and prints the APK path only after successful assembly and output existence checks.

## Remaining limitations

ADB reported no connected devices; no emulator was configured. APK launch, real hardware Back/predictive gestures, app restart persistence, rotation, cutouts and touch behavior have **not** been verified on a physical device or emulator. APK contents and web/simulated-shell behavior are verified, not a substitute for those native checks.

No final audio assets, release signing, AAB, Play Store upload or readiness claim. Launcher/splash are the native template defaults for this debug milestone. First build needs access to npm/Gradle/Google Maven. Standard upstream flatDir/SDK XML warnings occurred during build.

npm audit reported three moderate development-tool findings via Capacitor CLI → xcode → uuid; these iOS tool dependencies are not shipped in the APK. No forced major override/downgrade was made.
