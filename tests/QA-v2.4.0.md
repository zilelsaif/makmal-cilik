# Makmal Cilik v2.4.0 — Web Production QA

## Release Scope

This milestone hardens the existing web release for Cloudflare Pages. It adds no curriculum, profile, reward or payment feature. The release retains 6 years, 58 units and 290 playable missions, local profiles, Parent Zone, voluntary support, procedural audio, Buku Makmal and profile-aware master completion.

## Dependency / Lockfile Audit

- `npm ci` completed from a removed `node_modules` directory and installed 99 packages.
- `npm ls --all` reported a valid dependency tree with no invalid or extraneous package.
- Capacitor versions remain pinned; no dependency was added or arbitrarily upgraded.
- `yauzl@2.10.0` resolves `fd-slicer@1.1.0` through the valid `~1.1.0` range.
- Every registry package entry checked by the production test has a version, HTTPS npm registry URL and SHA-512 integrity value.
- One non-blocking deprecation warning remains for transitive `uuid@7.0.3` from the current Capacitor toolchain. It is deferred to a planned compatible Capacitor upgrade.

## Cloudflare Build Reproducibility

- Recommended environment: Node.js 22, declared in `.nvmrc`; `package.json` accepts Node 22 or newer.
- Validation environment: Node v24.20.0 and npm 11.19.0.
- `npm run verify:web` passed after the clean install.
- Build output: 115 files, 1,960,532 bytes.
- Output breakdown: 66 JavaScript files (470,756 bytes), 20 CSS files (86,491 bytes), 14 WebP files (1,378,024 bytes), 13 SVG files (17,913 bytes), one HTML file (6,861 bytes) and `_headers` (487 bytes).
- Tests, source reference artwork, Android files and development dependencies are excluded from `www`.

## Production Build

The static production command is `npm run build:web`, with `www` as its sole deployment output. It succeeds without a global package, environment variable, Windows-only web command or file outside the repository.

## Runtime File Audit

The output contains the entry HTML, local CSS and JavaScript, required WebP/SVG assets and `_headers`. It excludes tests, QA reports, `node_modules`, Android files, development scripts, temporary files and reference artwork. Dynamic asset references are covered by the build manifest test.

## Cloudflare Configuration

- Production branch: `main`.
- Root directory: `/` (repository root).
- Build command: `npm run build:web`.
- Output directory: `www`.
- Node version: 22.
- No environment variables are required.
- The deployment checklist is in `tests/CLOUDFLARE-DEPLOY-CHECKLIST-v2.4.0.md`.

## Cache Strategy

- HTML uses `no-cache, no-store, must-revalidate` so releases cannot be hidden behind stale entry HTML.
- Versioned JavaScript and CSS use one-year immutable caching.
- Non-hashed assets use one-day caching with revalidation.
- Headers include `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin` and a Permissions Policy that disables camera, microphone and geolocation.
- No catch-all redirect is needed because routes use History API state without changing the document path.

## Version Verification

- Visible footer: `v2.4.0 by Zil-el-Saif`.
- Static marker: `<meta name="app-version" content="2.4.0">`.
- Every entry JavaScript and CSS URL uses the `v=2.4.0` cache key.
- Current runtime files contain no stale v2.3.0 label.

## Security Headers

The generated `_headers` file applies clickjacking, MIME sniffing, referrer and unused-device-permission protections without a speculative CSP. Browser QA confirmed navigation, fullscreen, local assets and the support poster still work.

## Network Audit

- The production browser observed 88 assets: 66 scripts, 20 stylesheets and two images.
- Every observed URL used the local production origin; no third-party request was observed.
- Source audit found no analytics, tracker, external API, account service or cloud progress sync.
- Player data and progress remain local to browser storage.
- Blocked storage is handled without a crash and now shows an accessible warning that progress cannot be saved.

## Privacy

The release adds no login, account upload, cloud sync, analytics, tracker, behavioral advertising or payment verification. Support remains optional and profile information remains local.

## Storage

- The existing schema continues to preserve profiles, active profile, Year 1–6 progress, attempts, completion timestamps, Buku Makmal viewed state, sound and completion metadata.
- Fresh, partial, full, malformed, migrated and blocked-storage cases are covered by automated tests.
- Reload behavior was verified from the production bundle.

## Profiles

- Automated tests cover local profiles, migration, malformed data, missing/deleted active profile, profile switching, reset and blocked storage.
- Cross-profile mission progress remains isolated.
- Active profile and sound preferences continue through the existing storage model.
- The browser production flow loaded six profile cards and returned the correct active profile summary after selection.

## Audio

- Procedural audio readiness tests passed.
- Sound remains optional and silent-safe.
- No external audio download or network dependency was introduced.

## Buku Makmal

- All 290 discovery records are covered by automated tests.
- Tests verify profile isolation, migration and a full journal state.
- The production bundle opened `Buku Makmal Saintis` without overflow.

## Parent Zone

- Adult gate, deliberate keyboard alternative and confirmation dialog opened correctly.
- Parent Dashboard displayed profile-specific totals for all six years.
- Automated tests cover player selection, profile management, deletion confirmation and selected-profile reset behavior.

