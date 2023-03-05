class Blockage {
    static shootingCount = 0;
    x = helperController.getRandomInt(0, config.mapSizeX);
    y = 0;
    selectorName = "blockage";
    speed = helperController.getRandomInt(progressController.maxBlockageSpeed, progressController.minBlockageSpeed);

    shoot() {
        if (helperController.randomEnemyFire()) {
            Blockage.shootingCount += 1;
            return {
                shootingCount: Blockage.shootingCount,
                x: this.x,
                y: this.y
            }
        }
    }

    step() {
        if (game.playerIsAlive) {
            let x_pos = this.x;
            let y_pos = this.y;

            x_pos += helperController.getRandomInt(-1, 1);
            y_pos += 1;
            if (y_pos <= config.mapSizeY) {
                this.y = y_pos;
                if (x_pos <= config.mapSizeX && x_pos >= 0) {
                    this.x = x_pos;
                } else {
                    x_pos = this.x;
                    this.x = x_pos;
                }
                this.shoot();
                enemyArrowController.enemyArrowCreate(this.shoot());
                enemyArrowController.enemyArrowMove();
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
            renderer.renderMovingObjects(blockageController.blockagesArray, this.selectorName);
            crashChecker.crashCheck(blockageController.blockagesArray, true);
        }
        progressController.progress();
    }
}