'use strict';
window.MakmalYear3.addUnit({"id": "science-skills", "title": "Kemahiran Saintifik", "emoji": "🔎", "description": "Siasat dengan bukti, ukuran dan ramalan.", "totalMissions": 5, "icon": "assets/modules/year2/science-skills.webp"}, [
  {
    "title": "Mata Pemerhati",
    "domain": "sorting",
    "mode": "evidence",
    "objective": "Periksa bukti, kemudian susun padanan yang sesuai.",
    "instruction": "Pilih satu kad. Periksa bukti, kemudian letakkan pada kumpulan yang sesuai.",
    "discovery": "Pemerhatian menyatakan ciri yang benar-benar dilihat.",
    "observations": [
      "Pemerhatian menyatakan ciri yang benar-benar dilihat.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Pemerhatian menyatakan ciri yang benar-benar dilihat.",
      "Ramalan mesti betul sebelum kita mencuba."
    ],
    "items": [
      {
        "id": "0",
        "label": "Daun A",
        "target": "smooth",
        "detail": "Tepi daun rata, tanpa lekuk.",
        "art": "leaf"
      },
      {
        "id": "1",
        "label": "Daun B",
        "target": "serrated",
        "detail": "Tepi daun mempunyai lekuk kecil.",
        "art": "leaf-serrated"
      },
      {
        "id": "2",
        "label": "Daun C",
        "target": "smooth",
        "detail": "Tepi daun rata walaupun warnanya berbeza.",
        "art": "leaf"
      }
    ],
    "groups": [
      {
        "id": "smooth",
        "label": "Tepi rata"
      },
      {
        "id": "serrated",
        "label": "Tepi bergerigi"
      }
    ]
  },
  {
    "title": "Kelas Dengan Bukti",
    "domain": "sorting",
    "mode": "evidence",
    "objective": "Periksa bukti, kemudian susun padanan yang sesuai.",
    "instruction": "Pilih satu kad. Periksa bukti, kemudian letakkan pada kumpulan yang sesuai.",
    "discovery": "Objek boleh dikelaskan mengikut ciri yang sama, bukan warna sahaja.",
    "observations": [
      "Objek boleh dikelaskan mengikut ciri yang sama, bukan warna sahaja.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Objek boleh dikelaskan mengikut ciri yang sama, bukan warna sahaja.",
      "Ramalan mesti betul sebelum kita mencuba."
    ],
    "items": [
      {
        "id": "0",
        "label": "Butang bulat merah",
        "target": "round",
        "detail": "Bentuk bulat, tiada bucu.",
        "art": "circle"
      },
      {
        "id": "1",
        "label": "Jubin biru",
        "target": "corner",
        "detail": "Empat sisi dan empat bucu.",
        "art": "square"
      },
      {
        "id": "2",
        "label": "Butang bulat biru",
        "target": "round",
        "detail": "Bulat seperti butang merah.",
        "art": "circle"
      }
    ],
    "groups": [
      {
        "id": "round",
        "label": "Tiada bucu"
      },
      {
        "id": "corner",
        "label": "Ada bucu"
      }
    ]
  },
  {
    "title": "Ukur Tepat",
    "domain": "measurement",
    "mode": "length",
    "objective": "Sejajarkan pembaris dan catat panjang dua objek.",
    "instruction": "Alih pembaris supaya 0 sejajar hujung kiri, kemudian baca panjang.",
    "discovery": "Ukuran panjang bermula pada tanda sifar pembaris.",
    "observations": [
      "Ukuran panjang bermula pada tanda sifar pembaris.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Ukuran panjang bermula pada tanda sifar pembaris.",
      "Ramalan mesti betul sebelum kita mencuba."
    ],
    "values": [
      4,
      6
    ]
  },
  {
    "title": "Buat Inferens",
    "domain": "sorting",
    "mode": "evidence",
    "objective": "Periksa bukti, kemudian susun padanan yang sesuai.",
    "instruction": "Pilih satu kad. Periksa bukti, kemudian letakkan pada kumpulan yang sesuai.",
    "discovery": "Inferens ialah penerangan yang munasabah berdasarkan bukti; kita boleh menyiasat lagi.",
    "observations": [
      "Inferens ialah penerangan yang munasabah berdasarkan bukti; kita boleh menyiasat lagi.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Inferens ialah penerangan yang munasabah berdasarkan bukti; kita boleh menyiasat lagi.",
      "Ramalan mesti betul sebelum kita mencuba."
    ],
    "items": [
      {
        "id": "0",
        "label": "Pokok layu",
        "target": "water",
        "detail": "Tanah kering; pokok tidak disiram.",
        "art": "plant"
      },
      {
        "id": "1",
        "label": "Lantai basah",
        "target": "spill",
        "detail": "Bekas terbalik; air di sekelilingnya.",
        "art": "spill"
      },
      {
        "id": "2",
        "label": "Bayang hilang",
        "target": "light",
        "detail": "Lampu suluh dimatikan.",
        "art": "lamp"
      }
    ],
    "groups": [
      {
        "id": "water",
        "label": "Mungkin kekurangan air"
      },
      {
        "id": "spill",
        "label": "Mungkin air tertumpah"
      },
      {
        "id": "light",
        "label": "Sumber cahaya dimatikan"
      }
    ]
  },
  {
    "title": "Ramal & Uji",
    "domain": "inquiry",
    "mode": "ramp",
    "objective": "Perhati, ukur dan uji bola pada dua landasan.",
    "instruction": "Periksa bola, ukur jarak sasaran, ramal kemudian uji landasan rendah dan tinggi.",
    "discovery": "Catat hasil sebenar walaupun berbeza daripada ramalan.",
    "observations": [
      "Catat hasil sebenar walaupun berbeza daripada ramalan.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Catat hasil sebenar walaupun berbeza daripada ramalan.",
      "Ramalan mesti betul sebelum kita mencuba."
    ],
    "values": [
      4
    ]
  }
]);
