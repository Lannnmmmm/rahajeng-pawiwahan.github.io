import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'index.html',
  'css/style.css',
  'js/assets.js',
  'js/audio.js',
  'js/game.js',
  'js/scenes.js',
  'js/main.js',
  'assets/photos/groom.jpg',
  'assets/photos/bride.jpg',
  'assets/photos/moment-1.jpg',
  'assets/photos/moment-2.jpg',
  'assets/photos/gallery-1.jpg',
  'assets/photos/gallery-6.jpg',
  'assets/photos/gallery-8.jpg'
];

const requiredText = [
  'OPERATION: TITIP DOA',
  'Tujuan: Mengantarkan doa terbaik untuk Indra &amp; Putri.',
  'Isi paket: Satu amplop, seribu doa.',
  'CC: Dewi Sabiku dan calon teman hidup.',
  'DOA TELAH SAMPAI.',
  'MISI SELESAI.',
  'https://indra-putri.github.io/pawiwahan//?to=Dewi+Sabiku+dan+calon+teman+hidup'
];

const index = readFileSync(join(root, 'index.html'), 'utf8');
const sceneScript = readFileSync(join(root, 'js/scenes.js'), 'utf8');
const assetScript = readFileSync(join(root, 'js/assets.js'), 'utf8');
const failures = [];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) failures.push(`Missing file: ${file}`);
}

for (const text of requiredText) {
  if (!index.includes(text) && !assetScript.includes(text)) failures.push(`Missing required text: ${text}`);
}

const expectedLetterFragments = [
  'Selamat menempuh hidup baru, Indra dan Putri!',
  'kalian satu tim',
  'terserah',
  'Jarak kali ini menang tipis',
  'Bahagia selalu, Indra dan Putri!'
];

for (const text of expectedLetterFragments) {
  if (!sceneScript.includes(text)) failures.push(`Missing letter fragment: ${text}`);
}

if (!sceneScript.includes('prefers-reduced-motion')) {
  failures.push('Reduced motion handling not found in scenes.js');
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log('Static check passed');
