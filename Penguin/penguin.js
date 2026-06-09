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
    
    this.dir = 1; // Começa olhando para frente
    this.color = color(50, 150, 250); // Azul,
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

  draw() {
    let renderDir = this.dir;
    let espelhar = false;

    // Se estiver andando para a esquerda, usa as imagens da direita e inverte o X
    if (this.dir === 8) { renderDir = 2; espelhar = true; }
    if (this.dir === 7) { renderDir = 3; espelhar = true; }
    if (this.dir === 6) { renderDir = 4; espelhar = true; }

    let sprites = Assets.penguin[renderDir];
    let offsets = PenguinOffsets[renderDir];

    if (sprites && sprites.base && offsets) {
      push();
      
      translate(this.pos.x, this.pos.y);
      
      if (espelhar) {
        scale(-0.12, 0.12); 
      } else {
        scale(0.12, 0.12);
      }

      let deslocamentoPe = -180; 
      translate(0, deslocamentoPe);

      imageMode(CENTER);

      // CAMADA 1: Base com a cor
      tint(this.color);
      image(sprites.base, offsets.base.x, offsets.base.y);

      // CAMADA 2: Barriga
      if (sprites.belly && offsets.belly) {
        noTint(); 
        image(sprites.belly, offsets.belly.x, offsets.belly.y);
      }

      // CAMADA 3: Detalhes/Pés
      if (sprites.details && offsets.details) {
        noTint();
        image(sprites.details, offsets.details.x, offsets.details.y);
      }

      pop();
    } else {
      // Placeholder se não tiver carregado
      fill(255, 0, 0);
      ellipse(this.pos.x, this.pos.y, 40, 40);
    }
  }
}