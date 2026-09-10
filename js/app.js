'use strict';
(() => {
  const progress = window.MakmalProgress;
  const router = window.MakmalRouter;
  let data = progress.loadData();
  progress.saveData(data);
  const screen = document.getElementById('screen');
  const sound = document.getElementById('sound');
  const fullscreen = document.getElementById('fullscreen');
  const toast = document.getElementById('toast');
  let toastTimer;
  const units = ['Kemahiran Saintifik', 'Manusia', 'Haiwan', 'Tumbuhan', 'Terang & Gelap', 'Elektrik', 'Campuran'];
  const unitIcons = ['🔎', '🧑', '🐾', '🌱', '🔦', '⚡', '🧪'];
  const menu = [['BUKU MAKMAL', '📒'], ['PENCAPAIAN', '🏅'], ['PROFIL', '🧑‍🔬'], ['TETAPAN', '⚙️']];
  // Replace .pico-emoji with <img src="assets/mascot/pico.webp" alt="PICO, pembantu makmal"> when the approved asset is ready.
  const pico = () => '<div class="pico"><span class="pico-emoji" role="img" aria-label="PICO, robot pembantu makmal">🤖</span><span class="pico-name">PICO</span></div>';
  const nav = () => '<nav class="navigation" aria-label="Navigasi makmal"><button class="nav-button" data-action="back">← Kembali</button><button class="nav-button" data-action="home">⌂ Menu Utama</button></nav>';
  const heading = (title, subtitle, kicker = '') => `<div class="screen-heading">${kicker ? `<p class="section-kicker">${kicker}</p>` : ''}<h1>${title}</h1>${subtitle ? `<p class="subtext">${subtitle}</p>` : ''}</div>`;
  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = setTimeout(() => { toast.hidden = true; }, 4500);
  }
  function render(name, context) {
    clearTimeout(toastTimer); toast.hidden = true;
    if (name === 'title') {
      screen.innerHTML = `<section class="title-screen"><div class="title-copy"><div class="eyebrow">✦ Makmal kecil, penemuan besar</div><h1>Makmal <span>Cilik</span></h1><p class="tagline">Eksperimen. Fikir. Temui.</p><button class="primary" data-route="mainMenu">MASUK MAKMAL <span aria-hidden="true">→</span></button><p class="curriculum">KSSR / DSKP · Sains Tahun 1–6</p></div><div class="lab-card"><div class="lab-label"><span>Pembantu makmal</span><span aria-hidden="true">✦ ✦ ✦</span></div>${pico()}<p class="pico-note">Hai, Saintis!<br>Jom teroka dunia Sains bersama saya.</p><div class="lab-symbols" aria-hidden="true">⚗️ <span>✦</span> 🌱 <span>✦</span> 🔬</div></div></section>`;
      return;
    }
    let content = '';
    if (name === 'mainMenu') content = `${heading('Hai, Saintis!', 'Apa yang ingin kamu terokai hari ini?')}<div class="main-layout"><aside class="welcome">${pico()}<p>Selamat datang ke Makmal Cilik! Mari kita teroka dunia Sains.</p></aside><div class="menu-grid"><button class="primary menu-start" data-route="yearSelect">MULA BELAJAR <span aria-hidden="true">→</span></button>${menu.map(([label, icon], index) => `<button class="menu-card" data-placeholder="${index}"><span class="card-icon" aria-hidden="true">${icon}</span><span>${label}</span><small>Akan Datang</small></button>`).join('')}</div></div>`;
    if (name === 'yearSelect') content = `${heading('PILIH TAHUN', 'Mulakan perjalanan Sains kamu.', 'MULA BELAJAR')}<div class="year-grid">${[1,2,3,4,5,6].map(year => `<button class="year-card ${year === 2 ? 'active' : ''}" ${year === 2 ? 'data-route="year2"' : 'data-message="Kandungan Tahun ini akan datang."'}><span class="year-number" aria-hidden="true">0${year}</span><span class="year-arrow" aria-hidden="true">${year === 2 ? '↗' : '🔒'}</span><strong>TAHUN ${year}</strong><span class="badge">${year === 2 ? 'Aktif' : 'Akan Datang'}</span></button>`).join('')}</div>`;
    if (name === 'year2') content = `${heading('Sains Tahun 2', 'Pilih unit untuk memulakan eksperimen.', 'MAKMAL PEMBELAJARAN')}<div class="units-grid">${units.map((unit, index) => `<button class="unit-card" data-message="Eksperimen unit ini sedang disediakan."><span class="card-icon" aria-hidden="true">${unitIcons[index]}</span><span><small>UNIT ${String(index + 1).padStart(2, '0')}</small><strong>${unit}</strong><small>Akan Datang</small></span></button>`).join('')}</div>`;
    if (name === 'placeholder') {
      const selected = menu[context.index] || menu[0];
      content = `<section class="placeholder-panel"><span class="card-icon" aria-hidden="true">${selected[1]}</span><p class="section-kicker">${selected[0]}</p><h1>Akan Datang</h1><p class="subtext">Ruang ini sedang disediakan.<br>Teruskan meneroka makmal bersama PICO!</p><button class="primary" data-action="home">KEMBALI KE MENU <span aria-hidden="true">→</span></button></section>`;
    }
    screen.innerHTML = `<div class="content-screen">${nav()}${content}</div>`;
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.route) router.navigate(button.dataset.route);
    if (button.dataset.action === 'back') router.back();
    if (button.dataset.action === 'home') router.home();
    if (button.dataset.placeholder !== undefined) router.navigate('placeholder', { index: Number(button.dataset.placeholder) });
    if (button.dataset.message) showToast(button.dataset.message);
  });
  function updateSound() {
    sound.setAttribute('aria-pressed', String(data.settings.sound));
    sound.textContent = data.settings.sound ? 'Bunyi: Hidup' : 'Bunyi: Mati';
    sound.setAttribute('aria-label', data.settings.sound ? 'Bunyi hidup. Matikan bunyi' : 'Bunyi mati. Hidupkan bunyi');
  }
  sound.addEventListener('click', () => {
    data = progress.updateSetting('sound', !data.settings.sound);
    updateSound(); // Future audio playback should read data.settings.sound.
  });
  function updateFullscreen() {
    const active = Boolean(document.fullscreenElement);
    fullscreen.setAttribute('aria-pressed', String(active));
    fullscreen.setAttribute('aria-label', active ? 'Keluar skrin penuh' : 'Masuk skrin penuh');
    fullscreen.innerHTML = `<span aria-hidden="true">${active ? '⊡' : '⛶'}</span><span class="fullscreen-label"> ${active ? 'Keluar skrin penuh' : 'Skrin penuh'}</span>`;
  }
  fullscreen.addEventListener('click', async () => {
    try {
      if (document.fullscreenElement && document.exitFullscreen) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else showToast('Skrin penuh tidak disokong pada pelayar ini.');
    } catch (_) { showToast('Skrin penuh tidak tersedia sekarang.'); }
    updateFullscreen();
  });
  document.addEventListener('fullscreenchange', updateFullscreen);
  document.getElementById('version').textContent = `v${progress.APP_VERSION} by Zil-el-Saif`;
  updateSound(); updateFullscreen(); router.init(render);
})();
