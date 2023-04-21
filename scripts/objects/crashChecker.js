import {config} from "../config/config.js";
import {player} from "./player.js";
import {renderer} from "./renderer.js";
import {game} from "../game.js";
import {helperController} from "../controllers/helperController.js";
import {blockageController} from "../controllers/blockageController.js";

export const crashChecker = {
    invincibilityAfterCrash: config.invincibilityAfterCrash,
    x: null,
    y: null,

    crashCheck(dangerArray, createNewBlockage = false) {
        let blockageTypes = blockageController.blockageTypesProvider();
        let blockageType = blockageController.blockageCreateOneUnit();

        for (let i = 0; i < dangerArray.length; i++) {
            if (dangerArray[i].x === player.x && dangerArray[i].y === player.y) {
                this.x = player.x;
                this.y = player.y;
                if (!player.invincibility) {
                    if (player.extraSelectorName != "player-shield") {
                        renderer.renderCrash();
                        player.lives += -1;
                        if (createNewBlockage) dangerArray[i] = new blockageTypes[blockageType](helperController.getRandomInt(0, config.mapSizeX), 0);
                        // progressController.scoreDown();       // потеря очков при аварии отключена
                        player.invincibility = true;
                        this.invincibilityOffCall();
                        if (player.lives <= 0) game.over();
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
        if (player.invincibility) setTimeout(() => this.invincibilityOff(), this.invincibilityAfterCrash);
    }
}