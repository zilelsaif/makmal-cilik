'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),store=new Map(),window={};window.window=window;window.localStorage={getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)};
const context=vm.createContext({window,localStorage:window.localStorage,console,Date,Math,Object,Array,Number,String,Boolean,Set,JSON});
for(const file of ['js/engine/sandbox/core.js','js/engine/sandbox/modules/circuit.js','js/engine/sandbox/modules/shadow.js','js/engine/sandbox/modules/force.js','js/engine/sandbox/modules/machines.js','js/engine/sandbox/registry.js','js/progress.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
const models=window.MakmalSandboxModels,R=window.MakmalSandboxRegistry,P=window.MakmalProgress;

// Circuit model: graph continuity, switch and short protection.
let s={connections:{batterySwitch:true,switchBulb:true,bulbBattery:true},switchClosed:true};
assert.equal(models.circuit.run(s).lit,true);assert.equal(models.circuit.run({...s,switchClosed:false}).lit,false);
assert.equal(models.circuit.run({...s,connections:{...s.connections,switchBulb:false}}).lit,false);
assert.equal(models.circuit.run({...s,connections:{...s.connections,bulbBattery:false}}).lit,false);
assert.equal(models.circuit.run({...s,connections:{...s.connections,batteryShort:true}}).lit,false);
assert.equal(models.circuit.run(models.circuit.toggleConnection({...s,connections:{...s.connections,switchBulb:false}},'switchBulb')).lit,true);

// Shadow geometry and bounds.
assert.equal(models.shadow.run({lightToObject:4,objectToScreen:6,objectHeight:2}).shadowHeight,5);
assert(models.shadow.run({lightToObject:2,objectToScreen:6,objectHeight:2}).shadowHeight>5);
assert.equal(models.shadow.normalize({lightToObject:0,objectToScreen:-2}).lightToObject,1);
assert(models.shadow.validate({target:'match',value:5,tolerance:.2},{lightToObject:4,objectToScreen:6,objectHeight:2}));

// Force direction, static friction and monotonic friction response.
assert(models.force.run({direction:'left',force:'high',surface:'smooth'}).displacement<0);
assert.equal(models.force.run({direction:'right',force:'low',surface:'rough'}).displacement,0);
const smooth=models.force.run({direction:'right',force:'high',surface:'smooth'}).displacement,rough=models.force.run({direction:'right',force:'high',surface:'rough'}).displacement;
assert(smooth>=rough);assert.deepEqual(models.force.run({direction:'right',force:'high',surface:'rough'}),models.force.run({direction:'right',force:'high',surface:'rough'}));

// Ideal machines: coherent lever arms and ramp force/distance trade-off.
assert(models.machines.run({machine:'lever',load:6,loadArm:2,effortArm:6}).requiredEffort<models.machines.run({machine:'lever',load:6,loadArm:2,effortArm:3}).requiredEffort);
const longRamp=models.machines.run({machine:'ramp',load:8,rampHeight:2,rampLength:10}),shortRamp=models.machines.run({machine:'ramp',load:8,rampHeight:2,rampLength:4});assert(longRamp.requiredEffort<shortRamp.requiredEffort);assert.equal(longRamp.requiredEffort*longRamp.distance,16);

function candidates(id){if(id==='circuit'){const out=[];for(let mask=0;mask<16;mask++)for(const switchClosed of [false,true])out.push({connections:{batterySwitch:Boolean(mask&1),switchBulb:Boolean(mask&2),bulbBattery:Boolean(mask&4),batteryShort:Boolean(mask&8)},switchClosed});return out;}if(id==='shadow'){const out=[];for(let l=1;l<=10;l++)for(let o=1;o<=12;o++)for(let h=1;h<=4;h++)out.push({lightToObject:l,objectToScreen:o,objectHeight:h});return out;}if(id==='force'){const out=[];for(const direction of ['left','right'])for(const force of ['low','medium','high'])for(const surface of ['smooth','medium','rough'])out.push({direction,force,surface});return out;}const out=[];for(const machine of ['lever','ramp'])for(let load=2;load<=10;load+=2)for(let a=1;a<=8;a++)for(let b=2;b<=10;b++)out.push(machine==='lever'?{machine,load,loadArm:Math.min(a,4),effortArm:Math.min(b,8)}:{machine,load,rampHeight:Math.min(a,4),rampLength:Math.max(Math.min(b,10),Math.min(a,4)+1)});return out;}
function oracle(id,ch,state){const r=models[id].run(state);if(id==='circuit')return ch.target==='lit'&&r.lit;if(id==='shadow')return ch.target==='larger'?r.shadowHeight>=ch.minimum:ch.target==='smaller'?r.shadowHeight<=ch.maximum:Math.abs(r.shadowHeight-ch.value)<=ch.tolerance;if(id==='force')return ch.target==='direction'?Math.sign(r.displacement)===(ch.direction==='left'?-1:1):ch.target==='stopped'?r.displacement===0:ch.target==='minimum'?Math.abs(r.displacement)>=ch.minimum:Math.abs(r.displacement)>0&&Math.abs(r.displacement)<=ch.maximum;return (!ch.machine||r.machine===ch.machine)&&r.requiredEffort<=ch.maxEffort;}
for(const id of Object.keys(R.MODULES)){const signatures=new Set();for(let i=0;i<200;i++){const a=R.createChallenge(id,`seed-${i}`),b=R.createChallenge(id,`seed-${i}`);assert.deepEqual(a,b);signatures.add(JSON.stringify({goal:a.goal,setup:a.setup}));const solution=candidates(id).find(x=>oracle(id,a,x));assert(solution,`${id} seed ${i} must be constructively solvable`);assert.equal(models[id].validate(a,solution),true);const wrong=candidates(id).find(x=>!oracle(id,a,x));assert(wrong,`${id} challenge needs a non-solution`);assert.equal(models[id].validate(a,wrong),false);}assert(signatures.size>=5,`${id} challenge diversity`);}

// Migration and profile isolation remain separate from canonical progress.
P.loadData();const a=P.getActiveProfile();P.recordSandboxExperiment('circuit');P.recordSandboxChallenge('circuit','one');P.recordSandboxChallenge('circuit','one');assert.equal(P.getSandboxStats('circuit').experimentsRun,1);assert.equal(P.getSandboxStats('circuit').challengesCompleted,1);
const completedAt='2025-01-01T00:00:00.000Z';a.progress.year2.electricity={mission2:{completed:true,completedAt}};P.saveData(P.getData());const added=P.addProfile('B','flask');assert(added.ok);assert.equal(P.getSandboxStats('circuit').experimentsRun,0);P.switchProfile(a.id);assert.equal(P.getSandboxStats('circuit').experimentsRun,1);assert.equal(P.getData().progress.year2.electricity.mission2.completedAt,completedAt);assert.equal(P.allYearsCompletedTotal(),1);
P.saveData({...P.getData(),profiles:P.getProfiles().map(p=>p.id===a.id?{...p,sandbox:{bad:true}}:p)});assert.equal(P.getSandboxStats('circuit').experimentsRun,0);assert.equal(P.getData().progress.year2.electricity.mission2.completedAt,completedAt);

const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),replay=fs.readFileSync(path.join(root,'js/content/replayability.js'),'utf8');assert(html.includes('css/sandbox.css?v=2.7.0'));assert.equal((replay.match(/replayType:'(?:sandbox|variable)'/g)||[]).length,19);
console.log('PASS 800 deterministic sandbox challenges, four scientific models, constructive solvability, profile isolation and v2.7 migration.');
