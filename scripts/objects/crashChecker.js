let crashChecker = {
    invincibilityAfterCrash: config.invincibilityAfterCrash,
    x: null,
    y: null,

    crashCheck(dangerArray, createNewBlockage = false) {
        for (let i = 0; i < dangerArray.length; i++) {
            if (dangerArray[i].x == player.x && dangerArray[i].y == player.y) {
                this.x = player.x;
                this.y = player.y;
                if (!player.invincibility) {
                    renderer.renderCrash();
                    if (player.lives > 1) {
                        player.lives += -1;
                        if (createNewBlockage) dangerArray[i] = new Blockage(helperController.getRandomInt(0, config.mapSizeX));
                        // progressController.scoreDown();
                        player.invincibility = true;
                        this.invincibilityOffCall();
                    } else {
                        game.over();
                    }
                    renderer.clear("player");
                    renderer.renderPlayer();
                    renderer.renderStatusBar();
                    renderer.renderHeartScaleAnimation();
                    renderer.renderScullChangeColor();
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