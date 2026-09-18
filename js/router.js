'use strict';
window.MakmalRouter = (() => {
  const valid = new Set(['profileSelect','profileCreate','profileEdit','parentProfileCreate','parentProfileEdit','parentGate','parentGateConfirm','parentDashboard','support','confirmAction','masterComplete','year1','year1Unit','year1Experiment','year1Complete','year6','year6Unit','year6Experiment','year6Complete','year5','year5Unit','year5Experiment','year5Complete','year4','year4Unit','year4Experiment','year4Complete','year3', 'year3Unit', 'year3Experiment', 'year3Complete', 'title', 'mainMenu', 'yearSelect', 'year2', 'year2Complete', 'unitDetail', 'missionPlaceholder', 'experiment', 'placeholder']);
  const parents = {profileSelect:'title',profileCreate:'profileSelect',profileEdit:'profileSelect',parentProfileCreate:'parentDashboard',parentProfileEdit:'parentDashboard',parentGate:'mainMenu',parentGateConfirm:'parentGate',parentDashboard:'mainMenu',support:'parentDashboard',confirmAction:'parentDashboard',masterComplete:'yearSelect',year1:'yearSelect',year1Unit:'year1',year1Experiment:'year1Unit',year1Complete:'year1',year6:'yearSelect',year6Unit:'year6',year6Experiment:'year6Unit',year6Complete:'year6',year5:'yearSelect',year5Unit:'year5',year5Experiment:'year5Unit',year5Complete:'year5',year4:'yearSelect',year4Unit:'year4',year4Experiment:'year4Unit',year4Complete:'year4',year3:'yearSelect', year3Unit:'year3', year3Experiment:'year3Unit', year3Complete:'year3', mainMenu: 'profileSelect', yearSelect: 'mainMenu', year2: 'yearSelect', year2Complete: 'year2', unitDetail: 'year2', missionPlaceholder: 'unitDetail', experiment: 'unitDetail', placeholder: 'mainMenu' };
  let current = 'title';
  let currentContext = {};
  let render;
  function resolve(screen, context) {
    if (!valid.has(screen)) return { screen: 'title', context: {} };
    if (screen === 'masterComplete' && !window.MakmalProgress.allYearsComplete()) return {screen:'yearSelect', context:{}};
    if (screen === 'year2Complete' && !window.MakmalProgress.isYear2Complete()) return {screen:'year2', context:{}};
    context = context && typeof context === 'object' ? context : {};
    if (screen.startsWith('year3')) {
      const p=window.MakmalProgress.forYear(3), unit=window.MakmalYear3?.units.find(u=>u.id===context.unitId);
      if(screen==='year3Complete'&&!p.isYearComplete())return {screen:'year3',context:{}};
      if(['year3Unit','year3Experiment'].includes(screen)&&!unit)return {screen:'year3',context:{}};
      if(screen==='year3Experiment'&&(!unit.missions.some(m=>m.id===context.missionId)||!p.isAvailable(Number(context.missionId.split('-').pop()),unit.id)))return {screen:'year3Unit',context:{unitId:unit.id}};
    }
    if (screen.startsWith('year4')) {
      const p=window.MakmalProgress.forYear(4), unit=window.MakmalYear4?.units.find(u=>u.id===context.unitId);
      if(screen==='year4Complete'&&!p.isYearComplete())return {screen:'year4',context:{}};
      if(['year4Unit','year4Experiment'].includes(screen)&&!unit)return {screen:'year4',context:{}};
      if(screen==='year4Experiment'&&(!unit.missions.some(m=>m.id===context.missionId)||!p.isAvailable(Number(context.missionId.split('-').pop()),unit.id)))return {screen:'year4Unit',context:{unitId:unit.id}};
    }
    if (screen.startsWith('year5')) {
      const p=window.MakmalProgress.forYear(5), unit=window.MakmalYear5?.units.find(u=>u.id===context.unitId);
      if(screen==='year5Complete'&&!p.isYearComplete())return {screen:'year5',context:{}};
      if(['year5Unit','year5Experiment'].includes(screen)&&!unit)return {screen:'year5',context:{}};
      if(screen==='year5Experiment'&&(!unit.missions.some(m=>m.id===context.missionId)||!p.isAvailable(Number(context.missionId.split('-').pop()),unit.id)))return {screen:'year5Unit',context:{unitId:unit.id}};
    }
    if (screen.startsWith('year1')) {
      const p=window.MakmalProgress.forYear(1), unit=window.MakmalYear1?.units.find(u=>u.id===context.unitId);
      if(screen==='year1Complete'&&!p.isYearComplete())return {screen:'year1',context:{}};
      if(['year1Unit','year1Experiment'].includes(screen)&&!unit)return {screen:'year1',context:{}};
      if(screen==='year1Experiment'&&(!unit.missions.some(m=>m.id===context.missionId)||!p.isAvailable(Number(context.missionId.split('-').pop()),unit.id)))return {screen:'year1Unit',context:{unitId:unit.id}};
    }
    if (screen.startsWith('year6')) {
      const p=window.MakmalProgress.forYear(6), unit=window.MakmalYear6?.units.find(u=>u.id===context.unitId);
      if(screen==='year6Complete'&&!p.isYearComplete())return {screen:'year6',context:{}};
      if(['year6Unit','year6Experiment'].includes(screen)&&!unit)return {screen:'year6',context:{}};
      if(screen==='year6Experiment'&&(!unit.missions.some(m=>m.id===context.missionId)||!p.isAvailable(Number(context.missionId.split('-').pop()),unit.id)))return {screen:'year6Unit',context:{unitId:unit.id}};
    }
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
  return { init, navigate, currentScreen: () => current, back: () => navigate(parents[current] || 'title', (current === 'missionPlaceholder' || current === 'experiment' || current === 'year3Experiment' || current === 'year4Experiment' || current === 'year5Experiment' || current === 'year1Experiment' || current === 'year6Experiment') ? { unitId: currentContext.unitId } : {}), home: () => navigate('mainMenu') };
})();
