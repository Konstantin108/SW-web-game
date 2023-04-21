import {Arrow} from "./Arrow.js";

export class ArrowTrinity extends Arrow {
    constructor(x) {
        super();
        this.x = x;
    }

    selectorName = "arrow-trinity";
    damage = 3;
    speed = 80;
}