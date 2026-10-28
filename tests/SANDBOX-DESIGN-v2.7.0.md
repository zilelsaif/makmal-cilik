# Makmal Bebas 2.0 — Sandbox Design v2.7.0

## Baseline architecture

Makmal Bebas v2.6.1 exposes 19 deterministic replay providers through `MakmalReplayRegistry` and `MakmalReplay`. A replay seed is combined with mission ID and provider version; profile-scoped replay statistics are stored separately from canonical mission progress. The shared renderer owns its event listener through an `AbortController` and returns a disposer. PICO supplies dialogue only; it does not decide scientific results.

The four selected curriculum links are the exact production IDs:

| Sandbox | Linked mission | Current title | Year / unit |
|---|---|---|---|
| Makmal Litar | `electricity-2` | Nyalakan Mentol | Year 2 / Elektrik |
| Makmal Bayang | `light-dark-3` | Bayang-Bayang | Year 2 / Terang & Gelap |
| Makmal Daya | `y6-force-5` | Cabaran Daya | Year 6 / Daya |
| Makmal Mesin | `y6-machines-5` | Cipta Mesin Berguna | Year 6 / Mesin |

Launch flow is Main Menu → Makmal Bebas → Makmal Interaktif card → mode selection → active experiment. Unlocking reads the linked canonical completion record for the active profile. Back returns from experiment to mode selection, then to Makmal Bebas; Home returns to Main Menu.

## Architecture

- `sandbox/core.js`: deterministic seed utilities, bounded two-trial comparison and shared helpers.
- `sandbox/registry.js`: four metadata records and versioned deterministic challenge families.
- `sandbox/modules/*.js`: pure scientific models, parameter validation and challenge validation.
- `sandbox/screens.js`: active-only rendering, semantic controls, PICO dialogue, prediction, observations, comparison, challenges and disposal.
- `progress.js`: profile-specific lightweight counters only. Scientific definitions and active experiment state remain in memory.

Every module supports equivalents of initialize, read state, update parameter, run, observe, reset, generate/validate challenge and dispose. Rendering calls the pure model and never supplies the answer.

## Scientific assumptions

### Circuit

A safe Year 2 graph contains battery, switch and bulb. The bulb lights only when a closed path includes all three components and there is no direct battery short. No voltage or resistance calculation is claimed.

### Shadow

The aligned point-light model uses `shadow height = object height × light-to-screen distance ÷ light-to-object distance`. Inputs are bounded and maintain screen distance greater than object distance. It is an idealized diagram without penumbra.

### Force

Force and friction use an abstract simulated scale. Static-friction thresholds are explicit per surface. Force below or equal to the threshold produces no movement; remaining force determines bounded simulated displacement in the chosen direction.

### Machines

The lever uses ideal torque balance with a rigid bar and ignored friction. The inclined plane uses ideal force `load × height ÷ length`; a gentler ramp reduces required force over a longer distance without reducing ideal work.

## State and persistence

Active parameters, current challenge and the last two trials are in memory and remain stable until the learner changes them or resets. Persistent profile metadata stores only `experimentsRun`, `challengesCompleted` and `lastPlayedAt` for each sandbox. Completion is guarded once per generated challenge. Migration initializes missing/malformed sandbox branches without touching progress, attempts, completedAt, replay history, Buku Makmal or master completion.

## Accessibility and lifecycle

All controls are native buttons, radio buttons or range inputs with visible values and labels. Every action works with click/tap and keyboard Enter/Space; sliders retain arrow-key behavior and also have step buttons. Outcomes use text and shape as well as colour. One delegated listener is owned by an `AbortController`; leaving a screen aborts it and clears active state. No animation loop or timer is required.
