 'use strict';
window.installPolishChecks=(w,d)=>{
 const events=[],play=w.MakmalRewards.play;w.MakmalRewards.play=event=>{events.push(event);return play(event);};
 let pico=null,lastRoot=null,lastStep=null;
 return {
  events,
  check(){
   const root=d.getElementById('experiment-root');if(!root){pico=null;lastRoot=null;lastStep=null;return;}
   const rail=root.querySelector('.learning-steps');if(!rail)return;
   const step=rail.querySelector('[aria-current]')?.textContent;
   if(root===lastRoot&&step===lastStep&&pico!==root.querySelector('.pico-dialogue'))throw Error('PICO rebuilt within same step');
   lastRoot=root;lastStep=step;pico=root.querySelector('.pico-dialogue');
   if(rail.querySelectorAll('li').length!==5||rail.querySelectorAll('[aria-current]').length!==1)throw Error('Step indicator inconsistent');
   if(root.querySelector('[data-exp="restart"]')?.textContent!=='Main Semula ↻'&&root.querySelector('[data-exp="restart"]'))throw Error('Replay label inconsistent');
   const completion=root.querySelector('.completion');
   if(completion){if(!root.querySelector('.discovery-copy')||!root.querySelector('[data-exp="exit"]'))throw Error('Incomplete shared completion');if(root.querySelector('.circuit-board,.light-room,.mix-tray'))throw Error('Completion repeats whole activity');const finale=root.querySelector('.unit-finale');if(finale&&(!root.querySelector('.unit-count')||!root.querySelector('[data-exp="year2"]')))throw Error('Finale missing count or hub route');}
   for(const el of root.querySelectorAll('button[aria-pressed]'))if(!['true','false'].includes(el.getAttribute('aria-pressed')))throw Error('Invalid aria state');
  },
  click(action,callback){const count=events.length;callback();if(events.length-count>1)throw Error('Duplicate audio for '+action);if(action.includes('hint')&&events.at(-1)!=='hint')throw Error('Hint audio absent');}
 };
};
