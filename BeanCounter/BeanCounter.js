class BeanCounterScene extends Scene {
  setup() {
    this.clicksToWin = 5;
    
    this.exitBtn = new Button(width / 2, height / 2 + 100, 200, 50, "Coletar e Sair", () => {
      // Retorna as moedas e volta pra cena principal
      GameState.coins += 10;
      sceneManager.loadScene(new TownCenterScene());
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