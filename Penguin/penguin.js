const PenguinOffsets = {
  1: { // Direção 1 (Frente)
    base: { x: 0,y: 0 },
    belly: { x: 0, y: 74 },
    details: { x: 0, y: 59 }
  },
  2: {// Direção 2 (Frente-Diagonal)
    base: { x: 0, y: 0 },
    belly: { x: -50, y: 44 },
    details: { x: -2, y: 34 }
  },
  3: {// Direção 3 (Lado)
    base: { x: 0, y: 0 },
    belly: { x: -84, y: 0 },
    details: { x: -4, y: 19 }
  },
  4: {// Direção 4 (Costas-Diagonal)
    base: { x: 0, y: 0 },
    belly: { x: 0, y: 0 },
    details: { x: 1, y: 8 }
  },
  5: {// Direção 5 (Costas)
    base: { x: 0, y: 0 },
    belly: { x: 0, y: 0 },
    details: { x: 0, y: 79 }
  }
};

class Pinguin {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.target = createVector(x, y);
    this.speed = 5;
    
    this.dir = 1;
    this.color = color(50, 150, 250);

    this.Clothes = AllClothesDB;
    this.currentClothes = {
      Color: GameState.equipped.Color ? this.Clothes.Color[GameState.equipped.Color] : this.Clothes.Color['Azul Escuro'],
      Hat: GameState.equipped.Hat ? this.Clothes.Hat[GameState.equipped.Hat] : null,
      Face: GameState.equipped.Face ? this.Clothes.Face[GameState.equipped.Face] : null,
      Neck: GameState.equipped.Neck ? this.Clothes.Neck[GameState.equipped.Neck] : null,
      Body: GameState.equipped.Body ? this.Clothes.Body[GameState.equipped.Body] : null,
      Hand: GameState.equipped.Hand ? this.Clothes.Hand[GameState.equipped.Hand] : null,
      Feet: GameState.equipped.Feet ? this.Clothes.Feet[GameState.equipped.Feet] : null,
    };
  }

  setTarget(x, y) {
    this.target.set(x, y);
  }

  update(collisionMap) {
    let d = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
    if (d > this.speed) {
      let dirVec = p5.Vector.sub(this.target, this.pos);
      
      // 1. Calcula o ângulo do movimento (entre -PI e PI)
      let angulo = dirVec.heading(); 
      // 2. Atualiza a direção do pinguim baseada nesse ângulo
      this.atualizarDirecao(angulo);

      dirVec.normalize();
      dirVec.mult(this.speed);

      // Calcula a posição futura
      let nextPos = p5.Vector.add(this.pos, dirVec);

      // Verifica se a posição futura colide com o mapa de cores
      if (collisionMap && this.checkCollision(nextPos.x, nextPos.y, collisionMap)) {
        this.target.set(this.pos); // Cancela o movimento restante
        return;
      }

      this.pos.add(dirVec);
    } else {
      this.pos.set(this.target);
    }
  }

  checkCollision(x, y, map) {
    // Se os pixels não estiverem carregados, permite movimento por segurança
    if (!map.pixels || map.pixels.length === 0) return false;

    let ix = floor(x);
    let iy = floor(y);

    // Fora dos limites da imagem é considerado colisão
    if (ix < 0 || ix >= map.width || iy < 0 || iy >= map.height) return true;

    // O canal Alpha (A) é o quarto valor em cada pixel [R, G, B, A]
    let index = (ix + iy * map.width) * 4 + 3;
    let alpha = map.pixels[index];

    // Se alpha > 10 (quase qualquer cor visível), há colisão
    return alpha > 10;
  }

  // Função que converte o ângulo do mouse para as 8 direções do Club Penguin
  atualizarDirecao(angulo) {
    let graus = degrees(angulo);

    if (graus >= -22.5 && graus < 22.5) {
      this.dir = 7; // Esquerda
    } else if (graus >= 22.5 && graus < 67.5) {
      this.dir = 8; // Diagonal Esquerda-Baixo
    } else if (graus >= 67.5 && graus < 112.5) {
      this.dir = 1; // Frente
    } else if (graus >= 112.5 && graus < 157.5) {
      this.dir = 2; // Diagonal Direita-Baixo
    } else if (graus >= 157.5 || graus < -157.5) {
      this.dir = 3; // Direita
    } else if (graus >= -157.5 && graus < -112.5) {
      this.dir = 4; // Diagonal Direita-Cima
    } else if (graus >= -112.5 && graus < -67.5) {
      this.dir = 5; // Costas
    } else if (graus >= -67.5 && graus < -22.5) {
      this.dir = 6; // Diagonal Esquerda-Cima
    }
  }

  draw(overrideX, overrideY, overrideDir) {
    // Usa a direção passada pela UI ou a direção real do pinguim no jogo
    let renderDir = overrideDir !== undefined ? overrideDir : this.dir;
    let espelhar = false;

    // Se estiver andando para a esquerda, usa as imagens da direita e inverte o X
    if (renderDir === 8) { renderDir = 2; espelhar = true; }
    if (renderDir === 7) { renderDir = 3; espelhar = true; }
    if (renderDir === 6) { renderDir = 4; espelhar = true; }

    let sprites = Assets.penguin[renderDir];
    let offsets = PenguinOffsets[renderDir];

    if (sprites && sprites.base && offsets) {
      push();
      
      // CORREÇÃO: Se uma posição customizada for enviada (pela UI), usa ela. 
      // Caso contrário, usa a posição real do mapa.
      let posX = overrideX !== undefined ? overrideX : this.pos.x;
      let posY = overrideY !== undefined ? overrideY : this.pos.y;
      translate(posX, posY);
      
      if (espelhar) {
        scale(-0.12, 0.12); 
      } else {
        scale(0.12, 0.12);
      }

      let deslocamentoPe = -180; 
      translate(0, deslocamentoPe);

      imageMode(CENTER);

      // CAMADA 1: Base com a cor
      let penguinColor = this.currentClothes.Color ? this.currentClothes.Color.colorValue : '#2E47AA';
      tint(penguinColor);
      image(sprites.base, offsets.base.x, offsets.base.y);
      noTint();

      // CAMADA 2: Barriga
      if (sprites.belly && offsets.belly) {
        image(sprites.belly, offsets.belly.x, offsets.belly.y);
      }

      // CAMADA 3: Detalhes/Pés
      if (sprites.details && offsets.details) {
        image(sprites.details, offsets.details.x, offsets.details.y);
      }

      if (this.currentClothes.Body) {
        this.currentClothes.Body.draw(renderDir, espelhar);
      }

      if (this.currentClothes.Hat) {
        this.currentClothes.Hat.draw(renderDir, espelhar);
      }

      pop();
    } else {
      // Placeholder se não tiver carregado
      fill(255, 0, 0);
      let posX = overrideX !== undefined ? overrideX : this.pos.x;
      let posY = overrideY !== undefined ? overrideY : this.pos.y;
      ellipse(posX, posY, 40, 40);
    }
  }
}

