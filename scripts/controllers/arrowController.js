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
        for (let key in this.arrowTypes) {
            if (key === player.arrowType && key != "arrow-trinity") {
                this.arrowsArray.push(new this.arrowTypes[key]);
            }
            if (key === player.arrowType && key === "arrow-trinity") {
                this.arrowsArray.push(new this.arrowTypes[key](player.x - 1), new this.arrowTypes[key](player.x), new this.arrowTypes[key](player.x + 1));
            }
        }
    },

    arrowMove() {
        for (let i = 0; i < this.arrowsArray.length; i++) {
            if (this.arrowsArray[i]) this.arrowsArray[i].makeStep();
        }
        // console.log("player\'s arrows:");
        // console.log(this.arrowsArray);
    }
}