// Membuat "Catatan Proses ADDIE SHINING" (.docx) untuk disisipkan ke disertasi.
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Table, TableRow, TableCell,
  WidthType, ShadingType, BorderStyle, ImageRun, LevelFormat, PageOrientation, Footer, PageNumber,
  VerticalAlign, LineRuleType
} = require('docx');

const FONT = 'Times New Roman';
const D = __dirname;
const FLYER = path.join(D, '..', 'flyer');

// ---------- helpers ----------
// Teks berformat sederhana: *miring*, **tebal**, `kode`
function runs(text, base = {}) {
  const out = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0, m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(new TextRun({ text: text.slice(last, m.index), ...base }));
    const t = m[0];
    if (t.startsWith('**')) out.push(new TextRun({ text: t.slice(2, -2), bold: true, ...base }));
    else if (t.startsWith('`')) out.push(new TextRun({ text: t.slice(1, -1), font: 'Courier New', size: base.size ? base.size - 2 : 22 }));
    else out.push(new TextRun({ text: t.slice(1, -1), italics: true, ...base }));
    last = m.index + t.length;
  }
  if (last < text.length) out.push(new TextRun({ text: text.slice(last), ...base }));
  return out;
}
const P = (text, opt = {}) => new Paragraph({ children: runs(text), alignment: AlignmentType.JUSTIFIED, indent: { firstLine: opt.noIndent ? 0 : 567 }, ...opt.p });
const H1 = (t, brk) => new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: !!brk, children: runs(t) });
const H2 = t => new Paragraph({ heading: HeadingLevel.HEADING_2, children: runs(t) });
const H3 = t => new Paragraph({ heading: HeadingLevel.HEADING_3, children: runs(t) });
const B = (t, lvl = 0) => new Paragraph({ numbering: { reference: 'bul', level: lvl }, alignment: AlignmentType.JUSTIFIED, children: runs(t) });
const N = (t, ref = 'num') => new Paragraph({ numbering: { reference: ref, level: 0 }, alignment: AlignmentType.JUSTIFIED, children: runs(t) });
const CAP = t => new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 200, after: 80, line: 240 }, keepNext: true, children: runs(t, { size: 22 }) });
const SRC = t => new Paragraph({ alignment: AlignmentType.LEFT, spacing: { before: 60, after: 200, line: 240 }, children: runs(t, { size: 20, italics: false }) });

const border = { style: BorderStyle.SINGLE, size: 4, color: '808080' };
const borders = { top: border, bottom: border, left: border, right: border };
function table(widths, header, rows, opt = {}) {
  const total = widths.reduce((a, b) => a + b, 0);
  const cell = (t, w, head, ci) => new TableCell({
    width: { size: w, type: WidthType.DXA }, borders,
    shading: head ? { fill: 'E7E6E6', type: ShadingType.CLEAR, color: 'auto' } : undefined,
    margins: { top: 60, bottom: 60, left: 90, right: 90 }, verticalAlign: VerticalAlign.TOP,
    children: String(t).split('\n').map(line => new Paragraph({
      spacing: { line: 240, before: 0, after: 0 },
      alignment: head ? AlignmentType.CENTER : (opt.center && opt.center.includes(ci) ? AlignmentType.CENTER : AlignmentType.LEFT),
      children: runs(line, { size: opt.size || 20, bold: head || undefined })
    }))
  });
  return new Table({
    width: { size: total, type: WidthType.DXA }, columnWidths: widths,
    rows: [
      new TableRow({ tableHeader: true, children: header.map((h, i) => cell(h, widths[i], true, i)) }),
      ...rows.map(r => new TableRow({ cantSplit: true, children: r.map((c, i) => cell(c, widths[i], false, i)) }))
    ]
  });
}
function img(file, wPx, hPx) {
  return new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, spacing: { before: 120, after: 60, line: 240, lineRule: LineRuleType.AUTO },
    children: [new ImageRun({ type: file.endsWith('.png') ? 'png' : 'jpg', data: fs.readFileSync(file), transformation: { width: wPx, height: hPx } })] });
}

// ---------- isi ----------
const A4P = { width: 11906, height: 16838 };
const marginP = { top: 1701, bottom: 1701, left: 2268, right: 1701 }; // 3 / 3 / 4 / 3 cm
const textW = A4P.width - marginP.left - marginP.right; // 7937

