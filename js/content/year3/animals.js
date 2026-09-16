'use strict';
window.MakmalYear3.addUnit({"id": "animals", "title": "Haiwan", "emoji": "🐾", "description": "Bandingkan makanan dan kegigian haiwan.", "totalMissions": 5, "icon": "assets/modules/year2/animals.webp"}, [
  {
    "title": "Herbivor, Karnivor atau Omnivor?",
    "domain": "sorting",
    "mode": "evidence",
    "objective": "Periksa bukti, kemudian susun padanan yang sesuai.",
    "instruction": "Pilih satu kad. Periksa bukti, kemudian letakkan pada kumpulan yang sesuai.",
    "discovery": "Tabiat pemakanan membezakan herbivor, karnivor dan omnivor.",
    "observations": [
      "Tabiat pemakanan membezakan herbivor, karnivor dan omnivor.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Tabiat pemakanan membezakan herbivor, karnivor dan omnivor.",
      "Ramalan mesti betul sebelum kita mencuba."
    ],
    "items": [
      {
        "id": "0",
        "label": "Kambing",
        "target": "herb",
        "detail": "Makan tumbuhan.",
        "art": "goat"
      },
      {
        "id": "1",
        "label": "Harimau",
        "target": "carn",
        "detail": "Makan haiwan lain.",
        "art": "tiger"
      },
      {
        "id": "2",
        "label": "Beruang",
        "target": "omni",
        "detail": "Makan buah dan ikan.",
        "art": "bear"
      }
    ],
    "groups": [
      {
        "id": "herb",
        "label": "Herbivor"
      },
      {
        "id": "carn",
        "label": "Karnivor"
      },
      {
        "id": "omni",
        "label": "Omnivor"
      }
    ]
  },
  {
    "title": "Cari Makanan",
    "domain": "sorting",
    "mode": "evidence",
    "objective": "Periksa bukti, kemudian susun padanan yang sesuai.",
    "instruction": "Pilih satu kad. Periksa bukti, kemudian letakkan pada kumpulan yang sesuai.",
    "discovery": "Pilih makanan yang sesuai dengan tabiat pemakanan haiwan.",
    "observations": [
      "Pilih makanan yang sesuai dengan tabiat pemakanan haiwan.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Pilih makanan yang sesuai dengan tabiat pemakanan haiwan.",
      "Ramalan mesti betul sebelum kita mencuba."
    ],
    "items": [
      {
        "id": "0",
        "label": "Arnab",
        "target": "plants",
        "detail": "Arnab makan tumbuhan.",
        "art": "rabbit"
      },
      {
        "id": "1",
        "label": "Harimau",
        "target": "meat",
        "detail": "Harimau makan haiwan lain.",
        "art": "tiger"
      },
      {
        "id": "2",
        "label": "Beruang",
        "target": "both",
        "detail": "Beruang makan tumbuhan dan haiwan.",
        "art": "bear"
      }
    ],
    "groups": [
      {
        "id": "plants",
        "label": "Rumput dan sayur"
      },
      {
        "id": "meat",
        "label": "Daging"
      },
      {
        "id": "both",
        "label": "Buah dan ikan"
      }
    ]
  },
  {
    "title": "Gigi Haiwan",
    "domain": "sorting",
    "mode": "evidence",
    "objective": "Periksa bukti, kemudian susun padanan yang sesuai.",
    "instruction": "Pilih satu kad. Periksa bukti, kemudian letakkan pada kumpulan yang sesuai.",
    "discovery": "Bentuk gigi berkaitan dengan fungsi dan makanan haiwan.",
    "observations": [
      "Bentuk gigi berkaitan dengan fungsi dan makanan haiwan.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Bentuk gigi berkaitan dengan fungsi dan makanan haiwan.",
      "Ramalan mesti betul sebelum kita mencuba."
    ],
    "items": [
      {
        "id": "0",
        "label": "Geraham lebar kambing",
        "target": "grind",
        "detail": "Permukaan geraham membantu melumatkan tumbuhan.",
        "art": "molar"
      },
      {
        "id": "1",
        "label": "Taring harimau",
        "target": "tear",
        "detail": "Taring tajam membantu mengoyak daging.",
        "art": "canine"
      },
      {
        "id": "2",
        "label": "Kacip arnab",
        "target": "cut",
        "detail": "Kacip membantu memotong tumbuhan.",
        "art": "incisor"
      }
    ],
    "groups": [
      {
        "id": "grind",
        "label": "Melumatkan"
      },
      {
        "id": "tear",
        "label": "Mengoyak"
      },
      {
        "id": "cut",
        "label": "Memotong"
      }
    ]
  },
  {
    "title": "Teka Daripada Gigi",
    "domain": "sorting",
    "mode": "evidence",
    "objective": "Periksa bukti, kemudian susun padanan yang sesuai.",
    "instruction": "Pilih satu kad. Periksa bukti, kemudian letakkan pada kumpulan yang sesuai.",
    "discovery": "Gunakan bukti kegigian bersama pemerhatian makanan untuk membuat inferens.",
    "observations": [
      "Gunakan bukti kegigian bersama pemerhatian makanan untuk membuat inferens.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Gunakan bukti kegigian bersama pemerhatian makanan untuk membuat inferens.",
      "Ramalan mesti betul sebelum kita mencuba."
    ],
    "items": [
      {
        "id": "0",
        "label": "Spesimen A: kambing",
        "target": "herb",
        "detail": "Geraham lebar; makanan yang diperhatikan ialah rumput.",
        "art": "molar"
      },
      {
        "id": "1",
        "label": "Spesimen B: harimau",
        "target": "carn",
        "detail": "Taring tajam; makanan yang diperhatikan ialah daging.",
        "art": "canine"
      },
      {
        "id": "2",
        "label": "Spesimen C: beruang",
        "target": "omni",
        "detail": "Ada taring dan geraham; makan buah serta ikan.",
        "art": "teeth"
      }
    ],
    "groups": [
      {
        "id": "herb",
        "label": "Herbivor"
      },
      {
        "id": "carn",
        "label": "Karnivor"
      },
      {
        "id": "omni",
        "label": "Omnivor"
      }
    ]
  },
  {
    "title": "Cabaran Pemakanan",
    "domain": "sorting",
    "mode": "evidence",
    "objective": "Periksa bukti, kemudian susun padanan yang sesuai.",
    "instruction": "Pilih satu kad. Periksa bukti, kemudian letakkan pada kumpulan yang sesuai.",
    "discovery": "Bukti makanan dan gigi membantu kita mengelaskan haiwan dengan munasabah.",
    "observations": [
      "Bukti makanan dan gigi membantu kita mengelaskan haiwan dengan munasabah.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Bukti makanan dan gigi membantu kita mengelaskan haiwan dengan munasabah.",
      "Ramalan mesti betul sebelum kita mencuba."
    ],
    "items": [
      {
        "id": "0",
        "label": "Kambing",
        "target": "herb",
        "detail": "Makan tumbuhan.",
        "art": "goat"
      },
      {
        "id": "1",
        "label": "Harimau",
        "target": "carn",
        "detail": "Makan haiwan lain.",
        "art": "tiger"
      },
      {
        "id": "2",
        "label": "Beruang",
        "target": "omni",
        "detail": "Makan buah dan ikan.",
        "art": "bear"
      },
      {
        "id": "3",
        "label": "Arnab",
        "target": "herb",
        "detail": "Kacip memotong sayur; geraham melumatkannya.",
        "art": "rabbit"
      },
      {
        "id": "4",
        "label": "Singa",
        "target": "carn",
        "detail": "Taring mengoyak daging.",
        "art": "lion"
      }
    ],
    "groups": [
      {
        "id": "herb",
        "label": "Herbivor"
      },
      {
        "id": "carn",
        "label": "Karnivor"
      },
      {
        "id": "omni",
        "label": "Omnivor"
      }
    ]
  }
]);
