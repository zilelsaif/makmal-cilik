# UX audit — Makmal Cilik v0.8.0

Scope: polish of the existing 15 missions only. No new curriculum, schema or production artwork.

| Mission | Issue found | Change made | Pacing result | Interaction result |
| --- | --- | --- | --- | --- |
| Kenali Peralatan | Prediction acted as a scored gate; lengthy repeated summary | Any prediction can proceed; keep matching/observation learning; shared concise completion | Less guess-and-retry before exploration | Matching preserved; prediction visibly selected |
| Nyalakan Mentol | Hint could still refer to terminals after all wires connected | Contextual switch hint and concise PICO | Clear next action | Three connections and switch preserved |
| Mentol Tidak Menyala | Instructions repeated in header and PICO | Short objective and guidance; shared feedback | Less repeated text | Deterministic repair remains |
| Suis Misteri | Generic hint did not follow observed switch states | Hint identifies the unobserved state | Less searching for what remains | Both switch states still required |
| Cabaran Juruteknik | Finale repeated workbench and lacked Year 2 route | Compact shared finale, count and hub button | Shorter completion screen | Repair challenge unchanged |
| Mana Sumber Cahaya? | Long completion repeated all object cards | Concise concept and replay/list controls | Faster return to hub | Five-object classification preserved |
| Nyalakan Bilik | Hint kept highlighting power after lamp was on | Highlight an unvisited region | Next action clearer | Three regions still required |
| Bayang-Bayang | Hint could suggest moving ball with light off | Guide power before ball control | Less trial without visible result | Toggle and object manipulation preserved |
| Halang Cahaya | Hint/dialogue repeated instructional text | Short PICO; highlight an untested material | Clear comparison focus | Both materials still required |
| Misteri Dalam Gelap | Hint always pointed right; completion repeated room | Guide source, region, obstruction and item; compact finale | Less repeated searching and scrolling | Visibility guards preserved |
| Apa Dalam Campuran? | Generic praise and full repeated tray on completion | Varied PICO; compact discovery summary | Less repetition | Three material discoveries retained |
| Gunakan Magnet | Generic hint did not distinguish tool selection from application | Highlight application once magnet selected | Less uncertainty after selecting tool | Wrong-tool retry retained |
| Ayak Campuran | Hint could replay animation by redrawing activity | Hint updates guidance without replacing workbench | Visual outcome stays stable while reading hint | Sieving animation/state preserved |
| Larut atau Tidak? | Hint could emphasize material instead of add/stir step | Contextual material/add/stir target; stable PICO | Current task clearer | Three fresh-water tests retained |
| Cabaran Asingkan Campuran | Long completion and inconsistent unit feedback | Shared finale with 5 / 5 and Year 2 route | Shorter finale | Magnet-then-sieve sequence retained |

## Shared findings and fixes

- Standard labels: Hint, Seterusnya, Temui, Perhati Seterusnya, Main Semula, Kembali ke Senarai Misi.
- Current/completed/future steps use one compact rail. Portrait action controls and experiment navigation remain sticky with scroll margins.
- Feedback uses text as well as colour. Gentle wrong-action nudge and progressively stronger mission/unit celebration respect reduced-motion CSS.
- Same-step changes retain the PICO node, live region and rail. Hint no longer rebuilds the activity or starts a temporary removal timer.
- Focus falls back to an enabled control when a selected material/terminal becomes disabled. Step changes scroll to the relevant heading, not the page top.
- Global click audio previously overlapped experiment-specific hooks. The global handler now checks the original event path; shared dispatch selects one audio hook per action.
- Replay of an ordinary completed mission does not repeat the whole unit celebration. No completion/attempt/timestamp meaning changed.

## Verification status

- Initial v0.8 browser regression: all 15 missions across five target sizes, 90 scenarios / 900 completions passed before the final audio-handler and replay-finale refinements.
- Strengthened audio tests exposed duplicate global click hooks. Code is corrected. Final Electricity rerun passed all 40 scenarios / 400 completions across all five sizes, including audio deduplication, replay, progression, blocked storage and v0.7 migration; no clipping, overflow or application errors were reported.
- Node rule, reset and migration tests passed. Additional experience tests cover all 15 presentation records and 60 phase-specific hint paths.
- Visual inspection completed for the compact portrait rail, objective, PICO and contextual hint.
- Final light and mixture matrices also passed: 30 scenarios / 300 completions each. Final total: 100 scenarios / 1,000 completions across all five sizes, with no horizontal overflow, clipped controls or application errors.
- All 15 missions completed through real browser keyboard input, including terminal connections, repair and the switch with Space. Year 2 return, fullscreen entry/exit and sound persistence after reload passed. Original muted setting restored.
- Final preview, light fixture and mixture fixture error logs were empty. Browser-tool network/approval timeouts interrupted testing but were recovered without changing application behavior or bypassing the browser surface.
- Reduced-motion CSS remains in place; the browser exposes no reduced-motion emulation capability, so native system-mode verification was unavailable.

Target sizes: 1366×768, 1920×1080, 390×844, 360×640, 800×450. No physical Android test or child usability study. Pacing conclusions are qualitative, not measured learning outcomes.
