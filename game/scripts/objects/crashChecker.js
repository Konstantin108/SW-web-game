import {config} from "../config/config.js";
import {player} from "./player.js";
import {renderer} from "./renderer.js";
import {game} from "../game.js";
import {helperController} from "../controllers/helperController.js";
import {blockageController} from "../controllers/blockageController.js";
import {boss} from "./boss.js";
import {progressController} from "../controllers/progressController.js";

export const crashChecker = {
    invincibilityAfterCrash: config.invincibilityAfterCrash,
    crashMulct: config.crashMulct,
    x: null,
    y: null,

    crashCheck(dangerArray, createNewBlockage = false) {
        if (player.invincibility) return;
        if (player.bonusShieldIsActivated) return;
        if (boss.bossAnimationIsRunningNow) return;
        if (!game.playerCanStopGame) return;

        let blockageTypes = blockageController.blockageTypesProvider();
        let blockageType = blockageController.blockageCreateOneUnit();

        for (let i = 0; i < dangerArray.length; i++) {
            if (dangerArray[i].x === player.x && dangerArray[i].y === player.y) {
                this.x = player.x;
                this.y = player.y;
                if (createNewBlockage) dangerArray[i] = new blockageTypes[blockageType](helperController.getRandomInt(0, config.mapSizeX), 0);
                dangerArray[i].crashDamage
                    ? player.lives += -dangerArray[i].crashDamage
                    : player.lives += -dangerArray[i].damage;
                if (this.crashMulct) progressController.scoreDown();
                player.invincibility = true;
                this.invincibilityOffCall(this.invincibilityAfterCrash);
                this.calculateTimeInInvincibilityOff(this.invincibilityAfterCrash / 1000);
                if (player.lives <= 0) {
                    player.lives = 0;
                    game.over();
                }
                renderer.renderCrash();
                renderer.renderPlayer();
                renderer.renderStatusBar();
                renderer.renderHeartScaleAnimation();
                renderer.renderScullChangeColor();
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

    invincibilityOffCall(invincibilityAfterCrash) {
        if (player.invincibility) player.invincibilityTimerId = setTimeout(() => this.invincibilityOff(), invincibilityAfterCrash);
    },

    invincibilityOffCallCancel() {
        if (player.invincibilityTimerId) clearTimeout(player.invincibilityTimerId);
        if (player.timeInInvincibilityOffTimerId) clearTimeout(player.timeInInvincibilityOffTimerId);
    },

    calculateTimeInInvincibilityOff(invincibilityAfterCrashActionTime) {
        let calculateTimeInInvincibilityOffTimerId = null;
        let tick = -1;

        if (!game.gameIsRunning) tick = 0;
        if (invincibilityAfterCrashActionTime > 0) {
            calculateTimeInInvincibilityOffTimerId = setTimeout(() => {
                return this.calculateTimeInInvincibilityOff(invincibilityAfterCrashActionTime += tick);
            }, 1000);
        }
        player.timeInInvincibilityOffTimerId = calculateTimeInInvincibilityOffTimerId;
        player.timeInInvincibilityOff = invincibilityAfterCrashActionTime;
    }
};