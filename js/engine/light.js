'use strict';
window.MakmalLight = (() => {
  const objects = window.MakmalLightContent.objects;
  const regions = ['left','center','right'];
  function createSession(def) {
    const fresh=()=>({step:0,prediction:false,selected:null,matched:{},sorted:{},power:def.mode==='materials',region:null,visited:[],blocked:def.mode==='search',material:null,tried:[],found:false,observed:0,thought:false,hints:0,hintTarget:null,message:'',pose:'neutral',saved:false,effect:null});
    let state=fresh();
    const visibleItem=()=>state.power&&state.region==='right'&&!state.blocked;
    const solved=()=>def.mode==='sort'?Object.keys(state.sorted).length===objects.length:def.mode==='room'?state.visited.length===3:def.mode==='shadow'?state.power&&state.blocked:def.mode==='materials'?state.tried.length===2:state.found&&state.visited.length>=2;
    const canAdvance=()=>[state.prediction,solved(),state.observed===def.observations.length-1,state.thought,false][state.step];
    function act(action,value){
      state.effect=null;state.hintTarget=null;
      if(action==='predict'&&state.step===0&&def.choices[Number(value)]!==undefined){state.prediction=true;state.message='Terima kasih atas ramalan kamu. Mari kita uji!';state.pose='thinking';}
      if(state.step===1){
        if(action==='pick'&&def.mode==='sort'&&objects.some(o=>o.id===value)&&!state.sorted[value]){state.selected=value;state.message='Objek dipilih. Pilih kumpulan yang sesuai.';state.pose='neutral';}
        if(action==='sort'&&def.mode==='sort'&&state.selected&&['source','other'].includes(value)){
          const object=objects.find(o=>o.id===state.selected);
          if(object.source===(value==='source')){state.sorted[object.id]=true;state.selected=null;state.message='Tepat! Cuba objek yang lain.';state.pose='happy';state.effect='correct';}
          else{state.message='Cuba lagi. Adakah objek ini menghasilkan cahaya sendiri?';state.pose='thinking';state.effect='wrong';}
        }
        if(action==='power'&&['room','shadow'].includes(def.mode)){state.power=!state.power;state.effect=state.power?'lightOn':'click';state.message=state.power?'Lampu dihidupkan. Perhatikan perubahan.':'Lampu dipadamkan.';}
        if(action==='tool'&&def.mode==='search'){
          if(value==='flashlight'){state.power=true;state.effect='lightOn';state.message='Lampu suluh sedia. Suluh beberapa bahagian bilik.';state.pose='happy';}
          else{state.message='Alat ini tidak menghasilkan cahaya sendiri. Cuba alat lain.';state.pose='thinking';state.effect='wrong';}
        }
        if(action==='region'&&['room','search'].includes(def.mode)&&regions.includes(value)&&state.power){state.region=value;if(!state.visited.includes(value))state.visited.push(value);state.message=def.mode==='search'&&value==='right'&&state.blocked?'Kotak menghalang cahaya. Lihat bayang di belakangnya.':'Bahagian ini sedang disuluh.';state.effect='correct';}
        if(action==='object'&&def.mode==='shadow'){state.blocked=!state.blocked;state.message=state.blocked?'Bola berada di laluan cahaya.':'Bola dialihkan dari laluan cahaya.';if(state.power&&state.blocked)state.effect='shadowFormed';}
        if(action==='material'&&def.mode==='materials'&&['cardboard','plastic'].includes(value)){state.material=value;if(!state.tried.includes(value))state.tried.push(value);state.message=value==='cardboard'?'Kadbod menghalang cahaya.':'Cahaya boleh melalui plastik jernih.';state.effect=value==='cardboard'?'shadowFormed':'correct';}
        if(action==='obstruction'&&def.mode==='search'&&state.power&&state.region==='right'){state.blocked=!state.blocked;state.message=state.blocked?'Kotak menghalang cahaya semula.':'Kotak dialihkan. Sekarang perhatikan alat di belakangnya.';}
        if(action==='find'&&def.mode==='search'&&visibleItem()&&!state.found){state.found=true;state.message=state.visited.length>=2?'Jumpa! Terima kasih kerana membantu PICO.':'Jumpa! Cuba suluh satu bahagian lain juga.';state.pose='success';state.effect='itemFound';}
      }
      if(action==='observe'&&state.step===2&&state.observed<def.observations.length-1){state.observed++;state.message='';}
      if(action==='think'&&state.step===3&&['correct','wrong'].includes(value)){state.thought=value==='correct';state.message=state.thought?def.discovery:'Cuba ingat apa yang kamu lihat semasa eksperimen.';state.pose=state.thought?'happy':'thinking';state.effect=state.thought?'correct':'wrong';}
      if(action==='hint'&&state.step<4){state.hints++;state.pose='hint';state.message=def.hints[Math.min(state.hints-1,2)];if(state.hints>=2)state.hintTarget=def.mode==='sort'?objects.find(o=>!state.sorted[o.id])?.id:def.mode==='room'?'power':def.mode==='shadow'?'object':def.mode==='materials'?(['cardboard','plastic'].find(id=>!state.tried.includes(id))||'cardboard'):'right';}
      if(action==='next'&&canAdvance()){state.step++;state.message='';state.hints=0;state.selected=null;state.pose=state.step===4?'success':'neutral';}
      return state;
    }
    return{get state(){return state;},act,canAdvance,solved,visibleItem,reset:()=>{state=fresh();return state;}};
  }
  const art=(id,label='')=>`<svg class="light-art" viewBox="0 0 100 100" ${label?`role="img" aria-label="${label}"`:'aria-hidden="true"'}><use href="assets/experiments/light-dark/objects.svg#${id}"/></svg>`;
  function render(s,def){
    const button=(action,value,text,extra='')=>`<button class="nav-button ${s.hintTarget===(value||action)?'hint-target':''}" data-exp="${action}" ${value?`data-value="${value}"`:''} ${extra}>${text}</button>`;
    function room(interactive=false){
      const observation=s.step===2;
      const allBright=s.step===4||s.found||(observation&&s.observed===def.observations.length-1);
      const power=observation?s.observed>0:s.power;
      return `<div class="light-room ${allBright?'room-bright':''}" role="group" aria-label="Bilik makmal ${allBright?'terang':'gelap'}">${regions.map((region,i)=>{
        const illuminated=allBright||(power&&s.region===region);
        const obstructed=def.mode==='search'&&region==='right'&&s.blocked&&!allBright;
        const visible=illuminated&&!obstructed;
        return `<div class="room-region ${illuminated?'illuminated':''}"><span class="room-region-name">${['Kiri','Tengah','Kanan'][i]}</span><div class="room-shelf"></div>${visible?`<div class="room-object">${art(['book','plant','flask'][i])}<span>${['Buku','Tumbuhan','Kelalang'][i]}</span>${interactive&&def.mode==='search'&&region==='right'&&!s.found?button('find','','Ambil kelalang'):''}</div>`:'<span class="room-mystery" aria-hidden="true">?</span>'}${obstructed&&illuminated?`<div class="room-obstruction">${art('box')}<span>Kotak</span></div><div class="box-shadow" aria-hidden="true"></div>`:''}</div>`;
      }).join('')}</div>${interactive?`<div class="light-controls">${def.mode==='room'?button('power','',s.power?'Padam lampu suluh':'Hidupkan lampu suluh',`aria-pressed="${s.power}"`):`<div class="tool-choices">${['flashlight','mirror','book'].map((id,i)=>button('tool',id,art(id)+['Lampu suluh','Cermin','Buku'][i],`aria-pressed="${id==='flashlight'&&s.power}"`)).join('')}</div>`}<div class="region-controls" role="group" aria-label="Arah lampu suluh">${regions.map((r,i)=>button('region',r,['Suluh kiri','Suluh tengah','Suluh kanan'][i],`aria-pressed="${s.region===r}" ${!s.power?'disabled':''}`)).join('')}</div>${def.mode==='search'&&s.power&&s.region==='right'?button('obstruction','',s.blocked?'Alihkan kotak':'Letakkan kotak semula'):''}</div><p class="light-state" role="status">${s.power?'Lampu suluh hidup':'Lampu suluh padam'} · ${def.mode==='search'?Math.min(s.visited.length,2):s.visited.length} / ${def.mode==='room'?3:2} bahagian ${def.mode==='room'?'disuluh':'disuluh (sekurang-kurangnya 2)'}</p>`:''}`;
    }
    function shadow(interactive=false){
      const material=def.mode==='materials';
      const selected=s.step===2&&material?['cardboard','plastic'][s.observed]:s.material;
      const on=s.step>=2?true:s.power;
      const inPath=material?!!selected:s.step>=2?true:s.blocked;
      const blocked=inPath&&(!material||selected==='cardboard');
      const focus=s.step===2&&!material?['lamp','object','shadow'][s.observed]:'';
      return `<div class="shadow-scene ${on?'lamp-on':''} ${on&&blocked?'shadow-visible':''}"><div class="light-beam" aria-hidden="true"></div><div class="shadow-lamp ${focus==='lamp'?'scene-focus':''}">${art('flashlight')}<span>SUMBER CAHAYA</span></div><div class="blocking-object ${inPath?'in-path':'out-path'} ${selected==='plastic'?'clear-plastic':''} ${material?'square-object':''} ${focus==='object'?'scene-focus':''}"><span>${material?(selected==='plastic'?'Plastik':'Kadbod'):'Bola'}</span></div><div class="shadow-screen ${focus==='shadow'?'scene-focus':''}"><span>SKRIN</span><div class="projected-shadow ${material?'square-shadow':''}" aria-hidden="true"></div></div><div class="scene-order">Cahaya → Objek → Skrin</div></div><p class="light-state" role="status">${!on?'Lampu padam':on&&blocked?'Objek menghalang cahaya. Bayang terbentuk.':'Cahaya sampai ke skrin.'}</p>${interactive?`<div class="light-controls">${material?`<div class="answer-buttons">${button('material','cardboard','Letakkan kadbod',`aria-pressed="${selected==='cardboard'}"`)}${button('material','plastic','Letakkan plastik jernih',`aria-pressed="${selected==='plastic'}"`)}</div><p>${s.tried.length} / 2 bahan dicuba</p>`:`${button('power','',s.power?'Padam lampu':'Hidupkan lampu',`aria-pressed="${s.power}"`)}${button('object','',s.blocked?'Alihkan bola keluar':'Letakkan bola dalam cahaya',`aria-pressed="${s.blocked}"`)}`}</div>`:''}`;
    }
    function sorting(interactive=false){
      return `<div class="source-grid">${objects.map(o=>interactive?`<button class="source-object ${s.hintTarget===o.id?'hint-target':''}" data-exp="pick" data-value="${o.id}" aria-pressed="${s.selected===o.id}" ${s.sorted[o.id]?'disabled':''}>${art(o.id)}<strong>${o.name}</strong>${s.sorted[o.id]?`<small>✓ ${o.source?'Sumber Cahaya':'Bukan Sumber Cahaya'}</small>`:''}</button>`:`<div class="source-object ${s.step===2&&o.source===(s.observed===0)?'scene-focus':''}">${art(o.id)}<strong>${o.name}</strong>${s.step>=2?`<small>${o.source?'Sumber Cahaya':'Bukan Sumber Cahaya'}</small>`:''}</div>`).join('')}</div>${interactive?`<p class="light-state">${Object.keys(s.sorted).length} / 5 objek dikelaskan</p><div class="answer-buttons">${button('sort','source','Sumber Cahaya',!s.selected?'disabled':'')}${button('sort','other','Bukan Sumber Cahaya',!s.selected?'disabled':'')}</div>`:''}`;
    }
    const scene=interactive=>def.mode==='sort'?sorting(interactive):['room','search'].includes(def.mode)?room(interactive):shadow(interactive);
    if(s.step===0)return `<h2 id="activity-heading" tabindex="-1">${def.prediction}</h2>${def.mode==='sort'?sorting():''}<div class="answer-buttons">${def.choices.map((c,i)=>button('predict',String(i),c)).join('')}</div>`;
    if(s.step===1)return `<h2 id="activity-heading" tabindex="-1">${def.title}</h2><p>${def.instruction}</p>${scene(true)}<button class="nav-button" data-exp="restart">MULA SEMULA</button>`;
    if(s.step===2)return `<h2 id="activity-heading" tabindex="-1">Perhatikan hasil kamu</h2><p class="explanation">${def.observations[s.observed]}</p>${scene(false)}${s.observed<def.observations.length-1?button('observe','','PERHATI SETERUSNYA →'):'<p>✓ Pemerhatian selesai.</p>'}`;
    if(s.step===3)return `<h2 id="activity-heading" tabindex="-1">${def.question}</h2><div class="answer-buttons">${def.answers.map((a,i)=>button('think',i?'wrong':'correct',a)).join('')}</div>`;
    const complete=window.MakmalProgress.isUnitComplete('lightDark');
    return `<div class="completion"><span class="completion-check" aria-hidden="true">✓</span><h2 id="activity-heading" tabindex="-1">Misi Selesai</h2><p>${def.discovery}</p>${def.mode==='search'?`<section class="unit-finale"><h3>${complete?'UNIT TERANG & GELAP SELESAI!':'Kemajuan Terang & Gelap'}</h3><ul>${Object.values(window.MakmalLightContent.missions).map(m=>`<li>${window.MakmalProgress.isMissionComplete(m.progressKey,'lightDark')?'✓ Selesai':'Belum selesai'} · ${m.title}</li>`).join('')}</ul></section>`:''}${scene(false)}<div class="completion-actions">${button('restart','','MAIN SEMULA ↻')}${button('exit','','Kembali ke Senarai Misi')}</div></div>`;
  }
  return{createSession,render};
})();
