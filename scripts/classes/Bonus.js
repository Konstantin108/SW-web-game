class Bonus {
    static id = 0;
    id = Bonus.id++;
    objectType = helperController.getRandomForBonus();
    selectorName = this.objectType.name;
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
        this.getBonus(this.picked());
        renderer.renderPlayer();
    }

    makeStep() {
        return setInterval(() => this.step(), this.speed);
    }

    picked() {
        let pickedBonus = null;

        if (player.x == this.x && player.y == this.y) {
            this.picked_x = this.x;
            this.picked_y = this.y;
            this.y = config.mapSizeY + 2;
            renderer.renderPickedBonus(this);
            pickedBonus = this;
            this.remove();
            // console.log(pickedBonus);    // данные подобранного бонуса
            return pickedBonus;
        }
        this.picked_x = null;
        this.picked_y = null;
    }

    getBonus(bonus) {
        if (bonus) {
            this.setNewPropertiesForPlayer(bonus.objectType);
        }
    }

    setNewPropertiesForPlayer(bonus) {
        if (bonus.playerOutlook) {
            renderer.clear(player.selectorName);
            player.selectorName = bonus.playerOutlook;
            renderer.renderPlayer();
            this.newPropertiesForPlayerOffCall(bonus);
        }
        if (bonus.playerExtraOutlook) {
            crashChecker.invincibilityOff();
            player.extraSelectorName = bonus.playerExtraOutlook;
            this.newPropertiesForPlayerOffCall(bonus);
        }
        if (bonus.playerArrowType) {
            player.arrowType = bonus.playerArrowType;
            this.newPropertiesForPlayerOffCall(bonus);
        }
        if (bonus.name == "life") {
            if (player.lives < config.lives) {
                player.lives += 1;
                renderer.renderStatusBar();
                renderer.renderHeartScaleAnimation();
            }
        }
    }

    newPropertiesForPlayerOff(bonus) {
        if (bonus.playerOutlook) {
            renderer.clear(player.selectorName);
            player.selectorName = "player";
            renderer.renderPlayer();
        }
        if (bonus.playerExtraOutlook) {
            renderer.clear(player.extraSelectorName);
            player.extraSelectorName = null;
        }
        if (bonus.playerArrowType) {
            player.arrowType = "arrow";
        }
    }

    newPropertiesForPlayerOffCall(bonus) {
        setTimeout(() => this.newPropertiesForPlayerOff(bonus), bonus.actionTime);
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