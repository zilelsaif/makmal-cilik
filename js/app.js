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
  const units = window.MakmalContent.year2Units;
  const menu = [['BUKU MAKMAL', '📒'], ['PENCAPAIAN', '🏅'], ['PROFIL', '🧑‍🔬'], ['TETAPAN', '⚙️']];
  const pico = window.MakmalPico.portrait;
  let disposeExperiment = null;
  const playableUnit = id => ['electricity', 'light-dark', 'mixtures', 'plants', 'animals', 'humans', 'science-skills'].includes(id);
  const storageUnit = progress.storageUnit;
  const completedCount = unit => playableUnit(unit.id) ? progress.completedCount(storageUnit(unit.id)) : 0;
  const missionStatus = mission => /^(electricity|light-dark|mixtures|plants|animals|humans|science-skills)-[1-5]$/.test(mission.id) ? (progress.isMissionComplete('mission' + mission.number, storageUnit(mission.id.replace(/-[1-5]$/, ''))) ? 'Selesai' : progress.isAvailable(mission.number, storageUnit(mission.id.replace(/-[1-5]$/, ''))) ? 'Seterusnya' : 'Akan Datang') : mission.status;
  const nav = () => '<nav class="navigation" aria-label="Navigasi makmal"><button class="nav-button" data-action="back">← Kembali</button><button class="nav-button" data-action="home">⌂ Menu Utama</button></nav>';
  const heading = (title, subtitle, kicker = '') => `<div class="screen-heading">${kicker ? `<p class="section-kicker">${kicker}</p>` : ''}<h1>${title}</h1>${subtitle ? `<p class="subtext">${subtitle}</p>` : ''}</div>`;
  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.hidden = false;
    toastTimer = setTimeout(() => { toast.hidden = true; }, 4500);
  }
  function render(name, context) {
    disposeExperiment?.(); disposeExperiment = null;
    clearTimeout(toastTimer); toast.hidden = true;
    if (name === 'experiment' || name === 'year3Experiment' || name === 'year4Experiment' || name === 'year5Experiment' || name === 'year6Experiment' || name === 'year1Experiment') {
      screen.innerHTML = `<div class="content-screen experiment-screen">${nav()}<div id="experiment-root"></div></div>`;
      disposeExperiment = window.MakmalExperiment.mount(document.getElementById('experiment-root'), { missionId: context.missionId, onExit: () => router.navigate(name==='year1Experiment'?'year1Unit':name==='year6Experiment'?'year6Unit':name==='year5Experiment'?'year5Unit':name==='year4Experiment'?'year4Unit':name==='year3Experiment'?'year3Unit':'unitDetail', { unitId: context.unitId }) });
      return;
    }
    if (name.startsWith('year3')) { screen.innerHTML=`<div class="content-screen">${nav()}${window.MakmalYear3Screens.render(name,context)}</div>`; return; }
    if (name.startsWith('year4')) { screen.innerHTML=`<div class="content-screen">${nav()}${window.MakmalYear4Screens.render(name,context)}</div>`; return; }
    if (name.startsWith('year5')) { screen.innerHTML=`<div class="content-screen">${nav()}${window.MakmalYear5Screens.render(name,context)}</div>`; return; }
    if (name.startsWith('year1')) { screen.innerHTML=`<div class="content-screen year1-screen">${nav()}${window.MakmalYear1Screens.render(name,context)}</div>`; return; }
    if (name.startsWith('year6')) { screen.innerHTML=`<div class="content-screen">${nav()}${window.MakmalYear6Screens.render(name,context)}</div>`; return; }
    if (name === 'title') {
      screen.innerHTML = `<section class="title-screen"><div class="title-copy"><div class="eyebrow">✦ Makmal kecil, penemuan besar</div><h1>Makmal <span>Cilik</span></h1><p class="tagline">Eksperimen. Fikir. Temui.</p><button class="primary" data-route="mainMenu">MASUK MAKMAL <span aria-hidden="true">→</span></button><p class="curriculum">KSSR / DSKP · Sains Tahun 1–6</p></div><div class="lab-card"><div class="lab-label"><span>Pembantu makmal</span><span aria-hidden="true">✦ ✦ ✦</span></div>${pico()}<p class="pico-note">Hai, Saintis!<br>Jom teroka dunia Sains bersama saya.</p><div class="lab-symbols" aria-hidden="true">⚗️ <span>✦</span> 🌱 <span>✦</span> 🔬</div></div></section>`;
      return;
    }
    let content = '';
    if (name === 'mainMenu') content = `${heading('Hai, Saintis!', 'Apa yang ingin kamu terokai hari ini?')}<div class="main-layout"><aside class="welcome">${pico()}<p>Selamat datang ke Makmal Cilik! Mari kita teroka dunia Sains.</p></aside><div class="menu-grid"><button class="primary menu-start" data-route="yearSelect">MULA BELAJAR <span aria-hidden="true">→</span></button>${menu.map(([label, icon], index) => `<button class="menu-card" data-placeholder="${index}"><span class="card-icon" aria-hidden="true">${icon}</span><span>${label}</span><small>Akan Datang</small></button>`).join('')}</div></div>`;
    if (name === 'yearSelect') content = `${heading('PILIH TAHUN', 'Mulakan perjalanan Sains kamu.', 'MULA BELAJAR')}<div class="year-grid">${[1,2,3,4,5,6].map(year => `<button class="year-card ${[1,2,3,4,5,6].includes(year) ? 'active' : ''}" ${[1,2,3,4,5,6].includes(year) ? `data-route="year${year}"` : 'data-message="Kandungan Tahun ini akan datang."'}><span class="year-number" aria-hidden="true">0${year}</span><span class="year-arrow" aria-hidden="true">${[1,2,3,4,5,6].includes(year) ? '↗' : '🔒'}</span><strong>TAHUN ${year}</strong><span class="badge">${[1,2,3,4,5,6].includes(year) ? 'Aktif' : 'Akan Datang'}</span></button>`).join('')}</div>`;
    if (name === 'year2') content = `${heading('Sains Tahun 2', 'Pilih unit untuk meneroka lima eksperimen.', 'MAKMAL PEMBELAJARAN')}<div class="year-progress"><span>${progress.year2CompletedCount()} / 35 eksperimen selesai · ${progress.year2CompletedUnits()} / 7 unit selesai</span>${progress.isYear2Complete()?'<button class="primary" data-route="year2Complete">Lihat Sambutan Tahun 2</button>':''}</div><div class="units-grid hub-grid">${units.map((unit, index) => `<button class="unit-card hub-card unit-${unit.id}" data-unit="${unit.id}"><img class="unit-art" src="${unit.icon}" alt="" width="88" height="88"><span class="unit-copy"><small>UNIT ${String(index + 1).padStart(2, '0')}</small><strong>${unit.title}</strong><span class="unit-description">${unit.description}</span></span><span class="unit-summary"><span>${completedCount(unit)} / ${unit.totalMissions} eksperimen</span><span class="badge">${completedCount(unit) === 5 ? 'Selesai' : completedCount(unit) ? 'Sedang Diterokai' : 'Belum Dimainkan'}</span></span></button>`).join('')}</div>`;
    if (name === 'year2Complete') content = window.MakmalYearCompletion.render();
    if (name === 'unitDetail' || name === 'missionPlaceholder') {
      const unit = window.MakmalContent.getUnit(context.unitId);
      if (name === 'unitDetail') content = `${heading(unit.title, '5 eksperimen untuk diterokai', 'SAINS TAHUN 2')}<div class="unit-intro"><img class="unit-art" src="${unit.icon}" alt="" width="88" height="88"><div><p>${unit.description}</p><span class="badge">${completedCount(unit)} / 5 eksperimen</span></div></div><div class="mission-list">${unit.missions.map(mission => `<button class="mission-card ${['Seterusnya', 'Selesai'].includes(missionStatus(mission)) ? 'mission-next' : ''}" aria-disabled="${playableUnit(unit.id) && !progress.isAvailable(mission.number, storageUnit(mission.id.replace(/-[1-5]$/, '')))}" data-unit-id="${unit.id}" data-mission="${mission.id}"><span class="mission-number" aria-hidden="true">${mission.number}</span><span class="mission-copy"><small>MISI ${mission.number}</small><strong>${mission.title}</strong><span>${mission.description}</span></span><span class="badge">${missionStatus(mission)}</span></button>`).join('')}</div>`;
      else {
        const mission = unit.missions.find(item => item.id === context.missionId);
        content = `<section class="placeholder-panel mission-placeholder"><p class="section-kicker">${unit.title} · MISI ${mission.number}</p><h1>${mission.title}</h1><span class="badge">Akan Datang</span><p class="subtext">Eksperimen ini akan dibina dalam milestone seterusnya.</p><button class="primary" data-action="back">KEMBALI KE UNIT <span aria-hidden="true">←</span></button></section>`;
      }
    }
    if (name === 'placeholder') {
      const selected = menu[context.index] || menu[0];
      content = `<section class="placeholder-panel"><span class="card-icon" aria-hidden="true">${selected[1]}</span><p class="section-kicker">${selected[0]}</p><h1>Akan Datang</h1><p class="subtext">Ruang ini sedang disediakan.<br>Teruskan meneroka makmal bersama PICO!</p><button class="primary" data-action="home">KEMBALI KE MENU <span aria-hidden="true">→</span></button></section>`;
    }
    screen.innerHTML = `<div class="content-screen">${nav()}${content}</div>`;
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || event.composedPath().some(node => node.id === 'experiment-root')) return;
    window.MakmalRewards.play('click');
    if (button.dataset.y3unit) router.navigate('year3Unit',{unitId:button.dataset.y3unit});
    if (button.dataset.y4unit) router.navigate('year4Unit',{unitId:button.dataset.y4unit});
    if (button.dataset.y5unit) router.navigate('year5Unit',{unitId:button.dataset.y5unit});
    if (button.dataset.y1unit) router.navigate('year1Unit',{unitId:button.dataset.y1unit});
    if (button.dataset.y6unit) router.navigate('year6Unit',{unitId:button.dataset.y6unit});
    if (button.dataset.y3mission) {
      const unitId=button.dataset.y3id, missionId=button.dataset.y3mission;
      if(!progress.forYear(3).isAvailable(Number(missionId.split('-').pop()),unitId)){showToast('Selesaikan misi sebelumnya dahulu.');return;}
      router.navigate('year3Experiment',{unitId,missionId});
    }
    if (button.dataset.y4mission) {
      const unitId=button.dataset.y4id, missionId=button.dataset.y4mission;
      if(!progress.forYear(4).isAvailable(Number(missionId.split('-').pop()),unitId)){showToast('Selesaikan misi sebelumnya dahulu.');return;}
      router.navigate('year4Experiment',{unitId,missionId});
    }
    if (button.dataset.y5mission) {
      const unitId=button.dataset.y5id, missionId=button.dataset.y5mission;
      if(!progress.forYear(5).isAvailable(Number(missionId.split('-').pop()),unitId)){showToast('Selesaikan misi sebelumnya dahulu.');return;}
      router.navigate('year5Experiment',{unitId,missionId});
    }
    if (button.dataset.y1mission) {
      const unitId=button.dataset.y1id, missionId=button.dataset.y1mission;
      if(!progress.forYear(1).isAvailable(Number(missionId.split('-').pop()),unitId)){showToast('Selesaikan misi sebelumnya dahulu.');return;}
      router.navigate('year1Experiment',{unitId,missionId});
    }
    if (button.dataset.y6mission) {
      const unitId=button.dataset.y6id, missionId=button.dataset.y6mission;
      if(!progress.forYear(6).isAvailable(Number(missionId.split('-').pop()),unitId)){showToast('Selesaikan misi sebelumnya dahulu.');return;}
      router.navigate('year6Experiment',{unitId,missionId});
    }
    if (button.dataset.unit) router.navigate('unitDetail', { unitId: button.dataset.unit });
    if (button.dataset.mission) {
      const playable = playableUnit(button.dataset.unitId);
      const number = Number(button.dataset.mission.split('-').pop());
      if (playable && !progress.isAvailable(number, storageUnit(button.dataset.unitId))) { showToast('Selesaikan misi sebelumnya dahulu. Misi yang selesai boleh dimainkan semula.'); return; }
      router.navigate(playable ? 'experiment' : 'missionPlaceholder', { unitId: button.dataset.unitId, missionId: button.dataset.mission });
    }
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
    updateSound();
    if (!data.settings.sound) window.MakmalRewards.stop();
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
  // Capturing error handler also covers dynamically rendered mission artwork.
  document.addEventListener('error', event => {
    const img = event.target;
    if (!(img instanceof HTMLImageElement)) return;
    const fallback = document.createElement('span');
    fallback.className = img.classList.contains('pico-image') ? 'pico-emoji' : 'asset-fallback';
    fallback.setAttribute('role', 'img');
    fallback.setAttribute('aria-label', img.alt || 'Illustrasi tidak tersedia');
    fallback.textContent = img.classList.contains('pico-image') ? '🤖' : img.dataset.fallback || '◈';
    img.replaceWith(fallback);
  }, true);
  updateSound(); updateFullscreen(); router.init(render);
})();