const ClothingAdjustments = {
  Hat: {
    1: { x: 0, y: 0 },      // Frente - sem ajuste
    2: { x: 0, y: -50 },    // Diagonal Direita-Baixo
    3: { x: -10, y: -70 },    // Direita
    4: { x: 0, y: -40 },    // Diagonal Direita-Cima
    5: { x: 0, y: 0 },      // Costas - sem ajuste
  },
  Body: {
    1: { x: 0, y: 0 },
    2: { x: 0, y: 0 },
    3: { x: 0, y: 0 },
    4: { x: 0, y: 0 },
    5: { x: 0, y: 0 },
  },
  Face: {
    1: { x: 0, y: 0 },
    2: { x: 0, y: 0 },
    3: { x: 0, y: 0 },
    4: { x: 0, y: 0 },
    5: { x: 0, y: 0 },
  },
  Neck: {
    1: { x: 0, y: 0 },
    2: { x: 0, y: 0 },
    3: { x: 0, y: 0 },
    4: { x: 0, y: 0 },
    5: { x: 0, y: 0 },
  },
  Hand: {
    1: { x: 0, y: 0 },
    2: { x: 0, y: 0 },
    3: { x: 0, y: 0 },
    4: { x: 0, y: 0 },
    5: { x: 0, y: 0 },
  },
  Feet: {
    1: { x: 0, y: 0 },
    2: { x: 0, y: 0 },
    3: { x: 0, y: 0 },
    4: { x: 0, y: 0 },
    5: { x: 0, y: 0 },
  }
};

