import {blockageController} from "../controllers/blockageController.js";
import {Arrow} from "./Arrow.js";
import {renderer} from "../objects/renderer.js";
import {config} from "../config/config.js";

export class ArrowDrill extends Arrow {
    selectorName = "arrow-drill";
    damage = config.arrowDrillDamage;
    speed = config.arrowDrillSpeed;

    hit() {
        let blockagesArray = blockageController.blockagesArray;

        for (let i = 0; i < blockagesArray.length; i++) {
            if (blockagesArray[i].x === this.x && blockagesArray[i].y === this.y) {
                this.hit_x = this.x;
                this.hit_y = this.y;
                blockagesArray[i].getDamage(this, i, blockagesArray[i].shipDestroyedReward, 0);
                renderer.renderStatusBar();
            }
        }
        this.hit_x = null;
        this.hit_y = null;
    }
}