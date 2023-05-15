import {helperController} from "../controllers/helperController.js";
import {renderer} from "./renderer.js";
import {config} from "../config/config.js";
import {game} from "../game.js";
import {player} from "./player.js";
import {progressController} from "../controllers/progressController.js";

export const boss = {
    x: helperController.getCenterMapOnX(),
    y: 3,
    lives: config.bossLives,
    destroyedReward: config.bossDestroyedReward,
    speed: config.bossSpeed,
    crashDamage: config.bossCrashDamage,
    shieldCrashDamage: config.bossShieldCrashDamage,
    selectorName: "boss",
    getDamageOutlookSelectorName: "bossWhite",
    offsetX: 7,
    bodyX: [],
    shieldBody: {
        x: [],
        y: null
    },
    toTheRight: true,
    timerId: null,
    invincibility: true,
    thisSelectorOverlay: [
        "player",
        "player-drill",
        "player-trinity",
        "blockage",
        "blockageWhite",
        "blockageBull",
        "blockageWhiteBull",
        "arrow",
        "enemyArrow",
        "enemyArrowBomb",
        "drill",
        "trinity",
        "shield",
        "life",
        "killAll"
    ],

    getBossBodyEdgeOnX() {
        return (this.offsetX - 1) / 2;
    },

    createBoss() {
        player.canMove = false;
        this.returnPlayerOnStartCell();
        for (let i = this.x - this.getBossBodyEdgeOnX(); i <= this.offsetX + 1; i++) {
            this.bodyX.push(i);
        }
        renderer.renderBossCreate();
        renderer.renderBoss(this.selectorName, this.thisSelectorOverlay);
        setTimeout(() => {
            this.makeStep();
            player.canMove = true;
            this.invincibility = false;
        }, 2000);
        setTimeout(() => this.onShield(), 1500);
    },

    step() {
        if (!game.gameIsRunning) return;
        let bodyX = this.bodyX;

        if (this.bodyX.length) this.bodyX.splice(this.offsetX, this.bodyX.length);
        this.bodyX = [];
        if (this.toTheRight) {
            this.x += 1;
            for (let i = 0; i <= bodyX.length; i++) {
                this.bodyX.push(bodyX[i] + 1);
            }
            if (this.x === config.mapSizeX - 3) this.toTheRight = false;
        } else {
            this.x += -1;
            for (let i = 0; i <= bodyX.length; i++) {
                this.bodyX.push(bodyX[i] - 1);
            }
            if (this.x === 3) this.toTheRight = true;
        }
        renderer.clear(this.selectorName);
        renderer.renderBoss(this.selectorName, this.thisSelectorOverlay);
    },

    makeStep() {
        if (progressController.bossExist) this.timerId = setInterval(() => this.step(), this.speed);
    },

    makeStepOff() {
        if (progressController.bossExist) clearInterval(this.timerId);
    },

    bodyCellsArrayForCrashChecker(body, y, crashDamageType) {
        let bodyCellsArray = [];

        body.forEach(elem => {
            bodyCellsArray.push(
                {
                    crashDamage: crashDamageType,
                    x: elem,
                    y: y
                }
            )
        });
        return bodyCellsArray;
    },

    onShield() {
        for (let i = 0; i <= config.mapSizeX; i++) {
            this.shieldBody.x.push(i)
        }
        this.shieldBody.y = this.y + 1;
        renderer.renderBossShield(this.shieldBody, "on");
        this.offShieldCall();
    },

    // действие щита будет 10 секунд, отключение на 3 секунды
    offShield() {
        renderer.renderBossShield(this.shieldBody, "off");
        this.shieldBody.x = [];
        this.shieldBody.y = null;
        setTimeout(() => this.onShield(), 3000);
    },

    offShieldCall() {
        setTimeout(() => this.offShield(), 10000);
    },

    bossShieldGetDamage() {
        renderer.renderBossShieldHit(this.shieldBody);
    },

    // переработать метод, будет так же получение урона от explosion
    getDamage(hitData, damageByPlayerSuperAbility = false) {
        if (this.invincibility) return;
        if (damageByPlayerSuperAbility) {
            this.lives += -hitData;
        } else {
            this.lives += -hitData.damage;
        }
        console.log(this);
        if (this.lives > 0) renderer.renderGetDamageBoss(this.getDamageOutlookSelectorName, this.thisSelectorOverlay);
    },

    returnPlayerOnStartCell() {
        if (player.x === helperController.getCenterMapOnX() && player.y === config.mapSizeY) return;
        renderer.renderTeleportation("out");
        player.x = helperController.getCenterMapOnX();
        player.y = config.mapSizeY;
        if (player.invincibility) renderer.clear("invincibility");
        renderer.clear(player.selectorName);
        if (player.extraSelectorName) renderer.clear(player.extraSelectorName);
        setTimeout(() => {
            renderer.renderTeleportation("in");
            renderer.renderPlayer();
        }, 500);
    },
}