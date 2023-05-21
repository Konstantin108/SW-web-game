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
    explosionDamage: 500,
    bonusNewArrowTypeIsActivated: false,
    bonusShieldIsActivated: false,
    superAbilityDamage: 300,
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
    enemyArrowBombDamage: 2,
    enemyArrowBombSpeed: 100,
    // враги
    blockageLives: 1,
    blockageShipDestroyedRewards: 2,
    blockageCrashDamage: 1,
    blockageBullLives: 5,
    blockageBullShipDestroyedRewards: 5,
    blockageBullCrashDamage: 1,
    // босс
    bossLives: 2000,  // возможно изменить параметры босса
    bossDestroyedReward: 2500,
    bossSpeed: 1000,
    bossCrashDamage: 3,
    bossShieldCrashDamage: 3,
    bossShieldIsOnSecondsCount: 10000,
    bossShieldIsOffSecondsCount: 3000,
    bossFireChance: 99,    // разобраться с выстрелами босса
    // уровни и бонусы
    bonuses: bonuses.setBonusesParams(),
    levels: levels.setLevelsParams(),
}