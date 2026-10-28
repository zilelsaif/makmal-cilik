'use strict';
window.MakmalSandboxRegistry=(()=>{
 const VERSION=1,C=()=>window.MakmalSandboxCore;
 const MODULES={
  circuit:{id:'circuit',title:'Makmal Litar',icon:'💡',year:2,unit:'Elektrik',missionId:'electricity-2',description:'Sambung litar dan kawal suis untuk menyalakan mentol.'},
  shadow:{id:'shadow',title:'Makmal Bayang',icon:'🔦',year:2,unit:'Terang & Gelap',missionId:'light-dark-3',description:'Ubah jarak cahaya dan objek untuk membentuk bayang.'},
  force:{id:'force',title:'Makmal Daya',icon:'🛒',year:6,unit:'Daya',missionId:'y6-force-5',description:'Uji arah daya, kekuatan dan permukaan berbeza.'},
  machines:{id:'machines',title:'Makmal Mesin',icon:'⚙️',year:6,unit:'Mesin',missionId:'y6-machines-5',description:'Reka tuas dan satah condong yang memudahkan kerja.'}
 };
 const isUnlocked=id=>{const m=MODULES[id],p=window.MakmalProgress;if(!m||!p)return false;if(m.year===2){const unit=m.missionId.startsWith('light-dark')?'lightDark':'electricity';return p.isMissionComplete(`mission${m.missionId.split('-').at(-1)}`,unit);}return p.forYear(6).isMissionComplete(`mission${m.missionId.split('-').at(-1)}`,m.missionId.split('-')[1]);};
 function createChallenge(id,seed){const rng=C().rngFor(`sandbox:${id}`,String(seed),VERSION),variant=Math.floor(rng()*5),model=window.MakmalSandboxModels[id];let c;
  if(id==='circuit'){const rows=[
   {goal:'Lengkapkan litar dan nyalakan mentol.',target:'lit',setup:{connections:{batterySwitch:true,switchBulb:false,bulbBattery:true},switchClosed:false}},
   {goal:'Baiki sambungan terbuka supaya mentol menyala.',target:'lit',setup:{connections:{batterySwitch:false,switchBulb:true,bulbBattery:true},switchClosed:true}},
   {goal:'Gunakan suis untuk menyalakan mentol.',target:'lit',setup:{connections:{batterySwitch:true,switchBulb:true,bulbBattery:true},switchClosed:false}},
   {goal:'Pulihkan sambungan mentol dan nyalakannya.',target:'lit',setup:{connections:{batterySwitch:true,switchBulb:true,bulbBattery:false},switchClosed:true}},
   {goal:'Betulkan susunan tidak selamat dan nyalakan mentol.',target:'lit',setup:{connections:{batterySwitch:true,switchBulb:true,bulbBattery:true,batteryShort:true},switchClosed:true}}
  ];c=rows[variant];}
  if(id==='shadow'){const rows=[
   {goal:'Hasilkan bayang sekurang-kurangnya 5 unit.',target:'larger',minimum:5,setup:{lightToObject:6,objectToScreen:4,objectHeight:2}},
   {goal:'Hasilkan bayang tidak melebihi 3 unit.',target:'smaller',maximum:3,setup:{lightToObject:3,objectToScreen:8,objectHeight:2}},
   {goal:'Padankan bayang hampir 4 unit.',target:'match',value:4,tolerance:.35,setup:{lightToObject:4,objectToScreen:4,objectHeight:2}},
   {goal:'Dekatkan objek kepada cahaya sehingga bayang sekurang-kurangnya 6 unit.',target:'larger',minimum:6,setup:{lightToObject:7,objectToScreen:5,objectHeight:2}},
   {goal:'Jadikan bayang lebih kecil daripada 4 unit.',target:'smaller',maximum:4,setup:{lightToObject:2,objectToScreen:8,objectHeight:2}}
  ];c=rows[variant];}
  if(id==='force'){const rows=[
   {goal:'Gerakkan objek ke kiri.',target:'direction',direction:'left',setup:{direction:'right',force:'low',surface:'rough'}},
   {goal:'Gerakkan objek ke kanan.',target:'direction',direction:'right',setup:{direction:'left',force:'low',surface:'rough'}},
   {goal:'Pastikan objek tidak bergerak.',target:'stopped',setup:{direction:'right',force:'high',surface:'smooth'}},
   {goal:'Gerakkan objek sekurang-kurangnya 2 unit simulasi.',target:'minimum',minimum:2,setup:{direction:'right',force:'low',surface:'medium'}},
   {goal:'Gerakkan objek, tetapi tidak melebihi 2 unit simulasi.',target:'maximum-moving',maximum:2,setup:{direction:'right',force:'high',surface:'smooth'}}
  ];c=rows[variant];}
  if(id==='machines'){const rows=[
   {goal:'Reka tuas yang memerlukan tidak lebih 3 unit daya.',machine:'lever',maxEffort:3,setup:{machine:'lever',load:6,loadArm:4,effortArm:3}},
   {goal:'Reka tuas yang memerlukan tidak lebih 2 unit daya.',machine:'lever',maxEffort:2,setup:{machine:'lever',load:6,loadArm:3,effortArm:3}},
   {goal:'Reka satah condong yang memerlukan tidak lebih 3 unit daya.',machine:'ramp',maxEffort:3,setup:{machine:'ramp',load:8,rampHeight:4,rampLength:5}},
   {goal:'Angkat beban dengan tuas menggunakan tidak lebih 4 unit daya.',machine:'lever',maxEffort:4,setup:{machine:'lever',load:10,loadArm:3,effortArm:4}},
   {goal:'Naikkan beban melalui satah condong dengan tidak lebih 2 unit daya.',machine:'ramp',maxEffort:2,setup:{machine:'ramp',load:6,rampHeight:3,rampLength:5}}
  ];c=rows[variant];}
  if(!c||!model)throw Error('Unknown sandbox');return C().freeze({...c,id:`${id}-${seed}-${variant}`,sandboxId:id,seed:String(seed),providerVersion:VERSION});
 }
 return {VERSION,MODULES,isUnlocked,createChallenge,get:id=>MODULES[id]||null,list:()=>Object.values(MODULES)};
})();
