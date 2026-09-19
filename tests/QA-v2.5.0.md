# Makmal Cilik v2.5.0 — Final Web UI / UX and Visual Polish QA

## Visual Audit

The final web pass inspected Title, Main Menu, six-profile selection, year selection, all six year hubs, Year 2 Electricity gameplay, empty and partial Buku Makmal states, Adult Gate, Parent Dashboard, Support and confirmation dialogs. Existing completion screens remain protected by automated exact-completion tests. The official blue, yellow, white and soft laboratory identity remains intact; no wholesale redesign or new artwork was introduced.

## Design Token Audit

`css/release-polish.css` adds shared `--mc-*` tokens for brand and semantic colours, surfaces, borders, text, muted text, radii, shadows, spacing, control height, focus and motion duration. Legacy variables map to these values so stable mission CSS remains compatible.

## Typography

Screen and section headings use a consistent dark-blue hierarchy with balanced wrapping. Body and helper copy have readable line heights and a 70-character measure. Mobile type remains at least 15px at the body level; mission titles and controls retain stronger weight without excessive uppercase.

## Title Screen

The title concept, PICO, tagline and MASUK MAKMAL CTA are preserved. The CTA fills mobile width, the PICO lab card stays balanced, utilities remain reachable and the 390×844 title fits without horizontal overflow.

## Main Menu

MULA BELAJAR remains the dominant green action and Buku Makmal the main secondary destination. Future placeholders are visually subdued. Ibu Bapa / Penjaga spans the secondary row and no longer competes with the learning CTA.

## Profile UI

Six profiles wrap as three columns on desktop and two on standard mobile. The current player now shows `✓ Pemain aktif` and `aria-current`, so selection does not rely on border colour. Progress remains readable and Urus controls keep a minimum touch target. The profile-name input remains visible and focused in a simulated 360×420 reduced viewport with no horizontal overflow.

## Year / Unit / Mission UI

All six year cards now display actual profile-specific experiment and unit totals. Completed years show text plus a check mark. Browser QA confirmed 10, 7, 10, 10, 10 and 11 unit cards for Years 1–6 respectively. Locked, available and completed mission states retain labels/icons in addition to colour.

## Gameplay Shell

Mission context, title, progress, PICO dialogue, activity and actions have a clearer vertical hierarchy. Workbench content remains primary and existing sticky mobile actions stay reachable. No experiment interaction model changed.

## PICO

Existing PICO production art is reused. Dialogue cards now share consistent border, shadow, type and responsive sizing across title, menu, gameplay and empty states. No PICO asset was regenerated.

## Feedback

Correct, incorrect, hint, toast and completion feedback remain driven by v2.2 hooks. The visual layer keeps feedback concise, high-contrast and reduced-motion compatible without increasing animation intensity.

## Buku Makmal

The journal uses a clearer hero, progress bar, discovery emphasis and recent-discovery hierarchy. Empty state retains a direct `Mula Bereksperimen` action. Browser QA verified the 0/290 state at all five target viewports; automated tests cover partial, full, recent, BARU, detail and answer-leakage protection.

## Parent Zone

The adult surface remains calmer than gameplay. Profile summary, six-year table, facts and management actions have consistent spacing and borders. Browser QA verified all six rows at every target viewport.

## Support

Support remains behind Parent Zone, voluntary and free of gameplay rewards. The surrounding copy and layout were refined only. `assets/support/makmal-cilik-support.webp` was not modified or re-encoded; it loaded at its 1024px natural width without overlays or clipping.

## Dialogs

Adult entry, delete and reset dialogs share the same surface and action layout. Batal is visually ordered before destructive action and receives programmatic initial focus. Destructive actions are never the default keyboard choice.

## Accessibility

Semantic controls, labels, touch targets, visible focus, keyboard operation, screen-reader state text and reduced motion are retained. Year cards have descriptive progress labels and profile selection exposes the current item. Fullscreen rejection remains handled without an uncaught error.

## Contrast

Dark-blue text replaces weak pale text on light surfaces. Yellow is used with dark brown/blue text. Completed green, destructive red, muted helper copy and disabled controls retain readable foreground/background contrast and textual status labels.

