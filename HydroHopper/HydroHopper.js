class HydroHopperStartScene extends Scene {

    setup() {

        this.playBtn = new Button(
            width / 2,
            260,
            200,
            60,
            "Iniciar",
            () => {
                sceneManager.loadScene(
                    new HydroHopperScene()
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
        background(0);

        image(Assets.hydroHopper.menu,0,0);

        image(Assets.hydroHopper.logo,240,90);

        this.playBtn.draw();
        this.backBtn.draw();
    }

    mousePressed() {

        this.playBtn.mousePressed();
        this.backBtn.mousePressed();
    }


}

class HydroHopperScene extends Scene {

    setup() {

        this.vida = 3;
        this.score = 0;

        this.limiteEsq = 0;
        this.limiteDir = width;

        this.limiteTopo = 130;
        this.limiteBaixo = 400;

        this.boia = new Boia(
            width / 2,
            300
        );

        this.obstaculos = [];
    }

    update() {

        this.boia.mover(
            this.limiteEsq,
            this.limiteDir,
            this.limiteTopo,
            this.limiteBaixo
        );

        if (frameCount % 35 === 0) {

            let x = random(
                50,
                width - 50
            );

            this.obstaculos.push(
                new Obstaculo(
                    x,
                    70
                )
            );
        }

        for (
            let i =
                this.obstaculos.length - 1;
            i >= 0;
            i--
        ) {

            let obs =
                this.obstaculos[i];

            obs.mover();

            let d = dist(
                this.boia.x,
                this.boia.y,
                obs.x,
                obs.y
            );

            if (
                d <
                this.boia.tamanho / 2 +
                obs.tamanho / 2
            ) {

                this.vida--;

                this.boia.resetar();

                this.obstaculos.splice(
                    i,
                    1
                );

                if (
                    this.vida <= 0
                ) {

                    GameState.coins +=
                        this.score;

                    sceneManager.loadScene(
                        new HydroHopperGameOverScene(
                            this.score
                        )
                    );
                }

                continue;
            }

            if (
                obs.y > height
            ) {

                this.obstaculos.splice(
                    i,
                    1
                );

                this.score += 3;
            }
        }
    }

    draw() {

        background(200);

        image(Assets.hydroHopper.bg,-2,60);

        fill(0);
        textSize(24);
        textAlign(
            LEFT,
            CENTER
        );

        text(
            "Vidas: " +
            this.vida,
            60,
            30
        );

        textAlign(
            RIGHT,
            CENTER
        );

        text(
            "Score: " +
            this.score,
            width - 60,
            30
        );

        for (
            let obs
            of this.obstaculos
        ) {

            obs.mostrar();
        }

        push();

        stroke(0);
        strokeWeight(4);

        line(
            width / 2,
            145,
            this.boia.x,
            this.boia.y
        );

        pop();

        barco(
            width / 2,
            100
        );

        this.boia.mostrar();
    }


}

class HydroHopperGameOverScene extends Scene {

    constructor(score) {

        super();

        this.score =
            score;
    }

    draw() {

        background(20);

        fill(
            255,
            0,
            0
        );

        textAlign(CENTER);

        textSize(40);

        text(
            "GAME OVER",
            width / 2,
            150
        );

        fill(255);

        textSize(24);

        text(
            "Score: " +
            this.score,
            width / 2,
            220
        );

        text(
            "Moedas ganhas: " +
            this.score,
            width / 2,
            260
        );

        text(
            "Clique para voltar",
            width / 2,
            340
        );
    }

    mousePressed() {

        sceneManager.loadScene(
            new TownCenterScene()
        );
    }


}

function barco(x, y) {

image(Assets.hydroHopper.boat,333,60);

}

class Boia {


    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.inicialX = x;
        this.inicialY = y;

        this.tamanho = 50;
    }

    resetar() {

        this.x = this.inicialX;
        this.y = this.inicialY;
    }

    mostrar() {
        imageMode(CENTER);

        image(Assets.hydroHopper.boia,this.x,this.y);
        image(Assets.hydroHopper.pinguin,this.x,this.y);
        image(Assets.hydroHopper.corPinguin,this.x,this.y);

        imageMode(CORNER);
    }

    mover(
        limiteEsq,
        limiteDir,
        limiteTopo,
        limiteBaixo
    ) {

        if (
            keyIsDown(LEFT_ARROW) ||
            keyIsDown(65)
        ) {
            this.x -= 5;
        }

        if (
            keyIsDown(RIGHT_ARROW) ||
            keyIsDown(68)
        ) {
            this.x += 5;
        }

        if (
            keyIsDown(UP_ARROW) ||
            keyIsDown(87)
        ) {
            this.y -= 5;
        }

        if (
            keyIsDown(DOWN_ARROW) ||
            keyIsDown(83)
        ) {
            this.y += 5;
        }

        this.x = constrain(
            this.x,
            limiteEsq,
            limiteDir
        );

        this.y = constrain(
            this.y,
            limiteTopo,
            limiteBaixo
        );
    }


}

class Obstaculo {


    constructor(x, y) {

        this.x = x;
        this.y = y;

        this.tamanho = 50;

        this.sprite =random(Assets.hydroHopper.lixos);
    }

    mover() {

        this.y += 7;
    }

    mostrar() {

        imageMode(CENTER);

        image(this.sprite,this.x,this.y);

        imageMode(CORNER);
    }


}