const bagian1 = [
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: 'CATATAN PROSES ADDIE', bold: true, size: 28 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 }, children: [new TextRun({ text: 'Pemantauan Data, Kendala, dan Perbaikan Platform SHINING EduCatin', bold: true, size: 26 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 360 }, children: [new TextRun({ text: 'Periode pemantauan: 25 Oktober – November 2026', size: 24 })] }),

  P('**Catatan penggunaan.** Naskah ini disusun sebagai bahan sisipan disertasi pada tahap *Implementation* dan *Evaluation* model ADDIE. Penomoran subbab, tabel, dan gambar perlu disesuaikan dengan bab tempat naskah ini disisipkan dan dengan Pedoman Penulisan Karya Ilmiah IPB yang berlaku. Penanda [PERLU DATA], [CEK PROMOTOR], dan [CEK REFERENSI] menunjukkan bagian yang masih harus dilengkapi atau diputuskan.', { noIndent: true }),

  H1('1  Pengantar'),
  P('Pemantauan data pada 22 November 2026 menunjukkan bahwa kekurangan data pada media edukasi SHINING terutama berasal dari peserta yang berhenti di tengah rangkaian kuesioner, bukan dari kegagalan sistem penyimpanan. Catatan ini mendokumentasikan prosedur pemantauan, temuan, kendala platform beserta perbaikannya, dan rekomendasi untuk iterasi pengembangan berikutnya.'),
  P('SHINING merupakan aplikasi web edukasi gizi dan kesehatan prakonsepsi bagi calon pengantin (catin) yang dikembangkan berdasarkan *Health Belief Model* (HBM). Kelompok kontrol mengakses mulai.edukasi-catin.id, sedangkan kelompok intervensi mengakses shining.edukasi-catin.id. Kedua platform mengirim data setiap instrumen ke Google Sheets melalui Google Apps Script Web App, dengan nomor HP ternormalisasi (`hp_kunci`) sebagai kunci penggabungan data pre-test dan post-test.'),
  P('Angka dalam catatan ini merupakan gabungan kelompok kontrol dan intervensi, tanpa baris uji coba sistem. Pemisahan per kelompok dan pengecualian responden yang tidak memenuhi kriteria inklusi belum dilakukan [PERLU DATA].'),

  H1('2  Prosedur Pemantauan Data'),
  P('Pemantauan dilakukan melalui dua tab yang dibangun otomatis oleh Apps Script dari seluruh tab instrumen. Tab data asli tidak diubah oleh kedua prosedur ini.'),
  B('**REKAP-KELAYAKAN** menyajikan satu baris per peserta per kelompok, berisi tanda kelengkapan pre-test dan post-test enam instrumen inti (pengetahuan, sikap HBM, kebiasaan makan/FFQ, aktivitas fisik/IPAQ, karakteristik/identitas, dan media sosial dan literasi), jumlah instrumen lengkap, status kelayakan, dan daftar instrumen yang kurang. Rekap dapat disegarkan otomatis setiap jam.'),
  B('**DIAGNOSA-INSTRUMEN** (tersedia sejak 22 November 2026) menyajikan untuk setiap instrumen inti: jumlah baris, jumlah orang yang memiliki pre-test dan post-test, baris tanpa nomor HP, sebaran nilai tahap, sesi, dan status, catatan sistem, serta kiriman yang tertahan di tab karantina.'),
  P('Status kelayakan peserta ditetapkan sebagai berikut. Peserta dinyatakan **LENGKAP** bila memiliki pre-test keenam instrumen dan post-test lima instrumen; post-test media sosial dan literasi tidak diwajibkan sejak keputusan 22 November 2026. Kategori lain adalah *Post belum lengkap*, *Baru pre*, *Pre belum lengkap*, dan *Belum ada pre*. Kolom tambahan `pre_inti_m0` menandai kelengkapan lima instrumen inti pre-test yang dipakai server untuk menyatakan sesi M0 selesai.'),

  H1('3  Temuan Pemantauan'),
  H2('3.1  Retensi peserta per instrumen'),
  P('Sebanyak 45 dari 186 peserta (24%) yang mengisi tes pengetahuan tidak mengirim kuesioner aktivitas fisik (IPAQ) pada pre-test M0. Penurunan terjadi bertahap pada setiap kuesioner berikutnya (Tabel 1 dan Gambar 1).'),
  CAP('**Tabel 1** Jumlah peserta yang memiliki kiriman pre-test dan post-test per instrumen (22 November 2026)'),
  table([2600, 1300, 2037, 2000], ['Instrumen (urutan M0)', 'Pre-test (orang)', 'Perubahan dari instrumen sebelumnya', 'Post-test (orang)'], [
    ['Pengetahuan', '186', '–', '11'],
    ['Sikap HBM', '164', '−22 (−12% dari awal)', '10'],
    ['Kebiasaan makan (FFQ)', '154', '−10 (−17% dari awal)', '9'],
    ['Aktivitas fisik (IPAQ)', '141', '−13 (−24% dari awal)', '8'],
    ['Media sosial dan literasi*', '142', '+1 (−24% dari awal)', '7'],
  ], { center: [1, 3] }),
  SRC('Sumber: tab DIAGNOSA-INSTRUMEN, Google Sheets SHINING, 22 November 2026; gabungan kelompok kontrol dan intervensi, tanpa baris uji. *Pre-test media sosial dan literasi belum diwajibkan oleh gerbang M0 selama pengumpulan data. Data instrumen identitas tidak ditampilkan.'),
  img(path.join(D, 'gambar-retensi-pre.png'), 560, 264),
  CAP('**Gambar 1** Jumlah peserta dengan kiriman pre-test per instrumen menurut urutan sesi M0'),
  P('Post-test M8 baru diisi oleh 7–11 peserta per instrumen karena sebagian besar peserta belum mencapai minggu kedelapan. Pola penurunannya serupa dengan pre-test. Pola penurunan bertahap ini diduga mencerminkan kelelahan responden (*respondent burden*) pada rangkaian kuesioner yang panjang, yang dalam kerangka HBM dapat dipandang sebagai *perceived barriers* (hambatan yang dirasakan) terhadap keterlibatan dalam program [CEK REFERENSI].'),

  H2('3.2  Temuan teknis'),
  B('**Data tersimpan utuh.** Tab karantina tidak memuat kiriman instrumen inti dan seluruh baris instrumen inti terbaca oleh rekap. Kekurangan data berasal dari kuesioner yang tidak dikirim peserta.'),
  B('**Nilai tahap seragam.** Instrumen pengetahuan, sikap, FFQ, dan IPAQ hanya memuat nilai `pre-test` dan `post-test`; instrumen media sosial dan literasi memuat `karakteristik-awal` (162 baris) dan `tinjauan-akhir` (8 baris).'),
  B('**Celah gerbang M0.** Aplikasi web membuka modul berikutnya setelah lima instrumen inti terkirim tanpa memeriksa pre-test media sosial dan literasi. Pre-test media sosial hanya dimiliki 142 orang dibandingkan 186 orang pada tes pengetahuan.'),
  B('**Kesalahan pembacaan rekap.** Kolom tahap pada instrumen media sosial tersimpan dengan nama `tahap_program`, sedangkan rekap membaca kolom `tahap`. Akibatnya semua kiriman media sosial terhitung sebagai pre-test dan tidak ada peserta yang tercatat LENGKAP sebelum perbaikan.'),
  B('**Sesi post-test media sosial salah tercatat.** Nilai `tinjauan-akhir` tidak dikenali oleh penerima data sehingga tujuh kiriman post-test media sosial tercatat sebagai sesi 1 (catatan sistem `sesi_dikira_1`).'),
  B('**Nomor HP tidak sah.** Sebanyak 6–13 baris per instrumen tidak memiliki `hp_kunci`; nomor aslinya tersimpan pada kolom `hp_asli` dan perlu diperbaiki secara manual.'),
];

