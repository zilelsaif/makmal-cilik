'use strict';
window.MakmalSandboxPersistence=(()=>({
 stats:id=>window.MakmalProgress.getSandboxStats(id),
 recordExperiment:id=>window.MakmalProgress.recordSandboxExperiment(id),
 recordChallenge:(id,key)=>window.MakmalProgress.recordSandboxChallenge(id,key)
}))();
