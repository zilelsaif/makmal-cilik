'use strict';
// Reuse the same three-connection workbench; each activity has its own starting problem.
window.MakmalCircuitMissions = {
  'electricity-2': window.MakmalMission2,
  'electricity-3': {
    ...window.MakmalMission2, id: 'electricity-3', number: 3, progressKey: 'mission3', title: 'Mentol Tidak Menyala',
    mode: 'repair', initialLinks: [0, 2], initialClosed: true,
    prediction: 'Apakah kemungkinan sebab mentol tidak menyala?', choices: ['Ada wayar terputus', 'Warna alat berubah'],
    instruction: 'Dua wayar sudah bersambung. Cari laluan yang terputus dan sambungkan kedua-dua terminalnya.',
    observations: ['Sambungan yang terputus sudah diperbaiki.', 'Sekarang litar lengkap dan mentol menyala.'],
    observationFocus: ['repair', 'bulb'],
    question: 'Mengapa mentol tadi tidak menyala?', answers: ['Litar tidak lengkap.', 'Bateri bertukar warna.'],
    discovery: 'Mentol tidak menyala jika litar tidak lengkap.',
    dialogues: ['Oh! Mentol ini tidak menyala. Boleh kamu cari apa yang tidak kena?', 'Cari satu sambungan yang terputus. Baiki tanpa membina semula seluruh litar.', 'Mentol menyala selepas sambungan yang terputus diperbaiki.', 'Fikirkan sambungan sebelum kamu membaikinya.', 'Bagus! Kamu berjaya mencari dan membaiki sambungan yang terputus.'],
    hints: ['Cari wayar yang belum bersambung.', 'Perhatikan dua terminal pada laluan bertitik.', 'Sambungkan Suis A dengan Mentol A.']
  },
  'electricity-4': {
    ...window.MakmalMission2, id: 'electricity-4', number: 4, progressKey: 'mission4', title: 'Suis Misteri',
    mode: 'switch', initialLinks: [0, 1, 2], initialClosed: false,
    prediction: 'Apa akan berlaku apabila suis ditutup?', choices: ['Mentol akan menyala', 'Mentol kekal padam'],
    instruction: 'Tutup suis, kemudian buka semula. Perhatikan mentol dalam kedua-dua keadaan. Kamu boleh mencuba beberapa kali.',
    observations: ['Suis terbuka → Mentol padam', 'Suis tertutup → Mentol menyala'], observationFocus: ['switch', 'bulb'],
    question: 'Apakah fungsi suis dalam litar?', answers: ['Membuka dan menutup litar.', 'Menukar warna wayar.'],
    discovery: 'Suis mengawal sama ada litar terbuka atau tertutup.',
    dialogues: ['Kali ini semua komponen sudah bersambung. Cuba lihat apa yang berlaku apabila suis berubah.', 'Cuba tutup dan buka suis. Lihat perubahan pada mentol.', 'Bandingkan dua keadaan suis dan mentol.', 'Apakah yang berubah apabila suis dibuka atau ditutup?', 'Hebat! Kamu sudah menemui fungsi suis.'],
    hints: ['Cuba tekan suis di tengah litar.', 'Tutup suis dan lihat mentol menyala.', 'Sekarang buka semula suis untuk melihat mentol padam.']
  },
  'electricity-5': {
    ...window.MakmalMission2, id: 'electricity-5', number: 5, progressKey: 'mission5', title: 'Cabaran Juruteknik',
    mode: 'finale', initialLinks: [0, 1], initialClosed: false,
    prediction: 'Apakah yang perlu dilakukan supaya lampu makmal menyala?', choices: ['Lengkapkan sambungan dan tutup suis', 'Biarkan sambungan terputus'],
    instruction: 'Periksa lampu makmal: satu wayar belum bersambung dan suis terbuka. Lengkapkan sambungan, kemudian tutup suis.',
    observations: ['Semua wayar sudah bersambung: litar lengkap.', 'Suis ditutup supaya laluan bersambung.', 'Lampu makmal kembali menyala!'], observationFocus: ['wire', 'switch', 'bulb'],
    question: 'Jika satu wayar tercabut, apakah yang akan berlaku?', answers: ['Mentol akan padam kerana litar tidak lengkap.', 'Mentol menjadi lebih terang.'],
    discovery: 'Litar lengkap dan suis tertutup membantu lampu makmal menyala.',
    dialogues: ['Bekalan lampu makmal terputus! Saintis, boleh kamu baikinya?', 'Gunakan pengetahuan kamu untuk membaiki lampu makmal.', 'Semua sambungan lengkap, suis ditutup dan lampu kembali menyala.', 'Bayangkan satu sambungan terputus lagi.', 'Hebat! Kamu sudah tahu cara mengenal, membina dan membaiki litar elektrik mudah.'],
    hints: ['Periksa sambungan lampu makmal.', 'Cari dua terminal yang belum bersambung.', 'Sambungkan Mentol B dengan Bateri A, kemudian tutup suis.']
  }
};
