# Makmal Cilik v2.5.3 QA

## Title Screen Before / After

The previous sparse split layout and separate PICO card were replaced by one framed laboratory hero. Branding, tagline, CTA, welcome copy and curriculum note remain real HTML. Navigation still enters the existing profile flow.

## Visual Target Comparison

The title now aligns with the reference through a bright blue/yellow/white palette, warm window light, laboratory depth, tactile framing, science props, green plant accents and a prominent welcoming PICO. It intentionally does not reproduce the five-step gameplay rail, mission status, XP, stars, rewards or the target's fixed gameplay composition.

## Hero Artwork

Both illustrations were generated with the built-in Codex image-generation workflow using `assets/reference/makmal-cilik-visual-target.png` as the visual reference. The desktop prompt requested a wide sunlit laboratory, calm left region and PICO on the right. The mobile prompt requested a purpose-built 4:5 composition, fewer props and safe margins around PICO's face and waving hand. Neither image contains baked UI text.

## WebP Assets

| File | Dimensions | Purpose | Source / compression |
| --- | ---: | --- | --- |
| `assets/title/makmal-cilik-hero-lab.webp` | 1599×900 | Desktop and landscape hero | Generated PNG 1672×941; Lanczos resize; Pillow WebP lossy quality 80, method 6 |
| `assets/title/makmal-cilik-hero-lab-mobile.webp` | 800×1000 | Mobile portrait source | Generated PNG 1122×1402; Lanczos resize; Pillow WebP lossy quality 79, method 6 |

Responsive `<picture>` delivery selects the mobile source at 640px and below. The primary image is eager by default, uses `fetchpriority="high"`, fixed intrinsic dimensions, `aspect-ratio`, `object-fit` and breakpoint-specific positioning.

## Asset Sizes

- Desktop WebP: 83,510 bytes (81.6 KiB).
- Mobile WebP: 75,242 bytes (73.5 KiB).
- Combined: 158,752 bytes (155.0 KiB).
- No unused title image remains in production.

## Desktop

- 1366×768: passed; PICO, title, CTA and welcome panel visible; no horizontal overflow.
- 1920×1080: passed; framed hero remains balanced and centered; no horizontal overflow.

## Mobile

- 390×844: passed with the mobile WebP, single-column title → tagline → hero → CTA hierarchy and reachable CTA.
- 360×640: passed with compact title treatment, safe PICO crop, visible CTA and no horizontal overflow.

## Small Landscape

- 800×450: passed. Compact header, full title, PICO hero, CTA, curriculum note and footer remain visible. Body height equals viewport height and no horizontal overflow was detected.

## PICO

PICO is the sole large mascot on the title screen. Face, head and waving hand remain inside the tested crops. The previous duplicate portrait card was removed from this screen only; mission PICO assets and rendering are unchanged.

## Branding

`Makmal` remains blue, `Cilik` remains yellow, and `Eksperimen. Fikir. Temui.` remains exact HTML text. Dimensional outline, restrained shadow and tighter spacing create a clearer logo treatment without using baked text.

## CTA

`MASUK MAKMAL` remains a semantic button and opens `PILIH PEMAIN`. Keyboard Enter navigation passed. The button has visible focus, hover, tactile depth and a pressed state.

## Audio / Fullscreen Controls

Sound toggled from off to on, remained on after reload, and was restored to its initial off state after QA. Fullscreen request/exit handling completed without an uncaught error; the in-app automation surface relinquishes native fullscreen immediately, while the existing `fullscreenchange` and silent fallback paths remain intact.

## Accessibility

Semantic heading and button structure, concise hero alt text, keyboard entry, visible focus, colour contrast and reduced-motion handling passed. No required animation was added.

## Performance

No video, GIF, Canvas animation, external font, CDN, tracker or extra dependency was added. Only one responsive hero source loads for a viewport. The two WebPs total 155.0 KiB.

## Bundle Delta

- Before (v2.5.2): 1,990,812 bytes, 116 files.
- After final refinement (v2.5.3): 2,156,514 bytes, 118 files.
- Delta: +165,702 bytes and +2 files (+8.32%).

## 290 Mission Regression

`npm test` passed all 25 automated test files. The suite audited the 290 canonical discoveries and exercised all mission engines, storage migration, profile isolation, progression, replay and master totals. No curriculum definition or experiment interaction was changed.

## Cloudflare Build

`npm ci` completed from the lockfile with 99 packages installed. `npm run verify:web` passed tests and produced the static `www` bundle. Node 22, root `/`, command `npm run build:web`, output `www`, Capacitor configuration and local-first runtime remain unchanged.

## Intentional Differences

The title keeps live responsive HTML rather than copying the reference's fixed gameplay UI. It excludes XP, stars, rewards, mission-complete panels and the five-step rail. Mobile uses a shallower visible crop of its purpose-built portrait source so the CTA remains above the fold.

## Bugs Found

The first 390×844 pass allowed the flex-filled grid to stretch its rows, creating excessive space between title, hero and CTA.

## Bugs Fixed

The mobile hero now uses intrinsic-height grid content centered within the available title region. This keeps the three sections grouped while preserving full-viewport balance and CTA reachability.

The final pre-commit pass also corrected the pale fullscreen control by applying an explicit dark foreground to both utility controls, with distinct hover and pressed states. The title now uses unambiguous blue for `Makmal` and yellow for `Cilik`, with separate restrained depth colours. The faint lower-left science glyphs were removed because they did not add meaningful hierarchy.

## Known Limitations

The in-app browser automatically leaves native fullscreen during automated control, so sustained fullscreen dimensions cannot be captured there. The request, control state, exit path and absence of console errors were verified. Generated illustrations are raster artwork and may show minor stylistic differences from PICO's existing mission cutouts.
