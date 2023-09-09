export const debugPanelElements = {

    setDebugPanelElementsParams() {
        return [
            {
                id: "localStorage",
                type: "button",
                description: "вывести localStorage в консоль"
            },
            {
                id: "config",
                type: "button",
                description: "вывести config в консоль"
            },
            {
                id: "boss",
                type: "button",
                description: "вывести boss в консоль"
            },
            {
                id: "player",
                type: "button",
                description: "вывести player в консоль"
            },
            {
                id: "game",
                type: "button",
                description: "вывести game в консоль"
            },
            {
                id: "cheatsController",
                type: "button",
                description: "вывести cheatsController в консоль"
            },
            {
                id: "progressController",
                type: "button",
                description: "вывести progressController в консоль"
            },
            {
                id: "clearConsole",
                type: "button",
                description: "очистить консоль"
            },
            {
                id: "callBoss",
                type: "button",
                description: "вызвать босса"
            },
            {
                id: "killBoss",
                type: "button",
                description: "убить босса"
            },
            {
                id: "playerArrowsObjects",
                type: "checkbox",
                description: "выводить player's arrows в консоль постоянно"
            },
            {
                id: "enemyArrowsObjects",
                type: "checkbox",
                description: "выводить enemy arrows в консоль постоянно"
            },
            {
                id: "blockagesObjects",
                type: "checkbox",
                description: "выводить blockages в консоль постоянно"
            },
            {
                id: "bonusesObjects",
                type: "checkbox",
                description: "выводить bonuses в консоль постоянно"
            },
            {
                id: "bossGetDamageInfo",
                type: "checkbox",
                description: "выводить объект boss в консоль каждый раз при нанесении ему урона"
            },
            {
                id: "actualParamsInfo",
                type: "checkbox",
                description: "выводить localStorage и config в консоль каждый раз при активации чита и при запуске игры"
            },
            {
                id: "toggleInfinityMode",
                type: "checkbox",
                description: "включить сохранение параметров в localStorage"
            },
            {
                id: "toggleInstantStart",
                type: "checkbox",
                description: "отключить отсчёт перед запуском игры"
            }
        ]
    }
}