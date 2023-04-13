import {player} from "../objects/player.js";
import {Arrow} from "../classes/Arrow.js";
import {ArrowDrill} from "../classes/ArrowDrill.js";
import {ArrowTrinity} from "../classes/ArrowTrinity.js";

export const arrowController = {
    arrowTypes: {
        "arrow": Arrow,
        "arrow-drill": ArrowDrill,
        "arrow-trinity": ArrowTrinity
    },
    arrowsArray: [],

    arrowCreate() {
        while (this.arrowsArray.length < player.shootingCount) {
            for (let key in this.arrowTypes) {
                if (key === player.arrowType) {
                    this.arrowsArray.push(new this.arrowTypes[key]);
                }
            }

        }
    },

    arrowMove() {
        for (let i = 0; i < this.arrowsArray.length; i++) {
            if (this.arrowsArray[i]) {
                this.arrowsArray[i].makeStep();
            }
        }
        // console.log("player\'s arrows:");
        // console.log(this.arrowsArray);
    }
}