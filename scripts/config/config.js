import {bonuses} from "./bonuses.js";
import {levels} from "./levels.js";

export const config = {
    mapSizeX: 10,
    mapSizeY: 13,
    startGameDelayNumber: 3,
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
    bonuses: bonuses.setBonusesParams(),
    levels: levels.setLevelsParams(),
}