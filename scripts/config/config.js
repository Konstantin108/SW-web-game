import {bonuses} from "./bonuses.js";
import {levels} from "./levels.js";
import {cheats} from "./cheats.js";
import {debugPanelElements} from "./debugPanelElements.js";
import {pauseMenuOptions} from "./pauseMenuOptions.js";

export const config = {
    // игра и игрок
    mapSizeX: 10,
    mapSizeY: 13,
    gameInstantStart: false,
    startGameDelaySecondsCount: 3,
    missReward: 1,
    crashMulct: -100,
    invincibilityAfterCrash: 4000,
    invincibility: false,
    lives: 5,
    maxBombsCount: 1,
    startBombsCount: 0,
    explosionDamage: 500,
    bonusNewArrowTypeIsActivated: false,
    bonusShieldIsActivated: false,
    superAbilityDamage: 300,
    superAbilityIsActivated: false,
    superAbilityIsCharged: 5,
    superAbilityIsAlwaysCharged: false,
    menuColor: "viridis",
    debugMode: false,
    production: true,
    // стрелы игрока
    power: 1,
    arrowPenetration: false,
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
    bossLives: 2000,
    bossDestroyedReward: 2500,
    bossAnotherDestroyedReward: null,
    bossSpeed: 1000,
    bossCrashDamage: 3,
    bossShieldCrashDamage: 3,
    bossShieldIsOnSecondsCount: 7000,
    bossShieldIsOffSecondsCount: 3000,
    bossFireChance: 20,
    bossFireArrowBombChance: 10,
    // уровни, бонусы, читы, элементы дебаг-панели
    bonuses: bonuses.setBonusesParams(),
    levels: levels.setLevelsParams(),
    cheats: cheats.setCheatsParams(),
    translatedColorNames: cheats.setTranslatedColorNames(),
    bonusCodeNames: cheats.setBonusCodeNames(),
    cheatsInfinityActiveMode: false,
    paramsFromLocalStorage: [],
    cheatsActivated: [],
    debugPanelElements: debugPanelElements.setDebugPanelElementsParams(),
    debugPlayerArrowsObjectsShow: false,
    debugEnemyArrowsObjectsShow: false,
    debugBlockagesObjectsShow: false,
    debugBonusesObjectsShow: false,
    debugBossGetDamageInfoShow: false,
    debugActualParamsInfoShow: false,
    // меню паузы
    pauseMenuOptions: pauseMenuOptions.setPauseMenuOptions(),
    pauseMenuStructure: pauseMenuOptions.setPauseMenuStructure()
}