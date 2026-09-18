const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let raw=null,blocked=false;const box={window:{},localStorage:{getItem(){if(blocked)throw Error('blocked');return raw;},setItem(k,v){if(blocked)throw Error('blocked');raw=v;}}};vm.createContext(box);
const files=['js/progress.js','js/content/year3/index.js',...['science-skills','lab-rules','humans','animals','plants','measurement','density','acid-alkali','solar-system','machines'].map(n=>'js/content/year3/'+n+'.js'),...['core','sorting','measurement','density','acid-alkali','solar-pulley'].map(n=>'js/engine/year3/'+n+'.js')];for(const f of files)vm.runInContext(fs.readFileSync(f,'utf8'),box);
const w=box.window,p=w.MakmalProgress,y=p.forYear(3),units=w.MakmalYear3.units,defs=Object.values(w.MakmalYear3.missions);assert.equal(units.length,10);assert.equal(defs.length,50);assert(units.every(u=>u.missions.length===5));
const old={completed:true,attempts:7,completedAt:'old-date',custom:9},all=Object.fromEntries([1,2,3,4,5].map(n=>['mission'+n,old]));let runs=0;
for(const scenario of ['fresh','v1.2','partial','unit','full','malformed','blocked','bad-records']){
 blocked=scenario==='blocked';raw=scenario==='malformed'?'{bad':scenario==='fresh'?null:JSON.stringify({version:'1.2.0',settings:{sound:false,extra:2},profile:{name:'Aina'},extra:7,progress:{year2:{electricity:all,animals:all,future:{x:3}},year3:scenario==='full'?Object.fromEntries(units.map(u=>[u.id,all])):scenario==='unit'?{humans:all}:scenario==='partial'?{humans:{mission3:old}}:scenario==='bad-records'?{humans:{mission1:null,mission2:'bad',mission3:{attempts:-4}}}:{}}});
 p.loadData();assert.equal(p.APP_VERSION,'1.7.0');const before=JSON.stringify([p.getData().progress.year2,p.getData().settings,p.getData().profile,p.getData().extra]);
 for(const d of defs){const session=w.MakmalYear3Lab.createSession(d),domain=w.MakmalYear3Domains[d.domain];assert(y.isAvailable(1,d.unitId));assert(!y.isAvailable(0,d.unitId));assert(!y.isAvailable(6,d.unitId));let date=p.getData().progress.year3[d.unitId]?.[d.progressKey]?.completedAt;
  for(let repeat=0;repeat<2;repeat++){
   y.startMissionAttempt(d.progressKey,d.unitId);session.reset();session.act('next');assert.equal(session.state.step,0);session.act('predict','1');session.act('next');assert.equal(session.state.step,1);assert(!session.canAdvance());
   session.act('invalid','garbage');assert(!session.canAdvance());session.act('read','9999');session.act('class','invalid');assert(!session.canAdvance());
   let steps=0;while(!session.canAdvance()){const [a,v]=domain.hint(session.state,d);session.act(a,v);assert(++steps<100,d.id+' stuck on '+a);}
   assert(domain.solved(session.state,d),d.id);session.act('next');while(session.state.observed<d.observations.length-1)session.act('observe');session.act('next');session.act('think','wrong');assert(!session.canAdvance());session.act('think','correct');session.act('next');assert.equal(session.state.step,4);y.completeMission(d.progressKey,d.unitId);
   const saved=p.getData().progress.year3[d.unitId][d.progressKey];assert(saved.completed&&saved.attempts>=1);if(date)assert.equal(saved.completedAt,date);date=saved.completedAt;assert.equal(JSON.stringify([p.getData().progress.year2,p.getData().settings,p.getData().profile,p.getData().extra]),before);runs++;
  }
  assert(y.isAvailable(Math.min(d.number+1,5),d.unitId));
 }
 assert.equal(y.completedTotal(),50);assert.equal(y.completedUnits(),10);assert(y.isYearComplete());if(!blocked){p.loadData();assert.equal(y.completedTotal(),50);}
}
// Independent scientific invariants, not just happy-path hint traversal.
const d=id=>w.MakmalYear3.missions[id],session=id=>w.MakmalYear3Lab.createSession(d(id)),start=s=>{s.act('predict','0');s.act('next');};
let s=session('y3-acid-alkali-5');start(s);for(const [sample,red,blue,type] of [['A','red','red','acid'],['B','blue','blue','alkali'],['C','red','blue','neutral']]){s.act('sample',sample);s.act('class',type);assert(!s.state.classes[sample]);s.act('paper','red');s.act('paper','blue');assert.equal(s.state.tests[sample].red,red);assert.equal(s.state.tests[sample].blue,blue);s.act('class',type);}assert(s.canAdvance());
s=session('y3-density-3');start(s);s.act('salt');assert(!s.state.salt);s.act('test');assert.equal(s.state.result,'sink');s.act('salt');s.act('stir');s.act('test');assert.equal(s.state.result,'float');assert(s.canAdvance());
s=session('y3-measurement-5');start(s);s.act('insert');assert(!s.state.inserted);s.act('baseline');s.act('insert');s.act('read','70');assert(!s.canAdvance());s.act('read','20');assert(s.canAdvance());
s=session('y3-machines-3');start(s);s.act('pull');assert.equal(s.state.position,1);assert(!s.canAdvance());s.act('lower');assert.equal(s.state.position,0);assert(s.canAdvance());
s=session('y3-machines-5');start(s);s.act('pull');assert.equal(s.state.position,0);s.act('attach','load');assert.equal(s.state.parts.length,0);
s=session('y3-solar-system-5');start(s);s.act('tick');assert.equal(s.state.ticks,0);s.act('inner','earth');s.act('outer','neptune');for(let i=0;i<8;i++)s.act('tick');assert(s.canAdvance());
console.log('PASS '+runs+' Year 3 mission runs across eight storage states; all 50 definitions, guarded interactions, litmus/density/displacement/pulley/orbit invariants, unlock, replay, timestamps and Year 2 preservation.');
