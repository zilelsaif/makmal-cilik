'use strict';
window.MakmalYear3.addUnit({"id": "lab-rules", "title": "Peraturan Bilik Sains", "emoji": "🥽", "description": "Kenal bahaya dan bertindak dengan selamat.", "totalMissions": 5, "icon": null}, [
  {
    "title": "Kenali Bahaya",
    "domain": "sorting",
    "mode": "evidence",
    "objective": "Periksa bukti, kemudian susun padanan yang sesuai.",
    "instruction": "Pilih satu kad. Periksa bukti, kemudian letakkan pada kumpulan yang sesuai.",
    "discovery": "Kenal pasti bahaya dan ikut arahan guru untuk menjaga keselamatan.",
    "observations": [
      "Kenal pasti bahaya dan ikut arahan guru untuk menjaga keselamatan.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Kenal pasti bahaya dan ikut arahan guru untuk menjaga keselamatan.",
      "Ramalan mesti betul sebelum kita mencuba."
    ],
    "items": [
      {
        "id": "0",
        "label": "Beg di laluan",
        "target": "move",
        "detail": "Beg menghalang laluan berjalan.",
        "art": "bag"
      },
      {
        "id": "1",
        "label": "Air di lantai",
        "target": "report",
        "detail": "Lantai basah boleh menyebabkan tergelincir.",
        "art": "spill"
      },
      {
        "id": "2",
        "label": "Murid berlari",
        "target": "walk",
        "detail": "Peralatan berada di atas meja.",
        "art": "walk"
      }
    ],
    "groups": [
      {
        "id": "move",
        "label": "Simpan beg di tempatnya"
      },
      {
        "id": "report",
        "label": "Jauhkan diri dan beritahu guru"
      },
      {
        "id": "walk",
        "label": "Berjalan dengan tenang"
      }
    ]
  },
  {
    "title": "Pilih Tindakan Selamat",
    "domain": "sorting",
    "mode": "evidence",
    "objective": "Periksa bukti, kemudian susun padanan yang sesuai.",
    "instruction": "Pilih satu kad. Periksa bukti, kemudian letakkan pada kumpulan yang sesuai.",
    "discovery": "Tindakan selamat bermula sebelum menggunakan alat.",
    "observations": [
      "Tindakan selamat bermula sebelum menggunakan alat.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Tindakan selamat bermula sebelum menggunakan alat.",
      "Ramalan mesti betul sebelum kita mencuba."
    ],
    "items": [
      {
        "id": "0",
        "label": "Arahan aktiviti",
        "target": "listen",
        "detail": "Guru menerangkan cara menggunakan alat.",
        "art": "teacher"
      },
      {
        "id": "1",
        "label": "Bekas berlabel",
        "target": "read",
        "detail": "Label membantu mengenali bahan.",
        "art": "beaker"
      },
      {
        "id": "2",
        "label": "Alat selepas digunakan",
        "target": "store",
        "detail": "Ruang kerja perlu dikemas mengikut arahan.",
        "art": "tools"
      }
    ],
    "groups": [
      {
        "id": "listen",
        "label": "Dengar arahan dahulu"
      },
      {
        "id": "read",
        "label": "Baca label bersama guru"
      },
      {
        "id": "store",
        "label": "Simpan alat dengan cermat"
      }
    ]
  },
  {
    "title": "Alat Pecah",
    "domain": "sorting",
    "mode": "sequence",
    "objective": "Susun tindakan mengikut urutan yang sesuai.",
    "instruction": "Sentuh tindakan mengikut urutan. Perhatikan perubahan pada setiap langkah.",
    "discovery": "Jika alat pecah, jangan kutip serpihan dengan tangan; beritahu guru.",
    "observations": [
      "Jika alat pecah, jangan kutip serpihan dengan tangan; beritahu guru.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Jika alat pecah, jangan kutip serpihan dengan tangan; beritahu guru.",
      "Ramalan mesti betul sebelum kita mencuba."
    ],
    "items": [
      {
        "id": "0",
        "label": "Berhenti dan jauhkan diri",
        "detail": "Jangan sentuh serpihan kaca.",
        "art": "broken"
      },
      {
        "id": "1",
        "label": "Beritahu guru",
        "detail": "Guru menguruskan serpihan menggunakan alat sesuai.",
        "art": "broken"
      },
      {
        "id": "2",
        "label": "Tunggu kawasan disahkan selamat",
        "detail": "Sambung aktiviti hanya selepas arahan guru.",
        "art": "broken"
      }
    ],
    "art": "broken"
  },
  {
    "title": "Tumpahan Makmal",
    "domain": "sorting",
    "mode": "sequence",
    "objective": "Susun tindakan mengikut urutan yang sesuai.",
    "instruction": "Sentuh tindakan mengikut urutan. Perhatikan perubahan pada setiap langkah.",
    "discovery": "Tumpahan yang tidak diketahui mesti dilaporkan kepada guru.",
    "observations": [
      "Tumpahan yang tidak diketahui mesti dilaporkan kepada guru.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Tumpahan yang tidak diketahui mesti dilaporkan kepada guru.",
      "Ramalan mesti betul sebelum kita mencuba."
    ],
    "items": [
      {
        "id": "0",
        "label": "Jauhkan diri daripada tumpahan",
        "detail": "Jangan sentuh atau rasa bahan.",
        "art": "spill"
      },
      {
        "id": "1",
        "label": "Maklumkan kepada guru",
        "detail": "Nyatakan lokasi dan bekas yang tertumpah.",
        "art": "spill"
      },
      {
        "id": "2",
        "label": "Tunggu arahan guru",
        "detail": "Guru menentukan cara pembersihan yang selamat.",
        "art": "spill"
      }
    ],
    "art": "spill"
  },
  {
    "title": "Cabaran Makmal Selamat",
    "domain": "sorting",
    "mode": "evidence",
    "objective": "Periksa bukti, kemudian susun padanan yang sesuai.",
    "instruction": "Pilih satu kad. Periksa bukti, kemudian letakkan pada kumpulan yang sesuai.",
    "discovery": "Kawasan selamat, alat terurus dan arahan dipatuhi membantu semua orang belajar.",
    "observations": [
      "Kawasan selamat, alat terurus dan arahan dipatuhi membantu semua orang belajar.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Kawasan selamat, alat terurus dan arahan dipatuhi membantu semua orang belajar.",
      "Ramalan mesti betul sebelum kita mencuba."
    ],
    "items": [
      {
        "id": "0",
        "label": "Serpihan kaca",
        "target": "teacher",
        "detail": "Alat pecah di hujung meja.",
        "art": "broken"
      },
      {
        "id": "1",
        "label": "Beg terbuka",
        "target": "bag",
        "detail": "Beg menghalang pintu.",
        "art": "bag"
      },
      {
        "id": "2",
        "label": "Bahan tidak dikenali",
        "target": "label",
        "detail": "Label tidak jelas.",
        "art": "beaker"
      },
      {
        "id": "3",
        "label": "Aktiviti selesai",
        "target": "tidy",
        "detail": "Alat masih di meja.",
        "art": "tools"
      }
    ],
    "groups": [
      {
        "id": "teacher",
        "label": "Jauhkan diri, beritahu guru"
      },
      {
        "id": "bag",
        "label": "Simpan beg di tempat selamat"
      },
      {
        "id": "label",
        "label": "Tanya guru; jangan rasa/sentuh"
      },
      {
        "id": "tidy",
        "label": "Kemas mengikut arahan"
      }
    ]
  }
]);
