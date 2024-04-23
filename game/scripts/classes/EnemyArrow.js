import {config} from "../config/config.js";
import {game} from "../game.js";
import {renderer} from "../objects/renderer.js";
import {enemyArrowController} from "../controllers/enemyArrowController.js";
import {crashChecker} from "../objects/crashChecker.js";
import {player} from "../objects/player.js";

export class EnemyArrow {
    static #id = 0;

    constructor(x, y) {
        this.id = EnemyArrow.#id++;
        this.selectorName = "enemyArrow";
        this.x = x;
        this.y = y + 1;
        this.damage = config.enemyArrowDamage;
        this.speed = config.enemyArrowSpeed;
        this.hit_x = null;
        this.hit_y = null;
    }

    #step() {
        if (!game.gameIsRunning) return;
        this.y += 1;
        if (this.y >= config.mapSizeY + 1) {
            renderer.clear(this.selectorName);
            EnemyArrow.#remove();
        }
        renderer.clear(this.selectorName);
        renderer.renderMovingObjects(enemyArrowController.enemyArrowsArray);
        this.#hit();
    }

    makeStep() {
        let timerId = setInterval(() => this.#step(), this.speed);
        setTimeout(() => clearInterval(timerId), 2000);
    }

    #hit() {
        if (player.x === this.x && player.y === this.y) {
            this.hit_x = this.x;
            this.hit_y = this.y;
            crashChecker.crashCheck(enemyArrowController.enemyArrowsArray);
            this.y = config.mapSizeY + 2;
            renderer.clear(this.selectorName);
            EnemyArrow.#remove();
        }
        this.hit_x = null;
        this.hit_y = null;
    }

    static #remove() {
        let enemyArrowsArray = enemyArrowController.enemyArrowsArray;

        for (let i = 0; i <= enemyArrowsArray.length; i++) {
            if (enemyArrowsArray[i]) {
                let lastEnemyArrowInArray = enemyArrowsArray.at(-1);
                if (lastEnemyArrowInArray) {
                    if (lastEnemyArrowInArray.id - enemyArrowsArray[i].id > 15) enemyArrowsArray.splice(i, 1);
                }
                if (enemyArrowsArray[i].y >= config.mapSizeY + 1) enemyArrowsArray.splice(i, 1);
            }
        }
    }
}