export const pauseMenuOptions = {
    pauseMenuStructure: [
        "mainMenuSector",
        "gameOverMenuSector",
        "confirmSector"
    ],

    pauseMenuOptions: [
        {
            name: "continueGame",
            title: "продолжить",
            actionType: "actionOnGameSiteOption",
            renderSector: [
                "mainMenuSector"
            ],
            id: "continueGame",
            classes: [
                "pauseMenuBtn",
                "continueGame"
            ],
            internalClasses: null,
            containerBlockId: "optionsContainer",
            value: "",
            needConfirm: false,
            valueTransfer: false,
            referer: false
        },
        {
            name: "restartGame",
            title: "перезапустить",
            actionType: "actionOnGameSiteOption",
            renderSector: [
                "mainMenuSector",
                "gameOverMenuSector"
            ],
            id: "restartGame",
            classes: [
                "pauseMenuBtn"
            ],
            internalClasses: null,
            containerBlockId: "optionsContainer",
            value: "startNewGame",  // здесь будет вызов метода PHP для перехода на страницу с игрой
            needConfirm: true,
            valueTransfer: false,
            referer: false
        },
        {
            name: "leaveGame",
            title: "выйти",
            actionType: "actionOnGameSiteOption",
            renderSector: [
                "mainMenuSector",
                "gameOverMenuSector"
            ],
            id: "leaveGame",
            classes: [
                "pauseMenuBtn"
            ],
            internalClasses: null,
            containerBlockId: "optionsContainer",
            value: "goToIndex",  // здесь будет вызов метода PHP для перехода на страницу index.php
            needConfirm: true,
            valueTransfer: false,
            referer: false
        },
        {
            name: "confirmChoice",
            title: "да",
            actionType: "requestToServerOption",
            renderSector: [
                "confirmSector"
            ],
            id: "confirmChoice",
            classes: [
                "pauseMenuBtn"
            ],
            internalClasses: null,
            containerBlockId: "optionsContainer",
            value: "",
            needConfirm: false,
            valueTransfer: true,
            referer: false
        },
        {
            name: "cancelСhoice",
            title: "нет",
            actionType: "actionOnGameSiteOption",
            renderSector: [
                "confirmSector"
            ],
            id: "cancelСhoice",
            classes: [
                "pauseMenuBtn",
                "cancelСhoice"
            ],
            internalClasses: null,
            containerBlockId: "optionsContainer",
            value: "",
            needConfirm: false,
            valueTransfer: false,
            referer: true
        },
        {
            name: "back",
            title: null,
            actionType: "actionOnGameSiteOption",
            renderSector: [
                "sideBlocksSector"
            ],
            id: "pauseMenuBack",
            classes: [
                "pauseMenuSideBtn",
                "pauseMenuBackAdd",
                "cancelСhoice"
            ],
            internalClasses: [
                "fas",
                "fa-angle-double-left",
            ],
            containerBlockId: "pauseLeftOptionDisplay",
            value: "",
            needConfirm: false,
            valueTransfer: false,
            referer: true
        },
        {
            name: "cross",
            title: null,
            actionType: "actionOnGameSiteOption",
            renderSector: [
                "sideBlocksSector",
            ],
            id: "pauseMenuCross",
            classes: [
                "pauseMenuSideBtn",
                "continueGame"
            ],
            internalClasses: [
                "fas",
                "fa-times",
            ],
            containerBlockId: "pauseRightOptionDisplay",
            value: "",
            needConfirm: false,
            valueTransfer: false,
            referer: false
        }
    ]
}