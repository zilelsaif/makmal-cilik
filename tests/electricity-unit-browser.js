'use strict';
const output=document.getElementById('results');
const assert=(v,m)=>{if(!v)throw Error(m);};
document.getElementById('run').onclick=async()=>{
  const run=document.getElementById('run');run.disabled=true;output.textContent='';
  const record={completed:true,attempts:2,completedAt:'2026-01-01T00:00:00.000Z'};
  const seed=(version,electricity)=>JSON.stringify({version,settings:{sound:false},profile:{name:'Aina'},custom:7,progress:{year2:{plants:{keep:8},electricity}}});
  const scenarios=[['fresh',null],['v0.3',seed('0.3.0',{mission1:record})],['v0.4',seed('0.4.0',{mission1:record,mission2:record})],['partial',seed('0.4.0',{mission4:record})],['complete',seed('0.4.0',Object.fromEntries([1,2,3,4,5].map(n=>['mission'+n,record])))],['malformed','{bad'],['blocked',null],['v0.7',seed('0.7.0',Object.fromEntries([1,2,3,4,5].map(n=>['mission'+n,record]))) ]];
  try{
    const html=await(await fetch('../index.html')).text();
    for(const [width,height] of [[1366,768],[1920,1080],[390,844],[360,640],[800,450]])for(const [name,raw] of (new URLSearchParams(location.search).has('quick')?scenarios.slice(0,1):scenarios)){
      const frame=document.createElement('iframe');frame.style.width=width+'px';frame.style.height=height+'px';
      const boot=`<base href="../"><script>window.qaErrors=[];addEventListener('error',e=>{if(e.message)qaErrors.push(e.message)});addEventListener('unhandledrejection',e=>qaErrors.push(String(e.reason)));let raw=${JSON.stringify(raw)};Object.defineProperty(window,'localStorage',{value:{getItem:()=>{${name==='blocked'?"throw Error('blocked')":'return raw'}},setItem:(k,v)=>{${name==='blocked'?"throw Error('blocked')":'raw=v'}}}});<\/script>`;
      frame.srcdoc=html.replace('<head>','<head>'+boot);document.getElementById('frame').replaceChildren(frame);await new Promise(r=>frame.onload=r);
      const w=frame.contentWindow,d=frame.contentDocument,p=w.MakmalProgress;const polish=window.installPolishChecks(w,d);
      let completions=0;const complete=p.completeMission;p.completeMission=(...args)=>{completions++;return complete(...args);};
      const click=sel=>{const e=d.querySelector(sel);assert(e&&!e.disabled,'Unavailable '+sel);e.scrollIntoView({block:'nearest'});polish.click(sel,()=>e.click());};
      const check=phase=>{polish.check();assert(w.innerWidth===width&&w.innerHeight===height,'Size mismatch');assert(d.documentElement.scrollWidth<=width,'Overflow '+phase);for(const e of d.querySelectorAll('button,h1,h2,h3,p,.learning-steps'))assert(e.scrollWidth<=e.clientWidth+2&&e.scrollHeight<=e.clientHeight+2,'Clipped '+phase+': '+e.textContent);for(const e of d.querySelectorAll('button'))assert(e.getBoundingClientRect().height>=44,'Small button '+phase);};
      const tap=id=>{const e=d.querySelector(`[data-terminal="${id}"]`);assert(e&&!e.disabled,'Terminal unavailable');e.scrollIntoView({block:'nearest'});const r=e.getBoundingClientRect();for(const type of ['pointerdown','pointermove','pointerup'])e.dispatchEvent(new w.PointerEvent(type,{bubbles:true,pointerId:5,pointerType:'touch',button:0,clientX:r.x+20,clientY:r.y+20}));e.click();};
      const list=()=>{click('[data-route="mainMenu"]');click('[data-route="yearSelect"]');click('[data-route="year2"]');click('[data-unit="electricity"]');};
      check('title');list();assert(p.isAvailable(1),'Mission1 trapped');
      if(name==='fresh'||name==='malformed'){click('[data-mission="electricity-5"]');assert(!d.querySelector('#experiment-root'),'Locked click bypass');w.MakmalRouter.navigate('experiment',{unitId:'electricity',missionId:'electricity-5'});assert(!d.querySelector('#experiment-root'),'Locked route bypass');}
      if(name==='v0.4')assert(p.isAvailable(3),'Migration did not unlock3');
      for(let n=1;n<=5;n++){
        assert(p.isAvailable(n),'Sequential unlock failed '+n);click(`[data-mission="electricity-${n}"]`);if(d.querySelector('[data-exp="start"]'))click('[data-exp="start"]');
        if(n>=3){click('[data-exp="predict"][data-value="yes"]');click('[data-exp="next"]');click('[data-exp="hint"]');click('[data-exp="hint"]');click('[data-exp="restart"]');assert(!d.querySelector('.hint-target'),'Reset left hint');}
        const prior=p.getData().progress.year2.electricity['mission'+n],attempts=prior.attempts,firstDate=prior.completedAt;
        for(let repeat=0;repeat<2;repeat++){
          check('Ramal '+n);click('[data-exp="predict"][data-value="'+(n===1?'battery':'yes')+'"]');click('[data-exp="next"]');check('Cuba '+n);
          click('[data-exp="hint"]');click('[data-exp="hint"]');
          if(n===1){click('[data-label="battery"]');click('[data-target="wire"]');assert(!d.querySelector('[data-target="wire"]').disabled,'Wrong match');for(const id of ['battery','bulb','wire','switch']){click(`[data-label="${id}"]`);click(`[data-target="${id}"]`);}}
          else if(n===4){click('[data-exp="toggle"]');assert(d.querySelector('.circuit-lit'),'Closed not lit');assert(d.querySelector('[data-exp="next"]').disabled,'One toggle advanced');click('[data-exp="toggle"]');assert(!d.querySelector('.circuit-lit'),'Open lit');assert(!d.querySelector('[data-exp="next"]').disabled,'Both states not recorded');}
          else {assert(d.querySelectorAll('.circuit-wires .connected').length===(n===2?0:2),'Wrong initial circuit');const pairs=n===2?[['battery-right','switch-right'],['switch-left','bulb-left'],['bulb-right','battery-left']]:n===3?[['switch-left','bulb-left']]:[['bulb-right','battery-left']];for(const pair of pairs)for(const id of pair)tap(id);if(n!==3){assert(!d.querySelector('.circuit-lit'),'Open switch lit');click('[data-exp="toggle"]');}assert(d.querySelector('.circuit-lit'),'Repair/build not lit');}
          click('[data-exp="next"]');check('Perhati '+n);
          if(n===3)assert(d.querySelector('.repaired-wire'),'Repair not highlighted');if(n===4)assert(!d.querySelector('.circuit-lit'),'Comparison open wrong');
          while(d.querySelector('[data-exp="observe"]'))click('[data-exp="observe"]');if(n===4)assert(d.querySelector('.circuit-lit'),'Comparison closed wrong');
          click('[data-exp="next"]');check('Fikir '+n);click(`[data-exp="think"][data-value="${n===1?'yes':n===2?'bright':'wrong'}"]`);assert(d.querySelector('[data-exp="next"]').disabled,'Wrong reflection');click(`[data-exp="think"][data-value="${n===1?'no':n===2?'open':'correct'}"]`);click('[data-exp="next"]');check('Temui '+n);
          assert(p.isMissionComplete('mission'+n),'Missing completion');assert(completions===(n-1)*2+repeat+1,'Completion fired twice');assert(p.getData().progress.year2.electricity['mission'+n].attempts===attempts+repeat,'Duplicated listener/attempt');if(firstDate)assert(p.getData().progress.year2.electricity['mission'+n].completedAt===firstDate,'Timestamp erased');
          if(n===5)assert(d.body.textContent.includes('UNIT ELEKTRIK SELESAI!'),'Unit finale absent');if(!repeat)click('[data-exp="restart"]');
        }
        click('[data-exp="exit"]');check('hub');assert(d.querySelector(`[data-mission="electricity-${n}"]`).textContent.includes('Selesai'),'Hub stale');
      }
      assert(p.isUnitComplete()&&p.completedCount()===5,'Unit state inconsistent');
      // Leave each new activity from every phase; restarting must retain its saved completion.
      for(let n=3;n<=5;n++)for(let phase=0;phase<4;phase++){
        click(`[data-mission="electricity-${n}"]`);click('[data-exp="start"]');
        if(phase>0){click('[data-exp="predict"][data-value="no"]');click('[data-exp="next"]');}
        if(phase>1){if(n===4){click('[data-exp="toggle"]');click('[data-exp="toggle"]');}else{for(const id of n===3?['switch-left','bulb-left']:['bulb-right','battery-left'])tap(id);if(n===5)click('[data-exp="toggle"]');}click('[data-exp="next"]');}
        if(phase>2){while(d.querySelector('[data-exp="observe"]'))click('[data-exp="observe"]');click('[data-exp="next"]');}
        click('[data-exp="hint"]');click('[data-action="'+(phase%2?'home':'back')+'"]');if(phase%2){click('[data-route="yearSelect"]');click('[data-route="year2"]');click('[data-unit="electricity"]');}assert(p.isUnitComplete(),'Leaving erased completion');
      }
      if(name!=='blocked'){p.loadData();assert(p.isUnitComplete(),'Reload lost unit');}if(!['fresh','malformed','blocked'].includes(name)){assert(p.getData().profile.name==='Aina'&&!p.getData().settings.sound,'Settings/profile changed');assert(p.getData().custom===7&&p.getData().progress.year2.plants.keep===8,'Unrelated data changed');}assert(w.qaErrors.length===0,w.qaErrors.join(';'));
      output.textContent+=`PASS ${width}×${height} ${name}: 5 missions × 2 completions; unlock, replay, phase navigation, touch-style input, storage, no clipping/overflow/errors.\n`;
    }
    output.textContent+='ALL 40 SCENARIOS PASSED';
  }catch(e){output.textContent+='FAIL '+e.message;}finally{run.disabled=false;}
};
