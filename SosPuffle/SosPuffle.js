// Constantes e Mapa do SOS Puffle
const TILE = 46;
const COLS = 32;
const ROWS = 22;
const MAX_SINKS = 7;

const W = 0;
const P = 1;

const level = [
  [P,P,P,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [P,P,P,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [P,P,P,W,W,W,P,P,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,P,P,W,W,W,W,P,P,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,P,P,W,W,W,W,P,P,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,P,P,W,W,W,W,W,W,W,P,P,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,P,P,W,W,W,W,W,W,W,W,W,W,W,P,P,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,P,P,W,W,W,W,W,W,W,P,P,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,P,P,W,W,W,W,W,W,W,W,W,W,W,P,P,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,P,P,W,W,W,W,W,W,W,P,P,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,P,P,W,W,W,W,P,P,W,W,W,W,W,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,P,P,W,W,W,W,W,W,W,W,P,P,W,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,P,P,W,W,W,W,P,P,W,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,P,P,W,W,W,W,W,W,W,W,P,P,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,P,P,W,W,W,W,P,P,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,P,P,W,W,W,W,W,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,P,P,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,P,P,W,W,W,W,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,P,P,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,P,P,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,P,P,W,W],
  [W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W,W]
];

// ─── TELA INICIAL (MENU DO MINIJOGO) ───────────────────────────────
class SosPuffleStartScene extends Scene {
  setup() {
    this.playBtn = new Button(width / 2, 260, 200, 60, "Jogar", () => {
      sceneManager.loadScene(new SosPuffleScene());
    });

    this.backBtn = new Button(width / 2, 340, 200, 60, "Voltar", () => {
      sceneManager.loadScene(new TownCenterScene());
    });
  }

  draw() {
    background(8, 20, 45); // Cor de fundo baseada no menu original
    fill(255);
    textAlign(CENTER);
    textSize(40);
    text("SOS Puffle", width / 2, 150);

    this.playBtn.draw();
    this.backBtn.draw();
  }

  mousePressed() {
    this.playBtn.mousePressed();
    this.backBtn.mousePressed();
  }
}

// ─── TELA PRINCIPAL DE JOGO ─────────────────────────────────────────
class SosPuffleScene extends Scene {
  setup() {
    this.waveT = 0;
    this.initGame();
  }

  initGame() {
    this.player = {
      col: 1,
      row: 1,
      scale: 1.0,
      sinks: 0,
      onPlatform: true,
      dir: { x: 1, y: 0 }
    };
    this.puffle = { col: 28, row: 19 };
    this.camX = 0;
    this.camY = 0;
    this.updateCamera(true);
  }

  updateCamera(snap) {
    let targetX = constrain(this.player.col * TILE + TILE / 2 - width / 2, 0, COLS * TILE - width);
    let targetY = constrain(this.player.row * TILE + TILE / 2 - height / 2, 0, ROWS * TILE - height);
    if (snap) {
      this.camX = targetX;
      this.camY = targetY;
    } else {
      this.camX = lerp(this.camX, targetX, 0.12);
      this.camY = lerp(this.camY, targetY, 0.12);
    }
  }

  update() {
    this.waveT += 0.04;
    this.updateCamera(false);
  }

  draw() {
    background(10, 28, 55);

    push();
    translate(-this.camX, -this.camY);
    this.drawWater();
    this.drawPlatforms();
    this.drawPuffle();
    this.drawPlayer();
    pop();

    this.drawUI();
  }

  keyPressed() {
    let dc = 0, dr = 0;
    if (keyCode === LEFT_ARROW || key === "a" || key === "A") dc = -1;
    else if (keyCode === RIGHT_ARROW || key === "d" || key === "D") dc = 1;
    else if (keyCode === UP_ARROW || key === "w" || key === "W") dr = -1;
    else if (keyCode === DOWN_ARROW || key === "s" || key === "S") dr = 1;
    else return;

    let nc = this.player.col + dc;
    let nr = this.player.row + dr;
    if (nc < 0 || nc >= COLS || nr < 0 || nr >= ROWS) return;

    if (dc !== 0 || dr !== 0) this.player.dir = { x: dc, y: dr };

    this.player.col = nc;
    this.player.row = nr;

    // Lógica de afundamento
    if (level[nr][nc] === P) {
      this.player.onPlatform = true;
      this.player.sinks = 0;
      this.player.scale = 1.0;
    } else {
      this.player.onPlatform = false;
      this.player.sinks++;
      this.player.scale = 1.0 - (this.player.sinks / MAX_SINKS) * 0.85;
      
      // Fim de jogo por afogamento (Game Over)
      if (this.player.sinks >= MAX_SINKS) {
        sceneManager.loadScene(new SosPuffleGameOverScene());
        return;
      }
    }

    // Condição de Vitória (Resgatou o Puffle)
    if (this.player.col === this.puffle.col && this.player.row === this.puffle.row) {
      GameState.coins += 40; // Adiciona moedas como recompensa
      sceneManager.loadScene(new SosPuffleVictoryScene());
    }
  }

  // Métodos de desenho adaptados do código original (usando 'this.')
  drawWater() {
    let startC = max(0, floor(this.camX / TILE));
    let endC = min(COLS, ceil((this.camX + width) / TILE));
    let startR = max(0, floor(this.camY / TILE));
    let endR = min(ROWS, ceil((this.camY + height) / TILE));

    for (let r = startR; r < endR; r++) {
      for (let c = startC; c < endC; c++) {
        if (level[r][c] === W) {
          let x = c * TILE, y = r * TILE;
          noStroke();
          fill(14, 65, 130);
          rect(x, y, TILE, TILE);
          let shine = sin(this.waveT + c * 0.7 + r * 0.5) * 0.5 + 0.5;
          fill(30, 100, 180, 40 + shine * 50);
          rect(x, y, TILE, TILE);
          let wy = y + 8 + sin(this.waveT * 0.8 + c * 0.9) * 4;
          fill(80, 160, 230, 30 + shine * 40);
          rect(x + 4, wy, TILE - 8, 5, 3);
          let wy2 = y + 22 + sin(this.waveT * 0.6 + c * 1.1 + 1) * 3;
          fill(60, 140, 210, 20 + shine * 30);
          rect(x + 8, wy2, TILE - 16, 4, 2);
        }
      }
    }
  }

  drawPlatforms() {
    let startC = max(0, floor(this.camX / TILE));
    let endC = min(COLS, ceil((this.camX + width) / TILE));
    let startR = max(0, floor(this.camY / TILE));
    let endR = min(ROWS, ceil((this.camY + height) / TILE));

    for (let r = startR; r < endR; r++) {
      for (let c = startC; c < endC; c++) {
        if (level[r][c] === P) {
          let x = c * TILE, y = r * TILE;
          fill(160, 215, 245);
          stroke(120, 180, 220);
          strokeWeight(1);
          rect(x, y, TILE, TILE, 3);
          noStroke();
          fill(210, 240, 255, 180);
          rect(x + 3, y + 3, TILE - 6, 8, 2);
          stroke(140, 190, 225, 120);
          strokeWeight(1);
          line(x + 10, y + 15, x + 20, y + 25);
          line(x + 25, y + 12, x + 32, y + 18);
          noStroke();
          fill(100, 160, 200, 60);
          rect(x, y + TILE - 6, TILE, 6, 2);
        }
      }
    }
  }

  drawPlayer() {
    let s = this.player.scale;
    let cx = this.player.col * TILE + TILE / 2;
    let sinkOffset = (1 - s) * TILE * 0.45;
    let cy = this.player.row * TILE + TILE / 2 + sinkOffset;

    push();
    translate(cx, cy);
    scale(s);
    let angle = atan2(this.player.dir.y, this.player.dir.x);
    rotate(angle + HALF_PI);

    if (!this.player.onPlatform) {
      noFill();
      stroke(80, 160, 220, 50);
      strokeWeight(2);
      ellipse(0, 0, 52, 52);
      stroke(80, 160, 220, 25);
      ellipse(0, 0, 66, 66);
    }

    noStroke();
    fill(0, 0, 0, 35 * s);
    ellipse(0, 3, 36, 18);
    fill(255, 140, 0);
    noStroke();
    
    push(); translate(-8, 11); rotate(-0.3); ellipse(0, 0, 9, 14); pop();
    push(); translate(8, 11); rotate(0.3); ellipse(0, 0, 9, 14); pop();

    fill(30, 80, 185);
    noStroke();
    ellipse(0, 0, 34, 38);
    fill(240, 245, 255);
    ellipse(0, -4, 18, 22);
    fill(55, 110, 210, 160);
    ellipse(-5, -6, 12, 14);
    fill(255, 150, 0);
    noStroke();
    triangle(-5, -17, 5, -17, 0, -26);
    fill(200, 110, 0);
    rect(-5, -19, 10, 4, 1);

    fill(255); ellipse(-10, -10, 9, 9);
    fill(20, 20, 50); ellipse(-10, -10, 5, 5);
    fill(255); ellipse(-8, -12, 2, 2);

    fill(255); ellipse(10, -10, 9, 9);
    fill(20, 20, 50); ellipse(10, -10, 5, 5);
    fill(255); ellipse(12, -12, 2, 2);

    if (this.player.sinks >= MAX_SINKS - 2 && !this.player.onPlatform) {
      stroke(80, 40, 0); strokeWeight(1.5); noFill();
      line(-13, -16, -7, -13);
      line(7, -13, 13, -16);
    }
    pop();
  }

  drawPuffle() {
    let bounce = sin(this.waveT * 2.2) * 3;
    let squish = 1 + sin(this.waveT * 2.2) * 0.06;
    let px = this.puffle.col * TILE + TILE / 2;
    let py = this.puffle.row * TILE + TILE / 2 + bounce;

    push();
    translate(px, py);
    noStroke();
    fill(255, 80, 40, 18);
    ellipse(0, 2, 54, 54);

    fill(210, 55, 20);
    let furCount = 12;
    for (let i = 0; i < furCount; i++) {
      let a = (TWO_PI / furCount) * i + this.waveT * 0.1;
      let fx = cos(a) * 16;
      let fy = sin(a) * 16 * squish;
      let fs = 7 + sin(a * 3 + this.waveT) * 2;
      ellipse(fx, fy, fs, fs);
    }

    fill(230, 60, 30);
    noStroke();
    ellipse(0, 0, 28 * squish, 28 / squish);
    fill(255, 120, 80, 160);
    ellipse(-4, -5, 12, 12);
    fill(210, 45, 15);
    
    push();
    translate(0, -14);
    rotate(-0.2); ellipse(-5, -5, 7, 10);
    rotate(0.2); ellipse(0, -7, 7, 11);
    rotate(0.2); ellipse(5, -5, 7, 10);
    pop();

    fill(255); ellipse(-7, -3, 13, 13);
    fill(20, 20, 50); ellipse(-6, -3, 8, 8);
    fill(255); ellipse(-4, -6, 2.5, 2.5);

    fill(255); ellipse(7, -3, 13, 13);
    fill(20, 20, 50); ellipse(8, -3, 8, 8);
    fill(255); ellipse(10, -6, 2.5, 2.5);

    stroke(160, 30, 10); strokeWeight(1.5); noFill();
    arc(0, 5, 10, 7, 0, PI);
    pop();
  }

  drawUI() {
    let barW = 160, barH = 20;
    let x = 10, y = 10;

    noStroke(); fill(0, 0, 0, 160); rect(x, y, barW, barH, 6);

    let ratio = 1 - this.player.sinks / MAX_SINKS;
    let barColor = lerpColor(color(255, 60, 60), color(80, 200, 255), ratio);
    fill(barColor);
    rect(x + 2, y + 2, (barW - 4) * ratio, barH - 4, 5);
    fill(255, 255, 255, 30);
    rect(x + 2, y + 2, (barW - 4) * ratio, (barH - 4) * 0.4, 5);

    fill(255); noStroke(); textSize(10); textAlign(LEFT, CENTER);
    text("FÔLEGO", x + 6, y + barH / 2);

    fill(200, 230, 255); textAlign(RIGHT, CENTER);
    text((MAX_SINKS - this.player.sinks) + " nados", x + barW - 4, y + barH / 2);

    this.drawMinimap();
  }

  drawMinimap() {
    let mW = 120, mH = 80;
    let mx = width - mW - 10, my = 10;
    let scaleX = mW / (COLS * TILE);
    let scaleY = mH / (ROWS * TILE);

    noStroke(); fill(0, 0, 0, 160); rect(mx, my, mW, mH, 4);

    fill(160, 215, 245, 200);
    for (let r = 0; r < ROWS; r++)
      for (let c = 0; c < COLS; c++)
        if (level[r][c] === P)
          rect(mx + c * TILE * scaleX, my + r * TILE * scaleY, TILE * scaleX, TILE * scaleY);

    fill(230, 60, 30);
    ellipse(mx + this.puffle.col * TILE * scaleX + (TILE * scaleX) / 2, my + this.puffle.row * TILE * scaleY + (TILE * scaleY) / 2, 5, 5);

    fill(30, 80, 185);
    ellipse(mx + this.player.col * TILE * scaleX + (TILE * scaleX) / 2, my + this.player.row * TILE * scaleY + (TILE * scaleY) / 2, 5, 5);

    stroke(255, 255, 255, 80); strokeWeight(1); noFill();
    rect(mx + this.camX * scaleX, my + this.camY * scaleY, width * scaleX, height * scaleY, 2);
  }
}

// ─── TELA DE VITÓRIA ──────────────────────────────────────────────────
class SosPuffleVictoryScene extends Scene {
  draw() {
    background(20, 100, 40);
    fill(255);
    textAlign(CENTER);
    textSize(40);
    text("PUFFLE SALVO!", width / 2, 150);

    textSize(24);
    text("Você ganhou 40 moedas!", width / 2, 220);
    text("Clique para voltar", width / 2, 320);
  }

  mousePressed() {
    sceneManager.loadScene(new TownCenterScene());
  }
}

// ─── TELA DE GAME OVER ────────────────────────────────────────────────
class SosPuffleGameOverScene extends Scene {
  draw() {
    background(100, 20, 20);
    fill(255);
    textAlign(CENTER);
    textSize(40);
    text("AFUNDOU!", width / 2, 150);
    
    textSize(24);
    text("Seu pinguim ficou sem fôlego.", width / 2, 220);
    text("Clique para voltar ao centro", width / 2, 320);
  }

  mousePressed() {
    sceneManager.loadScene(new TownCenterScene());
  }
}