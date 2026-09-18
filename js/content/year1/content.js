'use strict';
(()=>{const Y=window.MakmalYear1;
 const seq=(...labels)=>labels.map((label,i)=>({id:'a'+i,label,note:'✓ '+label,art:['👀','👉','✓','⭐'][i%4]}));
 let choiceId=0;
 const cls=(...rows)=>rows.map(([label,target,art,note])=>({id:'choice-'+(++choiceId),label,target,art,note}));
 const m=(title,objective,discovery,actions,mode='sequence',scene='🔎')=>({title,domain:'year1',mode,objective,instruction:mode==='classify'?'Pilih. Lihat. Padankan.':'Tekan satu demi satu.',discovery,scene,observations:[discovery,'Lihat hasilnya sekali lagi.'],question:'Apa yang kamu temui?',answers:[discovery,'Semua benda adalah sama.'],actions});
 const u=(id,title,icon,description,missions)=>Y.addUnit({id,title,icon,description,totalMissions:5},missions);
 u('science-skills','Kemahiran Saintifik','🔍','Lihat, dengar dan ceritakan.',[
  m('Lihat Dengan Teliti','Cari dua ciri pada objek.','Mata membantu kita melihat warna, bentuk dan saiz.',seq('Lihat warna','Lihat bentuk','Sebut dua ciri'),'sequence','👀'),
  m('Dengar dan Kenal','Padankan bunyi maya dengan gambar.','Kita boleh memerhati bunyi dengan telinga dan petunjuk visual.',cls(['Loceng','sound','🔔','Gelombang menunjukkan bunyi loceng.'],['Burung','sound','🐦','Gelombang menunjukkan bunyi burung.'],['Lampu','silent','💡','Lampu tidak menghasilkan bunyi dalam model.']),'classify','🔊'),
  m('Sentuh dan Banding','Banding tekstur maya.','Kulit membantu kita mengesan licin atau kasar. Gunakan objek yang selamat sahaja.',cls(['Kain lembut','soft','🧣','Kain terasa lembut.'],['Batu kasar','rough','🪨','Permukaan batu kasar.']),'classify','✋'),
  m('Ceritakan Apa Kamu Nampak','Pilih ayat pemerhatian.','Pemerhatian menyebut apa yang benar-benar dilihat.',cls(['Bola itu bulat','evidence','⚽','Bentuk boleh dilihat.'],['Bola itu pasti sedih','guess','💭','Ini tekaan, bukan pemerhatian.']),'classify','💬'),
  m('Saintis Cilik','Lihat dan ceritakan objek maya.','Saintis melihat dengan teliti dan berkongsi pemerhatian.',seq('Lihat objek','Cari warna','Cari bentuk','Ceritakan hasil'),'sequence','🔬')
 ]);
 u('lab-rules','Peraturan Bilik Sains','🥼','Belajar menjaga diri dan alat.',[
  m('Masuk Dengan Betul','Pilih cara masuk yang selamat.','Masuk dengan tenang dan dengar arahan guru.',cls(['Berjalan perlahan','safe','🚶','Cara ini selamat.'],['Berlari sambil bermain','unsafe','🏃','Boleh menyebabkan kemalangan.']),'classify','🚪'),
  m('Pegang Dengan Cermat','Pilih cara memegang alat.','Pegang alat dengan dua tangan jika perlu dan jangan bermain.',cls(['Pegang dulang dengan dua tangan','safe','🤲','Dulang lebih stabil.'],['Lambung alat','unsafe','⚠️','Alat boleh jatuh.']),'classify','🧪'),
  m('Selepas Menggunakan Alat','Susun langkah selepas aktiviti.','Bersihkan, simpan alat dan kemaskan meja.',seq('Bersihkan alat','Simpan di tempatnya','Kemaskan meja'),'sequence','🧼'),
  m('Jika Berlaku Kemalangan','Pilih tindakan betul.','Beritahu guru dengan segera. Jangan sembunyikan kemalangan.',cls(['Beritahu guru','safe','🧑‍🏫','Guru boleh membantu.'],['Sembunyikan alat pecah','unsafe','🙈','Keadaan boleh menjadi bahaya.']),'classify','🆘'),
  m('Bilik Sains Selamat','Jadikan meja maya selamat.','Ikut arahan, guna alat dengan cermat dan pastikan ruang kemas.',seq('Dengar arahan','Alih barang berselerak','Simpan alat','Semak meja'),'sequence','✅')
 ]);
 u('living-things','Benda Hidup dan Benda Bukan Hidup','🌱','Kenal benda hidup di sekeliling.',[
  m('Hidup atau Bukan Hidup?','Kelaskan objek mudah.','Benda hidup menjalankan proses hidup. Mesin bergerak tetapi bukan benda hidup.',cls(['Kucing','living','🐈','Kucing bernafas, makan dan membesar.'],['Pokok','living','🌳','Pokok membesar dan perlukan air.'],['Kereta mainan','nonliving','🚗','Kereta bergerak kerana kuasa, bukan kerana hidup.']),'classify','🌍'),
  m('Ciri Benda Hidup','Cari ciri benda hidup.','Benda hidup bernafas, memerlukan makanan atau air, bergerak, membesar dan membiak.',seq('Bernafas','Perlu air atau makanan','Membesar','Membiak'),'sequence','🐣'),
  m('Susun Ikut Saiz','Susun tiga hidupan daripada kecil ke besar.','Hidupan boleh dibandingkan mengikut saiz.',seq('Pilih semut','Pilih kucing','Pilih gajah'),'sequence','📏'),
  m('Apa Yang Hidupan Perlukan?','Pilih keperluan asas.','Hidupan memerlukan air, udara dan makanan yang sesuai.',cls(['Air','need','💧','Hidupan memerlukan air.'],['Udara','need','🌬️','Hidupan memerlukan udara.'],['Mainan','notneed','🪀','Mainan bukan keperluan asas.']),'classify','🏡'),
  m('Dunia Di Sekeliling Kita','Cari benda hidup dan bukan hidup.','Kita mengenal benda hidup melalui cirinya, bukan hanya kerana ia bergerak.',seq('Periksa pokok','Periksa burung','Periksa basikal','Buat kumpulan'),'sequence','🔎')
 ]);
 u('humans','Manusia','👧','Kenal lima deria.',[
  m('Kenali Deria','Padankan organ dengan deria.','Mata, telinga, hidung, lidah dan kulit membantu kita mengenal dunia.',seq('Mata — melihat','Telinga — mendengar','Hidung — menghidu','Lidah — merasa','Kulit — menyentuh'),'sequence','🙂'),
  m('Mata Melihat','Pilih perkara yang dilihat.','Mata membantu melihat warna, bentuk dan saiz.',cls(['Warna merah','see','🔴','Warna dilihat dengan mata.'],['Bunyi loceng','hear','🔔','Bunyi didengar dengan telinga.']),'classify','👀'),
  m('Telinga Mendengar','Padankan bunyi maya dengan sumber.','Telinga membantu mendengar. Petunjuk visual memastikan misi boleh dimainkan tanpa bunyi.',seq('Lihat gelombang loceng','Lihat gelombang burung','Padankan gambar'),'sequence','👂'),
  m('Deria Membantu Kita','Pilih deria yang sesuai.','Deria membantu kita mendapat maklumat dengan selamat.',cls(['Lihat lampu isyarat','see','🚦','Gunakan mata.'],['Dengar loceng','hear','🔔','Gunakan telinga.'],['Sentuh kain selamat','touch','🧣','Gunakan kulit.']),'classify','🧠'),
  m('Cabaran Lima Deria','Lengkapkan lima padanan.','Gunakan deria dengan selamat. Jangan rasa atau hidu bahan yang tidak dikenali.',seq('Mata — gambar','Telinga — bunyi','Hidung — bau selamat','Lidah — makanan dikenal','Kulit — tekstur selamat'),'sequence','⭐')
 ]);
 u('animals','Haiwan','🐾','Lihat bahagian tubuh haiwan.',[
  m('Bahagian Tubuh Haiwan','Cari bahagian pada haiwan.','Haiwan mempunyai bahagian tubuh seperti kaki, sayap, paruh, ekor atau sirip.',seq('Cari paruh','Cari sayap','Cari kaki','Cari ekor'),'sequence','🐦'),
  m('Apa Gunanya?','Padankan bahagian dengan kegunaan.','Bahagian tubuh membantu haiwan bergerak, makan atau melindungi diri.',cls(['Sayap','fly','🪽','Sayap membantu burung terbang.'],['Sirip','swim','🐟','Sirip membantu ikan berenang.'],['Paruh','eat','🐦','Paruh membantu mengambil makanan.']),'classify','🐾'),
  m('Sama atau Berbeza?','Banding dua haiwan.','Haiwan boleh mempunyai bahagian yang sama dan berbeza.',seq('Lihat kaki kucing','Lihat kaki ayam','Cari persamaan','Cari perbezaan'),'sequence','🐈'),
  m('Cari Haiwan Yang Sepadan','Pilih haiwan daripada bahagiannya.','Bahagian tubuh memberi petunjuk tentang haiwan.',cls(['Sirip dan sisik','fish','🐟','Ini ciri ikan.'],['Bulu dan sayap','bird','🐦','Ini ciri burung.'],['Cangkerang','turtle','🐢','Ini ciri kura-kura.']),'classify','🕵️'),
  m('Detektif Haiwan','Gunakan tiga petunjuk tubuh.','Perhatikan bahagian tubuh untuk mengenal haiwan dan kegunaannya.',seq('Lihat penutup badan','Lihat anggota','Lihat cara bergerak','Pilih haiwan'),'sequence','🔍')
 ]);
 u('plants','Tumbuhan','🌻','Kenal bahagian tumbuhan.',[
  m('Kenali Bahagian Tumbuhan','Cari bahagian utama.','Tumbuhan mempunyai akar, batang, daun dan bahagian lain seperti bunga atau buah.',seq('Cari akar','Cari batang','Cari daun','Cari bunga'),'sequence','🌱'),
  m('Akar, Batang, Daun dan Bunga','Padankan nama pada gambar.','Setiap bahagian berada pada tempat tertentu pada tumbuhan.',seq('Akar di bawah','Batang menyokong','Daun pada batang','Bunga pada pucuk'),'sequence','🌷'),
  m('Ciri Daun','Banding dua daun.','Daun boleh berbeza bentuk, saiz dan tepi.',cls(['Daun panjang','long','🍃','Bentuknya panjang.'],['Daun lebar','wide','🌿','Bentuknya lebar.']),'classify','🍃'),
  m('Apa Gunanya Bahagian Ini?','Padankan bahagian dengan fungsi mudah.','Akar menyerap air, batang menyokong dan daun membantu tumbuhan membuat makanan.',cls(['Akar','water','🌱','Menyerap air.'],['Batang','support','🌿','Menyokong tumbuhan.'],['Daun','food','🍃','Membantu membuat makanan.']),'classify','🌻'),
  m('Detektif Tumbuhan','Periksa satu tumbuhan maya.','Perhatikan akar, batang, daun, bunga atau buah untuk menceritakan cirinya.',seq('Cari bahagian','Banding daun','Lihat bunga atau buah','Ceritakan hasil'),'sequence','🔎')
 ]);
 u('magnets','Magnet','🧲','Uji tarikan magnet.',[
  m('Kenali Magnet','Lihat beberapa bentuk magnet.','Magnet boleh berbentuk bar, ladam atau cincin.',seq('Lihat magnet bar','Lihat magnet ladam','Lihat magnet cincin'),'sequence','🧲'),
  m('Tarik atau Tidak?','Uji objek dengan magnet maya.','Magnet menarik sesetengah bahan seperti besi, tetapi tidak menarik semua objek.',cls(['Klip besi','yes','📎','Klip ditarik magnet.'],['Sudip kayu','no','🥄','Kayu tidak ditarik.'],['Penutup plastik','no','🔘','Plastik tidak ditarik.']),'classify','🧲'),
  m('Kutub Bertemu','Uji dua pasangan kutub.','Kutub berlainan menarik. Kutub sama menolak.',seq('Uji utara–selatan: tarik','Uji utara–utara: tolak','Banding gerakan'),'sequence','↔️'),
  m('Magnet Mana Lebih Kuat?','Banding bilangan klip.','Magnet yang menarik lebih banyak klip dalam ujian sama lebih kuat.',seq('Uji magnet A','Kira 2 klip','Uji magnet B','Kira 5 klip','Pilih magnet B'),'sequence','💪'),
  m('Cabaran Magnet','Pilih magnet untuk mengutip klip.','Magnet boleh digunakan untuk menarik objek besi tanpa menyentuhnya.',seq('Cari klip besi','Pilih magnet','Uji tarikan','Kutip semua klip'),'sequence','🏁')
 ]);
 u('absorption','Penyerapan','💧','Lihat bahan menyerap air.',[
  m('Serap atau Tidak?','Uji dua bahan dengan air maya.','Bahan menyerap mengambil air masuk. Bahan tidak menyerap menahan air di permukaan.',cls(['Tisu','absorb','🧻','Tisu menyerap air.'],['Plastik','not','🧴','Plastik tidak menyerap air.']),'classify','💧'),
  m('Bahan Mana Menyerap?','Uji kain, span dan kaca.','Kain dan span menyerap air; kaca tidak menyerap.',cls(['Kain','absorb','🧣','Kain menyerap.'],['Span','absorb','🧽','Span menyerap.'],['Kaca','not','🥛','Kaca tidak menyerap.']),'classify','🧽'),
  m('Banyak atau Sedikit?','Banding jumlah air diserap.','Bahan berbeza boleh menyerap jumlah air yang berbeza.',seq('Uji tisu: 2 titis','Uji span: 5 titis','Banding jumlah','Pilih span'),'sequence','📊'),
  m('Pilih Bahan Yang Betul','Pilih bahan mengikut kegunaan.','Bahan menyerap sesuai untuk mengelap. Bahan tidak menyerap sesuai untuk bekas air.',cls(['Tuala','absorb','🧣','Sesuai untuk mengelap.'],['Botol plastik','not','🧴','Sesuai menyimpan air.']),'classify','✅'),
  m('Misi Tumpahan Air','Bersihkan tumpahan maya.','Span atau kain menyerap sesuai untuk membersihkan air tertumpah.',seq('Pilih span','Tekan pada air maya','Lihat air diserap','Kemaskan kawasan'),'sequence','🧽')
 ]);
 u('earth','Bumi','🌍','Kenal permukaan Bumi, tanah dan air.',[
  m('Bentuk Muka Bumi','Kenal bentuk mudah permukaan Bumi.','Permukaan Bumi mempunyai gunung, bukit, lembah dan tanah rata.',seq('Lihat gunung','Lihat bukit','Lihat lembah','Lihat tanah rata'),'sequence','🏞️'),
  m('Tanah Tinggi atau Rendah?','Banding kedudukan tanah.','Gunung dan bukit lebih tinggi daripada lembah atau tanah rendah.',cls(['Gunung','high','⛰️','Gunung ialah tanah tinggi.'],['Lembah','low','🏞️','Lembah lebih rendah.']),'classify','↕️'),
  m('Kenali Tanah','Banding tiga sampel maya.','Tanah boleh berbeza warna, saiz butir dan kebolehan memegang air.',seq('Lihat tanah berpasir','Lihat tanah liat','Lihat tanah kebun','Banding ciri'),'sequence','🪴'),
  m('Air Di Bumi','Cari tempat air.','Air terdapat di sungai, tasik, laut dan tempat lain di Bumi.',seq('Cari sungai','Cari tasik','Cari laut'),'sequence','🌊'),
  m('Jelajah Bumi','Cari tanah dan air pada peta mudah.','Permukaan Bumi terdiri daripada kawasan daratan dan air dengan pelbagai bentuk.',seq('Cari gunung','Cari tanah rata','Cari sungai','Cari laut'),'sequence','🗺️')
 ]);
 u('construction','Asas Binaan','🧱','Gabung bentuk untuk bina struktur.',[
  m('Kenali Bentuk Asas','Kenal bentuk blok.','Kubus, kuboid, silinder dan bentuk lain boleh digunakan untuk membina.',seq('Lihat kubus','Lihat kuboid','Lihat silinder'),'sequence','🔷'),
  m('Bentuk Mana Sesuai?','Pilih bentuk untuk satu tugas.','Permukaan rata sesuai sebagai tapak. Bentuk bulat boleh bergolek.',cls(['Kuboid untuk tapak','base','🧱','Permukaannya rata.'],['Silinder untuk roda','roll','🛞','Bentuknya boleh bergolek.']),'classify','🏗️'),
  m('Bina Struktur','Bina menara maya daripada bawah.','Struktur dibina dengan menyusun komponen pada tapak.',seq('Letak tapak lebar','Tambah dua blok','Tambah bumbung ringan'),'sequence','🏠'),
  m('Kukuh atau Mudah Jatuh?','Banding dua menara.','Tapak lebih lebar dan susunan seimbang membantu struktur lebih kukuh.',seq('Uji menara tapak sempit','Lihat ia mudah jatuh','Uji tapak lebar','Lihat ia lebih stabil'),'sequence','⚖️'),
  m('Jurutera Cilik','Reka jambatan kecil maya.','Pilih bentuk sesuai, bina tapak kukuh dan uji sebelum digunakan.',seq('Pilih dua sokongan','Tambah permukaan rata','Uji dengan beban maya','Baiki jika perlu'),'sequence','🌉')
 ]);
})();
