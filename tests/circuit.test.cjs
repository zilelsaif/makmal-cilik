const fs = require('node:fs'), vm = require('node:vm'), assert = require('node:assert/strict');
const w = { window: {}, localStorage: { getItem: () => null, setItem: () => {} } }; vm.createContext(w);
for (const path of ['js/progress.js','js/content/experiments/electricity-mission1.js','js/content/experiments/electricity-mission2.js','js/engine/circuit.js']) vm.runInContext(fs.readFileSync(path,'utf8'),w);
const def = w.window.MakmalMission2;
for (let run=0;run<20;run++) {
  const g=w.window.MakmalCircuit.createSession(def);
  g.act('next');assert.equal(g.state.step,0);
  g.act('predict',run%2?'yes':'no');g.act('next');assert.equal(g.state.step,1);
  g.act('toggle');assert(!g.lit());g.act('terminal','battery-left');g.act('terminal','battery-right');assert.equal(g.state.links.length,0);
  g.act('terminal','battery-left');
  for(const c of def.connections){for(const end of [...c.ends].reverse())g.act('terminal',end);}
  assert(g.lit());g.act('toggle');assert(!g.lit());g.act('next');assert.equal(g.state.step,1);
  g.act('hint');assert.equal(g.state.message,'Pastikan semua komponen bersambung.');g.act('hint');g.act('hint');assert(g.state.message.includes('suis'));
  g.act('toggle');g.act('next');g.act('next');assert.equal(g.state.step,2);
  for(let i=0;i<3;i++)g.act('observe');g.act('next');g.act('think','bright');assert(!g.canAdvance());g.act('think','open');g.act('next');assert.equal(g.state.step,4);
  g.reset();assert.equal(g.state.step,0);assert.equal(g.state.links.length,0);assert(!g.state.closed);assert(!g.lit());
}
for(const raw of [null,'{bad',JSON.stringify({version:'0.3.0',settings:{sound:false},profile:{name:'Aina'},custom:7,progress:{year2:{electricity:{mission1:{completed:true,attempts:4,completedAt:'first',custom:9}}}}})]) {
  let stored=raw;w.localStorage.getItem=()=>stored;w.localStorage.setItem=(k,v)=>stored=v;
  const p=w.window.MakmalProgress;p.loadData();const m1=JSON.stringify(p.getData().progress.year2.electricity?.mission1);
  assert.equal(p.getData().version,'1.5.0');p.startMissionAttempt('mission2');assert(!p.isMissionComplete('mission2'));p.completeMission('mission2');const date=p.getData().progress.year2.electricity.mission2.completedAt;p.startMissionAttempt('mission2');p.loadData();assert(p.isMissionComplete('mission2'));assert.equal(p.getData().progress.year2.electricity.mission2.attempts,2);assert.equal(p.getData().progress.year2.electricity.mission2.completedAt,date);assert.equal(JSON.stringify(p.getData().progress.year2.electricity.mission1),m1);
}
console.log('PASS: 20 circuit runs; both predictions; invalid/reversed connections; switch/incomplete gates; observation/reflection; reset; v0.3 migration; independent Mission 1/2 persistence and replay.');
