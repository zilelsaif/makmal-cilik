'use strict';
window.MakmalYear3Domains.litmus={
 samples:{water:['Air suling','neutral'],saltwater:['Larutan garam','neutral'],lemon:['Jus lemon','acid'],vinegar:['Cuka','acid'],soap:['Larutan sabun','alkali'],bicarbonate:['Larutan soda bikarbonat','alkali'],A:['Bahan misteri A','acid'],B:['Bahan misteri B','alkali'],C:['Bahan misteri C','neutral']},
 init(s){s.sample=null;s.tests={};s.classes={};},
 solved(s,d){return d.samples.every(id=>s.classes[id]);},
 act(s,d,a,v){const ui=window.MakmalYear3UI;
  if(a==='sample'&&d.samples.includes(v))s.sample=v;
  if(a==='paper'&&s.sample&&['red','blue'].includes(v)){const type=this.samples[s.sample][1],result=type==='acid'?'red':type==='alkali'?'blue':v;s.tests[s.sample]={...s.tests[s.sample],[v]:result};ui.message(s,`Litmus ${v==='red'?'merah':'biru'} ${v===result?'kekal':'bertukar kepada'} ${result==='red'?'merah':'biru'}.`);}
  if(a==='class'&&s.sample&&s.tests[s.sample]?.red&&s.tests[s.sample]?.blue&&['acid','alkali','neutral'].includes(v)){
   if(this.samples[s.sample][1]===v){s.classes[s.sample]=v;ui.message(s,'✓ Kelas bahan disokong oleh kedua-dua ujian litmus.');}else ui.message(s,'Bandingkan kedua-dua kertas; satu warna sahaja belum cukup.',false);
  }
 },
 hint(s,d){if(this.solved(s,d))return ['next',undefined,'Semak jadual keputusan.'];const id=d.samples.find(id=>!s.classes[id]);if(s.sample!==id)return ['sample',id,'Pilih '+this.samples[id][0]+'.'];if(!s.tests[id]?.red)return ['paper','red','Uji litmus merah baharu.'];if(!s.tests[id]?.blue)return ['paper','blue','Uji litmus biru baharu.'];return ['class',this.samples[id][1],'Bandingkan kedua-dua perubahan, kemudian catat kelas.'];},
 render(s,d,active){const ui=window.MakmalYear3UI,b=ui.button,t=s.tests[s.sample]||{},names={acid:'Asid',alkali:'Alkali',neutral:'Neutral'};
  return `<p class="y3-safety">🥽 Simulasi maya sahaja. Jangan rasa atau sentuh bahan tidak dikenali. Ujian sebenar memerlukan pengawasan orang dewasa.</p>${ui.svg(`<path d="M120 40V190H240V40" fill="#d6f1ff" stroke="#2368a3" stroke-width="4"/><path d="M124 112h112v74H124Z" fill="#a0d8ea"/><text x="180" y="210" text-anchor="middle">${s.sample?this.samples[s.sample][0]:'Pilih sampel'}</text>`,'Bekas sampel maya')}<div class="y3-litmus">${['red','blue'].map(c=>`<div><span class="litmus-strip ${t[c]||c}" aria-hidden="true"></span><strong>Asal: ${c==='red'?'merah':'biru'}</strong><span>${t[c]?'Hasil: '+(t[c]==='red'?'merah':'biru')+(t[c]===c?' (kekal)':' (berubah)'):'Belum diuji'}</span></div>`).join('')}</div>${active?`<div class="y3-choices">${d.samples.map(id=>b('sample',id,this.samples[id][0],false,s.sample===id)).join('')}</div>`+b('paper','red','Uji litmus merah',!s.sample)+b('paper','blue','Uji litmus biru',!s.sample)+`<div class="y3-choices">${Object.entries(names).map(([id,name])=>b('class',id,'Catat: '+name,!t.red||!t.blue)).join('')}</div>`:''}<ul>${d.samples.filter(id=>s.classes[id]).map(id=>`<li>✓ ${this.samples[id][0]}: ${names[s.classes[id]]}</li>`).join('')}</ul>`;
 }
};
