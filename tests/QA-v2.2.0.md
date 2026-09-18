# Makmal Cilik v2.2.0 QA

### Audio Architecture
A single `MakmalRewards` procedural Web Audio module serves every year engine through semantic events. Cooldowns, ten-voice limiting, completion replacement and immediate mute prevent audio storms and duplicate flourishes.

### Audio Asset List / Procedural Audio
No audio files were generated. Ten short deterministic oscillator patterns cover uiTap, uiSelect, correct, incorrect, hint, discovery, missionComplete, unitComplete, yearComplete and masterComplete.

### Audio Sizes
Audio asset total: **0 bytes**. Runtime code is the only addition.

### Autoplay Handling
The AudioContext is created/resumed only after pointer or Enter/Space interaction. Unsupported or rejected audio remains silent-safe with no gameplay dependency.

### Mute Persistence
The existing global `settings.sound` remains device-wide across profiles and reloads. Mute stops active voices immediately; unmute starts no queued sounds.

### Audio Failure QA
Automated coverage checks pre-unlock playback, sound off, rapid duplicates, stop, re-enable and missing AudioContext.

### Feedback System
One shared mapper normalizes legacy year-engine effects into the standard vocabulary. All mission screens retain an accessible live status region.

### Correct / Incorrect Feedback
Correct actions use concise positive text, a short lift/glow and happy PICO. Incorrect actions use non-punishing retry text, a small nudge and encourage PICO.

### PICO Reactions
Reusable neutral, curious, thinking, happy, encourage and celebrate states use the existing PICO asset and CSS only.

### Mission Completion
First completion uses a short flourish, discovery summary, saved-progress text and next controls. Replay uses a lighter discovery cue and preserves original `completedAt`.

### Unit Completion
A newly completed unit uses the stronger unit event and finite CSS sparkle without currency or rewards.

### Year Completion
Year completion screens and counts are preserved. A per-profile marker prevents repeat first-time audio after revisit/reload.

### Master Completion
The 6 / 6, 58 / 58, 290 / 290 finale uses the strongest short cue and finite CSS sparkle, once per profile.

### Unlock Feedback
A non-blocking accessible toast announces `Misi baharu dibuka!`; it does not steal focus.

### Reduced Motion
`prefers-reduced-motion: reduce` removes nonessential transforms and sparkle movement while preserving text, icons and controls.

### Keyboard QA
Native semantic buttons, visible focus, Enter/Space audio unlock and existing keyboard interaction paths remain intact.

### Touch QA
Existing double-activation guards remain. Audio cooldown and voice limits prevent rapid-touch storms.

### Responsive QA
Shared feedback is contained in existing panels; toast, PICO and completion effects do not add width. Target matrix: 1366×768, 1920×1080, 390×844, 360×640 and 800×450.

### Profile Regression
Celebration markers are stored inside each profile preferences object. Learning progress and completion remain independent.

### Parent Zone Regression
Parent screens receive only restrained shared button feedback. Adult gate timing and management flows are unchanged.

### Support Screen Regression
Support poster and payment QR were not edited or re-encoded. Support remains voluntary and unlocks nothing.

### Storage Migration
v2.1.0 data normalizes to v2.2.0 while preserving profiles, activeProfileId, settings, progress, attempts, completedAt and compatible unknown fields.

### 290 Mission Regression
Automated suites cover 50 + 35 + 50 + 50 + 50 + 55 = 290 missions and the shared hook audit confirms every mission passes through the central feedback/completion engine.

### Performance
No libraries, audio packs, canvas loops or persistent animation loops were added. Effects run only on interaction.

### Bugs Found
The old audio registry had no registered sources, so every hook was silent. Completion and ordinary events had no shared hierarchy. Stopping a mission could also have made a newly initialized audio context unusable if stop were treated as mute.

### Bugs Fixed
Replaced the empty registry with procedural semantic audio; separated voice stop from deliberate mute/suspend; added cooldowns, replay distinction, profile-scoped celebration claims, accessible toast variants and reduced-motion-safe CSS.

### Known Limitations
Procedural tones can vary slightly by browser/WebView audio implementation. Audio remains optional by design.

Final version: **Makmal Cilik v2.2.0**.
