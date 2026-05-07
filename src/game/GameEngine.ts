export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width: number;
  private height: number;
  private isRunning: boolean = false;
  private animationId: number = 0;

  // Game state references
  public onGameOver?: () => void;
  public onScoreChange?: (score: number) => void;
  public onFlameChange?: (flame: number) => void;

  // Entities
  private player = { x: 0, y: 0, vx: 0, vy: 0, radius: 12 };
  private camera = { y: 0 };
  private lanterns: { x: number; y: number; active: boolean; type: number }[] = [];
  private echoes: { x: number; y: number; radius: number; maxRadius: number; opacity: number }[] = [];
  private staticPlatforms: { x: number; y: number; w: number; h: number }[] = [];

  // Rules
  private gravity = 0.3;
  private jumpForce = -8;
  private moveSpeed = 5;
  private maxY = 0;
  private baseFlame = 100;
  private currentFlame = 100;
  private flameDepletionRate = 0.05;

  // Input
  private isTouching = false;
  private targetX = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.width = canvas.width;
    this.height = canvas.height;
    
    this.targetX = this.width / 2;

    this.bindEvents();
    this.reset();
  }

  private bindEvents() {
    this.canvas.addEventListener('touchstart', this.handleTouchDown, { passive: false });
    this.canvas.addEventListener('touchmove', this.handleTouchMove, { passive: false });
    this.canvas.addEventListener('touchend', this.handleTouchUp);
    this.canvas.addEventListener('mousedown', this.handleMouseDown);
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    this.canvas.addEventListener('mouseup', this.handleMouseUp);
  }

  public cleanup() {
    this.isRunning = false;
    cancelAnimationFrame(this.animationId);
    this.canvas.removeEventListener('touchstart', this.handleTouchDown);
    this.canvas.removeEventListener('touchmove', this.handleTouchMove);
    this.canvas.removeEventListener('touchend', this.handleTouchUp);
    this.canvas.removeEventListener('mousedown', this.handleMouseDown);
    this.canvas.removeEventListener('mousemove', this.handleMouseMove);
    this.canvas.removeEventListener('mouseup', this.handleMouseUp);
  }

  private handleTouchDown = (e: TouchEvent) => {
    e.preventDefault();
    this.isTouching = true;
    const touch = e.touches[0];
    const rect = this.canvas.getBoundingClientRect();
    this.targetX = touch.clientX - rect.left;
    this.player.vy = this.jumpForce; // Tap to jump
  };

  private handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = this.canvas.getBoundingClientRect();
    this.targetX = touch.clientX - rect.left;
  };

  private handleTouchUp = () => {
    this.isTouching = false;
  };

  private handleMouseDown = (e: MouseEvent) => {
    this.isTouching = true;
    const rect = this.canvas.getBoundingClientRect();
    this.targetX = e.clientX - rect.left;
    this.player.vy = this.jumpForce; // Tap to jump
  };

  private handleMouseMove = (e: MouseEvent) => {
    if (this.isTouching) {
      const rect = this.canvas.getBoundingClientRect();
      this.targetX = e.clientX - rect.left;
    }
  };

  private handleMouseUp = () => {
    this.isTouching = false;
  };

  public reset() {
    this.player = {
      x: this.width / 2,
      y: this.height - 100,
      vx: 0,
      vy: 0,
      radius: 12
    };
    this.camera.y = 0;
    this.maxY = this.player.y;
    this.targetX = this.width / 2;
    this.currentFlame = this.baseFlame;
    this.lanterns = [];
    this.echoes = [];
    this.staticPlatforms = [
      { x: 0, y: this.height - 20, w: this.width, h: 20 }
    ];

    // Initial Lanterns
    for (let i = 0; i < 10; i++) {
      this.spawnLantern(this.height - 300 - i * 200);
    }
    
    if (this.onScoreChange) this.onScoreChange(0);
    if (this.onFlameChange) this.onFlameChange(this.currentFlame);
  }

  private spawnLantern(yPos: number) {
    this.lanterns.push({
      x: Math.random() * (this.width - 60) + 30,
      y: yPos,
      active: true,
      type: Math.random() > 0.8 ? 1 : 0 // 0: Normal, 1: Big boost
    });
  }

  public start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.loop();
    }
  }

  public pause() {
    this.isRunning = false;
  }

  private triggerEcho(x: number, y: number, type: number) {
    this.echoes.push({
      x, y,
      radius: 10,
      maxRadius: type === 1 ? 250 : 150,
      opacity: 1
    });
    // Boost player
    this.player.vy = type === 1 ? -18 : -14;
    // Restore flame
    this.currentFlame = Math.min(this.baseFlame, this.currentFlame + (type === 1 ? 30 : 15));
  }

  private update() {
    // Horizontal Movement towards target
    const dx = this.targetX - this.player.x;
    this.player.vx = dx * 0.1; // Smooth follow
    this.player.x += this.player.vx;

    // Constrain X
    this.player.x = Math.max(this.player.radius, Math.min(this.width - this.player.radius, this.player.x));

    // Vertical Movement
    this.player.vy += this.gravity;
    this.player.y += this.player.vy;

    // Platform collisions
    if (this.player.vy > 0) {
      for (const p of this.staticPlatforms) {
        if (this.player.x > p.x && this.player.x < p.x + p.w &&
            this.player.y + this.player.radius > p.y &&
            this.player.y - this.player.vy <= p.y) {
          this.player.y = p.y - this.player.radius;
          this.player.vy = 0;
        }
      }
    }

    // Lantern collisions
    for (const l of this.lanterns) {
      if (l.active) {
        const dist = Math.hypot(this.player.x - l.x, this.player.y - l.y);
        if (dist < this.player.radius + 20) {
          l.active = false;
          this.triggerEcho(l.x, l.y, l.type);
        }
      }
    }

    // Flame Depletion
    this.currentFlame -= this.flameDepletionRate;
    if (this.onFlameChange) this.onFlameChange(this.currentFlame);
    
    if (this.currentFlame <= 0 || this.player.y > this.camera.y + this.height + 100) {
      this.pause();
      if (this.onGameOver) this.onGameOver();
      return;
    }

    // Update Echoes
    for (const e of this.echoes) {
      e.radius += 5;
      e.opacity -= 0.02;
    }
    this.echoes = this.echoes.filter(e => e.opacity > 0);

    // Camera follow player going up
    if (this.player.y < this.camera.y + this.height / 2) {
      this.camera.y = this.player.y - this.height / 2;
    }

    // Score based on max height
    if (this.player.y < this.maxY) {
      this.maxY = this.player.y;
      const score = Math.floor((this.height - this.maxY) / 100);
      if (this.onScoreChange) this.onScoreChange(score);
      
      // Procedural generation
      const highestLantern = this.lanterns.reduce((min, l) => Math.min(min, l.y), Infinity);
      if (this.camera.y < highestLantern - 300) {
        this.spawnLantern(highestLantern - Math.random() * 200 - 100);
      }
    }

    // Garbage collect elements below camera
    this.lanterns = this.lanterns.filter(l => l.y < this.camera.y + this.height + 100);
    this.staticPlatforms = this.staticPlatforms.filter(p => p.y < this.camera.y + this.height + 100);
  }

  private draw() {
    // Clear & Background
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
    
    // Deeper into the tower = darker, deeper blues/purples
    const depth = Math.min(1, Math.max(0, -this.camera.y / 10000));
    
    const r1 = 15 - depth * 15;
    const g1 = 20 - depth * 20;
    const b1 = 40 - depth * 30;

    const r2 = 30 - depth * 30;
    const g2 = 40 - depth * 40;
    const b2 = 80 - depth * 60;

    gradient.addColorStop(0, `rgb(${r1},${g1},${b1})`);
    gradient.addColorStop(1, `rgb(${r2},${g2},${b2})`);
    
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.width, this.height);

    this.ctx.save();
    this.ctx.translate(0, -this.camera.y);

    // Grid / Tower Background lines (Parallax)
    this.ctx.strokeStyle = 'rgba(255,255,255,0.03)';
    this.ctx.lineWidth = 2;
    const yOffset = this.camera.y * 0.5 % 100;
    for (let i = -100; i < this.height + 100; i += 100) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, this.camera.y + i - yOffset);
      this.ctx.lineTo(this.width, this.camera.y + i - yOffset);
      this.ctx.stroke();
    }

    // Platforms
    this.ctx.fillStyle = '#223';
    this.ctx.shadowColor = 'rgba(0,0,0,0.5)';
    this.ctx.shadowBlur = 10;
    for (const p of this.staticPlatforms) {
      this.ctx.fillRect(p.x, p.y, p.w, p.h);
    }
    this.ctx.shadowBlur = 0;

    // Echoes
    for (const e of this.echoes) {
      this.ctx.beginPath();
      this.ctx.arc(e.x, e.y, e.radius, 0, Math.PI * 2);
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = `rgba(150, 220, 255, ${e.opacity})`;
      this.ctx.stroke();
      
      this.ctx.fillStyle = `rgba(150, 220, 255, ${e.opacity * 0.2})`;
      this.ctx.fill();
    }

    // Lanterns
    for (const l of this.lanterns) {
      if (l.active) {
        const glow = Math.sin(Date.now() / 200 + l.x) * 5 + 15;
        this.ctx.beginPath();
        this.ctx.arc(l.x, l.y, 8, 0, Math.PI * 2);
        this.ctx.fillStyle = l.type === 1 ? '#ffafcc' : '#ffc8dd';
        this.ctx.shadowColor = l.type === 1 ? '#ffafcc' : '#ffc8dd';
        this.ctx.shadowBlur = glow;
        this.ctx.fill();

        // Inner core
        this.ctx.beginPath();
        this.ctx.arc(l.x, l.y, 4, 0, Math.PI * 2);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fill();
        this.ctx.shadowBlur = 0;
      } else {
        // Extinguished
        this.ctx.beginPath();
        this.ctx.arc(l.x, l.y, 8, 0, Math.PI * 2);
        this.ctx.fillStyle = '#333';
        this.ctx.fill();
      }
    }

    // Player (The Bearer)
    this.ctx.beginPath();
    this.ctx.arc(this.player.x, this.player.y, this.player.radius, 0, Math.PI * 2);
    this.ctx.fillStyle = '#fff';
    this.ctx.shadowColor = '#fff';
    this.ctx.shadowBlur = (this.currentFlame / this.baseFlame) * 20 + 5;
    this.ctx.fill();
    this.ctx.shadowBlur = 0;

    // Flame Core (Player Inner)
    this.ctx.beginPath();
    this.ctx.arc(this.player.x, this.player.y, this.player.radius * 0.6, 0, Math.PI * 2);
    this.ctx.fillStyle = `rgba(255, ${200 * (this.currentFlame/100)}, 50, 1)`;
    this.ctx.fill();

    this.ctx.restore();
  }

  private loop = () => {
    if (!this.isRunning) return;
    this.update();
    this.draw();
    this.animationId = requestAnimationFrame(this.loop);
  };
}
