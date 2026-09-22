const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let raw=null;const box={window:{},localStorage:{getItem:()=>raw,setItem:(k,v)=>raw=v}};vm.createContext(box);
for(const f of ['js/progress.js','js/content/experiments/light-dark.js','js/engine/light.js'])vm.runInContext(fs.readFileSync(f,'utf8'),box);
const {MakmalLight:light,MakmalLightContent:content,MakmalProgress:p}=box.window;
for(let n=1;n<=5;n++)for(let repeat=0;repeat<25;repeat++){
  const def=content.missions['light-dark-'+n],g=light.createSession(def);g.act('next');assert.equal(g.state.step,0);g.act('predict',String(repeat%2));g.act('next');assert.equal(g.state.step,1);assert(!g.canAdvance());
  if(n===1){g.act('sort','source');assert.equal(Object.keys(g.state.sorted).length,0);for(const o of content.objects){g.act('pick',o.id);g.act('sort',o.source?'other':'source');assert(!g.state.sorted[o.id]);g.act('sort',o.source?'source':'other');}assert.equal(Object.keys(g.state.sorted).length,5);}
  if(n===2){g.act('region','left');assert.equal(g.state.visited.length,0);g.act('power');for(const r of ['left','center','right'])g.act('region',r);}
  if(n===3){g.act('object');assert(!g.canAdvance());g.act('power');assert(g.canAdvance());g.act('object');assert(!g.canAdvance());g.act('object');}
  if(n===4){g.act('material','cardboard');g.act('material','cardboard');assert(!g.canAdvance());g.act('material','plastic');}
  if(n===5){g.act('find');assert(!g.state.found);g.act('tool','mirror');assert(!g.state.power);g.act('tool','flashlight');g.act('region','right');g.act('find');assert(!g.state.found);g.act('obstruction');g.act('find');assert(g.state.found);assert(!g.canAdvance());g.act('region','left');}
  assert(g.canAdvance());g.act('next');assert.equal(g.state.step,2);g.act('next');assert.equal(g.state.step,2);for(let i=1;i<def.observations.length;i++)g.act('observe');g.act('next');g.act('think','wrong');assert(!g.canAdvance());g.act('think','correct');g.act('next');assert.equal(g.state.step,4);g.reset();assert.equal(g.state.step,0);assert(!g.state.found);assert.equal(g.state.visited.length,0);assert.equal(g.state.blocked,n===5);
}
const electricity=Object.fromEntries([1,2,3,4,5].map(n=>['mission'+n,{completed:true,attempts:n,completedAt:'old'+n,extra:n}]));
for(const value of [null,'{bad',JSON.stringify({version:'0.5.0',profile:{name:'Aina'},settings:{sound:false},extra:3,progress:{year2:{electricity,plants:{keep:1},lightDark:{mission3:{completed:true,attempts:4,completedAt:'first'}}}}})]){
 raw=value;p.loadData();assert.equal(p.getData().version,'2.5.1');const before=JSON.stringify([p.getData().progress.year2.electricity,p.getData().settings,p.getData().profile,p.getData().progress.year2.plants,p.getData().extra]);assert(p.isAvailable(1,'lightDark'));
 for(let n=1;n<=5;n++){assert(p.isAvailable(n,'lightDark'));p.startMissionAttempt('mission'+n,'lightDark');p.completeMission('mission'+n,'lightDark');const first=p.getData().progress.year2.lightDark['mission'+n].completedAt;p.startMissionAttempt('mission'+n,'lightDark');p.completeMission('mission'+n,'lightDark');assert.equal(p.getData().progress.year2.lightDark['mission'+n].completedAt,first);}
 p.loadData();assert(p.isUnitComplete('lightDark'));assert.equal(JSON.stringify([p.getData().progress.year2.electricity,p.getData().settings,p.getData().profile,p.getData().progress.year2.plants,p.getData().extra]),before);
}
console.log('PASS: 125 light activity runs, guarded hidden items, observation gates, wrong actions, reset, independent units and safe v0.5 migration/replay.');
