import {config} from "../config/config.js";
import {game} from "../game.js";
import {renderer} from "../objects/renderer.js";
import {enemyArrowController} from "../controllers/enemyArrowController.js";
import {crashChecker} from "../objects/crashChecker.js";
import {player} from "../objects/player.js";

export class EnemyArrow {
    constructor(x, y) {
        this.x = x;
        this.y = y + 1;
    }

    static id = 0;
    id = EnemyArrow.id++;
    selectorName = "enemyArrow";
    damage = config.enemyArrowDamage;
    speed = config.enemyArrowSpeed;
    hit_x = null;
    hit_y = null;

    step() {
        if (!game.gameIsRunning) return;
        let y_pos = this.y;
        y_pos += 1;
        if (y_pos <= config.mapSizeY) {
            this.y = y_pos;
        } else if (y_pos === config.mapSizeY + 1) {
            y_pos = config.mapSizeY + 2;
            this.y = y_pos;
            renderer.clear(this.selectorName);
            this.remove();
        }
        renderer.clear(this.selectorName);
        renderer.renderMovingObjects(enemyArrowController.enemyArrowsArray);
        this.hit();
    }

    makeStep() {
        let timerId = setInterval(() => this.step(), this.speed);
        setTimeout(() => clearInterval(timerId), 2000);
    }

    hit() {
        if (player.x === this.x && player.y === this.y) {
            this.hit_x = this.x;
            this.hit_y = this.y;
            crashChecker.crashCheck(enemyArrowController.enemyArrowsArray);
            this.y = config.mapSizeY + 2;
            renderer.clear(this.selectorName);
            this.remove();
        }
        this.hit_x = null;
        this.hit_y = null;
    }

    remove() {
        let enemyArrowsArray = enemyArrowController.enemyArrowsArray;

        for (let i = 0; i <= enemyArrowsArray.length; i++) {
            if (enemyArrowsArray[i]) {
                let lastEnemyArrowInArray = enemyArrowsArray.at(-1);
                if (lastEnemyArrowInArray) {
                    if (lastEnemyArrowInArray.id - enemyArrowsArray[i].id > 15) enemyArrowsArray.splice(i, 1);
                }
                if (enemyArrowsArray[i].y >= config.mapSizeY) enemyArrowsArray.splice(i, 1);
            }
        }
    }
}