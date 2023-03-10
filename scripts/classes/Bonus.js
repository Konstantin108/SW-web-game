class Bonus {
    static id = 0;
    id = Bonus.id++;
    type = helperController.getRandomForBonus().type;
    selectorName = helperController.getRandomForBonus().name;
    thisSelectorOverlay = [
        "enemyArrow"
    ];
    x = helperController.getRandomInt(0, config.mapSizeX);
    y = 0;
    speed = config.bonuses.bonusSpeed;
    picked_x = null;
    picked_y = null;

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
        renderer.renderMovingObjects(bonusController.bonusesArray, this.thisSelectorOverlay);
        this.picked();
    }

    makeStep() {
        return setInterval(() => this.step(), this.speed);
    }

    picked() {
        if (player.x == this.x && player.y == this.y) {
            this.picked_x = this.x;
            this.picked_y = this.y;
            this.y = config.mapSizeY + 2;
            renderer.clear(this.selectorName);
            renderer.renderPickedBonus(bonusController.bonusesArray);
            this.remove();
        }
        this.picked_x = null;
        this.picked_y = null;
    }

    remove() {
        let bonusArray = bonusController.bonusesArray;

        for (let i = 0; i <= bonusArray.length; i++) {
            if (bonusArray[i]) {
                if (bonusArray[i].id == this.id) {
                    clearInterval(this.makeStep());
                    bonusController.bonusesArray.splice(i, 1);
                }
            }
        }
    }
}