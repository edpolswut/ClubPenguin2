const TILE = 46;
const COLS = 32;
const ROWS = 22;
const MAX_SINKS = 7;

const W = 0;
const P = 1;

const level = [
  [
    P,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
  ],
  [
    P,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
  ],
  [
    P,
    P,
    P,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
  ],
  [
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
  ],
  [
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
  ],
  [
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
  ],
  [
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
  ],
  [
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
  ],
  [
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
  ],
  [
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
  ],
  [
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
  ],
  [
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
  ],
  [
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
  ],
  [
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
  ],
  [
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
  ],
  [
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
  ],
  [
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
  ],
  [
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
    W,
    W,
    W,
    W,
  ],
  [
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
  ],
  [
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
  ],
  [
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    P,
    P,
    W,
    W,
  ],
  [
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
    W,
  ],
];

const VIEW_W = 17 * TILE;
const VIEW_H = 12 * TILE;

let player, puffle, waveT, gameState;
let camX, camY;

function setup() {
  createCanvas(VIEW_W, VIEW_H);
  waveT = 0;
  initGame();
}

function initGame() {
  player = {
    col: 1,
    row: 1,
    scale: 1.0,
    sinks: 0,
    onPlatform: true,
    dir: { x: 1, y: 0 }, // direção do último movimento
  };
  puffle = { col: 28, row: 19 };
  gameState = "playing";
  updateCamera(true);
}

function updateCamera(snap) {
  let targetX = constrain(
    player.col * TILE + TILE / 2 - VIEW_W / 2,
    0,
    COLS * TILE - VIEW_W,
  );
  let targetY = constrain(
    player.row * TILE + TILE / 2 - VIEW_H / 2,
    0,
    ROWS * TILE - VIEW_H,
  );
  if (snap) {
    camX = targetX;
    camY = targetY;
  } else {
    camX = lerp(camX, targetX, 0.12);
    camY = lerp(camY, targetY, 0.12);
  }
}

function draw() {
  waveT += 0.04;
  updateCamera(false);
  background(10, 28, 55);

  push();
  translate(-camX, -camY);
  drawWater();
  drawPlatforms();
  drawPuffle();
  drawPlayer();
  pop();

  drawUI();

  if (gameState === "gameover")
    drawOverlay("AFUNDOU!", color(220, 80, 80), "R para tentar de novo");
  if (gameState === "win")
    drawOverlay("PUFFLE SALVO!", color(80, 220, 160), "R para jogar de novo");
}

// ─── PENGUIN (top-down, estilo Club Penguin) ───────────────────────────────
function drawPlayer() {
  let s = player.scale;
  let cx = player.col * TILE + TILE / 2;
  let sinkOffset = (1 - s) * TILE * 0.45;
  let cy = player.row * TILE + TILE / 2 + sinkOffset;

  push();
  translate(cx, cy);
  scale(s);

  // Roda para apontar na direção do movimento
  let angle = atan2(player.dir.y, player.dir.x);
  rotate(angle + HALF_PI); // +HALF_PI porque o pinguim "aponta" pra cima por padrão

  // Ondinha na água
  if (!player.onPlatform) {
    noFill();
    stroke(80, 160, 220, 50);
    strokeWeight(2);
    ellipse(0, 0, 52, 52);
    stroke(80, 160, 220, 25);
    ellipse(0, 0, 66, 66);
  }

  // Sombra
  noStroke();
  fill(0, 0, 0, 35 * s);
  ellipse(0, 3, 36, 18);

  // Pezinhos laranjas (aparecem atrás do corpo)
  fill(255, 140, 0);
  noStroke();
  // pé esquerdo
  push();
  translate(-8, 11);
  rotate(-0.3);
  ellipse(0, 0, 9, 14);
  pop();
  // pé direito
  push();
  translate(8, 11);
  rotate(0.3);
  ellipse(0, 0, 9, 14);
  pop();

  // Corpo azul escuro (visão top-down → oval achatada)
  fill(30, 80, 185);
  noStroke();
  ellipse(0, 0, 34, 38);

  // Barriga branca (parte frontal, top-down aparece como elipse menor na frente)
  fill(240, 245, 255);
  ellipse(0, -4, 18, 22);

  // Detalhe de volume no corpo (highlight)
  fill(55, 110, 210, 160);
  ellipse(-5, -6, 12, 14);

  // Bico laranja (aponta para frente = topo da sprite)
  fill(255, 150, 0);
  noStroke();
  // Bico: triângulo apontado pra cima
  triangle(-5, -17, 5, -17, 0, -26);
  // Base do bico (linha de separação)
  fill(200, 110, 0);
  rect(-5, -19, 10, 4, 1);

  // Olhos (um de cada lado, visão top-down)
  // olho esquerdo
  fill(255);
  ellipse(-10, -10, 9, 9);
  fill(20, 20, 50);
  ellipse(-10, -10, 5, 5);
  fill(255);
  ellipse(-8, -12, 2, 2);

  // olho direito
  fill(255);
  ellipse(10, -10, 9, 9);
  fill(20, 20, 50);
  ellipse(10, -10, 5, 5);
  fill(255);
  ellipse(12, -12, 2, 2);

  // Expressão de desespero nos últimos nados
  if (player.sinks >= MAX_SINKS - 2 && !player.onPlatform) {
    stroke(80, 40, 0);
    strokeWeight(1.5);
    noFill();
    // Sobrancelhas preocupadas
    line(-13, -16, -7, -13);
    line(7, -13, 13, -16);
  }

  pop();
}

