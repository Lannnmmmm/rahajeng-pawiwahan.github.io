# Progress

## Status Tahap

| Tahap | Status | Catatan |
|---|---|---|
| A - Audit dan Persiapan | LULUS | Struktur proyek, undangan, aset foto, dan hambatan awal tercatat. |
| B - Briefing dan Kerangka Scene | LULUS | Briefing, CC bawah, start button, state scene, dan aksesibilitas scene diverifikasi di browser. |
| C - Gameplay | LULUS | Side-scrolling, auto-run, Space, tap/click canvas, tombol Lompat, collectible, tabrakan non-game-over, dan completion diuji di browser automation. |
| D - Delivery dan Reveal | LULUS | Arrival/reveal berpindah ke letter tanpa macet; trigger tidak berulang pada alur teruji. |
| E - Kolase, Surat, dan Ending | LULUS | Foto lokal terverifikasi dipakai; surat tampil bertahap; final, link undangan, dan reset diuji. |
| F - Audio | LULUS | Web Audio sintetis, SFX, musik scene, dan mute global tersedia; tidak ada error console. |
| G - Integrasi dan Hardening | LULUS | Alur penuh desktop automation, reset, reduced motion handling, dan `inert` scene diuji. |
| H - Pengujian dan Deployment | TERBLOKIR | Pengujian lokal lulus; deployment publik belum bisa dilakukan karena folder bukan repository git aktif dan tidak ada akses GitHub Pages terverifikasi. |
| I - Serah Terima | LULUS | Dokumentasi diperbarui dengan cara menjalankan lokal, hasil tes, dan hambatan. |

## Audit Awal

- Root proyek: `D:\Python-Projects\rahajeng_pawiwahan`.
- Status git: bukan repository git aktif.
- Dokumen acuan: `PROJECT_BLUEPRINT.MD` dan `CODEX_EXECUTION_GUIDE.md`.
- File undangan asli: `Pawiwahan Indra & Putri.html`.
- Folder aset undangan asli: `Pawiwahan Indra & Putri_files`.
- HTML form lokal: `Pawiwahan Indra & Putri_files/viewform.html`, berisi halaman kosong hasil simpan dari `about:blank`.
- Belum ada `index.html`, `css/`, `js/`, `assets/`, atau `tests/` sebelum persiapan implementasi.

## Implementasi Selesai

- `index.html`: mini-game statis dengan urutan scene sesuai blueprint.
- `css/style.css`: pixel-art layout, responsive desktop/mobile, reduced motion, dan styling final.
- `js/assets.js`: daftar foto salinan dari aset undangan.
- `js/audio.js`: musik dan SFX sintetis berbasis Web Audio, mute global, dan fallback aman.
- `js/game.js`: canvas side-scrolling, auto-run, jump lock, rintangan, tersandung, collectible, dan arrival.
- `js/scenes.js`: state scene, reveal, kolase, surat per paragraf, final, reset, `aria-hidden`, dan `inert`.
- `js/main.js`: bootstrap aplikasi.
- `tests/static-check.mjs`: pemeriksaan statis tanpa npm.

## Aset Ditemukan

- Foto mempelai: `groom.jpg`, `bride.jpg`.
- Foto momen: `moment-1.jpg`, `moment-2.jpg`.
- Galeri: `1.jpg` sampai `21.jpg`.
- CSS undangan: `style.css`.
- JavaScript undangan: `script.js.download`.
- Font cache lokal: `css2`.
- Tidak ditemukan file audio lokal yang dapat dipakai. HTML undangan merujuk `assets/audio/music.mp3`, tetapi file tersebut tidak tersedia di struktur lokal.

## Hambatan

- Tidak ada repository git aktif, sehingga audit perubahan tidak bisa memakai git diff.
- Tidak ada audio lokal; audio game akan dibuat dengan Web Audio sintetis ringan dan dicatat sebagai keputusan teknis.
- Deployment GitHub Pages tidak dapat diverifikasi tanpa repository/remote dan akses publish.
- Pengujian perangkat fisik ponsel belum bisa dilakukan dari lingkungan ini.

## Cara Menjalankan Lokal

1. Dari root proyek, jalankan `python -m http.server 4173 --bind 127.0.0.1`.
2. Buka `http://127.0.0.1:4173/`.
3. Untuk pemeriksaan statis, jalankan `node tests\static-check.mjs`.

## Langkah Berikutnya untuk Deployment

1. Jadikan folder ini repository git atau salin file game ke repository GitHub Pages yang sesuai.
2. Pastikan root Pages mengarah ke folder yang memuat `index.html`.
3. Publikasikan via GitHub Pages.
4. Buka URL publik hasil Pages dan verifikasi ulang briefing, gameplay, surat, aset foto, dan link undangan.
5. Status deployment tetap `TERBLOKIR` sampai URL publik benar-benar dibuka dan diperiksa.
