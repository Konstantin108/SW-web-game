import {renderer} from "../objects/renderer.js";
import {player} from "../objects/player.js";
import {game} from "../game.js";
import {arrowController} from "../controllers/arrowController.js";
import {blockageController} from "../controllers/blockageController.js";
import {config} from "../config/config.js";
import {boss} from "../objects/boss.js";
import {progressController} from "../controllers/progressController.js";

export class Arrow {
    static id = 0;
    id = Arrow.id++;
    selectorName = "arrow";
    x = player.x;
    y = player.y - 1;
    damage = config.arrowDamage * config.power;
    speed = config.arrowSpeed;
    penetration = config.arrowPenetration;
    hit_x = null;
    hit_y = null;

    step() {
        if (!game.gameIsRunning) return;
        let y_pos = this.y;
        y_pos += -1;
        if (y_pos >= -1) {
            this.y = y_pos;
        } else if (y_pos === -2) {
            y_pos = -3;
            this.y = y_pos;
            this.remove()
        }
        renderer.clear(this.selectorName);
        renderer.renderMovingObjects(arrowController.arrowsArray);
        this.hitBossShield();
        this.hitBoss();
        this.hit();
    }

    makeStep() {
        let timerId = setInterval(() => this.step(), this.speed);
        setTimeout(() => clearInterval(timerId), 1300);
    }

    hit() {
        let blockagesArray = blockageController.blockagesArray;

        for (let i = 0; i < blockagesArray.length; i++) {
            if (blockagesArray[i].x === this.x && blockagesArray[i].y === this.y) {
                this.hit_x = this.x;
                this.hit_y = this.y;
                blockagesArray[i].getDamage(this, i, blockagesArray[i].shipDestroyedReward, 0);
                renderer.renderStatusBar();
                if (!this.penetration) this.outFromMap();
            }
        }
        this.hit_x = null;
        this.hit_y = null;
    }

    hitBoss() {
        if (!progressController.bossExist) return;
        if (boss.bodyX.includes(this.x) && boss.y === this.y) {
            this.hit_x = this.x;
            this.hit_y = this.y;
            this.y = -1;
            boss.getDamage(this);
            this.remove();
        }
        this.hit_x = null;
        this.hit_y = null;
    }

    hitBossShield() {
        if (!progressController.bossExist) return;
        if (!boss.shieldBody.x.length) return;
        if (boss.shieldBody.x.includes(this.x) && boss.shieldBody.y === this.y) {
            boss.bossShieldGetDamage(false, this);
            if (!this.penetration) this.outFromMap();
        }
    }

    outFromMap() {
        this.y = -1;
        renderer.clear(this.selectorName);
        this.remove();
    }

    remove() {
        let arrowsArray = arrowController.arrowsArray;

        for (let i = 0; i <= arrowsArray.length; i++) {
            if (arrowsArray[i]) {
                if (arrowsArray[i].y <= -2) arrowController.arrowsArray.splice(i, 1);
            }
        }
    }
}