'use strict';
window.MakmalProgress = (() => {
  const APP_VERSION = '0.7.0';
  const KEY = 'makmalCilikData';
  const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  const defaults = () => ({ version: APP_VERSION, settings: { sound: true }, profile: { name: 'Saintis' }, progress: { year2: {} } });
  let current = defaults();
  function normalize(value) {
    if (!isObject(value)) return defaults();
    const settings = isObject(value.settings) ? value.settings : {};
    const profile = isObject(value.profile) ? value.profile : {};
    // Preserve unknown fields and future versions while migrating supported saves.
    return { ...value, version: typeof value.version === 'string' && !['0.1.0', '0.2.0', '0.3.0', '0.4.0', '0.5.0', '0.6.0'].includes(value.version) ? value.version : APP_VERSION,
      settings: { ...settings, sound: typeof settings.sound === 'boolean' ? settings.sound : true },
      profile: { ...profile, name: typeof profile.name === 'string' && profile.name.trim() ? profile.name : 'Saintis' },
      progress: { ...(isObject(value.progress) ? value.progress : {}), year2: isObject(value.progress?.year2) ? value.progress.year2 : {} } };
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
  return { APP_VERSION, loadData, saveData, updateSetting, getData, isMissionComplete, completedCount, isUnitComplete, isAvailable, startMissionAttempt, completeMission };
})();
