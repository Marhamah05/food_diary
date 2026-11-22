/**
 * SHINING — Penerima Data Instrumen (SKRIP LENGKAP)
 * Versi 7.4 — 22 November 2026
 *
 * BERKAS INI MENGGANTIKAN SELURUH ISI Code.gs.
 * Cara pakai: buka Apps Script Sheet SHINING → klik di area kode →
 * Ctrl+A (pilih semua) → tempel seluruh isi berkas ini → Simpan (Ctrl+S).
 * v7.3–v7.4 hanya mengubah REKAP, jadi Simpan saja sudah cukup. Deploy versi baru
 * (Deploy > Manage deployments > ikon pensil > New version > Deploy) boleh
 * dilakukan, tidak wajib. URL Web App TIDAK berubah, laman tidak perlu diubah.
 *
 * Setelah tersimpan, jalankan dari menu Sheet:
 *   SHINING > Bangun rekap kelayakan
 *
 * Untuk pemasangan baru (Sheet kosong), jalankan sekali dari editor:
 *   1) pasangSetup()            — menyiapkan tab karantina & format kolom teks
 *   2) pasangKendali()          — menyiapkan tab saklar _kendali
 *   3) bangunRekapKelayakan()   — membuat REKAP-KELAYAKAN & REKAP-RINGKASAN,
 *                                 sekaligus memunculkan menu "SHINING" di Sheet
 *
 * ISI BERKAS (semua sudah di dalam, tidak perlu tambahan lain):
 *   1. Pengaturan & daftar instrumen sah (TAB_SAH, 29 instrumen)
 *   2. doPost — penerima kiriman dari laman
 *   3. doGet  — saklar pendaftaran & daftar instrumen yang sudah selesai
 *   4. Penulisan baris & karantina
 *   5. Fungsi bantu (header, normalisasi HP, penanda baris uji, dll)
 *   6. Perawatan: pasangSetup, pasangKendali, ujiCepat, periksaKunci,
 *      dan pemulih karantina (diagnosaKarantina, prosesUlangKarantina2)
 *   7. Rekap kelayakan responden (pre & post per orang)
 *
 * Riwayat singkat:
 *  - v7.4 (22 Nov): MEDSOS POST (M8) TIDAK WAJIB. Hanya rekap yang berubah.
 *    + Kelayakan 'LENGKAP' kini = 6 instrumen pre (termasuk medsos pre)
 *      + 5 instrumen post (TANPA medsos post). Kolom medsos_post tetap
 *      ditampilkan (✓/–) sebagai data tambahan, tetapi tidak dihitung di
 *      jumlah_post dan tidak muncul di 'yang_kurang'.
 *    + Diatur lewat penanda wajibPost:false di PASANGAN_INTI, jadi mudah
 *      diubah kembali bila keputusan berganti.
 *  - v7.3 (22 Nov): PERBAIKAN REKAP, penulisan data & gerbang modul TIDAK berubah.
 *    + Medsos (post) kini terbaca. Di tab medsos-literasi kolom 'tahap'
 *      disimpan sebagai 'tahap_program' (lihat ALIAS), sedangkan rekap lama
 *      hanya membaca 'tahap' -> semua kiriman medsos dianggap pre, sehingga
 *      tidak ada responden yang bisa LENGKAP. Rekap kini membaca 'tahap',
 *      lalu 'tahap_program' bila 'tahap' kosong.
 *    + Kolom baru 'pre_inti_m0' (paling kanan REKAP-KELAYAKAN): 5 instrumen
 *      inti pre-test yang dipakai server untuk menyatakan M0 lengkap
 *      (identitas, pengetahuan, sikap, FFQ, IPAQ — tanpa medsos). Menjelaskan
 *      peserta yang modulnya terbuka padahal kelayakan 'Pre belum lengkap'
 *      (biasanya hanya kurang medsos pre).
 *    + REKAP-RINGKASAN: baris 'Pre inti M0 lengkap (5 instrumen)'.
 *  - v7.2 (25 Okt): TAB INDEKS '_indeks' — cek status cukup membaca satu
 *    tab kecil (nomor × kelompok × instrumen × sesi + waktu pertama).
 *    Bangun SEKALI lewat menu SHINING > "Bangun indeks cepat". Sebelum
 *    dibangun, server memakai cara lama (hasil sama). Kiriman baru otomatis
 *    menambah indeks. Data asli tidak disentuh.
 *  - v7.1 (25 Okt): LEBIH CEPAT — tiap tab dibaca SEKALI per permintaan
 *    (bukan kolom demi kolom). Hasil sama persis dengan v7.
 *  - v7 (25 Okt): PEMISAH KELOMPOK kontrol vs intervensi.
 *    + Kiriman dari nomor HP yang sudah terdaftar di kelompok LAIN tetap
 *      disimpan, tetapi berstatus 'ganda_kelompok' (catatan_sistem:
 *      terdaftar_juga_di:<kelompok>). Data tidak pernah dibuang.
 *    + ?aksi=status kini mengirim 'terdaftar_di' (daftar kelompok nomor itu)
 *      dan menerima &kelompok=kontrol|intervensi (opsional): bila diisi,
 *      selesai/m0/pertama hanya dihitung dari baris kelompok itu, dan
 *      'kelompok_lain' diisi bila nomor itu juga ada di kelompok lain.
 *      Tanpa &kelompok hasilnya sama seperti v6 (laman lama tetap jalan).
 *    + REKAP-KELAYAKAN: satu baris per nomor PER KELOMPOK (tidak lagi
 *      tergabung), + kolom 'ganda_kelompok'; REKAP-RINGKASAN menghitungnya.
 *    + Kelompok sebuah baris: kolom 'kelompok' (intervensi) atau kode kelas
 *      berisi KONTROL (kontrol); selain itu tanpa-label.
 *  - v6 (14 Okt): HANYA BACA, penulisan data TIDAK berubah.
 *    + ?aksi=status kini juga mengirim 'pertama' (kiriman Sesi 1 paling awal)
 *      — dibaca laman kontrol supaya jeda 56 hari Sesi 2 tetap berlaku
 *      bagi peserta yang ganti HP.
 *    + ?aksi=status kini juga mengirim m0_inti, m0_awal, m0_lengkap
 *      (kapan 5 kuesioner inti pre-test lengkap) — dipakai laman intervensi
 *      untuk jadwal peserta yang ganti HP. Kolom lama (selesai, jumlah) tetap.
 *    + ?aksi=pendaftaran&kelompok=intervensi membaca baris
 *      'pendaftaran_intervensi' di _kendali (kalau ada); tanpa baris itu
 *      tetap mengikuti B2. Laman kontrol tidak berubah.
 *    + REKAP: kolom 'kelompok' (dari kolom kelompok / kode kelas KONTROL)
 *      & ringkasan per kelompok penelitian.
 *  - v5 (31 Jul): + instrumen 'sertifikat'; + rekap kelayakan responden
 *    (REKAP-KELAYAKAN & REKAP-RINGKASAN) dan menu "SHINING" di Sheet.
 *  - v4 (30 Jul): TAB_SAH 9 → 28 instrumen; hanya 'instrumen' yang wajib;
 *    'sesi'/'hp_kunci' kosong tidak lagi menahan baris; nomor HP tak sah
 *    disimpan di 'hp_asli'; + prosesUlangKarantina().
 *  - v2 (26 Jul): header ditambahkan otomatis + LockService.
 *
 * Yang TIDAK pernah berubah: URL Web App, nama tab instrumen, penulisan
 * berbasis nama header, pemaksaan kolom teks untuk nomor HP.
 */

/* ============================================================
 * 1. PENGATURAN — periksa bagian ini sebelum deploy
 * ============================================================ */

// Kosongkan kalau script terikat langsung pada Spreadsheet (Extensions > Apps Script).
// Isi dengan ID Sheet kalau script berdiri sendiri.
var ID_SPREADSHEET = '';

// Semua instrumen yang benar-benar dikirim laman intervensi dan kontrol.
// Nama harus SAMA PERSIS dengan field 'instrumen' pada kiriman.
var TAB_SAH = [
  // instrumen inti (pre & post)
  'identitas', 'pengetahuan', 'sikap-hbm',
  'kebiasaan-makan-ffq', 'aktivitas-ipaq', 'rencana-aksi',

  // persetujuan & kesediaan
  'persetujuan', 'kesediaan',

  // penilaian laman & jejak
  'kemudahan-keterbacaan', 'log-kegiatan',

  // eksplorasi & refleksi
  'medsos-literasi', 'motivasi-menikah', 'kartu-komitmen',
  'refleksi-perubahanku', 'timbangan-perubahan', 'smart-3kebiasaan',

  // kuis
  'kuis-gizi-seimbang', 'kuis-anemia-ttd',
  'kuis-aktivitas-fisik', 'kuis-perubahan-perilaku',

  // tracker & rencana
  'jurnal-suplemen', 'efikasi-aksi', 'rencana-olahraga',

  // rekap mingguan — nama dari argumen SHINING_REKAP.catat(), bukan nama berkas
  'rekap-kebiasaan-makan-harian', 'rekap-aktivitas-fisik-harian',
  'rekap-papan-bintang',

  // penutup
  'sertifikat',

  // baris uji dari alat internal
  'uji-koneksi'
];

var TAB_KARANTINA = '_PERLU_DIPERIKSA';

// Tab kendali: saklar buka/tutup pendaftaran. Diubah dari Sheet, tanpa deploy ulang.
var TAB_KENDALI = '_kendali';
var PESAN_TUTUP_BAWAAN = 'Pendaftaran Program SHINING sedang ditutup sementara karena kuota peserta sudah terpenuhi. Terima kasih atas minat Kakak/Abang. Silakan hubungi WhatsApp 0813-8172-4884 untuk informasi pembukaan berikutnya.';

