import {blockageController} from "../controllers/blockageController.js";
import {player} from "./player.js";
import {renderer} from "./renderer.js";
import {progressController} from "../controllers/progressController.js";

export const explosion = {

    explosionCall() {
        if (player.bombsCount > 0) {
            this.explode();
            player.bombsCount += -1;
        } else {
            renderer.renderBombBar(false);
        }
    },

    explode() {
        let blockagesArray = blockageController.blockagesArray;

        renderer.renderExplosion();
        for (let i = 0; i < blockagesArray.length; i++) {
            if (blockagesArray[i].y >= 0) progressController.killEnemy(blockagesArray[i], i, blockagesArray[i].shipDestroyedReward, -8);
        }
        renderer.renderStatusBar();
        renderer.renderBombBar();
    }
}