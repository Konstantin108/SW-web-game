import {helperController} from "../controllers/helperController.js";
import {renderer} from "./renderer.js";
import {config} from "../config/config.js";
import {game} from "../game.js";
import {player} from "./player.js";
import {progressController} from "../controllers/progressController.js";
import {enemyArrowController} from "../controllers/enemyArrowController.js";

export const boss = {
    x: helperController.getCenterMapOnX(),
    y: 3,
    alive: false,
    lives: config.bossLives,
    destroyedReward: config.bossDestroyedReward,
    anotherDestroyedReward: config.bossAnotherDestroyedReward,
    speed: config.bossSpeed,
    crashDamage: config.bossCrashDamage,
    shieldCrashDamage: config.bossShieldCrashDamage,
    fireChance: config.bossFireChance,
    fireArrowBombChance: config.bossFireArrowBombChance,
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

        if (this.anotherDestroyedReward) this.destroyedReward = this.anotherDestroyedReward;

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
            this.alive = true;
        }, 2000);
        setTimeout(() => this.onShield(), 1500);
    },

    remove(hitCoordinates) {
        this.alive = false;
        this.makeStepOff();
        renderer.renderKillBoss(this.thisSelectorOverlay, hitCoordinates);
        this.removeShieldTimerId();
        this.offShield(true);
        setTimeout(() => {
            this.bodyX = [];
            this.lives = config.bossLives;
            this.anotherDestroyedReward = config.bossAnotherDestroyedReward;
            this.destroyedReward = config.bossDestroyedReward;
        }, 7500);
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
        enemyArrowController.enemyArrowCreate(this.shoot(this.randomChoiceGunType(), this.y + 1));
        enemyArrowController.enemyArrowMove();
        renderer.clear(this.selectorName);
        renderer.renderBoss(this.selectorName, this.thisSelectorOverlay);
    },

    makeStep() {
        if (progressController.bossExist) this.timerId = setInterval(() => this.step(), this.speed);
    },

    makeStepOff() {
        if (progressController.bossExist) clearInterval(this.timerId);
    },

    randomChoiceGunType() {
        let gunTypeAndGunPosition = {
            gunType: null,
            gunPosition: null
        }

        if (helperController.randomEvent(this.fireArrowBombChance)) {
            gunTypeAndGunPosition.gunType = "enemyArrowBomb";
            gunTypeAndGunPosition.gunPosition = 2;
        } else {
            gunTypeAndGunPosition.gunType = "enemyArrow";
            gunTypeAndGunPosition.gunPosition = 1;
        }
        return gunTypeAndGunPosition;
    },

    randomChoiceGun(gunPosition) {
        let choiceGunChance = 50;
        let leftGun = this.x - gunPosition;
        let rightGun = this.x + gunPosition;

        return helperController.randomEvent(choiceGunChance) ? leftGun : rightGun;
    },

    shoot(arrowTypeSelectorNameAndGunPosition, y_pos) {
        if (helperController.randomEvent(this.fireChance)) {
            return {
                arrowType: arrowTypeSelectorNameAndGunPosition.gunType,
                x: this.randomChoiceGun(arrowTypeSelectorNameAndGunPosition.gunPosition),
                y: y_pos
            }
        }
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
            this.shieldBody.x.push(i);
        }
        this.shieldBody.y = this.y + 1;
        renderer.renderBossShield(this.shieldBody, true);
        this.shieldOnOrOffCall(this.shieldIsOnSecondsCount, "callTurnOff");
    },

    offShield(bossDying = false) {
        renderer.renderBossShield(this.shieldBody, false);
        this.shieldBody.x = [];
        this.shieldBody.y = null;
        if (!bossDying) this.shieldOnOrOffCall(this.shieldIsOffSecondsCount, "callTurnOn");
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
        if (!this.alive) return;

        let hitCoordinates = null;

        if (thisPlayerWeaponTypeCanMakeDamage) {
            this.lives += -hitData;
            hitCoordinates = {
                hit_x: this.x,
                hit_y: this.y
            }
        } else {
            this.lives += -hitData.damage;
            hitCoordinates = {
                hit_x: hitData.hit_x,
                hit_y: hitData.hit_y
            }
        }
        console.log(this);  // отладка
        if (this.lives > 0) renderer.renderGetDamageBoss(this.getDamageOutlookSelectorName, this.thisSelectorOverlay);
        if (this.lives <= 0) progressController.killBoss(this.destroyedReward, hitCoordinates);
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