// Hanya 'instrumen' yang benar-benar wajib — tanpa itu baris tak bisa
// ditempatkan. 'sesi' dan 'hp_kunci' yang kosong tidak lagi menahan baris.
var WAJIB = ['instrumen'];

// Sebagian instrumen mengirim 'tahap' (pre-test/post-test), bukan 'sesi'.
var TAHAP_KE_SESI = {
  'pre-test': '1', 'pretest': '1', 'pre test': '1', 'awal': '1', 'sesi 1': '1', '1': '1',
  'post-test': '2', 'posttest': '2', 'post test': '2', 'akhir': '2', 'sesi 2': '2', '2': '2'
};

// Kolom yang HARUS tersimpan sebagai teks, bukan angka.
var KOLOM_TEKS = ['hp_kunci', 'hp', 'no_hp', 'nomor_hp', 'whatsapp', 'nik', 'token', 'hp_asli'];

// Nama header tempat JSON mentah dititipkan, kalau kolomnya sudah ada.
var HEADER_JSON_MENTAH = ['json_mentah', 'data_json', 'json', 'payload', 'raw', 'data'];

// Penyeragaman nama kolom. Kiri = yang dikirim laman, kanan = nama header di Sheet.
var ALIAS = {
  'medsos-literasi': {
    'tahap': 'tahap_program'
  }
};

// Kolom yang selalu ditulis sistem, bukan dari laman.
var KOLOM_SISTEM = ['waktu_server', 'status', 'catatan_sistem'];


/* ============================================================
 * 2. PINTU MASUK
 * ============================================================ */

function doPost(e) {
  _TAB = {};
  var kunci = LockService.getScriptLock();
  try {
    kunci.waitLock(20000);
  } catch (err) {
    return balas({ ok: false, pesan: 'server sibuk, coba lagi' });
  }

  try {
    var mentah = (e && e.postData && e.postData.contents) ? e.postData.contents : '';

    if (!mentah) {
      return simpanKarantina('', {}, 'badan_kiriman_kosong');
    }

    var data;
    try {
      data = JSON.parse(mentah);
    } catch (err) {
      return simpanKarantina(mentah, {}, 'json_tidak_bisa_diurai');
    }

    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return simpanKarantina(mentah, {}, 'bentuk_data_bukan_objek');
    }

    // Ratakan objek bersarang jadi satu tingkat: {a:{b:1}} -> {a_b:1}
    data = ratakan(data);

    // Turunkan 'sesi' dari 'tahap' kalau laman belum mengirim 'sesi'.
    if ((data.sesi === undefined || String(data.sesi).trim() === '') && data.tahap !== undefined) {
      var t = String(data.tahap).trim().toLowerCase();
      if (TAHAP_KE_SESI[t]) data.sesi = TAHAP_KE_SESI[t];
    }

    // Kalau laman belum mengirim hp_kunci, coba ambil dari no_hp.
    if ((data.hp_kunci === undefined || String(data.hp_kunci).trim() === '') && data.no_hp) {
      data.hp_kunci = data.no_hp;
    }

    // Normalisasi nomor HP. Nomor tidak sah TIDAK lagi menahan baris —
    // aslinya disimpan di 'hp_asli' supaya bisa diperbaiki manual.
    var catatan = '';
    if (data.hp_kunci !== undefined && String(data.hp_kunci).trim() !== '') {
      var hp = normalHP(data.hp_kunci);
      if (hp === null) {
        data.hp_asli = data.hp_kunci;
        data.hp_kunci = '';
        catatan = 'nomor_hp_tidak_sah';
      } else {
        data.hp_kunci = hp;
      }
    }

    // Cek kolom wajib (kini hanya 'instrumen').
    var hilang = [];
    for (var i = 0; i < WAJIB.length; i++) {
      var k = WAJIB[i];
      if (data[k] === undefined || String(data[k]).trim() === '') hilang.push(k);
    }
    if (hilang.length) {
      return simpanKarantina(mentah, data, 'kolom_wajib_kosong:' + hilang.join(','));
    }

    // Cek instrumen dikenal. Ini satu-satunya penahan yang tersisa,
    // supaya salah tulis nama instrumen tetap terlihat.
    var instrumen = String(data.instrumen).trim();
    if (TAB_SAH.indexOf(instrumen) === -1) {
      return simpanKarantina(mentah, data, 'instrumen_tidak_dikenal:' + instrumen);
    }

    // Sesi: kosong atau tidak masuk akal dianggap Sesi 1 dan ditandai.
    var sesi = String(data.sesi === undefined ? '' : data.sesi).trim();
    if (['1', '2'].indexOf(sesi) === -1) {
      sesi = '1';
      catatan = catatan ? catatan + '; sesi_dikira_1' : 'sesi_dikira_1';
    }
    data.sesi = sesi;

    var status = tebakStatus(data);
    if (String(data.hp_kunci || '').trim() === '') {
      status = 'tanpa_kunci';
      catatan = catatan ? catatan + '; belum_ada_nomor_hp' : 'belum_ada_nomor_hp';
    } else if (status === 'sah' && sudahAda(instrumen, data.hp_kunci, sesi)) {
      status = 'kembar';
    }

    // v7: nomor yang sudah terdaftar di kelompok LAIN -> tetap disimpan,
    // tetapi ditandai supaya mudah dipilah saat analisis.
    var kMasuk = kelompokDari(data.kelompok, data.kode_kelas);
    if (kMasuk && (status === 'sah' || status === 'kembar')) {
      var lain = kelompokTerdaftar(data.hp_kunci).filter(function (g) { return g !== kMasuk; });
      if (lain.length) {
        if (status === 'kembar') catatan = catatan ? catatan + '; kembar' : 'kembar';
        status = 'ganda_kelompok';
        var tg = 'terdaftar_juga_di:' + lain.join(',');
        catatan = catatan ? catatan + '; ' + tg : tg;
      }
    }
    tulisBaris(instrumen, data, mentah, status, catatan);
    catatIndeks(String(data.hp_kunci || ''), kMasuk, instrumen, sesi, new Date(), status);

    return balas({ ok: true, instrumen: instrumen, hp_kunci: data.hp_kunci, status: status });

  } catch (err) {
    // Apa pun yang meledak, data tetap diselamatkan.
    try {
      simpanKarantina(
        (e && e.postData && e.postData.contents) || '',
        {},
        'galat_server:' + err
      );
    } catch (err2) { /* menyerah dengan tenang */ }
    return balas({ ok: false, pesan: 'galat server' });

  } finally {
    kunci.releaseLock();
  }
}


/**
 * Tanpa parameter                  -> cek kesehatan.
 * ?aksi=pendaftaran                -> saklar buka/tutup dari tab _kendali.
 * ?aksi=status&hp=...&sesi=1       -> daftar instrumen yang sudah diisi nomor itu.
 *
 * Sengaja tidak mengembalikan nama, jawaban, atau skor. Hanya nama instrumen,
 * supaya laman bisa melewati formulir yang sudah terisi.
 */
function doGet(e) {
  _TAB = {};
  var p = (e && e.parameter) || {};

  if (String(p.aksi || '') === 'pendaftaran') {
    var st = statusPendaftaran(String(p.kelompok || '').trim().toLowerCase());
    return balas({ ok: true, buka: st.buka, pesan: st.pesan });
  }

  if (String(p.aksi || '') !== 'status') {
    return balas({ ok: true, pesan: 'SHINING penerima data aktif', versi: 7 });
  }

  var hp = normalHP(p.hp);
  if (!hp) return balas({ ok: false, pesan: 'nomor tidak sah' });

  var sesi = String(p.sesi || '1').trim();
  if (['1', '2'].indexOf(sesi) === -1) sesi = '1';

  // v7: &kelompok=kontrol|intervensi (opsional). Kosong = perilaku v6.
  var mau = String(p.kelompok || '').trim().toLowerCase();
  if (mau !== 'kontrol' && mau !== 'intervensi') mau = '';

  try {
    var selesai = daftarSelesai(hp, sesi, mau);
    var m0 = infoM0(hp, mau);
    var terdaftar = kelompokTerdaftar(hp);
    return balas({
      ok           : true,
      hp_kunci     : hp,
      sesi         : sesi,
      kelompok     : mau,
      selesai      : selesai,
      jumlah       : selesai.length,
      m0_inti      : m0.inti,
      m0_awal      : m0.awal,
      m0_lengkap   : m0.lengkap,
      pertama      : m0.awal || kirimanPertama(hp, sesi, mau),
      terdaftar_di : terdaftar,
      kelompok_lain: mau ? terdaftar.filter(function (g) { return g !== mau; }) : []
    });
  } catch (err) {
    return balas({ ok: false, pesan: 'galat server' });
  }
}

/**
 * Membaca saklar pendaftaran dari tab _kendali.
 * PENTING: kalau tab/sel tidak ada atau terjadi galat, hasilnya BUKA.
 * Gagal-terbuka disengaja — lebih baik ada beberapa pendaftar lebih
 * daripada seluruh peserta terkunci karena Sheet sedang bermasalah.
 */
