import {Arrow} from "./Arrow.js";
import {config} from "../config/config.js";

export class ArrowDrill extends Arrow {
    selectorName = "arrow-drill";
    damage = config.arrowDrillDamage;
    speed = config.arrowDrillSpeed;
    penetration = true;
}