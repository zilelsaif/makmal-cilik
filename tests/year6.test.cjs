const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let raw=null,blocked=false;const box={window:{},localStorage:{getItem(){if(blocked)throw Error('blocked');return raw;},setItem(k,v){if(blocked)throw Error('blocked');raw=v;}}};vm.createContext(box);
const files=['js/progress.js','js/content/year6/index.js','js/content/year6/content.js','js/engine/year6/core.js','js/engine/year6/activities.js'];for(const f of files)vm.runInContext(fs.readFileSync(f,'utf8'),box);
const w=box.window,p=w.MakmalProgress,y=p.forYear(6),units=w.MakmalYear6.units,defs=Object.values(w.MakmalYear6.missions);assert.equal(units.length,11);assert.equal(defs.length,55);assert(units.every(u=>u.missions.length===5));
const old={completed:true,attempts:7,completedAt:'old-date',custom:9},all=Object.fromEntries([1,2,3,4,5].map(n=>['mission'+n,old]));let runs=0;
for(const scenario of ['fresh','v1.5','partial','unit','full','malformed','blocked','bad-records']){
 blocked=scenario==='blocked';raw=scenario==='malformed'?'{bad':scenario==='fresh'?null:JSON.stringify({version:'1.5.0',settings:{sound:false,extra:2},profile:{name:'Aina'},extra:7,progress:{year2:{electricity:all,animals:all,future:{x:3}},year3:{humans:all,future:{x:4}},year4:{earth:all,future:{x:5}},year5:{heat:all,future:{x:6}},year6:scenario==='full'?Object.fromEntries(units.map(u=>[u.id,all])):scenario==='unit'?{microorganisms:all}:scenario==='partial'?{microorganisms:{mission3:old}}:scenario==='bad-records'?{microorganisms:{mission1:null,mission2:'bad',mission3:{attempts:-4}}}:{}}});
 p.loadData();assert.equal(p.APP_VERSION,'2.5.0');const before=JSON.stringify([p.getData().progress.year2,p.getData().progress.year3,p.getData().progress.year4,p.getData().progress.year5,p.getData().settings,p.getData().profile,p.getData().extra]);
 for(const d of defs){const session=w.MakmalYear6Lab.createSession(d),domain=w.MakmalYear6Domains[d.mode];assert(y.isAvailable(1,d.unitId));assert(!y.isAvailable(0,d.unitId));assert(!y.isAvailable(6,d.unitId));let date=p.getData().progress.year6[d.unitId]?.[d.progressKey]?.completedAt;
  for(let repeat=0;repeat<2;repeat++){
   y.startMissionAttempt(d.progressKey,d.unitId);session.reset();session.act('next');assert.equal(session.state.step,0);session.act('predict','1');session.act('next');assert.equal(session.state.step,1);assert(!session.canAdvance());
   session.act('invalid','garbage');assert(!session.canAdvance());session.act('read','9999');session.act('class','invalid');assert(!session.canAdvance());
   let steps=0;while(!session.canAdvance()){const [a,v]=domain.hint(session.state,d);session.act(a,v);assert(++steps<100,d.id+' stuck on '+a);}
   assert(domain.solved(session.state,d),d.id);session.act('next');while(session.state.observed<d.observations.length-1)session.act('observe');session.act('next');session.act('think','wrong');assert(!session.canAdvance());session.act('think','correct');session.act('next');assert.equal(session.state.step,4);y.completeMission(d.progressKey,d.unitId);
   const saved=p.getData().progress.year6[d.unitId][d.progressKey];assert(saved.completed&&saved.attempts>=1);if(date)assert.equal(saved.completedAt,date);date=saved.completedAt;assert.equal(JSON.stringify([p.getData().progress.year2,p.getData().progress.year3,p.getData().progress.year4,p.getData().progress.year5,p.getData().settings,p.getData().profile,p.getData().extra]),before);runs++;
  }
  assert(y.isAvailable(Math.min(d.number+1,5),d.unitId));
 }
 assert.equal(y.completedTotal(),55);assert.equal(y.completedUnits(),11);assert(y.isYearComplete());if(!blocked){p.loadData();assert.equal(y.completedTotal(),55);}
}
// Independent curriculum and interaction invariants.
const expectedUnits=['Kemahiran Saintifik','Mikroorganisma','Interaksi Antara Hidupan','Pemeliharaan dan Pemuliharaan','Daya','Kelajuan','Pengawetan Makanan','Bahan Buangan','Gerhana','Buruj','Mesin'];
assert.deepEqual(Array.from(units,u=>u.title),expectedUnits);
for(const d of defs){assert.equal(d.year,6);assert(d.discovery&&d.question&&d.actions.length>=2);assert.equal(d.choices.length,2);assert.equal(d.answers[0],d.discovery);}
assert(w.MakmalYear6.missions['y6-microorganisms-3'].discovery.includes('berguna'));
assert(w.MakmalYear6.missions['y6-living-interactions-5'].discovery.includes('mempengaruhi'));
assert(w.MakmalYear6.missions['y6-speed-4'].discovery.includes('jarak ÷ masa'));
assert(w.MakmalYear6.missions['y6-eclipses-2'].discovery.includes('jangan pandang Matahari'));
assert(w.MakmalYear6.missions['y6-eclipses-5'].discovery.includes('tidak berlaku setiap bulan'));
assert(w.MakmalYear6.missions['y6-waste-4'].discovery.includes('mengurangkan sisa'));
console.log('PASS '+runs+' Year 6 mission runs across eight storage states; all 55 definitions, guarded interactions, curriculum invariants, unlock, replay, timestamps and Year 2/3/4/5 preservation.');
