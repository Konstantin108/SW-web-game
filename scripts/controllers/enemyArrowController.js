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
        for (let i = 0; i < this.enemyArrowsArray.length; i++) {
            if (this.enemyArrowsArray[i]) this.enemyArrowsArray[i].makeStep();
        }
        // console.log("enemy arrows:")
        // console.log(this.enemyArrowsArray);
    }
}