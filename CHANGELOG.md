# Changelog

## 0.1.0 - Audit dan Baseline

### Added

- Membuat struktur dokumentasi wajib: `IMPLEMENTATION_PLAN.md`, `PROGRESS.md`, `CHANGELOG.md`, `TEST_REPORT.md`, dan `ASSET_INVENTORY.md`.
- Menyiapkan rencana implementasi bertahap berdasarkan blueprint.
- Menyiapkan folder target game statis: `css/`, `js/`, `assets/`, dan `tests/`.
- Menyalin aset foto terpilih dari folder undangan asli ke `assets/photos/` tanpa mengubah sumber asli.

### Verified

- `Pawiwahan Indra & Putri.html` adalah file undangan lokal.
- `Pawiwahan Indra & Putri_files` berisi foto mempelai, momen, dan galeri.

### Known Limitations

- Belum ada implementasi game pada baseline awal.
- Tidak ada file audio lokal tersedia.
- Folder kerja bukan repository git aktif.

## 1.0.0 - Mini-game Lokal Terverifikasi

### Added

- Menambahkan mini-game statis di `index.html`.
- Menambahkan styling responsif dan pixel-art di `css/style.css`.
- Menambahkan modul JS untuk aset, audio, gameplay, scene, dan bootstrap.
- Menambahkan scene wajib: briefing, side-scrolling gameplay, delivery, glowing envelope reveal, photo collage, wedding letter, dan final actions.
- Menambahkan kontrol keyboard `Space`/`Arrow Up`, tap canvas, dan tombol `Lompat`.
- Menambahkan collision stumble tanpa game over dan collectible bonus visual/audio.
- Menambahkan Web Audio sintetis untuk musik scene dan SFX karena tidak ada file audio lokal.
- Menambahkan mute global.
- Menambahkan tombol `Buka Undangan` dengan URL blueprint persis dan tombol `Ulangi Misi`.
- Menambahkan `aria-hidden` dan `inert` untuk scene nonaktif.
- Menambahkan `tests/static-check.mjs`.

### Fixed

- Memperbaiki progres gameplay agar tetap mencapai gerbang saat browser automation menurunkan frame rate.
- Merapikan aksesibilitas supaya scene nonaktif tidak terbaca sebagai konten aktif.

### Verified

- `node --check` lulus untuk seluruh file JavaScript.
- `node tests\static-check.mjs` lulus.
- Browser automation desktop lulus untuk alur briefing sampai final dan reset.
- Simulasi viewport mobile 390x844 lulus untuk briefing, tombol start, canvas, dan tombol lompat.
- Tidak ada error console pada tes browser yang dijalankan.

### Known Limitations

- Deployment publik belum dilakukan.
- Pengujian perangkat fisik ponsel masih `BELUM DIUJI`.
- Audio menggunakan Web Audio sintetis, bukan file musik/audio lokal.
