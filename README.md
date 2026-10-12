# Operation: Titip Doa

Mini-game browser statis ucapan pernikahan untuk Indra dan Putri.

## Jalankan Lokal

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Buka:

```text
http://127.0.0.1:4173/
```

## Tes

```powershell
node tests\static-check.mjs
node --check js\assets.js
node --check js\audio.js
node --check js\game.js
node --check js\scenes.js
node --check js\main.js
```

## Deployment GitHub Pages

Deploy dari root repository. File `index.html` sudah berada di root dan referensi aset memakai path relatif, sehingga cocok untuk GitHub Pages statis.

## Catatan

Folder undangan asli hasil unduhan tidak ikut di-track secara default. Foto yang dipakai game sudah disalin ke `assets/photos/` dan dicatat di `ASSET_INVENTORY.md`.
