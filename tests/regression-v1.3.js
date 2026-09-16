'use strict';
document.getElementById('run').onclick=async()=>{
 const out=document.getElementById('results'),button=document.getElementById('run');button.disabled=true;out.textContent='';
 try{for(const name of ['release-browser','electricity-unit-browser','light-browser','mixture-browser','plants-browser','android-browser']){
 const frame=document.createElement('iframe');frame.src=name+'.html';document.getElementById('frame').replaceChildren(frame);await new Promise(r=>frame.onload=r);frame.contentDocument.getElementById('run').click();
 while(true){await new Promise(r=>setTimeout(r,500));const text=frame.contentDocument.getElementById('results').textContent;
 if(text.includes('FAIL'))throw Error(name+': '+text.split('\n').slice(-2).join('\n'));
 if(text.includes('ALL ')){out.textContent+=name+': '+text.split('\n').filter(Boolean).at(-1)+'\n';break;}}
 }out.textContent+='ALL REGRESSION SUITES PASSED';}catch(e){out.textContent+='FAIL '+e.message;}finally{button.disabled=false;}
};
