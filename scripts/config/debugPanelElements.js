export const debugPanelElements = {

    // возможно добавить название класса, чтобы разукрасить кнопки
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
                id: "playerArrows",
                type: "checkbox",
                description: "выводить player's arrows в консоль постоянно"
            },
            {
                id: "enemyArrows",
                type: "checkbox",
                description: "выводить enemy arrows в консоль постоянно"
            },
            {
                id: "blockages",
                type: "checkbox",
                description: "выводить blockages в консоль постоянно"
            },
            {
                id: "bonuses",
                type: "checkbox",
                description: "выводить bonuses в консоль постоянно"
            },
            {
                id: "toggleInfinityMode",
                type: "checkbox",
                description: "включить сохранение параметров в localStorage"
            },
            {
                id: "toggleInstantStart",
                type: "checkbox",
                description: "отключить отсчет перед запуском игры"
            }
        ]
    }
}