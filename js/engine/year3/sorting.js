'use strict';
window.MakmalYear3Domains.sorting={
 init(s){s.selected=null;s.inspected=[];s.order=[];},
 solved(s,d){return d.mode==='sequence'?s.order.length===d.items.length:Object.keys(s.matched).length===d.items.length;},
 act(s,d,a,v){const ui=window.MakmalYear3UI;
  if(d.mode==='sequence'&&a==='place'&&d.items.some(x=>x.id===v)&&!s.order.includes(v)){
   if(d.items[s.order.length]?.id===v){s.order.push(v);ui.message(s,d.items.find(x=>x.id===v).detail);}else ui.message(s,'Lihat urutan yang sudah dibina. Apakah langkah yang perlu dilakukan dahulu?',false);
  }
  if(d.mode!=='sequence'){
   if(a==='choose'&&d.items.some(x=>x.id===v)&&!s.matched[v]){s.selected=v;s.message='Periksa bukti sebelum meletakkannya.';s.effect='itemSelected';}
   if(a==='inspect'&&s.selected&&!s.inspected.includes(s.selected)){s.inspected.push(s.selected);s.message=d.items.find(x=>x.id===s.selected).detail;s.effect='observation';}
   if(a==='assign'&&s.selected&&s.inspected.includes(s.selected)&&d.groups.some(g=>g.id===v)){
    if(d.items.find(x=>x.id===s.selected).target===v){s.matched[s.selected]=v;s.selected=null;ui.message(s,'✓ Padanan disimpan berdasarkan bukti.');}else ui.message(s,'Bukti belum sepadan dengan kumpulan ini. Periksa semula.',false);
   }
  }
 },
 hint(s,d){if(this.solved(s,d))return ['next',undefined,'Teruskan untuk membandingkan hasil.'];if(d.mode==='sequence')return ['place',d.items[s.order.length].id,'Pilih '+d.items[s.order.length].label+'.'];const x=d.items.find(x=>x.id===s.selected)||d.items.find(x=>!s.matched[x.id]);return !s.selected?['choose',x.id,'Pilih '+x.label+'.']:!s.inspected.includes(x.id)?['inspect',undefined,'Periksa bukti yang ditunjukkan.']:['assign',x.target,'Letakkan pada '+d.groups.find(g=>g.id===x.target).label+'.'];},
 render(s,d,active){const ui=window.MakmalYear3UI,b=ui.button;
  if(d.mode==='sequence')return `<div class="y3-route ${d.scene||''}" aria-label="Urutan yang telah disusun">${d.items.map((x,i)=>`<div class="y3-slot ${s.order.includes(x.id)?'done':''}"><strong>${i+1}</strong>${s.order.includes(x.id)?ui.art(x.art)+`<span>${x.label}</span>`:'<span>Belum disusun</span>'}</div>`).join('')}</div><p>${s.order.length} / ${d.items.length} langkah disusun</p>${active?`<div class="y3-choices">${[...d.items].reverse().map(x=>b('place',x.id,x.label,s.order.includes(x.id))).join('')}</div>`:''}${s.order.length?`<p class="y3-evidence">${d.items[s.order.length-1].detail}</p>`:''}`;
  const x=d.items.find(x=>x.id===s.selected);
  return `${d.scene==='plate'?'<div class="y3-plate" aria-hidden="true">🥬 🍎<br>🍚 🐟</div>':''}<div class="y3-cards">${d.items.map(x=>`<button class="y3-card" data-exp="choose" data-value="${x.id}" aria-pressed="${s.selected===x.id}" ${!active||s.matched[x.id]?'disabled':''}>${ui.art(x.art)}<strong>${x.label}</strong><span>${s.matched[x.id]?'✓ '+d.groups.find(g=>g.id===s.matched[x.id]).label:'Periksa → padankan'}</span></button>`).join('')}</div>${x?`<section class="y3-evidence"><strong>${x.label}</strong>${b('inspect',undefined,'🔎 Periksa bukti',!active||s.inspected.includes(x.id))}<p>${s.inspected.includes(x.id)?x.detail:'Lihat dengan teliti dahulu.'}</p></section>`:''}${active?`<div class="y3-choices">${d.groups.map(g=>b('assign',g.id,g.label,!x||!s.inspected.includes(x.id))).join('')}</div>`:''}<p>${Object.keys(s.matched).length} / ${d.items.length} padanan berdasarkan bukti</p>`;
 }
};
