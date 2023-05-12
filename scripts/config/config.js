import {bonuses} from "./bonuses.js";
import {levels} from "./levels.js";

export const config = {
    // игра и игрок
    mapSizeX: 10,
    mapSizeY: 13,
    startGameDelaySecondsCount: 3,
    missReward: 1,
    crashMulct: -100,
    invincibilityAfterCrash: 4000,
    lives: 5,
    maxBombsCount: 1,
    startBombsCount: 0,
    bonusNewArrowTypeIsActivated: false,
    bonusShieldIsActivated: false,
    superAbilityIsActivated: false,
    superAbilityIsCharged: 5,
    // стрелы игрока
    arrowDamage: 1,
    arrowSpeed: 50,
    arrowDrillDamage: 2,
    arrowDrillSpeed: 20,
    arrowTrinityDamage: 3,
    arrowTrinitySpeed: 80,
    // стрелы врагов
    enemyArrowDamage: 1,
    enemyArrowSpeed: 200,
    enemyArrowBombDamage: 3,
    enemyArrowBombSpeed: 100,
    // враги и босс
    blockageLives: 1,
    blockageShipDestroyedRewards: 2,
    blockageBullLives: 5,
    blockageBullShipDestroyedRewards: 3,
    bossLives: 100,
    bossDestroyedReward: 1000,
    // уровни и бонусы
    bonuses: bonuses.setBonusesParams(),
    levels: levels.setLevelsParams(),
}