function statusPendaftaran(kelompok) {
  try {
    var sh = bukaSpreadsheet().getSheetByName(TAB_KENDALI);
    if (!sh) return { buka: true, pesan: '' };

    var nilai = sh.getRange('B2').getDisplayValue();
    var pesan = sh.getRange('B3').getDisplayValue();

    // v6: saklar khusus kelompok, mis. baris 'pendaftaran_intervensi'.
    // Kalau barisnya tidak ada, tetap memakai saklar umum di B2.
    if (kelompok) {
      var kolA = sh.getRange(1, 1, Math.max(sh.getLastRow(), 1), 2).getDisplayValues();
      for (var i = 0; i < kolA.length; i++) {
        var kunci = String(kolA[i][0] || '').trim().toLowerCase();
        if (kunci === 'pendaftaran_' + kelompok) nilai = kolA[i][1];
        if (kunci === 'pesan_tutup_' + kelompok && String(kolA[i][1] || '').trim()) pesan = kolA[i][1];
      }
    }
    var v = String(nilai || '').trim().toUpperCase();

    // Hanya kata TUTUP yang menutup. Sel kosong atau salah tulis = tetap buka.
    var tutup = (v === 'TUTUP');
    return {
      buka : !tutup,
      pesan: tutup ? (String(pesan || '').trim() || PESAN_TUTUP_BAWAAN) : ''
    };
  } catch (err) {
    return { buka: true, pesan: '' };
  }
}

/**
 * Jalankan SEKALI dari editor Apps Script untuk membuat tab _kendali.
 * Aman dijalankan berulang: kalau tab sudah ada, isinya tidak ditimpa.
 */
function pasangKendali() {
  var ss = bukaSpreadsheet();
  if (ss.getSheetByName(TAB_KENDALI)) {
    return 'Tab ' + TAB_KENDALI + ' sudah ada — tidak diubah. Status sekarang: ' +
           (statusPendaftaran().buka ? 'BUKA' : 'TUTUP');
  }

  var sh = ss.insertSheet(TAB_KENDALI);
  sh.getRange('A1:C1').setValues([['kunci', 'nilai', 'keterangan']]);
  sh.getRange('A2:C2').setValues([[
    'pendaftaran', 'BUKA',
    'Tulis BUKA atau TUTUP di sel B2. Hanya kata TUTUP yang menutup pendaftaran. Berlaku langsung, tanpa deploy ulang.'
  ]]);
  sh.getRange('A3:C3').setValues([[
    'pesan_tutup', PESAN_TUTUP_BAWAAN,
    'Kalimat yang dibaca calon peserta saat pendaftaran ditutup. Boleh diubah kapan saja.'
  ]]);
  sh.getRange('A4:C4').setValues([[
    'catatan', '',
    'Catatan bebas untuk kk sendiri, misalnya tanggal tutup dan alasannya. Tidak dibaca sistem.'
  ]]);

  sh.setFrozenRows(1);
  sh.setColumnWidth(1, 130);
  sh.setColumnWidth(2, 380);
  sh.setColumnWidth(3, 460);
  sh.getRange('A1:C1').setFontWeight('bold');
  sh.getRange('B2').setFontWeight('bold').setHorizontalAlignment('center');
  sh.getRange('A1:C4').setWrap(true).setVerticalAlignment('top');

  return 'Tab ' + TAB_KENDALI + ' dibuat. Status awal: BUKA. Ubah sel B2 jadi TUTUP untuk menutup pendaftaran.';
}

/**
 * v6 — Kapan peserta melengkapi kuesioner inti pre-test (M0)?
 * Hanya membaca. Dipakai laman intervensi untuk jadwal minggu peserta
 * yang ganti HP / peramban.
 *   inti    : berapa dari 5 instrumen inti yang sudah ada (sesi 1)
 *   awal    : waktu kiriman inti pre-test paling awal (ISO)
 *   lengkap : waktu saat ke-5 instrumen inti lengkap (ISO), '' bila belum
 */
var INTI_M0 = ['identitas', 'pengetahuan', 'sikap-hbm', 'kebiasaan-makan-ffq', 'aktivitas-ipaq'];

function infoM0(hp, mau) {
  if (indeksSiap()) {
    var ix = indeksHp(hp), a0 = null, l0 = null, n0 = 0;
    for (var q = 0; q < INTI_M0.length; q++) {
      var cocok = ix.filter(function (x) { return x.instrumen === INTI_M0[q] && (x.sesi === '1' || x.sesi === '') &&
                                                   (!mau || cocokKelompok(x.kelompok, mau)); });
      if (!cocok.length) continue;
      n0++;
      var p0 = null;
      cocok.forEach(function (x) { if (x.pertama && (!p0 || x.pertama < p0)) p0 = x.pertama; });
      if (p0) { if (!a0 || p0 < a0) a0 = p0; if (!l0 || p0 > l0) l0 = p0; }
    }
    return { inti: n0, awal: a0 ? a0.toISOString() : '',
             lengkap: (n0 === INTI_M0.length && l0) ? l0.toISOString() : '' };
  }
  var ss = bukaSpreadsheet();
  var awal = null, lengkap = null, inti = 0;

  for (var i = 0; i < INTI_M0.length; i++) {
    var sh = ss.getSheetByName(INTI_M0[i]);
    if (!sh || sh.getLastRow() < 2) continue;
    var header = ambilHeader(sh);
    var kHp = header.indexOf('hp_kunci');
    if (kHp === -1) continue;
    var kSesi = header.indexOf('sesi');
    var kWaktu = header.indexOf('waktu_server');
    if (kWaktu === -1) kWaktu = header.indexOf('created_at');

    var n = sh.getLastRow() - 1;
    var kolHp = kolTab(sh, kHp, n);
    var kolSesi = (kSesi === -1) ? null : kolTab(sh, kSesi, n);
    var kolWaktu = (kWaktu === -1) ? null : kolTab(sh, kWaktu, n);
    var kolKel = mau ? kolomNama(sh, header, 'kelompok', n) : null;
    var kolKode = mau ? kolomNama(sh, header, 'kode_kelas', n) : null;

    var pertamaDiTab = null, ada = false;
    for (var r = 0; r < n; r++) {
      if (String(kolHp[r][0]).trim() !== hp) continue;
      if (kolSesi && String(kolSesi[r][0]).trim() !== '1') continue;
      if (mau && !cocokKelompok(kelompokBaris(kolKel, kolKode, r), mau)) continue;
      ada = true;
      var w = kolWaktu ? keTanggal(kolWaktu[r][0]) : null;
      if (w && (!pertamaDiTab || w < pertamaDiTab)) pertamaDiTab = w;
    }
    if (!ada) continue;
    inti++;
    if (pertamaDiTab) {
      if (!awal || pertamaDiTab < awal) awal = pertamaDiTab;
      if (!lengkap || pertamaDiTab > lengkap) lengkap = pertamaDiTab;
    }
  }
  return {
    inti   : inti,
    awal   : awal ? awal.toISOString() : '',
    lengkap: (inti === INTI_M0.length && lengkap) ? lengkap.toISOString() : ''
  };
}

/** v6 — waktu kiriman paling awal (tab mana pun) untuk nomor & sesi ini. */
function kirimanPertama(hp, sesi, mau) {
  if (indeksSiap()) {
    var a1 = null;
    indeksHp(hp).forEach(function (x) {
      if ((x.sesi !== sesi && x.sesi !== '') || (mau && !cocokKelompok(x.kelompok, mau))) return;
      if (x.pertama && (!a1 || x.pertama < a1)) a1 = x.pertama;
    });
    return a1 ? a1.toISOString() : '';
  }
  var ss = bukaSpreadsheet(), awal = null;
  for (var i = 0; i < TAB_SAH.length; i++) {
    var sh = ss.getSheetByName(TAB_SAH[i]);
    if (!sh || sh.getLastRow() < 2) continue;
    var header = ambilHeader(sh);
    var kHp = header.indexOf('hp_kunci');
    var kWaktu = header.indexOf('waktu_server');
    if (kHp === -1 || kWaktu === -1) continue;
    var kSesi = header.indexOf('sesi');
    var n = sh.getLastRow() - 1;
    var kolHp = kolTab(sh, kHp, n);
    var kolSesi = (kSesi === -1) ? null : kolTab(sh, kSesi, n);
    var kolWaktu = kolTab(sh, kWaktu, n);
    var kolKel = mau ? kolomNama(sh, header, 'kelompok', n) : null;
    var kolKode = mau ? kolomNama(sh, header, 'kode_kelas', n) : null;
    for (var r = 0; r < n; r++) {
      if (String(kolHp[r][0]).trim() !== hp) continue;
      if (kolSesi && String(kolSesi[r][0]).trim() !== sesi) continue;
      if (mau && !cocokKelompok(kelompokBaris(kolKel, kolKode, r), mau)) continue;
      var w = keTanggal(kolWaktu[r][0]);
      if (w && (!awal || w < awal)) awal = w;
    }
  }
  return awal ? awal.toISOString() : '';
}

function keTanggal(v) {
  if (v instanceof Date) return isNaN(v.getTime()) ? null : v;
  var s = String(v || '').trim();
  if (!s) return null;
  var d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
}

/** Instrumen mana saja yang sudah punya baris untuk nomor dan sesi ini. */
function daftarSelesai(hp, sesi, mau) {
  if (indeksSiap()) {
    var ada = {};
    indeksHp(hp).forEach(function (x) {
      if ((x.sesi !== sesi && x.sesi !== '') || (mau && !cocokKelompok(x.kelompok, mau))) return;
      ada[x.instrumen] = true;
    });
    return TAB_SAH.filter(function (t) { return ada[t]; });
  }
  var ss = bukaSpreadsheet();
  var selesai = [];

  for (var i = 0; i < TAB_SAH.length; i++) {
    var namaTab = TAB_SAH[i];
    var sh = ss.getSheetByName(namaTab);
    if (!sh || sh.getLastRow() < 2) continue;

    var header = ambilHeader(sh);
    var kHp = header.indexOf('hp_kunci');
    if (kHp === -1) continue;
    var kSesi = header.indexOf('sesi');

    var n = sh.getLastRow() - 1;
    var kolHp = kolTab(sh, kHp, n);
    var kolSesi = (kSesi === -1) ? null : kolTab(sh, kSesi, n);
    var kolKel = mau ? kolomNama(sh, header, 'kelompok', n) : null;
    var kolKode = mau ? kolomNama(sh, header, 'kode_kelas', n) : null;

    for (var r = 0; r < n; r++) {
      if (String(kolHp[r][0]).trim() !== hp) continue;
      if (kolSesi && String(kolSesi[r][0]).trim() !== sesi) continue;
      if (mau && !cocokKelompok(kelompokBaris(kolKel, kolKode, r), mau)) continue;
      selesai.push(namaTab);
      break;
    }
  }
  return selesai;
}



