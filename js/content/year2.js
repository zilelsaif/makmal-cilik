'use strict';
window.MakmalContent = (() => {
  const definitions = [
    ['science-skills', 'Kemahiran Saintifik', 'Perhati, ukur, kelas dan ramal seperti saintis.', '🔎'],
    ['humans', 'Manusia', 'Kenali tubuh dan kehidupan manusia.', '🧑'],
    ['animals', 'Haiwan', 'Terokai keperluan dan ciri haiwan.', '🐾'],
    ['plants', 'Tumbuhan', 'Lihat bagaimana tumbuhan hidup dan membesar.', '🌱'],
    ['light-dark', 'Terang & Gelap', 'Eksperimen dengan cahaya dan bayang.', '🔦'],
    ['electricity', 'Elektrik', 'Bina dan fahami litar elektrik mudah.', '⚡'],
    ['mixtures', 'Campuran', 'Campur, asing dan perhati bahan.', '🧪']
  ];
  const electricity = [
    ['Kenali Peralatan', 'Kenali peralatan untuk litar mudah.'],
    ['Nyalakan Mentol', 'Terokai cara mentol boleh menyala.'],
    ['Mentol Tidak Menyala', 'Perhatikan litar yang tidak menyala.'],
    ['Suis Misteri', 'Terokai fungsi suis dalam litar.'],
    ['Cabaran Juruteknik', 'Bersedia untuk cabaran litar mudah.']
  ];
  const light = ['Mana Sumber Cahaya?', 'Nyalakan Bilik', 'Bayang-Bayang', 'Halang Cahaya', 'Misteri Dalam Gelap'];
  const mixtures = ['Apa Dalam Campuran?', 'Gunakan Magnet', 'Ayak Campuran', 'Larut atau Tidak?', 'Cabaran Asingkan Campuran'];
  const plants = ['Apa Tumbuhan Perlukan?', 'Tumbuhan Dahaga', 'Bahagian Tumbuhan', 'Arah Cahaya', 'Selamatkan Pokok Layu'];
  const year2Units = definitions.map(([id, title, description, emoji]) => ({
    id, title, description, emoji, icon: `assets/modules/year2/${id}.webp`, totalMissions: 5,
    missions: Array.from({ length: 5 }, (_, index) => ({
      id: `${id}-${index + 1}`, number: index + 1,
      title: window.MakmalNewContent?.missions[`${id}-${index+1}`]?.title || (id === 'electricity' ? electricity[index][0] : id === 'light-dark' ? light[index] : id === 'mixtures' ? mixtures[index] : id === 'plants' ? plants[index] : `Eksperimen ${index + 1}`),
      description: window.MakmalNewContent?.missions[`${id}-${index+1}`]?.objective || (id === 'electricity' ? electricity[index][1] : id === 'light-dark' ? 'Terokai cahaya dan bayang bersama PICO.' : id === 'mixtures' ? 'Terokai bahan dan cara mengasingkannya.' : id === 'plants' ? 'Terokai keperluan dan bahagian tumbuhan.' : 'Aktiviti unit ini sedang disediakan.'),
      status: id === 'electricity' && index === 0 ? 'Seterusnya' : 'Akan Datang'
    }))
  }));
  return { year2Units, getUnit: id => year2Units.find(unit => unit.id === id) };
})();
