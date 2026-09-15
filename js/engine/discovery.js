'use strict';
// Shared small investigation primitives for the three new units only.
window.MakmalDiscovery = (() => {
 const pairKinds=['match','classify','watch','evidence','routine'];
 const inspectionKinds=['watch','evidence','routine'];
 function createSession(def){
  const fresh=()=>({step:0,prediction:false,predictionChoice:null,matched:{},selected:null,viewed:[],done:[],inspected:false,observed:0,thought:false,hints:0,hintTarget:null,message:'',pose:'neutral',effect:null,saved:false,offset:2,measureIndex:0,measurements:{},ramp:null,guess:null,trials:{},tested:false,stage:0});
  let s=fresh();
  const solved=()=>def.kind==='care'?s.done.length===def.items.length:pairKinds.includes(def.kind)?Object.keys(s.matched).length===def.items.length:def.kind==='measure'?Object.keys(s.measurements).length===def.items.length:def.kind==='predictTest'?Object.keys(s.trials).length===2:s.stage===5;
  const canAdvance=()=>[s.prediction,solved(),s.observed===def.observations.length-1,s.thought,false][s.step];
  const feedback=(message,effect='correct',pose='happy')=>{s.message=message;s.effect=effect;s.pose=pose;};
  function act(action,value){
   s.effect=null;s.hintTarget=null;
   if(s.step===0&&action==='predict'&&def.choices[Number(value)]!==undefined){s.prediction=true;s.predictionChoice=Number(value);feedback('Ramalan disimpan. Kita akan mencuba dan memerhatikan hasil.','itemSelected','thinking');}
   if(s.step===1){
    if(def.kind==='care'){
     if(action==='inspect'&&def.inspectFirst&&!s.inspected){s.inspected=true;feedback('Bekas kosong dan tempat perlindungan belum tersedia.','observation','thinking');}
     if(action==='provide'&&(!def.inspectFirst||s.inspected)&&!s.done.includes(value)){
      const useful=def.items.find(x=>x.id===value),decoy=def.decoys?.find(x=>x.id===value);
      if(useful){s.done.push(value);feedback(useful.label+' sudah disediakan.', 'correct');}
      else if(decoy)feedback('Pilihan ini belum memenuhi keperluan dalam aktiviti ini.','wrong','thinking');
     }
    }
    if(pairKinds.includes(def.kind)){
     if(action==='choose'&&def.items.some(x=>x.id===value)&&!s.matched[value]){s.selected=value;feedback(inspectionKinds.includes(def.kind)?'Periksa pilihan ini sebelum memadankannya.':'Pilihan dibuat. Pilih kumpulan atau pasangan yang sesuai.','itemSelected','neutral');}
     if(action==='watch'&&s.selected&&inspectionKinds.includes(def.kind)){if(!s.viewed.includes(s.selected))s.viewed.push(s.selected);feedback(def.items.find(x=>x.id===s.selected).detail,def.kind==='watch'?'movement':'observation','neutral');}
     if(action==='assign'&&s.selected&&def.groups.some(x=>x.id===value)&&(!inspectionKinds.includes(def.kind)||s.viewed.includes(s.selected))){
      if(def.items.find(x=>x.id===s.selected).target===value){s.matched[s.selected]=value;s.selected=null;feedback('Catatan atau padanan kamu sepadan dengan bukti.',def.kind==='classify'?'classification':'correctMatch');}
      else feedback('Belum sepadan. Bandingkan ciri atau bukti yang ditunjukkan.','wrong','thinking');
     }
    }
    const measuring=def.kind==='measure'&&!solved()||def.kind==='investigate'&&s.stage===2;
    if(measuring){
     if(action==='shift'&&['left','right'].includes(value)){s.offset=Math.max(0,Math.min(2,s.offset+(value==='left'?-1:1)));feedback('Perhatikan hujung kiri objek dan tanda 0.','itemSelected','neutral');}
     if(action==='read'&&['3','4','5'].includes(value)){
      const length=def.kind==='measure'?def.items[s.measureIndex].length:3;
      if(s.offset===0&&Number(value)===length){if(def.kind==='measure'){s.measurements[def.items[s.measureIndex].id]=length;if(s.measureIndex<def.items.length-1){s.measureIndex++;s.offset=2;}}else s.stage=3;feedback('Ukuran dicatat: '+length+' cm.','measurement');}
      else feedback(s.offset!==0?'Sejajarkan hujung kiri objek dengan sifar dahulu.':'Lihat tanda di hujung kanan objek.','wrong','thinking');
     }
    }
    if(def.kind==='predictTest'){
     if(action==='ramp'&&['low','high'].includes(value)){s.ramp=value;s.guess=null;s.tested=false;feedback('Ujian baharu sedia. Buat ramalan dahulu.','itemSelected','neutral');}
     if(action==='guess'&&s.ramp&&['near','far'].includes(value)&&!s.tested){s.guess=value;feedback('Ramalan kamu direkodkan. Sekarang lepaskan bola.','itemSelected','thinking');}
     if(action==='release'&&s.ramp&&s.guess&&!s.tested){s.tested=true;s.trials[s.ramp]={guess:s.guess,result:s.ramp==='high'?'far':'near'};feedback('Hasil ujian: bola bergerak '+(s.ramp==='high'?'lebih jauh.':'lebih dekat.')+' Bandingkan dengan ramalan kamu.','observation');}
    }
    if(def.kind==='investigate'){
     if(action==='inspect'&&s.stage===0){s.stage=1;feedback('Bola kelihatan bulat dan merah.','observation','neutral');}
     if(action==='classify'&&s.stage===1&&['round','square'].includes(value)){if(value==='round'){s.stage=2;feedback('Bola dikelaskan dalam kumpulan bulat.','classification');}else feedback('Perhatikan bentuk tanpa bucu pada bola.','wrong','thinking');}
     if(action==='guess'&&s.stage===3&&['near','far'].includes(value)){s.guess=value;feedback('Ramalan dicatat. Lepaskan bola untuk mengujinya.','itemSelected');}
     if(action==='release'&&s.stage===3&&s.guess){s.stage=4;feedback('Dalam ujian ini, bola bergerak lebih jauh. Catat hasil sebenar.','observation');}
     if(action==='record'&&s.stage===4&&['near','far'].includes(value)){if(value==='far'){s.stage=5;feedback('Hasil diperhatikan dicatat. Penyiasatan lengkap!','correct');}else feedback('Lihat kedudukan akhir bola, bukan ramalan awal.','wrong','thinking');}
    }
   }
   if(action==='observe'&&s.step===2&&s.observed<def.observations.length-1){s.observed++;s.message='';}
   if(action==='think'&&s.step===3&&['correct','wrong'].includes(value)){s.thought=value==='correct';feedback(s.thought?def.discovery:'Cuba ingat hasil yang kamu perhatikan.',s.thought?'correct':'wrong',s.thought?'happy':'thinking');}
   if(action==='hint'&&s.step<4){s.hints=Math.min(3,s.hints+1);s.pose='hint';s.message=def.hints[s.hints-1];}
   if(action==='next'&&canAdvance()){s.step++;s.message='';s.selected=null;s.hints=0;s.pose=s.step===4?'success':'neutral';}
   return s;
  }
  return {get state(){return s;},act,canAdvance,solved,reset:()=>{s=fresh();return s;}};
 }
 function hint(s,d){
  let action='next',value,clue='Teruskan untuk memerhatikan hasil.';
  if(d.kind==='care'){if(d.inspectFirst&&!s.inspected){action='inspect';clue='Periksa ruang penjagaan dahulu.';}else{const x=d.items.find(x=>!s.done.includes(x.id));if(x){action='provide';value=x.id;clue='Pilih '+x.label+'.';}}}
  else if(pairKinds.includes(d.kind)){const x=d.items.find(x=>x.id===s.selected)||d.items.find(x=>!s.matched[x.id]);if(x){if(!s.selected){action='choose';value=x.id;clue='Pilih '+x.label+' dahulu.';}else if(inspectionKinds.includes(d.kind)&&!s.viewed.includes(x.id)){action='watch';clue='Periksa atau perhatikan pilihan ini dahulu.';}else{action='assign';value=x.target;clue='Bandingkan dengan '+d.groups.find(g=>g.id===x.target).label+'.';}}}
  else if(d.kind==='measure'&&Object.keys(s.measurements).length<d.items.length||d.kind==='investigate'&&s.stage===2){action=s.offset?'shift':'read';value=s.offset?'left':String(d.kind==='measure'?d.items[s.measureIndex].length:3);clue=s.offset?'Alih ke kiri sehingga hujung objek sejajar tanda 0.':'Baca tanda di hujung kanan objek.';}
  else if(d.kind==='predictTest'&&Object.keys(s.trials).length<2){if(!s.ramp||s.tested){action='ramp';value=['low','high'].find(x=>!s.trials[x]);clue='Pilih landasan yang belum diuji.';}else{action=s.guess?'release':'guess';value=s.guess?undefined:'near';clue=s.guess?'Lepaskan bola dan lihat hasil.':'Pilih mana-mana ramalan, kemudian uji.';}}
  else if(d.kind==='investigate'){const map=[['inspect',undefined,'Periksa bola dahulu.'],['classify','round','Bola berbentuk bulat.'],[],[s.guess?'release':'guess',s.guess?undefined:'near','Ramalkan dahulu, kemudian lepaskan bola.'],['record','far','Catat kedudukan akhir bola yang lebih jauh.']];if(map[s.stage])[action,value,clue]=map[s.stage];}
  return {selector:`[data-exp="${action}"]${value===undefined?'':`[data-value="${value}"]`}`,clue};
 }
 const glyphs={food:'🥬',water:'💧',air:'〰',shelter:'🏡',candy:'🍬',tree:'🌳',flower:'🌼',fruit:'🍎',hand:'✋',bell:'🔔',ice:'🧊',soap:'🧼',meal:'🍱',bed:'🛏',skip:'🌙',leaf:'🌿',walk:'🚶',hop:'↟',bend:'↷',lift:'↑',colour:'🎨'};
 function person(pose=''){
  const arms=pose==='lift'?'M52 65L25 25M68 65L95 25':pose==='bend'?'M52 65L25 88M68 65L42 91':'M52 65L28 95M68 65L91 95';
  return `<svg class="discovery-art person-art" viewBox="0 0 120 160" aria-hidden="true"><g class="person-${pose}"><path d="M54 103L40 143M66 103L83 143" stroke="#205388" stroke-width="14" stroke-linecap="round"/><path d="${arms}" stroke="#dba77e" stroke-width="12" stroke-linecap="round"/><path d="M45 57H75L78 111H42Z" fill="#52abc9" stroke="#24617d" stroke-width="3"/><circle cx="60" cy="32" r="23" fill="#e8bb91"/><path d="M37 29Q32 0 62 6Q89 7 83 30Q62 13 37 29" fill="#533d32"/><circle cx="52" cy="32" r="2.5"/><circle cx="68" cy="32" r="2.5"/><path d="M53 42q7 6 14 0" stroke="#804e42" stroke-width="2" fill="none"/></g></svg>`;
 }
 function art(id,pose=''){
  if(['rabbit','kit'].includes(id))return `<img class="discovery-art ${id==='kit'?'young-art':''}" src="assets/experiments/animals/rabbit.webp" width="120" height="120" alt="" draggable="false">`;
  if(['fish','bird','cat','kitten','hen','chick'].includes(id))return `<svg class="discovery-art ${id==='kitten'?'young-art':''}" viewBox="0 0 160 130" aria-hidden="true"><use href="assets/experiments/animals/animals.svg#${id==='kitten'?'cat':id}"/></svg>`;
  if(['eye','ear','nose','tongue','skin'].includes(id))return `<svg class="discovery-art" viewBox="0 0 120 100" aria-hidden="true"><use href="assets/experiments/humans/senses.svg#${id}"/></svg>`;
  if(id==='child')return person(pose);
  if(id.startsWith('circle')||id.startsWith('square'))return `<span class="shape-art shape-${id.startsWith('circle')?'circle':'square'} ${id.endsWith('small')?'shape-small':''}" aria-hidden="true"></span>`;
  return `<span class="discovery-glyph" aria-hidden="true">${glyphs[id]||'◈'}</span>`;
 }
 function render(s,d){
  const button=(action,value,label,extra='')=>`<button class="nav-button" data-exp="${action}" ${value===undefined?'':`data-value="${value}"`} ${extra}>${label}</button>`;
  const choices=(action,list)=>`<div class="answer-buttons">${list.map(([value,label])=>button(action,value,label)).join('')}</div>`;
  const progress=(count,total,label)=>`<p class="discovery-status">${count} / ${total} ${label}</p>`;
  function care(active){return `<div class="care-scene ${s.done.length===d.items.length?'care-complete':''}"><div class="care-hero">${art(d.hero)}<strong>${s.done.length===d.items.length?'✓ Bersedia dan selesa':d.inspectFirst&&!s.inspected?'Ruang perlu diperiksa':'Mari lengkapkan penjagaan'}</strong></div><div class="care-resources">${d.items.map(x=>`<div class="care-resource ${s.done.includes(x.id)?'provided':''}">${art(x.icon)}<span>${x.label}</span><small>${s.done.includes(x.id)?'✓ Tersedia':'○ Belum tersedia'}</small></div>`).join('')}</div></div>${active?`${d.inspectFirst?button('inspect',undefined,'Periksa ruang',s.inspected?'disabled':''):''}<div class="discovery-options">${[...d.items,...d.decoys].map(x=>button('provide',x.id,x.label,(s.done.includes(x.id)||d.inspectFirst&&!s.inspected)?'disabled':'')).join('')}</div>`:''}${progress(s.done.length,d.items.length,'keperluan lengkap')}`;}
  function pairing(active){
   const selected=d.items.find(x=>x.id===s.selected),watched=selected&&s.viewed.includes(selected.id);
   const watch=selected&&inspectionKinds.includes(d.kind)?`<div class="motion-stage ${watched?'motion-'+selected.target:''}"><div class="motion-subject">${art(selected.icon,d.humanMotion&&watched?selected.target:'')}</div><p>${watched?selected.detail:'Perhatikan pilihan ini.'}</p>${watched?'<span class="motion-trail" aria-hidden="true">● → ● → ●</span>':''}${active?button('watch',undefined,d.sensory||d.kind!=='watch'?'Periksa situasi':'Perhatikan gerakan'):''}</div>`:'';
   return `${active?`<div class="discovery-cards">${d.items.map(x=>`<button class="discovery-card" data-exp="choose" data-value="${x.id}" aria-pressed="${s.selected===x.id}" ${s.matched[x.id]?'disabled':''}>${art(x.icon)}<strong>${x.label}</strong><span>${s.matched[x.id]?'✓ Selesai':'Pilih'}</span></button>`).join('')}</div>${watch}`:''}<div class="discovery-groups">${d.groups.map(g=>`<section class="discovery-group">${active?button('assign',g.id,art(g.icon)+`<span>${g.label}</span>`,!s.selected||inspectionKinds.includes(d.kind)&&!watched?'disabled':''):`<strong>${g.label}</strong>`}<div class="group-members">${d.items.filter(x=>s.matched[x.id]===g.id).map(x=>`<span>${art(x.icon)}✓ ${x.label}</span>`).join('')}</div></section>`).join('')}</div>${progress(Object.keys(s.matched).length,d.items.length,'padanan/catatan selesai')}`;
  }
  function ruler(length,label,active){
   const ball=d.kind==='investigate',baseline=ball?118:48;
   const object=ball?`<circle cx="${20+s.offset*32+length*16}" cy="52" r="${length*16}" fill="#e66b54" stroke="#9d362d" stroke-width="2"/>`:`<rect x="${20+s.offset*32}" y="10" width="${length*32}" height="22" rx="5" fill="#e66b54"/>`;
   return `<div class="ruler-scene"><p>${label} · Ukuran pada skala gambar</p><svg viewBox="0 0 300 ${baseline+62}" role="img" aria-label="${label}, hujung kiri pada ${s.offset}, hujung kanan pada ${s.offset+length}">${object}<path d="M${20+s.offset*32} ${ball?52:10}V${baseline}M${20+(s.offset+length)*32} ${ball?52:10}V${baseline}" stroke="#765940" stroke-dasharray="3 3"/><path d="M20 ${baseline}H276" stroke="#21476a" stroke-width="3"/>${Array.from({length:9},(_,i)=>`<path d="M${20+i*32} ${baseline}v18" stroke="#21476a" stroke-width="2"/><text x="${20+i*32}" y="${baseline+38}" text-anchor="middle" fill="#17374e" font-size="16">${i}</text>`).join('')}<text x="145" y="${baseline+59}" fill="#17374e" font-size="14">cm</text></svg></div>${active?`${choices('shift',[['left','← Alih ke kiri'],['right','Alih ke kanan →']])}<p>Apakah panjang objek selepas hujung kirinya sejajar sifar?</p>${choices('read',[['3','3 cm'],['4','4 cm'],['5','5 cm']])}`:''}`;
  }
  function ramp(active,finale=false){
   const tested=finale?s.stage>=4:s.tested,high=finale||s.ramp==='high',result=high?'far':'near';
   return `<div class="ramp-scene ${tested?'tested result-'+result:''}"><svg viewBox="0 0 320 130" aria-hidden="true"><path d="M20 ${high?22:65}L110 112H306" fill="none" stroke="#b98340" stroke-width="8"/><circle class="ramp-ball" cx="${tested?(high?280:170):30}" cy="${tested?101:(high?23:65)}" r="11" fill="#e5654e"/><text x="142" y="130" font-size="14" fill="#17374e">Dekat</text><text x="260" y="130" font-size="14" fill="#17374e">Jauh</text></svg><p>${tested?'Hasil: '+(high?'lebih jauh':'lebih dekat'):'Bola sedia untuk dilepaskan'}</p></div>${active?`${!finale?choices('ramp',[['low','Landasan rendah'],['high','Landasan tinggi']]):''}${(finale?s.stage===3:s.ramp&&!tested)?`<p>Ramalan kamu: ${s.guess?(s.guess==='far'?'lebih jauh':'lebih dekat'):'belum dipilih'}</p>${choices('guess',[['near','Lebih dekat'],['far','Lebih jauh']])}${button('release',undefined,'Lepaskan bola',!s.guess?'disabled':'')}`:''}`:''}<p>Simulasi ringkas · Ramalan tidak dihukum.</p>`;
  }
  function investigation(active){
   if(!active)return `<div class="investigation-record">${art('circle')}<ul><li>✓ Pemerhatian: bulat dan merah</li><li>✓ Kumpulan: bulat</li><li>✓ Lebar gambar: 3 cm</li><li>Ramalan: ${s.guess==='far'?'lebih jauh':'lebih dekat'}</li><li>✓ Hasil ujian: lebih jauh</li></ul></div>`;
   return progress(s.stage,5,'langkah penyiasatan')+(s.stage===0?`${art('circle')}${button('inspect',undefined,'Periksa bola')}`:s.stage===1?`${art('circle')}<p>Bola bulat dan merah. Kelaskan mengikut bentuk.</p>${choices('classify',[['round','Bulat'],['square','Segi empat']])}`:s.stage===2?ruler(3,'Lebar gambar bola',true):s.stage===3?ramp(true,true):s.stage===4?`${ramp(false,true)}<p>Catat hasil yang diperhatikan.</p>${choices('record',[['near','Lebih dekat'],['far','Lebih jauh']])}`:investigation(false));
  }
  function scene(active){
   if(d.kind==='care')return care(active);
   if(pairKinds.includes(d.kind))return pairing(active);
   if(d.kind==='measure')return `${ruler(d.items[s.measureIndex].length,d.items[s.measureIndex].label,active&&Object.keys(s.measurements).length<d.items.length)}<ul class="measurement-records">${d.items.filter(x=>s.measurements[x.id]).map(x=>`<li>✓ ${x.label}: ${s.measurements[x.id]} cm</li>`).join('')}</ul>${progress(Object.keys(s.measurements).length,d.items.length,'ukuran dicatat')}`;
   if(d.kind==='predictTest')return ramp(active)+`<div class="trial-records">${Object.entries(s.trials).map(([id,t])=>`<p>Landasan ${id==='high'?'tinggi':'rendah'} · Ramalan: ${t.guess==='far'?'jauh':'dekat'} · Hasil: ${t.result==='far'?'jauh':'dekat'} ✓ Diuji</p>`).join('')}</div>${progress(Object.keys(s.trials).length,2,'landasan diuji')}`;
   return investigation(active);
  }
  if(s.step===0)return `<h2 id="activity-heading" tabindex="-1">${d.prediction}</h2><div class="discovery-intro-art">${art(d.hero||d.items?.[0]?.icon||'circle')}</div>${choices('predict',d.choices.map((x,i)=>[String(i),x]))}`;
  if(s.step===1)return `<h2 id="activity-heading" tabindex="-1">${d.title}</h2><p>${d.instruction}</p>${scene(true)}${button('restart',undefined,'Main Semula ↻')}`;
  if(s.step===2)return `<h2 id="activity-heading" tabindex="-1">Perhatikan hasil kamu</h2><p>${d.observations[s.observed]}</p>${scene(false)}${s.observed<d.observations.length-1?button('observe',undefined,'Perhati Seterusnya →'):'<p>✓ Pemerhatian selesai.</p>'}`;
  if(s.step===3)return `<h2 id="activity-heading" tabindex="-1">${d.question}</h2>${choices('think',d.answers.map((x,i)=>[i?'wrong':'correct',x]))}`;
  return '';
 }
 return {createSession,render,hint};
})();
