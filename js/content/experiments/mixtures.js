 'use strict';
window.MakmalMixtureContent = (() => {
 const materials = {beans:'Kacang',sand:'Pasir',clips:'Klip besi',pebbles:'Kerikil',sugar:'Gula',salt:'Garam'};
 const definitions = [
 {title:'Apa Dalam Campuran?',mode:'identify',prediction:'Berapa jenis bahan ada dalam bekas ini?',choices:['Satu','Dua','Tiga'],
 instruction:'Sentuh kumpulan bahan dalam dulang. Cari ketiga-tiga jenis bahan.',
 observations:['Dalam dulang asal, kacang, pasir dan klip besi bercampur.','Lihat tiga kumpulan bahan yang telah dikenal pasti.'],
 question:'Adakah campuran hanya mempunyai satu jenis bahan?',answers:['Tidak.','Ya.'],discovery:'Campuran mengandungi dua atau lebih bahan.',
 dialogues:['Dalam bekas ini ada beberapa bahan bercampur. Boleh kamu kenal pasti semuanya?','Sentuh bahan yang berbeza di dalam dulang.','Setiap kumpulan mempunyai ciri yang boleh kita lihat.','Berapa jenis bahan yang kamu temui?','Bagus! Kamu sudah mengenali bahan dalam campuran.'],
 hints:['Perhatikan bentuk dan warna bahan.','Lihat kumpulan bahan yang diserlahkan.','Sentuh kacang, pasir dan klip besi di dalam dulang.']},
 {title:'Gunakan Magnet',mode:'magnet',prediction:'Alat manakah boleh mengambil klip besi tanpa mengambil pasir?',choices:['Magnet','Sudu','Pembaris'],
 instruction:'Pilih satu alat, kemudian gunakan pada campuran. Perhatikan bahan yang terangkat.',
 observations:['Pada mulanya, pasir dan klip besi bercampur.','Klip besi tertarik kepada magnet. Pasir tertinggal dalam dulang.'],
 question:'Mengapa magnet boleh mengambil klip besi?',answers:['Klip besi tertarik kepada magnet.','Semua bahan tertarik kepada magnet.'],discovery:'Magnet boleh membantu mengasingkan bahan yang tertarik kepadanya.',
 dialogues:['Bagaimana kita boleh mengambil klip besi tanpa mengambil pasir?','Pilih alat, kemudian sentuh Gunakan pada campuran.','Bandingkan dulang sebelum dan selepas magnet digunakan.','Bahan manakah yang terangkat?','Hebat! Klip besi berjaya diasingkan.'],
 hints:['Cari alat yang boleh menarik klip besi.','Perhatikan magnet.','Pilih Magnet, kemudian tekan Gunakan pada campuran.']},
 {title:'Ayak Campuran',mode:'sieve',prediction:'Alat manakah boleh mengasingkan pasir dan kerikil?',choices:['Ayak','Magnet','Cawan'],
 instruction:'Pilih alat, kemudian gunakan pada campuran. Lihat apa yang melalui lubang ayak.',
 observations:['Pasir dan kerikil bercampur sebelum diayak.','Pasir melalui lubang ayak. Kerikil yang lebih besar tertinggal di atasnya.'],
 question:'Mengapa pasir boleh melalui ayak?',answers:['Saiznya lebih kecil.','Pasir tertarik kepada magnet.'],discovery:'Ayak boleh mengasingkan bahan mengikut saiz.',
 dialogues:['Pasir dan kerikil berbeza saiz. Mari cuba asingkannya.','Pilih alat yang mempunyai lubang kecil.','Bandingkan bahan di atas dan di bawah ayak.','Fikirkan saiz pasir berbanding lubang ayak.','Bagus! Dua kumpulan bahan sudah terasing.'],
 hints:['Perhatikan perbezaan saiz bahan.','Lihat alat ayak.','Pilih Ayak, kemudian tekan Gunakan pada campuran.']},
 {title:'Larut atau Tidak?',mode:'dissolve',prediction:'Ramalkan hasil setiap bahan dalam air.',choices:['Larut','Tidak Larut'],
 instruction:'Pilih bahan, tambah ke dalam air dan kacau. Setiap bahan diuji dalam air baharu.',
 observations:['Gula dan garam tidak lagi kelihatan selepas dikacau kerana larut dalam air.','Pasir tidak larut. Butir pasir masih kelihatan di dalam air.'],
 question:'Bahan manakah masih kelihatan selepas dikacau?',answers:['Pasir','Gula','Garam'],discovery:'Sesetengah bahan larut dalam air dan sesetengah bahan tidak larut.',
 dialogues:['Adakah semua bahan larut dalam air? Buat ramalan untuk setiap bahan.','Tambah satu bahan dan kacau. Uji ketiga-tiganya.','Bandingkan keputusan tiga ujian dalam air baharu.','Ingat bahan yang masih kelihatan di dalam air.','Hebat! Kamu telah membandingkan tiga bahan.'],
 hints:['Lihat perubahan selepas bahan dikacau.','Perhatikan bahan yang belum diuji atau butang langkah seterusnya.','Pilih setiap bahan, tekan Tambah ke air dan Kacau air. Ulang untuk gula, garam dan pasir.']},
 {title:'Cabaran Asingkan Campuran',mode:'finale',prediction:'Alat manakah mahu kamu gunakan dahulu?',choices:['Magnet','Ayak'],
 instruction:'Asingkan klip besi dahulu dengan magnet. Kemudian ayak baki pasir dan kerikil.',
 observations:['Campuran asal mengandungi pasir, klip besi dan kerikil.','Magnet mengambil klip besi. Ayak mengasingkan pasir dan kerikil.'],
 question:'Mengapa kita menggunakan dua cara?',answers:['Bahan berbeza mempunyai ciri berbeza.','Semua bahan adalah sama.'],discovery:'Kita boleh menggunakan cara yang sesuai untuk mengasingkan bahan yang berbeza.',
 dialogues:['Campuran ini lebih rumit. Kita perlu gunakan lebih daripada satu cara.','Mulakan dengan klip besi, kemudian asingkan baki campuran.','Lihat tiga kumpulan bahan yang sudah terasing.','Fikirkan bahan yang ditarik magnet dan bahan yang melalui ayak.','Hebat! Kamu berjaya menggunakan cara yang sesuai untuk mengasingkan campuran.'],
 hints:['Perhatikan bahan yang boleh ditarik dahulu.','Lihat alat yang diserlahkan untuk langkah semasa.','Gunakan Magnet pada campuran dahulu. Kemudian pilih Ayak dan gunakannya pada baki campuran.']}
 ];
 return {materials,missions:Object.fromEntries(definitions.map((d,i)=>['mixtures-'+(i+1),{...d,id:'mixtures-'+(i+1),number:i+1,progressKey:'mission'+(i+1),unitId:'mixtures',storageUnit:'mixtures',unitTitle:'CAMPURAN',steps:['Ramal','Cuba','Perhati','Fikir','Temui']}]))};
})();