// Log kendala (landscape)
const A4L = { width: 11906, height: 16838 };
const marginL = { top: 1701, bottom: 1701, left: 1701, right: 1701 };
const textWL = A4L.height - marginL.left - marginL.right; // 13436
const logWidths = [450, 1250, 900, 1500, 2300, 2200, 2700, 2136];
const bagianLog = [
  H2('3.3  Log kendala dan perubahan platform'),
  P('Tabel 2 merangkum kendala yang ditemukan selama periode pemantauan beserta perbaikannya. Tabel ini melengkapi log kendala dan perubahan platform yang disusun sejak tahap *Development*.', { noIndent: true }),
  CAP('**Tabel 2** Kendala dan perubahan platform SHINING, 25 Oktober – November 2026'),
  table(logWidths, ['No', 'Fase ADDIE', 'Platform (K/I/Keduanya)', 'Komponen', 'Masalah', 'Dampak pada data/peserta', 'Perubahan/perbaikan', 'Verifikasi'], [
    ['1', 'Design', 'Keduanya', 'Kriteria kelengkapan M0', 'Definisi "M0 lengkap" berbeda: gerbang memakai 5 instrumen inti, rekap kelayakan memakai 6 instrumen (termasuk media sosial).', 'Peserta dapat membuka modul tanpa pre-test media sosial; status rekap tampak janggal ("Pre belum lengkap" tetapi sudah mencapai M8).', 'Keputusan: pre-test media sosial wajib di M0. Apps Script v7.3 menambah kolom `pre_inti_m0`; v7.6 menambah status `m0_wajib_lengkap` dan `m0_wajib_kurang`.', 'Uji data tiruan: nomor tanpa media sosial menghasilkan `m0_wajib_lengkap = false`. Penerapan gerbang di aplikasi web [PERLU DATA].'],
    ['2', 'Development', 'Keduanya', 'Rekap kelayakan', 'Kolom tahap media sosial tersimpan sebagai `tahap_program`; rekap hanya membaca `tahap`.', 'Semua kiriman media sosial terhitung pre-test; tidak ada peserta berstatus LENGKAP.', 'v7.3 (22 Nov 2026): rekap membaca `tahap` lalu `tahap_program`.', 'Uji data tiruan; tab diagnosa menunjukkan 7 orang dengan post-test media sosial terbaca.'],
    ['3', 'Design', 'Keduanya', 'Kriteria kelayakan M8', 'Post-test media sosial belum ditetapkan wajib atau opsional.', 'Banyak peserta "Post belum lengkap" hanya karena post-test media sosial.', 'Keputusan 22 Nov 2026: post-test media sosial tidak wajib. v7.4 menerapkannya pada rekap (tetap ditampilkan sebagai data tambahan).', 'Uji data tiruan: peserta dengan 5 post-test wajib berstatus LENGKAP.'],
    ['4', 'Development', 'Keduanya', 'Penerima data (doPost)', 'Nilai tahap `karakteristik-awal` dan `tinjauan-akhir` tidak dikenali saat menurunkan nomor sesi.', '7 kiriman post-test media sosial tercatat sebagai sesi 1.', 'v7.6: kedua nilai dipetakan ke sesi 1 dan sesi 2 untuk kiriman baru; baris lama tidak diubah.', 'Uji data tiruan pemetaan sesi.'],
    ['5', 'Implementation', 'Keduanya', 'Rekap kelayakan', 'Rekap hanya mengenali teks `post-test` persis; varian lain (posttest, akhir, sesi 2) terhitung pre-test.', 'Risiko post-test salah terhitung sebagai pre-test.', 'v7.5: fungsi `jenisTahap` mengenali varian post-test dan sesi 2.', 'Tab diagnosa: nilai tahap seragam, tidak ada baris terdampak.'],
    ['6', 'Implementation', 'Keduanya', 'Pemantauan data', 'Belum ada alat untuk melihat kelengkapan per instrumen.', 'Penurunan jumlah peserta antar-kuesioner tidak terdeteksi dini.', 'v7.5: menu dan tab DIAGNOSA-INSTRUMEN.', 'Dijalankan pada data asli 22 Nov 2026 (Tabel 1).'],
    ['7', 'Implementation', 'Keduanya', 'Kunci nomor HP', '6–13 baris per instrumen tanpa `hp_kunci` karena nomor HP tidak sah atau kosong.', 'Penggabungan pre-post bergantung pada nama; risiko data satu peserta terpecah.', 'Perbaikan manual berdasarkan kolom `hp_asli` [PERLU DATA].', '[PERLU DATA]'],
    ['8', 'Implementation', 'Keduanya', 'Pengingat peserta', 'Rancangan flyer awal memuat materi edukasi gizi dan janji sertifikat, ditujukan ke platform kontrol.', 'Risiko kontaminasi kelompok kontrol dan perlakuan pengingat yang tidak setara.', 'Flyer netral tanpa materi edukasi dengan isi identik untuk kedua kelompok, hanya berbeda alamat dan kode QR (Lampiran 1).', 'Tanggal pengiriman dan jumlah penerima per kelompok [PERLU DATA].'],
    ['9', 'Implementation', 'I', 'Pengaturan akses minggu (aplikasi web)', 'Kesalahan pengaturan aplikasi membuat 2 peserta intervensi dapat membuka Minggu 2–8 sebelum jadwalnya.', 'Kedua peserta menerima materi dan kemungkinan mengisi post-test M8 lebih awal dari hari ke-56; deviasi protokol.', 'Pengaturan diperbaiki; kedua peserta dicatat sebagai deviasi protokol dan dianalisis terpisah [CEK PROMOTOR].', 'Identitas, tanggal, dan instrumen yang diisi kedua peserta [PERLU DATA].'],
    ['10', 'Implementation', 'I', 'Jadwal materi (aplikasi web)', 'Seluruh peserta intervensi masih berada di M0–M1; jeda 7 hari per minggu materi berisiko menurunkan keterlibatan.', 'Peserta menunggu lama untuk materi berikutnya.', 'Amandemen protokol: setelah M0 tuntas, materi Minggu 1–7 terbuka sekaligus (*self-paced*); M8 tetap terjadwal pada hari ke-56. Kiriman data diberi penanda `akses_terbuka = M1-M7` (subbab 3.4).', 'Simulasi peserta tuntas M0: M0–M7 terbuka, M8 terkunci, tanpa galat (22 Nov 2026). Tanggal aktif [PERLU DATA].'],
  ], { size: 18, center: [0] }),
  SRC('K = platform kontrol (mulai.edukasi-catin.id); I = platform intervensi (shining.edukasi-catin.id). Apps Script dipakai bersama oleh kedua platform.'),
];

