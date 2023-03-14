let player = {
    lives: config.lives,
    invincibility: false,
    x: helperController.getCenterMapOnX(),
    y: config.mapSizeY,
    shootingCount: 0,
    selectorName: "player",
    extraSelectorName: null,
    arrowType: "arrow",
    bombsCount: config.startBombsCount,

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
            "ArrowUp",
            "KeyA",
            "KeyD",
            "KeyS",
            "KeyW"
        ];
        let x_value = this.x;
        let y_value = this.y;

        document.addEventListener("keydown", function (event) {
            if (possibleDirections.includes(event.code)) {
                switch (event.code) {
                    case possibleDirections[0]:
                    case possibleDirections[8]:
                    case possibleDirections[12]:
                        x_value += -1;
                        break;
                    case possibleDirections[1]:
                    case possibleDirections[9]:
                    case possibleDirections[13]:
                        x_value += 1;
                        break;
                    case possibleDirections[2]:
                    case possibleDirections[10]:
                    case possibleDirections[14]:
                        y_value += 1;
                        break;
                    case possibleDirections[3]:
                    case possibleDirections[11]:
                    case possibleDirections[15]:
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
                bonusController.pickedCheck();
                crashChecker.crashCheck(blockageController.blockagesArray, true);
                if (player.invincibility) renderer.clear("invincibility");
                renderer.clear(player.selectorName);
                if (player.extraSelectorName) renderer.clear(player.extraSelectorName);
                renderer.renderPlayer();
            }
        })
    },

    shoot() {
        let shootBtnsArr = [
            "Space",
            "Numpad5",
            "Numpad0",
        ];

        document.addEventListener("keydown", function (event) {
            if (shootBtnsArr.includes(event.code)) {
                player.shootingCount += 1;
                arrowController.arrowCreate();
                arrowController.arrowMove();
            }
        })
    },

    useBomb() {
        let useBombBtnsArr = [
            "ControlLeft",
            "ControlRight"
        ];

        document.addEventListener("keydown", function (event) {
            if (useBombBtnsArr.includes(event.code)) {
                explosion.explode();
            }
        })
    }
}