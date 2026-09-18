'use strict';
window.MakmalProgress = (() => {
  const APP_VERSION = '1.7.0';
  const KEY = 'makmalCilikData';
  const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  const defaults = () => ({ version: APP_VERSION, settings: { sound: true }, profile: { name: 'Saintis' }, progress: { year1: {}, year2: {}, year3: {}, year4: {}, year5: {}, year6: {} } });
  let current = defaults();
  function normalize(value) {
    if (!isObject(value)) return defaults();
    const settings = isObject(value.settings) ? value.settings : {};
    const profile = isObject(value.profile) ? value.profile : {};
    // Preserve unknown fields and future versions while migrating supported saves.
    return { ...value, version: typeof value.version === 'string' && !['0.1.0', '0.2.0', '0.3.0', '0.4.0', '0.5.0', '0.6.0', '0.7.0', '0.8.0', '0.9.0', '1.0.0', '1.1.0', '1.2.0', '1.3.0', '1.4.0', '1.5.0', '1.6.0'].includes(value.version) ? value.version : APP_VERSION,
      settings: { ...settings, sound: typeof settings.sound === 'boolean' ? settings.sound : true },
      profile: { ...profile, name: typeof profile.name === 'string' && profile.name.trim() ? profile.name : 'Saintis' },
      progress: { ...(isObject(value.progress) ? value.progress : {}), year1: isObject(value.progress?.year1) ? value.progress.year1 : {}, year2: isObject(value.progress?.year2) ? value.progress.year2 : {}, year3: isObject(value.progress?.year3) ? value.progress.year3 : {}, year4: isObject(value.progress?.year4) ? value.progress.year4 : {}, year5: isObject(value.progress?.year5) ? value.progress.year5 : {}, year6: isObject(value.progress?.year6) ? value.progress.year6 : {} } };
  }
  function loadData() {
    try { current = normalize(JSON.parse(localStorage.getItem(KEY))); } catch (_) { current = defaults(); }
    return current;
  }
  function saveData(data = current) {
    current = normalize(data);
    try { localStorage.setItem(KEY, JSON.stringify(current)); } catch (_) { /* Keep an in-memory preference when storage is unavailable. */ }
    return current;
  }
  function updateSetting(name, value) {
    if (name === 'sound' && typeof value === 'boolean') current.settings.sound = value;
    return saveData();
  }
  const getData = () => current;
  const missionRecord = (key = 'mission1', unit = 'electricity') => current.progress.year2[unit]?.[key];
  const isMissionComplete = (key = 'mission1', unit = 'electricity') => missionRecord(key, unit)?.completed === true;
  const missionKeys = ['mission1', 'mission2', 'mission3', 'mission4', 'mission5'];
  const completedCount = (unit = 'electricity') => missionKeys.filter(key => isMissionComplete(key, unit)).length;
  const isUnitComplete = (unit = 'electricity') => completedCount(unit) === missionKeys.length;
  const year2StorageUnits = ['scienceSkills','humans','animals','plants','lightDark','electricity','mixtures'];
  const storageUnit = id => ({'science-skills':'scienceSkills','light-dark':'lightDark'}[id] || id);
  const year2CompletedCount = () => year2StorageUnits.reduce((n,unit)=>n+completedCount(unit),0);
  const year2CompletedUnits = () => year2StorageUnits.filter(unit=>isUnitComplete(unit)).length;
  const isYear2Complete = () => year2CompletedCount() === 35;
  function isAvailable(number, unit = 'electricity') {
    return Number.isInteger(number) && number >= 1 && number <= 5 &&
      (number === 1 || isMissionComplete('mission' + number, unit) || isMissionComplete('mission' + (number - 1), unit));
  }
  function writeMission(record, key, unit) {
    const existing = isObject(current.progress.year2[unit]) ? current.progress.year2[unit] : {};
    current.progress.year2[unit] = { ...existing, [key]: record };
    return saveData();
  }
  function startMissionAttempt(key = 'mission1', unit = 'electricity') {
    const old = isObject(missionRecord(key, unit)) ? missionRecord(key, unit) : {};
    const attempts = Number.isSafeInteger(old.attempts) && old.attempts >= 0 ? old.attempts : 0;
    return writeMission({ ...old, attempts: attempts + 1 }, key, unit);
  }
  function completeMission(key = 'mission1', unit = 'electricity') {
    const old = isObject(missionRecord(key, unit)) ? missionRecord(key, unit) : {};
    const now = new Date().toISOString();
    return writeMission({ ...old, completed: true, attempts: Number.isSafeInteger(old.attempts) && old.attempts > 0 ? old.attempts : 1, completedAt: typeof old.completedAt === 'string' ? old.completedAt : now, lastCompletedAt: now }, key, unit);
  }
  // Year-scoped facade keeps existing Year 2 signatures and records unchanged.
  const year1Units = ['science-skills','lab-rules','living-things','humans','animals','plants','magnets','absorption','earth','construction'];
  const year3Units = ['science-skills','lab-rules','humans','animals','plants','measurement','density','acid-alkali','solar-system','machines'];
  const year4Units = ['science-skills','humans','animals','plants','light-properties','sound','energy','materials','earth','machines'];
  const year5Units = ['science-skills','humans','animals','plants','electricity','heat','rust','matter','moon-constellations','machines'];
  const year6Units = ['science-skills','microorganisms','living-interactions','conservation','force','speed','food-preservation','waste','eclipses','constellations','machines'];
  function forYear(year) {
    if (![1,3,4,5,6].includes(year)) throw new Error('Unsupported year facade');
    const units = year === 1 ? year1Units : year === 3 ? year3Units : year === 4 ? year4Units : year === 5 ? year5Units : year6Units;
    const store = 'year'+year;
    const record = (key, unit) => current.progress[store][unit]?.[key];
    const complete = (key, unit) => record(key, unit)?.completed === true;
    const count = unit => missionKeys.filter(key => complete(key, unit)).length;
    function write(key, unit, finish) {
      if (!units.includes(unit) || !missionKeys.includes(key)) return current;
      const old = isObject(record(key, unit)) ? record(key, unit) : {};
      const attempts = Number.isSafeInteger(old.attempts) && old.attempts >= 0 ? old.attempts : 0;
      const next = finish ? {...old, completed:true, attempts:attempts || 1, completedAt:typeof old.completedAt==='string'?old.completedAt:new Date().toISOString()} : {...old, attempts:attempts+1};
      current.progress[store][unit] = {...(isObject(current.progress[store][unit])?current.progress[store][unit]:{}), [key]:next};
      return saveData();
    }
    return {isMissionComplete:complete, completedCount:count, isUnitComplete:unit=>count(unit)===5,
      isAvailable:(n,unit)=>units.includes(unit)&&Number.isInteger(n)&&n>=1&&n<=5&&(n===1||complete('mission'+n,unit)||complete('mission'+(n-1),unit)),
      startMissionAttempt:(key,unit)=>write(key,unit,false), completeMission:(key,unit)=>write(key,unit,true),
      completedTotal:()=>units.reduce((n,u)=>n+count(u),0), completedUnits:()=>units.filter(u=>count(u)===5).length,
      isYearComplete:()=>units.every(u=>count(u)===5)};
  }
  const allYearsCompletedTotal=()=>forYear(1).completedTotal()+year2CompletedCount()+forYear(3).completedTotal()+forYear(4).completedTotal()+forYear(5).completedTotal()+forYear(6).completedTotal();
  const allYearsCompletedUnits=()=>forYear(1).completedUnits()+year2CompletedUnits()+forYear(3).completedUnits()+forYear(4).completedUnits()+forYear(5).completedUnits()+forYear(6).completedUnits();
  const allYearsComplete=()=>allYearsCompletedTotal()===290&&allYearsCompletedUnits()===58;
  return { APP_VERSION, forYear, year1Units, year3Units, year4Units, year5Units, year6Units, allYearsCompletedTotal, allYearsCompletedUnits, allYearsComplete, storageUnit, year2StorageUnits, year2CompletedCount, year2CompletedUnits, isYear2Complete, loadData, saveData, updateSetting, getData, isMissionComplete, completedCount, isUnitComplete, isAvailable, startMissionAttempt, completeMission };
})();