const bagian2 = [
  H2('3.4  Amandemen protokol: akses materi mandiri pada platform intervensi'),
  P('Sejak [tanggal aktif, PERLU DATA], materi Minggu 1–7 pada platform intervensi (shining.edukasi-catin.id) dibuka sekaligus setelah peserta menuntaskan M0, sehingga peserta dapat mempelajari materi secara mandiri (*self-paced*). Minggu 8, yang memuat materi penutup dan post-test, tetap terjadwal pada hari ke-56 sejak M0 tuntas. Dengan demikian, jarak waktu antara pre-test dan post-test tetap setara dengan kelompok kontrol.'),
  P('Saat amandemen diterapkan, seluruh peserta intervensi berada pada tahap M0–M1 dan belum ada aktivitas Minggu 2–7 yang tercatat, kecuali dua peserta yang dapat membuka Minggu 2–8 akibat kesalahan pengaturan aplikasi. Perubahan ini karenanya berlaku seragam bagi seluruh peserta intervensi mulai Minggu 2. Kedua peserta tersebut dicatat sebagai deviasi protokol (Tabel 2, nomor 9).'),
  P('Perubahan dilakukan seminimal mungkin pada aplikasi web: satu pengaturan (`BUKA_M1_M7`) pada fungsi penentu minggu terbuka, teks pemberitahuan jadwal pada beranda, dan penanda `akses_terbuka = M1-M7` pada setiap kiriman data. Penanda ini memungkinkan kiriman sebelum dan sesudah amandemen dipisahkan dalam analisis sensitivitas. Materi, instrumen, dan alur pengiriman data tidak berubah. Berkas laman sebelum amandemen disimpan sebagai cadangan.'),
  P('Amandemen ini perlu disampaikan kepada komisi pembimbing dan, bila protokol terdaftar, kepada komisi etik [CEK PROMOTOR]. Konsekuensinya bagi tafsir hasil adalah bahwa urutan dan laju paparan materi Minggu 1–7 dapat berbeda antarpeserta; kepatuhan per minggu materi sebaiknya dilaporkan sebagai indikator proses.'),

  H1('4  Rekomendasi untuk Iterasi Berikutnya'),
  P('Rekomendasi utama untuk iterasi berikutnya adalah menjaga kuesioner wajib melalui gerbang di aplikasi web dan mengurangi beban kuesioner pada sesi M0. Rincian per tahap ADDIE disajikan pada Tabel 3.'),
  CAP('**Tabel 3** Rekomendasi per tahap ADDIE berdasarkan temuan implementasi'),
  table([1300, 3200, 3437], ['Tahap', 'Temuan', 'Rekomendasi'], [
    ['*Analysis*', 'Beban enam kuesioner berurutan pada M0 belum dianalisis sebagai hambatan; 24% peserta tidak sampai ke IPAQ.', 'Analisis beban responden: estimasi waktu pengisian, uji keterbacaan IPAQ dan FFQ pada calon pengguna, serta profil perangkat dan koneksi catin.'],
    ['*Design*', 'Definisi kelengkapan berbeda antara gerbang aplikasi dan kriteria kelayakan analisis.', 'Tetapkan satu definisi kelayakan beserta daftar instrumen wajib dan opsional, lalu turunkan ke aplikasi web, server, dan rekap.'],
    ['*Design*', 'IPAQ berada di urutan keempat setelah tiga kuesioner panjang.', 'Pecah M0 menjadi dua sesi pendek, tampilkan progres ("Kuesioner 4 dari 6"), dan beri contoh pengisian IPAQ.'],
    ['*Development*', 'Nama kolom dan nilai tahap tidak seragam antara aplikasi web dan Apps Script.', 'Gunakan satu kamus data (nama instrumen, kolom, nilai tahap dan sesi) serta uji otomatis kombinasi pre/post setiap instrumen sebelum rilis.'],
    ['*Development*', 'Gerbang modul berada di aplikasi web, sedangkan status kelengkapan dihitung di server.', 'Gerbang memakai status server (`m0_wajib_lengkap`) dan menampilkan kuesioner yang masih kurang; terapkan pemeriksaan serupa untuk M8 dan sertifikat.'],
    ['*Implementation*', 'Peserta yang berhenti di tengah M0 tidak terpantau secara rutin; pengingat bersifat ad hoc.', 'Rekap otomatis tiap jam, diagnosa mingguan, dan protokol pengingat baku (waktu, isi, saluran) yang setara untuk kedua kelompok beserta log pengiriman.'],
    ['*Evaluation*', 'Belum ada indikator proses kepatuhan per instrumen.', 'Laporkan retensi per instrumen (pre dan post) berdampingan dengan luaran pengetahuan, sikap HBM, kebiasaan makan, dan aktivitas fisik.'],
  ], { size: 20 }),
  SRC(''),

  H1('5  Implikasi bagi Pelaporan Disertasi'),
  P('Usulan berikut menunggu keputusan peneliti dan komisi pembimbing.'),
  B('**Populasi analisis.** (1) Seluruh peserta yang memulai M0; (2) per-protokol, yaitu peserta dengan pre-test dan post-test instrumen wajib lengkap. Analisis tiap luaran memakai peserta yang datanya lengkap untuk luaran tersebut [CEK PROMOTOR].'),
  B('**Deviasi protokol.** Peserta yang membuka modul sebelum pre-test wajib lengkap, terutama tanpa pre-test media sosial, dicatat sebagai deviasi protokol. Jumlahnya dihitung dari REKAP-KELAYAKAN dengan kriteria `pre_inti_m0` = LENGKAP (5/5) dan kolom `yang_kurang` memuat "medsos (pre)" [PERLU DATA].'),
  B('**Data hilang per luaran.** Peserta tanpa pre-test IPAQ dikeluarkan hanya dari analisis aktivitas fisik dan tetap masuk analisis pengetahuan dan sikap bila datanya lengkap. Data hilang dilaporkan per luaran dan per kelompok, disertai perbandingan karakteristik peserta yang lengkap dan tidak lengkap [PERLU DATA].'),
  B('**Post-test media sosial** diperlakukan sebagai data tambahan yang tidak wajib sejak 22 November 2026 dan dinyatakan secara eksplisit pada bagian metode [CEK PROMOTOR].'),
  B('**Dua peserta dengan akses Minggu 2–8 lebih awal.** Dicatat sebagai deviasi protokol akibat kesalahan pengaturan aplikasi. Bila post-test M8 mereka terisi sebelum hari ke-56, data post-test tersebut dikeluarkan dari analisis per-protokol atau dilaporkan terpisah. Untuk menemukannya: REKAP-KELAYAKAN, kelompok intervensi dengan `jumlah_post` > 0, lalu bandingkan tanggal kiriman pertama dengan tanggal post-test [CEK PROMOTOR].'),
  B('**Amandemen akses materi mandiri.** Dilaporkan pada metode (perubahan protokol beserta tanggalnya) dan pada keterbatasan (laju paparan materi Minggu 1–7 berbeda antarpeserta).'),
  B('**Keterbatasan.** Gerbang M0 belum mewajibkan seluruh instrumen pre-test selama sebagian periode pengumpulan data, dan pengingat peserta belum dibakukan antarkelompok.'),

  H1('6  Prioritas Iterasi Berikutnya'),
  N('Satu definisi kelayakan untuk aplikasi web, server, dan rekap, termasuk daftar instrumen wajib dan opsional.'),
  N('Gerbang M0, M8, dan sertifikat berdasarkan status server; aplikasi menampilkan kuesioner yang masih kurang.'),
  N('Pengurangan beban M0: pemecahan sesi, penanda progres, dan contoh pengisian IPAQ, diuji pada calon pengguna.'),
  N('Kamus data tunggal dan uji otomatis pre/post untuk setiap instrumen sebelum rilis.'),
  N('Pemantauan rutin: rekap otomatis tiap jam, diagnosa mingguan, dan daftar peserta yang perlu diingatkan.'),
  N('Protokol pengingat baku yang setara untuk kontrol dan intervensi, dengan log pengiriman.'),
  N('Retensi per instrumen sebagai indikator proses pada tahap evaluasi.'),

  H1('7  Daftar Tindak Lanjut'),
  CAP('**Tabel 4** Butir yang masih perlu dilengkapi atau diputuskan'),
  table([600, 5137, 2200], ['No', 'Butir', 'Penanda'], [
    ['1', 'Retensi per kelompok (kontrol/intervensi) setelah pengecualian responden yang tidak memenuhi kriteria inklusi', '[PERLU DATA]'],
    ['2', 'Jumlah deviasi protokol M0 (lolos tanpa pre-test media sosial)', '[PERLU DATA]'],
    ['3', 'Tanggal penerapan gerbang `m0_wajib_lengkap` pada aplikasi web', '[PERLU DATA]'],
    ['4', 'Tanggal pengiriman flyer dan jumlah penerima per kelompok', '[PERLU DATA]'],
    ['5', 'Perbaikan nomor HP tidak sah berdasarkan `hp_asli`', '[PERLU DATA]'],
    ['6', 'Definisi populasi analisis (seluruh peserta vs per-protokol)', '[CEK PROMOTOR]'],
    ['7', 'Post-test media sosial sebagai data tambahan yang tidak wajib', '[CEK PROMOTOR]'],
    ['8', 'Rujukan tentang beban responden, attrition, dan keterlibatan pada intervensi gizi digital', '[CEK REFERENSI]'],
    ['9', 'Tanggal aktif amandemen akses materi mandiri (Minggu 1–7) pada platform intervensi', '[PERLU DATA]'],
    ['10', 'Identitas, tanggal akses, dan tanggal post-test dua peserta yang membuka Minggu 2–8 lebih awal', '[PERLU DATA]'],
    ['11', 'Persetujuan amandemen protokol oleh komisi pembimbing dan pelaporan ke komisi etik', '[CEK PROMOTOR]'],
    ['12', 'Perlakuan analisis bagi dua peserta deviasi (dikeluarkan dari per-protokol atau dilaporkan terpisah)', '[CEK PROMOTOR]'],
  ], { size: 20, center: [0] }),
  SRC(''),
];

