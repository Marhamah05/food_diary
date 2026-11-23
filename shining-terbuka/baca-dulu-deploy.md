# DEPLOY LAMAN INTERVENSI — SHINING EduCatin
Disiapkan 31 Juli 2026. Alamat tujuan: **shining.edukasi-catin.id**

## Pembaruan 23 November 2026 — Minggu 1–7 terbuka setelah M0 (amandemen protokol)
File yang berubah: **hanya `index.html`**. File lain (`tools/`, `assets/`, `assets/ikon/`, `keterbacaan.html`, `_redirects`) TIDAK berubah dan harus tetap ada di folder.
- Setelah M0 tuntas, Minggu 1–7 langsung terbuka semua (tanpa jeda 7 hari). Minggu 8 (materi penutup + post-test) TETAP terbuka pada hari ke-56 sejak M0 tuntas.
- Teks jadwal di Beranda: "Materi Minggu 1–7 sudah terbuka semua…". Pesan saat M8 diketuk sebelum waktunya: "Kuesioner akhir dibuka setelah 8 minggu…".
- Setiap baris data dari versi ini membawa kolom `akses_terbuka = M1-M7` (untuk memisahkan data sebelum/sesudah amandemen).
- Untuk kembali ke jadwal mingguan: di `index.html` ubah `BUKA_M1_M7 = true` menjadi `false`, lalu deploy ulang (teks Beranda perlu dikembalikan juga, atau pakai cadangan `index-asli-22nov2026.html`).
- Cadangan versi sebelum amandemen: `index-asli-22nov2026.html` (identik dengan yang tayang per 22 Nov 2026). Simpan DI LUAR folder `deploy`.
- Catat tanggal deploy → isi [tanggal aktif] di Catatan Proses ADDIE subbab 3.4.

### Uji cepat setelah publish (tambahan)
- Masuk dengan nomor peserta yang sudah tuntas M0 → kartu Minggu 1–7 "siap dimulai", Minggu 8 "Terkunci" dengan tanggal hari ke-56.
- Ketuk kartu Minggu 8 → muncul pesan "Kuesioner akhir dibuka setelah 8 minggu…".
- Link pendek tetap jalan: buka https://shining.edukasi-catin.id/anemia → harus menuju materi anemia (tanda `_redirects` ikut terunggah).

## Pembaruan 25 Oktober 2026
File yang berubah: `index.html`, folder baru `assets/ikon/` (ikon & stiker karakter per minggu, gambar sapa). File lain TIDAK berubah.
- Ikon ekspresi catin M0–M8 di kartu Beranda & linimasa; laman awal tiap minggu: lingkaran nomor berwarna + stiker karakter utuh.
- Kartu "Lanjutkan belajar" berisi wajah catin minggu berjalan.
- Pesan tahan: nomor yang sudah terdaftar di kelompok KONTROL tidak bisa mendaftar di sini (perlu Apps Script v7.2).
- Cek status minggu kini hanya menghitung data intervensi (&kelompok=intervensi).

## Pembaruan 14 Oktober 2026 (menjelang peluncuran 15 Okt)
File yang berubah: `index.html`, `tools/informed-consent-intervensi.html`, 14 `tools/materi-*.html` + `tools/tugas-piring-makan.html`, `assets/lembar-persetujuan-informed-consent.pdf`, `assets/marhamah.png`, `assets/ikon-terima-kasih.png` (baru), `tools/food-daily-vlog.html`, `tools/log-aktivitas-fisik.html`, `_redirects` (baru), file ini. File lain TIDAK berubah.
- Pintu masuk ringkas (1 centang kriteria, tanpa layar sambutan, kartu "Selamat datang kembali").
- Persetujuan berlapis (ringkasan 6 poin + naskah lengkap) + kesediaan tercatat otomatis.
- Ethical Clearance baru: 01.26.4049/KEPK/POLTEKKES KEMENKES MEDAN 2026 (berlaku 5 Okt 2026 – 5 Okt 2027).
- FFQ: draf tersimpan otomatis, Kel. 1 wajib lengkap.
- Akses minggu tetap terbuka saat peserta ganti HP (dicek ke server); tanpa batas akhir.
- Foto pengajar diperkecil & tidak bisa disimpan lewat tekan-lama; laman 3,2 MB → 0,5 MB.
- Setiap baris data membawa kolom `kelompok = intervensi`.
- FDV (food-daily-vlog) & PA (log-aktivitas-fisik) dikeluarkan dari daftar kegiatan M2; dibagikan lewat WA (link pendek /makan & /gerak, file `_redirects`). Pendaftaran FDV/PA kini meminta nomor WA; jadwal: setiap hari di Minggu 2 + 3 hari di Minggu 6 (2 hari kerja, 1 hari libur); rank Sparkle 3 · Glow 7 · Shine 10 hari.
- Enam materi pendukung (IMT, BB ideal, LILA, zat gizi mikro, anemia-TTD, manfaat aktivitas fisik) = "Bacaan tambahan" (tidak wajib); link pendek /imt /bb-ideal /lila /gizi-mikro /anemia /aktif. Dibuka lewat link langsung tetap tercatat di GSheet (sumber = link-langsung).
- Materi: kotak 3 centang diganti kartu "Terima kasih sudah membaca"; laporan otomatis ke tab log-kegiatan (aksi membaca-sampai-akhir, lama baca, persen gulir) dan materi ditandai Selesai.

