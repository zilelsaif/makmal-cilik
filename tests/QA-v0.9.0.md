# Makmal Cilik v0.9.0 QA

## Browser matrix

| Unit | Scenarios | Mission completions | Result |
| --- | ---: | ---: | --- |
| Tumbuhan | 30 | 300 | Pass |
| Elektrik | 40 | 400 | Pass |
| Terang & Gelap | 30 | 300 | Pass |
| Campuran | 30 | 300 | Pass |
| Total | 130 | 1,300 | Pass |

All units tested at 1366×768, 1920×1080, 390×844, 360×640 and 800×450. No horizontal overflow, clipped controls, intercepted interaction targets, duplicate completion or application errors. Fixtures use disposable in-memory saves.

## Plant interactions

| Mission | Verified |
| --- | --- |
| Apa Tumbuhan Perlukan? | Multiple unpenalized predictions; wrong needs retry; water, sun and air required; duplicate selection guarded |
| Tumbuhan Dahaga | Either A or B can receive water, never both; time step required; only unwatered plant wilts |
| Bahagian Tumbuhan | Four tap/keyboard matches; wrong target retry; numbered 44px targets; observations highlight each part |
| Arah Cahaya | Left/right growth; both trials required; new trial resets growth; explicit simulated time |
| Selamatkan Pokok Layu | Inspect before watering/light controls; both care actions required; recovery, before/after and unit finale |

All five completed through actual Enter keyboard input at portrait/landscape sizes. Visual inspection covered 390px activity, 360px diagram and 800×450 light scene. SVG loaded correctly; no new bitmap assets.

## Storage and navigation

Fresh, v0.8 migration, partial and full Tumbuhan, malformed and blocked storage passed. Replay retains original completedAt, increments attempts and preserves completion. Existing Electricity/light/mixture records, settings, profile and unrelated data remained intact. Mission 1 always available. Hub counters are derived; completed plant hub displayed 5/5 while unimplemented units remained 0/5. Back/Home and replay/reset navigation passed. Sound persisted after reload and original muted setting was restored. Fullscreen entry/exit passed. Final preview and plant-fixture error logs were empty.

## Rule tests and fixes

All seven Node suites passed, including 150 new plant runs. Syntax checks passed. No new timers or dependencies. Reset clears selected labels, trials, water, inspection and growth. Final polish corrected soil moisture colour, partial-rescue captions and hint targets after the activity was solved.

## Limitations

Growth and recovery are simplified, explicitly time-compressed simulations. No physical Android or native OS reduced-motion test; reduced-motion CSS disables plant transitions/breeze. Touch-style events and hit targets were tested in browser fixtures. Blocked storage is memory-only and cannot survive reload. No measured learning-outcome or child usability study.
