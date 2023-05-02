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
        clearInterval(this.bonusAppearanceListenerTimerId);
    },

    bonusCreate() {
        if (helperController.randomEvent(config.bonuses.bonusChance)) this.bonusesArray.push(new Bonus());
        this.bonusMove();
    },

    pickedCheck() {
        let pickedBonus = null;

        for (let i = 0; i < this.bonusesArray.length; i++) {
            pickedBonus = this.bonusesArray[i].getBonus(this.bonusesArray[i].picked());
        }
        if (pickedBonus) return pickedBonus;
    },

    allNewPropertiesForPlayerOffCallCancel() {
        clearTimeout(player.bonusShieldIsActivatedTimerId);
        clearTimeout(player.bonusNewArrowTypeIsActivatedTimerId);
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

    bonusMove() {
        for (let i = 0; i < this.bonusesArray.length; i++) {
            if (this.bonusesArray[i]) {
                this.bonusesArray[i].makeStep();
                this.bonusesArray[i].makeStepOff();
            }
        }
        // console.log("bonuses:")
        // console.log(this.bonusesArray);
    }
}