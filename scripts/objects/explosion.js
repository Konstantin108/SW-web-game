import {blockageController} from "../controllers/blockageController.js";
import {player} from "./player.js";
import {renderer} from "./renderer.js";
import {progressController} from "../controllers/progressController.js";
import {boss} from "./boss.js";
import {config} from "../config/config.js";

export const explosion = {
    damage: config.explosionDamage,

    explosionCall() {
        if (player.bombsCount > 0) {
            this.explode();
            player.bombsCount += -1;
        } else {
            renderer.renderBombBar(false);
        }
    },

    explode(playerMakeExplosion = true) {
        let blockagesArray = blockageController.blockagesArray;

        renderer.renderExplosion();
        for (let i = 0; i < blockagesArray.length; i++) {
            if (blockagesArray[i].y >= 0) progressController.killEnemy(blockagesArray[i], i, blockagesArray[i].shipDestroyedReward, -8);
        }
        if (playerMakeExplosion) {
            if (progressController.bossExist) boss.getDamage(this.damage, true);
            if (boss.shieldBody.x.length) boss.bossShieldGetDamage(true);
        }
        renderer.renderStatusBar();
        renderer.renderBombBar(false);
    }
}