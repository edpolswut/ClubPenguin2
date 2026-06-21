class BeanCounterStartScene extends Scene {

    setup() {

        this.playBtn = new Button(
            width / 2,
            260,
            200,
            60,
            "Iniciar",
            () => {
                sceneManager.loadScene(
                    new BeanCounterScene()
                );
            }
        );

        this.backBtn = new Button(
            width / 2,
            340,
            200,
            60,
            "Voltar",
            () => {
                sceneManager.loadScene(
                    new TownCenterScene()
                );
            }
        );
    }

    draw() {
        background(0)

        image(Assets.beanCounter.menu,-100,-45);

        image(Assets.beanCounter.logo,265,30);

        this.playBtn.draw();
        this.backBtn.draw();
    }

    mousePressed() {
        this.playBtn.mousePressed();
        this.backBtn.mousePressed();
    }
}

class BeanCounter {
    constructor() {
        this.x = width / 2;
        this.y = 350;

        this.speed = 5;

        this.frame = 0;
        this.animTimer = 0;

        this.carrying = 0;

        this.overloaded = false;
        this.overloadTimer = 0;

        this.stunned = false;
        this.stunnedTimer = 0;
    }

    update() {
        if (this.overloaded) {
            this.overloadTimer--;
            if (this.overloadTimer <= 0) {
                this.overloaded = false;
            }
            return;
        }

        if (this.stunned) {
            this.stunnedTimer--;
            if (this.stunnedTimer <= 0) {
                this.stunned = false;
            }
            return;
        }

        let moving = false;

        if (keyIsDown(LEFT_ARROW)) {
            this.x -= this.speed;
            moving = true;
        }

        if (keyIsDown(RIGHT_ARROW)) {
            this.x += this.speed;
            moving = true;
        }

        this.x = constrain(this.x, 70, width - 70);

        if (moving) {
            this.animTimer++;
            if (this.animTimer > 6) {
                this.frame++;
                if (this.frame > 5)
                    this.frame = 0;
                this.animTimer = 0;
            }
        }
    }

    draw() {
        let spriteList = Assets.beanCounter.player;

        // escolhe sprite baseado na carga
        let index = 0;

        if (this.carrying >= 5) index = 5;
        else if (this.carrying === 4) index = 4;
        else if (this.carrying === 3) index = 3;
        else if (this.carrying === 2) index = 2;
        else if (this.carrying === 1) index = 1;

        if (this.overloaded) {
            image(
                Assets.beanCounter.fall,
                this.x - 32,
                this.y - 64
            );
            return;
        }

        if (this.stunned) {
            image(
                Assets.beanCounter.anvilFall,
                this.x - 32,
                this.y - 64
            );
            return;
        }

        image(
            spriteList[index],
            this.x - 32,
            this.y - 64
        );
    }
}


class FallingObject {
    constructor(type) {

        this.type = type;
        this.pos = createVector(
            width - 160,
            220
        );

        this.vel = createVector(
            random(-4.5, -3.5),
            random(-8, -7)
        );

        this.gravity = 0.25;

        this.caught = false;
        this.remove = false;
    }

update() {
    if (this.caught)
        return;

    this.vel.y += this.gravity;
    this.pos.add(this.vel);

    // caiu no chão
    if (this.pos.y > height - 20) {
        if (!this.fallen) {
            this.fallen = true;
            this.vel.set(0, 0);
            this.fallenTimer = 60; 
        }
    }

    // conta tempo no chão
    if (this.fallen) {
        this.fallenTimer--;

        if (this.fallenTimer <= 0) {
            this.remove = true;
        }
    }

    // remove se sair da tela lateral
    if (this.pos.x < -100) {
        this.remove = true;
    }
}
    draw() {
        if (this.caught)
            return;

        if (this.fallen) {

          let sprite =
            this.type === "anvil"
              ? Assets.beanCounter.anvilFloor
              : Assets.beanCounter.bagFall;

          image(
            sprite,
            this.pos.x,
            height - 70
            );

          return;
        }

        image(
            this.type === "bag"
                ? Assets.beanCounter.bag
                : Assets.beanCounter.anvil,
            this.pos.x,
            this.pos.y
        );

    }
}


class BeanCounterVictoryScene extends Scene {
    draw() {
        background(20, 100, 40);
        fill(255);
        textAlign(CENTER);
        textSize(40);
        text("VOCÊ VENCEU!",width / 2,150);

        textSize(24);
        text("Todos os caminhões descarregados",width / 2,220);

        text("Clique para voltar",width / 2,320);
    }

