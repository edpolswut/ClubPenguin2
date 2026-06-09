class AnimatedSprite {
  constructor(spriteBasePath, x, y, width, height, frameCount, frameDelay = 100) {
    this.x = x;
    this.y = y;
    this.width = width || 80;
    this.height = height || 80;
    this.isLoaded = false;
    this.frames = [];
    this.frameDelay = frameDelay;
    this.currentFrameIndex = 0;
    this.lastFrameTime = millis();
    this.frameTimer = 0;
    
    this.loadSprites(spriteBasePath, frameCount);
  }

  loadSprites(basePath, frameCount) {
    // Carrega sprites de 1 até frameCount
    let loadedCount = 0;
    
    for (let i = 1; i <= frameCount; i++) {
      // Tenta carregar o sprite com número
      let spritePath = `${basePath}/${i}.png`;
      
      let img = createImage(this.width, this.height); // placeholder
      let p5img = loadImage(spritePath, 
        (loadedImg) => {
          this.frames[i - 1] = loadedImg;
          loadedCount++;
          
          // Marca como carregado quando todas as imagens foram carregadas
          if (loadedCount === frameCount) {
            this.isLoaded = true;
          }
        },
        () => {
          console.warn(`Sprite não encontrado: ${spritePath}`);
        }
      );
    }
  }

  update() {
    if (!this.isLoaded || this.frames.length === 0) return;

    let now = millis();
    let deltaTime = now - this.lastFrameTime;
    this.lastFrameTime = now;

    this.frameTimer += deltaTime;

    // Avança frame se o tempo passou
    if (this.frameTimer >= this.frameDelay) {
      this.frameTimer = 0;
      this.currentFrameIndex = (this.currentFrameIndex + 1) % this.frames.length;
    }
  }

  draw() {
    if (!this.isLoaded || this.frames.length === 0 || !this.frames[this.currentFrameIndex]) return;

    // Desenha frame atual no canvas p5
    image(
      this.frames[this.currentFrameIndex],
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
  }

  remove() {
    // Libera memória
    this.frames = [];
  }
}



