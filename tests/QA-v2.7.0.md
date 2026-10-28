# Makmal Cilik v2.7.0 QA

## Baseline

- `npm test`: passed 27 v2.6.1 automated files before implementation.
- The first concurrently launched `verify:web` hit Windows `EPERM` while two processes attempted to replace generated `www`. This was an orchestration collision, recorded separately from product failures. Final gates were run sequentially.
- v2.6.1 production bundle: 121 files / 2,195,500 bytes.

## Functional scope

- Four sandbox cards, mode selection, Free Experiment and PICO Challenge are connected to predictable routes.
- Unlocks require canonical completion of `electricity-2`, `light-dark-3`, `y6-force-5` or `y6-machines-5` for the active profile.
- No curriculum definition or canonical engine was replaced.
- Exactly 6 years, 58 units, 290 missions and 19 dynamic providers remain.

## Automated regression

- Scientific and challenge suite: 800 seeds passed.
- Existing replay quality: 3,800 cases passed.
- Existing deterministic replay: 1,900 cases passed.
- Complete Year 1–6, profiles, Buku Makmal, master completion, Parent Zone, Support, audio, Golden Mission and production checks passed.

## Accessibility and responsive QA

Native buttons, selects and ranges provide keyboard/touch equivalents; no drag-only or colour-only outcome exists. Enter/Space browser checks passed. Visible focus uses existing shared tokens. Reduced motion disables decorative transitions. Five specified viewport checks passed without horizontal overflow or unreachable Run controls.

## Storage and privacy

Sandbox counters are profile-specific and bounded. Original `completedAt` and 290-mission master state remain unchanged. No external dependency, API, analytics, tracker, login, cloud sync or paid unlock was added.

## Performance and production

Four models are event-driven and render only while active. No animation/physics framework or continuous loop was added. Cloudflare settings remain main / root `/` / `npm run build:web` / `www` / Node 22. Android metadata and APK/AAB workflow were not changed.

- Final production bundle: 130 files / 2,225,538 bytes.
- Delta from v2.6.1: +9 files / +30,038 bytes (+1.37%).
- Sequential `npm ci`, `npm test`, `npm run verify:web` and explicit `npm run build:web`: passed.
- `npm ci` retained the existing `uuid` deprecation warning and three moderate audit findings; no forced dependency upgrade was applied.

## Bugs found and fixed

- Controlled replays previously had no true manipulation layer: four selected experiences now use real model state.
- Potential double challenge completion: guarded by profile-local challenge key and in-session completion set.
- Stale controls/listeners between screens: every mount owns and aborts one controller.
- Malformed sandbox storage: normalization now repairs the branch without touching learning progress.
- Initial browser QA fixture overflowed because its long PASS string used unwrapped `<pre>` text; the fixture was corrected. Product sandbox layout itself did not cause that overflow.

## Known limitations

- Models are deliberately simplified and state their assumptions.
- Challenge pools are finite, although setup is deterministic and repeatable.
- Trial history is session-only and limited to two.
- Human fun/engagement and physical-device testing remain pending.
- Future candidates may include advanced Year 4 light and Year 5 electricity sandboxes; neither is implemented here.
