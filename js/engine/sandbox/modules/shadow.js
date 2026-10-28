'use strict';
window.MakmalSandboxModels=window.MakmalSandboxModels||{};
window.MakmalSandboxModels.shadow=(()=>{
 const C=()=>window.MakmalSandboxCore;
 const defaults=()=>({lightToObject:4,objectToScreen:6,objectHeight:2});
 function normalize(s){const lightToObject=C().clamp(s?.lightToObject??4,1,10),objectToScreen=C().clamp(s?.objectToScreen??6,1,12),objectHeight=C().clamp(s?.objectHeight??2,1,4);return {lightToObject,objectToScreen,objectHeight};}
 function run(s){const state=normalize(s),lightToScreen=state.lightToObject+state.objectToScreen,shadowHeight=Number((state.objectHeight*lightToScreen/state.lightToObject).toFixed(2));return {...state,lightToScreen,shadowHeight,observation:`Bayang setinggi kira-kira ${shadowHeight} unit dalam model ringkas.`};}
 function validate(challenge,state){const r=run(state);if(challenge.target==='larger')return r.shadowHeight>=challenge.minimum;if(challenge.target==='smaller')return r.shadowHeight<=challenge.maximum;return Math.abs(r.shadowHeight-challenge.value)<=challenge.tolerance;}
 return {defaults,normalize,run,validate};
})();
