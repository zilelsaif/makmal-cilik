'use strict';
// Capacitor injects its bridge before local scripts; browsers need no SDK.
window.MakmalNative = (() => {
  let initialized = false, exitDialog = null, lastBack = -Infinity, exiting = false;
  async function init() {
    const cap = window.Capacitor;
    if (initialized || !cap?.isNativePlatform?.() || cap.getPlatform() !== 'android') return;
    initialized = true;
    document.documentElement.classList.add('native-android');
    document.getElementById('fullscreen').hidden = true;
    try {
      const app = cap.Plugins?.App || cap.registerPlugin('App');
      await app.addListener('backButton', () => {
        // Some devices deliver the same hardware gesture twice in quick succession.
        const now = Date.now();
        if (now - lastBack < 250 || exiting) return;
        lastBack = now;
        if (exitDialog?.open) { exitDialog.close(); return; }
        if (window.MakmalRouter.currentScreen() !== 'title') { window.MakmalRouter.back(); return; }
        if (!exitDialog) {
          exitDialog = document.createElement('dialog');
          exitDialog.className = 'exit-dialog';
          exitDialog.setAttribute('aria-labelledby', 'exit-title');
          exitDialog.innerHTML = '<h2 id="exit-title">Keluar dari Makmal Cilik?</h2><p>Penemuan yang selesai telah disimpan.</p><div><button class="nav-button" data-stay>Batal</button><button class="primary" data-exit>Keluar</button></div>';
          document.body.append(exitDialog);
          exitDialog.querySelector('[data-stay]').addEventListener('click', () => exitDialog.close());
          exitDialog.querySelector('[data-exit]').addEventListener('click', async () => {
            if (exiting) return;
            exiting = true;
            try { await app.exitApp(); } catch (_) { exitDialog.close(); }
            finally { exiting = false; }
          });
        }
        exitDialog.showModal();
        exitDialog.querySelector('[data-stay]').focus();
      });
      await app.addListener('appStateChange', ({ isActive }) => {
        // Resume keeps the mounted mission and its state; do not rerender or rebind.
        if (!isActive) {
          exitDialog?.close();
          window.MakmalRewards?.stop();
        } else {
          lastBack = -Infinity;
        }
      });
    } catch (_) { /* Optional bridge failure must not break the web game. */ }
  }
  init();
  return { init };
})();