    mousePressed() {
        sceneManager.loadScene(
            new TownCenterScene()
        );
    }
}


class BeanCounterGameOverScene extends Scene {
    draw() {
        background(100, 20, 20);
        fill(255);
        textAlign(CENTER);
        textSize(40);
        text("GAME OVER",width / 2,150);
        textSize(24);
        text("Clique para voltar",width / 2,260);
    }

    mousePressed() {
        sceneManager.loadScene(
            new TownCenterScene()
        );
    }
}


class BeanCounterScene extends Scene {
    setup() {
        this.player = new BeanCounter();

        if (!Assets.beanCounter.music.isPlaying()) {
          Assets.beanCounter.music.loop();
        }

        this.objects = [];
        this.score = 0;
        this.lives = 3;
        this.currentTruck = 0;

        this.truckGoals = [20,25,30,35,40];

        this.spawnRates = [50,45,40,35,30];

        this.anvilChance = [0.05,0.08,0.12,0.16,0.20];

        this.currentLoad = 0;
        this.spawnTimer = 0;
        this.deliveryCooldown = 0;
        this.totalDelivered = 0;
    }

    update() {
        this.player.update();
        if (this.deliveryCooldown > 0)
            this.deliveryCooldown--;
        this.spawnTimer++;
        if (
            this.spawnTimer >
            this.spawnRates[this.currentTruck]
        ) {
            this.spawnTimer = 0;
            let type =
                random() <
                this.anvilChance[this.currentTruck]
                    ? "anvil"
                    : "bag";
            this.objects.push(
                new FallingObject(type)
            );
        }

        for (let obj of this.objects) {
            obj.update();
            if (obj.caught)
                continue;
            let hit = dist(
                obj.pos.x,
                obj.pos.y,
                this.player.x,
                this.player.y
            ) < 40;

            if (!hit)
                continue;   
            obj.caught = true;
            obj.remove = true;

            // BIGORNA

            if (obj.type === "anvil") {
                this.player.carrying = 0;
                this.player.stunned = true;
                this.player.stunnedTimer = 90;
                this.lives--;
                continue;
            }

            // SACO

            this.player.carrying++;
            this.score += 2;

            if (this.player.carrying > 5) {
                this.player.carrying = 0;
                this.player.overloaded = true;
                this.player.overloadTimer = 90;
                this.lives--;
                continue;
            }
        }

        // ENTREGA

        if (
            this.player.x < 110 &&
            this.deliveryCooldown <= 0
        ) {
            if (this.player.carrying > 0) {
                let bags =
                    this.player.carrying;
                this.score += bags * 2;
                this.currentLoad += bags;
                this.totalDelivered += bags;
                this.player.carrying = 0;
                this.deliveryCooldown = 30;
            }
        }

        // CAMINHÃO CONCLUÍDO

        if (
            this.currentLoad >=
            this.truckGoals[this.currentTruck]
        ) {
            this.currentTruck++;
            this.currentLoad = 0;
        }

        // VITÓRIA

        if (
            this.currentTruck >= 5
        ) {
            Assets.beanCounter.music.stop();

            GameState.coins +=
                floor(this.score * 2);
            sceneManager.loadScene(
                new BeanCounterVictoryScene()
            );
        }

        // DERROTA

        if (this.lives <= 0) {
            Assets.beanCounter.music.stop();
            
            GameState.coins +=
                floor(this.score);

            sceneManager.loadScene(
                new BeanCounterGameOverScene()
            );
        }
        this.objects =
            this.objects.filter(
                obj => !obj.remove
            );
    }

    draw() {
        background(0);

        image(Assets.beanCounter.bg,-20,0);

        image(Assets.beanCounter.floor,-20,400);

        image(Assets.beanCounter.truck,560,50);

        image(Assets.beanCounter.pallet,-20,369);


        let pileIndex =min(this.totalDelivered, 60);
        image(Assets.beanCounter.piles[pileIndex],20,80);

        for (let obj of this.objects) {
            obj.draw();
        }
        this.player.draw();

        fill(0);
        textSize(18);
        textAlign(LEFT);
        text("VIDAS: " + this.lives,20,28
        );
        text("SCORE: " + this.score,140,28
        );
        text("CAMINHÃO: " +(this.currentTruck + 1) +"/5",320,28
        );
        text(this.currentLoad +"/" +this.truckGoals[this.currentTruck],520,28
        );
    }
}
