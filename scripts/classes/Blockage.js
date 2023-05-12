import {helperController} from "../controllers/helperController.js";
import {progressController} from "../controllers/progressController.js";
import {blockageController} from "../controllers/blockageController.js";
import {config} from "../config/config.js";
import {renderer} from "../objects/renderer.js";
import {crashChecker} from "../objects/crashChecker.js";
import {enemyArrowController} from "../controllers/enemyArrowController.js";

export class Blockage {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    lives = config.blockageLives;
    shipDestroyedReward = config.blockageShipDestroyedRewards;
    selectorName = "blockage";
    getDamageOutlookSelectorName = "blockageWhite";
    arrowTypeSelectorName = "enemyArrow";
    thisSelectorOverlay = [
        "drill",
        "trinity",
        "shield",
        "life",
        "killAll"
    ];
    speed = helperController.getRandomInt(progressController.maxBlockageSpeed, progressController.minBlockageSpeed);

    shoot(arrowTypeSelectorName, x_pos, y_pos) {
        if (helperController.randomEvent(progressController.fireChance)) {
            return {
                arrowType: arrowTypeSelectorName,
                x: x_pos,
                y: y_pos
            }
        }
    }

    step() {
        let blockagesArray = blockageController.blockagesArray;
        let x_pos = this.x;
        let y_pos = this.y;
        let employedPositionsOnXArray = [];

        for (let i = 0; i <= blockagesArray.length; i++) {
            if (blockagesArray[i]) {
                employedPositionsOnXArray.push(blockagesArray[i].x);
            }
        }
        x_pos += helperController.getRandomInt(-1, 1);
        y_pos += 1;
        if (y_pos <= config.mapSizeY) {
            this.y = y_pos;
            if (x_pos <= config.mapSizeX && x_pos >= 0 && !employedPositionsOnXArray.includes(x_pos)) {
                this.x = x_pos;
            } else {
                x_pos = this.x;
                this.x = x_pos;
            }
            if (this.y > 1) {
                enemyArrowController.enemyArrowCreate(this.shoot(this.arrowTypeSelectorName, x_pos, y_pos));
                enemyArrowController.enemyArrowMove();
            }
        } else if (y_pos === config.mapSizeY + 1) {
            y_pos = config.mapSizeY + 2;
            this.y = y_pos;
            progressController.scoreUp(config.missReward);
            x_pos = helperController.getRandomInt(0, config.mapSizeX);
            y_pos = 0;
            this.x = x_pos;
            this.y = y_pos;
            renderer.renderStatusBar();
        }
        renderer.clear(this.selectorName);
        renderer.renderMovingObjects(blockageController.blockagesArray, this.thisSelectorOverlay);
        crashChecker.crashCheck(blockageController.blockagesArray, true);
        progressController.progress();
    }

    getDamage(hitData, blockageNumberInBlockagesArray, shipDestroyedReward, newStartPositionOnY) {
        this.lives += -hitData.damage;
        if (this.lives > 0) renderer.renderGetDamageEnemy(hitData, this.getDamageOutlookSelectorName);
        if (this.lives <= 0) progressController.killEnemy(hitData, blockageNumberInBlockagesArray, shipDestroyedReward, newStartPositionOnY);
    }
}