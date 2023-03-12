class Arrow {
    static id = 0;
    id = Arrow.id++;
    selectorName = "arrow";
    x = player.x;
    y = player.y - 1;
    speed = 50;
    hit_x = null;
    hit_y = null;

    step() {
        if (game.playerIsAlive) {
            let y_pos = this.y;
            y_pos += -1;
            if (y_pos >= -1) {
                this.y = y_pos;
            } else if (y_pos == -2) {
                y_pos = -3;
                this.y = y_pos;
                this.remove();
                return null;
            }
        }
        renderer.clear(this.selectorName);
        renderer.renderMovingObjects(arrowController.arrowsArray);
        this.hit();
    }

    makeStep() {
        return setInterval(() => this.step(), this.speed);
    }

    hit() {
        let blockagesArray = blockageController.blockagesArray;

        for (let i = 0; i < blockagesArray.length; i++) {
            if (blockagesArray[i].x == this.x && blockagesArray[i].y == this.y) {
                this.hit_x = this.x;
                this.hit_y = this.y;
                this.y = -1;
                renderer.clear(this.selectorName);
                renderer.renderHit(this);
                progressController.scoreUp(config.shipDestroyedReward);
                progressController.shipDestroyer += 1;
                blockageController.blockagesArray[i] = new Blockage(helperController.getRandomInt(0, config.mapSizeX));
                renderer.renderStatusBar();
                this.remove();
            }
        }
        this.hit_x = null;
        this.hit_y = null;
    }

    remove() {
        let arrowsArray = arrowController.arrowsArray;

        for (let i = 0; i <= arrowsArray.length; i++) {
            if (arrowsArray[i]) {
                if (arrowsArray[i].id == this.id) {
                    clearInterval(this.makeStep());
                    arrowsArray.splice(i, 1);
                    player.shootingCount += -1;
                }
            }
        }
    }
}