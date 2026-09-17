'use strict';
window.MakmalExperiment = (() => {
  function createState() {
    return { step: 0, prediction: false, predictionChoice: null, selected: null, matched: {}, observed: 0, thought: false, hints: 0, hintTarget: null, message: '', pose: 'neutral', saved: false };
  }
  // Mission-specific rules stay small; mounting, steps, reset and input hooks are shared.
  function createSession(definition) {
    let state = createState();
    const has = id => definition.components.some(component => component.id === id);
    const canAdvance = () => state.step === 0 ? state.prediction : state.step === 1 ? Object.keys(state.matched).length === 4 : state.step === 2 ? state.observed === 3 : state.step === 3 ? state.thought : false;
    function act(action, value, target) {
      state.hintTarget = null;
      if (action === 'predict' && state.step === 0 && has(value)) {
        state.prediction = true; state.predictionChoice = value;
        state.message = 'Ramalan disimpan. Mari kenali kegunaan setiap alat.';
        state.pose = 'thinking';
      }
      if (action === 'select' && state.step === 1 && has(value) && !state.matched[value]) {
        state.selected = value; state.pose = 'neutral';
        state.message = `Label ${definition.components.find(c => c.id === value).name} dipilih. Sentuh alat yang sepadan.`;
      }
      if (action === 'match' && state.step === 1 && has(target) && !state.matched[target]) {
        const label = value || state.selected;
        if (!has(label) || state.matched[label]) { state.message = 'Pilih satu label dahulu, kemudian sentuh alatnya.'; return state; }
        if (label === target) {
          state.matched[target] = true; state.selected = null; state.pose = 'happy';
          state.message = Object.keys(state.matched).length === 4 ? 'Keempat-empat label sudah sepadan!'  : 'Sepadan! Pilih alat yang lain.';
        } else { state.selected = label; state.pose = 'thinking'; state.message = 'Belum sepadan. Lihat bentuk alat dan cuba lagi.'; }
      }
      if (action === 'observe' && state.step === 2 && state.observed < 3) { state.observed++; state.message = ''; state.pose = 'neutral'; }
      if (action === 'think' && state.step === 3) {
        state.thought = value === 'no'; state.pose = state.thought ? 'happy' : 'thinking';
        state.message = state.thought ? 'Betul! Wayar perlu disambungkan supaya litar boleh lengkap.' : 'Cuba fikir semula. Jika sambungan terputus, laluan elektrik tidak lengkap.';
      }
      if (action === 'hint' && state.step < 4) {
        state.hints++; state.pose = 'hint';
        state.message = 'Lihat bentuk setiap alat dan padankan dengan namanya.';
        if (state.hints > 1) {
          const id = state.step === 1 ? state.selected || definition.components.find(c => !state.matched[c.id])?.id : state.step === 0 ? 'battery' : null;
          state.hintTarget = id;
          if (id) state.message = `Perhatikan alat yang diserlahkan: ${definition.components.find(c => c.id === id).name}.`;
          else state.message = state.step === 3 ? 'Wayar menjadi penyambung. Sambungan yang terputus tidak membentuk litar lengkap.' : 'Perhatikan alat yang sedang diserlahkan dan baca kegunaannya.';
        }
      }
      if (action === 'next' && canAdvance()) { state.step++; state.message = ''; state.pose = state.step === 4 ? 'success' : 'neutral'; state.selected = null; state.hints = 0; }
      return state;
    }
    return { get state() { return state; }, canAdvance, act, reset: () => { state = createState(); return state; } };
  }
  function mount(root, { onExit, missionId = 'electricity-1' }) {
    const year3=Boolean(window.MakmalYear3?.missions[missionId]);
    const year4=Boolean(window.MakmalYear4?.missions[missionId]);
    const discovery = Boolean(window.MakmalNewContent?.missions[missionId]);
    const plants = missionId.startsWith('plants-');
    const mixture = missionId.startsWith('mixtures-');
    const light = missionId.startsWith('light-dark-');
    const circuit = !year3 && !year4 && !discovery && !plants && !mixture && !light && missionId !== 'electricity-1';
    const definition = year4 ? window.MakmalYear4.missions[missionId] : year3 ? window.MakmalYear3.missions[missionId] : discovery ? window.MakmalNewContent.missions[missionId] : plants ? window.MakmalPlantContent.missions[missionId] : mixture ? window.MakmalMixtureContent.missions[missionId] : light ? window.MakmalLightContent.missions[missionId] : circuit ? window.MakmalCircuitMissions[missionId] : window.MakmalMission1;
    const progressKey = definition.progressKey || 'mission1';
    const storageUnit = definition.storageUnit || 'electricity';
    const session = year4 ? window.MakmalYear4Lab.createSession(definition) : year3 ? window.MakmalYear3Lab.createSession(definition) : discovery ? window.MakmalDiscovery.createSession(definition) : plants ? window.MakmalPlants.createSession(definition) : mixture ? window.MakmalMixture.createSession(definition) : light ? window.MakmalLight.createSession(definition) : circuit ? window.MakmalCircuit.createSession(definition) : createSession(definition);
    const progress = year4 ? window.MakmalProgress.forYear(4) : year3 ? window.MakmalProgress.forYear(3) : window.MakmalProgress;
    const yearComplete=()=>year4||year3?progress.isYearComplete():progress.isYear2Complete();
    const controller = new AbortController();
    let disposed = false, renderedStep = -1, feedback = '', hintSelector = null;
    const ux = window.MakmalExperience;
    const presentation = ux.content(missionId);
    let replayIntro = progress.isMissionComplete(progressKey, storageUnit);
    const image = (component, named = true) => `<img src="${component.image}" alt="${named ? component.name : component.visual}" data-fallback="${named ? component.name : component.visual}" width="160" height="160" draggable="false">`;
    function start() { window.MakmalRewards.stop(); replayIntro = false; session.reset(); renderedStep = -1; feedback = ''; hintSelector = null; progress.startMissionAttempt(progressKey, storageUnit); window.MakmalRewards.play('click'); draw(); }
    function draw(focusSelector) {
      if (disposed) return;
      const s = session.state;
      if (replayIntro) {
        root.innerHTML = `<section class="experiment-replay"><span class="badge">✓ Selesai</span><h1>${definition.title}</h1><p class="mission-objective">${presentation.objective}</p>${window.MakmalPico.dialogue('Mahu cuba sekali lagi? Penemuan kamu tetap disimpan.', 'happy')}<button class="primary" data-exp="start">Main Semula ↻</button><button class="nav-button" data-exp="exit">Kembali ke Senarai Misi</button></section>`;
        return;
      }
      const current = definition.components?.[s.observed];
      const rail = `<ol class="learning-steps" aria-label="Lima langkah pembelajaran">${definition.steps.map((step, index) => `<li ${index === s.step ? 'aria-current="step"' : ''} class="${index < s.step ? 'step-done' : ''}"><span aria-hidden="true">${index < s.step ? '✓' : index + 1}</span><strong>${step}</strong></li>`).join('')}</ol>`;
      let activity = '';
      if (!year3 && !year4 && !discovery && !plants && !circuit && !light && !mixture) {
      if (s.step === 0) activity = `<h2 id="activity-heading" tabindex="-1">Alat manakah membekalkan tenaga?</h2><p class="activity-instruction">Sentuh satu alat untuk membuat ramalan.</p><div class="component-grid">${definition.components.map(c => `<button class="component-card ${s.predictionChoice === c.id ? 'matched' : ''} ${s.hintTarget === c.id ? 'hint-target' : ''}" data-exp="predict" data-value="${c.id}" aria-pressed="${s.predictionChoice === c.id}">${image(c)}<strong>${c.name}</strong>${s.predictionChoice === c.id ? '<span>✓ Ramalan kamu</span>' : ''}</button>`).join('')}</div>`;
      if (s.step === 1) activity = `<h2 id="activity-heading" tabindex="-1">Padankan nama dengan alat</h2><p class="activity-instruction">Pilih label → sentuh alat, atau seret label ke alat. <strong>${Object.keys(s.matched).length} / 4 sepadan</strong></p><div class="label-tray" role="group" aria-label="Label peralatan">${['wire', 'battery', 'switch', 'bulb'].map(id => { const c = definition.components.find(c => c.id === id); return `<button class="label-chip" data-label="${c.id}" aria-pressed="${s.selected === c.id}" ${s.matched[c.id] ? 'disabled' : ''}>${c.name}${s.matched[c.id] ? ' ✓' : ''}</button>`; }).join('')}</div><div class="component-grid">${definition.components.map((c, i) => `<button class="component-card ${s.matched[c.id] ? 'matched' : ''} ${s.hintTarget === c.id ? 'hint-target' : ''}" data-target="${c.id}" aria-label="${s.matched[c.id] ? c.name + ', sudah sepadan' : 'Padankan pada alat ' + (i + 1) + ': ' + c.visual}" ${s.matched[c.id] ? 'disabled' : ''}>${image(c, !!s.matched[c.id])}<strong>${s.matched[c.id] ? '✓ ' + c.name : 'Alat ' + (i + 1)}</strong><span>${s.matched[c.id] ? 'Sepadan' : 'Letakkan label di sini'}</span></button>`).join('')}</div>`;
      if (s.step === 2) activity = `<h2 id="activity-heading" tabindex="-1">Perhatikan: ${current.name}</h2><div class="observation"><div class="component-card observed">${image(current)}<strong>${current.name}</strong></div><div><p class="observation-count">Alat ${s.observed + 1} daripada 4</p><p class="explanation">${current.explanation}</p>${s.observed < 3 ? '<button class="primary" data-exp="observe">ALAT SETERUSNYA →</button>' : '<p class="observed-all">✓ Kamu sudah perhatikan keempat-empat alat.</p>'}</div></div>`;
      if (s.step === 3) activity = `<h2 id="activity-heading" tabindex="-1">Fikirkan sambungannya</h2><div class="think-panel">${image(definition.components[2])}<p>Jika wayar tidak disambungkan,<br>adakah litar boleh lengkap?</p></div><div class="answer-buttons"><button class="nav-button" data-exp="think" data-value="yes">Ya, boleh lengkap</button><button class="nav-button ${s.thought ? 'answer-correct' : ''}" data-exp="think" data-value="no">Tidak, belum lengkap</button></div>`;
      }
      if (year3 && s.step < 4) activity = window.MakmalYear3Lab.render(s, definition);
      if (year4 && s.step < 4) activity = window.MakmalYear4Lab.render(s, definition);
      if (discovery && s.step < 4) activity = window.MakmalDiscovery.render(s, definition);
      if (plants && s.step < 4) activity = window.MakmalPlants.render(s, definition);
      if (mixture && s.step < 4) activity = window.MakmalMixture.render(s, definition);
      if (light && s.step < 4) activity = window.MakmalLight.render(s, definition);
      if (circuit && s.step < 4) activity = window.MakmalCircuit.render(s, definition);
      if (s.step === 4) activity = ux.completion(definition, storageUnit, feedback === 'unitComplete');
      const actions = s.step < 4 ? `<div class="experiment-actions"><div class="hint-control"><button class="hint-button" data-exp="hint">💡 Hint</button><span class="hint-level">${s.hints ? Math.min(s.hints,3)+' / 3' : ''}</span></div><button class="primary" data-exp="next" ${session.canAdvance() ? '' : 'disabled'}>${s.step === 3 ? 'Temui' : 'Seterusnya'} →</button></div>` : '';
      const picoText = s.message || presentation.lines[s.step];
      if (renderedStep !== s.step) {
        root.innerHTML = `<header class="experiment-title"><div><p class="section-kicker">SAINS TAHUN ${year4?4:year3?3:2} · ${definition.unitTitle || 'ELEKTRIK'} · MISI ${definition.number || 1}</p><h1>${definition.title}</h1>${s.step===0?`<p class="mission-objective">${presentation.objective}</p>`:''}</div><span class="badge">${s.step + 1} / 5 langkah</span></header><div class="experiment-layout">${rail}<div class="experiment-main">${window.MakmalPico.dialogue(picoText, s.pose)}<p class="feedback-note" role="status" aria-live="polite"></p><section class="workbench" aria-labelledby="activity-heading">${activity}</section>${actions}</div></div>`;
        renderedStep = s.step;
      } else {
        // Keep the mascot, live region and step rail stable while an activity changes.
        if (feedback !== 'hint') root.querySelector('.workbench').innerHTML = activity;
        const bubble=root.querySelector('.pico-dialogue');
        bubble.className='pico-dialogue pico-'+s.pose;
        bubble.querySelector('p').textContent=picoText;
        const next=root.querySelector('[data-exp="next"]'); if(next)next.disabled=!session.canAdvance();
        const level=root.querySelector('.hint-level');if(level)level.textContent=s.hints?Math.min(s.hints,3)+' / 3':'';
      }
      root.dataset.unit = storageUnit;
      root.dataset.feedback = feedback;
      const note=root.querySelector('.feedback-note');note.textContent=ux.label[feedback]||'';
      note.hidden=!feedback;
      root.querySelectorAll('[data-exp="restart"]').forEach(button=>button.textContent='Main Semula ↻');
      root.querySelectorAll('[data-exp="observe"]').forEach(button=>button.textContent='Perhati Seterusnya →');
      // Aria selection survives redraws for the prediction/reflection buttons.
      root.querySelectorAll('[data-exp="predict"]').forEach(button=>{if(s.lastPrediction!==undefined)button.setAttribute('aria-pressed',String(button.dataset.value===s.lastPrediction));});
      root.querySelectorAll('[data-exp="think"]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.value===s.lastThought)));
      root.querySelectorAll('.hint-target').forEach(el=>el.classList.remove('hint-target'));
      if(hintSelector)root.querySelector(hintSelector)?.classList.add('hint-target');
      if (focusSelector) {
        const preferred=root.querySelector(focusSelector);
        const fallback=root.querySelector('[data-exp="next"]:not(:disabled)')||root.querySelector('.workbench button:not(:disabled)')||root.querySelector('#activity-heading');
        (preferred&&!preferred.disabled?preferred:fallback)?.focus({preventScroll:true});
      }
    }
    function dispatch(action, value, target) {
      if (replayIntro || disposed) return;
      const before = session.state.step, ready = session.canAdvance();
      const matched = Object.keys(session.state.matched).length;
      const wasLit = circuit && session.lit();
      const wasYearComplete = yearComplete();
      const wasUnitComplete = progress.isUnitComplete(storageUnit);
      session.act(action, value, target);
      const s = session.state;
      hintSelector=null;
      let event='click';feedback='';
      if(action==='predict'){if(!(mixture&&definition.mode==='dissolve')&&!(plants&&definition.mode==='needs'))s.lastPrediction=value;}
      if(action==='think')s.lastThought=value;
      if(action==='hint'){hintSelector=ux.hint(s,definition);event='hint';feedback='hint';}
      else if(s.step!==before){event=s.step===4?'complete':s.step===3?'discovery':'click';feedback=s.step===4?'complete':'step';}
      else if(action==='think'||action==='match'){const correct=action==='think'?s.thought:Object.keys(s.matched).length>matched;event=correct?'correct':'wrong';feedback=event;}
      else if(circuit&&action==='terminal'){event=s.pose==='happy'?'connection':s.pose==='thinking'?'wrong':'click';feedback=s.pose==='happy'?'correct':s.pose==='thinking'?'wrong':'';}
      else if(circuit&&action==='toggle'){event='switch';feedback='';}
      else if((year4||year3||discovery||plants||light||mixture)&&s.effect){event=s.effect;feedback=event==='wrong'?'wrong':['correct','itemFound','magnetPickup','sieveAction','stirring','watering','plantGrowth','correctMatch','recovery','measurement','classification','observation'].includes(event)?'correct':'';}
      if(circuit&&!wasLit&&session.lit()){event=definition.mode==='repair'?'repair':'bulb';feedback='correct';}
      if(!ready&&session.canAdvance()&&before===1)feedback='step';
      if(s.step===4&&!s.saved){progress.completeMission(progressKey,storageUnit);s.saved=true;if(!wasUnitComplete&&progress.isUnitComplete(storageUnit)){event='unitComplete';feedback='unitComplete';}}
      if(s.step===4&&!wasYearComplete&&yearComplete())event='yearComplete';
      window.MakmalRewards.play(event);
      const focus=s.step!==before||action==='observe'?'#activity-heading':action==='select'?`[data-label="${s.selected}"]`:action==='match'?(session.canAdvance()?'[data-exp="next"]':'[data-label]:not(:disabled)'):action==='hint'?'[data-exp="hint"]':action==='terminal'?`[data-terminal="${value}"]:not(:disabled)`:`[data-exp="${action}"]${value===undefined?'':`[data-value="${value}"]`}`;
      draw(focus);
      if(s.step!==before||action==='observe')root.querySelector('#activity-heading')?.scrollIntoView({block:'nearest',behavior:'instant'});
    }
    root.addEventListener('click', event => {
      const button = event.target.closest('[data-exp]');
      if (!button || button.disabled || event.detail > 1) return;
      const action = button.dataset.exp;
      if (action === 'exit') { onExit(); window.MakmalRewards.play('click'); return; }
      if (action === 'yearComplete') { window.MakmalRouter.navigate(year4?'year4Complete':year3?'year3Complete':'year2Complete'); window.MakmalRewards.play('click'); return; }
      if (action === 'year2') { window.MakmalRouter.navigate(year4?'year4':year3?'year3':'year2'); window.MakmalRewards.play('click'); return; }
      if (action === 'start' || action === 'restart') { start(); root.querySelector('#activity-heading')?.focus(); return; }
      dispatch(action, button.dataset.value);
    }, { signal: controller.signal });
    const detach = window.MakmalInteraction.attach(root, { select: id => dispatch('select', id), match: (id, target) => dispatch('match', id, target), terminal: id => dispatch('terminal', id) });
    if (!replayIntro) progress.startMissionAttempt(progressKey, storageUnit);
    draw();
    return () => { disposed = true; controller.abort(); detach(); window.MakmalRewards.stop(); };
  }
  return { createSession, mount };
})();
