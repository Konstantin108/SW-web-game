import {config} from "../config/config.js";
import {blockageController} from "./blockageController.js";
import {game} from "../game.js";
import {renderer} from "../objects/renderer.js";
import {helperController} from "./helperController.js";
import {player} from "../objects/player.js";
import {bonusController} from "./bonusController.js";
import {boss} from "../objects/boss.js";
import {explosion} from "../objects/explosion.js";
import {tooltipController} from "./tooltipController.js";

export const progressController = {
    levels: config.levels,
    level: config.levels[0].levelNum,
    maxBlockageSpeed: config.levels[0].maxBlockageSpeed,
    minBlockageSpeed: config.levels[0].minBlockageSpeed,
    multiplier: config.levels[0].multiplier,
    fireChance: config.levels[0].fireChance,
    blockageTypes: config.levels[0].blockageTypes,
    bossExist: config.levels[0].bossExist,
    crashMulct: config.crashMulct,
    blockagesCount: 0,
    score: 0,
    shipDestroyed: 0,
    bossDestroyed: 0,
    shipDestroyedCounterForSuperAbilityCharge: 0,
    superAbilityCharge: 0,
    superAbilityIsCharged: config.superAbilityIsCharged,
    useSuperAbilityBtnShowDelaySeconds: config.useSuperAbilityBtnShowDelaySeconds,
    playerCanEnterNewLevel: true,
    bossCalled: false,
    bossKilled: false,

    progress() {
        if (!game.gameIsRunning) return;
        this.blockagesCount = this.compareBlockagesCountAndMapSizeX(config.levels[0].blockagesCount);
        let levelsLeft = config.levels.length;

        blockageController.blockageCreate(this.blockagesCount);

        for (let i = 1; i < this.levels.length; i++) {
            if (this.levels[i].scoreCountForThisLevel <= this.score && this.levels.length === levelsLeft && this.playerCanEnterNewLevel) {
                if (this.levels.length > 2) {
                    this.level = this.levels[i].levelNum;
                    this.multiplier = this.levels[i].multiplier;
                    this.blockagesCount = this.compareBlockagesCountAndMapSizeX(config.levels[i].blockagesCount);
                    this.maxBlockageSpeed = this.levels[i].maxBlockageSpeed;
                    this.minBlockageSpeed = this.levels[i].minBlockageSpeed;
                    this.fireChance = this.levels[i].fireChance;
                    this.blockageTypes = this.levels[i].blockageTypes;
                    this.bossExist = this.levels[i].bossExist;
                    this.bossCalled = false;
                    this.bossKilled = false;
                    this.newLevelEntry(this.blockagesCount);
                    this.levels.shift();
                    levelsLeft += -1;
                    renderer.renderStatusBar();
                } else {
                    this.levels.shift();
                    game.over(true);
                }
            }
            if (this.bossExist && !this.bossCalled && !this.bossKilled) {
                this.bossCalled = true;
                game.playerCanStopGame = false;
                this.playerCanEnterNewLevel = false;
                setTimeout(() => game.playerCanStopGame = false, 1000);
                if (!boss.alive) this.addBossToLevel();
            }
        }
    },

    scoreUp(scoreType) {
        return this.score += scoreType * this.multiplier;
    },

    killEnemy(coordinateObject, blockage, shipDestroyedReward, y_pos, dontCountKilledEnemies = false) {
        let blockageTypes = blockageController.blockageTypesProvider();
        let blockageType = blockageController.blockageCreateOneUnit();

        renderer.renderHit(coordinateObject);
        if (blockageType) blockageController.blockagesArray[blockage] = new blockageTypes[blockageType](helperController.getRandomInt(0, config.mapSizeX), y_pos);
        if (dontCountKilledEnemies) return;
        this.scoreUp(shipDestroyedReward);
        this.shipDestroyed += 1;
        this.superAbilityCharging();
    },

    killBoss(bossDestroyedReward, hitCoordinates) {
        if (!this.playerCanEnterNewLevel) this.scoreUp(bossDestroyedReward);
        boss.bossAnimationIsRunningNow = true;
        game.playerCanStopGame = false;
        this.bossDestroyed += 1;
        renderer.renderStatusBar();
        boss.remove(hitCoordinates);
        setTimeout(() => {
            explosion.explode(false);
            game.playerCanStopGame = false;
            bonusController.destroyAllBonuses();
        }, 6000);
        setTimeout(() => {
            this.playerCanEnterNewLevel = true;
            this.bossKilled = true;
            this.bossCalled = false;
            this.bossExist = false;
            boss.bossAnimationIsRunningNow = false;
        }, 10500);
    },

    scoreDown() {
        let score = this.score;

        score += this.crashMulct * this.multiplier;
        if (score < 0) score = 0;
        this.score = score;
        return this.score;
    },

    superAbilityCharging() {
        if (player.superAbilityIsActivated) return;
        let useSuperAbilityBtnGameControlObject = helperController.getObjectByName(config.gameControl, "useSuperAbilityBtn");

        this.shipDestroyedCounterForSuperAbilityCharge += 1;
        if (this.shipDestroyedCounterForSuperAbilityCharge % 10 === 0) {
            this.superAbilityCharge += 1;
            renderer.renderSuperAbilityBar();
        }
        if (this.superAbilityCharge === this.superAbilityIsCharged) {
            player.superAbilityIsActivated = true;
            this.shipDestroyedCounterForSuperAbilityCharge = 0;
            this.superAbilityCharge = 0;
            tooltipController.tooltipCreateTimerIdsArray.push(setTimeout(() => {
                tooltipController.tooltipCreateAndDestroy(useSuperAbilityBtnGameControlObject);
            }, this.useSuperAbilityBtnShowDelaySeconds));
        }
    },

    // blockagesCount не может быть больше config.mapSizeX и меньше 1
    compareBlockagesCountAndMapSizeX(blockagesCountOnLevel) {
        let blockagesCount = blockagesCountOnLevel;

        if (!blockagesCount) blockagesCount = 1;
        blockagesCount = blockagesCount <= config.mapSizeX ? blockagesCount : config.mapSizeX;
        return blockagesCount;
    },

    newLevelEntry(blockagesCount) {
        let message = `level ${this.level}`;
        let playerCantStopGameTime = 2000;

        game.playerCanStopGame = false;
        renderer.renderInCenterTableNotify(message, 1);
        helperController.removeAllIntervalTimers(blockageController.blockageTimerIdsArray);
        blockageController.blockageCreate(blockagesCount);
        blockageController.blockageMove(blockageController.blockagesArray);
        setTimeout(() => game.playerCanStopGame = true, playerCantStopGameTime);
    },

    addBossToLevel() {
        if (!game.gameIsRunning) return;

        boss.bossAnimationIsRunningNow = true;
        setTimeout(() => renderer.renderInCenterTableNotify("boss", 1), 1000);
        setTimeout(() => {
            explosion.explode(false);
            bonusController.destroyAllBonuses();
        }, 2000);
        setTimeout(() => boss.createBoss(), 3000);
    }
}