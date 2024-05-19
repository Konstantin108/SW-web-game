import {renderer} from "../objects/renderer.js";
import {player} from "../objects/player.js";
import {game} from "../game.js";
import {arrowController} from "../controllers/arrowController.js";
import {blockageController} from "../controllers/blockageController.js";
import {config} from "../config/config.js";
import {boss} from "../objects/boss.js";
import {progressController} from "../controllers/progressController.js";

export class Arrow {
    static #id = 0;

    constructor() {
        this.id = Arrow.#id++;
        this.selectorName = "arrow";
        this.x = player.x;
        this.y = player.y - 1;
        this.damage = config.arrowDamage * config.power;
        this.speed = config.arrowSpeed;
        this.penetration = config.arrowPenetration;
        this.hit_x = null;
        this.hit_y = null;
        this.timerId = null;
        this.clearIntervalTimerId = null;
    };

    #step() {
        if (!game.gameIsRunning) return;
        this.y += -1;
        if (this.y <= -2) Arrow.#remove();
        renderer.clear(this.selectorName);
        renderer.renderMovingObjects(arrowController.arrowsArray);
        this.#hitBossShield();
        this.#hitBoss();
        this.#hit();
    };

    makeStep(force) {
        if (!this.timerId || force) {
            this.timerId = setInterval(() => this.#step(), this.speed);
        }
        if (!this.clearIntervalTimerId || force) {
            this.clearIntervalTimerId = setTimeout(() => clearInterval(this.timerId), 2000);
        }
    };

    #hit() {
        let blockagesArray = blockageController.blockagesArray;

        for (let i = 0; i < blockagesArray.length; i++) {
            if (blockagesArray[i].x === this.x && blockagesArray[i].y === this.y) {
                this.hit_x = this.x;
                this.hit_y = this.y;
                blockagesArray[i].getDamage(this, i, blockagesArray[i].shipDestroyedReward, 0);
                renderer.renderStatusBar();
                this.#outFromMap();
            }
        }
    };

    #hitBoss() {
        if (!progressController.bossExist) return;
        if (boss.bodyX.includes(this.x) && boss.y === this.y) {
            this.hit_x = this.x;
            this.hit_y = this.y;
            boss.getDamage(this);
            this.#outFromMap();
        }
    };

    #hitBossShield() {
        if (!progressController.bossExist) return;
        if (!boss.shieldBody.x.length) return;
        if (boss.shieldBody.x.includes(this.x) && boss.shieldBody.y === Number(this.y)) {
            boss.bossShieldGetDamage(false, this);
            this.#outFromMap();
        }
    };

    #outFromMap() {
        if (this.penetration) return;
        this.y = -1;
        this.hit_x = null;
        this.hit_y = null;
        renderer.clear(this.selectorName);
        Arrow.#remove();
    };

    removeObjectTimers() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
        if (this.clearIntervalTimerId) {
            clearTimeout(this.clearIntervalTimerId);
            this.clearIntervalTimerId = null;
        }
    };

    static #remove() {
        let arrowsArray = arrowController.arrowsArray;

        for (let i = 0; i <= arrowsArray.length; i++) {
            if (arrowsArray[i]) {
                if (arrowsArray[i].y <= -2) {
                    arrowsArray[i].removeObjectTimers();
                    arrowsArray.splice(i, 1);
                }
            }
        }
    };
}