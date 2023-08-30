export const bonuses = {
    bonusSpeed: 1500,
    bonusChance: 12,

    setBonusesParams(bonusChanceUsersParam = null) {
        let bonusSpeed = this.bonusSpeed;
        let bonusChance = this.bonusChance;

        if (bonusChanceUsersParam) bonusChance = bonusChanceUsersParam;

        return {
            bonusSpeed,
            bonusChance,
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
                    description: "стрелы игрока проходят сквозь врагов, наносят урон размером в 2 единицы"
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
                    description: "каждый выстрел игрока создает 3 стрелы сразу, каждая наносит урон размером в 3 единицы"
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
                    description: "игрок получает щит и игнорирует весь урон"
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
                    description: "игрок восстанавливает одну жизнь"
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
                    description: "игрок получает бомбу, взрыв которой убивает всех врагов на экране и снимает щит с босса, её можно использовать в любой момент"
                }
            }
        }
    }
}