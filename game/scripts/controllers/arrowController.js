import {player} from "../objects/player.js";
import {Arrow} from "../classes/Arrow.js";
import {ArrowDrill} from "../classes/ArrowDrill.js";
import {ArrowTrinity} from "../classes/ArrowTrinity.js";
import {config} from "../config/config.js";
import {debugPanel} from "../objects/debugPanel.js";

export const arrowController = {
    debugElementName: "playerArrowsObjects",
    arrowTypes: {
        "arrow": Arrow,
        "arrow-drill": ArrowDrill,
        "arrow-trinity": ArrowTrinity
    },
    arrowsArray: [],

    arrowCreate() {
        let arrowType = player.arrowType;

        if (arrowType === "arrow-trinity") {
            this.arrowsArray.push(
                new this.arrowTypes[arrowType](player.x - 1),
                new this.arrowTypes[arrowType](player.x),
                new this.arrowTypes[arrowType](player.x + 1)
            );
        } else {
            this.arrowsArray.push(new this.arrowTypes[arrowType]);
        }
    },

    arrowMove() {
        for (let i = 0; i < this.arrowsArray.length; i++) {
            if (this.arrowsArray[i]) this.arrowsArray[i].makeStep();
        }
        if (config.debugPlayerArrowsObjectsShow) {
            debugPanel.objectsInfoShow(this.debugElementName, this.arrowsArray, true);
        }
    }
}