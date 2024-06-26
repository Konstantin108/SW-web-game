import {config} from "../config/config.js";

export const templatePrinter = {

    mapTemplatePrint(map) {
        return `<table>
                    <tbody>
                        ${map}
                    </tbody>
                </table>`;
    },

    statusBarTemplatePrint(level, score, shipDestroyed, livesBar) {
        return `<div id="statusBarContainer">
                    <div id="statusBar" class="${config.menuColor}">
                        <div id="scull" class="whiteScull"></div>
                        <div class="statusBarElement">
                            <strong>
                                <div class="infoContainer widePadding">
                                    <p>уровень</p>
                                    <p>${level}</p>                                
                                </div>
                            </strong>
                        </div>
                        <div class="statusBarElement">
                            <strong>
                                <div class="infoContainer widePadding">
                                    <p>очки</p>
                                    <p>${score}</p>
                                </div>
                            </strong>
                        </div>
                        <div class="statusBarElement">
                            <strong>
                                <div class="infoContainer widePadding">
                                    <p>уничтожено противников</p>
                                    <p>${shipDestroyed}</p>
                                </div>
                            </strong>
                        </div>
                            ${livesBar}
                    </div>
                </div>`;
    },

    livesBarTemplatePrint(lives) {
        return `<div class="statusBarElement">
                    <strong>
                        <div class="infoContainer widePadding">
                            <p>жизни</p>
                            <p>${lives}</p>
                        </div>
                    </strong>
                </div>`;
    },

    heartsBarTemplatePrint(heartsBox) {
        return `<div id="heartsBar">
                    ${heartsBox}
                </div>`;
    },

    bombBarTemplatePrint(bomb) {
        return `<div id="bombBar" class="touchActionOff">
                    ${bomb}
                </div>`;
    },

    bonusBarElementTemplatePrint(bonusElement, bonusBarDivElementId, bonusTimerLabel, bonusBarDivTimer) {
        return `<div id="${bonusBarDivElementId}">
                    <div class="statusBarElement bonusBarElement">
                        <strong>
                            <div class="infoContainer">
                                <div class="infoLabel bonusLabel">
                                    ${bonusElement}
                                </div>
                            </div>    
                        </strong>
                    </div>
                    <div class="statusBarElement bonusBarElement">
                        <strong>
                            <div class="infoContainer">
                                <div id="${bonusTimerLabel}" class="infoLabel timerLabel">
                                    <div id="${bonusBarDivTimer}"></div>    
                                </div>
                            </div>
                        </strong>
                    </div>
                </div>`;
    },

    superAbilityBarTemplatePrint(sectors) {
        return `<div id="superAbilityBar" class="touchActionOff">
                    <div id="lightningElementContainer" class="touchActionOff">
                        <div id="lightningElement" class="lightningIsOff touchActionOff"></div>
                    </div>
                    <div id="shineSectorsContainer">
                        <div id="shineSectorsBox">
                            ${sectors}
                        </div>
                    </div>
                </div>`;
    },

    inCenterTableNotifyTemplatePrint(message, className) {
        return `<div id="messageContainer">
                    <div id="${className}" class="${config.menuColor}">                                                      
                        <strong>
                            <p>${message}</p>
                        </strong>
                    </div>        
                </div>`;
    },

    cheatConsoleTemplatePrint(sizeClass) {
        return `<form id="cheatConsole" class="${sizeClass}">
                    <strong>
                        <div id="cheatMessageContainer"></div>
                        <div id="cheatInputContainer">
                            <p id="consoleSymbol">>_</p> 
                        <input id="cheatInput"
                               name="cheatInput"
                               type="text"
                               autocomplete="off"
                               onpaste="return false;"
                               onCopy="return false;"
                               onCut="return false;"
                               onDrag="return false;" 
                               onDrop="return false;">
                        </div>
                    </strong>
                </form>`;
    },

    cheatMessageTemplatePrint(message, messageColor) {
        return `<p id="cheatMessage" class="${messageColor}">${message}</p>`;
    },

    debugPanelTemplatePrint(debugElementsDiv, sizeClass) {
        return `<div id="debugPanel" class="${sizeClass}">
                    <p id="debugPanelLabel">debug panel</p>
                    <div id="btnsContainer">
                        ${debugElementsDiv}
                    </div>    
                </div>`;
    },

    pauseMenuTemplatePrint(sizeClass) {
        return `<div id="pauseMenuBackground">
                    <div id="pauseMenuContainer" class="pauseElementAdd ${sizeClass}">
                        <div id="pauseMenuLeftBlock">
                            <div class="pauseSideOptionBlock">
                                <div id="pauseLeftOptionDisplay"></div>
                            </div>
                            <div class="pauseMenuSideBorder"></div>
                            <div class="pauseMenuSideBottomBracing"></div>
                        </div>
                        <div>
                            <div class="pauseMenuHorizontalBorder"></div>
                                <nav id="optionsContainer"></nav>
                            <div class="pauseMenuHorizontalBorder"></div>
                        </div>
                        <div id="pauseMenuRightBlock">
                            <div class="pauseSideOptionBlock">
                                <div id="pauseRightOptionDisplay"></div>
                            </div>
                            <div class="pauseMenuSideBorder"></div>
                            <div class="pauseMenuSideBottomBracing"></div>
                        </div>
                    </div>
                </div>`;
    },

    confirmBlockLabelTemplatePrint() {
        return `<div class="${config.menuColor}">
                    <p id="confirmTitle">вы уверены?</p>
                </div>`;
    },

    statisticsBlockTemplatePrint(data) {
        return `<div id="statisticsBlock" class="${config.menuColor}">
                    <p id="statisticsTitle">игра окончена</p>
                    <div id="statisticsGridContainer">
                        ${data}
                    </div>
                </div>`;
    },

    bossLivesBarTemplatePrint(sectors, extraClass) {
        return `<div id="bossLivesBar" class="${extraClass}">
                    <img src="./src/images/disk.webp" alt="disk.webp" class="disk">
                    <div id="bossLivesBarMetalElement">
                        <div id="bossLivesBarBlackElement">
                            ${sectors}
                        </div>  
                    </div>
                    <img src="./src/images/disk.webp" alt="disk.webp" class="disk">                            
                </div>`;
    },

    tooltipTemplatePrint(element, name, tooltipClasses) {
        return `<div id="${name}" class="${tooltipClasses}">
                    ${element}
                </div>`;
    },

    blockForTooltipsInMobilModeTemplatePrint() {
        return `<div id="blockForTooltipsInMobilMode"></div>`;
    },

    tooltipControlPanelTemplatePrint(text, bulb, animationClass) {
        return `<div id="tooltipControlPanel" class="${animationClass}">
                    <div id="tooltipControlPanelBox">
                        <div class="circle">
                            <div class="circleDisplay">
                                ${bulb}
                            </div>
                        </div>
                        <button id="tooltipControlPanelBtn" class="${config.menuColor}">
                            <p>${text} подсказки</p>
                        </button>
                    </div>
                </div>`;
    },

    localStorageUnavailableMessageTemplatePrint() {
        let text = `<p>в браузере отключено хранилище localStorage!</p>
                    <p>для сохранения данных о введённых читах localStorage</p>
                    <p>должен быть активирован в настройках вашего браузера,</p>
                    <p>после перезагрузки страницы читы будут отключены</p>`;

        return {
            name: "localStorageUnavailableMessage",
            tooltip: {
                keyboardsBlockClass: "",
                positionClass: "localStorageUnavailableMessageDesktopMode",
                allBlockStyle: "textInCenterPosition",
                text: text
            },
            tooltipMobileMode: {
                keyboardsBlockClass: "",
                positionClass: "anyTooltipMobileMode",
                allBlockStyle: "textInCenterPositionMobileMode",
                text: text
            },
            canShowAgain: true,
            canShowWhenTipsIsOff: true
        };
    },

    roundBtnTemplatePrint(name, icon, animationClass) {
        return `<div id="${name}" class="touchActionOff ${animationClass}">
                    <div class="circle touchActionOff">
                        <div class="circleDisplay touchActionOff ${config.menuColor}">
                            ${icon}
                        </div>
                    </div>
                </div>`;
    }
};