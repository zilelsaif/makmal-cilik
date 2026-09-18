# Makmal Cilik v2.3.0 QA

### Buku Makmal Architecture
`MakmalJournal` builds a read-only catalog from the existing Year 1–6 unit and mission registries. No discovery text is copied into localStorage. Routes render overview → selected year → selected unit → selected mission on demand.

### Player Integration
Every counter and entry reads the active profile through `MakmalProgress`. The header shows the active avatar and name.

### Overall Progress
The overview derives 50 + 35 + 50 + 50 + 50 + 55 = 290 missions and 58 units from existing progress helpers. Bars include numeric text and ARIA progress values.

### Year Views
Six cards show actual completed/total counts. Year detail renders 10, 7, 10, 10, 10 or 11 unit cards as appropriate.

### Unit Views
A selected unit renders exactly five mission entries with completed, incomplete and BARU states.

### Discovery Records
Completed mission detail retrieves the canonical `discovery` or the established presentation fallback for Electricity Missions 1–2, plus first `completedAt`. Attempts are omitted from the child view to keep it encouraging.

### Discovery Leakage Audit
Incomplete mission detail does not interpolate the canonical discovery into its HTML. It shows title, status and progression guidance only.

### Recent Discoveries
Up to five completed missions with valid `completedAt` values are sorted newest-first. No activity is fabricated when dates are missing.

### Continue Learning
Navigation selects the next available incomplete mission in the most recently completed unit where possible, then falls back to the first available incomplete mission. It makes no learning-intelligence claim.

### New Discovery State
`preferences.viewedDiscoveries` stores only boolean profile-local keys. Opening the actual completed entry marks it viewed without changing completion records.

### Profile Isolation
Automated QA completes a mission in Profile A, switches to empty Profile B, and verifies independent counters and viewed states.

### Migration
v2.2 profile data normalizes to v2.3. Malformed `viewedDiscoveries` is treated as empty while science progress, settings and compatible fields remain intact.

### Accessibility
All navigation uses semantic buttons. Progress bars have role, minimum, maximum, current value and readable numeric labels. Discovery state is expressed with text/checkmarks as well as color.

### Keyboard QA
Routes remain operable with Tab, Shift+Tab, Enter and Space through native buttons. Back and Home retain existing semantics.

### Responsive QA
Target matrix: 1366×768, 1920×1080, 390×844, 360×640 and 800×450. High-risk screens include six-year overview, Year 6 with 11 units, unit mission list, discovery detail, recent list, empty state and full-completion state.

### 290 Discovery Audit
Automated audit reports exactly 290 entries: Year 1 50, Year 2 35, Year 3 50, Year 4 50, Year 5 50 and Year 6 55. Missing title/unit/year/discovery: 0. Generic congratulatory-only discovery: 0.

### 290 Mission Regression
All existing mission suites pass, including progression, replay, attempts, timestamps, unit/year/master completion and storage recovery.

### Parent Zone Regression
Parent dashboard remains a separate adult progress summary behind the existing adult gate; Buku Makmal is not duplicated there.

### Support Regression
The support screen, voluntary policy and original QR poster remain unchanged.

### Audio Regression
Existing procedural audio and global mute tests pass. Buku Makmal uses subtle UI events and an optional discovery cue only when a newly recorded completed entry is first opened.

### Performance
Only one year or one five-mission unit is rendered at a time. No 290-entry detail DOM, framework, network API or duplicated storage content was added.

### Privacy
All Buku Makmal data remains on-device. There is no upload, analytics, cloud, external API or sharing.

### Bugs Found and Fixed
The former Buku Makmal main-menu card was a placeholder. It now routes to the active profile record. Electricity Missions 1–2 stored their canonical discoveries in the shared presentation layer rather than the mission object; the catalog now resolves that established source safely.

### Known Limitations
Recent discoveries require valid historical `completedAt` values. Older records without a timestamp remain completed but are omitted from the recent list.

Final version: **Makmal Cilik v2.3.0**.
