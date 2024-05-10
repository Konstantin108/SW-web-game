import {EnemyArrow} from "./EnemyArrow.js";
import {config} from "../config/config.js";

export class EnemyArrowBomb extends EnemyArrow {
    constructor(x, y) {
        super(x, y);
        this.selectorName = "enemyArrowBomb";
        this.damage = config.enemyArrowBombDamage;
        this.speed = config.enemyArrowBombSpeed;
    };
}