class ClothingItem {
  constructor(name, sprites, category = 'Body', price = 0, xOffset = 0, yOffset = 0, colorValue = null) {
    this.name = name;
    this.sprites = sprites; // Objeto contendo as imagens por direção {1: img, 2: img, ...}
    this.category = category; // Categoria: Hat, Body, Face, Neck, Hand, Feet
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.price = price;
    this.colorValue = colorValue;
  }

  draw(renderDir, espelhar) {
    let img = this.sprites[renderDir];
    if (!img) return;

    push();
    // O pinguim já aplicou translate e scale, então desenhamos na origem
    // ou aplicamos offsets específicos se necessário no futuro
    imageMode(CENTER);

    // Obtém ajustes específicos da categoria e direção
    let adjustment = ClothingAdjustments[this.category] && ClothingAdjustments[this.category][renderDir]
      ? ClothingAdjustments[this.category][renderDir]
      : { x: 0, y: 0 };

    // Combina offsets base com ajustes por categoria
    let finalX = this.xOffset + adjustment.x;
    let finalY = this.yOffset + adjustment.y;

    image(img, finalX, finalY);
    pop();
  }

}

function PopulateClothes() {
  let clothes = {
    Color: [],
    Hat: [],
    Face: [],
    Neck: [],
    Body: [],
    Hand: [],
    Feet: []
  };

  //#region Colors
  clothes.Color['Azul Escuro'] = new ClothingItem('Azul Escuro', null, 'Color', 0, 0, 0, '#2E47AA');
  clothes.Color['Azul Claro'] = new ClothingItem('Azul Claro', null, 'Color', 0, 0, 0, '#3296FA');
  clothes.Color['Vermelho'] = new ClothingItem('Vermelho', null, 'Color', 50, 0, 0, '#FF3333');
  clothes.Color['Verde'] = new ClothingItem('Verde', null, 'Color', 50, 0, 0, '#33CC33');
  clothes.Color['Preto'] = new ClothingItem('Preto', null, 'Color', 100, 0, 0, '#222222');
  //#endregion Colors

  //#region Hat

  clothes.Hat['Chapéu Viking'] = new ClothingItem('Chapéu Viking', {
    0: loadImage('Penguin/Clothes/VikingHat/0.png'),
    1: loadImage('Penguin/Clothes/VikingHat/1.png'),
    2: loadImage('Penguin/Clothes/VikingHat/2.png'),
    3: loadImage('Penguin/Clothes/VikingHat/3.png'),
    4: loadImage('Penguin/Clothes/VikingHat/4.png'),
    5: loadImage('Penguin/Clothes/VikingHat/5.png')
  }, 'Hat', 50, 0, -145);

  //#endregion Hat

  //#region Body

  clothes.Body['Casaco Preto'] = new ClothingItem('Casaco Preto', {
    0: loadImage('Penguin/Clothes/BlackHoodie/0.png'),
    1: loadImage('Penguin/Clothes/BlackHoodie/1.png'),
    2: loadImage('Penguin/Clothes/BlackHoodie/2.png'),
    3: loadImage('Penguin/Clothes/BlackHoodie/3.png'),
    4: loadImage('Penguin/Clothes/BlackHoodie/4.png'),
    5: loadImage('Penguin/Clothes/BlackHoodie/5.png')
  }, 'Body', 100);

  //#endregion Body

  return clothes;
}

var AllClothesDB;