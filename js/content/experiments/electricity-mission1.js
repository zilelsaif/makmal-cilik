'use strict';
window.MakmalMission1 = {
  id: 'electricity-1', unitId: 'electricity', title: 'Kenali Peralatan',
  steps: ['Ramal', 'Cuba', 'Perhati', 'Fikir', 'Temui'],
  components: [
    { id: 'battery', name: 'Bateri', visual: 'Alat berbentuk silinder dengan tanda tambah', emoji: '🔋', explanation: 'Membekalkan tenaga elektrik.' },
    { id: 'bulb', name: 'Mentol', visual: 'Alat kaca bulat dengan tapak logam', emoji: '💡', explanation: 'Menghasilkan cahaya apabila litar lengkap.' },
    { id: 'wire', name: 'Wayar', visual: 'Penyambung panjang berwarna merah', emoji: '➰', explanation: 'Menyambungkan komponen dalam litar.' },
    { id: 'switch', name: 'Suis', visual: 'Alat bertapak hitam dengan tuil merah', emoji: '🔘', explanation: 'Membuka atau menutup litar.' }
  ].map(component => ({ ...component, image: `assets/experiments/electricity/mission1/${component.id}.webp` }))
};
