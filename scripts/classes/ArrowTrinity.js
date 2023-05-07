import {Arrow} from "./Arrow.js";
import {config} from "../config/config.js";

export class ArrowTrinity extends Arrow {
    constructor(x) {
        super();
        this.x = x;
    }

    selectorName = "arrow-trinity";
    damage = config.arrowTrinityDamage;
    speed = config.arrowTrinitySpeed;
}