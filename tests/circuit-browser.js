'use strict';
const out=document.getElementById('results');
const assert=(v,m)=>{if(!v)throw Error(m);};
document.getElementById('run').onclick=async()=>{
  const run=document.getElementById('run');run.disabled=true;out.textContent='';
  const sizes=[[1366,768],[1920,1080],[390,844],[360,640],[800,450]];
  const old={version:'0.3.0',settings:{sound:false},profile:{name:'Aina'},extra:8,progress:{year2:{plants:{keep:true},electricity:{mission1:{completed:true,attempts:4,completedAt:'first'}}}}};
  const scenarios=[['fresh',null],['migrated',JSON.stringify(old)],['malformed','{bad'],['replay',JSON.stringify({...old,progress:{year2:{electricity:{...old.progress.year2.electricity,mission2:{completed:true,attempts:2,completedAt:'first2'}}}}})]];
  try{
    const html=await(await fetch('../index.html')).text();
    for(const [width,height] of sizes) for(const [name,raw] of scenarios){
      const frame=document.createElement('iframe');frame.style.width=width+'px';frame.style.height=height+'px';
      const boot=`<base href="../"><script>window.qaErrors=[];addEventListener('error',e=>{if(e.message)qaErrors.push(e.message)});addEventListener('unhandledrejection',e=>qaErrors.push(String(e.reason)));let raw=${JSON.stringify(raw)};Object.defineProperty(window,'localStorage',{value:{getItem:()=>raw,setItem:(k,v)=>raw=v}});<\/script>`;
      frame.srcdoc=html.replace('<head>','<head>'+boot);document.getElementById('frame').replaceChildren(frame);await new Promise(r=>frame.onload=r);
      const w=frame.contentWindow,d=frame.contentDocument;
      // Mission 2 regression starts after its prerequisite; full-unit QA covers fresh progression.
      if(!w.MakmalProgress.isMissionComplete())w.MakmalProgress.completeMission();
      const click=selector=>{const el=d.querySelector(selector);assert(el&&!el.disabled,'Missing/disabled '+selector);el.scrollIntoView({block:'nearest'});el.click();};
      const check=label=>{assert(w.innerWidth===width&&w.innerHeight===height,'Viewport mismatch');assert(d.documentElement.scrollWidth<=width,'Overflow '+label);for(const el of d.querySelectorAll('button,h1,h2,p,.learning-steps'))assert(el.scrollWidth<=el.clientWidth+2&&el.scrollHeight<=el.clientHeight+2,'Clipped '+label+': '+el.textContent);for(const el of d.querySelectorAll('button'))assert(el.getBoundingClientRect().height>=44,'Small control '+label);};
      check('title');click('[data-route="mainMenu"]');check('menu');click('[data-route="yearSelect"]');check('years');click('[data-route="year2"]');check('hub');click('[data-unit="electricity"]');check('list');click('[data-mission="electricity-2"]');
      if(name==='replay')click('[data-exp="start"]');
      const before=w.MakmalProgress.getData().progress.year2.electricity.mission2.attempts;
      const mission1=JSON.stringify(w.MakmalProgress.getData().progress.year2.electricity.mission1);
      for(let repeat=0;repeat<2;repeat++){
        check('Ramal');click('[data-exp="predict"][data-value="yes"]');click('[data-exp="next"]');check('Cuba');
        const terminal=id=>{const e=d.querySelector(`[data-terminal="${id}"]`);e.dispatchEvent(new w.PointerEvent('pointerdown',{bubbles:true,pointerType:'touch',pointerId:11,button:0}));e.dispatchEvent(new w.PointerEvent('pointerup',{bubbles:true,pointerType:'touch',pointerId:11,button:0}));e.click();};
        terminal('battery-left');terminal('battery-right');assert(!d.querySelector('.circuit-lit'),'Invalid lit');assert(d.querySelectorAll('.circuit-wires .connected').length===0,'Invalid wire');terminal('battery-left');
        click('[data-exp="toggle"]');assert(!d.querySelector('.circuit-lit'),'Incomplete lit');click('[data-exp="toggle"]');
        click('[data-exp="hint"]');click('[data-exp="hint"]');assert(d.querySelector('.terminal.hint-target'),'Hint target missing');click('[data-exp="hint"]');
        for(const ends of [['battery-right','switch-right'],['switch-left','bulb-left'],['bulb-right','battery-left']])for(const end of ends)terminal(end);
        assert(!d.querySelector('.circuit-lit'),'Open switch lit');assert(d.querySelector('[data-exp="next"]').disabled,'Open switch advanced');
        click('[data-exp="toggle"]');assert(d.querySelector('.circuit-lit'),'Closed complete unlit');click('[data-exp="next"]');check('Perhati');
        for(let i=0;i<3;i++)click('[data-exp="observe"]');click('[data-exp="next"]');check('Fikir');assert(!d.querySelector('.circuit-lit'),'Challenge switch not open');
        click('[data-exp="think"][data-value="bright"]');assert(d.querySelector('[data-exp="next"]').disabled,'Wrong reflection');click('[data-exp="think"][data-value="open"]');click('[data-exp="next"]');check('Temui');
        assert(w.MakmalProgress.isMissionComplete('mission2'),'Missing completion');assert(w.MakmalProgress.getData().progress.year2.electricity.mission2.attempts===before+repeat,'Duplicate attempts');assert(JSON.stringify(w.MakmalProgress.getData().progress.year2.electricity.mission1)===mission1,'Mission1 changed');
        if(!repeat)click('[data-exp="restart"]');
      }
      click('[data-exp="restart"]');click('[data-exp="predict"][data-value="no"]');click('[data-exp="next"]');click('[data-exp="toggle"]');click('[data-exp="restart"]');click('[data-exp="predict"][data-value="no"]');click('[data-exp="next"]');assert(!d.querySelector('.circuit-lit')&&d.querySelectorAll('.circuit-wires .connected').length===0,'Reset dirty');assert(d.querySelector('[data-exp="toggle"]').getAttribute('aria-pressed')==='false','Reset switch');
      click('[data-action="back"]');assert(d.querySelector('[data-mission="electricity-2"]').textContent.includes('Selesai'),'List stale');assert(d.querySelector('[data-mission="electricity-3"]').textContent.includes('Seterusnya'),'Mission3 not unlocked');click('[data-mission="electricity-2"]');click('[data-exp="start"]');click('[data-action="home"]');assert(d.querySelector('[data-route="yearSelect"]'),'Home failed');
      w.MakmalProgress.loadData();assert(w.MakmalProgress.isMissionComplete('mission2'),'Reload loses save');assert(w.qaErrors.length===0,w.qaErrors.join(';'));
      out.textContent+=`PASS ${width}×${height} ${name}: five steps, touch-style input, replay/reset, saves, navigation, no overflow/clipping/errors.\n`;
    }
    out.textContent+='ALL 20 SCENARIOS PASSED';
  }catch(e){out.textContent+='FAIL '+e.message;}finally{run.disabled=false;}
};
