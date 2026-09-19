'use strict';
window.MakmalProgress = (() => {
  const APP_VERSION='2.5.0', KEY='makmalCilikData', MAX_PROFILES=6;
  const AVATARS=['pico','flask','microscope','planet','bulb','leaf'];
  const isObject=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
  const emptyProgress=()=>({year1:{},year2:{},year3:{},year4:{},year5:{},year6:{}});
  const cleanProgress=v=>{const s=isObject(v)?v:{};return {...s,year1:isObject(s.year1)?s.year1:{},year2:isObject(s.year2)?s.year2:{},year3:isObject(s.year3)?s.year3:{},year4:isObject(s.year4)?s.year4:{},year5:isObject(s.year5)?s.year5:{},year6:isObject(s.year6)?s.year6:{}};};
  const cleanName=v=>String(v??'').replace(/[<>\u0000-\u001f]/g,'').replace(/\s+/g,' ').trim().slice(0,20);
  const makeId=()=>`p-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`;
  const makeProfile=(name='Pemain 1',avatar='pico',progress=emptyProgress(),extra={})=>{const now=new Date().toISOString();return {...extra,id:typeof extra.id==='string'&&extra.id?extra.id:makeId(),name:cleanName(name)||'Pemain 1',avatar:AVATARS.includes(avatar)?avatar:'pico',createdAt:typeof extra.createdAt==='string'?extra.createdAt:now,lastPlayedAt:typeof extra.lastPlayedAt==='string'?extra.lastPlayedAt:now,preferences:isObject(extra.preferences)?extra.preferences:{},progress:cleanProgress(progress)};};
  const defaults=()=>{const p=makeProfile();return {version:APP_VERSION,settings:{sound:true},profiles:[p],activeProfileId:p.id};};
  let current=defaults(),storageAvailable=true;
  function attachAliases(data){let active=data.profiles.find(p=>p.id===data.activeProfileId)||data.profiles[0];if(!active){active=makeProfile();data.profiles=[active];}data.activeProfileId=active.id;const {progress:_progress,lastPlayedAt:_lastPlayedAt,...legacyProfile}=active;data.profile=legacyProfile;data.progress=active.progress;return data;}
  function normalize(value){
    if(!isObject(value))return defaults();
    const settings=isObject(value.settings)?value.settings:{};let profiles=[];
    if(Array.isArray(value.profiles))profiles=value.profiles.slice(0,MAX_PROFILES).filter(isObject).map((p,i)=>makeProfile(p.name||`Pemain ${i+1}`,p.avatar,p.progress,p));
    if(!profiles.length&&(isObject(value.progress)||isObject(value.profile)))profiles=[makeProfile(value.profile?.name||'Pemain 1',value.profile?.avatar||'pico',value.progress,{...(isObject(value.profile)?value.profile:{})})];
    if(!profiles.length)profiles=[makeProfile()];
    const ids=new Set();profiles=profiles.map(p=>{if(ids.has(p.id))p={...p,id:makeId()};ids.add(p.id);return p;});
    const known=new Set(['version','settings','profiles','activeProfileId','profile','progress']);
    const extras=Object.fromEntries(Object.entries(value).filter(([k])=>!known.has(k)));
    return attachAliases({...extras,version:APP_VERSION,settings:{...settings,sound:typeof settings.sound==='boolean'?settings.sound:true},profiles,activeProfileId:profiles.some(p=>p.id===value.activeProfileId)?value.activeProfileId:profiles[0].id});
  }
  function persist(){const {profile,progress,...stored}=current;try{localStorage.setItem(KEY,JSON.stringify(stored));storageAvailable=true;}catch(_){storageAvailable=false;}return storageAvailable;}
  function loadData(){let raw=null;try{raw=localStorage.getItem(KEY);storageAvailable=true;}catch(_){storageAvailable=false;}try{current=normalize(JSON.parse(raw));}catch(_){current=defaults();}return attachAliases(current);}
  const canPersist=()=>storageAvailable;
  function saveData(data=current){const rootProgress=isObject(data?.progress)?data.progress:null;current=normalize(data);if(rootProgress){const active=current.profiles.find(p=>p.id===current.activeProfileId);active.progress=cleanProgress(rootProgress);attachAliases(current);}persist();return current;}
  const getData=()=>current,getProfiles=()=>current.profiles.slice(),getActiveProfile=()=>current.profiles.find(p=>p.id===current.activeProfileId)||current.profiles[0];
  function touch(){const p=getActiveProfile();if(p)p.lastPlayedAt=new Date().toISOString();}
  function switchProfile(id){if(!current.profiles.some(p=>p.id===id))return false;current.activeProfileId=id;attachAliases(current);touch();persist();return true;}
  function addProfile(name,avatar='pico'){if(current.profiles.length>=MAX_PROFILES)return {ok:false,error:'Had maksimum 6 pemain telah dicapai.'};const n=cleanName(name);if(!n)return {ok:false,error:'Masukkan nama pemain.'};const p=makeProfile(n,avatar);current.profiles.push(p);current.activeProfileId=p.id;attachAliases(current);persist();return {ok:true,profile:p};}
  function updateProfile(id,changes={}){const p=current.profiles.find(x=>x.id===id);if(!p)return {ok:false,error:'Profil tidak ditemui.'};const n=cleanName(changes.name??p.name);if(!n)return {ok:false,error:'Masukkan nama pemain.'};p.name=n;if(AVATARS.includes(changes.avatar))p.avatar=changes.avatar;persist();return {ok:true,profile:p};}
  function deleteProfile(id){if(current.profiles.length<=1)return {ok:false,error:'Sekurang-kurangnya satu profil diperlukan.'};const i=current.profiles.findIndex(p=>p.id===id);if(i<0)return {ok:false,error:'Profil tidak ditemui.'};current.profiles.splice(i,1);if(current.activeProfileId===id)current.activeProfileId=current.profiles[0].id;attachAliases(current);persist();return {ok:true};}
  function resetProfile(id){const p=current.profiles.find(x=>x.id===id);if(!p)return false;p.progress=emptyProgress();p.preferences={...p.preferences,celebrations:{},viewedDiscoveries:{}};p.lastPlayedAt=new Date().toISOString();if(p.id===current.activeProfileId)attachAliases(current);persist();return true;}
  function claimCelebration(key){const p=getActiveProfile();if(!p||typeof key!=='string'||!key)return false;const seen=isObject(p.preferences.celebrations)?p.preferences.celebrations:{};if(seen[key])return false;p.preferences={...p.preferences,celebrations:{...seen,[key]:new Date().toISOString()}};persist();return true;}
  const discoveryKey=(year,unit,mission)=>`${Number(year)}:${String(unit)}:${String(mission)}`;
  function isDiscoveryViewed(year,unit,mission){const viewed=getActiveProfile()?.preferences?.viewedDiscoveries;return isObject(viewed)&&viewed[discoveryKey(year,unit,mission)]===true;}
  function markDiscoveryViewed(year,unit,mission){const p=getActiveProfile();if(!p)return false;const viewed=isObject(p.preferences.viewedDiscoveries)?p.preferences.viewedDiscoveries:{};p.preferences={...p.preferences,viewedDiscoveries:{...viewed,[discoveryKey(year,unit,mission)]:true}};persist();return true;}
  function updateSetting(name,value){if(name==='sound'&&typeof value==='boolean')current.settings.sound=value;persist();return current;}
  const missionKeys=['mission1','mission2','mission3','mission4','mission5'];
  const missionRecord=(key='mission1',unit='electricity')=>current.progress.year2[unit]?.[key];
  const isMissionComplete=(key='mission1',unit='electricity')=>missionRecord(key,unit)?.completed===true;
  const completedCount=(unit='electricity')=>missionKeys.filter(k=>isMissionComplete(k,unit)).length;
  const isUnitComplete=(unit='electricity')=>completedCount(unit)===5;
  const year2StorageUnits=['scienceSkills','humans','animals','plants','lightDark','electricity','mixtures'];
  const storageUnit=id=>({'science-skills':'scienceSkills','light-dark':'lightDark'}[id]||id);
  const year2CompletedCount=()=>year2StorageUnits.reduce((n,u)=>n+completedCount(u),0),year2CompletedUnits=()=>year2StorageUnits.filter(isUnitComplete).length,isYear2Complete=()=>year2CompletedCount()===35;
  const isAvailable=(n,u='electricity')=>Number.isInteger(n)&&n>=1&&n<=5&&(n===1||isMissionComplete('mission'+n,u)||isMissionComplete('mission'+(n-1),u));
  function writeMission(record,key,unit){current.progress.year2[unit]={...(isObject(current.progress.year2[unit])?current.progress.year2[unit]:{}),[key]:record};touch();persist();return current;}
  function startMissionAttempt(key='mission1',unit='electricity'){const old=isObject(missionRecord(key,unit))?missionRecord(key,unit):{},attempts=Number.isSafeInteger(old.attempts)&&old.attempts>=0?old.attempts:0;return writeMission({...old,attempts:attempts+1},key,unit);}
  function completeMission(key='mission1',unit='electricity'){const old=isObject(missionRecord(key,unit))?missionRecord(key,unit):{},now=new Date().toISOString();return writeMission({...old,completed:true,attempts:Number.isSafeInteger(old.attempts)&&old.attempts>0?old.attempts:1,completedAt:typeof old.completedAt==='string'?old.completedAt:now,lastCompletedAt:now},key,unit);}
  const year1Units=['science-skills','lab-rules','living-things','humans','animals','plants','magnets','absorption','earth','construction'];
  const year3Units=['science-skills','lab-rules','humans','animals','plants','measurement','density','acid-alkali','solar-system','machines'];
  const year4Units=['science-skills','humans','animals','plants','light-properties','sound','energy','materials','earth','machines'];
  const year5Units=['science-skills','humans','animals','plants','electricity','heat','rust','matter','moon-constellations','machines'];
  const year6Units=['science-skills','microorganisms','living-interactions','conservation','force','speed','food-preservation','waste','eclipses','constellations','machines'];
  function forYear(year){
    if(![1,3,4,5,6].includes(year))throw Error('Unsupported year facade');const units=year===1?year1Units:year===3?year3Units:year===4?year4Units:year===5?year5Units:year6Units,store='year'+year;
    const record=(k,u)=>current.progress[store][u]?.[k],complete=(k,u)=>record(k,u)?.completed===true,count=u=>missionKeys.filter(k=>complete(k,u)).length;
    function write(k,u,finish){if(!units.includes(u)||!missionKeys.includes(k))return current;const old=isObject(record(k,u))?record(k,u):{},attempts=Number.isSafeInteger(old.attempts)&&old.attempts>=0?old.attempts:0,now=new Date().toISOString();const next=finish?{...old,completed:true,attempts:attempts||1,completedAt:typeof old.completedAt==='string'?old.completedAt:now,lastCompletedAt:now}:{...old,attempts:attempts+1};current.progress[store][u]={...(isObject(current.progress[store][u])?current.progress[store][u]:{}),[k]:next};touch();persist();return current;}
    return {isMissionComplete:complete,completedCount:count,isUnitComplete:u=>count(u)===5,isAvailable:(n,u)=>units.includes(u)&&Number.isInteger(n)&&n>=1&&n<=5&&(n===1||complete('mission'+n,u)||complete('mission'+(n-1),u)),startMissionAttempt:(k,u)=>write(k,u,false),completeMission:(k,u)=>write(k,u,true),completedTotal:()=>units.reduce((n,u)=>n+count(u),0),completedUnits:()=>units.filter(u=>count(u)===5).length,isYearComplete:()=>units.every(u=>count(u)===5)};
  }
  function summaryForProgress(value){const old=current.progress;current.progress=cleanProgress(value);const rows=[{year:1,completed:forYear(1).completedTotal(),total:50,units:forYear(1).completedUnits(),unitTotal:10},{year:2,completed:year2CompletedCount(),total:35,units:year2CompletedUnits(),unitTotal:7},{year:3,completed:forYear(3).completedTotal(),total:50,units:forYear(3).completedUnits(),unitTotal:10},{year:4,completed:forYear(4).completedTotal(),total:50,units:forYear(4).completedUnits(),unitTotal:10},{year:5,completed:forYear(5).completedTotal(),total:50,units:forYear(5).completedUnits(),unitTotal:10},{year:6,completed:forYear(6).completedTotal(),total:55,units:forYear(6).completedUnits(),unitTotal:11}];current.progress=old;return rows;}
  const allYearsSummary=()=>summaryForProgress(current.progress),allYearsCompletedTotal=()=>allYearsSummary().reduce((n,r)=>n+r.completed,0),allYearsCompletedUnits=()=>allYearsSummary().reduce((n,r)=>n+r.units,0),allYearsComplete=()=>allYearsCompletedTotal()===290&&allYearsCompletedUnits()===58;
  function profileStats(id=current.activeProfileId){const p=current.profiles.find(x=>x.id===id);if(!p)return null;const years=summaryForProgress(p.progress),completed=years.reduce((n,r)=>n+r.completed,0),units=years.reduce((n,r)=>n+r.units,0);let attempts=0,latest=null;for(const year of Object.values(p.progress))for(const unit of Object.values(year||{}))for(const rec of Object.values(unit||{})){if(isObject(rec)){attempts+=Number.isSafeInteger(rec.attempts)&&rec.attempts>0?rec.attempts:0;const d=rec.lastCompletedAt||rec.completedAt;if(typeof d==='string'&&(!latest||d>latest))latest=d;}}return {profile:p,years,completed,total:290,units,unitTotal:58,percentage:Math.round(completed/290*100),attempts,latest,complete:completed===290&&units===58};}
  return {APP_VERSION,MAX_PROFILES,AVATARS,cleanName,loadData,saveData,canPersist,updateSetting,getData,getProfiles,getActiveProfile,switchProfile,addProfile,updateProfile,deleteProfile,resetProfile,claimCelebration,isDiscoveryViewed,markDiscoveryViewed,profileStats,summaryForProgress,forYear,year1Units,year3Units,year4Units,year5Units,year6Units,allYearsSummary,allYearsCompletedTotal,allYearsCompletedUnits,allYearsComplete,storageUnit,year2StorageUnits,year2CompletedCount,year2CompletedUnits,isYear2Complete,completedCount,isUnitComplete,isAvailable,isMissionComplete,startMissionAttempt,completeMission};
})();
