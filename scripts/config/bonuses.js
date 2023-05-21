export const bonuses = {

    setBonusesParams() {
        return {
            bonusSpeed: 1500,
            bonusChance: 12,
            // bonusChance: 99,
            bonusTypes: {
                1: {
                    name: "drill",
                    playerOutlook: "player-drill",
                    playerExtraOutlook: null,
                    playerArrowType: "arrow-drill",
                    pickUpImageName: "drillPickUpImage",
                    chanceFrom: 0,
                    chanceTo: 26,
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
                    chanceFrom: 27,
                    chanceTo: 49,
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
                    chanceFrom: 50,
                    chanceTo: 65,
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
                    chanceFrom: 66,
                    chanceTo: 96,
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
                    chanceFrom: 97,
                    chanceTo: 100,
                    // chanceFrom: 4,
                    // chanceTo: 5,
                    actionTime: null,
                }
            }
        }
    }
}