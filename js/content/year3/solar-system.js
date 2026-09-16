'use strict';
window.MakmalYear3.addUnit({"id": "solar-system", "title": "Sistem Suria", "emoji": "🪐", "description": "Terokai ahli, kedudukan dan orbit.", "totalMissions": 5, "icon": null}, [
  {
    "title": "Kenali Ahli Sistem Suria",
    "domain": "sorting",
    "mode": "evidence",
    "objective": "Periksa bukti, kemudian susun padanan yang sesuai.",
    "instruction": "Pilih satu kad. Periksa bukti, kemudian letakkan pada kumpulan yang sesuai.",
    "discovery": "Sistem Suria mengandungi Matahari, planet, satelit semula jadi dan ahli kecil lain.",
    "observations": [
      "Sistem Suria mengandungi Matahari, planet, satelit semula jadi dan ahli kecil lain.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Sistem Suria mengandungi Matahari, planet, satelit semula jadi dan ahli kecil lain.",
      "Ramalan mesti betul sebelum kita mencuba."
    ],
    "items": [
      {
        "id": "0",
        "label": "Matahari",
        "target": "star",
        "detail": "Bintang di pusat Sistem Suria.",
        "art": "sun"
      },
      {
        "id": "1",
        "label": "Bumi",
        "target": "planet",
        "detail": "Planet yang mengorbit Matahari.",
        "art": "earth"
      },
      {
        "id": "2",
        "label": "Bulan",
        "target": "satellite",
        "detail": "Satelit semula jadi yang mengorbit Bumi.",
        "art": "moon"
      },
      {
        "id": "3",
        "label": "Asteroid",
        "target": "small",
        "detail": "Objek berbatu yang mengorbit Matahari.",
        "art": "asteroid"
      },
      {
        "id": "4",
        "label": "Komet",
        "target": "small",
        "detail": "Objek berais; boleh kelihatan berekor apabila dekat Matahari.",
        "art": "comet"
      },
      {
        "id": "5",
        "label": "Meteoroid",
        "target": "small",
        "detail": "Objek batu atau logam kecil di angkasa.",
        "art": "asteroid"
      }
    ],
    "groups": [
      {
        "id": "star",
        "label": "Bintang"
      },
      {
        "id": "planet",
        "label": "Planet"
      },
      {
        "id": "satellite",
        "label": "Satelit semula jadi"
      },
      {
        "id": "small",
        "label": "Ahli kecil Sistem Suria"
      }
    ]
  },
  {
    "title": "Susun Planet",
    "domain": "sorting",
    "mode": "sequence",
    "objective": "Susun tindakan mengikut urutan yang sesuai.",
    "instruction": "Sentuh tindakan mengikut urutan. Perhatikan perubahan pada setiap langkah.",
    "discovery": "Urutan planet bermula dengan Utarid dan berakhir dengan Neptun.",
    "observations": [
      "Urutan planet bermula dengan Utarid dan berakhir dengan Neptun.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Urutan planet bermula dengan Utarid dan berakhir dengan Neptun.",
      "Ramalan mesti betul sebelum kita mencuba."
    ],
    "items": [
      {
        "id": "0",
        "label": "Utarid",
        "detail": "Kedudukan 1 dari Matahari.",
        "art": "planet"
      },
      {
        "id": "1",
        "label": "Zuhrah",
        "detail": "Kedudukan 2 dari Matahari.",
        "art": "planet"
      },
      {
        "id": "2",
        "label": "Bumi",
        "detail": "Kedudukan 3 dari Matahari.",
        "art": "planet"
      },
      {
        "id": "3",
        "label": "Marikh",
        "detail": "Kedudukan 4 dari Matahari.",
        "art": "planet"
      },
      {
        "id": "4",
        "label": "Musytari",
        "detail": "Kedudukan 5 dari Matahari.",
        "art": "planet"
      },
      {
        "id": "5",
        "label": "Zuhal",
        "detail": "Kedudukan 6 dari Matahari.",
        "art": "planet"
      },
      {
        "id": "6",
        "label": "Uranus",
        "detail": "Kedudukan 7 dari Matahari.",
        "art": "planet"
      },
      {
        "id": "7",
        "label": "Neptun",
        "detail": "Kedudukan 8 dari Matahari.",
        "art": "planet"
      }
    ],
    "scene": "planets",
    "art": "planet"
  },
  {
    "title": "Panas atau Sejuk",
    "domain": "solar",
    "mode": "temperature",
    "objective": "Bandingkan bacaan suhu model empat planet.",
    "instruction": "Pilih setiap planet untuk melihat perbandingan suhu. Perhatikan pengecualian Zuhrah.",
    "discovery": "Planet yang jauh biasanya lebih sejuk, tetapi Zuhrah paling panas kerana atmosferanya memerangkap haba.",
    "observations": [
      "Planet yang jauh biasanya lebih sejuk, tetapi Zuhrah paling panas kerana atmosferanya memerangkap haba.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Planet yang jauh biasanya lebih sejuk, tetapi Zuhrah paling panas kerana atmosferanya memerangkap haba.",
      "Ramalan mesti betul sebelum kita mencuba."
    ]
  },
  {
    "title": "Ikut Orbit",
    "domain": "solar",
    "mode": "orbit",
    "objective": "Majukan masa dan bandingkan dua orbit.",
    "instruction": "Tekan Majukan masa beberapa kali. Bandingkan bilangan pusingan planet dekat dan jauh. Rajah tidak mengikut skala.",
    "discovery": "Planet beredar mengikut orbit; planet lebih jauh mengambil masa lebih lama untuk satu peredaran.",
    "observations": [
      "Planet beredar mengikut orbit; planet lebih jauh mengambil masa lebih lama untuk satu peredaran.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Planet beredar mengikut orbit; planet lebih jauh mengambil masa lebih lama untuk satu peredaran.",
      "Ramalan mesti betul sebelum kita mencuba."
    ]
  },
  {
    "title": "Cabaran Sistem Suria",
    "domain": "solar",
    "mode": "finale",
    "objective": "Susun orbit, kemudian uji masa peredaran.",
    "instruction": "Letakkan Bumi pada orbit dekat dan Neptun pada orbit jauh dalam model dua planet. Majukan masa dan bandingkan.",
    "discovery": "Orbit dan masa peredaran berbeza mengikut kedudukan planet. Model ini tidak mengikut skala sebenar.",
    "observations": [
      "Orbit dan masa peredaran berbeza mengikut kedudukan planet. Model ini tidak mengikut skala sebenar.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Orbit dan masa peredaran berbeza mengikut kedudukan planet. Model ini tidak mengikut skala sebenar.",
      "Ramalan mesti betul sebelum kita mencuba."
    ]
  }
]);
