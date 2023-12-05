import {config} from "../config/config.js";

export const helperController = {

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    randomEvent(probabilityOfAction) {
        let result = false;
        let chance = (Math.random() * 100).toFixed(0);
        if (chance <= probabilityOfAction) result = true;
        return result;
    },

    getRandomType(types) {
        let chance = (Math.random() * 100).toFixed(0);
        for (let key in types) {
            if (chance >= types[key].chanceFrom && chance <= types[key].chanceTo) return types[key];
        }
    },

    getObjectByName(object, value) {
        let result = null;
        for (let key in object) {
            if (object[key].name === value) result = object[key];
        }
        return result;
    },

    getPropByNameAndReset(object, value) {
        for (let key in object) {
            if (key.includes(value)) object[key] = false;
        }
    },

    getRandomCoordinates(arrayX, y) {
        let possibleOnXArray = [];
        let possibleOnYArray = [];

        for (let j = 1; j <= arrayX.length - 2; j++) {
            if (!isNaN(arrayX[j])) possibleOnXArray.push(arrayX[j]);
        }
        for (let i = 1; i <= y + 1; i++) {
            possibleOnYArray.push(i);
        }
        return {
            x: this.getRandomInt(possibleOnXArray[0], possibleOnXArray.at(-1)),
            y: this.getRandomInt(possibleOnYArray[0], possibleOnYArray.at(-1))
        }
    },

    removeAllIntervalTimers(timerIdsArray) {
        if (timerIdsArray) timerIdsArray.forEach(timerId => clearInterval(timerId));
    },

    removeAllTimeoutTimers(timerIdsArray) {
        if (timerIdsArray) timerIdsArray.forEach(timerId => clearTimeout(timerId));
    },

    addItemToArray(array, item) {
        if (!array.includes(item)) array.push(item);
    },

    removeItemFromArray(array, item) {
        return array = array.filter(elem => elem !== item);
    },

    returnFormattedValue(input) {
        input.oninput = () => input.value = this.removeForbiddenCharactersAndSpaces(input.value);
    },

    removeForbiddenCharactersAndSpaces(value) {
        let forbiddenCharacters = [
            "`", "~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "=", "-", "[", "]", "{", "}", ";", "'", "\"", "\\", "|", ",", ".", "<", ">", "/", "?", "*", "№"
        ];

        forbiddenCharacters.forEach(symbol => value = value.replace(symbol, ""));
        return value.trim();
    },

    getCenterMapOnAxis(axis) {
        return axis % 2 === 0 ? axis / 2 : (axis - 1) / 2 + 1;
    },

    getRandomElementAndIndexInArray(array) {
        let index = Math.floor(Math.random() * array.length);
        return {
            element: array[index],
            index: index
        }
    },

    randomAppearanceCelestialBody(appearanceChance) {
        return (Math.random() * 10000).toFixed(0) < 10000 - appearanceChance;
    },

    getRandomDirectionOfRotation(chance) {
        let unit = .001;
        if (this.randomEvent(chance)) unit = -.001;
        return unit;
    },

    isMobileDeviceCheck() {
        let result = false;
        if (navigator.userAgent.toLowerCase().match(/mobile/i)) result = true;
        return result;
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

        if (result) return result;
        this.findValidValueInArrayOnIndex(array);
    }
}