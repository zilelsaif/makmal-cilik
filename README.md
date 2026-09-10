# Makmal Cilik

**Eksperimen. Fikir. Temui.**

An educational Science game for Malaysian primary-school students, by **Zil-el-Saif**. This v0.1.0 milestone provides the UI and navigation foundation only.

Curriculum direction: **KSSR / DSKP**. **Sains Tahun 2** is the first planned playable curriculum, with intended expansion to **Tahun 1–6**.

## Run

Open `index.html` in a modern browser. No installation, build, npm packages, CDN or network connection is required. For consistent browser storage behavior during development, serve this folder using any local static HTTP server. The preview in this development session uses http://127.0.0.1:4173.

## Structure

```text
index.html
css/
  base.css          Shared theme and accessible controls
  screens.css       Screen layouts
  responsive.css    Portrait and low-height landscape layouts
js/
  app.js            Rendering and interaction wiring
  router.js         Central SPA navigation
  progress.js       Version and resilient local storage
assets/
  branding/
  mascot/
  modules/
  ui/
  audio/
README.md
.gitignore
```

## Design

**Ramal → Cuba → Perhati → Fikir → Temui**

Future learning should emphasize observation, prediction and hands-on discovery, rather than a conventional multiple-choice quiz. The approved concept image is the project's visual target. The official reference is stored at `assets/reference/makmal-cilik-visual-target.png`. Its bright blue frames, yellow branding, white panels, green primary menu action and soft dimensional controls guide all four screens. The image is a design reference only and is never loaded by the game UI. The reference must never be embedded as the game interface.

PICO is an emoji placeholder on the title screen and main menu. The comment beside `pico()` in `js/app.js` shows how to replace it with `assets/mascot/pico.webp`.

## Current behavior

- Title → Main Menu → Pilih Tahun → Sains Tahun 2, without page reloads.
- Six year cards; only Tahun 2 opens the seven specified units.
- Other years and units display accessible in-game messages.
- Buku Makmal, Pencapaian, Profil and Tetapan open an Akan Datang panel.
- Kembali navigates to the parent screen; Menu Utama returns to the menu. The brand returns to the title. Browser Back/Forward restores visited screen state. Reload starts at the title.
- Sound preference persists under `makmalCilikData`. No audio is played in this milestone.
- Fullscreen enters/exits where supported, with a friendly fallback on failure.
- Semantic buttons, keyboard focus, large touch targets and reduced-motion CSS.

## Storage and version

`js/progress.js` owns the single application version constant, `APP_VERSION`. Its `loadData()`, `saveData()` and `updateSetting()` helpers handle missing or malformed data and unavailable storage. Unknown schema fields are preserved for future expansion. Storage is device/browser-local; in-memory fallback cannot persist after a reload.

Initial schema:

```js
{
  version: "0.1.0",
  settings: { sound: true },
  profile: { name: "Saintis" },
  progress: {}
}
```

## Planned delivery

This is a static Vanilla HTML5/CSS3/JavaScript application. GitHub → Cloudflare Pages hosting is planned; Capacitor Android packaging, Android Studio integration and a Google Play release are planned for later milestones. None is configured or published in v0.1.0. Cloudflare Pages can later serve this directory directly without an application build step.

No science experiments, quiz engine, progression, XP, star calculations, achievement logic, notebook content, backend, login, database, cloud sync, analytics, advertisements or monetization are implemented.

## QA — v0.1.0

Verified with the in-app browser:

- Title branding, exact tagline/version credit and PICO on both required screens.
- Main journey, all five unavailable-year messages, all seven unit messages and all four placeholder panels.
- Parent Back, Home, browser Back/Forward and keyboard Enter navigation.
- Sound off persists through reload; fullscreen enters and exits with updated state.
- Visible keyboard focus; no error-level browser console logs during the checks.
- All four screens checked under viewport settings 1366×768, 1920×1080, 390×844, 360×640 and 800×450. No horizontal overflow; all buttons measured at least 44 CSS pixels high. Portrait and landscape screenshots inspected.

Viewport caveat: the in-app browser applied display scaling during part of testing (for example, the 800×450 setting reported a 654 CSS-pixel content width). These are representative responsive checks, not exact physical-device certification. No real Android device was available. Some short/portrait screens scroll vertically so all content remains reachable.

JavaScript syntax checks passed. Separate isolated storage tests passed for missing data, malformed JSON, invalid top-level values, future fields/version preservation, preference reload and denied storage. Reduced-motion behavior was verified in the stylesheet (all transitions/animations disabled by its media query); OS-level preference switching was not exercised.

Known limits: PICO appearance varies with the platform emoji font; PICO remains a replaceable emoji placeholder rather than a reproduction of the reference robot. Fullscreen support depends on the browser. Storage fallback is temporary when localStorage is blocked. Actual experiments and Android packaging remain future work by design.


## Official visual target refinement — version unchanged

The supplied reference was inspected and copied from Downloads to `assets/reference/makmal-cilik-visual-target.png`. The game does not embed or fetch it. Shared CSS now uses vivid blue framed panels, blue/yellow title lettering, softly raised gradient buttons, a green main-menu learning action, pale laboratory backgrounds and bordered PICO dialogue panels. The four screen layouts retain their responsive grids, with compact framed headings on portrait and low-height screens. PICO remains an emoji placeholder. No experiment, XP, reward or other future system was added; version remains 0.1.0.

Panduan aset untuk kerja seterusnya: [ASSET-GUIDELINES.md](ASSET-GUIDELINES.md).

## Final QA after visual refinement — 2026-09-11

Exact DOM viewport dimensions were verified at 1366×768, 1920×1080, 390×844, 360×640 and 800×450. Title, main menu, year selection, Year 2 and placeholder layouts were measured at each size. No horizontal document overflow, clipped text/control boxes, off-screen horizontal controls or Back/Home overlap was found. All seven unit buttons were clicked successfully at every size; each displayed its expected message. Portrait title/menu and landscape title/placeholder were also visually inspected. Tall lists remain vertically scrollable.

One issue was found: the placeholder panel extended below the initial 800×450 viewport (bottom approximately 555px). A narrowly scoped low-height landscape rule in css/responsive.css reduces panel padding, icon size and spacing. All four placeholder panels were retested after reload and now end at approximately 405px within the 450px viewport, with no clipping or navigation overlap.

Sound-on and sound-off both survived reload. Fullscreen entered and exited with the expected control state. Back and Home navigation passed. Browser error-level console logs were empty. Version remains **Makmal Cilik v0.1.0**; no features or future milestone systems were added. These are browser viewport checks, not physical Android-device tests.
