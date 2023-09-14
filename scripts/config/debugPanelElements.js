export const debugPanelElements = {

    setDebugPanelElementsParams() {
        return [
            {
                name: "localStorage",
                type: "button",
                customClass: null,
                message: "localStorage:",
                description: "вывести localStorage в консоль"
            },
            {
                name: "config",
                type: "button",
                customClass: null,
                message: "config:",
                description: "вывести config в консоль"
            },
            {
                name: "boss",
                type: "button",
                customClass: null,
                message: "boss:",
                description: "вывести boss в консоль"
            },
            {
                name: "player",
                type: "button",
                customClass: null,
                message: "player:",
                description: "вывести player в консоль"
            },
            {
                name: "game",
                type: "button",
                customClass: null,
                message: "game:",
                description: "вывести game в консоль"
            },
            {
                name: "cheatsController",
                type: "button",
                customClass: null,
                message: "cheatsController:",
                description: "вывести cheatsController в консоль"
            },
            {
                name: "progressController",
                type: "button",
                customClass: null,
                message: "progressController:",
                description: "вывести progressController в консоль"
            },
            {
                name: "pause",
                type: "button",
                customClass: null,
                message: "pause:",
                description: "вывести pause в консоль"
            },
            {
                name: "cheatsInfo",
                type: "button",
                customClass: null,
                message: null,
                description: "вывести в консоль таблицу с информацией о читах"
            },
            {
                name: "clearConsole",
                type: "button",
                customClass: "redBtn",
                message: null,
                description: "очистить консоль"
            },
            {
                name: "callBoss",
                type: "button",
                customClass: null,
                message: null,
                description: "вызвать босса"
            },
            {
                name: "killBoss",
                type: "button",
                customClass: null,
                message: null,
                description: "убить босса"
            },
            {
                name: "playerArrowsObjects",
                type: "checkbox",
                customClass: null,
                message: "player's arrows:",
                description: "выводить player's arrows в консоль постоянно"
            },
            {
                name: "enemyArrowsObjects",
                type: "checkbox",
                customClass: null,
                message: "enemy arrows:",
                description: "выводить enemy arrows в консоль постоянно"
            },
            {
                name: "blockagesObjects",
                type: "checkbox",
                customClass: null,
                message: "blockages:",
                description: "выводить blockages в консоль постоянно"
            },
            {
                name: "bonusesObjects",
                type: "checkbox",
                customClass: null,
                message: "bonuses: ",
                description: "выводить bonuses в консоль постоянно"
            },
            {
                name: "bossGetDamageInfo",
                type: "checkbox",
                customClass: null,
                message: "boss get damage:",
                description: "выводить объект boss в консоль каждый раз при нанесении ему урона"
            },
            {
                name: "actualParamsInfo",
                type: "checkbox",
                customClass: null,
                message: "actual params in config and localStorage:",
                description: "выводить localStorage и config в консоль каждый раз при активации чита и при запуске игры"
            },
            {
                name: "toggleInfinityMode",
                type: "checkbox",
                customClass: null,
                message: null,
                description: "включить сохранение параметров в localStorage"
            },
            {
                name: "toggleInstantStart",
                type: "checkbox",
                customClass: null,
                message: null,
                description: "отключить отсчёт перед запуском игры"
            }
        ];
    }
}