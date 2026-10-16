# Makmal Cilik v2.6.1 QA

## Baseline

Before v2.6.1 edits, `npm test` passed 26 automated files and `npm run verify:web` passed with a 121-file, 2,193,961-byte bundle. There were **no baseline test or build failures**. The quality audit nevertheless found a reproducible design defect: the shared replay renderer treated the first answer as correct and most providers reused a general-principle decision even when the visible trials changed.

## Final regression

- `npm ci`: passed; 99 packages installed from the unchanged lock dependency graph.
- `npm test`: passed **27 automated test files**.
- `npm run verify:web`: passed.
- `npm run build:web`: passed independently.
- Production: **121 files / 2,195,500 bytes**.
- Exact totals: **6 years / 58 units / 290 curriculum missions / 19 dynamic providers**.
- Canonical Year 1–6 mission suites, Buku Makmal, profiles, Parent Zone, master completion, sound/fullscreen, migration and blocked-storage tests passed.

`npm ci` reports the existing `uuid@7.0.3` deprecation warning and three moderate audit findings in the pinned dependency graph. No dependency was added or upgraded in this patch; applying a forced breaking upgrade was outside the replay-quality scope.

## Replay diversity

- Provider v2: same mission + seed + version produces deeply equal immutable data.
- **3,800 quality cases** (200 per provider) validate visible configuration, evidence decision and result diversity.
- The existing **1,900-case** suite remains green for classification, determinism, duplicate prevention and storage.
- Immediate duplicate prevention passed for all 19 providers.
- Correct answers are bound by explicit `correctAnswerIndex`; the first position is no longer privileged.
- Exact diversity counts and provisional A–F scores are in `REPLAY-QUALITY-AUDIT-v2.6.1.md`.

## End-to-end rendering and evaluation

- All 19 runs use one immutable object from Ramal through Temui; draw, hint, focus, resize and phase changes do not call a provider again.
- Cuba and Perhati render the same `trials[].result` values used to derive Fikir.
- Fikir names one trial from the current run and validates its current result.
- Incorrect feedback and hints point back to evidence without revealing the answer.
- Temui presents the observed result separately from the stable discovery principle.
- Only completion writes successful replay statistics. Repeated completion for the same seed remains idempotent.

## Science and UX bugs fixed

The following fixes apply to all 19 IDs: `y1-magnets-2`, `y1-magnets-4`, `y1-absorption-5`, `electricity-2`, `electricity-3`, `light-dark-3`, `mixtures-5`, `y3-measurement-4`, `y3-density-1`, `y3-acid-alkali-5`, `y4-light-properties-2`, `y4-sound-5`, `y4-energy-5`, `y5-electricity-5`, `y5-heat-5`, `y5-matter-5`, `y6-force-5`, `y6-speed-5`, `y6-machines-5`:

- Removed hidden `answers[0]` correctness coupling.
- Replaced general memorisation-only Fikir prompts with current-run evidence questions.
- Prevented stale generic hints from implying canonical values.
- Added explicit current evidence to completion before the general principle.
- Clarified the changed challenge at replay start without exposing the solution.

The badge and overview were corrected for `electricity-2`, `light-dark-3`, `y4-light-properties-2`, `y5-electricity-5`, `y6-force-5` and `y6-machines-5`: these use controlled variants and no longer claim unrestricted sandbox freedom.

## Scientific guards

- Magnet and absorbency material outcomes passed.
- Year 2 circuits contain no advanced voltage/resistance/electron claims; shadow and mixture outcomes passed.
- Measurement outputs are valid mL strings; density avoids a size-only rule; acid/alkali explicitly forbids touching, smelling or tasting unknown samples.
- Shadow, visual sound-reduction evidence and energy chains passed.
- Heat/temperature and state-change statements passed.
- Speed arithmetic was recalculated to one decimal place for every generated car; friction/force and simple-machine outcomes passed.