## Isi folder ini (JANGAN dikurangi)
- `index.html` — aplikasi utama (sudah termasuk perbaikan kategori IPAQ 31 Jul)
- `keterbacaan.html` — kuesioner keterbacaan versi tautan
- `tools/` — 36 berkas materi & kegiatan (di-embed lewat iframe)
- `assets/` — foto pengajar, foto cover, 2 PDF

⚠ **Unggah FOLDER-nya, bukan `index.html` sendirian.** Materi & PDF dipanggil lewat path relatif saat laman berjalan, jadi tidak ikut menyatu ke `index.html`. Kalau hanya file tunggal diunggah, semua materi & PDF jadi 404.

---

## LANGKAH 1 — Unggah folder ke Netlify
1. Buka https://app.netlify.com dan masuk (team **bright_team**).
2. Klik site **educatin-shining** (site intervensi yang sudah ada — di daftar Netlify tampil paling bawah, "Published on Jul 24").
3. Masuk tab **Deploys**.
4. Di bagian bawah ada kotak **"Need to update your site? Drag and drop your site output folder here"**.
5. Buka File Explorer, cari folder **`deploy`** hasil unduhan proyek ini.
6. **Drag folder `deploy` itu** (folder-nya, bukan isinya) ke kotak tadi.
7. Tunggu status berubah jadi **Published** (±1–2 menit).
8. Buka https://educatin-shining.netlify.app — pastikan laman masuk muncul.

### Uji cepat setelah publish
- Klik satu materi (misal Minggu 1 → "Pentingnya Prakonsepsi") → harus tampil, bukan halaman kosong/404.
- Buka Minggu 0 → "Lembar Persetujuan (Informed Consent)" → teks harus muncul.
- Buka Minggu 0 → kuesioner Aktivitas Fisik (IPAQ) → di layar hasil harus ada baris "Aktivitas sedang + berat: … menit/minggu".

---

## LANGKAH 2 — Tambah alamat shining.edukasi-catin.id
Masih di site **educatin-shining**:
1. **Site configuration** → **Domain management** (atau menu **Domains**).
2. Klik **Add a domain** / **Add domain alias**.
3. Ketik: `shining.edukasi-catin.id` → **Verify** → **Add domain**.
4. Netlify akan bilang domain `edukasi-catin.id` sudah dikelola di akun ini (dipakai site kontrol), jadi biasanya langsung diterima tanpa perlu ubah DNS.

### Kalau Netlify minta DNS record
Buka pengelola DNS `edukasi-catin.id` (Netlify DNS atau registrar), tambahkan:

| Type | Name | Value |
| --- | --- | --- |
| CNAME | `shining` | `educatin-shining.netlify.app` |

Simpan, lalu kembali ke Netlify dan klik **Retry DNS verification**.

## LANGKAH 3 — Tunggu sertifikat HTTPS
1. Di **Domain management** → bagian **HTTPS**, tunggu tulisan **Certificate: Let's Encrypt** dan domain baru terdaftar di sana.
2. Kalau belum, klik **Verify DNS configuration** lalu **Provision certificate**. Biasanya 1–10 menit; kadang sampai 1 jam.
3. Uji buka **https://shining.edukasi-catin.id** — harus tampil laman intervensi, tanpa peringatan keamanan.

## LANGKAH 4 — Jadikan alamat utama (opsional, disarankan)
1. Di daftar domain, klik menu ⋯ di sebelah `shining.edukasi-catin.id`.
2. Pilih **Set as primary domain**.
3. Alamat `educatin-shining.netlify.app` otomatis mengalihkan ke domain baru — jadi tautan lama yang sudah dibagikan tetap berfungsi.

---

## Catatan
- **Jangan hapus** site kontrol (di daftar tampil sebagai `mulai.edukasi-catin.id`) — QR brosur yang sudah dicetak menunjuk ke sana. Juga jangan hapus `keterbacaan.edukasi-catin.id`.
- Kredit Netlify: plan Free, 300 kredit/bulan, **tidak ada tagihan overage**. Satu deploy folder ini memakai kredit sangat kecil.
- Setiap kali berkas di `tools/` disunting nanti, salinannya di `deploy/tools/` harus disegarkan dulu sebelum diunggah lagi.
