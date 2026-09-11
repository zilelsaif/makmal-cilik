'use strict';
window.MakmalLightContent = (() => {
  const objects = [
    {id:'sun',name:'Matahari',source:true}, {id:'bulb',name:'Mentol menyala',source:true},
    {id:'candle',name:'Lilin menyala',source:true}, {id:'moon',name:'Bulan',source:false}, {id:'mirror',name:'Cermin',source:false}
  ];
  const definitions = [
    {title:'Mana Sumber Cahaya?',mode:'sort',prediction:'Yang mana satu benar-benar menghasilkan cahaya sendiri?',choices:['Matahari','Bulan'],
      instruction:'Pilih satu objek, kemudian pilih kumpulannya. Cuba kelaskan kelima-lima objek.',
      observations:['Matahari, mentol menyala dan lilin menyala menghasilkan cahaya sendiri.','Bulan dan cermin tidak menghasilkan cahaya sendiri. Kita melihat cahaya yang dipantulkan olehnya.'],
      question:'Adakah Bulan menghasilkan cahayanya sendiri?',answers:['Tidak.','Ya.'],discovery:'Sumber cahaya menghasilkan cahaya sendiri.',
      dialogues:['Yang mana satu benar-benar menghasilkan cahaya sendiri?','Lihat objek dan pilih kumpulan yang sesuai.','Ada objek menghasilkan cahaya sendiri. Ada yang hanya kelihatan terang.','Fikirkan Bulan yang kamu lihat pada waktu malam.','Bagus! Kamu sudah mengenali sumber cahaya.'],
      hints:['Perhatikan objek yang menghasilkan cahaya sendiri.','Lihat objek yang diserlahkan.','Matahari, mentol menyala dan lilin menyala ialah sumber cahaya. Bulan dan cermin bukan sumber cahaya.']},
    {title:'Nyalakan Bilik',mode:'room',prediction:'Apa yang boleh membantu kita melihat dalam bilik gelap?',choices:['Lampu suluh','Bantal','Buku'],
      instruction:'Hidupkan lampu suluh. Halakan cahaya ke kiri, tengah dan kanan untuk melihat tiga objek.',
      observations:['Tanpa cahaya, objek di dalam bilik sukar dilihat.','Apabila ada cahaya, objek menjadi lebih mudah dilihat.'],
      question:'Mengapa objek tadi sukar dilihat?',answers:['Bilik itu gelap.','Objek itu terlalu cerah.'],discovery:'Kita memerlukan cahaya untuk melihat objek dengan jelas.',
      dialogues:['Gelapnya! Apa yang kita perlukan supaya boleh melihat?','Cuba suluh setiap bahagian bilik.','Apabila ada cahaya, objek menjadi lebih mudah dilihat.','Apakah perbezaan sebelum dan selepas lampu dihidupkan?','Hebat! Cahaya membantu kita melihat dengan jelas.'],
      hints:['Cari alat yang menghasilkan cahaya.','Lihat kawalan lampu suluh.','Hidupkan lampu, kemudian tekan Kiri, Tengah dan Kanan.']},
    {title:'Bayang-Bayang',mode:'shadow',prediction:'Apa akan muncul di belakang objek apabila cahaya dihalang?',choices:['Bayang-bayang','Pelangi'],
      instruction:'Hidupkan lampu, kemudian letakkan bola di laluan cahaya. Cuba alihkan bola keluar dan masuk semula.',
      observations:['Lampu ialah sumber cahaya.','Bola menghalang sebahagian cahaya.','Bayang-bayang bola terbentuk pada skrin.'],
      question:'Mengapa bayang-bayang terbentuk?',answers:['Objek menghalang cahaya.','Objek menghasilkan cahaya.'],discovery:'Bayang-bayang terbentuk apabila cahaya dihalang.',
      dialogues:['Mari teroka apa yang muncul di belakang objek.','Hidupkan lampu dan letakkan bola di laluan cahaya.','Lihat sumber cahaya, objek dan bayang-bayangnya.','Perhatikan apa yang berlaku pada cahaya apabila bola berada di hadapannya.','Bagus! Kamu berjaya menghasilkan bayang-bayang.'],
      hints:['Perhatikan lampu dan bola.','Lihat tempat bola boleh diletakkan.','Hidupkan lampu dan tekan Letakkan bola dalam cahaya.']},
    {title:'Halang Cahaya',mode:'materials',prediction:'Adakah cahaya mudah melalui kadbod?',choices:['Ya','Tidak'],
      instruction:'Letakkan kadbod dan plastik jernih di hadapan lampu, satu demi satu. Bandingkan cahaya pada skrin.',
      observations:['Kadbod menghalang cahaya. Bahagian skrin di belakangnya menjadi gelap.','Cahaya boleh melalui plastik jernih. Skrin masih terang.'],
      question:'Objek manakah menghalang cahaya dengan lebih jelas?',answers:['Kadbod','Plastik jernih'],discovery:'Sesetengah bahan menghalang cahaya lebih daripada bahan lain.',
      dialogues:['Adakah semua bahan memberi hasil yang sama?','Cuba dua bahan dan lihat skrin di belakangnya.','Bandingkan hasil kadbod dengan plastik jernih.','Ingat bahan yang menghasilkan bahagian gelap pada skrin.','Hebat! Bahan yang berbeza memberi hasil yang berbeza.'],
      hints:['Perhatikan skrin selepas meletakkan bahan.','Cuba bahan yang belum digunakan.','Pilih Kadbod dan Plastik jernih, kemudian bandingkan hasilnya.']},
    {title:'Misteri Dalam Gelap',mode:'search',prediction:'Alat manakah paling berguna untuk mencari dalam gelap?',choices:['Lampu suluh','Cermin','Buku'],
      instruction:'Pilih sumber cahaya, suluh beberapa bahagian bilik dan cari kelalang PICO. Ada kotak yang menghalang cahaya!',
      observations:['Lampu suluh menghasilkan cahaya untuk menerangi bilik.','Kotak menghalang cahaya dan menghasilkan bayang. Alihkan kotak supaya kelalang dapat dilihat.'],
      question:'Mengapa kita sukar melihat objek dalam keadaan gelap?',answers:['Tiada cahaya yang cukup.','Semua objek hilang.'],discovery:'Cahaya membantu kita melihat. Objek yang menghalang cahaya menghasilkan bayang-bayang.',
      dialogues:['Saya tak nampak alat makmal itu. Boleh kamu bantu cari?','Suluh bilik dan perhatikan bayang di belakang kotak.','Cahaya membuat alat kelihatan selepas halangan dialihkan.','Apakah yang membantu kamu menemui alat tadi?','Hebat! Kamu sudah tahu bagaimana cahaya membantu kita melihat dan menghasilkan bayang-bayang.'],
      hints:['Cari sumber cahaya dahulu.','Perhatikan bahagian kanan bilik.','Pilih Lampu suluh, suluh sekurang-kurangnya dua bahagian, alihkan kotak di kanan dan ambil kelalang.']}
  ];
  return { objects, missions: Object.fromEntries(definitions.map((d,i)=>[`light-dark-${i+1}`,{...d,id:`light-dark-${i+1}`,number:i+1,progressKey:`mission${i+1}`,unitId:'light-dark',storageUnit:'lightDark',unitTitle:'TERANG & GELAP',steps:['Ramal','Cuba','Perhati','Fikir','Temui']}])) };
})();
