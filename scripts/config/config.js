import {bonuses} from "./bonuses.js";
import {levels} from "./levels.js";
import {blockages} from "./blockages.js";

export const config = {
    mapSizeX: 10,
    mapSizeY: 13,
    missReward: 1,
    crashMulct: -100,
    invincibilityAfterCrash: 4000,
    lives: 5,
    maxBombsCount: 1,
    startBombsCount: 0,
    superAbilityIsActivated: false,
    superAbilityIsCharged: 5,
    blockages: blockages.setBlockagesParams(),
    bonuses: bonuses.setBonusesParams(),
    levels: levels.setLevelsParams(),
}