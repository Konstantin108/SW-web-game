import {Arrow} from "./Arrow.js";
import {config} from "../config/config.js";

export class ArrowTrinity extends Arrow {
    constructor(x) {
        super();
        this.x = x;
        this.selectorName = "arrow-trinity";
        this.damage = config.arrowTrinityDamage * config.power;
        this.speed = config.arrowTrinitySpeed;
    }
}