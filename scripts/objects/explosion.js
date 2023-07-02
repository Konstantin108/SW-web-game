import {blockageController} from "../controllers/blockageController.js";
import {player} from "./player.js";
import {renderer} from "./renderer.js";
import {progressController} from "../controllers/progressController.js";
import {boss} from "./boss.js";
import {config} from "../config/config.js";

export const explosion = {
    damage: config.explosionDamage,

    explosionCall() {
        let playerHasBomb = true;

        if (player.bombsCount > 0) {
            this.explode();
            player.bombsCount += -1;
        } else {
            playerHasBomb = false;
        }
        renderer.renderBombBar(playerHasBomb);
    },

    explode(playerMakeExplosion = true) {
        let blockagesArray = blockageController.blockagesArray;
        let dontCountKilledEnemies = true;

        if (playerMakeExplosion) {
            if (progressController.bossExist) boss.getDamage(this.damage, true);
            if (boss.shieldBody.x.length) boss.bossShieldGetDamage(true);
            dontCountKilledEnemies = false;
        }

        for (let i = 0; i < blockagesArray.length; i++) {
            if (blockagesArray[i].y >= 0) progressController.killEnemy(blockagesArray[i], i, blockagesArray[i].shipDestroyedReward, -8, dontCountKilledEnemies);
        }
        renderer.renderExplosion();
        renderer.renderStatusBar();
    }
}