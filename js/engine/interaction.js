'use strict';
window.MakmalInteraction = (() => {
  function attach(root, { select, match }) {
    const controller = new AbortController();
    const options = { signal: controller.signal };
    let drag = null, ghost = null, hovered = null, suppressClick = false, suppressionTimer;
    function clean() {
      ghost?.remove(); ghost = null;
      hovered?.classList.remove('drop-hover'); hovered = null;
      root.classList.remove('is-dragging');
      if (drag && root.hasPointerCapture?.(drag.pointerId)) root.releasePointerCapture(drag.pointerId);
      drag = null;
    }
    root.addEventListener('pointerdown', event => {
      suppressClick = false; clearTimeout(suppressionTimer);
      const label = event.target.closest('[data-label]');
      if (!label || label.disabled || event.button !== 0) return;
      drag = { id: label.dataset.label, text: label.textContent, x: event.clientX, y: event.clientY, pointerId: event.pointerId, moved: false };
      try { root.setPointerCapture?.(event.pointerId); } catch (_) { /* Capture may be unavailable; tap fallback remains usable. */ }
    }, options);
    root.addEventListener('pointermove', event => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      if (!drag.moved && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 8) return;
      if (!drag.moved) {
        drag.moved = true;
        ghost = document.createElement('div'); ghost.className = 'drag-label'; ghost.textContent = drag.text;
        ghost.setAttribute('aria-hidden', 'true'); document.body.append(ghost); root.classList.add('is-dragging');
      }
      event.preventDefault();
      ghost.style.left = `${event.clientX}px`; ghost.style.top = `${event.clientY}px`;
      const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-target]');
      if (hovered !== target) { hovered?.classList.remove('drop-hover'); hovered = target; hovered?.classList.add('drop-hover'); }
    }, options);
    root.addEventListener('pointerup', event => {
      if (!drag || event.pointerId !== drag.pointerId) return;
      const { id, moved } = drag;
      const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-target]');
      clean();
      if (moved) {
        suppressClick = true; clearTimeout(suppressionTimer);
        suppressionTimer = setTimeout(() => { suppressClick = false; }, 300);
        if (target && root.contains(target) && !target.disabled) match(id, target.dataset.target);
        else select(id);
      } else {
        suppressClick = true; clearTimeout(suppressionTimer);
        suppressionTimer = setTimeout(() => { suppressClick = false; }, 300);
        select(id);
      }
    }, options);
    root.addEventListener('pointercancel', clean, options);
    root.addEventListener('click', event => {
      if (suppressClick) {
        suppressClick = false;
        if (event.detail !== 0) { event.preventDefault(); event.stopImmediatePropagation(); return; }
      }
      const label = event.target.closest('[data-label]');
      const target = event.target.closest('[data-target]');
      if (label && !label.disabled) select(label.dataset.label);
      if (target && !target.disabled) match(null, target.dataset.target);
    }, { ...options, capture: true });
    return () => { controller.abort(); clearTimeout(suppressionTimer); clean(); };
  }
  return { attach };
})();
