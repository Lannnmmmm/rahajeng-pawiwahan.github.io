(function () {
  const LETTER_PARAGRAPHS = [
    '<strong>Selamat menempuh hidup baru, Indra dan Putri!</strong>',
    'Semoga pernikahan kalian selalu dipenuhi cinta, kesabaran, rezeki yang baik, serta tawa yang tetap terdengar bahkan ketika hidup sedang tidak sesuai rencana.',
    'Semoga kalau satu sedang marah, yang lain tetap ingat: kalian satu tim, bukan dua kubu yang sedang debat final Piala Dunia.',
    'Dan semoga kata "terserah" tidak pernah menjadi teka-teki yang harus dipecahkan seumur hidup.',
    'Mohon maaf saya belum bisa hadir langsung untuk ikut merayakan hari istimewa ini. Jarak kali ini menang tipis, tetapi doa tetap berangkat tanpa perlu pesan tiket.',
    'Semoga kalian selalu menjadi tempat pulang yang paling nyaman bagi satu sama lain. Saat dunia terasa berat, semoga kalian tetap bisa saling menggenggam dan sesekali saling mentraktir makanan enak, karena cinta juga butuh asupan.',
    'Semoga kalian terus saling memilih, bukan hanya saat semuanya terasa mudah, tetapi juga ketika perjalanan sedang melelahkan.',
    'Semoga rumah yang kalian bangun menjadi tempat untuk bertumbuh, bercerita, saling menguatkan, dan menemukan kebahagiaan dalam hal-hal sederhana.',
    '<strong>Bahagia selalu, Indra dan Putri! ♡</strong>'
  ];

  class SceneDirector {
    constructor(options) {
      this.audio = options.audio;
      this.game = options.game;
      this.scenes = Array.from(document.querySelectorAll('.scene'));
      this.startButton = document.getElementById('start-button');
      this.restartButton = document.getElementById('restart-button');
      this.nextButton = document.getElementById('next-letter-button');
      this.letterText = document.getElementById('letter-text');
      this.collage = document.getElementById('photo-collage');
      this.invitationLink = document.getElementById('invitation-link');
      this.currentLetter = 0;
      this.typing = false;
      this.typeTimer = 0;
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.boundAdvanceLetter = () => this.advanceLetter();
      this.bind();
      this.buildCollage();
      this.show('briefing');
    }

    bind() {
      this.startButton.addEventListener('click', () => {
        this.audio.resume();
        this.audio.sfx('click');
        this.show('game');
        this.game.start();
      });
      this.restartButton.addEventListener('click', () => this.restart());
      this.nextButton.addEventListener('click', this.boundAdvanceLetter);
      document.getElementById('scene-letter').addEventListener('click', (event) => {
        if (event.target.closest('button') || !this.isActive('letter')) return;
        this.advanceLetter();
      });
      this.invitationLink.href = window.TitipDoaAssets.invitationUrl;
    }

    isActive(name) {
      const el = document.getElementById(`scene-${name}`);
      return el && el.classList.contains('is-active');
    }

    show(name) {
      this.scenes.forEach((scene) => {
        const active = scene.id === `scene-${name}`;
        scene.classList.toggle('is-active', active);
        scene.setAttribute('aria-hidden', String(!active));
        if (active) {
          scene.removeAttribute('inert');
        } else {
          scene.setAttribute('inert', '');
        }
      });
      if (name === 'briefing') this.audio.playMusic('briefing');
      if (name === 'letter') this.audio.playMusic('letter');
    }

    onGameComplete() {
      this.show('delivery');
      this.audio.playMusic('reveal');
      window.setTimeout(() => this.audio.sfx('reveal'), 500);
      window.setTimeout(() => {
        this.show('letter');
        this.startLetter();
      }, this.reducedMotion ? 700 : 4300);
    }

    buildCollage() {
      const positions = ['left-top', 'right-top', 'left-mid', 'right-mid', 'left-low', 'right-low', 'center-back'];
      this.collage.innerHTML = window.TitipDoaAssets.photos.map((photo, index) => {
        const pos = positions[index % positions.length];
        return `<img class="collage-photo ${pos}" src="${photo.src}" alt="${photo.alt}">`;
      }).join('');
    }

    startLetter() {
      this.currentLetter = 0;
      this.letterText.innerHTML = '';
      this.nextButton.textContent = 'Lanjut';
      this.renderCurrentParagraph();
    }

    renderCurrentParagraph() {
      const html = LETTER_PARAGRAPHS[this.currentLetter];
      if (!html) {
        this.showFinal();
        return;
      }
      const p = document.createElement('p');
      p.className = 'letter-paragraph is-current';
      this.letterText.appendChild(p);

      if (this.reducedMotion) {
        p.innerHTML = html;
        this.typing = false;
        return;
      }

      this.typing = true;
      const plain = html.replace(/<[^>]*>/g, '');
      let index = 0;
      const tick = () => {
        index += 1;
        p.textContent = plain.slice(0, index);
        if (index >= plain.length) {
          p.innerHTML = html;
          this.typing = false;
          return;
        }
        this.typeTimer = window.setTimeout(tick, 24);
      };
      tick();
    }

    advanceLetter() {
      if (!this.isActive('letter')) return;
      this.audio.sfx('click');
      const current = this.letterText.querySelector('.letter-paragraph.is-current');
      if (this.typing && current) {
        window.clearTimeout(this.typeTimer);
        current.innerHTML = LETTER_PARAGRAPHS[this.currentLetter];
        this.typing = false;
        return;
      }
      if (current) current.classList.remove('is-current');
      this.currentLetter += 1;
      this.renderCurrentParagraph();
      if (this.currentLetter === LETTER_PARAGRAPHS.length - 1) {
        this.nextButton.textContent = 'Selesaikan Misi';
      }
    }

    showFinal() {
      this.audio.sfx('deliver');
      this.show('final');
    }

    restart() {
      window.clearTimeout(this.typeTimer);
      this.game.stop();
      this.game.reset();
      this.audio.sfx('click');
      this.currentLetter = 0;
      this.typing = false;
      this.letterText.innerHTML = '';
      this.show('briefing');
    }
  }

  window.SceneDirector = SceneDirector;
})();
