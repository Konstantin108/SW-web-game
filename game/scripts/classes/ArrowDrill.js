import {Arrow} from "./Arrow.js";
import {config} from "../config/config.js";

export class ArrowDrill extends Arrow {
    constructor() {
        super();
        this.selectorName = "arrow-drill";
        this.damage = config.arrowDrillDamage * config.power;
        this.speed = config.arrowDrillSpeed;
        this.penetration = true;
    };
}