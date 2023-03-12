let bonuses = {

    setBonusesParams(config) {
        return {
            bonusSpeed: 1500,
            bonusChance: 80,
            bonusTypes: {
                1: {
                    name: "drill",
                    playerOutlook: "player-drill",
                    playerExtraOutlook: null,
                    chanceFrom: 0,
                    chanceTo: 35,
                    // chanceFrom: 6,
                    // chanceTo: 7,
                    itemToStorage: false,
                    combinatePossible: false,
                    actionTime: 20000,
                    limitOnMaxItemsInStorage: false,
                    maxItemInStorage: false
                },
                2: {
                    name: "trinity",
                    playerOutlook: "player-trinity",
                    playerExtraOutlook: null,
                    chanceFrom: 36,
                    chanceTo: 74,
                    // chanceFrom: 4,
                    // chanceTo: 5,
                    itemToStorage: false,
                    combinatePossible: false,
                    actionTime: 20000,
                    limitOnMaxItemsInStorage: false,
                    maxItemInStorage: false
                },
                3: {
                    name: "shield",
                    playerOutlook: null,
                    playerExtraOutlook: "player-shield",
                    chanceFrom: 75,
                    chanceTo: 89,
                    // chanceFrom: 8,
                    // chanceTo: 100,
                    itemToStorage: false,
                    combinatePossible: true,
                    actionTime: 30000,
                    limitOnMaxItemsInStorage: false,
                    maxItemInStorage: false
                },
                4: {
                    name: "life",
                    playerOutlook: null,
                    playerExtraOutlook: null,
                    chanceFrom: 90,
                    chanceTo: 98,
                    // chanceFrom: 2,
                    // chanceTo: 3,
                    itemToStorage: true,
                    combinatePossible: null,
                    actionTime: null,
                    limitOnMaxItemsInStorage: true,
                    maxItemInStorage: config.lives
                },
                5: {
                    name: "killAll",
                    playerOutlook: null,
                    playerExtraOutlook: null,
                    chanceFrom: 99,
                    chanceTo: 100,
                    // chanceFrom: 0,
                    // chanceTo: 1,
                    itemToStorage: true,
                    combinatePossible: null,
                    actionTime: null,
                    limitOnMaxItemsInStorage: true,
                    maxItemInStorage: 1
                }
            }
        }
    }
}