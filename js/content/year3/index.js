'use strict';
window.MakmalYear3={units:[],missions:{},addUnit(unit,records){
 unit.missions=records.map((record,i)=>{
  const d={year:3,id:`y3-${unit.id}-${i+1}`,unitId:unit.id,storageUnit:unit.id,unitTitle:unit.title,number:i+1,progressKey:'mission'+(i+1),steps:['Ramal','Cuba','Perhati','Fikir','Temui'],choices:['Saya jangka ada perubahan.','Saya jangka tiada perubahan.'],prediction:'Apakah ramalan kamu sebelum mencuba?',hints:['Perhatikan bukti dan alat yang tersedia.','Cuba kawalan yang diserlahkan.','Gunakan hasil pemerhatian untuk meneruskan.'],...record};
  d.dialogues=[d.prediction,d.instruction,'Mari bandingkan hasil yang kamu catat.',d.question,d.discovery];
  window.MakmalYear3.missions[d.id]=d;return {id:d.id,number:i+1,title:d.title,description:d.objective};
 });window.MakmalYear3.units.push(unit);
}};
