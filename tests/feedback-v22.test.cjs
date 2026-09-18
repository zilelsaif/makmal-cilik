const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const progress=fs.readFileSync('js/progress.js','utf8'),experiment=fs.readFileSync('js/engine/experiment.js','utf8'),audio=fs.readFileSync('js/engine/rewards.js','utf8'),feedback=fs.readFileSync('js/engine/feedback.js','utf8'),css=fs.readFileSync('css/feedback.css','utf8');
for(const event of ['uiTap','uiSelect','correct','incorrect','hint','discovery','missionComplete','unitComplete','yearComplete','masterComplete'])assert(audio.includes(event),event);
assert(experiment.includes('MakmalFeedback')&&experiment.includes("wasMissionComplete?'discovery':'complete'"));
assert(feedback.includes("incorrect:'encourage'")&&feedback.includes("missionComplete:'celebrate'"));
assert(css.includes('prefers-reduced-motion:reduce')&&css.includes('mc-nudge')&&css.includes('mc-sparkle'));
const box={window:{},localStorage:{getItem:()=>null,setItem(){}}};vm.createContext(box);vm.runInContext(progress,box);const p=box.window.MakmalProgress,totalUnits=p.year1Units.length+p.year2StorageUnits.length+p.year3Units.length+p.year4Units.length+p.year5Units.length+p.year6Units.length;assert.equal(totalUnits,58);assert.equal(totalUnits*5,290);
assert(experiment.includes('feedback-note')&&experiment.includes('completeMission')&&experiment.includes("action==='hint'"));
console.log('PASS shared feedback vocabulary and static 290-mission hook audit.');
