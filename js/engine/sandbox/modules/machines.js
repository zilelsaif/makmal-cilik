'use strict';
window.MakmalSandboxModels=window.MakmalSandboxModels||{};
window.MakmalSandboxModels.machines=(()=>{
 const C=()=>window.MakmalSandboxCore;
 const defaults=()=>({machine:'lever',load:6,loadArm:2,effortArm:4,rampHeight:2,rampLength:6});
 function normalize(s){const machine=s?.machine==='ramp'?'ramp':'lever',load=C().clamp(s?.load??6,2,10),loadArm=C().clamp(s?.loadArm??2,1,4),effortArm=C().clamp(s?.effortArm??4,2,8),rampHeight=C().clamp(s?.rampHeight??2,1,4),rampLength=Math.max(rampHeight+1,C().clamp(s?.rampLength??6,3,10));return {machine,load,loadArm,effortArm,rampHeight,rampLength};}
 function run(s){const state=normalize(s);if(state.machine==='lever'){const effort=Number((state.load*state.loadArm/state.effortArm).toFixed(2));return {...state,requiredEffort:effort,distance:state.effortArm,observation:`Tuas memerlukan kira-kira ${effort} unit daya dalam model ideal.`};}const effort=Number((state.load*state.rampHeight/state.rampLength).toFixed(2));return {...state,requiredEffort:effort,distance:state.rampLength,observation:`Satah condong memerlukan kira-kira ${effort} unit daya sepanjang ${state.rampLength} unit jarak.`};}
 function validate(challenge,state){const r=run(state);return (!challenge.machine||r.machine===challenge.machine)&&r.requiredEffort<=challenge.maxEffort;}
 return {defaults,normalize,run,validate};
})();