/* ------------------------------------------------------------
 * v7 — KELOMPOK PENELITIAN
 * ------------------------------------------------------------ */

// Tab yang menandai seseorang sudah 'masuk' ke sebuah kelompok.
var TAB_TANDA_DAFTAR = ['persetujuan', 'kesediaan', 'identitas', 'pengetahuan',
                        'sikap-hbm', 'kebiasaan-makan-ffq', 'aktivitas-ipaq'];

/** 'kontrol' | 'intervensi' | '' (tanpa label, mis. uji coba lama). */
function kelompokDari(kelompok, kodeKelas) {
  var k = String(kelompok || '').trim().toLowerCase();
  if (k === 'intervensi' || k === 'kontrol') return k;
  if (/KONTROL/i.test(String(kodeKelas || ''))) return 'kontrol';
  return '';
}

/** Apakah baris berkelompok 'kb' boleh dihitung untuk permintaan kelompok 'mau'? */
function cocokKelompok(kb, mau) {
  if (!mau) return true;                       // tanpa filter = perilaku v6
  if (mau === 'kontrol') return kb === 'kontrol';
  return kb !== 'kontrol';                     // intervensi (+ baris tanpa label)
}

/** Ambil satu kolom (berdasar nama header) sebagai array nilai, atau null. */
function kolomNama(sh, header, nama, n) {
  var i = header.indexOf(nama);
  return i === -1 ? null : kolTab(sh, i, n);
}

/** Kelompok baris ke-r dari kolom kelompok & kode_kelas yang sudah dibaca. */
function kelompokBaris(kolKel, kolKode, r) {
  return kelompokDari(kolKel ? kolKel[r][0] : '', kolKode ? kolKode[r][0] : '');
}

/** Di kelompok mana saja nomor ini sudah punya baris? -> ['kontrol', ...] */
function kelompokTerdaftar(hp) {
  if (indeksSiap()) {
    var a2 = {};
    indeksHp(hp).forEach(function (x) {
      if (x.status === 'uji' || !x.kelompok) return;
      if (TAB_TANDA_DAFTAR.indexOf(x.instrumen) === -1) return;
      a2[x.kelompok] = true;
    });
    return Object.keys(a2).sort();
  }
  var ss = bukaSpreadsheet(), ada = {};
  for (var i = 0; i < TAB_TANDA_DAFTAR.length; i++) {
    var sh = ss.getSheetByName(TAB_TANDA_DAFTAR[i]);
    if (!sh || sh.getLastRow() < 2) continue;
    var header = ambilHeader(sh);
    var n = sh.getLastRow() - 1;
    var kolHp = kolomNama(sh, header, 'hp_kunci', n);
    if (!kolHp) continue;
    var kolKel = kolomNama(sh, header, 'kelompok', n);
    var kolKode = kolomNama(sh, header, 'kode_kelas', n);
    var kolSt = kolomNama(sh, header, 'status', n);
    for (var r = 0; r < n; r++) {
      if (String(kolHp[r][0]).trim() !== hp) continue;
      if (kolSt && String(kolSt[r][0]).trim() === 'uji') continue;
      var kb = kelompokBaris(kolKel, kolKode, r);
      if (kb) ada[kb] = true;
    }
  }
  return Object.keys(ada).sort();
}


/* ------------------------------------------------------------
 * v7.2 — TAB INDEKS untuk cek status cepat
 * ------------------------------------------------------------ */
var TAB_INDEKS = '_indeks';
var JUDUL_INDEKS = ['hp_kunci', 'kelompok', 'instrumen', 'sesi', 'pertama', 'status'];

function indeksSiap() {
  try { return PropertiesService.getScriptProperties().getProperty('INDEKS_SIAP') === '1'; }
  catch (err) { return false; }
}

/** Baris indeks untuk satu nomor: [{kelompok, instrumen, sesi, pertama(Date|null), status}] */
function indeksHp(hp) {
  var sh = bukaSpreadsheet().getSheetByName(TAB_INDEKS);
  if (!sh || sh.getLastRow() < 2) return [];
  var v = isiTab(sh), out = [];
  for (var r = 1; r < v.length; r++) {
    if (String(v[r][0]).trim() !== hp) continue;
    out.push({ kelompok: String(v[r][1] || '').trim(), instrumen: String(v[r][2] || '').trim(),
               sesi: String(v[r][3] || '').trim(), pertama: keTanggal(v[r][4]),
               status: String(v[r][5] || '').trim() });
  }
  return out;
}

/** Tambahkan satu kombinasi ke indeks bila belum ada (dipanggil doPost). */
function catatIndeks(hp, kel, instrumen, sesi, waktu, status) {
  if (!hp || !indeksSiap()) return;
  try {
    var ada = indeksHp(hp).some(function (x) {
      return x.kelompok === kel && x.instrumen === instrumen && x.sesi === sesi &&
             (x.status === 'uji') === (status === 'uji');
    });
    if (ada) return;
    var sh = bukaSpreadsheet().getSheetByName(TAB_INDEKS);
    if (!sh) return;
    sh.appendRow([hp, kel, instrumen, sesi, waktu, status]);
    lupakanTab(TAB_INDEKS);
  } catch (err) { /* indeks gagal tidak boleh menggagalkan kiriman */ }
}

/**
 * Bangun ulang indeks dari SELURUH data (jalankan sekali dari menu SHINING,
 * atau kapan saja indeks diragukan). Membaca semua tab, menulis _indeks,
 * lalu menyalakan mode cepat. Kiriman yang masuk selama proses ikut digabung.
 */
function bangunIndeks() {
  var ss = bukaSpreadsheet(), peta = {};
  function simpan(hp, kel, ins, sesi, w, st) {
    var uji = (st === 'uji') ? 'uji' : '';
    var k = [hp, kel, ins, sesi, uji].join('|');
    var x = peta[k];
    if (!x) peta[k] = x = [hp, kel, ins, sesi, w, uji ? 'uji' : st];
    else if (w && (!x[4] || w < x[4])) x[4] = w;
  }
  for (var i = 0; i < TAB_SAH.length; i++) {
    var sh = ss.getSheetByName(TAB_SAH[i]);
    if (!sh || sh.getLastRow() < 2) continue;
    var v = sh.getDataRange().getValues();
    var h = v[0].map(function (x) { return String(x).trim(); });
    var kHp = h.indexOf('hp_kunci'); if (kHp === -1) continue;
    var kS = h.indexOf('sesi'), kKel = h.indexOf('kelompok'), kKode = h.indexOf('kode_kelas'),
        kW = h.indexOf('waktu_server'), kC = h.indexOf('created_at'), kSt = h.indexOf('status');
    for (var r = 1; r < v.length; r++) {
      var hp = String(v[r][kHp]).trim(); if (!hp) continue;
      var sesi = kS === -1 ? '' : String(v[r][kS]).trim();
      var kel = kelompokDari(kKel === -1 ? '' : v[r][kKel], kKode === -1 ? '' : v[r][kKode]);
      var w = (kW !== -1 ? keTanggal(v[r][kW]) : null) || (kC !== -1 ? keTanggal(v[r][kC]) : null);
      simpan(hp, kel, TAB_SAH[i], sesi, w, kSt === -1 ? '' : String(v[r][kSt]).trim());
    }
  }
  var kunci = LockService.getScriptLock();
  kunci.waitLock(30000);
  try {
    var ix = ss.getSheetByName(TAB_INDEKS) || ss.insertSheet(TAB_INDEKS);
    // gabungkan baris yang ditambahkan kiriman selama pembangunan
    if (ix.getLastRow() >= 2) {
      var lama = ix.getRange(2, 1, ix.getLastRow() - 1, JUDUL_INDEKS.length).getValues();
      lama.forEach(function (b) { simpan(String(b[0]).trim(), String(b[1]).trim(), String(b[2]).trim(),
                                         String(b[3]).trim(), keTanggal(b[4]), String(b[5]).trim()); });
    }
    var baris = Object.keys(peta).map(function (k) { return peta[k]; });
    ix.clear();
    ix.getRange(1, 1, 1, JUDUL_INDEKS.length).setValues([JUDUL_INDEKS]);
    ix.getRange(1, 1, ix.getMaxRows(), 1).setNumberFormat('@');
    if (baris.length) ix.getRange(2, 1, baris.length, JUDUL_INDEKS.length).setValues(baris);
    ix.setFrozenRows(1);
    PropertiesService.getScriptProperties().setProperty('INDEKS_SIAP', '1');
  } finally { kunci.releaseLock(); }
  var lapor = 'Indeks dibangun: ' + Object.keys(peta).length + ' baris. Cek status kini memakai mode cepat.';
  Logger.log(lapor);
  try { SpreadsheetApp.getUi().alert(lapor); } catch (e) {}
  return lapor;
}

