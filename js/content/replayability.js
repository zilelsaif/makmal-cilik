'use strict';
window.MakmalReplayRegistry=(()=>{
 const DYNAMIC={
  'y1-magnets-2':{year:1,unitId:'magnets',unitTitle:'Magnet',number:2,title:'Tarik atau Tidak?',replayType:'variable'},
  'y1-magnets-4':{year:1,unitId:'magnets',unitTitle:'Magnet',number:4,title:'Magnet Mana Lebih Kuat?',replayType:'variable'},
  'y1-absorption-5':{year:1,unitId:'absorption',unitTitle:'Penyerapan',number:5,title:'Misi Tumpahan Air',replayType:'variable'},
  'electricity-2':{year:2,unitId:'electricity',unitTitle:'Elektrik',number:2,title:'Nyalakan Mentol',replayType:'sandbox'},
  'electricity-3':{year:2,unitId:'electricity',unitTitle:'Elektrik',number:3,title:'Mentol Tidak Menyala',replayType:'variable'},
  'light-dark-3':{year:2,unitId:'light-dark',unitTitle:'Terang & Gelap',number:3,title:'Bayang-Bayang',replayType:'sandbox'},
  'mixtures-5':{year:2,unitId:'mixtures',unitTitle:'Campuran',number:5,title:'Cabaran Asingkan Campuran',replayType:'variable'},
  'y3-measurement-4':{year:3,unitId:'measurement',unitTitle:'Pengukuran',number:4,title:'Isi Padu Cecair',replayType:'variable'},
  'y3-density-1':{year:3,unitId:'density',unitTitle:'Ketumpatan',number:1,title:'Timbul atau Tenggelam?',replayType:'variable'},
  'y3-acid-alkali-5':{year:3,unitId:'acid-alkali',unitTitle:'Asid dan Alkali',number:5,title:'Cabaran Bahan Misteri',replayType:'variable'},
  'y4-light-properties-2':{year:4,unitId:'light-properties',unitTitle:'Sifat Cahaya',number:2,title:'Misteri Bayang-Bayang',replayType:'sandbox'},
  'y4-sound-5':{year:4,unitId:'sound',unitTitle:'Bunyi',number:5,title:'Cabaran Kurangkan Bunyi',replayType:'variable'},
  'y4-energy-5':{year:4,unitId:'energy',unitTitle:'Tenaga',number:5,title:'Jejak Tenaga',replayType:'variable'},
  'y5-electricity-5':{year:5,unitId:'electricity',unitTitle:'Elektrik',number:5,title:'Jurutera Litar',replayType:'sandbox'},
  'y5-heat-5':{year:5,unitId:'heat',unitTitle:'Haba',number:5,title:'Cabaran Haba',replayType:'variable'},
  'y5-matter-5':{year:5,unitId:'matter',unitTitle:'Jirim',number:5,title:'Cabaran Jirim',replayType:'variable'},
  'y6-force-5':{year:6,unitId:'force',unitTitle:'Daya',number:5,title:'Cabaran Daya',replayType:'sandbox'},
  'y6-speed-5':{year:6,unitId:'speed',unitTitle:'Kelajuan',number:5,title:'Perlumbaan Saintifik',replayType:'variable'},
  'y6-machines-5':{year:6,unitId:'machines',unitTitle:'Mesin',number:5,title:'Cipta Mesin Berguna',replayType:'sandbox'}
 };
 Object.values(DYNAMIC).forEach(meta=>{meta.dynamic=true;meta.providerKey=meta.title.toLowerCase().replace(/[^a-z0-9]+/g,'-');meta.providerVersion=1;meta.progressKey='mission'+meta.number;meta.storageUnit=meta.year===2?({'light-dark':'lightDark'}[meta.unitId]||meta.unitId):meta.unitId;});
 const sandboxModes=new Set(['design','simulate','orbit']);
 const variableModes=new Set(['classify','sequence','compare','investigate','measurement','liquid','diagnose','sort','shadow','finale','test']);
 function classify(id,def={}){if(DYNAMIC[id])return DYNAMIC[id].replayType;if(sandboxModes.has(def.mode)||/circuit|machine|bayang|shadow|bina|reka/i.test(`${id} ${def.title||''}`))return 'sandbox';if(variableModes.has(def.mode)||Array.isArray(def.actions)||Array.isArray(def.samples))return 'variable';return 'discovery';}
 function catalog(){const rows=[];for(const year of [1,3,4,5,6]){const reg=window['MakmalYear'+year];for(const unit of reg?.units||[])for(const summary of unit.missions){const def=reg.missions[summary.id]||{};rows.push({year,unitId:unit.id,unitTitle:unit.title,id:summary.id,title:def.title||summary.title,replayType:classify(summary.id,def),dynamic:Boolean(DYNAMIC[summary.id]),providerKey:DYNAMIC[summary.id]?.providerKey||null});}}for(const unit of window.MakmalContent?.year2Units||[])for(const summary of unit.missions){const id=summary.id,def=window.MakmalNewContent?.missions[id]||window.MakmalPlantContent?.missions[id]||window.MakmalMixtureContent?.missions[id]||window.MakmalLightContent?.missions[id]||window.MakmalCircuitMissions?.[id]||(id==='electricity-2'?window.MakmalMission2:id==='electricity-1'?window.MakmalMission1:{});rows.push({year:2,unitId:unit.id,unitTitle:unit.title,id,title:def.title||summary.title,replayType:classify(id,def),dynamic:Boolean(DYNAMIC[id]),providerKey:DYNAMIC[id]?.providerKey||null});}return rows.sort((a,b)=>a.year-b.year||a.unitTitle.localeCompare(b.unitTitle)||a.id.localeCompare(b.id));}
 const get=id=>DYNAMIC[id]||null,isDynamic=id=>Boolean(DYNAMIC[id]),getReplayType=id=>DYNAMIC[id]?.replayType||catalog().find(x=>x.id===id)?.replayType||null;
 function isComplete(id){const m=get(id);if(!m)return false;return m.year===2?window.MakmalProgress.isMissionComplete(m.progressKey,m.storageUnit):window.MakmalProgress.forYear(m.year).isMissionComplete(m.progressKey,m.storageUnit);}
 const summary=()=>catalog().reduce((out,row)=>(out[row.replayType]++,out),{discovery:0,variable:0,sandbox:0});
 return {DYNAMIC,get,isDynamic,getReplayType,catalog,summary,isComplete};
})();
