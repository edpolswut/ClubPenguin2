class TownCenterScene extends Scene {
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
      Luzes: new AnimatedSprite('TownCenter/animated/Luzes', 420, 47, 288, 115, 170, 25),
      CaixaSom: new AnimatedSprite('TownCenter/animated/CaixaSom', 423, 143, 174, 31, 12, 25),
      PiscaPisca: new AnimatedSprite('TownCenter/animated/PiscaPisca', 420, 6, 190, 113, 48, 25),
    };

    this.renderables.push(this.player);
    this.renderables.push(new ImageProp(287, 200, Assets.rooms['town_center_bg'].MesaCafe));
    this.renderables.push(new ImageProp(-50, 363, Assets.rooms['town_center_bg'].Baixo));
    this.renderables.push(new ImageProp(115, 225, Assets.rooms['town_center_bg'].LateralBanco));
    this.renderables.push(new ImageProp(580, 190, Assets.rooms['town_center_bg'].Cabideiro));
    this.renderables.push(new ImageProp(460, 198, Assets.rooms['town_center_bg'].BarreiraDC));

    // Exemplo: se entrar no BeanCounter, o pinguim poderia aparecer em (500, 200) na próxima cena
    let BeanCounterPortal = new Portal(400, 450, 40, BeanCounterScene);
    this.portals.push(BeanCounterPortal);
    this.renderables.push(BeanCounterPortal);

    let ClothStorePortal = new Portal(555, 190, 40, ClothStoreScene, 550, 190);
    this.portals.push(ClothStorePortal);
    this.renderables.push(ClothStorePortal);

    // Prepara o mapa de colisão para leitura rápida de pixels
    this.collisionMap = Assets.rooms['town_center_bg'].CollisionMap;
    if (this.collisionMap) this.collisionMap.loadPixels();

    // Inicia a música de fundo em loop se ela não estiver tocando
    let music = Assets.rooms['town_center_bg'].BgMusic;
    if (music && !music.isPlaying()) {
      music.loop();
    }
  }

  update() {
    for (let r of this.renderables) {
      r.update(this.collisionMap);
    }

    // Atualiza animações
    if (this.animations.Luzes) {
      this.animations.Luzes.update();
    }
    if (this.animations.CaixaSom) {
      this.animations.CaixaSom.update();
    }
    if (this.animations.PiscaPisca) {
      this.animations.PiscaPisca.update();
    }

    for (let portal of this.portals) {
      if (portal.checkCollision(this.player.pos)) {
        // Limpa animações antes de mudar de cena
        this.cleanup();
        
        // Acessamos a música através do objeto Assets, pois 'music' era local ao setup
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

    image(Assets.rooms['town_center_bg'].SkyBg, -10, 0);
    image(Assets.rooms['town_center_bg'].CloudBg, -5, 5);
    image(Assets.rooms['town_center_bg'].MountainBg, 40, 18);
    image(Assets.rooms['town_center_bg'].PortaDc, 403, 137);
    image(Assets.rooms['town_center_bg'].TownBG, -50, 5);
    image(Assets.rooms['town_center_bg'].DoorStore, 540, 130);
    image(Assets.rooms['town_center_bg'].DoorCoffe, 190, 160);
    this.animations.PiscaPisca.draw();
    this.animations.Luzes.draw();
    image(Assets.rooms['town_center_bg'].Toldos, 170, 90);
    image(Assets.rooms['town_center_bg'].Placas, 102, 63);
    image(Assets.rooms['town_center_bg'].ToldoDc, 388, 112);
    image(Assets.rooms['town_center_bg'].CadCafeEsq, 255, 195);
    image(Assets.rooms['town_center_bg'].CadCafeDir, 330, 185);
    image(Assets.rooms['town_center_bg'].PlacaLoja, 518, 45);
    image(Assets.rooms['town_center_bg'].CantoEsq, -50, 265);
    image(Assets.rooms['town_center_bg'].CantoDir, 690, 175);
    this.animations.CaixaSom.draw();


    this.renderables.sort((a, b) => a.pos.y - b.pos.y);

    for (let r of this.renderables) {
      r.draw();
    }
  }

  mousePressed() {
    this.player.setTarget(mouseX, mouseY);
  }

  cleanup() {
    if (this.animations.Luzes) {
      this.animations.Luzes.remove();
    }
    if (this.animations.CaixaSom) {
      this.animations.CaixaSom.remove();
    }
  }
    // Exemplo de som espontâneo (SFX) ao clicar para andar
    // if (Assets.sfx.snowClick) Assets.sfx.snowClick.play();
}
