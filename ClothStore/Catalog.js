class CatalogScene extends Scene {
  constructor(previousScene) {
    super();
    this.previousScene = previousScene; // Para saber pra onde voltar
    this.currentFilter = 'All';
    this.filters = ['All', 'Color', 'Hat', 'Body', 'Face', 'Neck'];
    
    // Botão de voltar
    this.backBtn = new Button(60, 40, 100, 40, "Voltar", () => {
      sceneManager.loadScene(this.previousScene);
    });
  }

  draw() {
    background(200, 100, 50); // Fundo da loja
    
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Catálogo de Roupas", width / 2, 40);
    
    textSize(20);
    fill(255, 215, 0);
    text(`Moedas: ${GameState.coins}`, width - 100, 40);

    this.backBtn.draw();

    // Desenha os Filtros (Esquerda)
    for (let i = 0; i < this.filters.length; i++) {
      let fy = 120 + i * 50;
      fill(this.currentFilter === this.filters[i] ? color(100, 255, 100) : 255);
      rectMode(CENTER);
      rect(100, fy, 120, 40, 10);
      fill(0);
      textSize(16);
      text(this.filters[i], 100, fy);
    }

    // Pega os itens baseados no filtro
    let catalogItems = [];
    if (this.currentFilter === 'All') {
      for (let cat in AllClothesDB) {
        catalogItems = catalogItems.concat(Object.values(AllClothesDB[cat]));
      }
    } else {
      catalogItems = Object.values(AllClothesDB[this.currentFilter] || {});
    }

    // Desenha o Grid de Vendas
    let startX = 250;
    let startY = 120;
    let cols = 4;
    let xSpacing = 110;
    let ySpacing = 130;

    for (let i = 0; i < catalogItems.length; i++) {
      let item = catalogItems[i];
      let cx = startX + (i % cols) * xSpacing;
      let cy = startY + Math.floor(i / cols) * ySpacing;

      // Card do item
      fill(255);
      rect(cx, cy, 90, 110, 10);
      
      if (item.category === 'Color') {
        fill(item.colorValue);
        stroke(0);
        ellipse(cx, cy - 15, 50, 50);
      } else if (item.sprites && item.sprites[1]) {
        push();
        translate(cx, cy - 15);
        scale(0.08);
        imageMode(CENTER);
        image(item.sprites[1], 0, 0);
        pop();
      }

      // Preço e Situação
      fill(0);
      textSize(14);
      let hasItem = GameState.inventory[item.category] && GameState.inventory[item.category].includes(item.name);
      
      if (hasItem) {
        fill(150);
        text("Comprado", cx, cy + 35);
      } else {
        fill(200, 150, 0);
        text(`$${item.price}`, cx, cy + 35);
      }
    }
  }

  mousePressed() {
    if (this.backBtn.checkHover()) {
      this.backBtn.mousePressed();
      return;
    }

    // Checa clique nos filtros
    for (let i = 0; i < this.filters.length; i++) {
      let fy = 120 + i * 50;
      if (mouseX > 100 - 60 && mouseX < 100 + 60 && mouseY > fy - 20 && mouseY < fy + 20) {
        this.currentFilter = this.filters[i];
        return;
      }
    }

    // Checa clique para Comprar
    let catalogItems = [];
    if (this.currentFilter === 'All') {
      for (let cat in AllClothesDB) catalogItems = catalogItems.concat(Object.values(AllClothesDB[cat]));
    } else {
      catalogItems = Object.values(AllClothesDB[this.currentFilter] || {});
    }

    let startX = 250; let startY = 120; let cols = 4;
    let xSpacing = 110; let ySpacing = 130;

    for (let i = 0; i < catalogItems.length; i++) {
      let cx = startX + (i % cols) * xSpacing;
      let cy = startY + Math.floor(i / cols) * ySpacing;

      if (mouseX > cx - 45 && mouseX < cx + 45 && mouseY > cy - 55 && mouseY < cy + 55) {
        let item = catalogItems[i];
        let hasItem = GameState.inventory[item.category] && GameState.inventory[item.category].includes(item.name);
        
        if (!hasItem) {
          if (GameState.coins >= item.price) {
            GameState.coins -= item.price;
            GameState.inventory[item.category].push(item.name);
            // Toca um som de caixa registradora se tiver!
          } else {
            console.log("Moedas insuficientes!");
          }
        }
      }
    }
  }
}