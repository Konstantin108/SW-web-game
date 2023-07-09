import {helperController} from "./helperController.js";
import {Bonus} from "../classes/Bonus.js";
import {config} from "../config/config.js";
import {player} from "../objects/player.js";

export const bonusController = {
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
        let pickedBonus = null;

        for (let i = 0; i < this.bonusesArray.length; i++) {
            pickedBonus = this.bonusesArray[i].getBonus(this.bonusesArray[i].picked());
        }
        if (pickedBonus) return pickedBonus;
    },

    playerBecomeBonus(bonusName, secondsCount) {
        let objectType = helperController.getObjectByName(config.bonuses.bonusTypes, bonusName);
        let actionTime = secondsCount * 1000;
        let x = player.x
        let y = player.y;

        let bonus = new Bonus(objectType, actionTime, x, y);
        bonus.getBonus(bonus);
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
        let bonusesArray = this.bonusesArray;

        while (bonusesArray.length) {
            for (let i = 0; i < bonusesArray.length; i++) {
                if (this.bonusesArray[i]) this.bonusesArray[i].destroy();
            }
        }
    },

    bonusMove() {
        if (!this.bonusesArray.length) return;
        let bonus = this.bonusesArray.at(-1);
        bonus.makeStep();
        bonus.makeStepOff();
        // console.log("bonuses:")
        // console.log(this.bonusesArray);
    }
}