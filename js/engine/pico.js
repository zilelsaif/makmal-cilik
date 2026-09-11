'use strict';
window.MakmalPico = (() => {
  const states = new Set(['neutral', 'thinking', 'happy', 'hint', 'success']);
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
  function portrait() {
    return '<div class="pico"><img class="pico-image" src="assets/mascot/pico.webp" alt="PICO, robot pembantu makmal" width="200" height="200"><span class="pico-name">PICO</span></div>';
  }
  function dialogue(text, state = 'neutral') {
    return `<aside class="pico-dialogue pico-${states.has(state) ? state : 'neutral'}">${portrait()}<p role="status" aria-live="polite" aria-atomic="true">${escape(text)}</p></aside>`;
  }
  return { portrait, dialogue, escape };
})();
