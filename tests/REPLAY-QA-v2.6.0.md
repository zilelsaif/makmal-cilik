# Replay QA — Makmal Cilik v2.6.0

## Deterministic PRNG

- The runtime uses a mission ID, injected seed and provider version to create each PRNG stream.
- Repeating the same mission and seed produced deeply equal immutable run data.
- 100 seeds were tested for each of 19 providers: **1,900 generated cases**.
- Every provider produced more than one distinct signature across its seed set.

## Provider Validation

- Exactly 19 registered dynamic missions have exactly one provider.
- Every run contains at least two uniquely identified trials, two reflection choices, a scientific conclusion, hint, seed, provider version and stable variant signature.
- Providers vary controlled examples, values, order, positions or trial conditions without changing the target concept.
- The first answer is the evidence-backed conclusion used by the generic Fikir interaction; wrong choices do not complete the step.

## Immediate Duplicate Prevention

- A new run compares its signature with the last generated signature.
- A collision is regenerated with a deterministic retry seed, up to four bounded retries.
- All 19 provider duplicate checks produced a different immediate signature.

## First Learning Experience

- Canonical mission engines and first-run definitions are unchanged.
- Dynamic replay is available only after the matching canonical completion record exists for the active profile.
- Completed dynamic missions show a **VARIAN DINAMIK** intro and **Cuba Varian Baharu**.
- Ordinary completed missions retain their existing replay behavior.

## Makmal Bebas

- Main Menu exposes one **MAKMAL BEBAS** entry.
- The hub renders exactly 19 cards grouped by Year 1–6.
- In the browser test profile, 4 completed Year 2 missions were available and the other 15 cards were visibly locked.
- Locked cards have no launch button and explain that the original mission must be completed first.
- A completed live run updated its replay count to 1 and offered another new variant.

## Storage

- Replay fields live under each profile and do not duplicate mission definitions.
- `runs`, `successfulRuns`, `lastPlayedAt`, seed/signature metadata and up to 8 recent signatures are sanitized on load.
- Repeating completion for the same run increments success only once.
- Canonical `completedAt` remained byte-for-byte unchanged during replay.
- Profile A replay data was absent from Profile B; switching back restored Profile A's count.

## Navigation and Accessibility

- Hub cards and experiment controls use semantic buttons with visible focus inherited from the production design system.
- Prediction, trials, observation, reflection, hint and navigation are fully operable by click, tap and keyboard.
- Back from a replay entered through a curriculum mission returns to that unit. Home returns to Main Menu.
- Reduced-motion styling disables dynamic-card transitions.

## Result

All replay QA passed. No curriculum count, master completion rule or canonical progress field changed.
