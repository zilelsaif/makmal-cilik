'use strict';
// Shared Electricity circuit activities; lifecycle, PICO, steps and saves use MakmalExperiment.
window.MakmalCircuit = (() => {
  function createSession(def) {
    const fresh = () => ({ step: 0, prediction: false, selected: null, matched: {}, links: [...(def.initialLinks || [])], closed: !!def.initialClosed, seenOpen: false, seenClosed: false, observed: 0, thought: false, hints: 0, hintTarget: null, message: '', pose: 'neutral', saved: false });
    let state = fresh();
    const lit = () => state.links.length === def.connections.length && state.closed;
    const canAdvance = () => [state.prediction, def.mode === 'switch' ? state.seenOpen && state.seenClosed : lit(), state.observed === (def.observations?.length || 4) - 1, state.thought, false][state.step];
    function act(action, value) {
      state.hintTarget = null;
      if (action === 'predict' && state.step === 0 && ['yes', 'no'].includes(value)) {
        state.prediction = true; state.message = 'Terima kasih atas ramalan kamu. Jom uji sendiri!'; state.pose = 'thinking';
      }
      if (action === 'terminal' && state.step === 1) {
        const terminal = def.terminals.find(t => t.id === value);
        if (!terminal || state.links.some(i => def.connections[i].ends.includes(value))) return state;
        if (!state.selected) { state.selected = value; state.message = `${terminal.name} dipilih. Pilih terminal pada alat yang lain.`; state.pose = 'neutral'; }
        else if (state.selected === value) { state.selected = null; state.message = 'Pilihan dibatalkan. Pilih terminal untuk mencuba lagi.'; }
        else {
          const index = def.connections.findIndex(c => c.ends.includes(value) && c.ends.includes(state.selected));
          if (index >= 0 && !state.links.includes(index)) {
            state.links.push(index); state.selected = null; state.pose = 'happy';
            state.message = lit() ? 'Litar lengkap! Mentol sudah menyala.' : state.links.length === 3 ? 'Semua wayar bersambung. Sekarang periksa suis.' : 'Wayar sudah bersambung! Teruskan sambungan seterusnya.';
          } else { state.hintTarget = value; state.pose = 'thinking'; state.message = 'Sambungan ini belum sesuai. Ikut laluan bertitik dan cuba terminal lain.'; }
        }
      }
      if (action === 'toggle' && state.step === 1) { state.closed = !state.closed; state[state.closed ? 'seenClosed' : 'seenOpen'] = true; state.pose = lit() ? 'happy' : 'neutral'; state.message = lit() ? 'Mentol menyala. Litar lengkap dan suis ditutup.' : state.closed ? 'Suis sudah ditutup. Sambungkan semua wayar supaya litar lengkap.' : 'Suis terbuka. Laluan terputus dan mentol tidak menyala.'; }
      if (action === 'observe' && state.step === 2 && state.observed < (def.observations?.length || 4) - 1) state.observed++;
      if (action === 'think' && state.step === 3) { state.thought = value === (def.mode ? 'correct' : 'open'); state.pose = state.thought ? 'happy' : 'thinking'; state.message = state.thought ? (def.discovery || 'Betul! Suis terbuka memutuskan laluan dalam litar.') : 'Cuba perhatikan sambungan dan suis sekali lagi.'; }
      if (action === 'hint' && state.step < 4) {
        state.hints++; state.pose = 'hint';
        state.message = state.hints === 1 ? 'Pastikan semua komponen bersambung.' : state.hints === 2 ? 'Perhatikan terminal yang diserlahkan. Ikut laluan bertitik.' : 'Periksa suis. Adakah suis sudah ditutup?';
        if (def.hints) state.message = def.hints[Math.min(state.hints - 1, 2)];
        if (state.hints === 2 && state.step === 1) state.hintTarget = def.terminals.find(t => !state.links.some(i => def.connections[i].ends.includes(t.id)))?.id;
      }
      if (def.mode === 'switch' && action === 'hint' && state.step === 1) state.hintTarget = 'switch';
      if (action === 'next' && canAdvance()) { state.step++; state.selected = null; state.hints = 0; state.message = ''; state.pose = state.step === 4 ? 'success' : 'neutral'; }
      return state;
    }
    return { get state() { return state; }, lit, canAdvance, act, reset: () => { state = fresh(); return state; } };
  }
  function render(s, def) {
    const image = id => { const c = def.components.find(c => c.id === id); return `<img src="${c.image}" alt="${c.name}" data-fallback="${c.name}" width="90" height="90" draggable="false">`; };
    function board(interactive = false, forceOpen = false) {
      const switchInteractive = interactive && def.mode !== 'repair';
      const closed = def.mode === 'switch' && s.step === 2 ? s.observed === 1 : def.mode === 'switch' && s.step === 4 ? true : !forceOpen && s.closed, lit = s.links.length === 3 && closed;
      const focus = s.step === 2 ? (def.observationFocus || ['battery', 'wire', 'switch', 'bulb'])[s.observed] : '';
      return `<div class="circuit-board ${def.mode === 'finale' ? 'lab-repair' : ''} ${lit ? 'circuit-lit' : ''}" aria-label="Litar: ${lit ? 'mentol menyala' : 'mentol tidak menyala'}"><svg class="circuit-wires ${focus === 'wire' ? 'wire-focus' : ''}" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${def.connections.map((c, i) => `<path d="${c.path}" class="${s.links.includes(i) ? 'connected' : 'pending'} ${focus === 'repair' && i === 1 ? 'repaired-wire' : ''}"/>`).join('')}</svg>${['battery', 'switch', 'bulb'].map((id, i) => `<div class="circuit-component component-${id} ${focus === id ? 'observed' : ''}" style="--row:${i}">${id === 'switch' ? `<${switchInteractive ? 'button' : 'div'} ${switchInteractive ? `type="button" data-exp="toggle" aria-pressed="${closed}"` : ''} class="circuit-switch ${s.hintTarget === 'switch' ? 'hint-target' : ''} ${closed ? 'closed' : ''}"><span class="switch-mechanism" aria-hidden="true"><span></span></span><strong>Suis ${closed ? 'Tertutup' : 'Terbuka'}</strong></${switchInteractive ? 'button' : 'div'}>` : `<span class="circuit-art">${image(id)}</span><strong>${id === 'battery' ? 'Bateri' : lit ? 'Mentol menyala' : 'Mentol tidak menyala'}</strong>`}</div>`).join('')}${def.terminals.map(t => { const connected = s.links.some(i => def.connections[i].ends.includes(t.id)); return `<${interactive ? 'button' : 'span'} class="terminal ${connected ? 'connected' : ''} ${s.hintTarget === t.id ? 'hint-target' : ''}" style="left:${t.x}%;top:${t.y}%" ${interactive ? `data-terminal="${t.id}" aria-label="Terminal ${t.name}${connected ? ', bersambung' : ''}" aria-pressed="${s.selected === t.id}" ${connected ? 'disabled' : ''}` : 'aria-hidden="true"'}>${connected ? '✓' : t.name.endsWith('A') ? 'A' : 'B'}</${interactive ? 'button' : 'span'}>`; }).join('')}</div><p class="circuit-status" role="status">${s.links.length} / 3 wayar bersambung · ${lit ? '💡 Mentol menyala' : 'Mentol belum menyala'}</p>`;
    }
    if (def.mode) {
      if (s.step === 0) return `<h2 id="activity-heading" tabindex="-1">${def.prediction}</h2>${def.mode === 'finale' ? `<div class="repair-story">🔧 Lampu makmal perlukan bantuan kamu!<div class="available-tools">${image('battery')}${image('bulb')}<span>Suis · Wayar</span></div></div>` : ''}<p>Buat ramalan kamu. Kemudian kita uji bersama.</p><div class="answer-buttons">${def.choices.map((text,i) => `<button class="nav-button" data-exp="predict" data-value="${i ? 'no' : 'yes'}">${text}</button>`).join('')}</div>`;
      if (s.step === 1) return `<h2 id="activity-heading" tabindex="-1">${def.mode === 'repair' ? 'Cari dan baiki sambungan' : def.mode === 'switch' ? 'Cuba buka dan tutup suis' : 'Baiki lampu makmal'}</h2><p>${def.instruction}</p>${def.mode === 'switch' ? `<p class="switch-observations">${s.seenClosed ? '✓' : '○'} Cuba suis tertutup · ${s.seenOpen ? '✓' : '○'} Cuba suis terbuka</p>` : ''}${board(true)}${def.mode === 'finale' && s.links.length === 3 && s.closed ? '<p class="repair-celebration">✦ Lampu makmal kembali menyala! ✦</p>' : ''}<button class="nav-button" data-exp="restart">MULA SEMULA</button>`;
      if (s.step === 2) return `<h2 id="activity-heading" tabindex="-1">${def.mode === 'switch' ? 'Bandingkan keadaan suis' : 'Perhatikan hasil kamu'}</h2><p class="explanation">${def.observations[s.observed]}</p>${board()}${s.observed < def.observations.length - 1 ? '<button class="primary" data-exp="observe">PERHATI SETERUSNYA →</button>' : '<p>✓ Pemerhatian selesai.</p>'}`;
      if (s.step === 3) return `<h2 id="activity-heading" tabindex="-1">${def.question}</h2>${board()}<div class="answer-buttons">${def.answers.map((text,i) => `<button class="nav-button ${!i && s.thought ? 'answer-correct' : ''}" data-exp="think" data-value="${i ? 'wrong' : 'correct'}">${text}</button>`).join('')}</div>`;
      const unitComplete = window.MakmalProgress.isUnitComplete();
      const checklist = def.mode === 'finale' ? `<section class="unit-finale"><h3>${unitComplete ? 'UNIT ELEKTRIK SELESAI!' : 'Kemajuan Unit Elektrik'}</h3>${!unitComplete ? '<p>Teruskan misi yang belum selesai untuk melengkapkan unit.</p>' : '<p>✦ Lima misi, banyak penemuan! ✦</p>'}<ul>${window.MakmalContent.getUnit('electricity').missions.map(m => `<li><span>${window.MakmalProgress.isMissionComplete('mission' + m.number) ? '✓ Selesai' : 'Belum selesai'}</span> ${m.title}</li>`).join('')}</ul></section>` : '';
      return `<div class="completion"><span class="completion-check" aria-hidden="true">✓</span><h2 id="activity-heading" tabindex="-1">Misi Selesai</h2><p>${def.discovery}</p>${checklist}${board()}<div class="completion-actions"><button class="primary" data-exp="restart">MAIN SEMULA ↻</button><button class="nav-button" data-exp="exit">Kembali ke Senarai Misi</button></div></div>`;
    }
    if (s.step === 0) return `<h2 id="activity-heading" tabindex="-1">Adakah mentol akan menyala jika semua komponen tidak bersambung?</h2><p>Buat ramalan, kemudian uji di meja eksperimen.</p><div class="answer-buttons"><button class="nav-button" data-exp="predict" data-value="yes">Ya, menyala</button><button class="nav-button" data-exp="predict" data-value="no">Tidak menyala</button></div>`;
    if (s.step === 1) return `<h2 id="activity-heading" tabindex="-1">Sambung dan nyalakan!</h2><p>Sentuh satu terminal A/B, kemudian terminal di hujung laluan bertitik. Tutup suis selepas menyambung.</p>${board(true)}<button class="nav-button" data-exp="restart">MULA SEMULA</button>`;
    if (s.step === 2) return `<h2 id="activity-heading" tabindex="-1">Perhatikan litar kamu</h2><p class="explanation">${['Bateri membekalkan tenaga elektrik.', 'Wayar menyambungkan komponen.', 'Suis yang ditutup melengkapkan laluan.', 'Mentol menyala apabila litar lengkap dan suis ditutup.'][s.observed]}</p>${board()}${s.observed < 3 ? '<button class="primary" data-exp="observe">PERHATI SETERUSNYA →</button>' : '<p>✓ Keempat-empat bahagian telah diperhatikan.</p>'}`;
    if (s.step === 3) return `<h2 id="activity-heading" tabindex="-1">Mengapa mentol tidak menyala?</h2>${board(false, true)}<div class="answer-buttons"><button class="nav-button ${s.thought ? 'answer-correct' : ''}" data-exp="think" data-value="open">Suis terbuka</button><button class="nav-button" data-exp="think" data-value="bright">Mentol terlalu terang</button></div>`;
    return `<div class="completion"><span class="completion-check" aria-hidden="true">✓</span><h2 id="activity-heading" tabindex="-1">Misi Selesai</h2><p>Litar perlu lengkap supaya mentol boleh menyala.</p>${board()}<div class="completion-actions"><button class="primary" data-exp="restart">MAIN SEMULA ↻</button><button class="nav-button" data-exp="exit">Kembali ke Senarai Misi</button></div></div>`;
  }
  return { createSession, render };
})();
