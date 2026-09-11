'use strict';
const output = document.getElementById('results');
const assert = (value, message) => { if (!value) throw Error(message); };
const delay = () => new Promise(resolve => setTimeout(resolve, 350));
document.getElementById('run').addEventListener('click', async () => {
  const run = document.getElementById('run'); run.disabled = true; output.textContent = '';
  const scenarios = [
    ['fresh', null], ['v0.2.0', JSON.stringify({version:'0.2.0',settings:{sound:false},profile:{name:'Aina'},progress:{year2:{plants:{keep:7}}}})],
    ['malformed', '{oops'], ['blocked', null], ['completed', JSON.stringify({version:'0.2.0',settings:{sound:false},profile:{name:'Saintis'},progress:{year2:{electricity:{mission1:{completed:true,attempts:3,completedAt:'2026-01-01T00:00:00.000Z'}}}}})]
  ];
  try {
    const html = await (await fetch('../index.html')).text();
    for (const [name, raw] of scenarios) {
      const frame = document.createElement('iframe');
      const [width,height]=[[1366,768],[1920,1080],[390,844],[360,640],[800,450]][scenarios.findIndex(s=>s[0]===name)];
      frame.style.width=width+'px';frame.style.height=height+'px';frame.style.maxWidth='none';
      const bootstrap = `<base href="../"><script>window.qaErrors=[];addEventListener('error',e=>{if(e.message)qaErrors.push(e.message)});addEventListener('unhandledrejection',e=>qaErrors.push(String(e.reason)));let raw=${JSON.stringify(raw)};Object.defineProperty(window,'localStorage',{value:{getItem:()=>{${name === 'blocked' ? "throw Error('blocked')" : 'return raw'}},setItem:(key,value)=>{${name === 'blocked' ? "throw Error('blocked')" : 'raw=value'}}}});<\/script>`;
      frame.srcdoc = html.replace('<head>', '<head>' + bootstrap);
      document.getElementById('frame').replaceChildren(frame);
      await new Promise(resolve => frame.addEventListener('load', resolve, {once:true}));
      const w = frame.contentWindow, d = frame.contentDocument;
      const click = selector => { const e=d.querySelector(selector);assert(e&&!e.disabled,'Unavailable '+selector);e.click(); assert(d.documentElement.scrollWidth<=width,'Mission1 overflow'); for(const item of d.querySelectorAll('button,h1,h2,p,.learning-steps'))assert(item.scrollWidth<=item.clientWidth+2&&item.scrollHeight<=item.clientHeight+2,'Mission1 clipped: '+item.textContent); };
      click('[data-route="mainMenu"]');click('[data-route="yearSelect"]');click('[data-route="year2"]');click('[data-unit="electricity"]');click('[data-mission="electricity-1"]');
      if (name==='completed') { assert(w.MakmalProgress.isMissionComplete(),'Replay erased completed');click('[data-exp="start"]'); }
      for(let replay=0;replay<3;replay++){
        assert(d.querySelector('[data-exp="next"]').disabled,'Step skipped');
        click('[data-exp="predict"][data-value="wire"]');assert(d.querySelector('[data-exp="next"]').disabled,'Wrong prediction accepted');
        click('[data-exp="predict"][data-value="battery"]');click('[data-exp="next"]');
        click('[data-label="battery"]');click('[data-target="wire"]');assert(!d.querySelector('[data-target="wire"]').disabled,'Wrong match accepted');
        click('[data-exp="hint"]');click('[data-exp="hint"]');assert(d.querySelector('.hint-target'),'Second hint missing');
        // Exercise touch pointer selection, drag cancellation, then the non-drag path.
        const label=d.querySelector('[data-label="wire"]'),rect=label.getBoundingClientRect();
        label.dispatchEvent(new w.PointerEvent('pointerdown',{bubbles:true,pointerId:20,pointerType:'touch',button:0,clientX:rect.x+10,clientY:rect.y+10}));
        d.getElementById('experiment-root').dispatchEvent(new w.PointerEvent('pointercancel',{bubbles:true,pointerId:20,pointerType:'touch'}));
        assert(!d.querySelector('.drag-label'),'Cancelled drag left a ghost');
        for(const id of ['battery','bulb','wire','switch']){click(`[data-label="${id}"]`);click(`[data-target="${id}"]`);}
        assert(!d.querySelector('[data-exp="next"]').disabled,'Matches incomplete');click('[data-exp="next"]');
        for(let i=0;i<3;i++)click('[data-exp="observe"]');click('[data-exp="next"]');
        click('[data-exp="think"][data-value="yes"]');assert(d.querySelector('[data-exp="next"]').disabled,'Wrong reflection accepted');click('[data-exp="think"][data-value="no"]');click('[data-exp="next"]');
        assert(w.MakmalProgress.isMissionComplete(),'Completion absent');
        assert(w.MakmalProgress.getData().progress.year2.electricity.mission1.attempts === (name==='completed'?4:1)+replay,'Attempt/listener duplication');
        const img=d.querySelector('.component-summary img');img.dispatchEvent(new w.Event('error'));assert(d.querySelector('.asset-fallback'),'Asset fallback absent');
        if(replay<2){click('[data-exp="restart"]');assert(w.MakmalProgress.isMissionComplete(),'Restart erased progress');}
      }
      click('[data-exp="exit"]');assert(d.querySelector('[data-mission="electricity-1"]').textContent.includes('Selesai'),'List stale');assert(d.querySelector('[data-mission="electricity-2"]').textContent.includes('Seterusnya'),'Mission2 unavailable');
      click('[data-mission="electricity-1"]');click('[data-exp="start"]');click('[data-action="back"]');assert(!d.querySelector('#experiment-root'),'Back failed');
      if(name==='v0.2.0'){assert(w.MakmalProgress.getData().profile.name==='Aina','Profile overwritten');assert(w.MakmalProgress.getData().progress.year2.plants.keep===7,'Other unit overwritten');assert(!w.MakmalProgress.getData().settings.sound,'Sound changed');}
      assert(w.qaErrors.length===0,'Runtime errors: '+w.qaErrors.join('; '));
      output.textContent += `PASS ${name} ${width}×${height}: 3 completions, replay retention, attempted-run counts, step gates, hints, cancellation, asset fallback, navigation, no runtime errors.\n`;
      await delay();
    }
    output.textContent += 'ALL SCENARIOS PASSED';
  } catch(error) { output.textContent += '\nFAIL '+error.message; } finally { run.disabled=false; }
});
