export const bonuses = {

    setBonusesParams() {
        return {
            bonusSpeed: 1500,
            bonusChance: 30,
            // bonusChance: 99,
            bonusTypes: {
                1: {
                    name: "drill",
                    playerOutlook: "player-drill",
                    playerExtraOutlook: null,
                    playerArrowType: "arrow-drill",
                    pickUpImageName: "drillPickUpImage",
                    chanceFrom: 0,
                    chanceTo: 35,
                    // chanceFrom: 0,
                    // chanceTo: 1,
                    actionTime: 20000,
                },
                2: {
                    name: "trinity",
                    playerOutlook: "player-trinity",
                    playerExtraOutlook: null,
                    playerArrowType: "arrow-trinity",
                    pickUpImageName: "trinityPickUpImage",
                    chanceFrom: 36,
                    chanceTo: 74,
                    // chanceFrom: 2,
                    // chanceTo: 3,
                    actionTime: 20000,
                },
                3: {
                    name: "shield",
                    playerOutlook: null,
                    playerExtraOutlook: "player-shield",
                    playerArrowType: null,
                    pickUpImageName: "shieldPickUpImage",
                    chanceFrom: 75,
                    chanceTo: 89,
                    // chanceFrom: 8,
                    // chanceTo: 100,
                    actionTime: 30000,
                },
                4: {
                    name: "life",
                    playerOutlook: null,
                    playerExtraOutlook: null,
                    playerArrowType: null,
                    pickUpImageName: null,
                    chanceFrom: 90,
                    chanceTo: 98,
                    // chanceFrom: 6,
                    // chanceTo: 7,
                    actionTime: null,
                },
                5: {
                    name: "killAll",
                    playerOutlook: null,
                    playerExtraOutlook: null,
                    playerArrowType: null,
                    pickUpImageName: null,
                    chanceFrom: 99,
                    chanceTo: 100,
                    // chanceFrom: 4,
                    // chanceTo: 5,
                    actionTime: null,
                }
            }
        }
    }
}