## Browser, responsive and accessibility QA

The dedicated same-origin browser harness passed:

- Exactly 19 available cards after completing their corresponding canonical records.
- Six representative full replays: Year 1 magnet, Year 2 Nyalakan Mentol, Year 3 acid/alkali, Year 4 shadow, Year 5 circuits and Year 6 speed.
- Incorrect and correct Fikir feedback, completion, replay count, profile isolation and original `completedAt` preservation.
- 1366×768, 1920×1080, 390×844, 360×640 and 800×450: no horizontal overflow; navigation and primary action remained available.
- Enter activated prediction; Enter advanced; Space activated a trial. Pointer/click paths were exercised within the responsive harness.
- Final clean browser run: no console errors.

Controls remain semantic buttons, focus-visible, non-drag-only and non-audio-only. Status uses text/check marks in addition to colour. Reduced-motion CSS remains active. Physical phone/tablet testing and human enjoyment testing are **NOT TESTED**.

## Profile and storage safety

- Replay history stays within the active profile and is bounded to eight signatures per mission.
- Profile A/B isolation and a 290/290 completion profile passed existing regression.
- `successfulRuns` cannot increment twice for the same completed seed.
- Replay does not write canonical attempts, completion, `completedAt`, Buku Makmal discovery or mission totals.
- Malformed replay branches normalize independently of curriculum progress; blocked storage remains playable through the existing fallback.

## Golden Mission

Canonical `electricity-2` regression passed its workbench, terminals, switch, bulb OFF/ON glow, PICO layout, result panel, responsive behavior and reduced motion checks. Its replay offers controlled current-run connection/switch evidence without altering the canonical first mission.

## Performance and bundle delta

- Before: 2,193,961 bytes / 121 files.
- After: 2,195,500 bytes / 121 files.
- Delta: **+1,539 bytes (+0.07%) / 0 files**.
- The hub still renders 19 cards. No duplicated curriculum registry, external request, dependency, bitmap, video, font or API was added.
- Provider work occurs only when a dynamic replay starts; ordinary startup and canonical missions do not generate variants.

## Cloudflare and platform

Cloudflare settings remain production branch `main`, root `/`, build `npm run build:web`, output `www`, Node 22. CSS/JS cache markers and visible version are `v2.6.1`. Capacitor configuration, Android release metadata and dependencies are unchanged. No Android sync, APK or AAB was run.

Title hero, reference and support files remain unchanged:

- Desktop hero SHA-256 `558D0AD76CD884FEEDBDB394FE19E0D6E85FA87762503D7CDCA936E706FB25BF`
- Mobile hero SHA-256 `7A3846E269DEC79B171BA2188F926151B6246143169593996620AE5B0F2682FA`
- Support poster/QR SHA-256 `0ACD16A9CF12A263B5E1AC8CCADA15B89D782897080AEFE5DB31DE0483159089`

## Files changed for v2.6.1

- Runtime/version: `index.html`, `package.json`, `package-lock.json`, `js/progress.js`, `js/app.js`.
- Replay quality: `js/content/replayability.js`, `js/engine/replay.js`, `css/replay.css`.
- Automated/browser QA: `tests/replay-v26.test.cjs`, `tests/replay-quality-v261.test.cjs`, `tests/replay-browser.html`, `tests/replay-browser.js`, plus existing version-assertion tests.
- Documentation: `README.md`, `tests/REPLAY-QUALITY-AUDIT-v2.6.1.md`, `tests/REPLAY-MANUAL-PLAYTEST-v2.6.1.md`, `tests/QA-v2.6.1.md`.

## Limitations and deferrals

- Repeat-appeal scores are automated estimates; fun and desire-to-replay require the supplied human playtest.
- Six controlled activities remain candidates for dedicated manipulation engines in v2.7.0. No v2.7.0 implementation was started.
- Real-device mobile testing was not performed.

## Version

**Makmal Cilik v2.6.1**
