'use strict';
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
function context(raw, blocked = false) {
  let stored = raw;
  const sandbox = { window: {}, localStorage: { getItem: () => { if (blocked) throw Error('blocked'); return stored; }, setItem: (key, value) => { assert.equal(key, 'makmalCilikData'); if (blocked) throw Error('blocked'); stored = value; } } };
  vm.createContext(sandbox);
  for (const file of ['js/progress.js', 'js/content/experiments/electricity-mission1.js', 'js/engine/experiment.js']) vm.runInContext(fs.readFileSync(file, 'utf8'), sandbox);
  return sandbox.window;
}
for (const raw of [null, '{bad', '[]', JSON.stringify({ version: '0.2.0', settings: { sound: false, extra: 2 }, profile: { name: 'Aina' }, progress: { year2: { plants: { saved: true }, electricity: { extra: 7 } }, year1: { x: 9 } }, extra: 123 })]) {
  const api = context(raw); const p = api.MakmalProgress; const data = p.loadData();
  assert.equal(data.version, '1.4.0'); p.startMissionAttempt(); assert.equal(p.isMissionComplete(), false);
  p.completeMission(); const firstDate = p.getData().progress.year2.electricity.mission1.completedAt;
  p.startMissionAttempt(); assert.equal(p.isMissionComplete(), true); p.completeMission(); p.loadData();
  assert.equal(p.getData().progress.year2.electricity.mission1.attempts, 2);
  assert.equal(p.getData().progress.year2.electricity.mission1.completedAt, firstDate);
  if (raw?.includes('Aina')) { assert.equal(p.getData().profile.name, 'Aina'); assert.equal(p.getData().settings.sound, false); assert.equal(p.getData().settings.extra, 2); assert.equal(p.getData().progress.year1.x, 9); assert.equal(p.getData().progress.year2.plants.saved, true); assert.equal(p.getData().progress.year2.electricity.extra, 7); assert.equal(p.getData().extra, 123); }
}
const denied = context(null, true); denied.MakmalProgress.loadData(); denied.MakmalProgress.startMissionAttempt(); denied.MakmalProgress.completeMission(); assert(denied.MakmalProgress.isMissionComplete());
const api = context(null); const def = api.MakmalMission1;
for (let run = 0; run < 20; run++) {
  const game = api.MakmalExperiment.createSession(def);
  game.act('next'); assert.equal(game.state.step, 0);
  game.act('predict', 'wire'); assert(game.canAdvance()); game.act('predict', 'battery'); assert(game.canAdvance()); game.act('next');
  game.act('match', null, 'wire'); assert.equal(Object.keys(game.state.matched).length, 0);
  game.act('select', 'battery'); game.act('match', null, 'wire'); assert.equal(Object.keys(game.state.matched).length, 0);
  game.act('hint'); assert.equal(game.state.hintTarget, null); game.act('hint'); assert.equal(game.state.hintTarget, 'battery');
  for (const id of ['battery', 'bulb', 'wire', 'switch']) game.act('match', id, id);
  game.act('match', 'battery', 'battery'); assert.equal(Object.keys(game.state.matched).length, 4); game.act('next'); assert.equal(game.state.step, 2);
  game.act('next'); assert.equal(game.state.step, 2); for(let i=0;i<3;i++)game.act('observe'); game.act('next'); assert.equal(game.state.step,3);
  game.act('think','yes'); assert(!game.canAdvance());game.act('think','no');game.act('next');assert.equal(game.state.step,4);
  game.reset();assert.equal(game.state.step,0);assert.equal(Object.keys(game.state.matched).length,0);assert.equal(game.state.hints,0);
}
console.log('PASS: 20 repeated rule/reset runs; guarded steps; wrong guesses/matches; hints; all matches; observation order; reflection; migration; replay retention; blocked storage.');
