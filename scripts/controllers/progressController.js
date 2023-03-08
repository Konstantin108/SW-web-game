let progressController = {
    levels: config.levels,
    level: config.levels[0].levelNum,
    maxBlockageSpeed: config.levels[0].maxBlockageSpeed,
    minBlockageSpeed: config.levels[0].minBlockageSpeed,
    multiplier: config.levels[0].multiplier,
    fireChance: config.levels[0].fireChance,
    blockagesCount: 0,
    score: 0,
    shipDestroyer: 0,

    progress() {
        this.blockagesCount = this.compareBlockagesCountAndMapSizeX(config.levels[0].blockagesCount);
        let levelsLeft = config.levels.length;

        blockageController.blockageCreate(this.blockagesCount);

        for (let i = 1; i < this.levels.length; i++) {
            if (this.levels[i].scoreCountForThisLevel < this.score && this.levels.length == levelsLeft) {
                if (this.levels.length > 2) {
                    this.level = this.levels[i].levelNum;
                    this.multiplier = this.levels[i].multiplier;
                    this.blockagesCount = this.compareBlockagesCountAndMapSizeX(config.levels[i].blockagesCount);
                    this.maxBlockageSpeed = this.levels[i].maxBlockageSpeed;
                    this.minBlockageSpeed = this.levels[i].minBlockageSpeed;
                    this.fireChance = this.levels[i].fireChance;
                    this.newLevelEntry(this.blockagesCount);
                    this.levels.shift();
                    levelsLeft += -1;
                    renderer.renderStatusBar();
                } else {
                    this.levels.shift();
                    game.over(true);
                }
            }
        }
    },

    scoreUp(scoreType) {
        return this.score += scoreType * this.multiplier;
    },

    scoreDown() {
        let score = this.score;

        score += config.crashMulct * this.multiplier;
        if (score < 0) score = 0;
        this.score = score;
        return this.score;
    },

    compareBlockagesCountAndMapSizeX(blockagesCountOnLevel) {           // blockegesCount не может быть больше config.mapSizeX
        let blockagesCount = null;

        if (blockagesCountOnLevel <= config.mapSizeX) {
            blockagesCount = blockagesCountOnLevel;
        } else {
            blockagesCount = config.mapSizeX;
        }
        return blockagesCount;
    },

    newLevelEntry(blockagesCount) {
        alert(`Переход на новый уровень => Уровень ${progressController.level}\nПоздравляем!`);
        blockageController.blockageCreate(blockagesCount);
        blockageController.blockageMove(blockageController.blockagesArray);
    },
}