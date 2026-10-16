# Replay Quality Audit — Makmal Cilik v2.6.1

## Method and rubric

The audit traced `seed → provider v2 → immutable run → visible challenge/trials → player test → observation → evidence-bound Fikir evaluation → feedback → Temui → profile replay stats`. Scores are automated, provisional estimates from 0–3:

- **A Visible variation** — the player can clearly see a changed challenge.
- **B Decision variation** — the run requires a changed prediction, evidence decision or calculation.
- **C Causal interaction** — meaningful conditions can be manipulated and outcomes respond.
- **D Scientific validity** — generated cases remain coherent and age appropriate.
- **E Repeat appeal** — estimated usefulness across 3–5 runs; human enjoyment is **NOT TESTED**.
- **F UX clarity** — controls, hints, observations and feedback explain the current run.

`STRONG` means the controlled replay is meaningfully different and internally consistent. `NEEDS IMPROVEMENT` means it works but would benefit from richer causal manipulation. `DEFER` identifies a full sandbox opportunity for v2.7.0; it is not claimed as implemented here. No provider remained `BROKEN` after the patch.

## Baseline finding

v2.6.0 generated different visible trial sets, but the shared renderer required every trial and evaluated `answers[0]` as correct. Most Fikir prompts asked the same general-principle question on every run. Thus signature counts overstated decision diversity, and the `SANDBOX` badge promised more freedom than the controlled click-to-test runner supplied.

## Scorecard

Counts below come from 200 deterministic seeds per mission. `S/V/D/O` means distinct signatures / visible configurations / evidence decisions / observed result strings. Scores are A/B/C/D/E/F.

| ID | Year · Unit · exact title | Type | Variation dimensions and baseline evidence | S/V/D/O | Scores | Final class |
|---|---|---|---|---:|---|---|
| `y1-magnets-2` | 1 · Magnet · Tarik atau Tidak? | Variable | Context and 4-object sample change; iron/steel versus non-magnetic result is visible; Fikir targets one sampled object. | 198/183/12/2 | 3/3/2/3/2/3 | STRONG |
| `y1-magnets-4` | 1 · Magnet · Magnet Mana Lebih Kuat? | Variable | A/B clip counts and stronger magnet change; learner reads the current count evidence. | 66/18/66/7 | 3/3/2/3/2/3 | STRONG |
| `y1-absorption-5` | 1 · Penyerapan · Misi Tumpahan Air | Variable | Spill size, material subset and absorption outcomes change; selected material result drives Fikir. | 199/163/115/5 | 3/3/2/3/2/3 | STRONG |
| `electricity-2` | 2 · Elektrik · Nyalakan Mentol | Sandbox classification | Component position context and circuit actions/results change; canonical Golden Mission remains intact. Shared replay is controlled, not a free circuit bench. | 200/155/123/5 | 3/3/1/3/2/3 | NEEDS IMPROVEMENT · DEFER full sandbox |
| `electricity-3` | 2 · Elektrik · Mentol Tidak Menyala | Variable | Fault context and inspection subset change; evidence identifies the broken condition and completed circuit result. | 187/68/65/4 | 3/3/2/3/2/3 | STRONG |
| `light-dark-3` | 2 · Terang & Gelap · Bayang-Bayang | Sandbox classification | Object and movement trials change; size/direction result is explicit. It lacks direct lamp/object positioning. | 177/70/34/3 | 3/3/1/3/2/3 | NEEDS IMPROVEMENT · DEFER full sandbox |
| `mixtures-5` | 2 · Campuran · Cabaran Asingkan Campuran | Variable | Mixture ingredients and tool subset change; method outcomes are tied to current materials. | 182/67/66/4 | 3/3/2/3/2/3 | STRONG |
| `y3-measurement-4` | 3 · Pengukuran · Isi Padu Cecair | Variable | Scale interval and three mL values change; exact current reading is required. | 193/97/181/9 | 3/3/2/3/3/3 | STRONG |
| `y3-density-1` | 3 · Ketumpatan · Timbul atau Tenggelam? | Variable | Vessel and object sample change; material-model float/sink evidence drives the answer. | 181/122/16/2 | 3/3/2/3/2/3 | STRONG |
| `y3-acid-alkali-5` | 3 · Asid dan Alkali · Cabaran Bahan Misteri | Variable | Rack and virtual sample set change; litmus outcome must be recalled. Safety wording forbids touch, smell and taste. | 189/126/45/3 | 3/3/2/3/3/3 | STRONG |
| `y4-light-properties-2` | 4 · Sifat Cahaya · Misteri Bayang-Bayang | Sandbox classification | Object and distance/orientation conditions change; results are coherent but direct positioning is absent. | 185/66/68/4 | 3/3/1/3/2/3 | NEEDS IMPROVEMENT · DEFER full sandbox |
| `y4-sound-5` | 4 · Bunyi · Cabaran Kurangkan Bunyi | Variable | Room and intervention subset change; visual evidence covers source, barrier and absorption without audio-only evidence. | 200/151/117/5 | 3/3/2/3/2/3 | STRONG |
| `y4-energy-5` | 4 · Tenaga · Jejak Tenaga | Variable | System and energy-chain sample change; valid/unsupported chain outcomes are explicit. | 186/125/18/2 | 3/3/2/3/2/3 | STRONG |
| `y5-electricity-5` | 5 · Elektrik · Jurutera Litar | Sandbox classification | Goal and series/parallel evidence subset change; no free wiring manipulation is provided. | 183/66/67/4 | 3/3/1/3/2/3 | NEEDS IMPROVEMENT · DEFER full sandbox |
| `y5-heat-5` | 5 · Haba · Cabaran Haba | Variable | Scenario and thermal action subset change; safety and heat/temperature distinctions remain explicit. | 193/122/121/5 | 3/3/2/3/2/3 | STRONG |
| `y5-matter-5` | 5 · Jirim · Cabaran Jirim | Variable | Starting context and state-change evidence subset change; heating/cooling results remain coherent. | 188/69/66/4 | 3/3/2/3/2/3 | STRONG |
| `y6-force-5` | 6 · Daya · Cabaran Daya | Sandbox classification | Device goal and friction/force action subset change; evidence varies, but direct force controls are absent. | 198/145/117/5 | 3/3/1/3/2/3 | NEEDS IMPROVEMENT · DEFER full sandbox |
| `y6-speed-5` | 6 · Kelajuan · Perlumbaan Saintifik | Variable | Distance, times, calculated speeds, target car and answer set change; 20 outcome strings validated arithmetically. | 193/138/189/20 | 3/3/2/3/3/3 | STRONG |
| `y6-machines-5` | 6 · Mesin · Cipta Mesin Berguna | Sandbox classification | Design goal and machine-component evidence subset change; component selection remains controlled. | 199/154/118/5 | 3/3/1/3/2/3 | NEEDS IMPROVEMENT · DEFER full design sandbox |

