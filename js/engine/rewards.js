'use strict';
window.MakmalRewards = (() => {
  // Audio is optional. Register a source only after the corresponding asset exists.
  const sources = new Map();
  const allowed = new Set(['movement', 'measurement', 'classification', 'observation', 'yearComplete', 'watering', 'plantGrowth', 'correctMatch', 'recovery', 'hint', 'discovery', 'click', 'correct', 'wrong', 'complete', 'connection', 'switch', 'bulb', 'repair', 'unitComplete', 'lightOn', 'itemFound', 'shadowFormed', 'itemSelected', 'magnetPickup', 'sieveAction', 'stirring', 'separation']);
  const playing = new Set();
  function play(event) {
    if (!allowed.has(event) || !window.MakmalProgress.getData().settings.sound || !sources.has(event)) return;
    try {
      const audio = new Audio(sources.get(event));
      playing.add(audio);
      const release = () => playing.delete(audio);
      audio.addEventListener('ended', release, { once: true });
      audio.addEventListener('error', release, { once: true });
      Promise.resolve(audio.play()).catch(release);
    } catch (_) { /* Missing/blocked audio must never interrupt the experiment. */ }
  }
  function stop() { playing.forEach(audio => { audio.pause(); }); playing.clear(); }
  return { play, stop, register: (event, source) => { if (allowed.has(event) && typeof source === 'string') sources.set(event, source); } };
})();
