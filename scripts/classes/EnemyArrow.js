class EnemyArrow {
    constructor(x, y) {
        this.x = x;
        this.y = y + 1;
    }

    static id = 0;
    id = EnemyArrow.id++;
    selectorName = "enemyArrow";
    speed = config.enemyArrowSpeed;
    hit_x = null;
    hit_y = null;

    step() {
        if (game.playerIsAlive) {
            let y_pos = this.y;
            y_pos += 1;
            if (y_pos <= config.mapSizeY) {
                this.y = y_pos;
            } else if (y_pos == config.mapSizeY + 1) {
                y_pos = config.mapSizeY + 2;
                this.y = y_pos;
                renderer.clear(this.selectorName);
                this.remove();
                return null;
            }
        }
        renderer.clear(this.selectorName);
        renderer.renderMovingObjects(enemyArrowController.enemyArrowsArray, this.selectorName);
        this.hit();
    }

    makeStep() {
        return setInterval(() => this.step(), this.speed);
    }

    hit() {
        if (player.x == this.x && player.y == this.y) {
            this.hit_x = this.x;
            this.hit_y = this.y;
            crashChecker.crashCheck(enemyArrowController.enemyArrowsArray);
            this.y = config.mapSizeY + 2;
            renderer.clear(this.selectorName);
            renderer.renderStatusBar();
            renderer.renderHeartScaleAnimation();
            renderer.renderScullChangeColor();
            this.remove();
        }
        this.hit_x = null;
        this.hit_y = null;
    }

    remove() {
        let enemyArrowsArray = enemyArrowController.enemyArrowsArray;

        for (let i = 0; i <= enemyArrowsArray.length; i++) {
            if (enemyArrowsArray[i]) {
                if (enemyArrowsArray[i].id == this.id) {
                    clearInterval(this.makeStep());
                    enemyArrowController.enemyArrowsArray.splice(i, 1);
                }
            }
        }
    }
}