/** Matikan mode cepat (kembali ke cara lama). Indeks tidak dihapus. */
function matikanIndeks() {
  PropertiesService.getScriptProperties().deleteProperty('INDEKS_SIAP');
  return 'Mode cepat dimatikan.';
}

/* ============================================================
 * 3. PENULISAN
 * ============================================================ */

function tulisBaris(namaTab, data, mentah, status, catatan) {
  var ss = bukaSpreadsheet();
  var sh = ss.getSheetByName(namaTab);
  if (!sh) sh = ss.insertSheet(namaTab);

  // Terapkan alias khusus tab ini.
  var peta = ALIAS[namaTab] || {};
  var isi = {};
  for (var k in data) {
    if (!data.hasOwnProperty(k)) continue;
    isi[peta[k] || k] = data[k];
  }

  isi.waktu_server = new Date();
  isi.status = status;
  if (catatan) isi.catatan_sistem = catatan;

  var header = ambilHeader(sh);

  // Titipkan JSON mentah ke kolom yang sudah ada, kalau ketemu.
  var kolomJson = cariKolomJson(header);
  if (kolomJson) {
    isi[kolomJson] = mentah;
  } else {
    isi.json_mentah = mentah;
  }

  // Tambahkan header baru untuk kolom yang belum ada — selalu di ujung kanan.
  var baru = [];
  for (var nama in isi) {
    if (!isi.hasOwnProperty(nama)) continue;
    if (header.indexOf(nama) === -1) baru.push(nama);
  }
  if (baru.length) {
    sh.getRange(1, header.length + 1, 1, baru.length).setValues([baru]);
    header = header.concat(baru);
    lupakanTab(namaTab);
  }

  // Susun baris mengikuti urutan header.
  var baris = [];
  for (var c = 0; c < header.length; c++) {
    var nm = String(header[c]);
    var v = isi[nm];
    baris.push(v === undefined ? '' : v);
  }

  var nomorBaris = sh.getLastRow() + 1;
  sh.getRange(nomorBaris, 1, 1, baris.length).setValues([baris]);
  lupakanTab(namaTab);

  // Paksa kolom teks tetap teks. Dilakukan setelah tulis, per sel.
  for (var c2 = 0; c2 < header.length; c2++) {
    if (KOLOM_TEKS.indexOf(String(header[c2])) === -1) continue;
    var sel = sh.getRange(nomorBaris, c2 + 1);
    sel.setNumberFormat('@');
    var nilai = isi[String(header[c2])];
    if (nilai !== undefined && nilai !== '') sel.setValue(String(nilai));
  }

  return nomorBaris;
}


function simpanKarantina(mentah, data, alasan) {
  try {
    var ss = bukaSpreadsheet();
    var sh = ss.getSheetByName(TAB_KARANTINA);
    if (!sh) {
      sh = ss.insertSheet(TAB_KARANTINA);
      sh.getRange(1, 1, 1, 6).setValues([[
        'waktu_server', 'alasan', 'instrumen_diminta', 'hp_kunci_diminta', 'sesi_diminta', 'json_mentah'
      ]]);
      sh.setFrozenRows(1);
    }
    sh.appendRow([
      new Date(),
      alasan,
      (data && data.instrumen) || '',
      (data && data.hp_kunci) || '',
      (data && data.sesi) || '',
      mentah
    ]);
  } catch (err) { /* jangan sampai karantina ikut meledak */ }

  return balas({ ok: false, pesan: 'kiriman ditahan untuk diperiksa', alasan: alasan });
}


/* ============================================================
 * 4. ALAT BANTU
 * ============================================================ */

function bukaSpreadsheet() {
  return ID_SPREADSHEET
    ? SpreadsheetApp.openById(ID_SPREADSHEET)
    : SpreadsheetApp.getActiveSpreadsheet();
}


/* v7.1 — baca tiap tab SEKALI per permintaan, lalu ambil kolomnya dari memori. */
var _TAB = {};
function isiTab(sh) {
  var k = sh.getName();
  if (!_TAB[k]) _TAB[k] = (sh.getLastRow() < 1 || sh.getLastColumn() < 1) ? [] : sh.getDataRange().getValues();
  return _TAB[k];
}
function kolTab(sh, i, n) {
  var v = isiTab(sh), o = [];
  for (var r = 1; r <= n; r++) o.push([(v[r] && v[r][i] !== undefined) ? v[r][i] : '']);
  return o;
}
function lupakanTab(nama) { delete _TAB[nama]; }

function ambilHeader(sh) {
  var v = isiTab(sh);
  if (!v.length) return [];
  return v[0].map(function (x) { return String(x).trim(); });
}

function cariKolomJson(header) {
  for (var i = 0; i < header.length; i++) {
    if (HEADER_JSON_MENTAH.indexOf(String(header[i]).toLowerCase()) !== -1) {
      return header[i];
    }
  }
  return null;
}

/** Ratakan objek bersarang jadi satu tingkat. Array digabung dengan " | ". */
function ratakan(obj, awalan, hasil) {
  hasil = hasil || {};
  awalan = awalan || '';
  for (var k in obj) {
    if (!obj.hasOwnProperty(k)) continue;
    var nama = awalan ? awalan + '_' + k : k;
    var v = obj[k];
    if (v === null || v === undefined) {
      hasil[nama] = '';
    } else if (Array.isArray(v)) {
      hasil[nama] = v.join(' | ');
    } else if (typeof v === 'object' && !(v instanceof Date)) {
      // Tetap tulis bentuk teksnya di kolom induk supaya rumus REGEXEXTRACT
      // yang lama tidak mati, lalu ratakan juga jadi kolom-kolom terpisah.
      hasil[nama] = JSON.stringify(v);
      ratakan(v, nama, hasil);
    } else {
      hasil[nama] = v;
    }
  }
  return hasil;
}

/** Tandai baris uji supaya tidak ikut dianalisis. Tidak pernah menghapus. */
function tebakStatus(data) {
  if (String(data.mode || '').toLowerCase() === 'uji') return 'uji';
  var gabung = [
    data.nama, data.nama_lengkap, data.kode_kelas, data.asal_pendaftaran
  ].join(' ').toLowerCase();
  if (/(test|tes\b|uji|coba|dummy|contoh|gmini|sakura)/.test(gabung)) return 'uji';
  return 'sah';
}

/**
 * Apakah orang yang sama sudah mengisi instrumen yang sama di sesi yang sama?
 * Kalau ya, baris tetap disimpan tapi ditandai 'kembar' — jangan pernah dibuang,
 * karena kiriman kedua kadang justru yang lebih lengkap.
 */
function sudahAda(namaTab, hp, sesi) {
  try {
    if (indeksSiap()) {
      return indeksHp(String(hp)).some(function (x) { return x.instrumen === namaTab && (x.sesi === String(sesi) || x.sesi === ''); });
    }
    var sh = bukaSpreadsheet().getSheetByName(namaTab);
    if (!sh || sh.getLastRow() < 2) return false;
    var header = ambilHeader(sh);
    var kHp = header.indexOf('hp_kunci');
    var kSesi = header.indexOf('sesi');
    if (kHp === -1) return false;
    var n = sh.getLastRow() - 1;
    var kolHp = kolTab(sh, kHp, n);
    var kolSesi = (kSesi === -1) ? null : kolTab(sh, kSesi, n);
    for (var r = 0; r < n; r++) {
      if (String(kolHp[r][0]).trim() !== String(hp)) continue;
      if (!kolSesi || String(kolSesi[r][0]).trim() === String(sesi)) return true;
    }
    return false;
  } catch (err) {
    return false;
  }
}

/** Normalisasi nomor HP. null = tidak sah (baris tetap disimpan, ditandai). */
function normalHP(input) {
  var d = String(input || '').replace(/\D/g, '');
  while (d.indexOf('6262') === 0) d = d.slice(2);
  if (d.charAt(0) === '0') d = '62' + d.slice(1);
  else if (d.charAt(0) === '8') d = '62' + d;
  else if (d.indexOf('62') !== 0) return null;
  return /^628\d{7,11}$/.test(d) ? d : null;
}

function balas(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}


/* ============================================================
 * 5. PERAWATAN — jalankan manual dari editor, bukan lewat web
 * ============================================================ */

/**
 * Memasukkan ulang baris yang tertahan di _PERLU_DIPERIKSA.
 * Jalankan MANUAL dari editor, setelah skrip ini di-deploy.
 * Aman diulang: baris yang sudah diproses ditandai dan dilewati.
 */
function prosesUlangKarantina() {
  var ss = bukaSpreadsheet();
  var sh = ss.getSheetByName(TAB_KARANTINA);
  if (!sh || sh.getLastRow() < 2) return 'Tab karantina kosong, tidak ada yang perlu dipulihkan.';

  var header = ambilHeader(sh);
  var kJson = header.indexOf('json_mentah');
  if (kJson === -1) return 'Kolom json_mentah tidak ditemukan di tab karantina.';

  var kTanda = header.indexOf('diproses_ulang');
  if (kTanda === -1) {
    sh.getRange(1, header.length + 1).setValue('diproses_ulang');
    kTanda = header.length;
    header = header.concat(['diproses_ulang']);
  }

  // Potret jumlah baris SEBELUM proses, supaya baris baru yang muncul
  // selama proses tidak ikut diperiksa di putaran yang sama.
  var n = sh.getLastRow() - 1;
  var isi = sh.getRange(2, 1, n, header.length).getValues();

  var berhasil = 0, gagal = 0, dilewati = 0;
  var waktu = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'd MMM yyyy HH:mm');

  for (var r = 0; r < n; r++) {
    if (String(isi[r][kTanda]).trim() !== '') { dilewati++; continue; }

    var mentah = String(isi[r][kJson] || '').trim();
    if (!mentah) {
      sh.getRange(r + 2, kTanda + 1).setValue('dilewati: tidak ada json_mentah');
      dilewati++;
      continue;
    }

    var hasil;
    try {
      hasil = JSON.parse(doPost({ postData: { contents: mentah } }).getContent());
    } catch (err) {
      hasil = { ok: false, pesan: String(err) };
    }

    if (hasil && hasil.ok) {
      sh.getRange(r + 2, kTanda + 1)
        .setValue('masuk ke ' + hasil.instrumen + ' [' + hasil.status + '] — ' + waktu);
      berhasil++;
    } else {
      sh.getRange(r + 2, kTanda + 1)
        .setValue('masih ditolak: ' + ((hasil && (hasil.alasan || hasil.pesan)) || 'sebab tidak diketahui'));
      gagal++;
    }
  }

  var lapor = 'Diperiksa ' + n + ' baris -> ' + berhasil + ' dipindahkan, ' +
              gagal + ' masih ditolak, ' + dilewati + ' dilewati.';
  Logger.log(lapor);
  return lapor;
}

