import {helperController} from "../controllers/helperController.js";
import {renderer} from "./renderer.js";
import {config} from "../config/config.js";

export const boss = {
    lives: config.bossLives,
    destroyedReward: config.bossDestroyedReward,
    x: helperController.getCenterMapOnX(),
    y: 2,
    offsetX: 7,
    bodyX: [],
    thisSelectorOverlay: [
        "player",
        "player-drill",
        "player-trinity",
        "blockage",
        "blockageWhite",
        "blockageBull",
        "blockageWhiteBull",
        "arrow",
        "enemyArrow",
        "enemyArrowBomb",
        "drill",
        "trinity",
        "shield",
        "life",
        "killAll"
    ],

    getBossBodyEdgeOnX() {
        return (this.offsetX - 1) / 2;
    },

    putBossBody() {
        for (let i = this.x - this.getBossBodyEdgeOnX(); i <= this.offsetX + 1; i++) {
            this.bodyX.push(i);
        }
        renderer.renderBoss(this.thisSelectorOverlay);
    },

    getDamage(hitData) {
        this.lives += -hitData.damage;
        console.log(this);
        if (this.lives > 0) renderer.renderGetDamageBoss(this.thisSelectorOverlay);
    }
}