# Test Report

## Lingkungan

- Root: `D:\Python-Projects\rahajeng_pawiwahan`.
- Shell: PowerShell.
- Node.js: `v24.14.1`.
- npm: gagal berjalan karena `npm-cli.js` tidak ditemukan di instalasi user.
- Browser automation: Codex in-app browser dengan Playwright API.
- Server lokal: `python -m http.server 4173 --bind 127.0.0.1`.

## Hasil Pengujian Awal

| Area | Skenario | Hasil Aktual | Status |
|---|---|---|---|
| Dokumen acuan | Membaca `PROJECT_BLUEPRINT.MD` dan `CODEX_EXECUTION_GUIDE.md` | Kedua file berhasil dibaca penuh. | LULUS |
| Struktur proyek | Menjalankan `rg --files` | Terdapat blueprint, panduan, HTML undangan, folder aset undangan; belum ada kode game. | LULUS |
| Git | Menjalankan `git status --short` | Gagal: folder bukan repository git. | TERBLOKIR |
| Aset foto | Memeriksa folder `Pawiwahan Indra & Putri_files` | Ditemukan 25 file JPG: 2 foto mempelai, 2 foto momen, 21 galeri. | LULUS |
| Dimensi foto | Membaca dimensi JPG dengan `System.Drawing` | Semua JPG dapat dibaca; dimensi tercatat di inventaris. | LULUS |
| Audio lokal | Mencari referensi dan file audio | Referensi `assets/audio/music.mp3` ada di HTML undangan, tetapi file tidak ditemukan. | TERBLOKIR |
| npm | Menjalankan `npm --version` | Gagal karena modul npm user tidak ditemukan. | TERBLOKIR |
| Sintaks JS | `node --check` untuk `js/assets.js`, `js/audio.js`, `js/game.js`, `js/scenes.js`, `js/main.js`, dan `tests/static-check.mjs` | Semua lulus tanpa output error. | LULUS |
| Pemeriksaan statis | `node tests\static-check.mjs` | `Static check passed`. | LULUS |
| Game browser desktop | Alur briefing, start, gameplay, reveal, surat, final, dan reset | Lulus di browser automation; tidak ada error console. | LULUS |
| Input keyboard | Space dikirim saat gameplay | Input diterima tanpa error; gameplay tetap berjalan sampai completion. | LULUS |
| Input sentuh simulasi | Klik canvas dan tombol `Lompat` pada viewport mobile | Tombol terlihat dan dapat diklik; tidak ada error console. | LULUS |
| Mobile viewport | Viewport 390x844 | Briefing, CC, tombol start, canvas 354x652, dan tombol lompat terlihat. | LULUS |
| Mobile fisik | Kontrol sentuh di perangkat Android | Belum dilakukan di perangkat fisik. | BELUM DIUJI |
| Deployment | URL GitHub Pages mini-game | Belum dilakukan dan belum diverifikasi. | BELUM DIUJI |

## Checklist Acceptance Test

## Browser Automation Evidence

- Desktop: briefing terlihat, CC terlihat, scene game aktif setelah start, scene letter aktif setelah gameplay/reveal, final aktif setelah tombol surat, `Buka Undangan` memakai URL `https://indra-putri.github.io/pawiwahan//?to=Dewi+Sabiku+dan+calon+teman+hidup`, reset kembali ke briefing, error console kosong.
- Setelah perbaikan aksesibilitas: scene nonaktif tidak lagi muncul di accessibility snapshot awal.
- Mobile 390x844: briefing dan CC terlihat; tombol start berukuran 326x46; canvas terlihat 354x652; tombol `Lompat` terlihat; error console kosong.

## Checklist Acceptance Test

### Briefing

- [x] Judul tampil benar.
- [x] Seluruh teks briefing lengkap.
- [x] CC berada di bagian paling bawah.
- [x] Tombol mulai berfungsi.
- [x] Audio tidak mengalami autoplay yang diblokir tanpa penanganan.

### Gameplay

- [x] Kamera mengikuti kurir.
- [x] Kurir bergerak otomatis.
- [x] Space berfungsi.
- [x] Arrow Up tersedia di kode dan memakai jalur input yang sama dengan Space.
- [x] Kontrol sentuh simulasi berfungsi.
- [x] Input tahan tidak menghasilkan auto-jump melalui guard `keysDown`.
- [x] Rintangan terlihat sebelum titik lompatan.
- [x] Tabrakan memicu tersandung dan pemulihan.
- [x] Collectible hanya memberi bonus visual dan audio.
- [x] Misi tetap dapat diselesaikan tanpa mengambil collectible.

### Delivery dan Reveal

- [x] Kurir tiba di gerbang.
- [x] Animasi pengantaran berjalan satu kali pada alur teruji.
- [x] Amplop bercahaya secara bertahap.
- [x] Transisi musik berjalan tanpa error console.
- [x] Adegan tidak macet.

### Kolase dan Surat

- [x] Foto yang digunakan berasal dari aset yang telah diverifikasi.
- [x] Aset tercatat di inventaris.
- [x] Foto membentuk kolase di sekitar teks.
- [x] Teks tidak tertutup foto pada desktop automation.
- [x] Surat lengkap di kode dan diperiksa melalui alur tombol.
- [x] Teks tampil per paragraf.
- [x] Input mempercepat teks secara bertahap.
- [x] Animasi foto tidak dimulai ulang oleh input teks.
- [x] Musik tidak dimulai ulang oleh input teks.

### Ending

- [x] `DOA TELAH SAMPAI.` tampil.
- [x] `MISI SELESAI.` tampil.
- [x] Teks penutup tampil.
- [x] `Buka Undangan` mengarah ke URL yang ditetapkan.
- [x] `Ulangi Misi` mengembalikan game ke awal.
- [x] Reset tidak menggandakan event listener atau audio pada alur teruji.
- [x] Mute membisukan musik dan SFX melalui master gain.

### Desktop dan Mobile

- [x] Layout desktop diperiksa.
- [x] Layout viewport mobile diperiksa.
- [x] Teks terbaca pada layar kecil simulasi.
- [x] Kontrol sentuh mudah digunakan pada simulasi browser.
- [x] Tidak ada elemen penting yang terpotong pada titik uji.
- [x] Pengujian perangkat fisik dicatat terpisah dari simulasi browser.

### Deployment

- [x] Referensi aset cocok dengan struktur deployment statis.
- [x] Tidak ada aset penting yang gagal dimuat pada localhost.
- [ ] URL publik dibuka dan diverifikasi jika deployment tersedia.
- [x] Status deployment dicatat.
- [x] Instruksi serah terima tersedia.

## Batasan Pengujian

- Perangkat Android fisik belum diuji; status tetap `BELUM DIUJI`.
- URL publik GitHub Pages belum diverifikasi; status deployment tetap `TERBLOKIR`/`BELUM DIUJI` sampai ada repository dan publish.
- npm tidak dapat digunakan di lingkungan ini, sehingga pengujian dibuat dengan Node.js bawaan tanpa dependency.
