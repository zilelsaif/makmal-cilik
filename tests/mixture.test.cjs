const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let raw=null;const box={window:{},localStorage:{getItem:()=>raw,setItem:(k,v)=>raw=v}};vm.createContext(box);
for(const f of ['js/progress.js','js/content/experiments/mixtures.js','js/engine/mixture.js'])vm.runInContext(fs.readFileSync(f,'utf8'),box);
const {MakmalMixture:engine,MakmalMixtureContent:content,MakmalProgress:p}=box.window;
for(let n=1;n<=5;n++)for(let repeat=0;repeat<30;repeat++){
 const def=content.missions['mixtures-'+n],g=engine.createSession(def);g.act('next');assert.equal(g.state.step,0);
 if(n===4){g.act('predict','sugar:no');g.act('predict','salt:no');g.act('next');assert.equal(g.state.step,0);g.act('predict','sand:yes');}else g.act('predict',String(repeat%2));
 assert(g.canAdvance());g.act('next');assert.equal(g.state.step,1);assert(!g.canAdvance());g.act('hint');g.act('hint');assert(g.state.hintTarget);
 if(n===1){g.act('identify','unknown');assert.equal(g.state.found.length,0);for(const id of ['beans','sand','clips']){g.act('identify',id);g.act('identify',id);}assert.equal(g.state.found.length,3);}
 if([2,3,5].includes(n)){g.act('apply');assert.equal(g.state.stage,0);g.act('tool',n===2?'spoon':n===3?'magnet':'sieve');g.act('apply');assert.equal(g.state.stage,0);g.act('tool',n===3?'sieve':'magnet');g.act('apply');assert.equal(g.state.stage,1);g.act('apply');assert.equal(g.state.stage,1);if(n===5){assert(!g.canAdvance());g.act('tool','magnet');g.act('apply');assert.equal(g.state.stage,1);g.act('tool','sieve');g.act('apply');assert.equal(g.state.stage,2);}}
 if(n===4){g.act('stir');assert.equal(Object.keys(g.state.results).length,0);for(const id of ['sugar','salt','sand']){g.act('material',id);g.act('stir');assert(!Object.hasOwn(g.state.results,id));g.act('add');g.act('material','invalid');assert.equal(g.state.selected,id);g.act('material',id==='sugar'?'salt':'sugar');assert.equal(g.state.selected,id);g.act('stir');assert.equal(g.state.results[id],id!=='sand');g.act('stir');}assert.equal(Object.keys(g.state.results).length,3);g.act('material','sugar');assert.equal(g.state.selected,'sand');}
 assert(g.canAdvance());g.act('next');g.act('next');assert.equal(g.state.step,2);g.act('observe');g.act('next');g.act('think','wrong');assert(!g.canAdvance());g.act('think','correct');g.act('next');assert.equal(g.state.step,4);g.act('apply');g.act('stir');g.act('next');assert.equal(g.state.step,4);g.reset();assert.equal(g.state.step,0);assert.equal(g.state.stage,0);assert.equal(g.state.selected,null);assert.equal(Object.keys(g.state.results).length,0);assert.equal(g.state.found.length,0);assert(!g.state.added);
}
const old={completed:true,attempts:9,completedAt:'2026-01-01',extra:'keep'},all=Object.fromEntries([1,2,3,4,5].map(n=>['mission'+n,old]));
for(const value of [null,'{bad',JSON.stringify({version:'0.6.0',settings:{sound:false},profile:{name:'Aina'},progress:{year2:{electricity:all,lightDark:all,plants:{keep:true},mixtures:{mission3:old}}}})]){
 raw=value;p.loadData();assert.equal(p.getData().version,'1.2.0');const before=JSON.stringify([p.getData().settings,p.getData().profile,p.getData().progress.year2.electricity,p.getData().progress.year2.lightDark,p.getData().progress.year2.plants]);
 for(let n=1;n<=5;n++){assert(p.isAvailable(n,'mixtures'));const key='mission'+n;p.startMissionAttempt(key,'mixtures');p.completeMission(key,'mixtures');const date=p.getData().progress.year2.mixtures[key].completedAt;p.startMissionAttempt(key,'mixtures');p.completeMission(key,'mixtures');assert.equal(p.getData().progress.year2.mixtures[key].completedAt,date);}
 p.loadData();assert(p.isUnitComplete('mixtures'));assert.equal(JSON.stringify([p.getData().settings,p.getData().profile,p.getData().progress.year2.electricity,p.getData().progress.year2.lightDark,p.getData().progress.year2.plants]),before);
}
console.log('PASS: 150 mixture runs; wrong tools, sequence, per-material predictions, dissolve/reset guards, replay and v0.6 migration.');
