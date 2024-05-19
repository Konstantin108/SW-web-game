import {player} from "../objects/player.js";
import {Arrow} from "../classes/Arrow.js";
import {ArrowDrill} from "../classes/ArrowDrill.js";
import {ArrowTrinity} from "../classes/ArrowTrinity.js";
import {arrowMethodsMixin} from "../mixins/arrowMethodsMixin.js";

export const arrowController = {
    __proto__: arrowMethodsMixin,

    debugElementName: "playerArrowsObjects",
    debugParamName: "debugPlayerArrowsObjectsShow",
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

    arrowMove(force = false) {
        super.arrowMove(this.arrowsArray, this.debugElementName, this.debugParamName, force);
    },

    arrowStop() {
        super.arrowStop(this.arrowsArray);
    }
};