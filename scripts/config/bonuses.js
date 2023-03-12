let bonuses = {

    setBonusesParams(config) {
        return {
            bonusSpeed: 1500,
            bonusChance: 18,
            bonusTypes: {
                1: {
                    name: "drill",
                    playerOutlook: "player-drill",
                    playerExtraOutlook: null,
                    playerArrowType: "arrow-drill",
                    chanceFrom: 0,
                    chanceTo: 35,
                    itemToStorage: false,
                    actionTime: 20000,
                    limitOnMaxItemsInStorage: false,
                    maxItemInStorage: false
                },
                2: {
                    name: "trinity",
                    playerOutlook: "player-trinity",
                    playerExtraOutlook: null,
                    playerArrowType: "arrow-trinity",
                    chanceFrom: 36,
                    chanceTo: 74,
                    itemToStorage: false,
                    actionTime: 20000,
                    limitOnMaxItemsInStorage: false,
                    maxItemInStorage: false
                },
                3: {
                    name: "shield",
                    playerOutlook: null,
                    playerExtraOutlook: "player-shield",
                    playerArrowType: null,
                    chanceFrom: 75,
                    chanceTo: 89,
                    itemToStorage: false,
                    actionTime: 30000,
                    limitOnMaxItemsInStorage: false,
                    maxItemInStorage: false
                },
                4: {
                    name: "life",
                    playerOutlook: null,
                    playerExtraOutlook: null,
                    playerArrowType: null,
                    chanceFrom: 90,
                    chanceTo: 98,
                    itemToStorage: true,
                    actionTime: null,
                    limitOnMaxItemsInStorage: true,
                    maxItemInStorage: config.lives
                },
                5: {
                    name: "killAll",
                    playerOutlook: null,
                    playerExtraOutlook: null,
                    playerArrowType: null,
                    chanceFrom: 99,
                    chanceTo: 100,
                    itemToStorage: true,
                    actionTime: null,
                    limitOnMaxItemsInStorage: true,
                    maxItemInStorage: 1
                }
            }
        }
    }
}