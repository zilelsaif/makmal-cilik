'use strict';
window.MakmalYear3Domains={};
window.MakmalYear3UI={
 button(action,value,label,disabled=false,pressed=null){return `<button class="nav-button" data-exp="${action}" ${value===undefined?'':`data-value="${value}"`} ${disabled?'disabled':''} ${pressed===null?'':`aria-pressed="${pressed}"`}>${label}</button>`;},
 svg(body,label='Rajah model'){return `<svg class="y3-diagram" viewBox="0 0 360 220" role="img" aria-label="${label}">${body}</svg>`;},
 art(id){const ids=['leaf','leaf-serrated','incisor','canine','molar','tooth-enamel','tooth-dentine','tooth-pulp','pulley','plant','spill'];if(ids.includes(id))return `<svg class="y3-object" viewBox="0 0 120 100" aria-hidden="true"><use href="assets/experiments/year3/diagrams.svg#${id}"/></svg>`;const icons={inspect:'🔎',circle:'🔵',square:'🟦',lamp:'🔦',bag:'🎒',walk:'🚶',teacher:'🧑‍🏫',beaker:'🧪',tools:'🥽',broken:'⚠️',tooth:'🦷',teeth:'🦷',food:'🍎',rice:'🍚',fish:'🐟',vegetable:'🥬',water:'💧',oil:'🫙',goat:'🐐',tiger:'🐯',bear:'🐻',rabbit:'🐇',lion:'🦁',seed:'🫘',stem:'🌿',ginger:'🫚',fern:'🌿',sun:'☀️',earth:'🌍',moon:'🌙',asteroid:'🪨',comet:'☄️',planet:'🪐',rope:'🪢',box:'📦',flag:'🚩',well:'🪣',ramp:'📐',ruler:'📏'};return `<span class="y3-glyph" aria-hidden="true">${icons[id]||'🔎'}</span>`;},
 message(s,text,correct=true){s.message=text;s.effect=correct?'correct':'wrong';s.pose=correct?'happy':'thinking';}
};
window.MakmalYear3Lab=(()=>{
 function createSession(d){
  const domain=window.MakmalYear3Domains[d.domain];if(!domain)throw Error('Unknown Year3 domain '+d.domain);
  let s;const reset=()=>{s={step:0,prediction:false,matched:{},observed:0,thought:false,hints:0,message:'',pose:'neutral',effect:null,saved:false};domain.init(s,d);return s;};reset();
  const canAdvance=()=>s.step===0?s.prediction:s.step===1?domain.solved(s,d):s.step===2?s.observed===d.observations.length-1:s.step===3?s.thought:false;
  function act(a,v){s.effect=null;
   if(a==='predict'&&s.step===0&&['0','1'].includes(v)){s.prediction=true;s.predictionChoice=v;s.message='Ramalan dicatat. Mari uji tanpa takut tersilap.';s.effect='itemSelected';}
   else if(s.step===1)domain.act(s,d,a,v);
   if(a==='observe'&&s.step===2&&s.observed<d.observations.length-1){s.observed++;s.message='';}
   if(a==='think'&&s.step===3&&['correct','wrong'].includes(v)){s.thought=v==='correct';window.MakmalYear3UI.message(s,s.thought?d.discovery:'Bandingkan semula dengan bukti yang kamu lihat.',s.thought);}
   if(a==='hint'&&s.step<4){s.hints=Math.min(3,s.hints+1);s.pose='hint';}
   if(a==='next'&&canAdvance()){s.step++;s.message='';s.hints=0;s.pose=s.step===4?'success':'neutral';}
   return s;
  }
  return {get state(){return s;},act,canAdvance,solved:()=>domain.solved(s,d),reset};
 }
 function render(s,d){const ui=window.MakmalYear3UI,b=ui.button,domain=window.MakmalYear3Domains[d.domain];
  if(s.step===0)return `<h2 id="activity-heading" tabindex="-1">${d.prediction}</h2><p>${d.objective}</p><div class="answer-buttons">${d.choices.map((x,i)=>b('predict',String(i),x,false,s.predictionChoice===String(i))).join('')}</div>`;
  if(s.step===3)return `<h2 id="activity-heading" tabindex="-1">${d.question}</h2><div class="answer-buttons">${d.answers.map((x,i)=>b('think',i?'wrong':'correct',x,false,s.thought&&!i)).join('')}</div>`;
  return `<h2 id="activity-heading" tabindex="-1">${s.step===1?d.title:'Perhatikan hasil kamu'}</h2><p class="activity-instruction">${s.step===1?d.instruction:d.observations[s.observed]}</p><div class="y3-lab">${domain.render(s,d,s.step===1)}</div>${s.step===2?(s.observed<d.observations.length-1?b('observe',undefined,'Perhati Seterusnya →'):'<p>✓ Pemerhatian selesai.</p>'):b('restart',undefined,'Main Semula ↻')}`;
 }
 function hint(s,d){const [a,v,clue]=window.MakmalYear3Domains[d.domain].hint(s,d);return {selector:`[data-exp="${a}"]${v===undefined?'':`[data-value="${v}"]`}`,clue};}
 return {createSession,render,hint};
})();
