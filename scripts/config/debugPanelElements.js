export const debugPanelElements = {

    setDebugPanelElementsParams() {
        return [
            {
                name: "localStorage",
                id: "localStorage",
                type: "button",
                description: "вывести localStorage в консоль"
            },
            {
                name: "config",
                id: "config",
                type: "button",
                description: "вывести config в консоль"
            },
            {
                name: "boss",
                id: "boss",
                type: "button",
                description: "вывести boss в консоль"
            },
            {
                name: "player",
                id: "player",
                type: "button",
                description: "вывести player в консоль"
            },
            {
                name: "create boss",
                id: "createBoss",
                type: "button",
                description: "вызвать босса"
            },
            {
                name: "kill boss",
                id: "killBoss",
                type: "button",
                description: "убить босса"
            },
            {
                name: "player's arrows",
                id: "playerArrow",
                type: "checkbox",
                description: "выводить player's arrows в консоль постоянно"
            },
            {
                name: "enemy arrows",
                id: "enemyArrows",
                type: "checkbox",
                description: "выводить enemy arrows в консоль постоянно"
            },
            {
                name: "blockages",
                id: "blockages",
                type: "checkbox",
                description: "выводить blockages в консоль постоянно"
            },
            {
                name: "bonuses",
                id: "bonuses",
                type: "checkbox",
                description: "выводить bonuses в консоль постоянно"
            },
            {
                name: "infinity mode",
                id: "infinityMode",
                type: "checkbox",
                description: "включить сохранение параметров в localStorage"
            },
            {
                name: "instant start",
                id: "instantStart",
                type: "checkbox",
                description: "отключить отсчет перед запуском игры"
            }
        ]
    }
}