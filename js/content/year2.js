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
  const year2Units = definitions.map(([id, title, description, emoji]) => ({
    id, title, description, emoji, icon: `assets/modules/year2/${id}.webp`, totalMissions: 5,
    missions: Array.from({ length: 5 }, (_, index) => ({
      id: `${id}-${index + 1}`, number: index + 1,
      title: id === 'electricity' ? electricity[index][0] : `Eksperimen ${index + 1}`,
      description: id === 'electricity' ? electricity[index][1] : 'Aktiviti unit ini sedang disediakan.',
      status: id === 'electricity' && index === 0 ? 'Seterusnya' : 'Akan Datang'
    }))
  }));
  return { year2Units, getUnit: id => year2Units.find(unit => unit.id === id) };
})();
