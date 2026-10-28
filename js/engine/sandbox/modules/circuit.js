'use strict';
window.MakmalSandboxModels=window.MakmalSandboxModels||{};
window.MakmalSandboxModels.circuit=(()=>{
 const defaults=()=>({connections:{batterySwitch:true,switchBulb:false,bulbBattery:true},switchClosed:false});
 const normalize=s=>({connections:{batterySwitch:Boolean(s?.connections?.batterySwitch),switchBulb:Boolean(s?.connections?.switchBulb),bulbBattery:Boolean(s?.connections?.bulbBattery),batteryShort:Boolean(s?.connections?.batteryShort)},switchClosed:Boolean(s?.switchClosed)});
 function run(s){const state=normalize(s),c=state.connections,short=Boolean(c.batteryShort),complete=c.batterySwitch&&c.switchBulb&&c.bulbBattery&&!short,lit=complete&&state.switchClosed;return {lit,complete,short,observation:short?'Sambungan terus pada bateri tidak selamat dan bukan litar mentol yang betul.':lit?'Litar lengkap dan suis tertutup. Mentol menyala.':complete?'Litar lengkap tetapi suis terbuka. Mentol padam.':'Litar belum lengkap. Mentol padam.'};}
 function toggleConnection(s,key){const state=normalize(s);if(!Object.hasOwn(state.connections,key))return state;state.connections[key]=!state.connections[key];return state;}
 const validate=(challenge,state)=>{const r=run(state);return challenge.target==='lit'?r.lit:challenge.target==='off-open'?r.complete&&!state.switchClosed&&!r.short:challenge.target==='safe-complete'?r.complete&&!r.short:false;};
 return {defaults,normalize,run,toggleConnection,validate};
})();
