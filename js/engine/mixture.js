 'use strict';
window.MakmalMixture = (() => {
 const names=window.MakmalMixtureContent.materials;
 const solutes=['sugar','salt','sand'];
 const toolsFor=mode=>mode==='magnet'?['magnet','spoon','ruler']:mode==='sieve'?['sieve','magnet','cup']:['magnet','sieve'];
 function createSession(def){
  const fresh=()=>({step:0,prediction:false,predictions:{},matched:{},selected:null,found:[],tool:null,stage:0,added:false,results:{},observed:0,thought:false,hints:0,hintTarget:null,message:'',pose:'neutral',saved:false,effect:null});
  let s=fresh();
  const solved=()=>def.mode==='identify'?s.found.length===3:def.mode==='dissolve'?Object.keys(s.results).length===3:s.stage===(def.mode==='finale'?2:1);
  const canAdvance=()=>[s.prediction,solved(),s.observed===def.observations.length-1,s.thought,false][s.step];
  const feedback=(message,pose='happy',effect='correct')=>{s.message=message;s.pose=pose;s.effect=effect;};
  function act(action,value){
   s.effect=null;s.hintTarget=null;
   if(s.step===0&&action==='predict'){
    if(def.mode==='dissolve'){
     const [id,answer]=String(value).split(':');
     if(solutes.includes(id)&&['yes','no'].includes(answer)){s.predictions[id]=answer;s.prediction=solutes.every(k=>s.predictions[k]);feedback('Ramalan disimpan. Kita akan mengujinya bersama.','thinking','itemSelected');}
    }else if(def.choices[Number(value)]!==undefined){s.prediction=true;feedback('Terima kasih atas ramalan kamu. Mari kita uji!','thinking','itemSelected');}
   }
   if(s.step===1){
    if(action==='identify'&&def.mode==='identify'&&['beans','sand','clips'].includes(value)&&!s.found.includes(value)){s.found.push(value);feedback('Dikenal pasti: '+names[value]+'. Cari bahan yang berbeza pula.','happy','itemSelected');}
    if(action==='tool'&&['magnet','sieve','finale'].includes(def.mode)&&toolsFor(def.mode).includes(value)&&!solved()){s.tool=value;feedback('Alat dipilih. Gunakan pada campuran.','neutral','itemSelected');}
    if(action==='apply'&&['magnet','sieve','finale'].includes(def.mode)&&s.tool&&!solved()){
     const expected=def.mode==='sieve'||(def.mode==='finale'&&s.stage===1)?'sieve':'magnet';
     if(s.tool===expected){s.stage++;s.tool=null;feedback(expected==='magnet'?'Klip besi terangkat. Bahan lain masih di dalam dulang.':'Pasir melalui ayak. Kerikil tertinggal di atas ayak.','happy',expected==='magnet'?'magnetPickup':'sieveAction');}
     else feedback(def.mode==='finale'&&s.stage===0?'Ayak belum mengasingkan klip besi daripada kerikil. Cuba magnet dahulu.':'Alat ini belum mengasingkan bahan seperti yang diperlukan. Cuba alat lain.','thinking','wrong');
    }
    if(def.mode==='dissolve'){
     if(action==='material'&&solutes.includes(value)&&!Object.hasOwn(s.results,value)&&(!s.selected||Object.hasOwn(s.results,s.selected))){s.selected=value;s.added=false;feedback('Air baharu sedia untuk '+names[value]+'.','neutral','itemSelected');}
     if(action==='add'&&s.selected&&!s.added&&!Object.hasOwn(s.results,s.selected)){s.added=true;feedback('Bahan ditambah. Sekarang kacau air.','neutral','itemSelected');}
     if(action==='stir'&&s.selected&&s.added&&!Object.hasOwn(s.results,s.selected)){s.results[s.selected]=s.selected!=='sand';feedback(s.selected==='sand'?'Pasir masih kelihatan. Pasir tidak larut.':names[s.selected]+' larut dalam air.','happy','stirring');}
    }
   }
   if(action==='observe'&&s.step===2&&s.observed<def.observations.length-1){s.observed++;s.message='';s.effect='separation';}
   if(action==='think'&&s.step===3&&['correct','wrong'].includes(value)){s.thought=value==='correct';feedback(s.thought?def.discovery:'Cuba ingat hasil eksperimen kamu.',s.thought?'happy':'thinking',s.thought?'correct':'wrong');}
   if(action==='hint'&&s.step<4){s.hints++;feedback(def.hints[Math.min(s.hints-1,2)],'hint',null);if(s.hints>=2)s.hintTarget=def.mode==='identify'?(['beans','sand','clips'].find(x=>!s.found.includes(x))||'beans'):def.mode==='dissolve'?(s.selected&&!Object.hasOwn(s.results,s.selected)?(s.added?'stir':'add'):(solutes.find(x=>!Object.hasOwn(s.results,x))||'sugar')):def.mode==='sieve'||(def.mode==='finale'&&s.stage===1)?'sieve':'magnet';}
   if(action==='next'&&canAdvance()){s.step++;s.message='';s.pose=s.step===4?'success':'neutral';s.hints=0;s.hintTarget=null;}
   return s;
  }
  return {get state(){return s;},act,canAdvance,solved,reset:()=>{s=fresh();return s;}};
 }
 const art=id=>`<svg class="mixture-art" viewBox="0 0 100 100" aria-hidden="true"><use href="assets/experiments/mixtures/objects.svg#${id}"/></svg>`;
 function render(s,def){
  const button=(action,value,label,extra='')=>`<button class="nav-button ${s.hintTarget===(value||action)?'hint-target':''}" data-exp="${action}" ${value?`data-value="${value}"`:''} ${extra}>${label}</button>`;
  const original=def.mode==='identify'?['beans','sand','clips']:def.mode==='magnet'?['sand','clips']:def.mode==='sieve'?['sand','pebbles']:['sand','clips','pebbles'];
  function cards(ids,interactive=false){return ids.map(id=>interactive?`<button class="mix-material ${s.hintTarget===id?'hint-target':''}" data-exp="identify" data-value="${id}" ${s.found.includes(id)?'disabled':''}>${art(id)}<strong>${names[id]}</strong><span>${s.found.includes(id)?'✓ Dikenal pasti':'Sentuh bahan'}</span></button>`:`<div class="mix-material">${art(id)}<strong>${names[id]}</strong></div>`).join('');}
  function groups(ids){return `<div class="mix-groups" aria-label="Kumpulan bahan berasingan">${cards(ids)}</div>`;}
  function tray(interactive=false){
   const before=s.step===0||(s.step===2&&s.observed===0);
   const stage=before?0:s.stage;
   const separated=def.mode==='identify'?s.step>=2&&!before:stage===(def.mode==='finale'?2:1);
   if(def.mode==='identify')return separated?groups(original):`<div class="mix-tray"><p>Dulang campuran</p><div class="mix-materials">${cards(original,interactive)}</div></div>`;
   const remaining=stage===0?original:stage===1&&def.mode==='finale'?['sand','pebbles']:[];
   return `<div class="separation-scene ${stage?'separation-done':''}" data-stage="${stage}">${remaining.length?`<div class="mix-tray"><p>${stage?'Baki campuran':'Campuran asal'}</p><div class="mix-materials">${cards(remaining)}</div></div>`:''}${stage>0&&def.mode!=='sieve'?`<div class="magnet-result"><div>${art('magnet')}<span>Magnet</span></div><div class="lifted-clips">${art('clips')}<strong>Klip besi terangkat</strong></div></div>`:''}${separated?def.mode==='magnet'?groups(['sand']):`<div class="sieve-result"><div class="sieve-top">${art('sieve')}${art('pebbles')}<strong>Kerikil di atas ayak</strong></div><div class="falling-sand" aria-hidden="true">⋮ ⋮ ⋮</div><div class="sieve-bottom">${art('sand')}<strong>Pasir di bawah ayak</strong></div></div>`:''}</div>${interactive?`<div class="mix-tools" role="group" aria-label="Pilih alat">${toolsFor(def.mode).map(id=>button('tool',id,art(id)+({magnet:'Magnet',spoon:'Sudu',ruler:'Pembaris',sieve:'Ayak',cup:'Cawan'}[id]),`aria-pressed="${s.tool===id}" ${separated?'disabled':''}`)).join('')}</div>${button('apply','','Gunakan pada campuran',!s.tool||separated?'disabled':'')}<p class="mix-state" role="status">${stage} / ${def.mode==='finale'?2:1} langkah pengasingan selesai</p>`:''}`;
  }
  function cup(id,result,added){return `<div class="water-cup ${result===true?'dissolved':result===false?'undissolved':''}"><div class="water-fill"></div>${added?`<div class="water-grains ${result===true?'grains-gone':''}" aria-hidden="true">${id==='sand'?'• • • • •':'▪ ▪ ▪ ▪'}</div>`:''}${result!==undefined?'<div class="stir-spoon" aria-hidden="true"></div>':''}<span>Air</span></div>`;}
  function dissolution(interactive=false){
   if(!interactive)return `<div class="dissolve-results">${solutes.map(id=>`<div class="mix-test ${s.step===2&&((s.observed===0&&id!=='sand')||(s.observed===1&&id==='sand'))?'scene-focus':''}"><strong>${names[id]}</strong>${cup(id,s.results[id],true)}<span>${s.results[id]?'Larut':'Tidak larut · Butir masih kelihatan'}</span></div>`).join('')}</div>`;
   const result=s.selected?s.results[s.selected]:undefined;
   const busy=s.selected&&!Object.hasOwn(s.results,s.selected);
   return `<div class="mix-tools" role="group" aria-label="Bahan untuk diuji">${solutes.map(id=>button('material',id,art(id)+names[id]+(Object.hasOwn(s.results,id)?' ✓':''),`aria-pressed="${s.selected===id}" ${Object.hasOwn(s.results,id)||busy?'disabled':''}`)).join('')}</div><div class="dissolve-work"><p>${s.selected?names[s.selected]:'Pilih satu bahan'} · Air baharu untuk setiap ujian</p>${cup(s.selected,result,s.added)}<p class="mix-state" role="status">${result!==undefined?(result?'Bahan larut dalam air.':'Pasir masih kelihatan. Tidak larut.'):(s.added?'Bahan telah ditambah. Kacau air.':'Air sedia. Tambah bahan yang dipilih.')}</p></div><div class="answer-buttons">${button('add','','Tambah ke air',!s.selected||s.added?'disabled':'')}${button('stir','','Kacau air',!s.added||result!==undefined?'disabled':'')}</div><p>${Object.keys(s.results).length} / 3 bahan diuji</p>${Object.keys(s.results).length?`<ul class="mix-results-list">${Object.keys(s.results).map(id=>`<li>✓ ${names[id]}: ${s.results[id]?'Larut':'Tidak larut'}</li>`).join('')}</ul>`:''}`;
  }
  if(s.step===0)return `<h2 id="activity-heading" tabindex="-1">${def.prediction}</h2>${def.mode==='dissolve'?`<div class="mix-predictions">${solutes.map(id=>`<fieldset><legend>${names[id]}</legend>${art(id)}<div class="answer-buttons">${button('predict',id+':yes','Larut',`aria-label="${names[id]}: Larut" aria-pressed="${s.predictions[id]==='yes'}"`)}${button('predict',id+':no','Tidak Larut',`aria-label="${names[id]}: Tidak Larut" aria-pressed="${s.predictions[id]==='no'}"`)}</div></fieldset>`).join('')}</div>`:`${tray()}<div class="answer-buttons">${def.choices.map((c,i)=>button('predict',String(i),c)).join('')}</div>`}`;
  if(s.step===1)return `<h2 id="activity-heading" tabindex="-1">${def.title}</h2><p>${def.instruction}</p>${def.mode==='dissolve'?dissolution(true):tray(true)}${def.mode==='identify'?`<p class="mix-state">${s.found.length} / 3 bahan dikenal pasti</p>`:''}${button('restart','','MULA SEMULA')}`;
  if(s.step===2)return `<h2 id="activity-heading" tabindex="-1">Perhatikan hasil kamu</h2><p>${def.observations[s.observed]}</p>${def.mode==='dissolve'?dissolution():tray()}${s.observed<def.observations.length-1?button('observe','','PERHATI SETERUSNYA →'):'<p>✓ Pemerhatian selesai.</p>'}`;
  if(s.step===3)return `<h2 id="activity-heading" tabindex="-1">${def.question}</h2><div class="answer-buttons">${def.answers.map((a,i)=>button('think',i?'wrong':'correct',a)).join('')}</div>`;
  return `<div class="completion"><span class="completion-check" aria-hidden="true">✓</span><h2 id="activity-heading" tabindex="-1">Misi Selesai</h2><p>${def.discovery}</p>${def.mode==='finale'?`<section class="unit-finale"><h3>${window.MakmalProgress.isUnitComplete('mixtures')?'UNIT CAMPURAN SELESAI!':'Kemajuan Campuran'}</h3><ul>${Object.values(window.MakmalMixtureContent.missions).map(m=>`<li>${window.MakmalProgress.isMissionComplete(m.progressKey,'mixtures')?'✓ Selesai':'Belum selesai'} · ${m.title}</li>`).join('')}</ul></section>`:''}${def.mode==='dissolve'?dissolution():tray()}<div class="completion-actions">${button('restart','','MAIN SEMULA ↻')}${button('exit','','Kembali ke Senarai Misi')}</div></div>`;
 }
 return {createSession,render};
})();
