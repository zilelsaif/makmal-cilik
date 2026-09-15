'use strict';
const output=document.getElementById('results');const assert=(v,m)=>{if(!v)throw Error(m);};
document.getElementById('run').onclick=async()=>{
 const run=document.getElementById('run');run.disabled=true;output.textContent='';
 const record={completed:true,attempts:3,completedAt:'2026-01-01T00:00:00Z'};
 const all=Object.fromEntries([1,2,3,4,5].map(n=>['mission'+n,record]));
 const seed=plants=>JSON.stringify({version:'0.8.0',settings:{sound:false},profile:{name:'Aina'},extra:7,progress:{year2:{electricity:all,lightDark:all,mixtures:all,animals:{keep:9},plants}}});
 const scenarios=[['fresh',null],['v0.8',seed({})],['partial',seed({mission3:record})],['complete',seed(all)],['malformed','{bad'],['blocked',null]];
 try{
  const html=await(await fetch('../index.html')).text();assert((await fetch('../assets/experiments/plants/garden.svg')).ok,'Sprite missing');
  for(const [width,height] of [[1366,768],[1920,1080],[390,844],[360,640],[800,450]])for(const [name,raw] of scenarios){
   const frame=document.createElement('iframe');frame.style.width=width+'px';frame.style.height=height+'px';
   const boot=`<base href="../"><script>window.qaErrors=[];addEventListener('error',e=>{if(e.message)qaErrors.push(e.message)});addEventListener('unhandledrejection',e=>qaErrors.push(String(e.reason)));let raw=${JSON.stringify(raw)};Object.defineProperty(window,'localStorage',{value:{getItem:()=>{${name==='blocked'?"throw Error('blocked')":'return raw'}},setItem:(k,v)=>{${name==='blocked'?"throw Error('blocked')":'raw=v'}}}});<\/script>`;
   frame.srcdoc=html.replace('<head>','<head>'+boot);document.getElementById('frame').replaceChildren(frame);await new Promise(r=>frame.onload=r);
   const w=frame.contentWindow,d=frame.contentDocument,p=w.MakmalProgress;const polish=window.installPolishChecks(w,d);let completions=0;const complete=p.completeMission;p.completeMission=(...args)=>{completions++;return complete(...args);};
   const preserved=()=>JSON.stringify([p.getData().progress.year2.electricity,p.getData().progress.year2.lightDark,p.getData().settings,p.getData().profile,p.getData().progress.year2.mixtures,p.getData().progress.year2.animals,p.getData().extra]);const before=preserved();
   const click=sel=>{const e=d.querySelector(sel);assert(e&&!e.disabled,'Unavailable '+sel);e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect(),hit=d.elementFromPoint(r.x+r.width/2,r.y+r.height/2);assert(hit&&(hit===e||e.contains(hit)),'Layer intercepted '+sel);for(const type of ['pointerdown','pointerup'])e.dispatchEvent(new w.PointerEvent(type,{bubbles:true,pointerType:'touch',pointerId:12,button:0}));polish.click(sel,()=>e.click());};
   const check=phase=>{polish.check();assert(w.innerWidth===width&&w.innerHeight===height,'Viewport mismatch');assert(d.documentElement.scrollWidth<=width,'Overflow '+phase);for(const e of d.querySelectorAll('button,h1,h2,h3,p,.learning-steps'))assert(e.scrollWidth<=e.clientWidth+2&&e.scrollHeight<=e.clientHeight+2,'Clipped '+phase+': '+e.textContent);for(const e of d.querySelectorAll('button'))assert(e.getBoundingClientRect().height>=44,'Small control '+phase);};
   check('Title');click('[data-route="mainMenu"]');check('Main menu');click('[data-route="yearSelect"]');check('Year selection');click('[data-route="year2"]');check('hub');click('[data-unit="plants"]');assert(p.isAvailable(1,'plants'),'Trapped start');check('Mission hub');assert(d.querySelector('[data-mission="plants-5"]').textContent.includes('Selamatkan Pokok Layu'),'Stale titles');
   if(name==='fresh'||name==='malformed'||name==='blocked'){w.MakmalRouter.navigate('experiment',{unitId:'plants',missionId:'plants-5'});assert(!d.querySelector('#experiment-root'),'Lock bypass');}
   for(let n=1;n<=5;n++){
    click(`[data-mission="plants-${n}"]`);if(d.querySelector('[data-exp="start"]'))click('[data-exp="start"]');const attempts=p.getData().progress.year2.plants['mission'+n].attempts;let firstDate=p.getData().progress.year2.plants['mission'+n].completedAt;
    for(let repeat=0;repeat<2;repeat++){
     check('Ramal '+n);click('[data-exp="predict"][data-value="1"]');click('[data-exp="next"]');check('Cuba '+n);click('[data-exp="hint"]');click('[data-exp="hint"]');assert(d.querySelector('.hint-target'),'Hint absent '+n);
     if(n===1){click('[data-exp="need"][data-value="candy"]');assert(d.querySelector('[data-exp="next"]').disabled,'Wrong need accepted');for(const id of ['water','sun','air'])click(`[data-exp="need"][data-value="${id}"]`);}
     if(n===2){click(`[data-exp="water"][data-value="${repeat?'B':'A'}"]`);assert(d.querySelector('[data-exp="water"]').disabled,'Can water both');click('[data-exp="wait"]');assert(d.querySelectorAll('.plant-wilted').length===1,'Comparison mismatch');}
     if(n===3){click('[data-exp="part"][data-value="root"]');click('[data-exp="target"][data-value="flower"]');assert(!d.querySelector('[data-exp="target"][data-value="flower"]').disabled,'Wrong match accepted');for(const id of ['root','stem','leaf','flower']){click(`[data-exp="part"][data-value="${id}"]`);click(`[data-exp="target"][data-value="${id}"]`);}}
     if(n===4){for(const id of ['left','right']){click(`[data-exp="side"][data-value="${id}"]`);assert(!d.querySelector('.lean-left,.lean-right'),'Stale growth');click('[data-exp="grow"]');assert(d.querySelector('.lean-'+id),'Wrong growth direction');}assert(!d.querySelector('[data-exp="next"]').disabled,'Both sides not recorded');}
     if(n===5){assert(d.querySelector('[data-exp="water"]').disabled,'Inspection bypass');click('[data-exp="inspect"]');click('[data-exp="water"]');assert(d.querySelector('[data-exp="next"]').disabled,'Missing light accepted');click('[data-exp="sun"]');assert(!d.querySelector('.plant-wilted'),'Plant did not recover');}
     check('Solved '+n);
     click('[data-exp="next"]');check('Perhati '+n);while(d.querySelector('[data-exp="observe"]'))click('[data-exp="observe"]');click('[data-exp="next"]');check('Fikir '+n);click('[data-exp="think"][data-value="wrong"]');assert(d.querySelector('[data-exp="next"]').disabled,'Wrong reflection');click('[data-exp="think"][data-value="correct"]');click('[data-exp="next"]');check('Temui '+n);
     assert(completions===(n-1)*2+repeat+1,'Duplicate completion');const saved=p.getData().progress.year2.plants['mission'+n];assert(saved.completed&&saved.attempts===attempts+repeat,'Replay/listener bug');if(firstDate)assert(saved.completedAt===firstDate,'Date erased');firstDate=saved.completedAt;assert(preserved()===before,'Electricity/settings overwritten');
     if(n===5)assert(d.body.textContent.includes('UNIT TUMBUHAN SELESAI!'),'Finale missing');if(!repeat)click('[data-exp="restart"]');
    }
    click('[data-exp="exit"]');assert(d.querySelector(`[data-mission="plants-${n}"]`).textContent.includes('Selesai'),'Wrong exit hub');
   }
   assert(p.isUnitComplete('plants'),'Unit incomplete');
   // In-progress hint/reset/navigation must not affect saved records or duplicate events.
   for(let n=1;n<=5;n++){click(`[data-mission="plants-${n}"]`);click('[data-exp="start"]');click('[data-exp="predict"][data-value="0"]');click('[data-exp="next"]');click('[data-exp="hint"]');click('[data-exp="hint"]');click('[data-exp="restart"]');assert(!d.querySelector('.hint-target'),'Stale hint');click('[data-action="back"]');assert(d.querySelector('[data-mission="plants-1"]'),'Wrong back');click(`[data-mission="plants-${n}"]`);click('[data-exp="start"]');click('[data-action="home"]');click('[data-route="yearSelect"]');click('[data-route="year2"]');click('[data-unit="plants"]');}
   if(name!=='blocked'){p.loadData();assert(p.isUnitComplete('plants'),'Reload lost completion');}assert(preserved()===before,'Other state changed');assert(w.qaErrors.length===0,w.qaErrors.join(';'));
   output.textContent+=`PASS ${width}×${height} ${name}: five missions twice; plant guards, needs/water/parts/light/rescue, replay, navigation, independent storage, hit targets, no overflow/clipping/errors.\n`;
  }
  output.textContent+='ALL 30 SCENARIOS PASSED';
 }catch(e){output.textContent+='FAIL '+e.message;}finally{run.disabled=false;}
};
