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
    shieldTimerId: null,  // id таймера до включения или отключения щита
    calculateTime: null,  // сюда записывается цифра - количество секунд до включения или отключения щита
    callTurnType: null,  // сюда записывается, что ожидалось в момент включения паузы, включение или выключение щита
    calculateTimeShieldOnOrOffDelayTimerId: null,  // id таймера delay в методе calculateTimeShieldOnOrOff()
    shieldIsOnSecondsCount: config.bossShieldIsOnSecondsCount,
    shieldIsOffSecondsCount: config.bossShieldIsOffSecondsCount,
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
        this.shieldOnOrOffCall(this.shieldIsOnSecondsCount, "callTurnOff");
    },

    offShield() {
        renderer.renderBossShield(this.shieldBody, "off");
        this.shieldBody.x = [];
        this.shieldBody.y = null;
        this.shieldOnOrOffCall(this.shieldIsOffSecondsCount, "callTurnOn");
    },

    shieldOnOrOffCall(timer, mode) {
        if (mode === "callTurnOff") {
            this.shieldTimerId = setTimeout(() => this.offShield(), timer + 1000);
        } else {
            this.shieldTimerId = setTimeout(() => this.onShield(), timer + 1000);
        }
        this.calculateTimeShieldOnOrOff(timer / 1000, mode);
    },

    removeShieldTimerId() {
        if (!progressController.bossExist) return;
        if (this.shieldTimerId) clearTimeout(this.shieldTimerId);
        if (this.calculateTimeShieldOnOrOffDelayTimerId) clearTimeout(this.calculateTimeShieldOnOrOffDelayTimerId);
    },

    setShieldTimerIdOnResumeGame() {
        if (!progressController.bossExist) return;
        if (this.callTurnType === "callTurnOff") {
            this.shieldOnOrOffCall((this.calculateTime - 1) * 1000, "callTurnOff");
        } else {
            this.shieldOnOrOffCall((this.calculateTime - 1) * 1000, "callTurnOn");
        }
    },

    calculateTimeShieldOnOrOff(delay, turn) {
        if (delay > 0) {
            this.calculateTimeShieldOnOrOffDelayTimerId = setTimeout(() => {
                return this.calculateTimeShieldOnOrOff(delay += -1, turn);
            }, 1000);
        }
        this.calculateTime = delay;
        this.callTurnType = turn;
    },

    bossShieldGetDamage(thisPlayerWeaponTypeCanMakeDamage, hitData = null) {
        renderer.renderBossShieldHit(this.shieldBody, hitData);
        if (!thisPlayerWeaponTypeCanMakeDamage) return;
        this.removeShieldTimerId();
        setTimeout(() => this.offShield(), 150);
    },

    getDamage(hitData, thisPlayerWeaponTypeCanMakeDamage = false) {
        if (this.invincibility) return;
        if (thisPlayerWeaponTypeCanMakeDamage) {
            this.lives += -hitData;
        } else {
            this.lives += -hitData.damage;
        }
        console.log(this);
        if (this.lives > 0) renderer.renderGetDamageBoss(this.getDamageOutlookSelectorName, this.thisSelectorOverlay);
        if (this.lives <= 0) progressController.killBoss(this.destroyedReward);
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