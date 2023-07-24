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

    getRandomType(types) {
        let chance = Math.random() * 100;

        chance = chance.toFixed(0);
        for (let key in types) {
            if (chance >= types[key].chanceFrom && chance <= types[key].chanceTo) return types[key];
        }
    },

    getObjectByName(object, value) {
        let elem = null;

        for (let key in object) {
            if (object[key].name === value) elem = object[key];
        }
        return elem;
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

    removeAllTimers(timersArray) {
        for (let timer = 0; timer < timersArray.length; timer++) {
            clearInterval(timersArray[timer]);
        }
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

    getCenterMapOnX() {
        return config.mapSizeX % 2 === 0 ? config.mapSizeX / 2 : (config.mapSizeX - 1) / 2 + 1;
    },

    getCenterMapOnY() {
        return config.mapSizeY % 2 === 0 ? config.mapSizeY / 2 : (config.mapSizeY - 1) / 2 + 1;
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