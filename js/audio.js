(function () {
  class AudioDirector {
    constructor(toggleButton) {
      this.toggleButton = toggleButton;
      this.context = null;
      this.master = null;
      this.musicGain = null;
      this.sfxGain = null;
      this.currentMusic = null;
      this.muted = false;
      this.available = true;
      this.scene = 'idle';

      if (this.toggleButton) {
        this.toggleButton.addEventListener('click', () => this.toggleMute());
      }
    }

    init() {
      if (this.context || !this.available) return;
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        if (!Ctx) {
          this.available = false;
          return;
        }
        this.context = new Ctx();
        this.master = this.context.createGain();
        this.musicGain = this.context.createGain();
        this.sfxGain = this.context.createGain();
        this.musicGain.gain.value = 0.18;
        this.sfxGain.gain.value = 0.22;
        this.master.gain.value = this.muted ? 0 : 1;
        this.musicGain.connect(this.master);
        this.sfxGain.connect(this.master);
        this.master.connect(this.context.destination);
      } catch (error) {
        this.available = false;
      }
    }

    resume() {
      this.init();
      if (this.context && this.context.state === 'suspended') {
        this.context.resume().catch(() => {});
      }
    }

    toggleMute() {
      this.muted = !this.muted;
      if (this.master) {
        this.master.gain.setTargetAtTime(this.muted ? 0 : 1, this.context.currentTime, 0.03);
      }
      if (this.toggleButton) {
        this.toggleButton.setAttribute('aria-pressed', String(this.muted));
        this.toggleButton.setAttribute('aria-label', this.muted ? 'Nyalakan suara' : 'Bisukan suara');
        this.toggleButton.classList.toggle('is-muted', this.muted);
      }
    }

    playMusic(scene) {
      this.resume();
      if (!this.context || this.scene === scene) return;
      this.scene = scene;
      this.stopMusic();

      const patterns = {
        briefing: [220, 277, 330, 277],
        gameplay: [262, 330, 392, 330, 440, 392],
        reveal: [196, 247, 294, 392],
        letter: [220, 330, 370, 440]
      };
      const tempo = scene === 'gameplay' ? 0.22 : 0.48;
      const wave = scene === 'reveal' || scene === 'letter' ? 'sine' : 'square';
      const gain = this.context.createGain();
      gain.gain.value = 0;
      gain.connect(this.musicGain);
      gain.gain.setTargetAtTime(1, this.context.currentTime, 0.35);

      let step = 0;
      const playStep = () => {
        if (!this.context || !this.currentMusic || this.currentMusic.scene !== scene) return;
        const now = this.context.currentTime;
        const osc = this.context.createOscillator();
        const noteGain = this.context.createGain();
        const notes = patterns[scene] || patterns.briefing;
        osc.type = wave;
        osc.frequency.value = notes[step % notes.length];
        noteGain.gain.setValueAtTime(0.0001, now);
        noteGain.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + tempo * 0.86);
        osc.connect(noteGain);
        noteGain.connect(gain);
        osc.start(now);
        osc.stop(now + tempo);
        step += 1;
      };

      this.currentMusic = {
        scene,
        gain,
        timer: window.setInterval(playStep, tempo * 1000)
      };
      playStep();
    }

    stopMusic() {
      if (!this.currentMusic) return;
      window.clearInterval(this.currentMusic.timer);
      if (this.context) {
        this.currentMusic.gain.gain.setTargetAtTime(0.0001, this.context.currentTime, 0.18);
      }
      this.currentMusic = null;
    }

    sfx(type) {
      this.resume();
      if (!this.context) return;
      const now = this.context.currentTime;
      const osc = this.context.createOscillator();
      const gain = this.context.createGain();
      const map = {
        jump: [520, 0.09, 'triangle'],
        stumble: [110, 0.18, 'sawtooth'],
        collect: [760, 0.16, 'sine'],
        deliver: [440, 0.24, 'triangle'],
        reveal: [880, 0.7, 'sine'],
        click: [320, 0.06, 'square']
      };
      const [freq, duration, wave] = map[type] || map.click;
      osc.type = wave;
      osc.frequency.setValueAtTime(freq, now);
      if (type === 'collect' || type === 'reveal') {
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + duration);
      }
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.2, now + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
      osc.connect(gain);
      gain.connect(this.sfxGain || this.context.destination);
      osc.start(now);
      osc.stop(now + duration + 0.02);
    }
  }

  window.AudioDirector = AudioDirector;
})();
