# Makmal Cilik v2.1.0 QA

## Profile QA

- Local profile store supports one to six profiles.
- Names are trimmed, whitespace is collapsed, control/HTML-breaking characters are removed, empty names are rejected and the stored value is limited to 20 characters.
- Six built-in avatars are available: PICO, flask, microscope, planet, bulb and leaf.
- Add, rename, avatar change and profile switching passed automated storage tests and browser interaction checks.
- The six-card profile view was checked at 390×844, 360×640 and 800×450. The add control disappears at the six-profile limit.

## Legacy Migration

- A v2.0.0 single-player save migrates into the first profile.
- Year 1–6 progress, attempts, `completedAt`, compatible profile fields, global sound setting and unknown compatible root fields are retained.
- Persisted v2.1.0 data uses `profiles[]` plus `activeProfileId`; legacy root `progress` and `profile` values are not duplicated in storage.

## Cross-Profile Isolation

- Profile A and Profile B completed different missions in automated tests; each retained only its own records after repeated switching.
- Profile A at 290/290 and Profile B at 0/290 produced independent master-completion states.
- Mission definitions remain shared code and are not duplicated per profile.

## Parent Gate

- Primary gate requires an approximately three-second continuous hold.
- Pointer/touch hold and Space/Enter hold share the same timer and visible progress state.
- A deliberate two-step keyboard alternative was verified in the browser.

## Parent Dashboard

- Shows selected player, 290-mission total, overall percentage, completed units, incomplete units, attempts, recent activity and Year 1–6 totals.
- Browser verification confirmed the dashboard changes with the selected profile and does not show invented learning scores.

## Profile Management

- Parent Zone provides add, rename, avatar change and deletion.
- Deletion uses an in-game confirmation explaining that the selected profile's local progress will be removed.
- The last remaining profile cannot be deleted.

## Reset Progress

- Reset uses two in-game confirmations, including the explicit “290 rekod misi” warning.
- Automated tests confirm only the selected profile is reset; other profiles and global settings remain intact.

## Support Screen

- Contains voluntary-support wording, development/maintenance/assets/audio/device testing/hosting/tools/Play Store costs and neutral thanks copy.
- RM4.90, RM9.90 and RM19.90 are suggestions only.
- No payment-success claim or verification logic exists.
- Support unlocks no content, rewards, avatars, badges, XP, stars or gameplay advantages.

## QR Display

- The supplied 1024×1536 poster is used as the primary support visual.
- It was converted to a 1,284,904-byte lossless WebP. Pixel comparison against the supplied PNG returned an exact match after decoding.
- The QR has no overlay, animation, mask or programmatic regeneration. A full-size poster link is available.
- Browser QA confirmed the image loads at its correct intrinsic dimensions. A live banking/eWallet scan was not performed.

## Accessibility

- New controls use semantic buttons, form labels, radio controls, a native profile selector and labelled dialogs.
- Add/edit forms and the adult-gate fallback were completed with keyboard controls.
- Focus styling and reduced-motion behavior are retained.

## Responsive QA

Profile selection, Parent Dashboard and Support were checked at:

- 1366×768
- 1920×1080
- 390×844
- 360×640
- 800×450

All 15 screen/viewport combinations reported no horizontal overflow and no horizontally clipped interactive controls. Six-profile layouts and both confirmation steps were additionally checked on small screens.

## Storage QA

Passed: fresh data, v2.0 migration, one profile, six profiles, maximum-limit recovery, switching, rename, avatar change, deletion, reset, malformed JSON, malformed profiles, missing active ID, deleted active ID, blocked storage and replay timestamp retention.

## 290 Mission Regression

All 290 mission definitions remain present and playable. The existing engine suites completed repeated runs across Year 1–6 storage states, progression, replay, attempts and timestamp preservation. Nineteen Node test files passed, including the new profile/storage suite. No curriculum mission or unit count changed.

## Privacy Audit

- No login, email, backend, cloud sync, external API, tracker or analytics code was found.
- No Android permissions are declared.
- Profile data and progress remain local to the device.
- The support QR is a static bundled asset; the app sends no payment or profile data.

## Performance

- Production bundle: 110 files, 1,936,822 bytes.
- Profile records contain progress state only; curriculum definitions remain shared.
- Support poster is the largest new asset because lossless preservation protects QR integrity.
- No framework was added.

## Bugs Found and Fixed

- Fixed compatibility checks that treated profile metadata and the active progress tree as one immutable value after the data-model change.
- Added recovery when `activeProfileId` is missing or points to a deleted profile.
- Prevented duplicate profile IDs and deletion of the final profile.
- Separated ordinary profile editing from gated destructive parent controls.
- Added a two-step keyboard alternative for the hold gate.
- Added two-step reset confirmation and a single explicit deletion confirmation.
- Worked around the host `uv_os_get_passwd` environment error for one Android sync; the temporary shim was removed afterward.

## Known Limitations

- Profiles do not sync between devices and are lost if site/app storage is cleared.
- The adult gate reduces accidental entry; it is not authentication.
- QR payments occur outside the app and are not verified by Makmal Cilik.
- The QR was preserved and visually verified, but no live transfer or banking/eWallet scan was performed.
- No release APK/AAB, store submission or physical-device certification was performed.

Final version: **Makmal Cilik v2.1.0**.
