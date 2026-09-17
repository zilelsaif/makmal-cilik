'use strict';
window.MakmalYear5={units:[],missions:{},addUnit(unit,records){
 unit.missions=records.map((record,i)=>{const d={year:5,id:`y5-${unit.id}-${i+1}`,unitId:unit.id,storageUnit:unit.id,unitTitle:unit.title,number:i+1,progressKey:'mission'+(i+1),steps:['Ramal','Cuba','Perhati','Fikir','Temui'],choices:['Saya jangka model akan berubah.','Saya jangka model tidak berubah.'],prediction:'Apakah ramalan kamu sebelum menyiasat?',hints:['Perhatikan model dan bukti.','Cuba kawalan yang diserlahkan.','Gunakan hasil yang dicatat untuk meneruskan.'],...record};d.dialogues=[d.prediction,d.instruction,'Bandingkan bukti yang telah dicatat.',d.question,d.discovery];this.missions[d.id]=d;return {id:d.id,number:i+1,title:d.title,description:d.objective};});this.units.push(unit);
}};
