'use strict';
window.MakmalRouter = (() => {
  const valid = new Set(['title', 'mainMenu', 'yearSelect', 'year2', 'year2Complete', 'unitDetail', 'missionPlaceholder', 'experiment', 'placeholder']);
  const parents = { mainMenu: 'title', yearSelect: 'mainMenu', year2: 'yearSelect', year2Complete: 'year2', unitDetail: 'year2', missionPlaceholder: 'unitDetail', experiment: 'unitDetail', placeholder: 'mainMenu' };
  let current = 'title';
  let currentContext = {};
  let render;
  function resolve(screen, context) {
    if (!valid.has(screen)) return { screen: 'title', context: {} };
    if (screen === 'year2Complete' && !window.MakmalProgress.isYear2Complete()) return {screen:'year2', context:{}};
    context = context && typeof context === 'object' ? context : {};
    if (screen === 'unitDetail' || screen === 'missionPlaceholder') {
      const unit = window.MakmalContent.getUnit(context.unitId);
      if (!unit) return { screen: 'year2', context: {} };
      if (screen === 'missionPlaceholder' && !unit.missions.some(m => m.id === context.missionId)) return { screen: 'unitDetail', context: { unitId: unit.id } };
    }
    if (screen === 'experiment') {
      if (!['electricity', 'light-dark', 'mixtures', 'plants', 'animals', 'humans', 'science-skills'].includes(context.unitId) || !new RegExp('^' + context.unitId + '-[1-5]$').test(context.missionId)) return { screen: 'year2', context: {} };
    }
    if (screen === 'experiment' && !window.MakmalProgress.isAvailable(Number(context.missionId.split('-').pop()), window.MakmalProgress.storageUnit(context.unitId))) return { screen: 'unitDetail', context: { unitId: context.unitId } };
    return { screen, context };
  }
  function display(state) {
    current = state.screen; currentContext = state.context;
    render(current, currentContext);
    document.getElementById('screen').focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
  function navigate(screen, context = {}, replace = false) {
    const state = resolve(screen, context);
    history[replace ? 'replaceState' : 'pushState'](state, '');
    display(state);
  }
  function init(renderer) {
    render = renderer;
    navigate('title', {}, true);
    window.addEventListener('popstate', event => display(resolve(event.state?.screen, event.state?.context)));
  }
  // Future gameplay can extend these routes without changing content records.
  return { init, navigate, back: () => navigate(parents[current] || 'title', (current === 'missionPlaceholder' || current === 'experiment') ? { unitId: currentContext.unitId } : {}), home: () => navigate('mainMenu') };
})();
