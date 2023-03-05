let player = {
    lives: config.lives,
    invincibility: false,
    x: helperController.getCenterMapOnX(),
    y: config.mapSizeY,
    shootingCount: 0,

    move() {
        let possibleDirections = [
            "Numpad4",
            "Numpad6",
            "Numpad2",
            "Numpad8",
            "Numpad7",
            "Numpad9",
            "Numpad1",
            "Numpad3",
            "ArrowLeft",
            "ArrowRight",
            "ArrowDown",
            "ArrowUp"
        ];
        let x_value = this.x;
        let y_value = this.y;

        document.addEventListener("keydown", function (event) {
            if (possibleDirections.includes(event.code)) {
                switch (event.code) {
                    case possibleDirections[0]:
                        x_value += -1;
                        break;
                    case possibleDirections[1]:
                        x_value += 1;
                        break;
                    case possibleDirections[2]:
                        y_value += 1;
                        break;
                    case possibleDirections[3]:
                        y_value += -1;
                        break;
                    case possibleDirections[4]:
                        x_value += -1;
                        y_value += -1;
                        break;
                    case possibleDirections[5]:
                        x_value += 1;
                        y_value += -1;
                        break;
                    case possibleDirections[6]:
                        x_value += -1;
                        y_value += 1;
                        break;
                    case possibleDirections[7]:
                        x_value += 1;
                        y_value += 1;
                        break;
                    case possibleDirections[8]:
                        x_value += -1;
                        break;
                    case possibleDirections[9]:
                        x_value += 1;
                        break;
                    case possibleDirections[10]:
                        y_value += 1;
                        break;
                    case possibleDirections[11]:
                        y_value += -1;
                        break;
                }
                if (x_value <= config.mapSizeX && y_value <= config.mapSizeY && x_value >= 0 && y_value >= 0) {
                    player.x = x_value;
                    player.y = y_value;
                } else {
                    x_value = player.x;
                    y_value = player.y;
                    player.x = x_value;
                    player.y = y_value
                }
                renderer.clear("player");
                renderer.clear("invincibility");
                renderer.renderPlayer();
                crashChecker.crashCheck(blockageController.blockagesArray, true);
            }
        })
    },

    shoot() {
        let shootBtnsArr = [
            "Space",
            "Numpad5",
        ];

        document.addEventListener("keydown", function (event) {
            if (shootBtnsArr.includes(event.code)) {
                player.shootingCount += 1;
                arrowController.arrowCreate();
                arrowController.arrowMove();
            }
        })
    }
}