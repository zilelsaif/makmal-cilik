const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let raw=null,blocked=false;const box={window:{},localStorage:{getItem:()=>{if(blocked)throw Error('blocked');return raw;},setItem:(k,v)=>{if(blocked)throw Error('blocked');raw=v;}}};vm.createContext(box);
for(const f of ['js/progress.js','js/content/experiments/plants.js','js/engine/plants.js'])vm.runInContext(fs.readFileSync(f,'utf8'),box);
const {MakmalPlants:engine,MakmalPlantContent:content,MakmalProgress:p}=box.window;
for(let n=1;n<=5;n++)for(let repeat=0;repeat<30;repeat++){
 const def=content.missions['plants-'+n],g=engine.createSession(def);g.act('next');assert.equal(g.state.step,0);g.act('water','A');assert.equal(g.state.watered,null);
 g.act('predict','1');assert(g.canAdvance());g.act('next');g.act('hint');g.act('hint');assert(engine.hintTarget(g.state,def)[0]);assert(!g.canAdvance());
 if(n===1){g.act('need','candy');g.act('need','stone');assert.equal(g.state.provided.length,0);for(const id of ['water','sun','air']){g.act('need',id);g.act('need',id);}assert.equal(g.state.provided.length,3);}
 if(n===2){g.act('wait');assert(!g.state.elapsed);const id=repeat%2?'A':'B';g.act('water',id);g.act('water',id==='A'?'B':'A');assert.equal(g.state.watered,id);assert(!g.canAdvance());g.act('wait');assert(g.state.elapsed);}
 if(n===3){g.act('target','root');assert.equal(Object.keys(g.state.matched).length,0);g.act('part','root');g.act('target','flower');assert(!g.state.matched.flower);for(const id of ['root','stem','leaf','flower']){g.act('part',id);g.act('target',id);g.act('target',id);}assert.equal(Object.keys(g.state.matched).length,4);assert.equal(g.state.selected,null);}
 if(n===4){g.act('grow');assert.equal(g.state.tried.length,0);for(const id of ['left','right']){g.act('side',id);assert(!g.state.grown);g.act('grow');g.act('grow');assert(g.state.grown);}assert.equal(g.state.tried.length,2);}
 if(n===5){g.act('water');g.act('sun');assert(!g.state.water&&!g.state.sun);g.act('inspect');g.act('water');assert(!g.canAdvance());g.act('sun');assert.equal(g.state.effect,'recovery');g.act('sun');assert.equal(g.state.effect,null);}
 assert(g.canAdvance());g.act('next');g.act('next');assert.equal(g.state.step,2);for(let i=1;i<def.observations.length;i++)g.act('observe');g.act('next');g.act('think','wrong');assert(!g.canAdvance());g.act('think','correct');g.act('next');assert.equal(g.state.step,4);g.act('next');assert.equal(g.state.step,4);g.reset();assert.equal(g.state.step,0);assert.equal(g.state.selected,null);assert.equal(g.state.tried.length,0);assert.equal(g.state.watered,null);assert(!g.state.water&&!g.state.grown&&!g.state.elapsed);assert.equal(Object.keys(g.state.matched).length,0);
}
const record={completed:true,attempts:7,completedAt:'2026-01-01',custom:'keep'},all=Object.fromEntries([1,2,3,4,5].map(n=>['mission'+n,record]));
const seed=plants=>JSON.stringify({version:'0.8.0',settings:{sound:false,extra:8},profile:{name:'Aina'},extra:'keep',progress:{year2:{electricity:all,lightDark:all,mixtures:all,plants,animals:{keep:3}}}});
for(const initial of [null,seed({}),seed({mission3:record}),seed(all),'{bad',seed({mission1:null,mission2:'bad'})]){
 raw=initial;p.loadData();assert.equal(p.getData().version,'2.5.1');assert(p.isAvailable(1,'plants'));const before=JSON.stringify([p.getData().settings,p.getData().profile,p.getData().progress.year2.electricity,p.getData().progress.year2.lightDark,p.getData().progress.year2.mixtures,p.getData().progress.year2.animals,p.getData().extra]);
 for(let n=1;n<=5;n++){assert(p.isAvailable(n,'plants'));const key='mission'+n;p.startMissionAttempt(key,'plants');p.completeMission(key,'plants');const date=p.getData().progress.year2.plants[key].completedAt;p.startMissionAttempt(key,'plants');p.completeMission(key,'plants');assert.equal(p.getData().progress.year2.plants[key].completedAt,date);}
 p.loadData();assert(p.isUnitComplete('plants'));assert.equal(before,JSON.stringify([p.getData().settings,p.getData().profile,p.getData().progress.year2.electricity,p.getData().progress.year2.lightDark,p.getData().progress.year2.mixtures,p.getData().progress.year2.animals,p.getData().extra]));
}
blocked=true;p.loadData();p.startMissionAttempt('mission1','plants');p.completeMission('mission1','plants');assert(p.isAvailable(2,'plants'));
console.log('PASS: 150 plant runs; phase guards, watering comparison, matching, light trials, rescue, reset, v0.8 migration and blocked storage.');