const lampiran = [
  H1('Lampiran 1  Media Pengingat Peserta', true),
  P('Flyer pengingat disusun dalam dua versi dengan isi identik, hanya berbeda alamat platform dan kode QR, agar perlakuan pengingat setara antara kelompok kontrol dan intervensi. Flyer tidak memuat materi edukasi gizi agar tidak menambah paparan materi pada kelompok kontrol. Isi pesan menekankan apresiasi, kontribusi peserta, kemudahan melanjutkan dari titik terakhir, dan fleksibilitas waktu, sebagai *cues to action* (isyarat untuk bertindak) yang bersifat netral.'),
  new Paragraph({ alignment: AlignmentType.CENTER, keepNext: true, spacing: { before: 120, after: 60, line: 240, lineRule: LineRuleType.AUTO }, children: [
    new ImageRun({ type: 'jpg', data: fs.readFileSync(path.join(FLYER, 'Flyer_SHINING_kontrol.jpg')), transformation: { width: 240, height: 300 } }),
    new TextRun({ text: '      ' }),
    new ImageRun({ type: 'jpg', data: fs.readFileSync(path.join(FLYER, 'Flyer_SHINING_intervensi.jpg')), transformation: { width: 240, height: 300 } }) ] }),
  CAP('**Gambar L1** Flyer pengingat kelompok kontrol (kiri, mulai.edukasi-catin.id) dan intervensi (kanan, shining.edukasi-catin.id)'),
  H3('Teks pesan WhatsApp pendamping (identik untuk kedua kelompok)'),
  ...[
    'Halo Kak [nama],',
    'Terima kasih sudah ikut SHINING dan mengisi beberapa aktivitas! Jawaban Kakak sangat berarti untuk penelitian edukasi calon pengantin.',
    'Yuk lanjutkan sampai selesai, aktivitas yang sudah terisi tetap tersimpan.',
    '[alamat platform sesuai kelompok]',
    'Masuk pakai nomor HP yang sama ya. Ada kendala? Balas pesan ini saja.'
  ].map(t => new Paragraph({ indent: { left: 567 }, spacing: { line: 276, after: 60 }, children: runs(t, { italics: true }) })),
  P('Kriteria penerima: peserta yang telah masuk dan mengisi lebih dari dua aktivitas tetapi belum berstatus LENGKAP.', { noIndent: true }),

  H1('Lampiran 2  Riwayat Versi Apps Script', true),
  CAP('**Tabel L1** Riwayat perubahan Apps Script penerima data SHINING'),
  table([1100, 1700, 5137], ['Versi', 'Tanggal', 'Perubahan'], [
    ['v7.6', '22 Nov 2026', 'Status server mengirim `m0_wajib`, `m0_wajib_kurang`, dan `m0_wajib_lengkap` (lima instrumen inti + pre-test media sosial); nilai tahap media sosial dipetakan ke sesi 1 dan 2. Kolom lama (`m0_lengkap`) tidak diubah agar jadwal peserta berjalan tidak bergeser.'],
    ['v7.5', '22 Nov 2026', 'Tab DIAGNOSA-INSTRUMEN; rekap mengenali varian tahap post-test dan sesi 2.'],
    ['v7.4', '22 Nov 2026', 'Post-test media sosial tidak wajib untuk status LENGKAP; tetap ditampilkan sebagai data tambahan.'],
    ['v7.3', '22 Nov 2026', 'Rekap membaca kolom `tahap_program`; kolom `pre_inti_m0`; ringkasan jumlah pre-test inti M0 lengkap.'],
    ['v7.2', '25 Okt 2026', 'Tab indeks untuk pemeriksaan status yang lebih cepat.'],
    ['v7.1', '25 Okt 2026', 'Setiap tab dibaca sekali per permintaan (kinerja).'],
    ['v7', '25 Okt 2026', 'Pemisahan kelompok kontrol dan intervensi; penandaan nomor yang terdaftar di dua kelompok.'],
  ], { size: 20 }),
  SRC('Sumber: riwayat dalam berkas Code.gs dan daftar deployment Apps Script.'),
];