/** Jalankan sekali setelah pasang. Menyiapkan karantina + format teks + kolom sesi. */
function pasangSetup() {
  var ss = bukaSpreadsheet();

  if (!ss.getSheetByName(TAB_KARANTINA)) {
    var q = ss.insertSheet(TAB_KARANTINA);
    q.getRange(1, 1, 1, 6).setValues([[
      'waktu_server', 'alasan', 'instrumen_diminta', 'hp_kunci_diminta', 'sesi_diminta', 'json_mentah'
    ]]);
    q.setFrozenRows(1);
  }

  var laporan = [];
  for (var i = 0; i < TAB_SAH.length; i++) {
    var sh = ss.getSheetByName(TAB_SAH[i]);
    if (!sh) { laporan.push(TAB_SAH[i] + ' : belum ada (dibuat saat kiriman pertama)'); continue; }

    var header = ambilHeader(sh);
    var tambah = [];
    if (header.indexOf('sesi') === -1) tambah.push('sesi');
    if (header.indexOf('status') === -1) tambah.push('status');
    if (header.indexOf('waktu_server') === -1) tambah.push('waktu_server');
    if (tambah.length) {
      sh.getRange(1, header.length + 1, 1, tambah.length).setValues([tambah]);
      header = header.concat(tambah);
    }

    // Format kolom teks untuk seluruh kolom, termasuk baris yang akan datang.
    for (var c = 0; c < header.length; c++) {
      if (KOLOM_TEKS.indexOf(header[c]) !== -1) {
        sh.getRange(1, c + 1, sh.getMaxRows(), 1).setNumberFormat('@');
      }
    }

    laporan.push(TAB_SAH[i] + ' : ' + (tambah.length ? 'tambah ' + tambah.join(',') : 'sudah lengkap'));
  }

  Logger.log(laporan.join('\n'));
  return laporan.join('\n');
}

/** Uji tanpa perlu laman. Jalankan dari editor, lalu periksa Sheet. */
function ujiCepat() {
  var contoh = {
    instrumen : 'identitas',
    hp_kunci  : '081381724884',
    sesi      : '1',
    nama      : 'Test Uji Sistem',
    asal_pilih: 'bppkb',
    asal_link : 'bppkb',
    usia      : 24
  };
  var hasil = doPost({ postData: { contents: JSON.stringify(contoh) } });
  Logger.log(hasil.getContent());
}

/** Laporan cepat: berapa baris per tab yang belum punya hp_kunci. */
function periksaKunci() {
  var ss = bukaSpreadsheet();
  var out = [];
  for (var i = 0; i < TAB_SAH.length; i++) {
    var sh = ss.getSheetByName(TAB_SAH[i]);
    if (!sh || sh.getLastRow() < 2) continue;
    var header = ambilHeader(sh);
    var kol = header.indexOf('hp_kunci');
    if (kol === -1) { out.push(TAB_SAH[i] + ' : kolom hp_kunci belum ada'); continue; }
    var nilai = sh.getRange(2, kol + 1, sh.getLastRow() - 1, 1).getValues();
    var kosong = 0;
    for (var r = 0; r < nilai.length; r++) {
      if (String(nilai[r][0]).trim() === '') kosong++;
    }
    out.push(TAB_SAH[i] + ' : ' + kosong + ' dari ' + nilai.length + ' baris tanpa kunci');
  }
  Logger.log(out.join('\n'));
  return out.join('\n');
}


/* ------------------------------------------------------------
 * Pemulih karantina versi 2 — memindai SELURUH sel per baris untuk
 * menemukan JSON, jadi tidak bergantung pada nama kolom.
 * Jalankan manual dari editor: diagnosaKarantina() dulu (hanya membaca),
 * lalu prosesUlangKarantina2() bila laporannya wajar.
 * ------------------------------------------------------------ */

/**
 * Membaca isi tab karantina dan melaporkan apa yang sebenarnya ada di sana.
 * Tidak mengubah apa pun. Jalankan ini dulu.
 */
function diagnosaKarantina() {
  var sh = bukaSpreadsheet().getSheetByName(TAB_KARANTINA);
  if (!sh) return 'Tab ' + TAB_KARANTINA + ' tidak ada.';

  var header = ambilHeader(sh);
  var n = sh.getLastRow() - 1;
  var lapor = [];
  lapor.push('Tab: ' + TAB_KARANTINA);
  lapor.push('Jumlah baris isi: ' + n);
  lapor.push('Jumlah kolom: ' + header.length);
  lapor.push('Nama kolom: ' + header.join(' | '));

  if (n < 1) { Logger.log(lapor.join('\n')); return lapor.join('\n'); }

  var isi = sh.getRange(2, 1, n, header.length).getValues();
  var ketemu = 0, kosong = 0;

  for (var r = 0; r < n; r++) {
    var j = petikJson(isi[r]);
    if (j) {
      ketemu++;
      if (ketemu <= 5) {
        var d = null;
        try { d = JSON.parse(j); } catch (err) { d = null; }
        lapor.push('  baris ' + (r + 2) + ' : kolom ke-' + (j.__kol + 1) +
                   ' , instrumen=' + ((d && d.instrumen) || '(tidak ada)') +
                   ' , panjang=' + j.length);
      }
    } else {
      kosong++;
      if (kosong <= 5) {
        lapor.push('  baris ' + (r + 2) + ' : TIDAK ADA JSON di sel mana pun');
      }
    }
  }

  lapor.push('Ringkas: ' + ketemu + ' baris punya JSON, ' + kosong + ' baris tidak.');
  Logger.log(lapor.join('\n'));
  return lapor.join('\n');
}


/**
 * Memasukkan ulang baris karantina ke tab instrumennya.
 * Aman diulang: baris yang sudah berhasil ("masuk ke ...") dilewati,
 * tapi baris bertanda "dilewati" atau "masih ditolak" DICOBA LAGI.
 */
function prosesUlangKarantina2() {
  var ss = bukaSpreadsheet();
  var sh = ss.getSheetByName(TAB_KARANTINA);
  if (!sh || sh.getLastRow() < 2) return 'Tab karantina kosong.';

  var header = ambilHeader(sh);

  var kTanda = header.indexOf('diproses_ulang');
  if (kTanda === -1) {
    sh.getRange(1, header.length + 1).setValue('diproses_ulang');
    kTanda = header.length;
    header = header.concat(['diproses_ulang']);
  }

  var n = sh.getLastRow() - 1;
  var isi = sh.getRange(2, 1, n, header.length).getValues();

  var berhasil = 0, gagal = 0, tanpaJson = 0, sudah = 0;
  var waktu = Utilities.formatDate(new Date(), 'Asia/Jakarta', 'd MMM yyyy HH:mm');

  for (var r = 0; r < n; r++) {
    // Hanya baris yang sudah BERHASIL yang dilewati.
    if (String(isi[r][kTanda]).indexOf('masuk ke ') === 0) { sudah++; continue; }

    var mentah = petikJson(isi[r]);
    if (!mentah) {
      sh.getRange(r + 2, kTanda + 1).setValue('tidak ada JSON di baris ini');
      tanpaJson++;
      continue;
    }

    var hasil;
    try {
      hasil = JSON.parse(doPost({ postData: { contents: mentah } }).getContent());
    } catch (err) {
      hasil = { ok: false, pesan: String(err) };
    }

    if (hasil && hasil.ok) {
      sh.getRange(r + 2, kTanda + 1)
        .setValue('masuk ke ' + hasil.instrumen + ' [' + hasil.status + '] — ' + waktu);
      berhasil++;
    } else {
      sh.getRange(r + 2, kTanda + 1)
        .setValue('masih ditolak: ' + ((hasil && (hasil.alasan || hasil.pesan)) || 'sebab tidak diketahui'));
      gagal++;
    }
  }

  var lapor = 'Diperiksa ' + n + ' baris -> ' + berhasil + ' dipindahkan, ' +
              gagal + ' masih ditolak, ' + tanpaJson + ' tanpa JSON, ' +
              sudah + ' sudah pernah masuk.';
  Logger.log(lapor);
  return lapor;
}


/**
 * Mencari teks JSON di dalam satu baris, tanpa peduli kolom keberapa.
 * Mengembalikan String biasa dengan properti tambahan __kol (indeks kolomnya),
 * atau null kalau tidak ada.
 */
