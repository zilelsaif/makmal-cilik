'use strict';
const output=document.getElementById('results');const assert=(v,m)=>{if(!v)throw Error(m);};
document.getElementById('run').onclick=async()=>{
 const run=document.getElementById('run');run.disabled=true;output.textContent='';
 const record={completed:true,attempts:3,completedAt:'2026-01-01T00:00:00Z'};
 const all=Object.fromEntries([1,2,3,4,5].map(n=>['mission'+n,record]));
 const seed=mixtures=>JSON.stringify({version:'0.7.0',settings:{sound:false},profile:{name:'Aina'},extra:7,progress:{year2:{electricity:all,lightDark:all,plants:{keep:9},mixtures}}});
 const scenarios=[['fresh',null],['v0.7',seed({})],['partial',seed({mission3:record})],['complete',seed(all)],['malformed','{bad'],['blocked',null]];
 try{
  const html=await(await fetch('../index.html')).text();assert((await fetch('../assets/experiments/mixtures/objects.svg')).ok,'Sprite missing');
  for(const [width,height] of [[1366,768],[1920,1080],[390,844],[360,640],[800,450]])for(const [name,raw] of (new URLSearchParams(location.search).has('quick')?scenarios.slice(0,1):scenarios)){
   const frame=document.createElement('iframe');frame.style.width=width+'px';frame.style.height=height+'px';
   const boot=`<base href="../"><script>window.qaErrors=[];addEventListener('error',e=>{if(e.message)qaErrors.push(e.message)});addEventListener('unhandledrejection',e=>qaErrors.push(String(e.reason)));let raw=${JSON.stringify(raw)};Object.defineProperty(window,'localStorage',{value:{getItem:()=>{${name==='blocked'?"throw Error('blocked')":'return raw'}},setItem:(k,v)=>{${name==='blocked'?"throw Error('blocked')":'raw=v'}}}});<\/script>`;
   frame.srcdoc=html.replace('<head>','<head>'+boot);document.getElementById('frame').replaceChildren(frame);await new Promise(r=>frame.onload=r);
   const w=frame.contentWindow,d=frame.contentDocument,p=w.MakmalProgress;const polish=window.installPolishChecks(w,d);let completions=0;const complete=p.completeMission;p.completeMission=(...args)=>{completions++;return complete(...args);};
   const preserved=()=>JSON.stringify([p.getData().progress.year2.electricity,p.getData().progress.year2.lightDark,p.getData().settings,p.getData().profile,p.getData().progress.year2.plants,p.getData().extra]);const before=preserved();
   const click=sel=>{const e=d.querySelector(sel);assert(e&&!e.disabled,'Unavailable '+sel);e.scrollIntoView({block:'center'});const r=e.getBoundingClientRect(),hit=d.elementFromPoint(r.x+r.width/2,r.y+r.height/2);assert(hit&&(hit===e||e.contains(hit)),'Layer intercepted '+sel);for(const type of ['pointerdown','pointerup'])e.dispatchEvent(new w.PointerEvent(type,{bubbles:true,pointerType:'touch',pointerId:12,button:0}));polish.click(sel,()=>e.click());};
   const check=phase=>{polish.check();assert(w.innerWidth===width&&w.innerHeight===height,'Viewport mismatch');assert(d.documentElement.scrollWidth<=width,'Overflow '+phase);for(const e of d.querySelectorAll('button,h1,h2,h3,p,.learning-steps'))assert(e.scrollWidth<=e.clientWidth+2&&e.scrollHeight<=e.clientHeight+2,'Clipped '+phase+': '+e.textContent);for(const e of d.querySelectorAll('button'))assert(e.getBoundingClientRect().height>=44,'Small control '+phase);};
   check('Title');click('[data-route="mainMenu"]');check('Main menu');click('[data-route="yearSelect"]');check('Year selection');click('[data-route="year2"]');check('hub');click('[data-unit="mixtures"]');assert(p.isAvailable(1,'mixtures'),'Trapped start');check('Mission hub');assert(d.querySelector('[data-mission="mixtures-5"]').textContent.includes('Cabaran Asingkan Campuran'),'Stale titles');
   if(name==='fresh'||name==='malformed'||name==='blocked'){w.MakmalRouter.navigate('experiment',{unitId:'mixtures',missionId:'mixtures-5'});assert(!d.querySelector('#experiment-root'),'Lock bypass');}
   for(let n=1;n<=5;n++){
    click(`[data-mission="mixtures-${n}"]`);if(d.querySelector('[data-exp="start"]'))click('[data-exp="start"]');const attempts=p.getData().progress.year2.mixtures['mission'+n].attempts;let firstDate=p.getData().progress.year2.mixtures['mission'+n].completedAt;
    for(let repeat=0;repeat<2;repeat++){
     check('Ramal '+n);if(n===4){for(const value of ['sugar:no','salt:no','sand:yes'])click(`[data-exp="predict"][data-value="${value}"]`);}else click('[data-exp="predict"][data-value="1"]');click('[data-exp="next"]');check('Cuba '+n);click('[data-exp="hint"]');click('[data-exp="hint"]');assert(d.querySelector('.hint-target'),'Hint absent '+n);
     if(n===1){for(const id of ['beans','sand','clips']){click(`[data-exp="identify"][data-value="${id}"]`);assert(d.querySelector(`[data-exp="identify"][data-value="${id}"]`).disabled,'Found material selectable');}}
     if([2,3,5].includes(n)){click(`[data-exp="tool"][data-value="${n===2?'spoon':n===3?'magnet':'sieve'}"]`);click('[data-exp="apply"]');assert(d.querySelector('.separation-scene').dataset.stage==='0','Wrong tool accepted');click(`[data-exp="tool"][data-value="${n===3?'sieve':'magnet'}"]`);click('[data-exp="apply"]');assert(d.querySelector('.separation-scene').dataset.stage==='1','Separation absent');if(n===5){assert(d.querySelector('[data-exp="next"]').disabled,'Finale skipped sieve');click('[data-exp="tool"][data-value="sieve"]');click('[data-exp="apply"]');assert(d.querySelector('.separation-scene').dataset.stage==='2','Finale incomplete');}}
     if(n===4){for(const id of ['sugar','salt','sand']){click(`[data-exp="material"][data-value="${id}"]`);assert(!d.querySelector('.water-grains'),'Stale water');click('[data-exp="add"]');assert(d.querySelector('.water-grains'),'Material absent');click('[data-exp="stir"]');assert(d.querySelector(id==='sand'?'.undissolved':'.dissolved'),'Wrong dissolve result');assert(d.querySelector('[data-exp="stir"]').disabled,'Repeated stirring');}assert(d.querySelectorAll('.mix-results-list li').length===3,'Missing results');}
     click('[data-exp="next"]');check('Perhati '+n);while(d.querySelector('[data-exp="observe"]'))click('[data-exp="observe"]');click('[data-exp="next"]');check('Fikir '+n);click('[data-exp="think"][data-value="wrong"]');assert(d.querySelector('[data-exp="next"]').disabled,'Wrong reflection');click('[data-exp="think"][data-value="correct"]');click('[data-exp="next"]');check('Temui '+n);
     assert(completions===(n-1)*2+repeat+1,'Duplicate completion');const saved=p.getData().progress.year2.mixtures['mission'+n];assert(saved.completed&&saved.attempts===attempts+repeat,'Replay/listener bug');if(firstDate)assert(saved.completedAt===firstDate,'Date erased');firstDate=saved.completedAt;assert(preserved()===before,'Electricity/settings overwritten');
     if(n===5)assert(d.body.textContent.includes('UNIT CAMPURAN SELESAI!'),'Finale missing');if(!repeat)click('[data-exp="restart"]');
    }
    click('[data-exp="exit"]');assert(d.querySelector(`[data-mission="mixtures-${n}"]`).textContent.includes('Selesai'),'Wrong exit hub');
   }
   assert(p.isUnitComplete('mixtures'),'Unit incomplete');
   // In-progress hint/reset/navigation must not affect saved records or duplicate events.
   for(let n=1;n<=5;n++){click(`[data-mission="mixtures-${n}"]`);click('[data-exp="start"]');if(n===4){for(const value of ['sugar:yes','salt:yes','sand:no'])click(`[data-exp="predict"][data-value="${value}"]`);}else click('[data-exp="predict"][data-value="0"]');click('[data-exp="next"]');click('[data-exp="hint"]');click('[data-exp="hint"]');click('[data-exp="restart"]');assert(!d.querySelector('.hint-target'),'Stale hint');click('[data-action="back"]');assert(d.querySelector('[data-mission="mixtures-1"]'),'Wrong back');click(`[data-mission="mixtures-${n}"]`);click('[data-exp="start"]');click('[data-action="home"]');click('[data-route="yearSelect"]');click('[data-route="year2"]');click('[data-unit="mixtures"]');}
   if(name!=='blocked'){p.loadData();assert(p.isUnitComplete('mixtures'),'Reload lost completion');}assert(preserved()===before,'Other state changed');assert(w.qaErrors.length===0,w.qaErrors.join(';'));
   output.textContent+=`PASS ${width}×${height} ${name}: five missions twice; material guards, separation/dissolve, replay, navigation, independent storage, hit targets, no overflow/clipping/errors.\n`;
  }
  output.textContent+='ALL 30 SCENARIOS PASSED';
 }catch(e){output.textContent+='FAIL '+e.message;}finally{run.disabled=false;}
};
