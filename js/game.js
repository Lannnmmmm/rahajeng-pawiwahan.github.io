(function () {
  class DeliveryGame {
    constructor(options) {
      this.canvas = options.canvas;
      this.ctx = this.canvas.getContext('2d');
      this.jumpButton = options.jumpButton;
      this.collectibleRow = options.collectibleRow;
      this.audio = options.audio;
      this.onComplete = options.onComplete;
      this.inputTarget = options.inputTarget || this.canvas;
      this.pixelRatio = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      this.boundLoop = (time) => this.loop(time);
      this.keysDown = new Set();
      this.started = false;
      this.running = false;
      this.raf = 0;
      this.lastTime = 0;
      this.listenersReady = false;
      this.reset();
      this.bind();
      this.resize();
    }

    bind() {
      if (this.listenersReady) return;
      this.listenersReady = true;
      window.addEventListener('resize', () => this.resize());
      window.addEventListener('keydown', (event) => {
        if (!this.running || (event.code !== 'Space' && event.code !== 'ArrowUp')) return;
        event.preventDefault();
        if (this.keysDown.has(event.code)) return;
        this.keysDown.add(event.code);
        this.tryJump();
      });
      window.addEventListener('keyup', (event) => {
        this.keysDown.delete(event.code);
      });
      const touchJump = (event) => {
        if (!this.running) return;
        event.preventDefault();
        this.tryJump();
      };
      this.canvas.addEventListener('pointerdown', touchJump);
      this.jumpButton.addEventListener('pointerdown', touchJump);
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      const width = Math.max(320, Math.round(rect.width));
      const height = Math.max(260, Math.round(rect.height));
      this.canvas.width = Math.round(width * this.pixelRatio);
      this.canvas.height = Math.round(height * this.pixelRatio);
      this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
      this.width = width;
      this.height = height;
      this.groundY = height - 74;
      this.draw();
    }

    reset() {
      this.worldX = 0;
      this.speed = 180;
      this.distanceToGate = 3450;
      this.player = { x: 160, y: 0, vy: 0, w: 34, h: 52, grounded: true, stumbling: 0 };
      this.obstacles = [
        { x: 560, w: 42, h: 40, hit: false },
        { x: 1180, w: 50, h: 48, hit: false },
        { x: 1840, w: 44, h: 42, hit: false },
        { x: 2560, w: 54, h: 48, hit: false }
      ];
      this.collectibles = [
        { x: 860, y: -108, label: 'Cinta', got: false },
        { x: 1510, y: -132, label: 'Kesabaran', got: false },
        { x: 2260, y: -116, label: 'Kebahagiaan', got: false }
      ];
      this.collected = [];
      this.completed = false;
      this.player.y = this.groundY ? this.groundY - this.player.h : 320;
      this.renderCollectibles();
    }

    start() {
      this.reset();
      this.started = true;
      this.running = true;
      this.lastTime = performance.now();
      this.startTime = this.lastTime;
      this.audio.playMusic('gameplay');
      cancelAnimationFrame(this.raf);
      this.raf = requestAnimationFrame(this.boundLoop);
    }

    stop() {
      this.running = false;
      cancelAnimationFrame(this.raf);
      this.keysDown.clear();
    }

    tryJump() {
      if (!this.player.grounded || this.player.stumbling > 0) return;
      this.player.vy = -520;
      this.player.grounded = false;
      this.audio.sfx('jump');
    }

    loop(time) {
      if (!this.running) return;
      const dt = Math.min(0.18, (time - this.lastTime) / 1000);
      this.lastTime = time;
      this.update(dt);
      this.draw();
      this.raf = requestAnimationFrame(this.boundLoop);
    }

    update(dt) {
      const elapsedDistance = ((performance.now() - this.startTime) / 1000) * this.speed;
      this.worldX = Math.max(this.worldX + this.speed * dt, elapsedDistance);
      this.player.vy += 1380 * dt;
      this.player.y += this.player.vy * dt;
      if (this.player.y >= this.groundY - this.player.h) {
        this.player.y = this.groundY - this.player.h;
        this.player.vy = 0;
        this.player.grounded = true;
      }
      if (this.player.stumbling > 0) {
        this.player.stumbling = Math.max(0, this.player.stumbling - dt);
      }
      this.checkCollisions();
      if (!this.completed && this.worldX >= this.distanceToGate) {
        this.completed = true;
        this.stop();
        this.audio.sfx('deliver');
        this.onComplete();
      }
    }

    screenX(worldX) {
      return this.player.x + (worldX - this.worldX);
    }

    checkCollisions() {
      const playerBox = {
        x: this.player.x + 4,
        y: this.player.y + 4,
        w: this.player.w - 8,
        h: this.player.h - 5
      };
      this.obstacles.forEach((obstacle) => {
        if (obstacle.hit) return;
        const x = this.screenX(obstacle.x);
        const box = { x, y: this.groundY - obstacle.h, w: obstacle.w, h: obstacle.h };
        if (this.overlap(playerBox, box)) {
          obstacle.hit = true;
          this.player.stumbling = 0.55;
          this.audio.sfx('stumble');
        }
      });
      this.collectibles.forEach((item) => {
        if (item.got) return;
        const x = this.screenX(item.x);
        const y = this.groundY + item.y;
        if (this.overlap(playerBox, { x, y, w: 28, h: 28 })) {
          item.got = true;
          this.collected.push(item.label);
          this.audio.sfx('collect');
          this.renderCollectibles();
        }
      });
    }

    overlap(a, b) {
      return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
    }

    renderCollectibles() {
      if (!this.collectibleRow) return;
      const labels = ['Cinta', 'Kesabaran', 'Kebahagiaan'];
      this.collectibleRow.innerHTML = labels.map((label) => {
        const active = this.collected.includes(label) ? ' is-collected' : '';
        return `<span class="collectible-pill${active}">${label}</span>`;
      }).join('');
    }

    draw() {
      const ctx = this.ctx;
      const w = this.width || this.canvas.clientWidth;
      const h = this.height || this.canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      this.drawSky(ctx, w, h);
      this.drawWorld(ctx, w, h);
      this.drawCourier(ctx);
    }

    drawSky(ctx, w, h) {
      const sky = ctx.createLinearGradient(0, 0, 0, h);
      sky.addColorStop(0, '#a9d8f4');
      sky.addColorStop(0.55, '#f8d99e');
      sky.addColorStop(1, '#7db276');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(255,255,255,0.8)';
      for (let i = 0; i < 5; i += 1) {
        const x = ((i * 260 - this.worldX * 0.25) % (w + 180)) - 70;
        const y = 42 + (i % 3) * 34;
        ctx.fillRect(x, y, 76, 18);
        ctx.fillRect(x + 18, y - 12, 48, 18);
      }
    }

    drawWorld(ctx, w, h) {
      const ground = this.groundY;
      ctx.fillStyle = '#5f8f55';
      ctx.fillRect(0, ground, w, h - ground);
      ctx.fillStyle = '#486b3d';
      ctx.fillRect(0, ground, w, 8);

      for (let x = -80 - (this.worldX % 80); x < w + 100; x += 80) {
        ctx.fillStyle = '#446b42';
        ctx.fillRect(x, ground + 24, 38, 10);
      }

      this.obstacles.forEach((obstacle) => {
        const x = this.screenX(obstacle.x);
        if (x < -80 || x > w + 80) return;
        ctx.fillStyle = obstacle.hit ? '#9f7f59' : '#8b5c3f';
        ctx.fillRect(x, ground - obstacle.h, obstacle.w, obstacle.h);
        ctx.fillStyle = '#b37a52';
        ctx.fillRect(x + 6, ground - obstacle.h + 8, obstacle.w - 12, 8);
      });

      this.collectibles.forEach((item) => {
        if (item.got) return;
        const x = this.screenX(item.x);
        const y = ground + item.y;
        if (x < -60 || x > w + 60) return;
        ctx.fillStyle = '#fff2a8';
        ctx.beginPath();
        ctx.arc(x + 14, y + 14, 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#d95d7b';
        ctx.fillRect(x + 9, y + 9, 10, 10);
        ctx.fillRect(x + 6, y + 12, 16, 8);
      });

      const gateX = this.screenX(this.distanceToGate + 160);
      if (gateX < w + 220) {
        ctx.fillStyle = '#986c42';
        ctx.fillRect(gateX, ground - 132, 22, 132);
        ctx.fillRect(gateX + 142, ground - 132, 22, 132);
        ctx.fillStyle = '#d9ad6f';
        ctx.fillRect(gateX - 12, ground - 138, 188, 20);
        ctx.fillStyle = '#fff1c2';
        ctx.fillRect(gateX + 34, ground - 104, 94, 42);
      }
    }

    drawCourier(ctx) {
      const p = this.player;
      const bob = p.grounded ? Math.sin(this.worldX * 0.08) * 2 : 0;
      const tilt = p.stumbling > 0 ? Math.sin(p.stumbling * 38) * 5 : 0;
      const x = p.x;
      const y = p.y + bob;
      ctx.save();
      ctx.translate(x + p.w / 2, y + p.h / 2);
      ctx.rotate((tilt * Math.PI) / 180);
      ctx.translate(-p.w / 2, -p.h / 2);
      ctx.imageSmoothingEnabled = false;
      ctx.fillStyle = '#4f2f2a';
      ctx.fillRect(10, 0, 16, 14);
      ctx.fillStyle = '#f1b678';
      ctx.fillRect(8, 10, 20, 14);
      ctx.fillStyle = '#2f6f91';
      ctx.fillRect(6, 24, 24, 20);
      ctx.fillStyle = '#f4e0a2';
      ctx.fillRect(24, 27, 20, 13);
      ctx.fillStyle = '#b98a35';
      ctx.fillRect(24, 27, 20, 3);
      ctx.fillStyle = '#26384f';
      ctx.fillRect(7, 44, 8, 8);
      ctx.fillRect(22, 44, 8, 8);
      ctx.restore();
    }
  }

  window.DeliveryGame = DeliveryGame;
})();