function petikJson(baris) {
  var terbaik = null, kolTerbaik = -1;
  for (var c = 0; c < baris.length; c++) {
    var v = baris[c];
    if (typeof v !== 'string') continue;
    var s = v.trim();
    if (s.charAt(0) !== '{' || s.charAt(s.length - 1) !== '}') continue;
    try { JSON.parse(s); } catch (err) { continue; }
    if (!terbaik || s.length > terbaik.length) { terbaik = s; kolTerbaik = c; }
  }
  if (!terbaik) return null;
  var out = new String(terbaik);
  out.__kol = kolTerbaik;
  return out;
}


/* ============================================================
 *  6. REKAP KELAYAKAN RESPONDEN (pre & post per orang)
 *  Jalankan `bangunRekapKelayakan` sekali dari editor; setelah itu
 *  muncul menu "SHINING" di bilah menu Sheet.
 *
 *  Menghasilkan dua tab:
 *   - REKAP-KELAYAKAN : satu baris per peserta, ✓/– per instrumen
 *                       pre & post, plus kolom `kelayakan`.
 *   - REKAP-RINGKASAN : hitungan cepat (berapa responden LENGKAP,
 *                       baru pre, dst) — keseluruhan & per kelompok.
 *
 *  Aman dijalankan berulang: kedua tab ditulis ulang dari nol,
 *  tab data instrumen tidak pernah disentuh.
 * ============================================================ */

var TAB_REKAP    = 'REKAP-KELAYAKAN';
var TAB_RINGKAS  = 'REKAP-RINGKASAN';

// Enam instrumen pre (M0) & post (M8). wajibPost:false = post-nya tidak wajib
// untuk kelayakan LENGKAP (v7.4: medsos post), tetapi tetap ditampilkan.
var PASANGAN_INTI = [
  { label: 'pengetahuan',      tab: 'pengetahuan',          pre: 'pre-test',          post: 'post-test' },
  { label: 'sikap',            tab: 'sikap-hbm',            pre: 'pre-test',          post: 'post-test' },
  { label: 'kebiasaan_makan',  tab: 'kebiasaan-makan-ffq',  pre: 'pre-test',          post: 'post-test' },
  { label: 'aktivitas_fisik',  tab: 'aktivitas-ipaq',       pre: 'pre-test',          post: 'post-test' },
  { label: 'karakteristik',    tab: 'identitas',            pre: 'pre-test',          post: 'post-test' },
  { label: 'medsos',           tab: 'medsos-literasi',      pre: 'karakteristik-awal', post: 'tinjauan-akhir', wajibPost: false }
];

// v7.3 — label PASANGAN_INTI yang setara dengan INTI_M0 (syarat M0 lengkap di server).
var LABEL_INTI_M0 = ['karakteristik', 'pengetahuan', 'sikap', 'kebiasaan_makan', 'aktivitas_fisik'];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('SHINING')
    .addItem('Bangun rekap kelayakan', 'bangunRekapKelayakan')
    .addItem('Bangun indeks cepat (cek status)', 'bangunIndeks')
    .addSeparator()
    .addItem('Nyalakan rekap otomatis (tiap jam)', 'pasangPemicuRekap')
    .addItem('Matikan rekap otomatis', 'matikanPemicuRekap')
    .addToUi();
}

/* Rekap otomatis: pemicu waktu tiap jam memanggil bangunRekapKelayakan.
   Jalankan sekali dari menu; sesudah itu Sheet menyegarkan rekap sendiri. */
function pasangPemicuRekap() {
  matikanPemicuRekap();
  ScriptApp.newTrigger('bangunRekapKelayakan').timeBased().everyHours(1).create();
  try {
    SpreadsheetApp.getUi().alert('Rekap otomatis dinyalakan. Tab REKAP-KELAYAKAN disegarkan tiap jam.');
  } catch (e) {}
}

function matikanPemicuRekap() {
  ScriptApp.getProjectTriggers().forEach(function (t) {
    if (t.getHandlerFunction() === 'bangunRekapKelayakan') ScriptApp.deleteTrigger(t);
  });
}

