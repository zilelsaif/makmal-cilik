# Cloudflare Pages Deployment Checklist — Makmal Cilik v2.4.0

## Repository and build

- [x] Production version is `v2.4.0 by Zil-el-Saif`.
- [x] `package.json` and `package-lock.json` are synchronized at `2.4.0`.
- [x] Node.js 22 is selected through `.nvmrc`.
- [x] `npm ci` succeeds from a clean dependency state.
- [x] `npm run verify:web` passes the automated suite and production build.
- [x] Package-lock metadata and the installed dependency graph are valid.
- [x] The production build displays `v2.4.0 by Zil-el-Saif`.
- [x] `www` contains only production files and the Cloudflare `_headers` file.
- [x] No environment variable or secret is required.

## Cloudflare Pages settings

- [ ] Connect the intended GitHub repository in Cloudflare Pages.
- [ ] Set **Production branch** to `main`.
- [ ] Set **Root directory** to `/` (repository root).
- [ ] Set **Build command** to `npm run build:web`.
- [ ] Set **Build output directory** to `www`.
- [ ] Set **Node.js version** to `22` if the dashboard does not honor `.nvmrc` automatically.
- [ ] Start the first v2.4.0 production deployment.
- [ ] Confirm the deployment finishes successfully with `npm ci` and the web build.

## Live-site smoke test

- [ ] Open the Cloudflare production URL in a private browser window.
- [ ] Confirm the footer displays `v2.4.0 by Zil-el-Saif`.
- [ ] Confirm Title → profile selection → Main Menu → year selection works.
- [ ] Confirm a mission opens, accepts keyboard/touch input and can be replayed.
- [ ] Confirm profile creation, switching and independent progress work.
- [ ] Confirm sound works, mute persists after reload and silent play remains usable.
- [ ] Confirm Buku Makmal, Parent Zone and Support screens open.
- [ ] Confirm the support QR is sharp, unobstructed and scannable from a second device.
- [ ] Confirm sound choice and active profile persist after reload.
- [ ] Confirm Back, Forward and direct root reload do not show a 404.
- [ ] Confirm fullscreen enters/exits without an uncaught error.
- [ ] Confirm no console errors and no failed asset requests.
- [ ] Confirm no analytics, tracker or unexpected third-party network request appears.
- [ ] Confirm there is no horizontal overflow at 1366×768, 1920×1080, 390×844, 360×640 and 800×450.
- [ ] Confirm the deployment status is **Success**.
- [ ] Confirm the live URL opens without a hard refresh and shows the new version immediately.
- [ ] Record the final production URL and deployment identifier in the release record.

## Cache and rollback

- [ ] Confirm `_headers` is active: HTML is not cached and versioned JS/CSS receives immutable caching.
- [ ] Confirm assets revalidate according to the one-day policy.
- [ ] Keep the previous successful Cloudflare deployment available for rollback.
- [ ] If rollback is needed, promote the previous deployment and investigate before rebuilding.

Items marked complete were verified locally against the generated `www` bundle. Deployment and live-domain items remain intentionally unchecked until Cloudflare performs the release.
