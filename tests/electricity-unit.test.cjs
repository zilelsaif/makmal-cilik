const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let raw=null;const w={window:{},localStorage:{getItem:()=>raw,setItem:(k,v)=>raw=v}};vm.createContext(w);
for(const file of ['js/progress.js','js/content/experiments/electricity-mission1.js','js/content/experiments/electricity-mission2.js','js/content/experiments/electricity-missions3-5.js','js/engine/circuit.js'])vm.runInContext(fs.readFileSync(file,'utf8'),w);
const p=w.window.MakmalProgress;
for(const save of [null,'{bad','[]','42',JSON.stringify({version:'0.3.0',settings:{sound:false},profile:{name:'Aina'},extra:9,progress:{year2:{plants:{keep:1},electricity:{mission1:{completed:true,attempts:3,completedAt:'old'}}}}}),JSON.stringify({version:'0.4.0',progress:{year2:{electricity:{mission1:{completed:true},mission2:{completed:true}}}}}),JSON.stringify({version:'0.4.0',progress:{year2:{electricity:{mission4:{completed:true}}}}})]) {
  raw=save;p.loadData();assert.equal(p.getData().version,'1.3.0');assert(p.isAvailable(1));assert(!p.isAvailable(0));assert(!p.isAvailable(6));assert(!p.isAvailable(NaN));
  if(save?.includes('mission2'))assert(p.isAvailable(3));
  if(save?.includes('mission4'))assert(p.isAvailable(4)&&p.isAvailable(5));
  const unrelated=JSON.stringify([p.getData().profile,p.getData().settings,p.getData().extra,p.getData().progress.year2.plants]);
  for(let n=1;n<=5;n++){assert(p.isAvailable(n));p.startMissionAttempt('mission'+n);p.completeMission('mission'+n);const first=p.getData().progress.year2.electricity['mission'+n].completedAt;p.startMissionAttempt('mission'+n);p.completeMission('mission'+n);assert.equal(p.getData().progress.year2.electricity['mission'+n].completedAt,first);}
  assert(p.isUnitComplete());assert.equal(p.completedCount(),5);p.loadData();assert(p.isUnitComplete());assert.equal(JSON.stringify([p.getData().profile,p.getData().settings,p.getData().extra,p.getData().progress.year2.plants]),unrelated);
}
for(let n=3;n<=5;n++)for(let repeat=0;repeat<30;repeat++){
  const def=w.window.MakmalCircuitMissions['electricity-'+n],g=w.window.MakmalCircuit.createSession(def);
  assert(!g.lit());g.act('predict',repeat%2?'yes':'no');g.act('next');assert.equal(g.state.step,1);g.act('next');assert.equal(g.state.step,1);
  if(n===4){g.act('toggle');assert(g.lit());assert(!g.canAdvance());g.act('toggle');assert(!g.lit());assert(g.canAdvance());g.act('toggle');assert(g.lit());}
  else {assert.equal(g.state.links.length,2);const missing=def.connections.find((c,i)=>!g.state.links.includes(i));g.act('terminal',missing.ends[0]);g.act('terminal',missing.ends[0]);assert.equal(g.state.selected,null);for(const end of missing.ends)g.act('terminal',end);if(n===5){assert(!g.lit());g.act('toggle');}assert(g.lit());}
  g.act('next');for(let i=1;i<def.observations.length;i++)g.act('observe');g.act('next');assert.equal(g.state.step,3);g.act('think','wrong');assert(!g.canAdvance());g.act('think','correct');g.act('next');assert.equal(g.state.step,4);g.reset();assert.equal(g.state.links.length,def.initialLinks.length);assert.equal(g.state.closed,def.initialClosed);assert(!g.state.seenOpen&&!g.state.seenClosed);assert(!g.lit());
}
console.log('PASS: 90 new-mission runs, both switch states required, deterministic reset, progression recovery, migrations, independent records, derived unit completion and replay timestamps.');
