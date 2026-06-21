class PlayerCardUI {
  constructor(player) {
    this.player = player;
    this.x = width / 2;
    this.y = height / 2;
    this.w = 500;
    this.h = 350;
    this.currentCategory = 'All';
  }

  draw() {
    if (!GameState.isPlayerCardOpen) return;

    push();
    rectMode(CENTER);
    
    // Fundo do Player Card
    fill(0, 100, 200, 230);
    stroke(255);
    strokeWeight(3);
    rect(this.x, this.y, this.w, this.h, 20);

    // Botão Fechar (X)
    fill(255, 0, 0);
    noStroke();
    ellipse(this.x + this.w/2 - 20, this.y - this.h/2 + 20, 30, 30);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(18);
    text("X", this.x + this.w/2 - 20, this.y - this.h/2 + 20);

    // Nome e Moedas
    fill(255);
    textSize(24);
    text("Seu Pinguim", this.x - 100, this.y - this.h/2 + 30);
    textSize(16);
    fill(255, 215, 0);
    text(`Moedas: ${GameState.coins}`, this.x - 100, this.y + this.h/2 - 30);

    // Renderiza o Pinguim em miniatura (Frente)
    // Para simplificar, desenhamos ele estático aqui
    push();
    translate(this.x - 120, this.y + 60);
    scale(1.5); // Um pouco maior no card
    this.player.draw(0, 0, 1);
    pop();

    // Área de Itens (Direita)
    this.drawInventoryGrid();
    
    pop();
  }

  drawInventoryGrid() {
    let startX = this.x + 20;
    let startY = this.y - 100;
    let cols = 3;
    let size = 60;
    let spacing = 70;

    // Pega todos os itens do inventário
    let myItems = [];
    for (let cat in GameState.inventory) {
      for (let itemName of GameState.inventory[cat]) {
        myItems.push(AllClothesDB[cat][itemName]);
      }
    }

    // Desenha o Grid
    for (let i = 0; i < myItems.length; i++) {
      let item = myItems[i];
      let col = i % cols;
      let row = Math.floor(i / cols);
      let itemX = startX + col * spacing;
      let itemY = startY + row * spacing;

      fill(255);
      rect(itemX, itemY, size, size, 10);
      
      if (item.category === 'Color') {
        fill(item.colorValue);
        stroke(0);
        ellipse(itemX, itemY, 40, 40); // Desenha uma bolinha de cor
      } else if (item.sprites && item.sprites[1]) {
        push();
        translate(itemX, itemY);
        scale(0.08); 
        imageMode(CENTER);
        image(item.sprites[1], 0, 0);
        pop();
      }
    }
  }

  mousePressed(mx, my) {
    if (!GameState.isPlayerCardOpen) return false;

    // Checa botão de fechar
    let closeD = dist(mx, my, this.x + this.w/2 - 20, this.y - this.h/2 + 20);
    if (closeD < 15) {
      GameState.isPlayerCardOpen = false;
      return true; // Clique consumido
    }

    // Checa clique nos itens para equipar/desequipar
    let startX = this.x + 20;
    let startY = this.y - 100;
    let cols = 3;
    let size = 60;
    let spacing = 70;

    let myItems = [];
    for (let cat in GameState.inventory) {
      for (let itemName of GameState.inventory[cat]) {
        myItems.push(AllClothesDB[cat][itemName]);
      }
    }

    for (let i = 0; i < myItems.length; i++) {
      let item = myItems[i];
      let col = i % cols;
      let row = Math.floor(i / cols);
      let itemX = startX + col * spacing;
      let itemY = startY + row * spacing;

      // Se clicou dentro do quadrado do item
      if (mx > itemX - size/2 && mx < itemX + size/2 &&
          my > itemY - size/2 && my < itemY + size/2) {
        
        // Descobre o que o pinguim está vestindo agora nesta categoria (ex: Hat, Body)
        let roupaAtual = this.player.currentClothes[item.category];
        
        // Comparamos pelo NOME do item. Isso garante precisão absoluta.
        if (roupaAtual && roupaAtual.name === item.name) {
          // Desequipa: atualiza o visual imediatamente e salva no estado global
          this.player.currentClothes[item.category] = null;
          GameState.equipped[item.category] = null; 
        } else {
          // Equipa: atualiza o visual imediatamente e salva no estado global
          this.player.currentClothes[item.category] = item;
          GameState.equipped[item.category] = item.name; 
        }
        return true;
      }
    }

    // Se clicou dentro da interface, consome o clique (pra não andar)
    if (mx > this.x - this.w/2 && mx < this.x + this.w/2 &&
        my > this.y - this.h/2 && my < this.y + this.h/2) {
      return true;
    }

    return false;
  }
}