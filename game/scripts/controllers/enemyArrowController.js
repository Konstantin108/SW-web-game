import {EnemyArrow} from "../classes/EnemyArrow.js";
import {EnemyArrowBomb} from "../classes/EnemyArrowBomb.js";
import {config} from "../config/config.js";
import {debugPanel} from "../objects/debugPanel.js";

export const enemyArrowController = {
    debugElementName: "enemyArrowsObjects",
    arrowTypes: {
        enemyArrow: EnemyArrow,
        enemyArrowBomb: EnemyArrowBomb
    },
    enemyArrowsArray: [],

    enemyArrowCreate(shootingBlockageData) {
        if (shootingBlockageData) {
            this.enemyArrowsArray.push(new this.arrowTypes[shootingBlockageData.arrowType](shootingBlockageData.x, shootingBlockageData.y));
        }
    },

    enemyArrowMove() {
        if (!this.enemyArrowsArray.length) return;
        let enemyArrow = this.enemyArrowsArray.at(-1);
        enemyArrow.makeStep();
        if (config.debugEnemyArrowsObjectsShow) {
            debugPanel.objectsInfoShow(this.debugElementName, this.enemyArrowsArray, true);
        }
    }
}