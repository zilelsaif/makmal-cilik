'use strict';
window.MakmalRouter = (() => {
  const valid = new Set(['title', 'mainMenu', 'yearSelect', 'year2', 'placeholder']);
  const parents = { mainMenu: 'title', yearSelect: 'mainMenu', year2: 'yearSelect', placeholder: 'mainMenu' };
  let current = 'title';
  let render;
  function navigate(screen, context = {}, replace = false) {
    if (!valid.has(screen)) screen = 'title';
    current = screen;
    history[replace ? 'replaceState' : 'pushState']({ screen, context }, '');
    render(screen, context);
    document.getElementById('screen').focus({ preventScroll: true });
    window.scrollTo(0, 0);
  }
  function init(renderer) {
    render = renderer;
    navigate('title', {}, true);
    window.addEventListener('popstate', event => {
      current = valid.has(event.state?.screen) ? event.state.screen : 'title';
      render(current, event.state?.context || {});
      document.getElementById('screen').focus({ preventScroll: true });
      window.scrollTo(0, 0);
    });
  }
  // Future experiment routes can extend this registry with Ramal → Cuba → Perhati → Fikir → Temui.
  return { init, navigate, back: () => navigate(parents[current] || 'title'), home: () => navigate('mainMenu') };
})();
