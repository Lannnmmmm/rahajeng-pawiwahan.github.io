# Asset Inventory

## Prinsip

File di `Pawiwahan Indra & Putri_files` adalah sumber undangan asli dan tidak diubah. Aset yang dipakai game disalin ke `assets/photos/` agar mini-game dapat berjalan sebagai situs statis tanpa merusak sumber.

## Sumber Undangan

| Aset | Lokasi sumber | Status verifikasi | Catatan |
|---|---|---|---|
| HTML undangan | `Pawiwahan Indra & Putri.html` | LULUS | Memuat cover, mempelai, momen, galeri, RSVP, dan footer. |
| Folder aset | `Pawiwahan Indra & Putri_files` | LULUS | Berisi CSS, JS, font cache, HTML iframe kosong, dan JPG. |
| Form iframe | `Pawiwahan Indra & Putri_files/viewform.html` | LULUS | File lokal kosong dari `about:blank`; tidak dipakai game. |
| Audio undangan | `assets/audio/music.mp3` | TERBLOKIR | Direferensikan HTML undangan, tetapi file tidak tersedia lokal. |

## Foto Tersedia di Undangan

| File sumber | Dimensi | Ukuran | Dipakai game | Salinan |
|---|---:|---:|---|---|
| `Pawiwahan Indra & Putri_files/groom.jpg` | 1200x1500 | 282.2 KB | Ya | `assets/photos/groom.jpg` |
| `Pawiwahan Indra & Putri_files/bride.jpg` | 1200x1500 | 334.5 KB | Ya | `assets/photos/bride.jpg` |
| `Pawiwahan Indra & Putri_files/moment-1.jpg` | 1000x680 | 151.0 KB | Ya | `assets/photos/moment-1.jpg` |
| `Pawiwahan Indra & Putri_files/moment-2.jpg` | 1000x680 | 222.1 KB | Ya | `assets/photos/moment-2.jpg` |
| `Pawiwahan Indra & Putri_files/1.jpg` | 900x1600 | 344.8 KB | Ya | `assets/photos/gallery-1.jpg` |
| `Pawiwahan Indra & Putri_files/2.jpg` | 900x1600 | 306.5 KB | Tidak untuk awal | Belum disalin |
| `Pawiwahan Indra & Putri_files/3.jpg` | 900x1600 | 239.6 KB | Tidak untuk awal | Belum disalin |
| `Pawiwahan Indra & Putri_files/4.jpg` | 900x1600 | 365.0 KB | Tidak untuk awal | Belum disalin |
| `Pawiwahan Indra & Putri_files/5.jpg` | 900x1600 | 270.7 KB | Tidak untuk awal | Belum disalin |
| `Pawiwahan Indra & Putri_files/6.jpg` | 900x1200 | 251.2 KB | Ya | `assets/photos/gallery-6.jpg` |
| `Pawiwahan Indra & Putri_files/7.jpg` | 900x1600 | 321.0 KB | Tidak untuk awal | Belum disalin |
| `Pawiwahan Indra & Putri_files/8.jpg` | 900x1200 | 206.0 KB | Ya | `assets/photos/gallery-8.jpg` |
| `Pawiwahan Indra & Putri_files/9.jpg` | 900x1200 | 256.0 KB | Tidak untuk awal | Belum disalin |
| `Pawiwahan Indra & Putri_files/10.jpg` | 900x1150 | 298.6 KB | Tidak untuk awal | Belum disalin |
| `Pawiwahan Indra & Putri_files/11.jpg` | 900x1600 | 377.2 KB | Tidak untuk awal | Belum disalin |
| `Pawiwahan Indra & Putri_files/12.jpg` | 900x1600 | 328.1 KB | Tidak untuk awal | Belum disalin |
| `Pawiwahan Indra & Putri_files/13.jpg` | 900x1600 | 280.0 KB | Tidak untuk awal | Belum disalin |
| `Pawiwahan Indra & Putri_files/14.jpg` | 900x1600 | 336.6 KB | Tidak untuk awal | Belum disalin |
| `Pawiwahan Indra & Putri_files/15.jpg` | 900x1600 | 330.2 KB | Tidak untuk awal | Belum disalin |
| `Pawiwahan Indra & Putri_files/16.jpg` | 900x1600 | 372.8 KB | Tidak untuk awal | Belum disalin |
| `Pawiwahan Indra & Putri_files/17.jpg` | 900x1599 | 363.3 KB | Tidak untuk awal | Belum disalin |
| `Pawiwahan Indra & Putri_files/18.jpg` | 900x1599 | 363.3 KB | Tidak untuk awal | Belum disalin |
| `Pawiwahan Indra & Putri_files/19.jpg` | 900x1600 | 299.2 KB | Tidak untuk awal | Belum disalin |
| `Pawiwahan Indra & Putri_files/20.jpg` | 900x1600 | 366.5 KB | Tidak untuk awal | Belum disalin |
| `Pawiwahan Indra & Putri_files/21.jpg` | 900x1600 | 394.8 KB | Tidak untuk awal | Belum disalin |

## Aset Sintetis

| Aset | Lokasi | Status | Catatan |
|---|---|---|---|
| Sprite kurir | CSS/Canvas runtime | LULUS | Digambar dengan canvas pixel-art, bukan file eksternal; terlihat dalam browser automation. |
| Background game | CSS/Canvas runtime | LULUS | Digambar ringan di canvas; terlihat dalam browser automation. |
| Musik dan SFX | Web Audio runtime | LULUS | Dipilih karena tidak ada file audio lokal. Tidak memakai layanan eksternal; tidak ada error console. |

## Optimasi

- Foto belum dikompresi ulang pada baseline awal; ukuran masih mengikuti sumber.
- Salinan awal dibatasi ke 7 foto agar kolase cukup kaya tanpa memuat seluruh galeri secara agresif.
- Tidak ada upload atau pemrosesan aset melalui layanan eksternal.
