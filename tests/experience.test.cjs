const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let raw=null;const box={window:{},localStorage:{getItem:()=>raw,setItem:(k,v)=>raw=v}};vm.createContext(box);
for(const file of ['js/progress.js','js/content/year2.js','js/content/experiments/electricity-mission1.js','js/content/experiments/electricity-mission2.js','js/content/experiments/electricity-missions3-5.js','js/content/experiments/light-dark.js','js/content/experiments/mixtures.js','js/content/experience.js','js/engine/experience.js','js/engine/circuit.js','js/engine/light.js','js/engine/mixture.js','js/engine/experiment.js'])vm.runInContext(fs.readFileSync(file,'utf8'),box);
const w=box.window,p=w.MakmalProgress,ux=w.MakmalExperience;p.loadData();
const defs=[w.MakmalMission1,...Object.values(w.MakmalCircuitMissions),...Object.values(w.MakmalLightContent.missions),...Object.values(w.MakmalMixtureContent.missions)];
assert.equal(defs.length,15);
for(const def of defs){
 const engine=def.id==='electricity-1'?w.MakmalExperiment:def.terminals?w.MakmalCircuit:def.storageUnit==='lightDark'?w.MakmalLight:w.MakmalMixture;
 assert(ux.content(def.id).objective);assert.equal(ux.content(def.id).lines.length,5);
 for(const step of [0,1,2,3]){
  const s=engine.createSession(def).state;s.step=step;
  s.hints=1;assert.equal(ux.hint(s,def),null,def.id+' first hint reveals area');
  s.hints=2;assert(ux.hint(s,def),def.id+' second hint lacks target');
  s.hints=3;ux.hint(s,def);assert(s.message);s.hints=9;ux.hint(s,def);assert.equal(s.hints,3);
 }
 const html=ux.completion(def,def.storageUnit||'electricity');assert(html.includes('Misi Selesai'));assert(html.includes('Main Semula'));assert(!html.includes('circuit-board'));
}
const circuit=w.MakmalCircuit.createSession(w.MakmalMission2).state;circuit.step=1;circuit.links=[0,1,2];circuit.hints=2;assert.equal(ux.hint(circuit,w.MakmalMission2),'[data-exp="toggle"]');
const dissolve=w.MakmalMixture.createSession(w.MakmalMixtureContent.missions['mixtures-4']).state;dissolve.step=1;dissolve.selected='sugar';dissolve.added=true;dissolve.hints=2;assert.equal(ux.hint(dissolve,w.MakmalMixtureContent.missions['mixtures-4']),'[data-exp="stir"]');
const record={completed:true,attempts:7,completedAt:'2026-01-01',lastCompletedAt:'2026-02-01'},all=Object.fromEntries([1,2,3,4,5].map(n=>['mission'+n,record]));
const saved={version:'0.7.0',settings:{sound:false,extra:8},profile:{name:'Aina'},progress:{year2:{electricity:all,lightDark:all,mixtures:all,plants:{keep:1}}},extra:3};raw=JSON.stringify(saved);p.loadData();assert.equal(p.getData().version,'0.8.0');p.saveData();const migrated=JSON.parse(raw);delete migrated.version;delete saved.version;assert.deepEqual(migrated,saved);
assert(!ux.completion(w.MakmalMission1,'electricity').includes('unit-finale'),'Replay repeats unit finale');assert(ux.completion(w.MakmalMission1,'electricity',true).includes('5 / 5'));assert(ux.completion(w.MakmalCircuitMissions['electricity-5'],'electricity').includes('Kembali ke Tahun 2'));
console.log('PASS: 15 objectives/dialogue sets, 60 phase hint paths, contextual switch/stir hints, compact completion, no repeated unit celebration on ordinary replay, exact v0.7 save retention.');