## Signature versus meaningful diversity

- 3,800 generated cases were checked. Every provider had at least two distinct visible configurations, evidence decisions and outcomes.
- A signature now includes the visible trial configuration and the evidence target/options. It no longer increases solely because option labels shuffled.
- High signature counts still do not imply endless novelty. Finite pools legitimately repeat across different seeds.
- Answer positions vary deterministically, but answer-position variation is reported separately and is not counted as scientific decision diversity.
- Repeat-appeal scores are provisional. Automated tests prove consistency and variation, not fun.

## End-to-end wiring

- One immutable run is created in `begin()` and retained across Ramal, Cuba, Perhati, Fikir and Temui. Rendering, hint use, resize and phase transitions do not reroll it.
- Trial labels and results rendered in Cuba/Perhati are the same data used to create the Fikir evidence question and explicit `correctAnswerIndex`.
- Incorrect feedback points back to the named observation. Hints guide the learner to review evidence without giving the answer.
- Temui shows the current observed result separately from the general discovery principle.
- Only completion invokes `recordReplayComplete`; its existing seed guard prevents double increments.

## Scientific safety

- Magnet and absorbency pools use clear material models.
- Circuits remain simple and exclude voltage, resistance and electron theory.
- Shadow direction/size relations, separation tools, measurement units and speed calculations were checked from generated output.
- Density is described as a model relative to water rather than a size rule.
- Acid/alkali samples are virtual; generated content explicitly says not to touch, smell or taste unknown materials.
- Sound evidence is visible in text. Heat/temperature, state changes, energy chains, friction and simple-machine claims remain within the stated primary-school scope.

## Deferred candidates for v2.7.0

Full standalone manipulation is deferred for `electricity-2`, `light-dark-3`, `y4-light-properties-2`, `y5-electricity-5`, `y6-force-5` and `y6-machines-5`. They now truthfully present as **VARIAN TERKAWAL**. Implementing free wiring, position dragging, force controls or open design would require dedicated engines and is outside this patch.
