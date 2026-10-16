# Manual Replay Playtest — Makmal Cilik v2.6.1

Human fun-factor verification is **NOT TESTED**. Use this sheet for 3–5 runs per mission on at least one desktop and one touch device.

## Per-run record

| Run | Seed / signature | What visibly changed? | What decision changed? | Expected outcome | Observed outcome | Confusion | Desire to replay (1–5) | Severity |
|---:|---|---|---|---|---|---|---:|---|
| 1 |  |  |  |  |  |  |  |  |
| 2 |  |  |  |  |  |  |  |  |
| 3 |  |  |  |  |  |  |  |  |
| 4 |  |  |  |  |  |  |  |  |
| 5 |  |  |  |  |  |  |  |  |

For every run also check: challenge text matches trials; all trials can be activated by keyboard/tap; observations match Cuba results; Fikir accepts only the evidence-backed option; hint does not reveal it; Temui separates result from principle; replay count increments once; Back/Home work; original `completedAt` remains unchanged.

## Priority representatives

### `y1-magnets-2` — Tarik atau Tidak?

Run with at least three different object sets. Confirm iron/steel objects are attracted, wood/plastic/rubber are not, the asked object appeared in the trial, and a child can distinguish material from colour or shape.

### `electricity-2` — Nyalakan Mentol

Confirm the original Golden Mission still uses its workbench, keyboard terminals, locked PICO placement, bulb glow and result panel. Then test 3–5 controlled replays: changed challenge text must match connection/switch evidence, no invalid circuit claim may light the bulb, and the UI must say **VARIAN TERKAWAL**, not imply free wiring.

### `y3-acid-alkali-5` — Cabaran Bahan Misteri

Cover acid, alkali and neutral results. Confirm litmus direction is correct, all samples are explicitly virtual, no prompt encourages touch/smell/taste, and Fikir asks about a sample actually observed.

### `y4-light-properties-2` — Misteri Bayang-Bayang

Cover distance and rotation conditions. Check near-source versus near-screen wording, apparent shadow-size relationships, orientation result and whether the controlled-card interaction is clear without promising draggable positioning.

### `y5-electricity-5` — Jurutera Litar

Cover parallel, series, switch and broken-branch evidence. Confirm statements about independent branches are consistent, the general discovery does not overclaim, and controlled variants remain understandable without a free circuit editor.

### `y6-speed-5` — Perlumbaan Saintifik

Record distance, each time and displayed speed. Recalculate `distance ÷ time` to one decimal place. Confirm the asked car/result is present and the fastest interpretation agrees with the numbers.

## Remaining 13 missions

| Mission | 3–5 run focus |
|---|---|
| `y1-magnets-4` Magnet Mana Lebih Kuat? | A/B order, clip counts, stronger-magnet conclusion. |
| `y1-absorption-5` Misi Tumpahan Air | Spill context, absorbent/non-absorbent materials, clean-up suitability. |
| `electricity-3` Mentol Tidak Menyala | Fault context, open connection/switch/terminal diagnosis. |
| `light-dark-3` Bayang-Bayang | Object, lamp movement, direction and size evidence. |
| `mixtures-5` Cabaran Asingkan Campuran | Ingredients, magnet/hand/size separation choices, unnecessary water. |
| `y3-measurement-4` Isi Padu Cecair | 5/10 mL scale, value reading, eye-level wording. |
| `y3-density-1` Timbul atau Tenggelam? | Material sample, float/sink result, avoid size-only reasoning. |
| `y4-sound-5` Cabaran Kurangkan Bunyi | Source reduction, barriers, soft materials, visible evidence. |
| `y4-energy-5` Jejak Tenaga | Source-to-effect chain, valid versus unsupported chain. |
| `y5-heat-5` Cabaran Haba | Expansion, insulation, temperature measurement and safety. |
| `y5-matter-5` Cabaran Jirim | Melt/freeze/evaporate/condense and heat direction. |
| `y6-force-5` Cabaran Daya | Useful versus harmful friction and force direction. |
| `y6-machines-5` Cipta Mesin Berguna | Goal, machine component function and safety guard. |

## Device/accessibility record

Test 1366×768, 1920×1080, 390×844, 360×640 and 800×450. Record keyboard Enter/Space, touch activation, focus visibility, text clipping, horizontal overflow, low-height scrolling, reduced motion and whether any evidence relies only on colour or sound. Real-device testing remains pending until recorded here.
