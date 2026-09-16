'use strict';
window.MakmalYear3Domains.measurement={
 init(s){Object.assign(s,{marks:[],cubes:0,layer:0,water:0,eye:false,initial:false,inserted:false,offset:2,index:0,readings:[],recorded:false});},
 solved(s,d){return d.mode==='length'?s.readings.length===d.values.length:s.recorded;},
 expected(s,d){return d.mode==='length'?d.values[s.index]:d.value;},
 ready(s,d){return d.mode==='length'?s.offset===0:d.mode==='area'?s.marks.length===12:d.mode==='estimate'?s.marks.length===10:d.mode==='volume'?s.cubes===12:d.mode==='liquid'?s.water===60&&s.eye:s.initial&&s.inserted;},
 act(s,d,a,v){const ui=window.MakmalYear3UI;
  if(a==='mark'&&['area','estimate'].includes(d.mode)&&Number.isInteger(Number(v))&&Number(v)>=0&&Number(v)<(d.mode==='area'?12:10)&&!s.marks.includes(v)){s.marks.push(v);s.effect='measurement';}
  if(a==='cube'&&d.mode==='volume'&&s.cubes<12){s.cubes++;s.layer=s.cubes>6?1:0;s.effect='measurement';}
  if(a==='layer'&&d.mode==='volume'&&['0','1'].includes(v))s.layer=Number(v);
  if(a==='pour'&&d.mode==='liquid'&&s.water<60){s.water+=10;s.effect='measurement';}
  if(a==='eye'&&d.mode==='liquid')s.eye=true;
  if(a==='baseline'&&d.mode==='displacement')s.initial=true;
  if(a==='insert'&&d.mode==='displacement'&&s.initial)s.inserted=true;
  if(a==='align'&&d.mode==='length'&&s.offset>0)s.offset--;
  if(a==='read'&&!this.solved(s,d)){
   if(this.ready(s,d)&&Number(v)===this.expected(s,d)){
    if(d.mode==='length'){s.readings.push(Number(v));if(s.index<d.values.length-1){s.index++;s.offset=2;}}else s.recorded=true;
    ui.message(s,'✓ Bacaan '+v+' dicatat daripada model.');
   }else ui.message(s,this.ready(s,d)?'Lihat tanda atau bilangan unit sekali lagi.':'Lengkapkan tindakan pengukuran sebelum mencatat.',false);
  }
 },
 hint(s,d){if(this.solved(s,d))return ['next',undefined,'Bacaan sudah dicatat.'];if(!this.ready(s,d)){
  if(d.mode==='area'||d.mode==='estimate')return ['mark',String(Array.from({length:d.mode==='area'?12:10},(_,i)=>i).find(i=>!s.marks.includes(String(i)))),'Tandakan petak yang belum dikira.'];
  if(d.mode==='length')return ['align',undefined,'Sejajarkan tanda 0 dengan hujung kiri objek.'];
  if(d.mode==='volume')return ['cube',undefined,'Isi ruang dengan satu lagi kubus unit.'];
  if(d.mode==='liquid')return s.water<60?['pour',undefined,'Tuang 10 mL lagi sehingga 60 mL.']:['eye',undefined,'Baca pada aras mata.'];
  return !s.initial?['baseline',undefined,'Catat paras awal 50 mL.']:['insert',undefined,'Tenggelamkan batu sepenuhnya.'];
 }return ['read',String(this.expected(s,d)),'Catat bacaan yang ditunjukkan oleh model.'];},
 render(s,d,active){const ui=window.MakmalYear3UI,b=ui.button;let scene='',unit='cm²';
  if(['area','estimate'].includes(d.mode)){
   const n=d.mode==='area'?12:10;scene=`<div class="y3-square-grid">${Array.from({length:n},(_,i)=>`<button class="y3-square ${d.mode==='estimate'&&i>=6?'half':''} ${s.marks.includes(String(i))?'counted':''}" data-exp="mark" data-value="${i}" ${!active||s.marks.includes(String(i))?'disabled':''} aria-label="Petak ${i+1}, ${d.mode==='estimate'&&i>=6?'separuh':'penuh'}">${s.marks.includes(String(i))?'✓':'＋'}</button>`).join('')}</div><p>Setiap petak penuh: 1 cm². ${s.marks.length} petak ditandakan.${d.mode==='estimate'?' Enam petak penuh dan empat separuh petak menutupi model daun.':''}</p>`;
  }else if(d.mode==='volume'){
   unit='cm³';scene=`<div class="y3-square-grid cubes">${Array.from({length:6},(_,i)=>`<span class="y3-cube ${s.cubes>i+s.layer*6?'filled':''}">${s.cubes>i+s.layer*6?'1 cm³':'Kosong'}</span>`).join('')}</div><p>Lapisan ${s.layer+1} daripada 2 · ${s.cubes} / 12 kubus di dalam kotak</p>${active?b('cube',undefined,'Tambah kubus 1 cm³',s.cubes===12)+b('layer','0','Lihat lapisan bawah',false,s.layer===0)+b('layer','1','Lihat lapisan atas',false,s.layer===1):''}`;
  }else if(d.mode==='length'){
   unit='cm';const length=d.values[s.index];scene=ui.svg(`<rect x="${60+s.offset*25}" y="45" width="${length*25}" height="35" rx="10" fill="#ffd539"/><path d="M60 90V170" stroke="#d95132" stroke-dasharray="5 5"/><rect x="60" y="112" width="220" height="48" fill="#fff4bc" stroke="#123c70"/>${Array.from({length:9},(_,i)=>`<path d="M${60+i*25} 112v15" stroke="#123c70"/><text x="${60+i*25}" y="149" text-anchor="middle">${i}</text>`).join('')}`,'Pembaris dan objek, sejajarkan sifar')+`<p>Objek ${s.index+1} · ${s.offset?'Belum sejajar sifar':'✓ Sejajar sifar'}</p>${active?b('align',undefined,'Alih ke tanda sifar',s.offset===0):''}<p>Catatan: ${s.readings.join(', ')||'Belum ada'} cm</p>`;
  }else{
   unit=d.mode==='displacement'?'cm³':'mL';const level=d.mode==='liquid'?s.water:s.inserted?70:50;
   scene=ui.svg(`<path d="M110 25V185H245V25" fill="#f3fbff" stroke="#17639c" stroke-width="4"/><path d="M114 ${180-level*1.8}Q177 ${190-level*1.8} 241 ${180-level*1.8}V181H114Z" fill="#74d8ff"/>${[0,10,20,30,40,50,60,70,80].map(n=>`<path d="M245 ${180-n*1.8}h12" stroke="#143b65"/><text x="264" y="${185-n*1.8}">${n}</text>`).join('')}${s.inserted?'<path d="M150 164l12-38 40 5 14 37z" fill="#687c91"/>':''}<text x="125" y="210">${level} mL · ${s.eye?'Aras mata':'Model silinder'}</text>`,'Silinder berskala, paras '+level+' mL');
   if(active)scene+=d.mode==='liquid'?b('pour',undefined,'Tuang 10 mL',s.water===60)+b('eye',undefined,'Sejajarkan mata dengan meniskus',s.eye):b('baseline',undefined,'Catat paras awal: 50 mL',s.initial)+b('insert',undefined,'Masukkan batu',!s.initial||s.inserted);
   if(d.mode==='displacement')scene+=`<p>${s.initial?'Awal: 50 mL.':''} ${s.inserted?'Akhir: 70 mL. Cari pertambahan isi padu.':''}</p>`;
  }
  const expected=this.expected(s,d),numbers=[expected+2,expected,Math.max(0,expected-2)];return scene+(active&&!this.solved(s,d)?`<p>Catat ${d.mode==='displacement'?'isi padu batu':'bacaan'}:</p><div class="y3-choices">${numbers.map(n=>b('read',String(n),n+' '+unit,!this.ready(s,d))).join('')}</div>`:'')+(this.solved(s,d)?'<p class="y3-evidence">✓ Ukuran lengkap.</p>':'');
 }
};
window.MakmalYear3Domains.inquiry={
 init(s){Object.assign(s,{inspected:false,measured:false,offset:2,ramp:null,guess:null,trials:{}});},
 solved(s){return s.inspected&&s.measured&&Object.keys(s.trials).length===2;},
 act(s,d,a,v){const ui=window.MakmalYear3UI;if(a==='inspect')s.inspected=true;if(a==='align'&&s.inspected&&s.offset)s.offset--;if(a==='read'&&s.inspected&&s.offset===0){s.measured=v==='4';ui.message(s,s.measured?'Sasaran 4 cm dicatat.':'Periksa tanda di hujung sasaran.',s.measured);}if(a==='ramp'&&s.measured&&['low','high'].includes(v)){s.ramp=v;s.guess=null;}if(a==='guess'&&s.ramp&&['near','far'].includes(v))s.guess=v;if(a==='release'&&s.ramp&&s.guess){s.trials[s.ramp]={guess:s.guess,result:s.ramp==='high'?'far':'near'};ui.message(s,'Hasil sebenar direkodkan. Bandingkan dua ujian.');}},
 hint(s){if(!s.inspected)return ['inspect',undefined,'Periksa bola dahulu.'];if(!s.measured)return s.offset?['align',undefined,'Alih tanda sifar.']:['read','4','Sasaran panjangnya 4 cm.'];if(this.solved(s))return ['next',undefined,'Bandingkan ramalan dan hasil.'];if(!s.ramp||s.trials[s.ramp])return ['ramp',s.trials.low?'high':'low','Pilih landasan yang belum diuji.'];return s.guess?['release',undefined,'Lepaskan bola.']:['guess','near','Ramalkan kedudukan akhir.'];},
 render(s,d,active){const ui=window.MakmalYear3UI,b=ui.button;const ramp=s.ramp==='high'?35:90,tested=s.trials[s.ramp];return ui.svg(`<path d="M30 ${ramp}L170 170H330" stroke="#77522c" stroke-width="10" fill="none"/><circle cx="${tested?(s.ramp==='high'?305:210):52}" cy="${tested?158:ramp+3}" r="12" fill="#ee7350"/><path d="M190 195h100" stroke="#123c70"/><text x="185" y="217">0</text><text x="279" y="217">4 cm</text>`,'Model ujian bola, bukan ukuran jarak sebenar skrin')+`<p>${s.inspected?'Bola bulat; landasan mempunyai ketinggian berbeza.':'Periksa model.'} ${s.offset?'Pembaris sasaran belum sejajar.':'Sifar sejajar sasaran.'}</p>${active?b('inspect',undefined,'Periksa bola dan landasan',s.inspected)+b('align',undefined,'Sejajarkan pembaris',!s.inspected||!s.offset)+b('read','4','Catat sasaran 4 cm',s.offset>0||s.measured)+b('ramp','low','Landasan rendah',!s.measured)+b('ramp','high','Landasan tinggi',!s.measured)+b('guess','near','Ramalan: dekat',!s.ramp)+b('guess','far','Ramalan: jauh',!s.ramp)+b('release',undefined,'Lepaskan bola',!s.guess):''}<ul>${Object.entries(s.trials).map(([k,v])=>`<li>${k==='high'?'Tinggi':'Rendah'} · ramalan ${v.guess==='far'?'jauh':'dekat'} · hasil ${v.result==='far'?'jauh':'dekat'}</li>`).join('')}</ul>`;}
};
