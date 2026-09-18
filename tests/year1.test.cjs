const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let raw=null,blocked=false;const box={window:{},localStorage:{getItem(){if(blocked)throw Error('blocked');return raw;},setItem(k,v){if(blocked)throw Error('blocked');raw=v;}}};vm.createContext(box);
const files=['js/progress.js','js/content/year1/index.js','js/content/year1/content.js','js/engine/year1/core.js','js/engine/year1/activities.js'];for(const f of files)vm.runInContext(fs.readFileSync(f,'utf8'),box);
const w=box.window,p=w.MakmalProgress,y=p.forYear(1),units=w.MakmalYear1.units,defs=Object.values(w.MakmalYear1.missions);assert.equal(units.length,10);assert.equal(defs.length,50);assert(units.every(u=>u.missions.length===5));
const old={completed:true,attempts:7,completedAt:'old-date',custom:9},all=Object.fromEntries([1,2,3,4,5].map(n=>['mission'+n,old]));let runs=0;
for(const scenario of ['fresh','v1.5','partial','unit','full','malformed','blocked','bad-records']){
 blocked=scenario==='blocked';raw=scenario==='malformed'?'{bad':scenario==='fresh'?null:JSON.stringify({version:'1.5.0',settings:{sound:false,extra:2},profile:{name:'Aina'},extra:7,progress:{year2:{electricity:all,animals:all,future:{x:3}},year3:{humans:all,future:{x:4}},year4:{earth:all,future:{x:5}},year5:{heat:all,future:{x:6}},year6:{machines:all,future:{x:7}},year1:scenario==='full'?Object.fromEntries(units.map(u=>[u.id,all])):scenario==='unit'?{magnets:all}:scenario==='partial'?{magnets:{mission3:old}}:scenario==='bad-records'?{magnets:{mission1:null,mission2:'bad',mission3:{attempts:-4}}}:{}}});
 p.loadData();assert.equal(p.APP_VERSION,'2.4.0');const before=JSON.stringify([p.getData().progress.year2,p.getData().progress.year3,p.getData().progress.year4,p.getData().progress.year5,p.getData().progress.year6,p.getData().settings,p.getData().profile,p.getData().extra]);
 for(const d of defs){const session=w.MakmalYear1Lab.createSession(d),domain=w.MakmalYear1Domains[d.mode];assert(y.isAvailable(1,d.unitId));assert(!y.isAvailable(0,d.unitId));assert(!y.isAvailable(6,d.unitId));let date=p.getData().progress.year1[d.unitId]?.[d.progressKey]?.completedAt;
  for(let repeat=0;repeat<2;repeat++){
   y.startMissionAttempt(d.progressKey,d.unitId);session.reset();session.act('next');assert.equal(session.state.step,0);session.act('predict','1');session.act('next');assert.equal(session.state.step,1);assert(!session.canAdvance());
   session.act('invalid','garbage');assert(!session.canAdvance());session.act('read','9999');session.act('class','invalid');assert(!session.canAdvance());
   let steps=0;while(!session.canAdvance()){const [a,v]=domain.hint(session.state,d);session.act(a,v);assert(++steps<100,d.id+' stuck on '+a);}
   assert(domain.solved(session.state,d),d.id);session.act('next');while(session.state.observed<d.observations.length-1)session.act('observe');session.act('next');session.act('think','wrong');assert(!session.canAdvance());session.act('think','correct');session.act('next');assert.equal(session.state.step,4);y.completeMission(d.progressKey,d.unitId);
   const saved=p.getData().progress.year1[d.unitId][d.progressKey];assert(saved.completed&&saved.attempts>=1);if(date)assert.equal(saved.completedAt,date);date=saved.completedAt;assert.equal(JSON.stringify([p.getData().progress.year2,p.getData().progress.year3,p.getData().progress.year4,p.getData().progress.year5,p.getData().progress.year6,p.getData().settings,p.getData().profile,p.getData().extra]),before);runs++;
  }
  assert(y.isAvailable(Math.min(d.number+1,5),d.unitId));
 }
 assert.equal(y.completedTotal(),50);assert.equal(y.completedUnits(),10);assert(y.isYearComplete());if(!blocked){p.loadData();assert.equal(y.completedTotal(),50);}
}
// Year 1 curriculum, reading-load and interaction invariants.
const expectedUnits=['Kemahiran Saintifik','Peraturan Bilik Sains','Benda Hidup dan Benda Bukan Hidup','Manusia','Haiwan','Tumbuhan','Magnet','Penyerapan','Bumi','Asas Binaan'];
assert.deepEqual(Array.from(units,u=>u.title),expectedUnits);
for(const d of defs){assert.equal(d.year,1);assert(d.discovery&&d.question&&d.actions.length>=2&&d.actions.length<=5);assert.equal(d.choices.length,2);assert.equal(d.answers[0],d.discovery);assert(d.title.length<=34);assert(d.instruction.length<=100);}
assert(p.allYearsCompletedTotal()>=50);
assert(p.allYearsCompletedUnits()>=10);
assert(!p.allYearsComplete());
blocked=false; raw=JSON.stringify({version:'2.4.0',progress:{year1:Object.fromEntries(p.year1Units.map(u=>[u,all])),year2:Object.fromEntries(p.year2StorageUnits.map(u=>[u,all])),year3:Object.fromEntries(p.year3Units.map(u=>[u,all])),year4:Object.fromEntries(p.year4Units.map(u=>[u,all])),year5:Object.fromEntries(p.year5Units.map(u=>[u,all])),year6:Object.fromEntries(p.year6Units.map(u=>[u,all]))}});p.loadData();assert.equal(p.allYearsCompletedTotal(),290);assert.equal(p.allYearsCompletedUnits(),58);assert(p.allYearsComplete());
console.log('PASS '+runs+' Year 1 mission runs across eight storage states; all 50 definitions, guarded interactions, reading load, unlock, replay, timestamps and Year 2–6 preservation.');