# ZilTeroka Integration QA — Makmal Cilik v2.7.0

Date: 2026-10-27  
Scope: additive ZilTeroka Phase 1 branding only; no curriculum, progress, sandbox, support, Android, or release action.

## Reference and provenance

- The existing Makmal Cilik architecture and uncommitted v2.7.0 work were preserved.
- Official references were inspected read-only from `C:\Users\HP\Documents\GitHub\kedai-matematik` and `C:\Users\HP\Documents\GitHub\zilteroka`.
- Official ZilTeroka logo, icon, portal QR, and five game thumbnails were copied unchanged into `assets/branding/zilteroka/`.
- Asset sources and byte sizes are recorded in `assets/branding/ASSET-PROVENANCE.md`.
- The portal QR is byte-identical to the official Kedai Matematik reference asset. It was not regenerated, redrawn, or modified.

## Integration behavior

- The ZilTeroka introduction is injected only after JavaScript initializes, so a script failure cannot block Makmal Cilik.
- It appears once per browser tab session, auto-dismisses after 3.2 seconds, has a keyboard-focused `Langkau` button, supports Escape, handles image failure safely, and does not play audio.
- A single reusable `Kenali ZilTeroka` dialog is opened from both the Title Screen and Main Menu.
- The dialog contains exactly five cards: Kedai Matematik, Detektif Bahasa, Mata Helang: Cari Kata, KubiKata, and Sirah Quest.
- Only the three verified playable/beta products expose `Main Sekarang` links. KubiKata and Sirah Quest remain non-clickable development cards.
- External links open in a new tab with `noopener noreferrer`.
- No fetch, XHR, WebSocket, beacon, tracker, analytics, external API, or remote asset request was added.

## URL validation

On 2026-10-27, local HTTP HEAD checks returned 200 for:

- `https://zilteroka.pages.dev/`
- `https://kedai-matematik.pages.dev/`
- `https://detektif-bahasa.pages.dev/`
- `https://mata-helang-cari-kata.pages.dev/`

Availability is external state and can change after this audit.

## Accessibility

- Dialog uses `role="dialog"`, `aria-modal="true"`, an accessible title and description.
- Initial focus lands on the close control.
- Tab and Shift+Tab remain inside the dialog; Escape closes it; focus returns to the exact invoking button.
- Intro focus lands on `Langkau`; keyboard dismissal is available.
- Buttons and links remain semantic with visible focus inherited from the existing UI system.
- `prefers-reduced-motion: reduce` disables ZilTeroka intro/card motion.
- No information is audio-only or color-only.

## Responsive browser QA

Tested in the in-app Chromium browser at:

| Viewport | Result |
| --- | --- |
| 1366×768 | PASS — dialog contained in viewport; no horizontal overflow |
| 1920×1080 | PASS — dialog contained in viewport; no horizontal overflow |
| 390×844 | PASS — one-column mobile cards; controls reachable; no horizontal overflow |
| 360×640 | PASS — close control visible; 120×120 QR visible; no horizontal overflow |
| 800×450 | PASS — low-height dialog scrolls internally; no horizontal overflow |

Additional browser observations:

- Intro appeared on a fresh tab with `Langkau` focused.
- Immediate skip removed the intro after its short exit transition.
- Reload in the same session did not repeat the intro.
- Both Title Screen and Main Menu entries opened the same five-card dialog.
- Main Menu focus returned to `KENALI ZILTEROKA` after Escape.
- Browser console errors/warnings: none observed.
- Physical touch-device testing was not performed; Chromium viewport click, keyboard, and responsive tests were performed.

## Regression and protected assets

- Curriculum remains exactly 6 years, 58 units, and 290 missions.
- Replay registry remains exactly 19 providers; Makmal Bebas remains four sandboxes.
- Profiles, progress, Buku Makmal, Parent Zone, support, sound, and fullscreen are unchanged by the integration.
- Protected hashes remain unchanged:
  - desktop hero: `558D0AD76CD884FEEDBDB394FE19E0D6E85FA87762503D7CDCA936E706FB25BF`
  - mobile hero: `7A3846E269DEC79B171BA2188F926151B6246143169593996620AE5B0F2682FA`
  - support poster/QR: `0ACD16A9CF12A263B5E1AC8CCADA15B89D782897080AEFE5DB31DE0483159089`
- No files under `assets/title`, `assets/support`, `assets/reference`, Capacitor configuration, or Android were changed for this integration.

## Automated gates

Final clean sequential results:

- `npm ci`: PASS — 99 packages installed; the existing audit reports three moderate dependency advisories. No dependency upgrade was made in this branding task.
- `npm test`: PASS — all 29 automated test files passed.
- `npm run verify:web`: PASS — tests and production packaging passed.
- `npm run build:web`: PASS — 140 production files / 3,476,689 bytes.
- Bundle delta from the pre-integration v2.7.0 baseline (130 files / 2,225,538 bytes): +10 files / +1,251,151 bytes. The increase is the local ZilTeroka runtime/style and eight official branding assets.

The dedicated `tests/zilteroka-v27.test.cjs` covers card/link counts, session intro behavior, safe external-link attributes, reduced-motion declarations, title/menu entry points, local-only behavior, asset presence, and official QR byte identity.

## Limitations

- No production deployment or Cloudflare Pages action was performed.
- No physical device or assistive-technology screen-reader session was performed.
- External site availability was checked only at the date above.
- This additive integration does not claim to fix unrelated scientific simulation or visual issues outside the ZilTeroka Phase 1 scope.