## Support

- The support screen stayed behind Parent Zone and did not alter content access.
- The existing support poster was reused unchanged at 1,284,904 bytes.
- Browser QA confirmed the poster loaded successfully at its 1024-pixel natural width with no mask or overlay on the QR.
- No payment verification or payment-success claim was added.

## Master Completion

- Automated tests verify the exact 290/290 state triggers master completion.
- A 289/290 state remains incomplete.
- Master completion uses the active profile and does not aggregate players.

## Keyboard QA

- Existing semantic controls, visible focus styles, keyboard activity alternatives and reduced-motion rules remain intact.
- The adult gate exposes an accessible deliberate keyboard route.
- Production navigation and fullscreen controls completed without an uncaught error.
- Existing Year 1, 3, 4, 5 and 6 keyboard harnesses remain in the repository and their underlying mission engines passed the full automated suite.

## Responsive QA

The profile selector, Parent Dashboard and Support screen were tested at:

- 1366×768
- 1920×1080
- 390×844
- 360×640
- 800×450

All five sizes reported zero horizontal overflow. Six profile cards remained reachable by vertical scrolling, the Parent progress table stayed within the viewport width, and the support poster retained its full QR area. The production title and Buku Makmal also passed representative mobile checks.

## Mobile Web QA

Portrait widths of 390 and 360 pixels and the 800×450 small-landscape viewport passed without horizontal overflow. Touch-sized controls remained available, long profile and Parent views scrolled vertically, and the layout uses dynamic viewport sizing for mobile browser bars. Profile-name fields remain standard labelled text inputs so the virtual keyboard can resize the viewport without trapping the form. A physical mobile browser and on-screen keyboard were not available in this local run.

## Navigation and Browser QA

- Title, profile selector, Main Menu, Buku Makmal, Parent Gate, Parent Dashboard and Support opened from the production bundle.
- Reload returned cleanly to the title with v2.4.0 assets.
- Fullscreen entered and exited successfully.
- Browser console errors/warnings: none.
- Missing or external production assets: none observed.

## 290 Mission Regression

All 22 automated test files passed. The suite covers all Year 1–6 mission definitions and engines, including 58 units and 290 playable missions, progression, replay, discovery records, profile isolation, exact master completion, audio readiness, build output and v2.4.0 production rules.

## PWA Decision

PWA and service-worker support are deferred. The application already works as a responsive static site, while an incomplete service-worker strategy could retain mismatched HTML, scripts and content after a release. Offline installation should be introduced only with an explicit cache-version, update and recovery design.

## Performance

- Production output is approximately 1.87 MiB; the support poster accounts for about 1.23 MiB.
- JavaScript and CSS remain framework-free and locally served.
- No runtime API calls, tracker startup or service-worker overhead was added.
- Caching balances fast repeat visits with safe release updates.

## Lighthouse-Style Audit

A full Lighthouse score was not generated in this environment. The concrete checks available here covered semantic headings/buttons, labelled controls, visible focus/reduced-motion rules, responsive overflow, same-origin networking, console cleanliness, image loading, cache policy and security headers. No issue was hidden to improve a synthetic score.

## Image Dimensions and Layout Stability

The production PICO and support images load with intrinsic dimensions. Existing CSS constrains them responsively without altering the QR pixels or cutting its quiet area. No new image was introduced, and the 1024-pixel support poster loaded before inspection completed.

## CSS / JavaScript Dead-Code Audit

No aggressive cleanup was performed because the shared files support 290 mission routes. The build excludes proven development-only content instead, while manifest and mission-regression tests protect dynamically referenced runtime files.

## Bugs Found

- The repository had no single cross-platform command that reliably discovered every Node test file.
- Cloudflare response headers were absent from the production artifact.
- The app had no machine-readable deployed-version marker.
- A blocked storage write did not tell the player that progress could not persist.

## Bugs Fixed

- Added a single cross-platform command to run every Node test file, avoiding platform-specific wildcard behavior.
- Made the production builder require and copy `_headers`.
- Added explicit current-version metadata and synchronized all entry asset cache keys to v2.4.0.
- Added storage capability tracking and a visible fallback warning when persistence is unavailable.
- Added automated checks for lock integrity, local-only entry assets, cache/security headers and storage fallback.

## Deferred Issues

- PWA/service-worker work is deferred until a safe update and recovery strategy is designed.
- The transitive Capacitor `uuid@7.0.3` warning is deferred to an intentional compatible toolchain upgrade.
- Android physical QA, APK, AAB, signing and Play Store work remain deferred.

## Known Limitations

- Live Cloudflare status, custom-domain behavior and QR scanning from a second physical device require the actual deployment; these remain unchecked in the deployment checklist.
- PWA/offline installation is deferred.
- Browser progress depends on localStorage availability and can be cleared by the user or browser.
- The transitive `uuid@7.0.3` deprecation warning remains until a deliberate compatible Capacitor update.
- This milestone does not build an Android APK/AAB and does not change the existing Android shell version.

## Final Status

Makmal Cilik v2.4.0 is ready for a Cloudflare Pages deployment using the documented settings. No commit or push was performed.
