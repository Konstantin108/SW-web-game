import {helperController} from "../controllers/helperController.js";
import {progressController} from "../controllers/progressController.js";
import {blockageController} from "../controllers/blockageController.js";
import {config} from "../config/config.js";
import {renderer} from "../objects/renderer.js";
import {crashChecker} from "../objects/crashChecker.js";
import {enemyArrowController} from "../controllers/enemyArrowController.js";
import {player} from "../objects/player.js";

export class Blockage {
    static #id = 0;
    static thisSelectorOverlay = [
        "drill",
        "trinity",
        "shield",
        "life",
        "killAll"
    ];

    constructor(x, y) {
        this.id = Blockage.#id++;
        this.x = x;
        this.y = y;
        this.lives = config.blockageLives;
        this.shipDestroyedReward = config.blockageShipDestroyedRewards;
        this.speed = helperController.getRandomInt(progressController.maxBlockageSpeed, progressController.minBlockageSpeed);
        this.crashDamage = config.blockageCrashDamage;
        this.missReward = config.missReward;
        this.selectorName = "blockage";
        this.getDamageOutlookSelectorName = "blockageWhite";
        this.arrowTypeSelectorName = "enemyArrow";
    };

    static #shoot(arrowTypeSelectorName, x_pos, y_pos, openFire = false) {
        let fireChance = progressController.fireChance;

        if (openFire) fireChance = 100;
        if (helperController.randomEvent(fireChance)) {
            return {
                arrowType: arrowTypeSelectorName,
                x: x_pos,
                y: y_pos
            };
        }
    };

    step() {
        let blockagesArray = blockageController.blockagesArray;
        let employedPositionsOnXArray = [];

        for (let i = 0; i <= blockagesArray.length; i++) {
            if (blockagesArray[i]) employedPositionsOnXArray.push(blockagesArray[i].x);
        }

        if (!this.#jump(employedPositionsOnXArray)) this.#makeStep(employedPositionsOnXArray);

        renderer.clear(this.selectorName);
        renderer.renderMovingObjects(blockageController.blockagesArray, Blockage.thisSelectorOverlay);
        crashChecker.crashCheck(blockageController.blockagesArray, true);
        progressController.progress();
    };

    #jump(employedPositions) {
        if (player.y >= 10
            && this.y <= 4
            && this.y >= -1
            && !employedPositions.includes(player.x)
            && helperController.randomEvent(progressController.jumpChance)) {
            renderer.renderTeleportation(this.x, this.y, "out");
            this.x = player.x;
            this.y = player.y - helperController.getRandomInt(5, 8);
            renderer.renderTeleportation(this.x, this.y, "in");
            setTimeout(() => {
                enemyArrowController.enemyArrowCreate(Blockage.#shoot(this.arrowTypeSelectorName, this.x, this.y, true));
                enemyArrowController.enemyArrowMove();
            }, 200);
            return true;
        } else {
            return false;
        }
    };

    #makeStep(employedPositions) {
        let x_pos = this.x;
        let y_pos = this.y;

        x_pos += helperController.getRandomInt(-1, 1);
        y_pos += 1;
        if (y_pos <= config.mapSizeY) {
            this.y = y_pos;
            if (x_pos <= config.mapSizeX && x_pos >= 0 && !employedPositions.includes(x_pos)) {
                this.x = x_pos;
            } else {
                x_pos = this.x;
                this.x = x_pos;
            }
            if (this.y > 1) {
                enemyArrowController.enemyArrowCreate(Blockage.#shoot(this.arrowTypeSelectorName, x_pos, y_pos));
                enemyArrowController.enemyArrowMove();
            }
        } else if (y_pos === config.mapSizeY + 1) {
            y_pos = config.mapSizeY + 2;
            this.y = y_pos;
            progressController.scoreUp(this.missReward);
            x_pos = helperController.getRandomInt(0, config.mapSizeX);
            y_pos = 0;
            this.x = x_pos;
            this.y = y_pos;
            renderer.renderStatusBar();
        }
    }

    getDamage(hitData, blockageNumberInBlockagesArray, shipDestroyedReward, newStartPositionOnY) {
        this.lives += -hitData.damage;
        if (this.lives > 0) renderer.renderGetDamageEnemy(hitData, this.getDamageOutlookSelectorName);
        if (this.lives <= 0) progressController.killEnemy(hitData, blockageNumberInBlockagesArray, shipDestroyedReward, newStartPositionOnY);
    };
}