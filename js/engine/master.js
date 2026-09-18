'use strict';
window.MakmalMaster = (() => {
  const p = () => window.MakmalProgress;
  const rows = () => p().allYearsSummary().map(item => `<li><span><strong>Tahun ${item.year}</strong><small>${item.units} / ${item.unitTotal} unit</small></span><span>${item.completed} / ${item.total} eksperimen</span></li>`).join('');
  function progressView() {
    const progress=p(), complete=progress.allYearsComplete();
    return `<section class="master-progress" aria-labelledby="master-progress-heading"><div><p class="section-kicker">KEMAJUAN KESELURUHAN</p><h2 id="master-progress-heading">Sains Tahun 1–6</h2><p>${progress.allYearsCompletedTotal()} / 290 eksperimen · ${progress.allYearsCompletedUnits()} / 58 unit</p></div><ul>${rows()}</ul>${complete?'<button class="primary" data-route="masterComplete">Lihat Sambutan Makmal Cilik</button>':''}</section>`;
  }
  function completion() {
    const progress=p();
    return `<section class="master-finale unit-celebration" aria-labelledby="master-finale-heading"><p class="section-kicker">PENEMUAN TERBESAR</p><h1 id="master-finale-heading">MAKMAL CILIK SELESAI!</h1>${window.MakmalPico.dialogue('Hebat, Saintis! Semua penyiasatan Tahun 1 hingga Tahun 6 sudah lengkap.','success')}<p>Kamu telah melengkapkan semua eksperimen Sains Tahun 1 hingga Tahun 6.</p><div class="master-totals" aria-label="Jumlah kemajuan lengkap"><strong>6 / 6 <small>tahun</small></strong><strong>58 / 58 <small>unit</small></strong><strong>290 / 290 <small>eksperimen</small></strong></div><ul class="master-year-list">${rows()}</ul><div class="completion-actions"><button class="primary" data-route="yearSelect">Pilih Tahun</button><button class="nav-button" data-route="yearSelect">Main Semula</button><button class="nav-button" data-action="home">Menu Utama</button></div></section>`;
  }
  const completionButton=()=>p().allYearsComplete()?'<button class="primary" data-route="masterComplete">Raikan Semua Tahun</button>':'';
  return {progressView,completion,completionButton};
})();