// ─── PUFFLE (estilo Club Penguin) ──────────────────────────────────────────
function drawPuffle() {
  let bounce = sin(waveT * 2.2) * 3;
  let squish = 1 + sin(waveT * 2.2) * 0.06;
  let px = puffle.col * TILE + TILE / 2;
  let py = puffle.row * TILE + TILE / 2 + bounce;

  push();
  translate(px, py);

  // Brilho/glow
  noStroke();
  fill(255, 80, 40, 18);
  ellipse(0, 2, 54, 54);

  // Pelo felpudo ao redor (círculos pequenos irregulares na borda)
  fill(210, 55, 20); // vermelho escuro para o pelo
  let furCount = 12;
  for (let i = 0; i < furCount; i++) {
    let a = (TWO_PI / furCount) * i + waveT * 0.1;
    let fx = cos(a) * 16;
    let fy = sin(a) * 16 * squish;
    let fs = 7 + sin(a * 3 + waveT) * 2;
    ellipse(fx, fy, fs, fs);
  }

  // Corpo principal vermelho
  fill(230, 60, 30);
  noStroke();
  ellipse(0, 0, 28 * squish, 28 / squish);

  // Highlight de volume
  fill(255, 120, 80, 160);
  ellipse(-4, -5, 12, 12);

  // Tufão de pelo no topo (3 mechões)
  fill(210, 45, 15);
  push();
  translate(0, -14);
  rotate(-0.2);
  ellipse(-5, -5, 7, 10);
  rotate(0.2);
  ellipse(0, -7, 7, 11);
  rotate(0.2);
  ellipse(5, -5, 7, 10);
  pop();

  // Olho esquerdo
  fill(255);
  ellipse(-7, -3, 13, 13);
  fill(20, 20, 50);
  ellipse(-6, -3, 8, 8);
  fill(255);
  ellipse(-4, -6, 2.5, 2.5);

  // Olho direito
  fill(255);
  ellipse(7, -3, 13, 13);
  fill(20, 20, 50);
  ellipse(8, -3, 8, 8);
  fill(255);
  ellipse(10, -6, 2.5, 2.5);

  // Boquinha feliz
  stroke(160, 30, 10);
  strokeWeight(1.5);
  noFill();
  arc(0, 5, 10, 7, 0, PI);

  pop();
}

// ─── CENÁRIO ───────────────────────────────────────────────────────────────
function drawWater() {
  let startC = max(0, floor(camX / TILE));
  let endC = min(COLS, ceil((camX + VIEW_W) / TILE));
  let startR = max(0, floor(camY / TILE));
  let endR = min(ROWS, ceil((camY + VIEW_H) / TILE));

  for (let r = startR; r < endR; r++) {
    for (let c = startC; c < endC; c++) {
      if (level[r][c] === W) {
        let x = c * TILE,
          y = r * TILE;
        noStroke();
        fill(14, 65, 130);
        rect(x, y, TILE, TILE);
        let shine = sin(waveT + c * 0.7 + r * 0.5) * 0.5 + 0.5;
        fill(30, 100, 180, 40 + shine * 50);
        rect(x, y, TILE, TILE);
        let wy = y + 8 + sin(waveT * 0.8 + c * 0.9) * 4;
        fill(80, 160, 230, 30 + shine * 40);
        rect(x + 4, wy, TILE - 8, 5, 3);
        let wy2 = y + 22 + sin(waveT * 0.6 + c * 1.1 + 1) * 3;
        fill(60, 140, 210, 20 + shine * 30);
        rect(x + 8, wy2, TILE - 16, 4, 2);
      }
    }
  }
}

