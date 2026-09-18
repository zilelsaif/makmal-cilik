'use strict';
window.MakmalFeedback = (() => {
  const map={click:'uiTap',select:'uiSelect',itemSelected:'uiSelect',movement:'uiSelect',switch:'uiSelect',connection:'uiSelect',wrong:'incorrect',complete:'missionComplete'};
  const positive=new Set(['correct','itemFound','magnetPickup','sieveAction','stirring','watering','plantGrowth','correctMatch','recovery','measurement','classification','observation','lightOn','shadowFormed','bulb','repair','separation']);
  const type=raw=>map[raw]||(positive.has(raw)?'correct':raw)||'uiTap';
  const reaction=event=>({incorrect:'encourage',hint:'thinking',correct:'happy',discovery:'curious',missionComplete:'celebrate',unitComplete:'celebrate',yearComplete:'celebrate',masterComplete:'celebrate'}[type(event)]||null);
  function emit(raw,{root,message}={}){const event=type(raw);window.MakmalRewards?.play(event);if(root){root.dataset.feedback=event;const bubble=root.querySelector('.pico-dialogue'),pose=reaction(event);if(bubble&&pose)bubble.className=`pico-dialogue pico-${pose}`;}if(message)window.dispatchEvent(new CustomEvent('makmal:toast',{detail:{message,type:event==='incorrect'?'warning':event==='uiTap'?'info':'success'}}));return event;}
  return {type,reaction,emit};
})();
