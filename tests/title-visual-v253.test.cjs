'use strict';
const fs=require('node:fs'),assert=require('node:assert/strict');
const read=file=>fs.readFileSync(file,'utf8');
const app=read('js/app.js'),css=read('css/release-polish.css'),index=read('index.html');
const desktop='assets/title/makmal-cilik-hero-lab.webp',mobile='assets/title/makmal-cilik-hero-lab-mobile.webp';
assert(app.includes('<picture class="title-picture">'));
assert(app.includes(`src="${desktop}?v=2.6.0"`));
assert(app.includes(`srcset="${mobile}?v=2.6.0"`));
assert(app.includes('width="1599" height="900" fetchpriority="high"'));
assert(app.includes('alt="PICO menyambut saintis cilik di makmal"'));
assert(app.includes('Eksperimen. Fikir. Temui.'));
assert(app.includes('MASUK MAKMAL'));
assert.equal((app.match(/title-picture/g)||[]).length,1,'one title hero only');
for(const file of [desktop,mobile]){assert(fs.existsSync(file),file);const size=fs.statSync(file).size;assert(size>30000,`${file} unexpectedly small`);assert(size<220000,`${file} should be optimized`);}
for(const token of ['.title-art','.title-picture','.title-welcome','.title-cta','object-fit:cover','@media(max-height:550px)'])assert(css.includes(token),token);
for(const token of ['.title-copy h1 .title-makmal{color:#0874da','.title-copy h1 .title-cilik{color:#ffd539','body:has(.title-screen) .utility:hover','.title-screen::after{content:none}'])assert(css.includes(token),token);
assert(index.includes('<meta name="app-version" content="2.6.0">'));
assert(!/title-screen[^\n]*(XP|Bintang|Ganjaran)/i.test(app));
console.log('PASS v2.6.0 responsive title hero, local WebP delivery, HTML branding, accessible CTA and release markers.');
