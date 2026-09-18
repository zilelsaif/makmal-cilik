const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let muted=false,created=0,started=0,stopped=0,resumes=0,suspends=0,now=1000;
class Param{setValueAtTime(){} exponentialRampToValueAtTime(){}}
class Node{constructor(){this.frequency=new Param();this.gain=new Param();this.onended=null;}connect(){}start(){started++;}stop(){stopped++;this.onended?.();}}
class Context{constructor(){created++;this.state='suspended';this.currentTime=0;this.destination={};}resume(){resumes++;this.state='running';return Promise.resolve();}suspend(){suspends++;this.state='suspended';return Promise.resolve();}createOscillator(){return new Node();}createGain(){return new Node();}}
const box={Date:{now:()=>now},window:{AudioContext:Context,MakmalProgress:{getData:()=>({settings:{sound:!muted}})}}};vm.createContext(box);vm.runInContext(fs.readFileSync('js/engine/rewards.js','utf8'),box);const a=box.window.MakmalRewards;
assert.deepEqual([...a.events],['uiTap','uiSelect','correct','incorrect','hint','discovery','missionComplete','unitComplete','yearComplete','masterComplete']);
assert.equal(a.play('correct'),false);assert.equal(created,0);assert(a.unlock());assert.equal(created,1);assert.equal(resumes,1);
for(const event of a.events){a.play(event);}assert(started>10);const before=started;a.play('masterComplete');assert.equal(started,before,'cooldown stops duplicate completion');
muted=true;a.play('correct');assert.equal(started,before);a.stop();assert(stopped>0);muted=false;now+=5000;a.unlock();a.play('correct');assert(started>before);
const noAudio={window:{MakmalProgress:{getData:()=>({settings:{sound:true}})}}};vm.createContext(noAudio);vm.runInContext(fs.readFileSync('js/engine/rewards.js','utf8'),noAudio);assert.equal(noAudio.window.MakmalRewards.unlock(),false);assert.equal(noAudio.window.MakmalRewards.play('correct'),false);
console.log('PASS semantic procedural audio, unlock, mute, cooldown, stop and unsupported-audio resilience.');
