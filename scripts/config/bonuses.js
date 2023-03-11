let bonuses = {

    setBonusesParams() {
        return {
            bonusSpeed: 1500,
            bonusChance: 90,
            bonusTypes: {
                1: {
                    name: "drill",
                    chanceFrom: 0,
                    chanceTo: 35   // возможно добавить время действия
                },
                2: {
                    name: "trinity",
                    chanceFrom: 36,
                    chanceTo: 74
                },
                3: {
                    name: "shield",
                    chanceFrom: 75,
                    chanceTo: 89
                },
                4: {
                    name: "life",
                    chanceFrom: 90,
                    chanceTo: 98
                },
                5: {
                    name: "killAll",
                    chanceFrom: 99,
                    chanceTo: 100
                }
            }
        }
    }
}