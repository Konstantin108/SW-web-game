export const pauseMenuOptions = {

    setPauseMenuOptions() {
        return [
            {
                name: "continueGame",
                title: "продолжить",
                actionType: "actionOnGameSiteOption",
                renderSector: "mainMenuSector",
                value: null,
                needConfirm: false
            },
            {
                name: "restartGame",
                title: "перезапустить",
                actionType: "actionOnGameSiteOption",
                renderSector: "mainMenuSector",
                value: "startNewGame",  // здесь будет вызов метода PHP для перехода на страницу с игрой
                needConfirm: true
            },
            {
                name: "leaveGame",
                title: "выйти",
                actionType: "actionOnGameSiteOption",
                renderSector: "mainMenuSector",
                value: "goToIndex",  // здесь будет вызов метода PHP для перехода на страницу с игрой
                needConfirm: true
            },
            {
                name: "confirmСhoice",
                title: "да",
                actionType: "requestToServerOption",
                renderSector: "confirmSector",
                value: null,  // сюда передается значение из опции выбранной в mainMenuSector
                needConfirm: false
            },
            {
                name: "cancelСhoice",
                title: "нет",
                actionType: "actionOnGameSiteOption",
                renderSector: "confirmSector",
                value: null,
                needConfirm: false
            }
        ]
    }
}