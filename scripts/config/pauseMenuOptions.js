export const pauseMenuOptions = {

    // возможно передавать value в обработчик будет не нужно
    setPauseMenuOptions() {
        return [
            {
                name: "continueGame",
                title: "продолжить",
                actionType: "actionOnGameSiteOption",
                renderSector: "mainMenuSector",
                id: "continueGame",
                classes: [
                    "pauseMenuBtn",
                    "blackOption",
                    "continueGame"
                ],
                containerBlockId: "optionsContainer",
                value: "",
                needConfirm: false,
                valueTransfer: false
            },
            {
                name: "restartGame",
                title: "перезапустить",
                actionType: "actionOnGameSiteOption",
                renderSector: "mainMenuSector",
                id: "restartGame",
                classes: [
                    "pauseMenuBtn",
                    "blackOption"
                ],
                containerBlockId: "optionsContainer",
                value: "startNewGame",  // здесь будет вызов метода PHP для перехода на страницу с игрой
                needConfirm: true,
                valueTransfer: false
            },
            {
                name: "leaveGame",
                title: "выйти",
                actionType: "actionOnGameSiteOption",
                renderSector: "mainMenuSector",
                id: "leaveGame",
                classes: [
                    "pauseMenuBtn",
                    "blackOption"
                ],
                containerBlockId: "optionsContainer",
                value: "goToIndex",  // здесь будет вызов метода PHP для перехода на страницу с игрой
                needConfirm: true,
                valueTransfer: false
            },
            {
                name: "confirmСhoice",
                title: "да",
                actionType: "requestToServerOption",
                renderSector: "confirmSector",
                id: "confirmСhoice",
                classes: [
                    "pauseMenuBtn",
                    "blackOption"
                ],
                containerBlockId: "optionsContainer",
                value: "",
                needConfirm: false,
                valueTransfer: true
            },
            {
                name: "cancelСhoice",
                title: "нет",
                actionType: "actionOnGameSiteOption",
                renderSector: "confirmSector",
                id: "cancelСhoice",
                classes: [
                    "pauseMenuBtn",
                    "blackOption",
                    "cancelСhoice"
                ],
                containerBlockId: "optionsContainer",
                value: "",
                needConfirm: false,
                valueTransfer: false
            },
            {
                name: "back",
                title: null,
                actionType: "actionOnGameSiteOption",
                renderSector: "sideBlocksSector",
                id: "pauseMenuBack",
                classes: [
                    "fas",
                    "fa-angle-double-left",
                    "pauseMenuBackAdd",
                    "cancelСhoice"
                ],
                containerBlockId: "pauseLeftOptionDisplay",
                value: "",
                needConfirm: false,
                valueTransfer: false
            },
            {
                name: "cross",
                title: null,
                actionType: "actionOnGameSiteOption",
                renderSector: "sideBlocksSector",
                id: "pauseMenuCross",
                classes: [
                    "fas",
                    "fa-times",
                    "continueGame"
                ],
                containerBlockId: "pauseRightOptionDisplay",
                value: "",
                needConfirm: false,
                valueTransfer: false
            },
        ];
    }
}