const footer = new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [PageNumber.CURRENT], size: 20 })] })] });

const doc = new Document({
  creator: 'Marhamah', title: 'Catatan Proses ADDIE SHINING',
  styles: {
    default: { document: { run: { font: FONT, size: 24 }, paragraph: { spacing: { line: 360, after: 120 } } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { font: FONT, size: 24, bold: true }, paragraph: { spacing: { before: 360, after: 120, line: 360 }, keepNext: true, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { font: FONT, size: 24, bold: true, italics: false }, paragraph: { spacing: { before: 240, after: 120, line: 360 }, keepNext: true, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { font: FONT, size: 24, italics: true }, paragraph: { spacing: { before: 200, after: 100, line: 360 }, keepNext: true, outlineLevel: 2 } },
    ]
  },
  numbering: { config: [
    { reference: 'bul', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 567, hanging: 283 } } } }] },
    { reference: 'num', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 567, hanging: 340 } } } }] },
  ] },
  sections: [
    { properties: { page: { size: A4P, margin: marginP } }, footers: { default: footer }, children: bagian1 },
    { properties: { page: { size: { width: A4L.width, height: A4L.height, orientation: PageOrientation.LANDSCAPE }, margin: marginL } }, footers: { default: footer }, children: bagianLog },
    { properties: { page: { size: A4P, margin: marginP } }, footers: { default: footer }, children: [...bagian2, ...lampiran] },
  ]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(path.join(D, 'Catatan_Proses_ADDIE_SHINING.docx'), buf);
  console.log('ok');
});
