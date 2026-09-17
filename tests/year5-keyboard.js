'use strict';
(()=>{let frame,w,d,session,defs,index=0,keys=0;const guide=document.getElementById('guide'),results=document.getElementById('results'),advance=document.getElementById('advance');
 const next=()=>{index++;advance.hidden=true;if(index>=defs.length){guide.textContent='ALL 50 KEYBOARD MISSIONS PASSED';return;}open();};
 function open(){w.MakmalRouter.navigate('year5Experiment',{unitId:defs[index].unitId,missionId:defs[index].id});update();}
 function update(){if(!session)return;let selector;
  if(d.querySelector('[data-exp="start"]'))selector='[data-exp="start"]';
  else if(session.state.step===0)selector='[data-exp="predict"][data-value="1"]';
  if(session.state.step===0&&session.canAdvance())selector='[data-exp="next"]';
  if(session.state.step===1){const [a,v]=w.MakmalYear5Domains[defs[index].mode].hint(session.state,defs[index]);selector=`[data-exp="${a}"]${v===undefined?'':`[data-value="${v}"]`}`;}
  if(session.state.step===2)selector=d.querySelector('[data-exp="observe"]')?'[data-exp="observe"]':'[data-exp="next"]';
  if(session.state.step===3)selector=session.canAdvance()?'[data-exp="next"]':'[data-exp="think"][data-value="correct"]';
  if(session.state.step===4){if(!advance.hidden)return;results.textContent+=`PASS ${defs[index].id}: completed with keyboard · ${keys} trusted keys so far\n`;advance.hidden=false;guide.textContent='Next mission';return;}
  const control=d.querySelector(selector);control?.focus();guide.textContent=JSON.stringify({mission:defs[index].id,selector,label:control?.textContent,disabled:control?.disabled});
 }
 advance.onclick=next;
 document.getElementById('run').onclick=async()=>{document.getElementById('run').disabled=true;const html=await(await fetch('../index.html')).text();frame=document.createElement('iframe');frame.srcdoc=html.replace('<head>','<head><base href="../"><script>let raw=null;Object.defineProperty(window,"localStorage",{value:{getItem:()=>raw,setItem:(k,v)=>raw=v}});<\/script>');document.getElementById('frame').replaceChildren(frame);await new Promise(r=>frame.onload=r);w=frame.contentWindow;d=frame.contentDocument;defs=Object.values(w.MakmalYear5.missions);const original=w.MakmalYear5Lab.createSession;w.MakmalYear5Lab.createSession=def=>(session=original(def));d.addEventListener('keydown',e=>{if(e.isTrusted&&['Enter',' '].includes(e.key))keys++;});d.addEventListener('click',()=>queueMicrotask(update));open();};
})();