## Responsive QA

Tested at 1366×768, 1920×1080, 390×844, 360×640 and 800×450. Title, profiles, year selection, gameplay, Buku Makmal, Parent Dashboard and Support reported zero horizontal overflow. All six year hubs also reported zero overflow at desktop audit size.

## Small Landscape

At 800×450, the compact header, navigation, replay action, gameplay workspace, Parent table, dialog and Support remain scrollable and reachable. No primary action is trapped below an inaccessible fixed area.

## Desktop

Content widths increase at 1500px while keeping readable text measures. Wide layouts use larger hub grids and content surfaces rather than leaving a narrow mobile column in the centre. Cards do not stretch their text excessively.

## CSS Cleanup

The safe approach was an isolated final cascade layer instead of aggressive edits to year-specific mission CSS. It consolidates new shared tokens and component rules while leaving proven curriculum layouts intact. Build tests ensure every runtime stylesheet is packaged.

## 290 Mission Regression

All Year 1–6 suites passed: 50 + 35 + 50 + 50 + 50 + 55 = 290 missions. Completion, guards, progression, replay, hints, feedback, discovery, timestamps and optional audio remain covered.

## Profile Regression

Six-profile limit, switching, avatar display, current-profile state, isolation, migration, reset, deletion and exact per-profile master completion tests passed. Browser QA used profiles with different progress and displayed the correct year totals.

## Journal Regression

All 290 discovery records, 0/290, partial, 290/290, recent, BARU, detail, viewed state, Continue Learning, replay routes and answer-leakage protection passed automated regression.

## Parent / Support Regression

Adult gate, keyboard alternative, dashboard, player selection, management, reset/delete confirmation, support route and QR image loading passed. Batal was verified as the focused dialog action.

## Cloudflare Build

The v2.4 pipeline is preserved: Node 22, repository root `/`, `npm run build:web`, output `www` and existing `_headers`. A clean `npm ci` and final `npm run verify:web` are recorded in the completion run. Entry CSS/JS URLs use `v=2.5.0`.

## Performance

The polish adds one local CSS file only. No framework, font, icon pack, animation library, canvas effect or image was added. The final build contains 116 files and 1,972,278 bytes: 471,438 bytes of JavaScript, 97,493 bytes of CSS and 1,395,937 bytes of images. The unchanged 1,284,904-byte support poster remains the largest asset.

## Network / Privacy

Browser instrumentation observed zero unexpected third-party assets and zero application console errors/warnings. Runtime remains local-first with no login, analytics, tracker, external API, cloud upload or payment verification.

## Bugs Found

- Year cards showed only `Aktif`, with no actual profile progress or completion text.
- Current profile selection depended mainly on border colour.
- Confirmation dialogs focused the main region instead of the safe cancel action.
- Main Menu future/adult entries competed visually with child learning actions.
- Shared visual constants were spread across legacy styles without a final semantic token layer.

## Bugs Fixed

- Added profile-specific experiment/unit totals and explicit completed states to all year cards.
- Added visible and semantic current-profile status.
- Made Batal the initial focus in confirmation dialogs and visually separated destructive controls.
- Clarified Main Menu hierarchy and standardized shared cards, buttons, type, PICO, journal and adult surfaces.
- Added reusable semantic design tokens and responsive desktop/mobile/short-landscape refinements.

## Deferred Issues

- PWA/service-worker support remains deferred.
- Android physical testing, APK/AAB, signing and Play Store work remain deferred.
- The existing transitive Capacitor `uuid@7.0.3` deprecation warning remains deferred to a compatible toolchain upgrade.

## Known Limitations

- Physical-device virtual-keyboard and QR scan tests require external devices; local viewport and intrinsic-image checks passed.
- Master completion visual state is exercised through deterministic automated data rather than altering the user's browser profile to 290/290.
- Support poster optimization is intentionally avoided because QR integrity has priority.

## Final Status

Makmal Cilik v2.5.0 completes the requested web UI / UX polish without adding curriculum or product features.
