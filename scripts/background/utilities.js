export const utilities = {

    getRandomElementInArray(array) {
        let index = Math.floor(Math.random() * array.length);
        return array[index];
    },

    randomEvent(probabilityOfAction) {
        let result = false;
        let chance = (Math.random() * 100).toFixed(0);
        if (chance <= probabilityOfAction) result = true;
        return result;
    },

    randomAppearanceCelestialBody(appearanceChance) {
        return (Math.random() * 10000).toFixed(0) < 10000 - appearanceChance;
    },

    getRandomDirectionOfRotation(chance) {
        let unit = .001;
        if (this.randomEvent(chance)) unit = -.001;
        return unit;
    },

    getRandomValue(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}