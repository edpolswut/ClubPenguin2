// GLOBAL STATE
const GameState = {
  coins: 0
};

const Assets = {
  rooms: {},
  sprites: {},
  penguin: {}
};

let sceneManager;

function preload() {
  const PenguinIDs = {
    1: { base: '54', belly: '55', details: '56' }, // Frente
    2: { base: '58', belly: '60', details: '62' }, // Frente-Diagonal
    3: { base: '64', belly: '66', details: '68' }, // Lado
    4: { base: '70', belly: null, details: '72' }, // Costas-Diagonal
    5: { base: '74', belly: null, details: '76' }  // Costas (Só tem o corpo)
  };

  for (let dir = 1; dir <= 5; dir++) {
    Assets.penguin[dir] = {};
    let ids = PenguinIDs[dir];

    if (ids.base) {
      Assets.penguin[dir].base = loadImage(`Penguin/img/DefineSprite_${ids.base}_1.png`);
    }
    if (ids.belly) {
      Assets.penguin[dir].belly = loadImage(`Penguin/img/DefineSprite_${ids.belly}_1.png`);
    }
    if (ids.details) {
      Assets.penguin[dir].details = loadImage(`Penguin/img/DefineSprite_${ids.details}_1.png`);
    }
  }

  Assets.rooms['town_center_bg'] = {};
  Assets.rooms['town_center_bg'].SkyBg = loadImage('TownCenter/img/SkyBg.png');
  Assets.rooms['town_center_bg'].CloudBg = loadImage('TownCenter/img/CloudBg.png');
  Assets.rooms['town_center_bg'].MountainBg = loadImage('TownCenter/img/MountainBg.png');
  Assets.rooms['town_center_bg'].TownBG = loadImage('TownCenter/img/TownBG.png');
  Assets.rooms['town_center_bg'].Toldos = loadImage('TownCenter/img/Toldos.png');
  Assets.rooms['town_center_bg'].Placas = loadImage('TownCenter/img/Placas.png');
  Assets.rooms['town_center_bg'].ToldoDc = loadImage('TownCenter/img/ToldoDc.png');
  Assets.rooms['town_center_bg'].PortaDc = loadImage('TownCenter/img/PortaDc.png');
}

function setup() {
  createCanvas(760, 480);
  sceneManager = new SceneManager();
  sceneManager.loadScene(new MenuScene());
}

function draw() {
  sceneManager.update();
  sceneManager.draw();
}

function mousePressed() {
  sceneManager.mousePressed();
}

// GERENCIADOR DE CENAS
class SceneManager {
  constructor() {
    this.currentScene = null;
  }

  loadScene(scene) {
    this.currentScene = scene;
    if (this.currentScene.setup) {
      this.currentScene.setup();
    }
  }

  update() {
    if (this.currentScene && this.currentScene.update) {
      this.currentScene.update();
    }
  }

  draw() {
    if (this.currentScene && this.currentScene.draw) {
      this.currentScene.draw();
    }
  }

  mousePressed() {
    if (this.currentScene && this.currentScene.mousePressed) {
      this.currentScene.mousePressed();
    }
  }

  keyPressed() {
    if (this.currentScene && this.currentScene.keyPressed) {
      this.currentScene.keyPressed();
    }
  }
}

// INTERFACE DE CENAS
class Scene {
  setup() {}
  update() {}
  draw() {}
  mousePressed() {}
  keyPressed() {}
}

// COMPONENTES DE UI
class Button {
  constructor(x, y, w, h, text, onClick) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    this.onClick = onClick;
  }

  draw() {
    let isHovered = this.checkHover();
    fill(isHovered ? 200 : 255);
    stroke(0);
    rectMode(CENTER);
    rect(this.x, this.y, this.w, this.h, 10);
    
    fill(0);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(20);
    text(this.text, this.x, this.y);
  }

  checkHover() {
    return mouseX > this.x - this.w / 2 && mouseX < this.x + this.w / 2 &&
           mouseY > this.y - this.h / 2 && mouseY < this.y + this.h / 2;
  }

  mousePressed() {
    if (this.checkHover() && this.onClick) {
      this.onClick();
    }
  }
}

