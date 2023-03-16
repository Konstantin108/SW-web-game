class Blockage {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    selectorName = "blockage";
    thisSelectorOverlay = [
        "drill",
        "trinity",
        "shield",
        "life",
        "killAll"
    ];
    speed = helperController.getRandomInt(progressController.maxBlockageSpeed, progressController.minBlockageSpeed);

    shoot(x_pos, y_pos) {
        if (helperController.randomEvent(progressController.fireChance)) {
            return {
                x: x_pos,
                y: y_pos
            }
        }
    }

    step() {
        if (game.playerIsAlive) {
            let blockagesArray = blockageController.blockagesArray;
            let x_pos = this.x;
            let y_pos = this.y;
            let employedPositionsOnXArray = [];

            for (let i = 0; i <= blockagesArray.length; i++) {
                if (blockagesArray[i]) {
                    employedPositionsOnXArray.push(blockagesArray[i].x);
                }
            }
            x_pos += helperController.getRandomInt(-1, 1);
            y_pos += 1;
            if (y_pos <= config.mapSizeY) {
                this.y = y_pos;
                if (x_pos <= config.mapSizeX && x_pos >= 0 && !employedPositionsOnXArray.includes(x_pos)) {
                    this.x = x_pos;
                } else {
                    x_pos = this.x;
                    this.x = x_pos;
                }
                if (this.y > 1) {
                    enemyArrowController.enemyArrowCreate(this.shoot(x_pos, y_pos));
                    enemyArrowController.enemyArrowMove();
                }
            } else if (y_pos == config.mapSizeY + 1) {
                y_pos = config.mapSizeY + 2;
                this.y = y_pos;
                progressController.scoreUp(config.missReward);
                x_pos = helperController.getRandomInt(0, config.mapSizeX);
                y_pos = 0;
                this.x = x_pos;
                this.y = y_pos;
                renderer.renderStatusBar();
            }
            renderer.clear(this.selectorName);
            renderer.renderMovingObjects(blockageController.blockagesArray, this.thisSelectorOverlay);
            crashChecker.crashCheck(blockageController.blockagesArray, true);
        }
        progressController.progress();
    }
}