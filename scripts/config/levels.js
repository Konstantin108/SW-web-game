export const levels = {

    setLevelsParams() {
        return [
            {
                levelNum: 1,
                scoreCountForThisLevel: 0,
                multiplier: 1,
                blockagesCount: 4,
                fireChance: 15,
                maxBlockageSpeed: 1300,
                minBlockageSpeed: 2500,
                blockageTypes: {
                    1: {
                        name: "blockage",
                        chanceFrom: 0,
                        chanceTo: 100,
                    }
                },
                bossExist: false
            },
            {
                levelNum: 2,
                scoreCountForThisLevel: 200,
                multiplier: 2,
                blockagesCount: 5,
                fireChance: 15,
                maxBlockageSpeed: 1300,
                minBlockageSpeed: 2500,
                blockageTypes: {
                    1: {
                        name: "blockage",
                        chanceFrom: 0,
                        chanceTo: 90,
                    },
                    2: {
                        name: "blockageBull",
                        chanceFrom: 91,
                        chanceTo: 100,
                    },
                },
                bossExist: false
            },
            {
                levelNum: 3,
                scoreCountForThisLevel: 600,
                multiplier: 2,
                blockagesCount: 5,
                fireChance: 15,
                maxBlockageSpeed: 1100,
                minBlockageSpeed: 2300,
                blockageTypes: {
                    1: {
                        name: "blockage",
                        chanceFrom: 0,
                        chanceTo: 85,
                    },
                    2: {
                        name: "blockageBull",
                        chanceFrom: 86,
                        chanceTo: 100,
                    },
                },
                bossExist: false
            },
            {
                levelNum: 4,
                scoreCountForThisLevel: 1000,
                multiplier: 3,
                blockagesCount: 6,
                fireChance: 18,
                maxBlockageSpeed: 1000,
                minBlockageSpeed: 2200,
                blockageTypes: {
                    1: {
                        name: "blockage",
                        chanceFrom: 0,
                        chanceTo: 80,
                    },
                    2: {
                        name: "blockageBull",
                        chanceFrom: 81,
                        chanceTo: 100,
                    },
                },
                bossExist: false
            },
            {
                levelNum: 5,
                scoreCountForThisLevel: 1500,
                multiplier: 4,
                blockagesCount: 6,
                fireChance: 20,
                maxBlockageSpeed: 1000,
                minBlockageSpeed: 2200,
                blockageTypes: {
                    1: {
                        name: "blockage",
                        chanceFrom: 0,
                        chanceTo: 75,
                    },
                    2: {
                        name: "blockageBull",
                        chanceFrom: 76,
                        chanceTo: 100,
                    },
                },
                bossExist: true
            },
            {
                levelNum: "win",
                scoreCountForThisLevel: 1600
            }
        ]
    }
}