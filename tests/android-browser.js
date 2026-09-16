document.getElementById('run').onclick=async()=>{
 const out=document.getElementById('results');out.textContent='';const assert=(v,m)=>{if(!v)throw Error(m);};
 try{const html=await(await fetch('../index.html')).text();for(const [width,height] of [[1366,768],[1920,1080],[390,844],[360,640],[800,450]]){
 const frame=document.createElement('iframe');frame.style.width=width+'px';frame.style.height=height+'px';
 const boot=`<base href="../"><script>window.qaErrors=[];window.qaExit=0;window.qaListeners=0;window.Capacitor={isNativePlatform:()=>true,getPlatform:()=> 'android',Plugins:{App:{addListener:async(n,cb)=>{if(n==='backButton')window.qaBack=cb;else if(n==='appStateChange')window.qaResume=cb;qaListeners++;},exitApp:async()=>{qaExit++;}}}};let raw=null;Object.defineProperty(window,'localStorage',{value:{getItem:()=>raw,setItem:(k,v)=>raw=v}});addEventListener('error',e=>{if(e.message)qaErrors.push(e.message)});addEventListener('unhandledrejection',e=>qaErrors.push(String(e.reason)));<\/script>`;
 frame.srcdoc=html.replace('<head>','<head>'+boot);document.getElementById('frame').replaceChildren(frame);await new Promise(r=>frame.onload=r);
 const w=frame.contentWindow,d=frame.contentDocument,p=w.MakmalProgress;let tick=0;w.Date.now=()=>tick;const press=()=>{tick+=300;w.qaBack();};d.documentElement.style.setProperty('--safe-area-inset-top','24px');d.documentElement.style.setProperty('--safe-area-inset-bottom','24px');d.documentElement.style.setProperty('--safe-area-inset-left','12px');d.documentElement.style.setProperty('--safe-area-inset-right','12px');
 const check=()=>{assert(d.documentElement.scrollWidth<=w.innerWidth,'Overflow');assert(w.qaErrors.length===0,w.qaErrors.join(';'));};
 assert(w.qaListeners===2&&d.getElementById('fullscreen').hidden,'Native registration/fullscreen');await w.MakmalNative.init();assert(w.qaListeners===2,'Duplicate listener');check();
 press();assert(d.querySelector('dialog').open,'Exit confirmation absent');w.qaBack();assert(d.querySelector('dialog').open,'Duplicate Back dismissed dialog');assert(d.querySelector('#exit-title').textContent==='Keluar dari Makmal Cilik?','Exit heading');press();assert(!d.querySelector('dialog').open,'Back must dismiss dialog');press();d.querySelector('[data-stay]').click();assert(!d.querySelector('dialog').open,'Stay failed');
 for(const unit of p.year2StorageUnits)for(let n=1;n<=5;n++)p.completeMission('mission'+n,unit);const before=JSON.stringify(p.getData());
 for(const unit of w.MakmalContent.year2Units){for(const m of unit.missions){w.MakmalRouter.navigate('experiment',{unitId:unit.id,missionId:m.id});d.querySelector('[data-exp="start"]').click();
 const predict=d.querySelector('[data-exp="predict"]');assert(predict,'Prediction missing');predict.click();
 // Needs prediction may require several choices; preserve any partial decision during rotation.
 const activity=d.getElementById('experiment-root'),beforeHTML=activity.innerHTML,beforeSave=JSON.stringify(p.getData());
 w.qaResume({isActive:false});w.qaResume({isActive:true});await w.MakmalNative.init();
 frame.style.width=height+'px';frame.style.height=width+'px';await new Promise(r=>setTimeout(r,25));check();
 assert(activity===d.getElementById('experiment-root')&&activity.innerHTML===beforeHTML,'Rotation/resume reset mission');assert(JSON.stringify(p.getData())===beforeSave,'Resume changed progress');assert(w.qaListeners===2,'Resume duplicated listeners');
 frame.style.width=width+'px';frame.style.height=height+'px';await new Promise(r=>setTimeout(r,25));check();press();assert(w.MakmalRouter.currentScreen()==='unitDetail'&&w.qaExit===0,'Back exited mission');}}
 press();assert(w.MakmalRouter.currentScreen()==='year2','Back to hub');check();w.MakmalRouter.navigate('year2Complete');check();press();assert(w.MakmalRouter.currentScreen()==='year2','Finale Back');
 const y3=p.forYear(3);for(const unit of w.MakmalYear3.units)for(const m of unit.missions)y3.completeMission('mission'+m.number,unit.id);
 for(const unit of w.MakmalYear3.units)for(const m of unit.missions){w.MakmalRouter.navigate('year3Experiment',{unitId:unit.id,missionId:m.id});d.querySelector('[data-exp="start"]').click();d.querySelector('[data-exp="predict"]').click();d.querySelector('[data-exp="next"]').click();
 const activity=d.getElementById('experiment-root'),beforeHTML=activity.innerHTML,beforeSave=JSON.stringify(p.getData());w.qaResume({isActive:false});w.qaResume({isActive:true});await w.MakmalNative.init();
 frame.style.width=height+'px';frame.style.height=width+'px';await new Promise(r=>setTimeout(r,0));check();assert(activity.innerHTML===beforeHTML&&JSON.stringify(p.getData())===beforeSave,'Year 3 rotation/resume changed state');assert(w.qaListeners===2,'Year 3 duplicated listeners');
 frame.style.width=width+'px';frame.style.height=height+'px';press();assert(w.MakmalRouter.currentScreen()==='year3Unit'&&w.qaExit===0,'Year 3 Back');check();}
 press();assert(w.MakmalRouter.currentScreen()==='year3','Year 3 hub Back');w.MakmalRouter.navigate('year3Complete');check();press();assert(w.MakmalRouter.currentScreen()==='year3','Year 3 finale Back');assert(y3.completedTotal()===50,'Year 3 progress lost');
 for(const expected of ['yearSelect','mainMenu','title']){press();assert(w.MakmalRouter.currentScreen()===expected,'Wrong parent');check();}
 assert(p.year2CompletedCount()===35,'Progress lost');press();d.querySelector('[data-exit]').click();await Promise.resolve();assert(w.qaExit===1,'Explicit exit failed');assert(!w.qaErrors.length,'Errors');out.textContent+=`PASS ${width}×${height}: 85 mission Back routes, rotation/resume retained state, safe areas, finales, exit confirmation, no errors.\n`;
 }out.textContent+='ALL 5 ANDROID SHELL SCENARIOS PASSED';}catch(e){out.textContent+='FAIL '+e.message;}
};