function drawPlatforms() {
  let startC = max(0, floor(camX / TILE));
  let endC = min(COLS, ceil((camX + VIEW_W) / TILE));
  let startR = max(0, floor(camY / TILE));
  let endR = min(ROWS, ceil((camY + VIEW_H) / TILE));

  for (let r = startR; r < endR; r++) {
    for (let c = startC; c < endC; c++) {
      if (level[r][c] === P) {
        let x = c * TILE,
          y = r * TILE;
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

// ─── UI ────────────────────────────────────────────────────────────────────
function drawUI() {
  let barW = 160,
    barH = 20;
  let x = 10,
    y = 10;

  noStroke();
  fill(0, 0, 0, 160);
  rect(x, y, barW, barH, 6);

  let ratio = 1 - player.sinks / MAX_SINKS;
  let barColor = lerpColor(color(255, 60, 60), color(80, 200, 255), ratio);
  fill(barColor);
  rect(x + 2, y + 2, (barW - 4) * ratio, barH - 4, 5);
  fill(255, 255, 255, 30);
  rect(x + 2, y + 2, (barW - 4) * ratio, (barH - 4) * 0.4, 5);

  fill(255);
  noStroke();
  textSize(10);
  textAlign(LEFT, CENTER);
  text("FOLEGO", x + 6, y + barH / 2);

  fill(200, 230, 255);
  textAlign(RIGHT, CENTER);
  text(MAX_SINKS - player.sinks + " nados", x + barW - 4, y + barH / 2);

  drawMinimap();
}

function drawMinimap() {
  let mW = 120,
    mH = 80;
  let mx = VIEW_W - mW - 10,
    my = 10;
  let scaleX = mW / (COLS * TILE);
  let scaleY = mH / (ROWS * TILE);

  noStroke();
  fill(0, 0, 0, 160);
  rect(mx, my, mW, mH, 4);

  fill(160, 215, 245, 200);
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (level[r][c] === P)
        rect(
          mx + c * TILE * scaleX,
          my + r * TILE * scaleY,
          TILE * scaleX,
          TILE * scaleY,
        );

  fill(230, 60, 30);
  ellipse(
    mx + puffle.col * TILE * scaleX + (TILE * scaleX) / 2,
    my + puffle.row * TILE * scaleY + (TILE * scaleY) / 2,
    5,
    5,
  );

  fill(30, 80, 185);
  ellipse(
    mx + player.col * TILE * scaleX + (TILE * scaleX) / 2,
    my + player.row * TILE * scaleY + (TILE * scaleY) / 2,
    5,
    5,
  );

  stroke(255, 255, 255, 80);
  strokeWeight(1);
  noFill();
  rect(
    mx + camX * scaleX,
    my + camY * scaleY,
    VIEW_W * scaleX,
    VIEW_H * scaleY,
    2,
  );
}

function drawOverlay(msg, col, sub) {
  fill(0, 0, 0, 170);
  noStroke();
  rect(0, 0, width, height);
  textAlign(CENTER, CENTER);
  fill(col);
  textSize(38);
  text(msg, width / 2, height / 2 - 22);
  fill(180, 210, 240);
  textSize(15);
  text(sub, width / 2, height / 2 + 22);
}

// ─── INPUT ─────────────────────────────────────────────────────────────────
function keyPressed() {
  if (gameState !== "playing") {
    if (key === "r" || key === "R") initGame();
    return false;
  }

  let dc = 0,
    dr = 0;
  if (keyCode === LEFT_ARROW || key === "a" || key === "A") dc = -1;
  else if (keyCode === RIGHT_ARROW || key === "d" || key === "D") dc = 1;
  else if (keyCode === UP_ARROW || key === "w" || key === "W") dr = -1;
  else if (keyCode === DOWN_ARROW || key === "s" || key === "S") dr = 1;
  else return;

  let nc = player.col + dc;
  let nr = player.row + dr;
  if (nc < 0 || nc >= COLS || nr < 0 || nr >= ROWS) return false;

  // Salva direção do movimento
  if (dc !== 0 || dr !== 0) player.dir = { x: dc, y: dr };

  player.col = nc;
  player.row = nr;

  if (level[nr][nc] === P) {
    player.onPlatform = true;
    player.sinks = 0;
    player.scale = 1.0;
  } else {
    player.onPlatform = false;
    player.sinks++;
    player.scale = 1.0 - (player.sinks / MAX_SINKS) * 0.85;
    if (player.sinks >= MAX_SINKS) gameState = "gameover";
  }

  if (player.col === puffle.col && player.row === puffle.row) gameState = "win";

  return false;
}

// ─────────────────────────────────────────────────────────────────────────
// ─── ADICIONADO: BOTÕES DE FIM DE JOGO (jogar de novo / menu principal) ───
// Nada do código acima foi alterado. Esta seção só ADICIONA elementos
// HTML (via p5.dom) por cima do canvas, controlados de forma independente
// do draw()/keyPressed() originais.
// ─────────────────────────────────────────────────────────────────────────

let _btnContainer, _btnRestart, _btnMenu, _menuOverlay;
let _endUIReady = false;
let _lastUIState = null;

function _styleBtn(btn, bg) {
  btn.style("padding", "10px 20px");
  btn.style("font-size", "14px");
  btn.style("font-weight", "bold");
  btn.style("font-family", "Arial, sans-serif");
  btn.style("border", "none");
  btn.style("border-radius", "8px");
  btn.style("cursor", "pointer");
  btn.style("background", bg);
  btn.style("color", "#fff");
  btn.style("box-shadow", "0 2px 6px rgba(0,0,0,0.4)");
}

function _buildEndUI() {
  // Container dos botões "Jogar de novo" / "Menu principal" (aparece no fim do jogo)
  _btnContainer = createDiv("");
  _btnContainer.style("position", "absolute");
  _btnContainer.style("display", "none");
  _btnContainer.style("flex-direction", "row");
  _btnContainer.style("gap", "12px");
  _btnContainer.style("z-index", "30");

  _btnRestart = createButton("Jogar de novo");
  _styleBtn(_btnRestart, "linear-gradient(180deg,#3fb6f0,#1f8fd0)");
  _btnRestart.parent(_btnContainer);
  _btnRestart.mousePressed(() => {
    initGame();
  });

  _btnMenu = createButton("Menu principal");
  _styleBtn(_btnMenu, "linear-gradient(180deg,#ff8a4d,#e0632f)");
  _btnMenu.parent(_btnContainer);
  _btnMenu.mousePressed() {
    sceneManager.loadScene(
        new TownCenterScene()
    );
  }
  
  // Overlay do menu principal (tela cobrindo o canvas)
  _menuOverlay = createDiv("");
  _menuOverlay.style("position", "absolute");
  _menuOverlay.style("display", "none");
  _menuOverlay.style("flex-direction", "column");
  _menuOverlay.style("align-items", "center");
  _menuOverlay.style("justify-content", "center");
  _menuOverlay.style("gap", "18px");
  _menuOverlay.style("background", "rgba(8, 20, 45, 0.94)");
  _menuOverlay.style("border-radius", "6px");
  _menuOverlay.style("z-index", "40");

  let title = createElement("h2", "SOS Puffle");
  title.style("color", "#fff");
  title.style("margin", "0");
  title.style("font-family", "Arial, sans-serif");
  title.parent(_menuOverlay);

  let playBtn = createButton("Jogar");
  _styleBtn(playBtn, "linear-gradient(180deg,#3fb6f0,#1f8fd0)");
  playBtn.style("padding", "12px 28px");
  playBtn.style("font-size", "16px");
  playBtn.parent(_menuOverlay);
  playBtn.mousePressed(() => {
    initGame();
    _hideMenuOverlay();
  });

  _endUIReady = true;
  _positionEndUI();
}

function _positionEndUI() {
  let canvasEl = document.querySelector("canvas");
  if (!canvasEl) return;
  let rect = canvasEl.getBoundingClientRect();
  let scrollX = window.scrollX || window.pageXOffset;
  let scrollY = window.scrollY || window.pageYOffset;

  if (_btnContainer) {
    let top = rect.top + scrollY + height / 2 + 55;
    let left = rect.left + scrollX + width / 2;
    _btnContainer.style("top", top + "px");
    _btnContainer.style("left", left + "px");
    _btnContainer.style("transform", "translate(-50%, 0)");
  }

  if (_menuOverlay) {
    _menuOverlay.style("top", rect.top + scrollY + "px");
    _menuOverlay.style("left", rect.left + scrollX + "px");
    _menuOverlay.style("width", width + "px");
    _menuOverlay.style("height", height + "px");
  }
}

function _showMenuOverlay() {
  if (_btnContainer) _btnContainer.style("display", "none");
  if (_menuOverlay) _menuOverlay.style("display", "flex");
  gameState = "menu"; // pausa o jogo (keyPressed original já trata qualquer estado != "playing")
}

function _hideMenuOverlay() {
  if (_menuOverlay) _menuOverlay.style("display", "none");
}

// Loop independente que apenas observa o gameState e atualiza a UI,
// sem tocar em nenhuma função original do jogo.
setInterval(() => {
  if (!_endUIReady) {
    if (typeof width !== "undefined" && width > 0) {
      _buildEndUI();
    }
    return;
  }

  if (gameState !== _lastUIState) {
    if (gameState === "gameover" || gameState === "win") {
      _btnContainer.style("display", "flex");
    } else if (_btnContainer) {
      _btnContainer.style("display", "none");
    }
    _lastUIState = gameState;
  }

  _positionEndUI();
}, 120);

window.addEventListener("resize", () => {
  if (_endUIReady) _positionEndUI();
});
