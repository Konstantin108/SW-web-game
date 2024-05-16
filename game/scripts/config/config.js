import {bonuses} from "./bonuses.js";
import {levels} from "./levels.js";
import {cheats} from "./cheats.js";
import {debugPanelElements} from "./debugPanelElements.js";
import {pauseMenuOptions} from "./pauseMenuOptions.js";
import {gameControl} from "./gameControl.js";
import {soundBank} from "./soundBank.js";

export const config = {
    // игра и игрок
    domain: "spaceshooter",
    protocol: "http://",
    mapSizeX: 10,
    mapSizeY: 13,
    gameInstantStart: false,
    startGameDelaySecondsCount: 3,  // указывается в секундах
    missReward: 1,
    crashMulct: false,  // потеря очков при аварии отключена
    crashMulctRate: -100,
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
    production: false,  // на релизе true
    gameLoadingSecondsCount: 3000,
    soundOn: false,
    soundBank: soundBank,
    windowClosingConfirmDisable: false,
    stopGameOnWindowBlur: false,  // на релизе true
    // подсказки
    tips: true,
    tip_possibleDirectionsShown: false,
    tip_shootBtnsArrayShown: false,
    tip_useSuperAbilityBtnShown: false,
    tip_useBombBtnShown: false,
    tip_pauseBtnsArrayShown: false,
    tip_localStorageUnavailableMessageShown: false,
    possibleDirectionsShowDelaySeconds: 2000,
    shootBtnsArrayShowDelaySeconds: 4000,
    useSuperAbilityBtnShowDelaySeconds: 1000,
    useBombBtnShowDelaySeconds: 1000,
    pauseBtnsArrayShowDelaySeconds: 11000,
    tooltipControlPanelShowDelaySeconds: 2200,
    // стрелы игрока
    power: 1,
    arrowPenetration: false,
    arrowDamage: 1,
    arrowSpeed: 50,
    arrowAutoShootSpeed: 350,
    arrowDrillDamage: 2,
    arrowDrillSpeed: 20,
    arrowDrillAutoShootSpeed: 200,
    arrowTrinityDamage: 3,
    arrowTrinitySpeed: 80,
    arrowTrinityAutoShootSpeed: 350,
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
    bossDestroyedReward: 3000,
    bossAnotherDestroyedReward: null,
    bossSpeed: 1000,
    bossCrashDamage: 3,
    bossShieldCrashDamage: 3,
    bossShieldIsOnSecondsCount: 7000,
    bossShieldIsOffSecondsCount: 4000,
    bossFireChance: 20,
    bossFireArrowBombChance: 10,
    // уровни, бонусы, читы, элементы дебаг-панели
    levels: levels,
    bonuses: bonuses.setBonusesParams(),
    cheats: cheats.setCheatsParams(),
    cheatActiveStatus: cheats.cheatActiveStatus,
    translatedColorNames: cheats.translatedColorNames,
    bonusCodeNames: cheats.bonusCodeNames,
    cheatsInfinityActiveMode: false,
    paramsFromLocalStorage: [],
    cheatsActivated: [],
    debugPanelElements: debugPanelElements,
    debugPlayerArrowsObjectsShow: false,
    debugEnemyArrowsObjectsShow: false,
    debugBlockagesObjectsShow: false,
    debugBonusesObjectsShow: false,
    debugBossGetDamageInfoShow: false,
    debugActualParamsInfoShow: false,
    // меню паузы и клавиши управления игрой
    pauseMenuOptions: pauseMenuOptions.pauseMenuOptions,
    pauseMenuStructure: pauseMenuOptions.pauseMenuStructure,
    gameControl: gameControl.setGameControl(),
    // объекты canvas (движущийся задний фон)
    galaxiesCount: 3,
    planetsCount: 2,
    slowStarsCount: 30,
    starsCount: 40,
    meteorsCount: 6,
    // изображения, которые заранее кэшируются в фоне
    preCacheImagesArray: [
        "explosion",
        "teleportation",
        "enemy-arrow-bomb",
        "disk",
        "boss",
        "picked"
    ]
};
