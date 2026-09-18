'use strict';
window.MakmalYear1={units:[],missions:{},addUnit(unit,records){
 unit.missions=records.map((record,i)=>{const d={year:1,id:`y1-${unit.id}-${i+1}`,unitId:unit.id,storageUnit:unit.id,unitTitle:unit.title,number:i+1,progressKey:'mission'+(i+1),steps:['Ramal','Cuba','Perhati','Fikir','Temui'],choices:['Ya, mungkin berubah.','Tidak, mungkin sama.'],prediction:'Apa akan berlaku?',hints:['Lihat gambar.','Cuba butang yang bercahaya.','Tekan langkah seterusnya.'],...record};d.dialogues=[d.prediction,d.instruction,'Apa yang kamu nampak?',d.question,d.discovery];this.missions[d.id]=d;return {id:d.id,number:i+1,title:d.title,description:d.objective};});this.units.push(unit);
}};
