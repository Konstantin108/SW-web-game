let levels = {

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
            },
            {
                levelNum: 2,
                scoreCountForThisLevel: 60,
                multiplier: 2,
                blockagesCount: 5,
                fireChance: 2,
                maxBlockageSpeed: 1300,
                minBlockageSpeed: 2500,
            },
            {
                levelNum: 3,
                scoreCountForThisLevel: 100,
                multiplier: 2,
                blockagesCount: 5,
                fireChance: 15,
                maxBlockageSpeed: 1100,
                minBlockageSpeed: 2300,
            },
            {
                levelNum: 4,
                scoreCountForThisLevel: 200,
                multiplier: 3,
                blockagesCount: 6,
                fireChance: 18,
                maxBlockageSpeed: 1000,
                minBlockageSpeed: 2200,
            },
            {
                levelNum: 5,
                scoreCountForThisLevel: 1200,
                multiplier: 4,
                blockagesCount: 6,
                fireChance: 20,
                maxBlockageSpeed: 1000,
                minBlockageSpeed: 2200,
            },
            {
                levelNum: "win",
                scoreCountForThisLevel: 1500,
                multiplier: 0,
                blockagesCount: 0,
                fireChance: 0,
                maxBlockageSpeed: 0,
                minBlockageSpeed: 0,
            }
        ]
    }
}