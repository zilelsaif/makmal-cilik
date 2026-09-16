 'use strict';
window.MakmalExperience = (() => {
 const content=id=>{const d=window.MakmalYear3?.missions[id]||window.MakmalNewContent?.missions[id]||window.MakmalPlantContent?.missions[id];return window.MakmalExperienceContent[id] || {objective:d.objective,lines:d.dialogues};};
 const label={click:'Pilihan dibuat',correct:'✓ Tepat',wrong:'Cuba cara lain',hint:'Petunjuk',step:'✓ Langkah selesai',discovery:'✓ Penemuan baharu',complete:'✓ Misi selesai',unitComplete:'✦ Unit selesai'};
 function hint(s,def){
  s.hints=Math.min(s.hints,3);s.pose='hint';s.hintTarget=null;
  if(s.step===0){s.message=['Buat ramalan dahulu. Tidak mengapa jika belum pasti.','Lihat pilihan ramalan yang diserlahkan.','Pilih ramalan kamu, kemudian uji sendiri.'][s.hints-1];return s.hints>1?'.answer-buttons,#activity-heading':null;}
  if(s.step===2){s.message=['Lihat bahagian yang sedang diperhatikan.','Bandingkan hasil dengan keadaan asal.','Baca pemerhatian, kemudian lihat bahagian seterusnya.'][s.hints-1];return s.hints>1?'#activity-heading':null;}
  if(s.step===3){s.message=['Ingat apa yang berubah semasa kamu mencuba.','Baca soalan dan bandingkan dengan hasil tadi.',def.discovery||content(def.id).discovery][s.hints-1];return s.hints>1?'#activity-heading':null;}
  let selector=null,clue=def.hints?.[2]||'Pilih satu label, kemudian sentuh alat yang sepadan.';
  if(def.year===3){const h=window.MakmalYear3Lab.hint(s,def);selector=h.selector;clue=h.clue;}else if(window.MakmalNewContent?.missions[def.id]){const h=window.MakmalDiscovery.hint(s,def);selector=h.selector;clue=h.clue;}else if(def.terminals){
   const terminal=def.terminals.find(t=>!s.links.some(i=>def.connections[i].ends.includes(t.id)));
   if(terminal){s.hintTarget=terminal.id;selector=`[data-terminal="${terminal.id}"]`;const pair=def.connections.find(c=>c.ends.includes(terminal.id));clue='Sambungkan '+pair.ends.map(id=>def.terminals.find(t=>t.id===id).name).join(' dengan ')+'.';}
   else if(def.mode==='switch'||!s.closed){s.hintTarget='switch';selector='[data-exp="toggle"]';clue=def.mode==='switch'?(s.seenClosed?'Buka suis untuk melihat mentol padam.':'Tutup suis untuk melihat mentol menyala.'):'Tutup suis supaya laluan lengkap.';}
  }else if(def.id==='electricity-1'){
   const id=s.selected||def.components.find(c=>!s.matched[c.id])?.id;
   if(id){s.hintTarget=id;selector=s.selected?`[data-target="${id}"]`:`[data-label="${id}"]`;clue='Padankan label '+def.components.find(c=>c.id===id).name+' dengan alat yang diserlahkan.';}
  }else if(def.storageUnit==='lightDark'){
   if(def.mode==='sort'){const id=window.MakmalLightContent.objects.find(o=>!s.sorted[o.id])?.id;s.hintTarget=id;selector=id?`[data-exp="pick"][data-value="${id}"]`:null;}
   if(def.mode==='room')selector=!s.power?'[data-exp="power"]':`[data-exp="region"][data-value="${['left','center','right'].find(r=>!s.visited.includes(r))||'left'}"]`;
   if(def.mode==='shadow')selector=!s.power?'[data-exp="power"]':'[data-exp="object"]';
   if(def.mode==='materials')selector=`[data-exp="material"][data-value="${['cardboard','plastic'].find(x=>!s.tried.includes(x))||'cardboard'}"]`;
   if(def.mode==='search')selector=!s.power?'[data-exp="tool"][data-value="flashlight"]':s.region!=='right'?'[data-exp="region"][data-value="right"]':s.blocked?'[data-exp="obstruction"]':!s.found?'[data-exp="find"]':'[data-exp="region"][data-value="left"]';
  }else if(def.storageUnit==='plants'){
   const [action,value]=window.MakmalPlants.hintTarget(s,def);selector=`[data-exp="${action}"]${value===undefined?'':`[data-value="${value}"]`}`;
   if(def.mode==='parts'&&s.selected)clue='Padankan '+window.MakmalPlantContent.parts[s.selected]+' pada bulatan yang diserlahkan.';
  }else if(def.storageUnit==='mixtures'){
   if(def.mode==='identify'){const id=['beans','sand','clips'].find(x=>!s.found.includes(x));selector=id?`[data-exp="identify"][data-value="${id}"]`:null;}
   else if(def.mode==='dissolve'){const busy=s.selected&&!Object.hasOwn(s.results,s.selected);selector=busy?(s.added?'[data-exp="stir"]':'[data-exp="add"]'):`[data-exp="material"][data-value="${['sugar','salt','sand'].find(x=>!Object.hasOwn(s.results,x))||'sugar'}"]`;}
   else{const tool=def.mode==='sieve'||s.stage===1&&def.mode==='finale'?'sieve':'magnet';selector=s.tool===tool?'[data-exp="apply"]':`[data-exp="tool"][data-value="${tool}"]`;}
  }
  s.message=s.hints===1?(def.hints?.[0]||'Perhatikan bentuk setiap alat.'):s.hints===2?'Perhatikan kawalan yang diserlahkan.':clue;
  if(s.hints===1){s.hintTarget=null;return null;}return selector||'[data-exp="next"]';
 }
 function completion(def,unit,celebrateUnit=false){
  if(def.year===3)return window.MakmalYear3Screens.completion(def,celebrateUnit);
  const p=window.MakmalProgress,unitId=def.unitId||'electricity',details=window.MakmalContent.getUnit(unitId),done=p.isUnitComplete(unit);
  const finale=(def.number===5||celebrateUnit);
  return `<div class="completion ${finale&&done?'unit-celebration':'mission-celebration'}"><span class="completion-check" aria-hidden="true">✓</span><h2 id="activity-heading" tabindex="-1">Misi Selesai</h2><p class="discovery-copy">${def.discovery||content(def.id).discovery}</p>${finale?`<section class="unit-finale"><h3>${done?'UNIT '+details.title.toUpperCase()+' SELESAI!':'Kemajuan '+details.title}</h3><p class="unit-count">${p.completedCount(unit)} / 5 misi selesai</p><ul>${details.missions.map(m=>`<li><span>${p.isMissionComplete('mission'+m.number,unit)?'✓ Selesai':'○ Belum selesai'}</span> ${m.title}</li>`).join('')}</ul></section>`:''}${p.isYear2Complete()?'<section class="year-progress"><strong>SAINS TAHUN 2 SELESAI!</strong><p>7 / 7 unit selesai · 35 / 35 eksperimen</p><button class="primary" data-exp="yearComplete">Raikan Penemuan Tahun 2</button></section>':''}<div class="completion-actions"><button class="primary" data-exp="restart">Main Semula ↻</button><button class="nav-button" data-exp="exit">Kembali ke Senarai Misi</button>${finale?'<button class="nav-button" data-exp="year2">Kembali ke Tahun 2</button>':''}</div></div>`;
 }
 return {content,hint,completion,label};
})();
