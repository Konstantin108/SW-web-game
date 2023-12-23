import {EnemyArrow} from "./EnemyArrow.js";
import {config} from "../config/config.js";

export class EnemyArrowBomb extends EnemyArrow {
    selectorName = "enemyArrowBomb";
    damage = config.enemyArrowBombDamage;
    speed = config.enemyArrowBombSpeed;
}