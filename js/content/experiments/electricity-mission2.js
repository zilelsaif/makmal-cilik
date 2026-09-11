'use strict';
window.MakmalMission2 = {
  id: 'electricity-2', number: 2, progressKey: 'mission2', title: 'Nyalakan Mentol',
  steps: ['Ramal', 'Cuba', 'Perhati', 'Fikir', 'Temui'],
  components: window.MakmalMission1.components,
  terminals: [
    { id: 'battery-left', name: 'Bateri A', x: 12, y: 16.67 },
    { id: 'battery-right', name: 'Bateri B', x: 88, y: 16.67 },
    { id: 'switch-left', name: 'Suis A', x: 12, y: 50 },
    { id: 'switch-right', name: 'Suis B', x: 88, y: 50 },
    { id: 'bulb-left', name: 'Mentol A', x: 12, y: 83.33 },
    { id: 'bulb-right', name: 'Mentol B', x: 88, y: 83.33 }
  ],
  connections: [
    { ends: ['battery-right', 'switch-right'], path: 'M88 16.67 L94 16.67 L94 50 L88 50' },
    { ends: ['switch-left', 'bulb-left'], path: 'M12 50 L6 50 L6 83.33 L12 83.33' },
    { ends: ['bulb-right', 'battery-left'], path: 'M88 83.33 L94 83.33 L94 98 L3 98 L3 3 L12 3 L12 16.67' }
  ],
  dialogues: [
    'Kita sudah kenal peralatannya. Sekarang, boleh kamu nyalakan mentol?',
    'Sentuh dua terminal untuk menyambungkan wayar. Lengkapkan tiga sambungan, kemudian tutup suis.',
    'Mentol menyala apabila litar lengkap dan suis ditutup.',
    'Lihat suis yang terbuka. Mengapa mentol tidak menyala?',
    'Hebat! Kamu berjaya membina litar lengkap dan menyalakan mentol.'
  ]
};