function bangunRekapKelayakan() {
  var ss = bukaSpreadsheet();
  var peserta = {};   // hp_kunci -> catatan
  var urutan = [];

  function ambil(kunci) {
    if (!peserta[kunci]) {
      peserta[kunci] = {
        hp_kunci: kunci.split(' |')[0], nama: '', no_hp: '', kode_kelas: '', asal_pilih: '',
        rencana_menikah: '', tanggal_mulai: '', status: 'sah', kelompok: '',
        pertama: '', terakhir: '', isi: {}
      };
      urutan.push(kunci);
    }
    return peserta[kunci];
  }

  for (var p = 0; p < PASANGAN_INTI.length; p++) {
    var def = PASANGAN_INTI[p];
    var sh = ss.getSheetByName(def.tab);
    if (!sh || sh.getLastRow() < 2) continue;

    var header = ambilHeader(sh);
    var kol = {};
    for (var h = 0; h < header.length; h++) kol[String(header[h]).toLowerCase()] = h;

    var nilai = sh.getRange(2, 1, sh.getLastRow() - 1, sh.getLastColumn()).getValues();
    for (var r = 0; r < nilai.length; r++) {
      var baris = nilai[r];
      var sel = function (nama) {
        return kol[nama] === undefined ? '' : String(baris[kol[nama]] || '').trim();
      };

      var hpRaw = sel('hp_kunci');
      var nm = sel('nama');
      var noHp = sel('no_hp');
      if (!hpRaw && !nm && !noHp) continue;
      // Satu bentuk nomor saja: hp_kunci mentah (mis. '8969…' tanpa 62) atau
      // no_hp dinormalkan dulu, supaya satu orang tidak terpecah dua baris.
      var hp = normalHP(hpRaw) || normalHP(noHp) || String(hpRaw).replace(/\D/g, '');
      // v7: kunci = nomor + kelompok, supaya kontrol & intervensi tidak tergabung.
      var armBaris = kelompokDari(sel('kelompok'), sel('kode_kelas')) || 'tanpa-label';
      var kunci = (hp || ('TANPA-KUNCI: ' + (nm || '(tanpa nama)'))) + ' |' + armBaris;

      var c = ambil(kunci);
      c.arm = armBaris;
      c.hp_asli_kunci = hp;
      if (nm && !c.nama) c.nama = nm;
      if (!c.no_hp) c.no_hp = noHp || hpRaw;
      if (!c.kode_kelas) c.kode_kelas = sel('kode_kelas');
      if (!c.asal_pilih) c.asal_pilih = sel('asal_pilih') || sel('asal_pendaftaran');
      if (!c.rencana_menikah) c.rencana_menikah = sel('rencana_menikah');
      if (!c.tanggal_mulai) c.tanggal_mulai = sel('tanggal_mulai');
      if (sel('status') === 'uji') c.status = 'uji';

      var waktu = sel('waktu_kirim') || sel('created_at');
      if (waktu) {
        if (!c.pertama || waktu < c.pertama) c.pertama = waktu;
        if (!c.terakhir || waktu > c.terakhir) c.terakhir = waktu;
      }

      // v7.3: tab medsos-literasi menyimpan 'tahap' sebagai 'tahap_program' (ALIAS).
      var tahap = (sel('tahap') || sel('tahap_program')).toLowerCase();
      var isPost = (tahap === String(def.post).toLowerCase());
      // Tahap kosong dianggap PRE — kiriman awal sebelum kolom tahap terisi.
      c.isi[def.label + (isPost ? '_post' : '_pre')] = 1;
    }
  }

  // Gabungkan baris TANPA-KUNCI ke peserta bernomor bila namanya sama persis.
  var namaKe = {};
  for (var u = 0; u < urutan.length; u++) {
    if (urutan[u].indexOf('TANPA-KUNCI: ') === 0) continue;
    var nk = String(peserta[urutan[u]].nama || '').trim().toLowerCase();
    if (nk) nk += ' |' + peserta[urutan[u]].arm;
    if (nk && !namaKe[nk]) namaKe[nk] = urutan[u];
  }
  var sisa = [];
  for (var v = 0; v < urutan.length; v++) {
    var kk = urutan[v];
    if (kk.indexOf('TANPA-KUNCI: ') === 0) {
      var nn = String(peserta[kk].nama || '').trim().toLowerCase();
      if (nn) nn += ' |' + peserta[kk].arm;
      var tuju = nn ? namaKe[nn] : '';
      if (tuju && tuju !== kk) {
        var src = peserta[kk], dst = peserta[tuju];
        for (var f in src.isi) dst.isi[f] = 1;
        if (!dst.no_hp) dst.no_hp = src.no_hp;
        if (!dst.kode_kelas) dst.kode_kelas = src.kode_kelas;
        if (!dst.asal_pilih) dst.asal_pilih = src.asal_pilih;
        if (!dst.rencana_menikah) dst.rencana_menikah = src.rencana_menikah;
        if (!dst.tanggal_mulai) dst.tanggal_mulai = src.tanggal_mulai;
        if (src.status === 'uji') dst.status = 'uji';
        if (src.pertama && (!dst.pertama || src.pertama < dst.pertama)) dst.pertama = src.pertama;
        if (src.terakhir && (!dst.terakhir || src.terakhir > dst.terakhir)) dst.terakhir = src.terakhir;
        delete peserta[kk];
        continue;
      }
    }
    sisa.push(kk);
  }
  urutan = sisa;

  // v7: nomor yang muncul di kontrol DAN intervensi.
  var armPerHp = {};
  for (var w = 0; w < urutan.length; w++) {
    var pw = peserta[urutan[w]];
    if (!pw.hp_asli_kunci || pw.arm === 'tanpa-label') continue;
    (armPerHp[pw.hp_asli_kunci] = armPerHp[pw.hp_asli_kunci] || {})[pw.arm] = true;
  }
  function ganda(pw) {
    var a = pw.hp_asli_kunci ? armPerHp[pw.hp_asli_kunci] : null;
    return (a && a.kontrol && a.intervensi) ? 'YA — kontrol & intervensi' : '';
  }

  var judul = ['hp_kunci', 'nama', 'no_hp', 'kelompok', 'kode_kelas', 'asal_pilih', 'rencana_menikah',
               'tanggal_mulai', 'status'];
  for (var i = 0; i < PASANGAN_INTI.length; i++) judul.push(PASANGAN_INTI[i].label + '_pre');
  for (var j = 0; j < PASANGAN_INTI.length; j++) judul.push(PASANGAN_INTI[j].label + '_post');
  judul = judul.concat(['jumlah_pre', 'jumlah_post', 'kelayakan', 'yang_kurang',
                        'kiriman_pertama', 'kiriman_terakhir', 'ganda_kelompok', 'pre_inti_m0']);

  var isi = [];
  var hitung = { total: 0, lengkap: 0, post_sebagian: 0, baru_pre: 0, pre_sebagian: 0, belum: 0, ganda: 0,
                 inti_m0: 0 };
  var perKelompok = {};
  var perArm = {};   // v6: kontrol vs intervensi (kolom 'kelompok'; kosong = kontrol)

  for (var u = 0; u < urutan.length; u++) {
    var c2 = peserta[urutan[u]];
    var nPre = 0, nPost = 0, kurang = [];

    for (var k = 0; k < PASANGAN_INTI.length; k++) {
      if (c2.isi[PASANGAN_INTI[k].label + '_pre']) nPre++; else kurang.push(PASANGAN_INTI[k].label + ' (pre)');
    }
    for (var m = 0; m < PASANGAN_INTI.length; m++) {
      if (PASANGAN_INTI[m].wajibPost === false) continue;   // v7.4: post tidak wajib
      if (c2.isi[PASANGAN_INTI[m].label + '_post']) nPost++; else kurang.push(PASANGAN_INTI[m].label + ' (post)');
    }

    // v7.3: berapa dari 5 instrumen inti M0 (tanpa medsos) yang sudah ada pre-nya.
    var nInti = 0;
    for (var ii = 0; ii < LABEL_INTI_M0.length; ii++) {
      if (c2.isi[LABEL_INTI_M0[ii] + '_pre']) nInti++;
    }
    var intiLengkap = (nInti === LABEL_INTI_M0.length);

    var total = PASANGAN_INTI.length;
    var totalPost = PASANGAN_INTI.filter(function (d) { return d.wajibPost !== false; }).length;
    var kelayakan =
      (nPre === total && nPost === totalPost) ? 'LENGKAP — siap diolah' :
      (nPre === total && nPost > 0)       ? 'Post belum lengkap' :
      (nPre === total)                    ? 'Baru pre (post belum mulai)' :
      (nPre > 0)                          ? 'Pre belum lengkap' : 'Belum ada pre';

    // Kelompok: kolom 'kelompok' (intervensi, mulai 15 Okt) atau kode kelas
    // SHINING-KONTROL-2026 (laman kontrol). Selain itu: 'tanpa-label'.
    var arm = c2.arm || 'tanpa-label';
    var gd = ganda(c2);
    var baris2 = [c2.hp_kunci, c2.nama, c2.no_hp, arm, c2.kode_kelas, c2.asal_pilih,
                  c2.rencana_menikah, c2.tanggal_mulai, c2.status];
    for (var a = 0; a < PASANGAN_INTI.length; a++) baris2.push(c2.isi[PASANGAN_INTI[a].label + '_pre'] ? '✓' : '–');
    for (var b = 0; b < PASANGAN_INTI.length; b++) baris2.push(c2.isi[PASANGAN_INTI[b].label + '_post'] ? '✓' : '–');
    baris2.push(nPre, nPost, kelayakan, kurang.join(', '), c2.pertama, c2.terakhir, gd,
                intiLengkap ? 'LENGKAP (5/5)' : nInti + '/5');
    isi.push(baris2);

    if (c2.status !== 'uji') {
      hitung.total++;
      if (gd) hitung.ganda++;
      if (intiLengkap) hitung.inti_m0++;
      if (kelayakan.indexOf('LENGKAP') === 0) hitung.lengkap++;
      else if (kelayakan === 'Post belum lengkap') hitung.post_sebagian++;
      else if (kelayakan.indexOf('Baru pre') === 0) hitung.baru_pre++;
      else if (kelayakan === 'Pre belum lengkap') hitung.pre_sebagian++;
      else hitung.belum++;

      var kel = c2.kode_kelas || '(tanpa kode kelas)';
      if (!perKelompok[kel]) perKelompok[kel] = { total: 0, lengkap: 0 };
      perKelompok[kel].total++;
      if (kelayakan.indexOf('LENGKAP') === 0) perKelompok[kel].lengkap++;

      if (!perArm[arm]) perArm[arm] = { total: 0, lengkap: 0, baru_pre: 0 };
      perArm[arm].total++;
      if (kelayakan.indexOf('LENGKAP') === 0) perArm[arm].lengkap++;
      if (kelayakan.indexOf('Baru pre') === 0) perArm[arm].baru_pre++;
    }
  }

  // Urutkan: yang LENGKAP di atas, lalu nama.
  var urutKelayakan = ['LENGKAP — siap diolah', 'Post belum lengkap',
                       'Baru pre (post belum mulai)', 'Pre belum lengkap', 'Belum ada pre'];
  var iKelayakan = judul.indexOf('kelayakan');
  isi.sort(function (x, y) {
    var dx = urutKelayakan.indexOf(x[iKelayakan]), dy = urutKelayakan.indexOf(y[iKelayakan]);
    if (dx !== dy) return dx - dy;
    return String(x[1]).localeCompare(String(y[1]));
  });

  var sh1 = ss.getSheetByName(TAB_REKAP) || ss.insertSheet(TAB_REKAP);
  sh1.clear();
  sh1.getRange(1, 1, 1, judul.length).setValues([judul]).setFontWeight('bold');
  if (isi.length) sh1.getRange(2, 1, isi.length, judul.length).setValues(isi);
  sh1.setFrozenRows(1);
  sh1.setFrozenColumns(2);

  var ring = [
    ['REKAP KELAYAKAN RESPONDEN', ''],
    ['Diperbarui', new Date()],
    ['', ''],
    ['Responden (status sah)', hitung.total],
    ['LENGKAP — 6 instrumen pre + 5 instrumen post (medsos post tidak wajib)', hitung.lengkap],
    ['Post belum lengkap', hitung.post_sebagian],
    ['Baru pre (post belum mulai)', hitung.baru_pre],
    ['Pre belum lengkap', hitung.pre_sebagian],
    ['Belum ada pre', hitung.belum],
    ['Baris milik nomor yang terdaftar di DUA kelompok (lihat kolom ganda_kelompok)', hitung.ganda],
    ['Pre inti M0 lengkap (5 instrumen, tanpa medsos — syarat modul terbuka di server)', hitung.inti_m0],
    ['', ''],
    ['Per kelompok penelitian', 'lengkap / total (baru pre)']
  ];
  for (var ka in perArm) {
    ring.push([ka, perArm[ka].lengkap + ' / ' + perArm[ka].total + '  (' + perArm[ka].baru_pre + ')']);
  }
  ring.push(['', '']);
  ring.push(['Per kode kelas', 'lengkap / total']);
  for (var kk2 in perKelompok) {
    ring.push([kk2, perKelompok[kk2].lengkap + ' / ' + perKelompok[kk2].total]);
  }
  ring.push(['', '']);
  ring.push(['Instrumen yang dihitung', PASANGAN_INTI.map(function (d) { return d.label; }).join(', ')]);
  ring.push(['Catatan', 'Baris berstatus "uji" tetap tampil di ' + TAB_REKAP + ' tetapi tidak dihitung di sini.']);
  ring.push(['Kelompok', 'Diambil dari kolom "kelompok" (dikirim laman intervensi mulai 15 Okt 2026). Tanpa kolom itu, kode kelas SHINING-KONTROL-2026 = kontrol; selain itu "tanpa-label" (mis. baris uji coba intervensi lama). Sejak v7 satu nomor di dua kelompok tampil sebagai DUA baris.']);
  ring.push(['Medsos (v7.3)', 'Pre/post medsos dibaca dari kolom "tahap", atau "tahap_program" bila kosong (karakteristik-awal = pre, tinjauan-akhir = post). Sebelum v7.3 semua kiriman medsos terhitung pre.']);
  ring.push(['Medsos post (v7.4)', 'Tidak wajib untuk LENGKAP. Kolom medsos_post tetap diisi ✓/– sebagai data tambahan; tidak dihitung di jumlah_post.']);
  ring.push(['pre_inti_m0', 'Kolom paling kanan REKAP-KELAYAKAN: 5 instrumen pre yang dipakai server untuk menyatakan M0 lengkap. Peserta "Pre belum lengkap" dengan pre_inti_m0 = LENGKAP (5/5) memang boleh lanjut ke modul berikutnya; biasanya hanya kurang medsos (pre).']);

  var sh2 = ss.getSheetByName(TAB_RINGKAS) || ss.insertSheet(TAB_RINGKAS);
  sh2.clear();
  for (var q = 0; q < ring.length; q++) if (ring[q].length < 2) ring[q].push('');
  sh2.getRange(1, 1, ring.length, 2).setValues(ring);
  sh2.getRange(1, 1, 1, 2).setFontWeight('bold');
  sh2.setColumnWidth(1, 320);

  Logger.log('Rekap selesai: ' + hitung.total + ' responden sah, ' + hitung.lengkap + ' LENGKAP.');
  return hitung;
}
