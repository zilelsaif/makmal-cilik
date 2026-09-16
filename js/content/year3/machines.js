'use strict';
window.MakmalYear3.addUnit({"id": "machines", "title": "Mesin", "emoji": "⚙️", "description": "Bina dan uji model takal tetap.", "totalMissions": 5, "icon": null}, [
  {
    "title": "Kenali Takal",
    "domain": "sorting",
    "mode": "evidence",
    "objective": "Periksa bukti, kemudian susun padanan yang sesuai.",
    "instruction": "Pilih satu kad. Periksa bukti, kemudian letakkan pada kumpulan yang sesuai.",
    "discovery": "Takal mempunyai roda beralur yang dilalui tali untuk membantu mengangkat beban.",
    "observations": [
      "Takal mempunyai roda beralur yang dilalui tali untuk membantu mengangkat beban.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Takal mempunyai roda beralur yang dilalui tali untuk membantu mengangkat beban.",
      "Ramalan mesti betul sebelum kita mencuba."
    ],
    "items": [
      {
        "id": "0",
        "label": "Roda beralur",
        "target": "wheel",
        "detail": "Alur membantu memegang tali.",
        "art": "pulley"
      },
      {
        "id": "1",
        "label": "Tali",
        "target": "rope",
        "detail": "Tali bergerak melalui alur roda.",
        "art": "rope"
      },
      {
        "id": "2",
        "label": "Beban",
        "target": "load",
        "detail": "Objek yang hendak diangkat.",
        "art": "box"
      }
    ],
    "groups": [
      {
        "id": "wheel",
        "label": "Roda takal"
      },
      {
        "id": "rope",
        "label": "Tali"
      },
      {
        "id": "load",
        "label": "Beban"
      }
    ]
  },
  {
    "title": "Angkat Beban",
    "domain": "pulley",
    "mode": "lift",
    "objective": "Tarik tali untuk mengangkat beban.",
    "instruction": "Tekan Tarik ke bawah beberapa kali dan lihat beban naik.",
    "discovery": "Takal tetap mengubah arah tarikan: tali ditarik ke bawah, beban bergerak ke atas.",
    "observations": [
      "Takal tetap mengubah arah tarikan: tali ditarik ke bawah, beban bergerak ke atas.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Takal tetap mengubah arah tarikan: tali ditarik ke bawah, beban bergerak ke atas.",
      "Ramalan mesti betul sebelum kita mencuba."
    ]
  },
  {
    "title": "Arah Tarikan",
    "domain": "pulley",
    "mode": "direction",
    "objective": "Bandingkan tarik dan kendur secara terkawal.",
    "instruction": "Tarik tali ke bawah, kemudian kendurkan secara terkawal. Cuba kedua-dua arah.",
    "discovery": "Tarikan ke bawah mengangkat beban; apabila tali dikendurkan secara terkawal, beban turun.",
    "observations": [
      "Tarikan ke bawah mengangkat beban; apabila tali dikendurkan secara terkawal, beban turun.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Tarikan ke bawah mengangkat beban; apabila tali dikendurkan secara terkawal, beban turun.",
      "Ramalan mesti betul sebelum kita mencuba."
    ]
  },
  {
    "title": "Cari Takal",
    "domain": "sorting",
    "mode": "evidence",
    "objective": "Periksa bukti, kemudian susun padanan yang sesuai.",
    "instruction": "Pilih satu kad. Periksa bukti, kemudian letakkan pada kumpulan yang sesuai.",
    "discovery": "Takal digunakan pada tiang bendera dan sesetengah perigi untuk mengubah arah tarikan.",
    "observations": [
      "Takal digunakan pada tiang bendera dan sesetengah perigi untuk mengubah arah tarikan.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Takal digunakan pada tiang bendera dan sesetengah perigi untuk mengubah arah tarikan.",
      "Ramalan mesti betul sebelum kita mencuba."
    ],
    "items": [
      {
        "id": "0",
        "label": "Tiang bendera",
        "target": "yes",
        "detail": "Tali melalui roda di bahagian atas.",
        "art": "flag"
      },
      {
        "id": "1",
        "label": "Perigi bertakal",
        "target": "yes",
        "detail": "Tali baldi melalui roda di atas perigi.",
        "art": "well"
      },
      {
        "id": "2",
        "label": "Papan gelongsor",
        "target": "no",
        "detail": "Tiada roda beralur dan tali.",
        "art": "ramp"
      },
      {
        "id": "3",
        "label": "Pembaris",
        "target": "no",
        "detail": "Alat ukuran tanpa roda dan tali.",
        "art": "ruler"
      }
    ],
    "groups": [
      {
        "id": "yes",
        "label": "Menggunakan takal"
      },
      {
        "id": "no",
        "label": "Bukan takal"
      }
    ]
  },
  {
    "title": "Bina Sistem Takal",
    "domain": "pulley",
    "mode": "build",
    "objective": "Pasang model takal dan angkat bekalan.",
    "instruction": "Pasang roda pada sokongan, lalukan tali, pasang beban, kemudian tarik hujung tali ke bawah.",
    "discovery": "Takal tetap yang dipasang dengan betul menukar arah tarikan; ia tidak mengurangkan berat beban.",
    "observations": [
      "Takal tetap yang dipasang dengan betul menukar arah tarikan; ia tidak mengurangkan berat beban.",
      "Bandingkan hasil ini dengan ramalan awal kamu."
    ],
    "question": "Apakah yang ditunjukkan oleh penyiasatan ini?",
    "answers": [
      "Takal tetap yang dipasang dengan betul menukar arah tarikan; ia tidak mengurangkan berat beban.",
      "Ramalan mesti betul sebelum kita mencuba."
    ]
  }
]);
