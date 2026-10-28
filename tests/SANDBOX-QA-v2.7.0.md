# Sandbox QA v2.7.0

## Four sandboxes

| Sandbox | Mission | Free variables | Model limit |
|---|---|---|---|
| Makmal Litar | `electricity-2` | graph connections, switch | safe simple circuit only; no voltage/resistance |
| Makmal Bayang | `light-dark-3` | light/object/screen distance, object size | aligned ideal point light; no penumbra |
| Makmal Daya | `y6-force-5` | direction, force level, explicit surface | abstract displacement and friction scale |
| Makmal Mesin | `y6-machines-5` | lever arms/load or ramp height/length/load | ideal rigid/frictionless models |

All models are pure computation separated from rendering. PICO and effects cannot determine results. State changes only after a learner control, reset or new challenge. Leaving a screen aborts its listener.

## Challenge generation and validation

- 200 deterministic seeds per sandbox; 800 total.
- Same ID, seed and provider version reproduce the same setup and goal.
- Five challenge families/configurations per sandbox were observed.
- A constructive search independent from each model's validator found a real solution and a real non-solution for every generated case.
- Completion reads actual simulation output and is guarded once per challenge key.

## Scientific assertions

- Circuit: complete closed component path lights; open switch, missing wire, disconnected bulb and direct battery short remain off; reconnection updates immediately.
- Shadow: point-light geometry is coherent; moving an object closer increases its shadow under fixed conditions; invalid distances are bounded; target tolerance works.
- Force: direction changes displacement sign; static threshold stops weak force; friction opposes movement; greater friction never improves displacement for equal force.
- Machines: longer effort arm reduces lever effort; longer equal-height ramp reduces force over greater distance; ideal work remains coherent.

## Browser interaction QA

The same-origin browser harness mounted all four Free and PICO modes. It changed parameters, ran two trials, displayed A/B comparison, tried valid non-solutions, reached actual solutions, verified one completion increment and disposed screens. Enter activated Run and Space activated a parameter button. Console errors/warnings: none.

Responsive browser checks:

| Viewport | Horizontal overflow | Run control | Comparison |
|---|---:|---:|---:|
| 1366×768 | No | Visible/reachable | Visible |
| 1920×1080 | No | Visible/reachable | Visible |
| 390×844 | No | Visible/reachable | Visible |
| 360×640 | No | Visible/reachable | Visible |
| 800×450 | No | Visible/reachable | Visible |

Real Android hardware and assistive-technology user testing were not performed. Touch behavior uses native buttons/ranges and was inspected in mobile viewports; physical-device touch remains pending.

## Profile and migration

v2.6.1 profiles receive a normalized sandbox v1 branch. Malformed sandbox data resets only sandbox counters. Cross-profile tests show independent counters. Canonical progress, attempts, `completedAt`, replay history, discoveries, celebrations and unknown compatible profile fields remain intact. Persistent data contains counters/timestamps only; two-trial history stays in memory.
