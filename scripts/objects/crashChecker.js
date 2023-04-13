let crashChecker = {
    invincibilityAfterCrash: config.invincibilityAfterCrash,
    x: null,
    y: null,

    crashCheck(dangerArray, createNewBlockage = false) {
        for (let i = 0; i < dangerArray.length; i++) {
            if (dangerArray[i].x === player.x && dangerArray[i].y === player.y) {
                this.x = player.x;
                this.y = player.y;
                if (!player.invincibility) {
                    if (player.extraSelectorName !== "player-shield") {
                        renderer.renderCrash();
                        if (player.lives > 1) {
                            player.lives += -1;
                            if (createNewBlockage) dangerArray[i] = new Blockage(helperController.getRandomInt(0, config.mapSizeX), 0);
                            // progressController.scoreDown();       // потеря очков при аварии отключена
                            player.invincibility = true;
                            this.invincibilityOffCall();
                        } else {
                            game.over();
                        }
                        renderer.renderPlayer();
                        renderer.renderStatusBar();
                        renderer.renderHeartScaleAnimation();
                        renderer.renderScullChangeColor();
                    }
                }
            }
        }
        this.x = null;
        this.y = null;
    },

    invincibilityOff() {
        player.invincibility = false;
        renderer.clear("invincibility");
        renderer.renderPlayer();
    },

    invincibilityOffCall() {
        if (player.invincibility) {
            setTimeout(() => this.invincibilityOff(), this.invincibilityAfterCrash);
        }
    }
}