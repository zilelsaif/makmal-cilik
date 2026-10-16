const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let raw=null;const box={window:{},localStorage:{getItem:()=>raw,setItem:(_,v)=>raw=v},Intl,Date,Math,console,crypto:require('node:crypto').webcrypto,performance:{now:()=>1},AbortController,Uint32Array};box.window.window=box.window;box.window.crypto=box.crypto;box.window.performance=box.performance;vm.createContext(box);
const run=file=>vm.runInContext(fs.readFileSync(file,'utf8'),box,{filename:file});run('js/progress.js');
for(const file of ['js/content/experiments/new-units.js','js/content/year2.js','js/content/experiments/electricity-mission1.js','js/content/experiments/electricity-mission2.js','js/content/experiments/electricity-missions3-5.js','js/content/experiments/light-dark.js','js/content/experiments/mixtures.js','js/content/experiments/plants.js','js/content/year3/index.js'])run(file);
for(const file of ['science-skills','lab-rules','humans','animals','plants','measurement','density','acid-alkali','solar-system','machines'])run(`js/content/year3/${file}.js`);for(const year of [4,5,6,1]){run(`js/content/year${year}/index.js`);run(`js/content/year${year}/content.js`);}run('js/content/replayability.js');run('js/engine/replay.js');
const replay=box.window.MakmalReplay,registry=box.window.MakmalReplayRegistry,quality={};
for(const id of Object.keys(registry.DYNAMIC)){
 const signatures=new Set(),visible=new Set(),decisions=new Set(),outcomes=new Set(),answerPositions=new Set();
 for(let i=0;i<200;i++){
  const seed=`quality-${i}`,a=replay.providers[id].generate(seed),b=replay.providers[id].generate(seed);
  assert.deepEqual(a,b,`${id}: equivalent seed mismatch`);assert.equal(a.providerVersion,2);assert(a.correctAnswerIndex>=0&&a.correctAnswerIndex<a.answers.length);assert.equal(a.answers[a.correctAnswerIndex],a.correctResult);
  assert(a.trials.some(x=>x.id===a.focusTrialId&&x.result===a.correctResult));
  signatures.add(a.variantSignature);visible.add(JSON.stringify([a.intro,a.trials.map(x=>[x.label,x.result])]));decisions.add(JSON.stringify([a.question,a.answers,a.correctAnswerIndex]));a.trials.forEach(x=>outcomes.add(x.result));answerPositions.add(a.correctAnswerIndex);
  const combined=JSON.stringify(a).toLowerCase();if(id==='y3-acid-alkali-5'){assert(!/rasa bahan|hidu bahan|sentuh bahan/.test(combined));assert(combined.includes('jangan sentuh, hidu atau rasa'));}
  if(id==='y3-measurement-4')for(const t of a.trials)assert(/^\d+ mL$/.test(t.result));
  if(id==='y6-speed-5')for(const t of a.trials){const m=t.result.match(/^(\d+) m dalam (\d+) s = ([\d.]+) m\/s$/);assert(m);assert.equal(Number(m[3]),Number((Number(m[1])/Number(m[2])).toFixed(1)));}
  if(id==='electricity-2'||id==='electricity-3')assert(!/voltan|rintangan|elektron/i.test(combined));
 }
 const first=replay.createReplayRun(id,{seed:'same'}),retry=replay.createReplayRun(id,{seed:'same',lastVariantSignature:first.variantSignature});assert.notEqual(first.variantSignature,retry.variantSignature,`${id}: immediate duplicate`);
 quality[id]={signatures:signatures.size,visible:visible.size,decisions:decisions.size,outcomes:outcomes.size,answerPositions:answerPositions.size};
 assert(visible.size>=2,`${id}: no learner-visible diversity`);assert(decisions.size>=2,`${id}: no decision diversity`);assert(outcomes.size>=2,`${id}: no outcome diversity`);
}
assert.equal(Object.keys(quality).length,19);
console.log('PASS 3,800 quality seeds: visible/decision/outcome diversity, provider v2 determinism, answer binding, duplicate prevention and science guards for all 19 missions.');
