import {helperController} from "../controllers/helperController.js";
import {renderer} from "./renderer.js";
import {config} from "../config/config.js";
import {game} from "../game.js";
import {player} from "./player.js";

export const boss = {
    x: helperController.getCenterMapOnX(),
    y: 3,
    lives: config.bossLives,
    destroyedReward: config.bossDestroyedReward,
    speed: config.bossSpeed,
    selectorName: "boss",
    getDamageOutlookSelectorName: "bossWhite",
    offsetX: 7,
    bodyX: [],
    toTheRight: true,
    timerId: null,
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

    createBoss() {
        player.canMove = false;
        renderer.renderTeleportation();
        player.x = helperController.getCenterMapOnX();
        player.y = config.mapSizeY;
        player.move();
        if (player.invincibility) renderer.clear("invincibility");
        renderer.clear(player.selectorName);
        if (player.extraSelectorName) renderer.clear(player.extraSelectorName);
        setTimeout(() => {
            renderer.renderTeleportation();
            renderer.renderPlayer();
        }, 500);

        for (let i = this.x - this.getBossBodyEdgeOnX(); i <= this.offsetX + 1; i++) {
            this.bodyX.push(i);
        }
        renderer.renderBossCreate();
        renderer.renderBoss(this.selectorName, this.thisSelectorOverlay);
        setTimeout(() => {
            this.makeStep();
            player.canMove = true;
        }, 2000);
        setTimeout(() => this.onShield(), 1500);
    },

    step() {
        if (!game.gameIsRunning) return;
        if (this.toTheRight) {
            this.x += 1;
            if (this.x === config.mapSizeX - 3) this.toTheRight = false;
        } else {
            this.x += -1;
            if (this.x === 3) this.toTheRight = true;
        }
        renderer.clear(this.selectorName);
        renderer.renderBoss(this.selectorName, this.thisSelectorOverlay);
    },

    makeStep() {
        this.timerId = setInterval(() => this.step(), this.speed);
    },

    makeStepOff() {
        clearInterval(this.timerId);
    },

    onShield() {
        let shieldBody = {
            x: [],
            y: this.y + 1
        };

        for (let i = 0; i <= config.mapSizeX; i++) {
            shieldBody.x.push(i)
        }
        renderer.renderBossShield(shieldBody);
    },

    getDamage(hitData) {
        this.lives += -hitData.damage;
        console.log(this);
        if (this.lives > 0) renderer.renderGetDamageBoss(this.getDamageOutlookSelectorName, this.thisSelectorOverlay);
    }
}