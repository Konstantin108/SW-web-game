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
    superAbilityDamage: 100,
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
    blockageCrashDamage: 1,
    blockageBullLives: 5,
    blockageBullShipDestroyedRewards: 3,
    blockageBullCrashDamage: 1,
    bossLives: 10000,
    bossDestroyedReward: 10000,
    bossSpeed: 1000,
    bossCrashDamage: 3,
    bossShieldCrashDamage: 3,
    bossShieldIsOnSecondsCount: 10000,  // возможно увеличить время действия щита
    bossShieldIsOffSecondsCount: 3000,
    // уровни и бонусы
    bonuses: bonuses.setBonusesParams(),
    levels: levels.setLevelsParams(),
}