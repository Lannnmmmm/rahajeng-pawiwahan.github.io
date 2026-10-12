# Implementation Plan

## Ringkasan Kondisi Awal

Proyek berisi blueprint, panduan eksekusi, satu HTML undangan hasil unduhan, dan folder aset undangan asli `Pawiwahan Indra & Putri_files`. Belum ditemukan kode mini-game sebelum implementasi ini. Folder ini bukan repository git aktif pada saat audit (`git status` gagal dengan pesan bukan repository git).

File undangan asli dan folder aset undangan asli diperlakukan sebagai sumber referensi dan tidak diubah.

## Struktur Target

- `index.html`: entry point mini-game.
- `css/style.css`: tampilan, layout responsif, animasi, reduced motion.
- `js/assets.js`: daftar aset foto terverifikasi.
- `js/audio.js`: audio sintetis berbasis Web Audio, mute global, transisi musik.
- `js/game.js`: loop gameplay, input, lompatan, rintangan, collectible, arrival trigger.
- `js/scenes.js`: state scene, briefing, reveal, surat, ending, reset.
- `js/main.js`: bootstrap aplikasi.
- `assets/photos/`: salinan foto undangan yang dipakai game.
- `assets/sprites/`, `assets/backgrounds/`, `assets/audio/`, `assets/fonts/`: disiapkan untuk struktur statis; sebagian dapat kosong jika tidak dibutuhkan.
- `tests/`: skrip pengujian lokal.

## Tahapan

### Tahap A - Audit dan Persiapan

Dependensi: blueprint dan panduan eksekusi terbaca penuh.

Keluaran:
- Inventaris file awal.
- Identifikasi HTML undangan dan aset galeri.
- Struktur game dibuat tanpa memodifikasi sumber asli.
- Dokumentasi awal dibuat.

Acceptance criteria:
- Sumber aset diketahui.
- Struktur proyek dipahami.
- Rencana implementasi tersedia.

### Tahap B - Briefing dan Kerangka Scene

Dependensi: Tahap A.

Keluaran:
- Halaman game statis.
- Scene briefing lengkap.
- Easter egg CC di bagian bawah.
- State scene dasar.
- Tombol mulai.

Acceptance criteria:
- Semua teks briefing terbaca.
- CC berada di bawah.
- Start memicu gameplay satu kali.

### Tahap C - Gameplay

Dependensi: Tahap B.

Keluaran:
- Side-scrolling canvas.
- Kurir otomatis bergerak.
- Input keyboard dan sentuh.
- Jump lock untuk mencegah auto-jump saat tombol ditahan.
- Rintangan, tersandung, pemulihan.
- Collectible bonus.

Acceptance criteria:
- Gameplay dapat diselesaikan.
- Tidak ada game over.
- Tabrakan tidak membuat softlock.

### Tahap D - Delivery dan Reveal

Dependensi: Tahap C.

Keluaran:
- Arrival gate.
- Animasi serah amplop.
- Reveal amplop bercahaya.
- Transisi ke kolase.

Acceptance criteria:
- Kontrol gameplay berhenti saat arrival.
- Delivery dan reveal tidak terpicu berulang.
- Transisi selesai.

### Tahap E - Kolase, Surat, dan Ending

Dependensi: Tahap D dan aset foto terverifikasi.

Keluaran:
- Kolase foto dari aset undangan.
- Surat tampil per paragraf.
- Input mempercepat teks bertahap.
- Teks penutup.
- Tombol `Buka Undangan` dan `Ulangi Misi`.

Acceptance criteria:
- Surat lengkap.
- Foto tidak menutupi teks.
- Tombol final berfungsi.
- Reset kembali ke awal tanpa menggandakan listener.

### Tahap F - Audio

Dependensi: scene utama tersedia.

Keluaran:
- Musik dan SFX sintetis ringan menggunakan Web Audio.
- Fade/transisi scene.
- Mute global.
- Fallback jika Web Audio tidak tersedia.

Acceptance criteria:
- Audio dimulai setelah interaksi.
- Mute berlaku untuk seluruh suara.
- Kegagalan audio tidak menghentikan game.

### Tahap G - Integrasi dan Hardening

Dependensi: Tahap B-F.

Keluaran:
- Perbaikan responsif desktop/mobile.
- Pemeriksaan reset, listener, state, console error.
- Reduced motion.

Acceptance criteria:
- Satu alur lengkap berjalan dari briefing hingga ending.
- Tidak ada error kritis yang diketahui tanpa catatan.

### Tahap H - Pengujian dan Deployment

Dependensi: implementasi lengkap.

Keluaran:
- Pengujian statis dan browser automation jika tersedia.
- Laporan hasil aktual.
- Instruksi deployment GitHub Pages.

Acceptance criteria:
- Hasil tes dicatat jujur.
- URL publik hanya dinyatakan terverifikasi jika benar-benar dibuka.

### Tahap I - Serah Terima

Dependensi: Tahap H.

Keluaran:
- Dokumentasi final.
- Ringkasan fitur, tes, kendala, status deployment.

Acceptance criteria:
- Pengguna dapat menjalankan lokal dan mengetahui langkah deployment berikutnya.
