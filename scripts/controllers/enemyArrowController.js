import {EnemyArrow} from "../classes/EnemyArrow.js";
import {EnemyArrowBomb} from "../classes/EnemyArrowBomb.js";

export const enemyArrowController = {
    arrowTypes: {
        "enemyArrow": EnemyArrow,
        "enemyArrowBomb": EnemyArrowBomb
    },
    enemyArrowsArray: [],

    enemyArrowCreate(shootingBlockageData) {
        if (shootingBlockageData) this.enemyArrowsArray.push(new this.arrowTypes[shootingBlockageData.arrowType](shootingBlockageData.x, shootingBlockageData.y));
    },

    enemyArrowMove() {
        if (!this.enemyArrowsArray.length) return;
        let enemyArrow = this.enemyArrowsArray.at(-1);
        enemyArrow.makeStep();
        // console.log("enemy arrows:")
        // console.log(this.enemyArrowsArray);
    }
}