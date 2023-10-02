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

    getRandomDirectionOfRotation(chance) {
        let unit = .001;
        if (this.randomEvent(chance)) unit = -.001;
        return unit;
    }
}