class Prop {
  constructor(x, y, col) {
    this.pos = createVector(x, y);
    this.col = col;
  }
  
  update() {}

  draw() {
    fill(this.col);
    stroke(0);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y - 25, 50, 50); 
  }
}

class ImageProp {
  constructor(x, y, img) {
    this.pos = createVector(x, y);
    this.img = img;
  }

  update() {}

  draw() {
    image(this.img, this.pos.x, this.pos.y);
  }
}

class Portal {
  constructor(x, y, radius, targetSceneClass) {
    this.pos = createVector(x, y);
    this.radius = radius;
    this.targetSceneClass = targetSceneClass;
  }

  update() {}

  draw() {
    fill(255, 255, 0, 100);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.radius * 2);
    fill(0);
    textAlign(CENTER);
  }

  checkCollision(playerPos) {
    return dist(this.pos.x, this.pos.y, playerPos.x, playerPos.y) < this.radius;
  }
}

// CENAS BASE

class MenuScene extends Scene {
  setup() {
    this.playBtn = new Button(width / 2, height / 2, 200, 60, "Jogar", () => {
      sceneManager.loadScene(new TownCenterScene());
    });
  }

  draw() {
    background(30, 30, 50);
    fill(255);
    textSize(40);
    textAlign(CENTER);
    text("Meu Jogo Escalável", width / 2, height / 4);
    
    this.playBtn.draw();
  }

  mousePressed() {
    this.playBtn.mousePressed();
  }
}

class MainScene extends Scene {
  setup() {
    this.player = new Pinguin(width / 4, height / 4);
    this.renderables = [];
    this.portals = [];

    // Adiciona o jogador aos renderizáveis
    this.renderables.push(this.player);

    // Adiciona objetos de cenário (Props) para testar o Z-Index
    this.renderables.push(new Prop(300, 200, color(200, 50, 50)));
    this.renderables.push(new Prop(500, 400, color(50, 200, 50)));
    this.renderables.push(new Prop(200, 500, color(50, 50, 200)));

    // Adiciona um portal de colisão
    let minigamePortal = new Portal(650, 150, 40, TownCenterScene);
    this.portals.push(minigamePortal);
    this.renderables.push(minigamePortal); // Renderiza o portal junto
  }

  update() {
    // Atualiza lógica de todos os renderizáveis
    for (let r of this.renderables) {
      r.update();
    }

    // Verifica colisão do jogador com portais
    for (let portal of this.portals) {
      if (portal.checkCollision(this.player.pos)) {
        sceneManager.loadScene(new portal.targetSceneClass());
      }
    }
  }

  draw() {
    background(100, 150, 100); // Chão verde
    
    // Z-INDEX SORTING: Ordena o array pelo eixo Y antes de desenhar
    this.renderables.sort((a, b) => a.pos.y - b.pos.y);

    for (let r of this.renderables) {
      r.draw();
    }

    // Interface HUD
    fill(0, 150);
    rectMode(CORNER);
    rect(0, 0, width, 40);
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(20);
    text(`Moedas: ${GameState.coins}`, 20, 20);
  }

  mousePressed() {
    // Define o alvo do jogador baseado no clique
    this.player.setTarget(mouseX, mouseY);
  }
}

class MinigameScene extends Scene {
  setup() {
    this.clicksToWin = 5;
    
    this.exitBtn = new Button(width / 2, height / 2 + 100, 200, 50, "Coletar e Sair", () => {
      // Retorna as moedas e volta pra cena principal
      GameState.coins += 10;
      sceneManager.loadScene(new MainScene());
    });
  }

  draw() {
    background(50, 30, 30);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(30);
    text("Cena de Minijogo", width / 2, height / 3);
    text("Ganhe 10 moedas ao sair!", width / 2, height / 3 + 40);
    
    this.exitBtn.draw();
  }

  mousePressed() {
    this.exitBtn.mousePressed();
  }
}