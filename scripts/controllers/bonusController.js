import {helperController} from "./helperController.js";
import {Bonus} from "../classes/Bonus.js";
import {config} from "../config/config.js";

export const bonusController = {
    bonusesArray: [],

    bonusAppearanceListener() {
        setInterval(() => this.bonusCreate(), 5000);
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

    bonusMove() {
        for (let i = 0; i < this.bonusesArray.length; i++) {
            if (this.bonusesArray[i]) this.bonusesArray[i].makeStep();
        }
        // console.log("bonuses:")
        // console.log(this.bonusesArray);
    }
}