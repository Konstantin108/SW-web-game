import {config} from "../config/config.js";
import {blockageController} from "./blockageController.js";
import {game} from "../game.js";
import {renderer} from "../objects/renderer.js";
import {helperController} from "./helperController.js";
import {player} from "../objects/player.js";
import {bonusController} from "./bonusController.js";

export const progressController = {
    levels: config.levels,
    level: config.levels[0].levelNum,
    maxBlockageSpeed: config.levels[0].maxBlockageSpeed,
    minBlockageSpeed: config.levels[0].minBlockageSpeed,
    multiplier: config.levels[0].multiplier,
    fireChance: config.levels[0].fireChance,
    blockageTypes: config.levels[0].blockageTypes,
    blockagesCount: 0,
    score: 0,
    shipDestroyer: 0,
    shipDestroyedCounterForSuperAbilityCharge: 0,
    superAbilityCharge: 0,
    superAbilityIsCharged: config.superAbilityIsCharged,

    progress() {
        this.blockagesCount = this.compareBlockagesCountAndMapSizeX(config.levels[0].blockagesCount);
        let levelsLeft = config.levels.length;

        blockageController.blockageCreate(this.blockagesCount);

        for (let i = 1; i < this.levels.length; i++) {
            if (this.levels[i].scoreCountForThisLevel <= this.score && this.levels.length === levelsLeft) {
                if (this.levels.length > 2) {
                    this.level = this.levels[i].levelNum;
                    this.multiplier = this.levels[i].multiplier;
                    this.blockagesCount = this.compareBlockagesCountAndMapSizeX(config.levels[i].blockagesCount);
                    this.maxBlockageSpeed = this.levels[i].maxBlockageSpeed;
                    this.minBlockageSpeed = this.levels[i].minBlockageSpeed;
                    this.fireChance = this.levels[i].fireChance;
                    this.blockageTypes = this.levels[i].blockageTypes;
                    this.newLevelEntry(this.blockagesCount);
                    this.levels.shift();
                    levelsLeft += -1;
                    renderer.renderStatusBar();
                } else {
                    this.levels.shift();
                    game.over(true);
                }
            }
        }
    },

    scoreUp(scoreType) {
        return this.score += scoreType * this.multiplier;
    },

    killEnemy(coordinateObject, blockage, shipDestroyedReward, y_pos) {
        let blockageTypes = blockageController.blockageTypesProvider();
        let blockageType = blockageController.blockageCreateOneUnit();

        renderer.renderHit(coordinateObject);
        this.scoreUp(shipDestroyedReward);
        this.shipDestroyer += 1;
        this.superAbilityCharging();
        if (blockageType) blockageController.blockagesArray[blockage] = new blockageTypes[blockageType](helperController.getRandomInt(0, config.mapSizeX), y_pos);
    },

    scoreDown() {
        let score = this.score;

        score += config.crashMulct * this.multiplier;
        if (score < 0) score = 0;
        this.score = score;
        return this.score;
    },

    superAbilityCharging() {
        if (player.superAbilityIsActivated) return;
        this.shipDestroyedCounterForSuperAbilityCharge += 1;
        if (this.shipDestroyedCounterForSuperAbilityCharge % 10 === 0) {
            this.superAbilityCharge += 1;
            renderer.renderSuperAbilityBar();
        }
        if (this.superAbilityCharge === this.superAbilityIsCharged) {
            player.superAbilityIsActivated = true;
            this.shipDestroyedCounterForSuperAbilityCharge = 0;
            this.superAbilityCharge = 0;
        }
    },

    compareBlockagesCountAndMapSizeX(blockagesCountOnLevel) {           // blockegesCount не может быть больше config.mapSizeX
        let blockagesCount = null;

        if (blockagesCountOnLevel <= config.mapSizeX) {
            blockagesCount = blockagesCountOnLevel;
        } else {
            blockagesCount = config.mapSizeX;
        }
        return blockagesCount;
    },

    newLevelEntry(blockagesCount) {
        console.log(`Переход на новый уровень => Уровень ${progressController.level}\nПоздравляем!`);
        helperController.removeAllTimers(blockageController.blockageTimerIdsArray);
        blockageController.blockageCreate(blockagesCount);
        bonusController.bonusAppearanceListener();
        blockageController.blockageMove(blockageController.blockagesArray);
    },
}