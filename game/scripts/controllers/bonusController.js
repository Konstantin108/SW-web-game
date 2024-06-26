import {helperController} from "./helperController.js";
import {Bonus} from "../classes/Bonus.js";
import {config} from "../config/config.js";
import {player} from "../objects/player.js";
import {renderer} from "../objects/renderer.js";
import {debugPanel} from "../objects/debugPanel.js";
import {tooltipController} from "./tooltipController.js";

export const bonusController = {
    useBombBtnShowDelaySeconds: config.useBombBtnShowDelaySeconds,
    debugElementName: "bonusesObjects",
    bonusesArray: [],
    bonusAppearanceListenerTimerId: null,

    bonusAppearanceListener() {
        this.bonusAppearanceListenerTimerId = setInterval(() => this.bonusCreate(), 5000);
    },

    bonusAppearanceListenerTimerIdRemove() {
        if (this.bonusAppearanceListenerTimerId) clearInterval(this.bonusAppearanceListenerTimerId);
    },

    bonusCreate() {
        let objectType = helperController.getRandomType(config.bonuses.bonusTypes);
        let actionTime = objectType.actionTime;
        let x = helperController.getRandomInt(0, config.mapSizeX);
        let y = 0;

        if (helperController.randomEvent(config.bonuses.bonusChance)) this.bonusesArray.push(new Bonus(objectType, actionTime, x, y));
        this.bonusMove();
    },

    pickedCheck() {
        for (let i = 0; i < this.bonusesArray.length; i++) {
            this.bonusesArray[i].getBonus(this.bonusesArray[i].picked());
        }
    },

    playerBecomeBonus(bonusName, secondsCount) {
        let objectType = helperController.getObjectByName(config.bonuses.bonusTypes, bonusName);
        let actionTime = secondsCount * 1000;
        let x = player.x
        let y = player.y;

        let bonus = new Bonus(objectType, actionTime, x, y);
        bonus.getBonus(bonus.picked());
    },

    allNewPropertiesForPlayerOffCallCancel() {
        if (player.bonusShieldIsActivatedTimerId) clearTimeout(player.bonusShieldIsActivatedTimerId);
        if (player.bonusNewArrowTypeIsActivatedTimerId) clearTimeout(player.bonusNewArrowTypeIsActivatedTimerId);
        player.bonusShieldIsActivated = false;
        player.bonusNewArrowTypeIsActivated = false;
        for (let i = 0; i < this.bonusesArray.length; i++) {
            if (this.bonusesArray[i]) {
                if (this.bonusesArray[i].timeBonusCanMakeStepTimerId) clearTimeout(this.bonusesArray[i].timeBonusCanMakeStepTimerId);
            }
        }
    },

    resumeGameMakeStepOffCall() {
        for (let i = 0; i < this.bonusesArray.length; i++) {
            if (this.bonusesArray[i]) this.bonusesArray[i].makeStepOff();
        }
    },

    destroyAllBonuses() {
        while (this.bonusesArray.length) {
            this.bonusesArray[0].remove(true);
        }
    },

    getLife() {
        if (player.lives >= config.lives) return;
        player.lives += 1;
        renderer.renderStatusBar();
        renderer.renderHeartScaleAnimation();
    },

    getBomb() {
        if (player.bombsCount >= config.maxBombsCount) return;
        let useBombBtnGameControlObject = helperController.getObjectByName(config.gameControl, "useBombBtn");

        player.bombsCount += 1;
        renderer.renderBombBar();
        tooltipController.tooltipCreateTimerIdsArray.push(setTimeout(() => {
            tooltipController.tooltipCreateAndDestroy(useBombBtnGameControlObject);
        }, this.useBombBtnShowDelaySeconds));
    },

    bonusMove() {
        if (!this.bonusesArray.length) return;
        let bonus = this.bonusesArray.at(-1);
        bonus.makeStep();
        bonus.makeStepOff();
        if (config.debugBonusesObjectsShow) {
            debugPanel.objectsInfoShow(this.debugElementName, this.bonusesArray, true);
        }
    }
};