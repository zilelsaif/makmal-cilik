const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let raw=null;
const box={window:{},localStorage:{getItem:()=>raw,setItem:(_,v)=>raw=v},Intl,Date,Math,console,crypto:require('node:crypto').webcrypto,performance:{now:()=>1},AbortController,Uint32Array};
box.window.window=box.window;box.window.crypto=box.crypto;box.window.performance=box.performance;
vm.createContext(box);const run=file=>vm.runInContext(fs.readFileSync(file,'utf8'),box,{filename:file});
run('js/progress.js');
for(const file of ['js/content/experiments/new-units.js','js/content/year2.js','js/content/experiments/electricity-mission1.js','js/content/experiments/electricity-mission2.js','js/content/experiments/electricity-missions3-5.js','js/content/experiments/light-dark.js','js/content/experiments/mixtures.js','js/content/experiments/plants.js','js/content/year3/index.js'])run(file);
for(const file of ['science-skills','lab-rules','humans','animals','plants','measurement','density','acid-alkali','solar-system','machines'])run(`js/content/year3/${file}.js`);
for(const year of [4,5,6,1]){run(`js/content/year${year}/index.js`);run(`js/content/year${year}/content.js`);}
run('js/content/replayability.js');run('js/engine/replay.js');
const p=box.window.MakmalProgress,r=box.window.MakmalReplay,registry=box.window.MakmalReplayRegistry;p.loadData();
const catalog=registry.catalog(),dynamic=Object.keys(registry.DYNAMIC);
assert.equal(catalog.length,290);assert.equal(dynamic.length,19);assert.equal(catalog.filter(x=>x.dynamic).length,19);
assert.deepEqual(Object.keys(registry.summary()).sort(),['discovery','sandbox','variable']);assert.equal(Object.values(registry.summary()).reduce((a,b)=>a+b,0),290);
for(const row of catalog)assert(['discovery','variable','sandbox'].includes(row.replayType),`missing classification ${row.id}`);
let cases=0;
for(const id of dynamic){
  const signatures=new Set();
  for(let i=0;i<100;i++){
    const seed=`${id}-seed-${i}`,a=r.providers[id].generate(seed),b=r.providers[id].generate(seed);cases++;
    assert.deepEqual(a,b,`non-deterministic ${id} ${seed}`);assert(Object.isFrozen(a));assert.equal(a.providerVersion,1);
    assert(a.trials.length>=2);assert.equal(new Set(a.trials.map(x=>x.id)).size,a.trials.length);assert(a.answers.length>=2);
    signatures.add(a.variantSignature);
  }
  assert(signatures.size>1,`no meaningful variation ${id}`);
  const first=r.createReplayRun(id,{seed:'duplicate-check'}),next=r.createReplayRun(id,{seed:'duplicate-check',lastVariantSignature:first.variantSignature});
  assert.notEqual(next.variantSignature,first.variantSignature,`duplicate prevention failed ${id}`);
}
assert.equal(cases,1900);
// Dynamic play data is profile-specific and never overwrites canonical completion timestamps.
const stamp='2026-01-02T03:04:05.000Z';p.saveData({...p.getData(),progress:{...p.getData().progress,year1:{magnets:{mission2:{completed:true,attempts:2,completedAt:stamp}}}}});
const runA=r.createReplayRun('y1-magnets-2',{seed:'A'});p.recordReplayStart('y1-magnets-2',runA);p.recordReplayComplete('y1-magnets-2',runA);p.recordReplayComplete('y1-magnets-2',runA);
assert.equal(p.getReplayStats('y1-magnets-2').runs,1);assert.equal(p.getReplayStats('y1-magnets-2').successfulRuns,1);assert.equal(p.getData().progress.year1.magnets.mission2.completedAt,stamp);
const firstProfile=p.getActiveProfile().id,second=p.addProfile('B').profile.id;assert.equal(p.getReplayStats('y1-magnets-2').runs,0);p.switchProfile(firstProfile);assert.equal(p.getReplayStats('y1-magnets-2').runs,1);p.switchProfile(second);
for(let i=0;i<12;i++){const x=r.createReplayRun('y1-magnets-2',{seed:'h'+i});p.recordReplayStart('y1-magnets-2',x);}assert.equal(p.getReplayStats('y1-magnets-2').recentVariantSignatures.length,8);
// v2.5.3 data with no replay block and malformed replay fields migrates without touching canonical progress.
raw=JSON.stringify({version:'2.5.3',settings:{sound:false},profiles:[{id:'legacy',name:'Lama',avatar:'pico',progress:{year1:{magnets:{mission2:{completed:true,attempts:4,completedAt:stamp}}},year2:{},year3:{},year4:{},year5:{},year6:{}},replay:{version:99,missions:{'y1-magnets-2':{runs:-4,successfulRuns:'bad',recentVariantSignatures:['ok',8,null]}}}}],activeProfileId:'legacy'});
p.loadData();assert.equal(p.getData().version,'2.6.0');assert.equal(p.forYear(1).isMissionComplete('mission2','magnets'),true);assert.equal(p.getData().progress.year1.magnets.mission2.completedAt,stamp);assert.equal(p.getReplayStats('y1-magnets-2').runs,0);assert.deepEqual(Array.from(p.getReplayStats('y1-magnets-2').recentVariantSignatures),['ok']);
console.log(`PASS ${cases} deterministic seed cases, 290 classifications, 19 dynamic providers, duplicate prevention, bounded/profile-safe replay storage.`);
