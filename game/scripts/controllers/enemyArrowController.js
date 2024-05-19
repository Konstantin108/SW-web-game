import {EnemyArrow} from "../classes/EnemyArrow.js";
import {EnemyArrowBomb} from "../classes/EnemyArrowBomb.js";
import {arrowMethodsMixin} from "../mixins/arrowMethodsMixin.js";

export const enemyArrowController = {
    __proto__: arrowMethodsMixin,

    debugElementName: "enemyArrowsObjects",
    debugParamName: "debugEnemyArrowsObjectsShow",
    arrowTypes: {
        enemyArrow: EnemyArrow,
        enemyArrowBomb: EnemyArrowBomb
    },
    enemyArrowsArray: [],

    enemyArrowCreate(shootingData) {
        this.enemyArrowsArray.push(new this.arrowTypes[shootingData.arrowType](shootingData.x, shootingData.y));
    },

    enemyArrowMove(force = false) {
        super.arrowMove(this.enemyArrowsArray, this.debugElementName, this.debugParamName, force);
    },

    enemyArrowStop() {
        super.arrowStop(this.enemyArrowsArray);
    }
};