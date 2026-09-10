'use strict';
window.MakmalProgress = (() => {
  const APP_VERSION = '0.1.0';
  const KEY = 'makmalCilikData';
  const isObject = value => value !== null && typeof value === 'object' && !Array.isArray(value);
  const defaults = () => ({ version: APP_VERSION, settings: { sound: true }, profile: { name: 'Saintis' }, progress: {} });
  let current = defaults();
  function normalize(value) {
    if (!isObject(value)) return defaults();
    const settings = isObject(value.settings) ? value.settings : {};
    const profile = isObject(value.profile) ? value.profile : {};
    // Preserve unknown fields (including future versions) without implementing progression.
    return { ...value, version: typeof value.version === 'string' ? value.version : APP_VERSION,
      settings: { ...settings, sound: typeof settings.sound === 'boolean' ? settings.sound : true },
      profile: { ...profile, name: typeof profile.name === 'string' && profile.name.trim() ? profile.name : 'Saintis' },
      progress: isObject(value.progress) ? value.progress : {} };
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
  return { APP_VERSION, loadData, saveData, updateSetting };
})();
