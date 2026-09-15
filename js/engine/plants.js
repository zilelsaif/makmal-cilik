'use strict';
window.MakmalPlants = (() => {
 const {parts,needs}=window.MakmalPlantContent;
 const partIds=Object.keys(parts),needIds=Object.keys(needs);
 function createSession(def){
  const fresh=()=>({step:0,prediction:false,predictions:[],matched:{},selected:null,provided:[],watered:null,elapsed:false,side:null,tried:[],grown:false,inspected:false,water:false,sun:false,observed:0,thought:false,hints:0,hintTarget:null,message:'',pose:'neutral',effect:null,saved:false});
  let s=fresh();
  const solved=()=>def.mode==='needs'?s.provided.length===3:def.mode==='water'?s.elapsed:def.mode==='parts'?Object.keys(s.matched).length===4:def.mode==='direction'?s.tried.length===2:s.inspected&&s.water&&s.sun;
  const canAdvance=()=>[s.prediction,solved(),s.observed===def.observations.length-1,s.thought,false][s.step];
  const feedback=(message,effect='correct',pose='happy')=>{s.message=message;s.effect=effect;s.pose=pose;};
  function act(action,value){
   s.effect=null;s.hintTarget=null;
   if(s.step===0&&action==='predict'&&def.choices[Number(value)]!==undefined){
    if(def.mode==='needs'){s.predictions=s.predictions.includes(value)?s.predictions.filter(x=>x!==value):[...s.predictions,value];s.prediction=s.predictions.length>0;}else s.prediction=true;
    feedback('Ramalan disimpan. Mari kita uji.','itemSelected','thinking');
   }
   if(s.step===1){
    if(def.mode==='needs'&&action==='need'&&needIds.includes(value)&&!s.provided.includes(value)){
     if(['water','sun','air'].includes(value)){s.provided.push(value);feedback({water:'Tanah kini lembap.',sun:'Cahaya matahari tersedia.',air:'Udara tersedia di sekeliling daun.'}[value],value==='water'?'watering':'correct');}
     else feedback('Itu bukan keperluan asas yang kita uji. Cuba pilihan lain.','wrong','thinking');
    }
    if(def.mode==='water'){
     if(action==='water'&&['A','B'].includes(value)&&s.watered===null){s.watered=value;feedback('Pokok '+value+' disiram. Sekarang lihat perubahan selepas beberapa hari.','watering');}
     if(action==='wait'&&s.watered&&!s.elapsed){s.elapsed=true;feedback('Beberapa hari berlalu. Bandingkan kedua-dua pokok.','plantGrowth');}
    }
    if(def.mode==='parts'){
     if(action==='part'&&partIds.includes(value)&&!s.matched[value]){s.selected=value;feedback('Label '+parts[value]+' dipilih. Sentuh nombor pada rajah.','itemSelected','neutral');}
     if(action==='target'&&partIds.includes(value)&&!s.matched[value]){
      if(s.selected===value){s.matched[value]=true;s.selected=null;feedback('Sepadan! Ini '+parts[value].toLowerCase()+'.','correctMatch');}
      else feedback(s.selected?'Belum sepadan. Perhatikan kedudukan bahagian ini.':'Pilih satu label dahulu.','wrong','thinking');
     }
    }
    if(def.mode==='direction'){
     if(action==='side'&&['left','right'].includes(value)){s.side=value;s.grown=false;feedback('Pokok baharu, cahaya di '+(value==='left'?'kiri':'kanan')+'.','itemSelected','neutral');}
     if(action==='grow'&&s.side&&!s.grown){s.grown=true;if(!s.tried.includes(s.side))s.tried.push(s.side);feedback('Selepas beberapa hari, pokok tumbuh ke arah cahaya.','plantGrowth');}
    }
    if(def.mode==='rescue'){
     if(action==='inspect'&&!s.inspected){s.inspected=true;feedback('Tanah kering. Pokok juga kurang cahaya.','itemSelected','thinking');}
     if(action==='water'&&s.inspected&&!s.water){s.water=true;feedback('Tanah sudah lembap.','watering');}
     if(action==='sun'&&s.inspected&&!s.sun){s.sun=true;feedback('Pokok dipindahkan ke tempat bercahaya.');}
     if(solved()&&s.effect)feedback('Selepas beberapa hari dijaga, pokok kembali segar!','recovery');
    }
   }
   if(action==='observe'&&s.step===2&&s.observed<def.observations.length-1){s.observed++;s.message='';}
   if(action==='think'&&s.step===3&&['correct','wrong'].includes(value)){s.thought=value==='correct';feedback(s.thought?def.discovery:'Ingat perubahan yang kamu lihat tadi.',s.thought?'correct':'wrong',s.thought?'happy':'thinking');}
   if(action==='hint'&&s.step<4){s.hints=Math.min(s.hints+1,3);s.message=def.hints[s.hints-1];s.pose='hint';}
   if(action==='next'&&canAdvance()){s.step++;s.message='';s.pose=s.step===4?'success':'neutral';s.hints=0;s.selected=null;}
   return s;
  }
  return {get state(){return s;},act,canAdvance,solved,reset:()=>{s=fresh();return s;}};
 }
 function hintTarget(s,def){
  if((def.mode==='needs'&&s.provided.length===3)||(def.mode==='water'&&s.elapsed)||(def.mode==='parts'&&Object.keys(s.matched).length===4)||(def.mode==='direction'&&s.tried.length===2)||(def.mode==='rescue'&&s.inspected&&s.water&&s.sun))return ['next'];
  if(def.mode==='needs')return ['need',['water','sun','air'].find(id=>!s.provided.includes(id))];
  if(def.mode==='water')return s.watered?['wait']:['water','A'];
  if(def.mode==='parts')return s.selected?['target',s.selected]:['part',partIds.find(id=>!s.matched[id])];
  if(def.mode==='direction')return s.side&&!s.grown?['grow']:['side',['left','right'].find(id=>!s.tried.includes(id))];
  return !s.inspected?['inspect']:!s.water?['water']:['sun'];
 }
 const art=(id,cls='')=>`<svg class="plant-icon ${cls}" viewBox="0 0 80 80" aria-hidden="true"><use href="assets/experiments/plants/garden.svg#${id}"/></svg>`;
 function specimen({wilt=false,moist=false,sun=false,air=false,lean='',roots=false,focus='',targets='',caption='' }={}){
  return `<figure class="plant-specimen ${wilt?'plant-wilted':''} ${moist?'plant-moist':''} ${sun?'plant-sunny':''} ${air?'plant-air':''}">${sun?art('sun','plant-sun '+(lean==='left'?'sun-left':'')):''}<div class="plant-diagram"><svg viewBox="0 0 240 280" role="img" aria-label="${wilt?'Pokok layu':'Pokok segar'}${moist?', tanah lembap':', tanah kering'}${lean?', tumbuh ke '+(lean==='left'?'kiri':'kanan'):''}"><use href="assets/experiments/plants/garden.svg#pot"/>${moist?'<ellipse cx="120" cy="218" rx="54" ry="10" fill="#44352b"/>':''}<g class="plant-shoot ${lean?'lean-'+lean:''}"><use href="assets/experiments/plants/garden.svg#shoot"/></g>${roots?'<use href="assets/experiments/plants/garden.svg#roots"/>':''}</svg>${targets}${focus?`<span class="plant-part-ring part-${focus}" aria-hidden="true"></span>`:''}</div>${caption?`<figcaption>${caption}</figcaption>`:''}${air?'<span class="plant-air-note">✓ Udara tersedia</span>':''}</figure>`;
 }
 function render(s,def){
  const button=(action,value,label,extra='')=>`<button class="nav-button" data-exp="${action}" ${value!==undefined?`data-value="${value}"`:''} ${extra}>${label}</button>`;
  const isSolved=def.mode==='rescue'&&s.water&&s.sun;
  function scene(interactive=false){
   if(def.mode==='needs')return specimen({moist:s.provided.includes('water'),sun:s.provided.includes('sun'),air:s.provided.includes('air'),caption:'Anak pokok'})+(interactive?`<div class="plant-choices">${needIds.map(id=>button('need',id,(id==='water'||id==='sun'?art(id):'')+needs[id]+(s.provided.includes(id)?' ✓':''),s.provided.includes(id)?'disabled':'')).join('')}</div>`:'')+`<p class="plant-state">${s.provided.length} / 3 keperluan tersedia${s.provided.length?' · '+s.provided.map(id=>'✓ '+needs[id]).join(', '):''}</p>`;
   if(def.mode==='water')return `<div class="plant-pair">${['A','B'].map(id=>`<section>${specimen({wilt:s.elapsed&&s.watered!==id,moist:s.watered===id,sun:true,caption:'Pokok '+id+' · '+(s.watered===id?'Disiram':s.elapsed?'Tanpa air · Layu':'Belum disiram')})}${interactive?button('water',id,'Siram Pokok '+id,s.watered?'disabled':''):''}</section>`).join('')}</div><p class="plant-state">${s.elapsed?'Selepas beberapa hari':s.watered?'Satu pokok disiram. Bandingkan selepas masa berlalu.':'Sebelum ujian · Kedua-duanya mendapat cahaya dan udara.'}</p>${interactive?button('wait',undefined,'Lihat selepas beberapa hari',!s.watered||s.elapsed?'disabled':''):''}`;
   if(def.mode==='parts'){
    const targets=interactive?partIds.map((id,i)=>`<button class="plant-target part-${id} ${s.matched[id]?'matched':''}" data-exp="target" data-value="${id}" aria-label="Sasaran ${i+1}: ${['bahagian di dalam tanah','bahagian tegak di tengah','bahagian hijau lebar','bahagian kuning di atas'][i]}" ${s.matched[id]?'disabled':''}>${s.matched[id]?'✓':i+1}</button>`).join(''):'';
    return `<div class="plant-matching">${interactive?`<div class="plant-labels" role="group" aria-label="Label bahagian tumbuhan">${partIds.map(id=>button('part',id,parts[id]+(s.matched[id]?' ✓':''),`aria-pressed="${s.selected===id}" ${s.matched[id]?'disabled':''}`)).join('')}</div>`:''}${specimen({roots:true,targets,focus:s.step===2?partIds[s.observed]:'',caption:s.step===2?parts[partIds[s.observed]]:'Rajah tumbuhan'})}</div>${interactive?`<p class="plant-state">${Object.keys(s.matched).length} / 4 bahagian dipadankan</p>`:''}`;
   }
   if(def.mode==='direction')return `<div class="plant-light-box light-${s.side||'none'}">${s.side?`<div class="side-sun side-${s.side}">${art('sun')}<span>Cahaya ${s.side==='left'?'kiri':'kanan'}</span></div>`:''}${specimen({moist:true,lean:s.grown?s.side:'',caption:s.grown?'Selepas beberapa hari':'Pokok baharu · Sebelum pertumbuhan'})}</div>${interactive?`<div class="answer-buttons">${['left','right'].map(id=>button('side',id,'Cahaya di '+(id==='left'?'kiri':'kanan'),`aria-pressed="${s.side===id}"`)).join('')}</div>${button('grow',undefined,'Lihat pertumbuhan',!s.side||s.grown?'disabled':'')}`:''}<p class="plant-state">${s.tried.length} / 2 sisi diuji · Pertumbuhan dipercepatkan dalam simulasi.</p>`;
   return `<div class="plant-pair">${s.step===2?specimen({wilt:true,caption:'Sebelum · Kering dan redup'}):''}${specimen({wilt:!isSolved,moist:s.water,sun:s.sun,caption:isSolved?'Selepas beberapa hari · Pokok pulih':s.inspected?(s.water?'Tanah lembap':'Tanah kering')+' · '+(s.sun?'Cahaya tersedia':'Cahaya kurang'):'Pokok makmal layu'})}</div>${interactive?`<div class="plant-choices">${button('inspect',undefined,'Periksa tanah',s.inspected?'disabled':'')}${button('water',undefined,art('water')+'Siram pokok',!s.inspected||s.water?'disabled':'')}${button('sun',undefined,art('sun')+'Pindah ke cahaya',!s.inspected||s.sun?'disabled':'')}</div>`:''}<p class="plant-state">${Number(s.inspected)+Number(s.water)+Number(s.sun)} / 3 tindakan penjagaan · Pemulihan mengambil masa.</p>`;
  }
  if(s.step===0)return `<h2 id="activity-heading" tabindex="-1">${def.prediction}</h2>${specimen({wilt:def.mode==='rescue',roots:def.mode==='parts',caption:'Mari buat ramalan'})}${def.mode==='needs'?'<p>Boleh pilih lebih daripada satu. Ramalan tidak dihukum.</p>':''}<div class="answer-buttons">${def.choices.map((c,i)=>button('predict',String(i),c,def.mode==='needs'?`aria-pressed="${s.predictions.includes(String(i))}"`:'')).join('')}</div>`;
  if(s.step===1)return `<h2 id="activity-heading" tabindex="-1">${def.title}</h2><p>${def.instruction}</p>${scene(true)}${button('restart',undefined,'Main Semula ↻')}`;
  if(s.step===2)return `<h2 id="activity-heading" tabindex="-1">Perhatikan hasil kamu</h2><p>${def.observations[s.observed]}</p>${def.mode==='direction'?`<div class="plant-pair">${specimen({moist:true,caption:'Sebelum · Tegak'})}${specimen({moist:true,sun:true,lean:s.side,caption:'Selepas · Ke arah cahaya '+(s.side==='left'?'kiri':'kanan')})}</div>`:scene()}${s.observed<def.observations.length-1?button('observe',undefined,'Perhati Seterusnya →'):'<p>✓ Pemerhatian selesai.</p>'}`;
  if(s.step===3)return `<h2 id="activity-heading" tabindex="-1">${def.question}</h2><div class="answer-buttons">${def.answers.map((a,i)=>button('think',i?'wrong':'correct',a)).join('')}</div>`;
  return '';
 }
 return {createSession,render,hintTarget};
})();
