import {renderer} from "../objects/renderer.js";
import {player} from "../objects/player.js";
import {game} from "../game.js";
import {arrowController} from "../controllers/arrowController.js";
import {blockageController} from "../controllers/blockageController.js";

export class Arrow {
    static id = 0;
    id = Arrow.id++;
    selectorName = "arrow";
    x = player.x;
    y = player.y - 1;
    damage = 1;
    speed = 50;
    hit_x = null;
    hit_y = null;

    step() {
        if (!game.gameIsRuned) return;
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
                this.y = -1;
                renderer.clear(this.selectorName);
                blockagesArray[i].getDamage(this, i, blockagesArray[i].shipDestroyedReward, 0);
                renderer.renderStatusBar();
                this.remove();
            }
        }
        this.hit_x = null;
        this.hit_y = null;
    }

    remove() {
        let arrowsArray = arrowController.arrowsArray;

        for (let i = 0; i <= arrowsArray.length; i++) {
            if (arrowsArray[i]) {
                if (arrowsArray[i].id === this.id) {
                    arrowController.arrowsArray.splice(i, 1);
                }
            }
        }
    }
}