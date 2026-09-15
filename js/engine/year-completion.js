'use strict';
window.MakmalYearCompletion = {
 render(){
  const p=window.MakmalProgress;
  return `<section class="year-finale unit-celebration" aria-labelledby="year-finale-heading"><p class="section-kicker">PENEMUAN SAINTIS CILIK</p><h1 id="year-finale-heading">SAINS TAHUN 2 SELESAI!</h1>${window.MakmalPico.dialogue('Hebat! Kamu telah menyelesaikan semua eksperimen Sains Tahun 2.','success')}<p class="unit-count">${p.year2CompletedUnits()} / 7 unit selesai</p><p class="unit-count">${p.year2CompletedCount()} / 35 eksperimen</p><ul class="year-unit-list">${window.MakmalContent.year2Units.map(u=>`<li>✓ ${u.title}</li>`).join('')}</ul><div class="completion-actions"><button class="primary" data-route="year2">Kembali ke Tahun 2</button><button class="nav-button" data-route="year2">Main Semula Mana-mana Unit</button><button class="nav-button" data-action="home">Menu Utama</button></div></section>`;
 }
};
