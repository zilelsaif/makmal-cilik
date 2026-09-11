# Makmal Cilik v0.7.0 QA

Verified 12 September 2026 in the repository preview at port 4174.

- Node: five suites passed. 150 Campuran, 125 light, 90 advanced Electricity, 20 circuit and 20 equipment rule/reset runs.
- Browser: Campuran, light and Electricity matrices each passed 30 scenarios; 900 mission completions total.
- Viewports: 1366×768, 1920×1080, 390×844, 360×640, 800×450.
- Campuran storage: fresh, v0.6 migration, partial/full progress, malformed and blocked storage; replay and original timestamps retained. Electricity, light, settings, profile and unrelated data preserved.
- No horizontal overflow, clipped controls, too-small buttons, overlay hit interception or application console errors found.
- Campuran: all five missions completed through Enter/Space controls in the real preview. Wrong predictions and wrong tools recover correctly. Material, stirring and sequence guards passed. Completion fires once; replay resets activity only.
- Visual review: material tray, sieve results and dissolving comparison inspected in rendered screenshots.
- Global controls: Title, Main Menu, Year Selection, Year 2, Back/Home, sound persistence and fullscreen entry/exit passed. Saved unit counts survive reload.
- Syntax checks passed for all JS/CJS files.

Limitations: simulated touch-style events and iframe viewports; no physical Android device or OS-level reduced-motion test. Reduced-motion CSS is present. Missing audio remains silent-safe. Blocked storage falls back to memory and cannot persist across reload.

No commit, push, deployment or v0.8.0 work.
