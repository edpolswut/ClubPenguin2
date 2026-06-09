class ClothStoreScene extends Scene {
  constructor(startX, startY) {
    super();
    this.startX = startX !== undefined ? startX : width / 2;
    this.startY = startY !== undefined ? startY : (height / 4) * 3;
  }

  setup() {
    this.player = new Pinguin(this.startX, this.startY);
    this.renderables = [];
    this.portals = [];

    // Carrega animações específicas desta cena
    this.animations = {
    //   Luzes: new AnimatedSprite('TownCenter/animated/Luzes', 420, 47, 288, 115, 170, 25),
    };

    this.renderables.push(this.player);
    this.renderables.push(new ImageProp(610, 135, Assets.rooms['cloth_store_bg'].Mesa));
    this.renderables.push(new ImageProp(650, 235, Assets.rooms['cloth_store_bg'].Bau));
    this.renderables.push(new ImageProp(-32, -15, Assets.rooms['cloth_store_bg'].PeixeRoupas));
    this.renderables.push(new ImageProp(143, 186, Assets.rooms['cloth_store_bg'].Cabide));
    


    this.renderables.push(new ImageProp(287, 1000, Assets.rooms['cloth_store_bg'].BtnLivro));

    // Exemplo: se entrar no BeanCounter, o pinguim poderia aparecer em (500, 200) na próxima cena
    let TownCenterPortal = new Portal(550, 150, 40, TownCenterScene, 555, 230);
    this.portals.push(TownCenterPortal);
    this.renderables.push(TownCenterPortal);

    // Prepara o mapa de colisão para leitura rápida de pixels
    this.collisionMap = Assets.rooms['cloth_store_bg'].CollisionMap;
    if (this.collisionMap) this.collisionMap.loadPixels();

    // Inicia a música de fundo em loop se ela não estiver tocando
    let music = Assets.rooms['cloth_store_bg'].Musica;
    if (music && !music.isPlaying()) {
      music.loop();
    }
  }

  update() {
    for (let r of this.renderables) {
      r.update(this.collisionMap);
    }

    // Atualiza animações
    // if (this.animations.Luzes) {
    //   this.animations.Luzes.update();
    // }

    for (let portal of this.portals) {
      if (portal.checkCollision(this.player.pos)) {
        this.cleanup();
        let music = Assets.rooms['town_center_bg'].BgMusic;
        if (music) {
          music.stop();
        }
        sceneManager.loadScene(new portal.targetSceneClass(portal.targetX, portal.targetY));
      }
    }
  }

  draw() {
    background(100, 150, 100);

    image(Assets.rooms['cloth_store_bg'].Bg, -50, -25);

    image(Assets.rooms['cloth_store_bg'].Cadeira, 110, 270)
    image(Assets.rooms['cloth_store_bg'].Cadeira, 135, 330)


    // this.animations.PiscaPisca.draw();


    this.renderables.sort((a, b) => a.pos.y - b.pos.y);

    for (let r of this.renderables) {
      r.draw();
    }

    image(Assets.rooms['cloth_store_bg'].CadeiraBraco, 130, 340)
    image(Assets.rooms['cloth_store_bg'].CadeiraBraco, 155, 400)
  }

  mousePressed() {
    this.player.setTarget(mouseX, mouseY);
  }

  cleanup() {
    // if (this.animations.Luzes) {
    //   this.animations.Luzes.remove();
    // }
  }
    // Exemplo de som espontâneo (SFX) ao clicar para andar
    // if (Assets.sfx.snowClick) Assets.sfx.snowClick.play();
}
