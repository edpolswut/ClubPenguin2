class TownCenterScene extends Scene {
  setup() {
    this.player = new Pinguin(width / 4, height / 4);
    this.renderables = [];
    this.portals = [];

    this.renderables.push(this.player);

    // this.renderables.push(new ImageProp(400, 300, Assets.rooms['town_center_bg'].TownBG));

    let BeanCounterPortal = new Portal(400, 100, 40, BeanCounterScene);
    this.portals.push(BeanCounterPortal);
    this.renderables.push(BeanCounterPortal);
  }

  update() {
    for (let r of this.renderables) {
      r.update();
    }

    for (let portal of this.portals) {
      if (portal.checkCollision(this.player.pos)) {
        sceneManager.loadScene(new portal.targetSceneClass());
      }
    }
  }

  draw() {
    background(100, 150, 100);


    image(Assets.rooms['town_center_bg'].SkyBg, -10, 0);
    image(Assets.rooms['town_center_bg'].CloudBg, -5, 5);
    image(Assets.rooms['town_center_bg'].MountainBg, 40, 18);
    image(Assets.rooms['town_center_bg'].PortaDc, 403, 137);
    image(Assets.rooms['town_center_bg'].TownBG, -50, 5);
    image(Assets.rooms['town_center_bg'].Toldos, 170, 90);
    image(Assets.rooms['town_center_bg'].Placas, 102, 63);
    image(Assets.rooms['town_center_bg'].ToldoDc, 388, 112);
    
    this.renderables.sort((a, b) => a.pos.y - b.pos.y);

    for (let r of this.renderables) {
      r.draw();
    }

    // fill(0, 150);
    // rectMode(CORNER);
    // rect(0, 0, width, 40);
    // fill(255);
    // textAlign(LEFT, CENTER);
    // textSize(20);
    // text(`Moedas: ${GameState.coins}`, 20, 20);
  }

  mousePressed() {
    this.player.setTarget(mouseX, mouseY);
  }
}