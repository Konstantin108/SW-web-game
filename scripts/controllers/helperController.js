import {config} from "../config/config.js";

export const helperController = {
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    randomEvent(probabilityOfAction) {
        let chance = Math.random() * 100;

        chance = chance.toFixed(0);
        if (chance <= probabilityOfAction) return true;
    },

    getRandomForBonus() {
        let bonusTypes = config.bonuses.bonusTypes;
        let chance = Math.random() * 100;

        chance = chance.toFixed(0);
        for (let key in bonusTypes) {
            if (chance >= bonusTypes[key].chanceFrom && chance <= bonusTypes[key].chanceTo) return bonusTypes[key];
        }
    },

    removeAllTimers(timersArray) {
        for (let timer = 0; timer < timersArray.length; timer++) {
            clearInterval(timersArray[timer]);
        }
    },

    getCenterMapOnX() {
        let center = null;

        if (config.mapSizeX % 2 === 0) {
            center = config.mapSizeX / 2;
        } else {
            center = (config.mapSizeX - 1) / 2 + 1;
        }
        return center;
    },

    getCenterMapOnY() {
        let center = null;

        if (config.mapSizeY % 2 === 0) {
            center = config.mapSizeY / 2;
        } else {
            center = (config.mapSizeY - 1) / 2 + 1;
        }
        return center;
    },

    findPossiblePositions(employedPositionsArray, possiblePositionsArray) {
        let availablePositionsArray = [];

        let setObject = new Set(employedPositionsArray);
        availablePositionsArray.push(possiblePositionsArray.filter(elem => !setObject.has(elem)));
        return availablePositionsArray[0];
    },

    findValidValueInArrayOnIndex(array) {
        let index = this.getRandomInt(0, array.length);
        let result = array[index];

        if (result) {
            return result;
        } else {
            this.findValidValueInArrayOnIndex(array);
        }
    }
}