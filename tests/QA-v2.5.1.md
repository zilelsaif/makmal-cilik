# Makmal Cilik v2.5.1 — Visual Target Alignment QA

Date: 22 September 2026  
Scope: patch-level visual alignment only. Curriculum, progress logic, storage, profiles, support data and mission definitions remain unchanged.

### Visual Target Comparison

The official `assets/reference/makmal-cilik-visual-target.png` was used as a design North Star. Direct comparison focused on Year 2 → Elektrik → Nyalakan Mentol: the revised shell gives the mission title, five-step context, central workbench, PICO assistant, feedback and next action a hierarchy closer to the reference. The application keeps its responsive DOM/CSS circuit simulator instead of reproducing the rendered reference scene. The detailed before-change gap record is in `tests/VISUAL-TARGET-AUDIT-v2.5.1.md`.

### Intentional Non-Features

No XP, stars, trophy economy, achievements, badges, leaderboard, new reward system, curriculum, mission, backend, analytics, cloud service or Android release work was added. The reference image is not embedded in production and was not treated as a feature specification.

### Gameplay Shell

The mission header is now a stronger framed assignment card. Mission title remains dominant; Year, unit and mission metadata remain secondary. Navigation and all engine state transitions are unchanged. Representative browser inspection covered Magnet (Year 1), Nyalakan Mentol (Year 2), Asid dan Alkali (Year 3), Sifat Cahaya (Year 4), Elektrik/litar family (Year 5) and Gerhana (Year 6).

### Experiment Workspace

The shared workbench has a clearer blue rim, restrained science-grid surface, inset depth and stronger component grouping. These rules are additive in `css/release-polish.css`; engine-specific circuit, light, mixture, discovery and year CSS remains authoritative. Nyalakan Mentol was checked directly at 1366×768, 390×844 and 800×450.

### Five-Step Rail

Ramal, Cuba, Perhati, Fikir and Temui have distinct restrained accents plus explicit text states. Wide desktop uses a 190px vertical rail beside the workspace. Portrait and low-height landscape retain a compact horizontal rail. Active and completed meaning does not depend on colour alone.

### PICO

PICO now carries a visible `PEMBANTU MAKMAL` label, a consistent framed dialogue bubble and a speech-tail cue. The card is compact on portrait and low-height landscape and does not cover experiment controls.

### Feedback

Success uses a soft green science-result surface; hint/retry feedback uses calm yellow treatment. No aggressive red flash, shake or shame language was introduced. Existing feedback logic and canonical content remain unchanged.

### Mission Completion

The existing completion component now emphasizes `PENEMUAN SAINS`, the green completion check and the canonical discovery statement. Existing first-completion, replay, progression and timestamp logic is unchanged; no reward currency was added.

### Title

The Title Screen retains its established composition while gaining restrained CSS laboratory light/motifs and stronger framing. It was visually inspected at 1366×768 and remained usable in the portrait regression matrix.

### Menu / Year / Unit UI

Menu, year, unit, mission and profile cards share stronger inset highlights, icon wells, accent rails and pressed depth. The Year Select screen was measured at all five target viewports with every button inside the viewport width and no horizontal overflow.

### Buku Makmal

Buku Makmal remains quieter than gameplay. A small yellow spine cue, `REKOD SAINS` label and stronger discovery detail connect it to the laboratory language. Profile-specific discovery data and filtering are unchanged.

### Parent Zone

Parent screens retain their calmer information hierarchy. Only shared borders, depth and title accents were refined. The adult gate, keyboard alternative, progress table and destructive-action separation remain functional.

### Support

The support page inherits the shared framing only. `assets/support/makmal-cilik-support.webp` and its QR were not modified or re-encoded. Browser measurements confirmed the 1024px source displays without a rounded mask, overlay or horizontal overflow at all target sizes.

### Accessibility

Semantic buttons, keyboard operation, focus rings, explicit state text, touch target sizes and contrast were retained. New decoration is CSS-only and aria-neutral. Existing `prefers-reduced-motion` handling applies to the new tactile transitions; no infinite or required motion was added. The Parent gate keyboard alternative was exercised in browser QA.

### Responsive QA

Browser checks used 1366×768, 1920×1080, 390×844, 360×640 and 800×450. Year Select, Buku Makmal, Parent Zone and Support reported `scrollWidth <= clientWidth` at every size. Representative mission shells also reported no horizontal overflow. Long content scrolls vertically by design.

### Mobile Portrait

At 390×844 and 360×640, the step rail stays readable, PICO remains compact, workbench content stacks and actions remain reachable. A sticky action-bar overlap found at 390×844 was corrected by returning experiment actions to normal document flow at mobile widths.

### Small Landscape

At 800×450, mission header and PICO compress, the step rail stays horizontal, and long screens remain vertically scrollable. Experiment actions use normal flow so they cannot cover answer controls.

### Desktop

At 1366×768 and 1920×1080, the mission shell uses available space with the vertical stage rail and a bounded central workspace. Text widths remain constrained and no fixed dashboard composition is forced.

### Performance

No external dependency, webfont, bitmap or generated asset was added. Runtime asset inspection found 88 loaded assets: 66 scripts, 21 stylesheets and one image, all from the local preview origin. Browser warning/error log was empty.

### Bundle Delta

The v2.5.1 production build contains 116 files and is 1,982,459 bytes. The recorded v2.5.0 build was 1,972,278 bytes, for an increase of 10,181 bytes (about 0.52%). Growth is limited to source/CSS polish and release documentation markers; production image weight is unchanged.

### 290 Mission Regression

`npm run verify:web` passed all 23 automated test files after a clean `npm ci`. The suites exercised all 290 canonical missions and their guarded interactions, progression, replay, timestamps, feedback hooks, discoveries, audio behavior, storage states and profile isolation. Run totals included Year 1: 800, Year 3: 800, Year 4: 800, Year 5: 800 and Year 6: 880, plus the complete Year 2 engine suites.

### Cloudflare Build

Clean install: PASS — 99 packages installed.  
`npm run verify:web`: PASS.  
Explicit `npm run build:web`: PASS.  
Output: `www`, 116 files, 1,982,459 bytes.  
Production settings remain branch `main`, root `/`, build command `npm run build:web`, output `www`, Node 22. Cache markers are `v=2.5.1`.

### Bugs Found

- At 390×844, the mobile sticky experiment action bar could cover the first Nyalakan Mentol answer.

### Bugs Fixed

- Experiment actions now return to normal document flow on mobile and reduced-height landscape. Re-test confirmed `position: static`, no control overlap and no horizontal overflow.

### Deferred Issues

- The pinned Capacitor toolchain still emits its existing transitive `uuid@7.0.3` deprecation warning during `npm ci`; install and build succeed, and dependencies were not arbitrarily upgraded in this patch.
- The North Star's rendered laboratory background, XP bar, stars and trophy presentation remain deliberately absent.
- QA screenshots were inspected through the in-app browser and not stored because the repository has no screenshot-artifact convention and production build rules intentionally exclude reference/test media.
