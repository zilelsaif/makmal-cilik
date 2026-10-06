# Makmal Cilik v2.6.0 QA

## Scope

Web-first replayability release. It adds Makmal Bebas, a production replay classification registry and 19 dynamic providers. It adds no curriculum mission, bitmap artwork, dependency or Android change.

## Automated QA

- `npm ci`: passed; 99 packages installed from the lockfile. The existing transitive `uuid@7.0.3` deprecation warning remains informational.
- `npm test`: passed **26** automated test files.
- Dynamic generation: passed **1,900** deterministic seed cases.
- Classification audit: passed **290 / 290** missions and exactly **19** dynamic providers.
- Existing mission-engine regression: passed all Year 1–6 suites and exact **6 years / 58 units / 290 missions** totals.
- `npm run verify:web`: passed.
- `npm run build:web`: passed; **121 files / 2,193,961 bytes** in `www`.

## Responsive Browser QA

| Viewport | Makmal Bebas | Dynamic experiment | Horizontal overflow | Navigation / actions |
|---|---|---|---|---|
| 1366×768 | Pass | Pass | None | Visible |
| 1920×1080 | Pass | Pass | None | Visible |
| 390×844 | Pass | Pass | None | Visible |
| 360×640 | Pass | Pass | None | Visible |
| 800×450 | Pass | Pass | None | Visible; page remains vertically scrollable |

All 19 hub cards rendered at every viewport. Available buttons remained at least 58 px high in the tested layouts. The five-step experiment retained a visible next action and Back/Home controls at every size.

## Browser Functional QA

- Main Menu → Makmal Bebas: passed.
- Locked/available rendering against the active profile: passed.
- Full Ramal → Cuba → Perhati → Fikir → Temui replay: passed.
- Replay count update and new-run action: passed.
- Completed canonical mission → VARIAN DINAMIK intro: passed.
- Curriculum replay → Back → original unit: passed.
- Console errors: **none**.

## Storage and Migration

- Existing v2.5.3 profiles normalize to v2.6.0 without losing progress or compatible fields.
- Missing/malformed replay metadata repairs to safe defaults.
- Blocked storage remains playable through the existing in-memory fallback.
- Replay history is bounded to eight signatures per mission.
- Replay records are profile-specific and do not overwrite canonical completion timestamps.

## Asset and Platform Integrity

- No asset was generated.
- Desktop title hero SHA-256: `558D0AD76CD884FEEDBDB394FE19E0D6E85FA87762503D7CDCA936E706FB25BF`.
- Mobile title hero SHA-256: `7A3846E269DEC79B171BA2188F926151B6246143169593996620AE5B0F2682FA`.
- Support poster/QR SHA-256: `0ACD16A9CF12A263B5E1AC8CCADA15B89D782897080AEFE5DB31DE0483159089`.
- Git reports no changed path under `assets/title`, `assets/support`, Capacitor config or Android.
- No APK/AAB build or Capacitor sync was run.

## Bugs Found and Fixed

- Repaired replay completion sanitization so the same generated run cannot increment success twice.
- Added a safe timer fallback for environments without the browser `performance` global.
- Ensured direct free-lab routes reject unknown, non-dynamic or still-locked mission IDs.
- Kept replay disposal connected to the canonical experiment shell so Back/Home cannot leave stale listeners.

## Known Limitations

- Dynamic trials are controlled visual simulations; they do not replace real supervised experiments.
- Immediate duplicate prevention compares the full scientific variant signature. A repeated headline/context may still accompany a different trial set.
- Only the approved 19 missions have generated variants in v2.6.0; the remaining classified missions keep canonical replay.

## Version

**Makmal Cilik v2.6.0**
