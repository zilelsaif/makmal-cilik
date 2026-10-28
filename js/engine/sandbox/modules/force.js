'use strict';
window.MakmalSandboxModels=window.MakmalSandboxModels||{};
window.MakmalSandboxModels.force=(()=>{
 const surfaces={smooth:{label:'Licin',threshold:1},medium:{label:'Sederhana kasar',threshold:2},rough:{label:'Kasar',threshold:3}},forces={low:1,medium:3,high:5};
 const defaults=()=>({direction:'right',force:'medium',surface:'medium'});
 const normalize=s=>({direction:s?.direction==='left'?'left':'right',force:Object.hasOwn(forces,s?.force)?s.force:'medium',surface:Object.hasOwn(surfaces,s?.surface)?s.surface:'medium'});
 function run(s){const state=normalize(s),applied=forces[state.force],friction=surfaces[state.surface].threshold,amount=Math.max(0,applied-friction),signed=amount*(state.direction==='left'?-1:1),level=amount===0?'Tidak bergerak':amount<=2?'Bergerak sedikit':'Bergerak jauh';return {...state,applied,friction,displacement:signed,level,observation:`${level}${amount?` ke ${state.direction==='left'?'kiri':'kanan'}`:''}. Daya ${applied}, rintangan geseran ${friction}.`};}
 function validate(challenge,state){const r=run(state);if(challenge.target==='direction')return Math.sign(r.displacement)===(challenge.direction==='left'?-1:1);if(challenge.target==='stopped')return r.displacement===0;if(challenge.target==='minimum')return Math.abs(r.displacement)>=challenge.minimum;if(challenge.target==='maximum-moving')return Math.abs(r.displacement)>0&&Math.abs(r.displacement)<=challenge.maximum;return false;}
 return {surfaces,forces,defaults,normalize,run,validate};
})();
