const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
(async()=>{
 let muted=true,created=0,paused=0;
 class FakeAudio{constructor(){created++;}addEventListener(){}play(){return Promise.reject(Error('Autoplay denied / asset unavailable'));}pause(){paused++;}}
 const box={window:{MakmalProgress:{getData:()=>({settings:{sound:!muted}})}},Audio:FakeAudio};vm.createContext(box);vm.runInContext(fs.readFileSync('js/engine/rewards.js','utf8'),box);const audio=box.window.MakmalRewards;
 audio.play('complete');assert.equal(created,0);audio.register('complete','test-only.ogg');audio.play('complete');assert.equal(created,0);muted=false;audio.play('unregistered');assert.equal(created,0);audio.play('complete');assert.equal(created,1);await new Promise(setImmediate);audio.stop();assert.equal(paused,0);
 FakeAudio.prototype.play=function(){return Promise.resolve();};audio.play('complete');audio.stop();assert.equal(paused,1);audio.stop();assert.equal(paused,1);console.log('PASS muted/missing hooks, rejected playback, stop/repeated stop without autoplay errors.');
})().catch(e=>{console.error(e);process.exitCode=1;});

