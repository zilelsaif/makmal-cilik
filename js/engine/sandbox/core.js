'use strict';
window.MakmalSandboxCore=(()=>{
 const xmur3=value=>{let h=1779033703^String(value).length;for(let i=0;i<String(value).length;i++)h=Math.imul(h^String(value).charCodeAt(i),3432918353),h=h<<13|h>>>19;return()=>{h=Math.imul(h^h>>>16,2246822507);h=Math.imul(h^h>>>13,3266489909);return(h^h>>>16)>>>0;};};
 const mulberry32=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};
 const rngFor=(id,seed,version=1)=>mulberry32(xmur3(`${id}|${seed}|${version}`)());
 const pick=(rng,items)=>items[Math.floor(rng()*items.length)];
 const clamp=(n,min,max)=>Math.min(max,Math.max(min,Number(n)));
 const freeze=value=>{if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.freeze(value);Object.values(value).forEach(freeze);}return value;};
 const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const trialPair=history=>history.slice(-2);
 return {xmur3,mulberry32,rngFor,pick,clamp,freeze,esc,trialPair};
})();
