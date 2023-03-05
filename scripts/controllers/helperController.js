let helperController = {
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    randomEnemyFire() {
        if (Math.random() * 10 <= progressController.fireChance) return true;
    },

    getCenterMapOnX() {
        let center = null;

        if (config.mapSizeX % 2 == 0) {
            center = config.mapSizeX / 2;
        } else {
            center = (config.mapSizeX - 1) / 2 + 1;
        }
        return center;
    },

    getCenterMapOnY() {
        let center = null;

        if (config.mapSizeY % 2 == 0) {
            center = config.mapSizeY / 2;
        } else {
            center = (config.mapSizeY - 1) / 2 + 1;
        }
        return center;
    }
}