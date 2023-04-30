import {helperController} from "./helperController.js";
import {Bonus} from "../classes/Bonus.js";
import {config} from "../config/config.js";
import {renderer} from "../objects/renderer.js";
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

    allNewPropertiesForPlayerOff() {
        renderer.clear(player.selectorName);
        player.selectorName = "player";
        player.arrowType = "arrow";
        player.extraSelectorName = null;
        renderer.renderPlayer();
        renderer.clear(player.extraSelectorName);
        renderer.renderBonusBarElement("newArrowTypeBar", true);
        renderer.renderBonusBarElement("shieldBar", true);
    },

    bonusMove() {
        for (let i = 0; i < this.bonusesArray.length; i++) {
            if (this.bonusesArray[i]) this.bonusesArray[i].makeStep();
        }
        // console.log("bonuses:")
        // console.log(this.bonusesArray);
    }
}