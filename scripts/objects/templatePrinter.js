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
                                <div class="infoContainer">
                                    <div class="infoLabel">
                                        Уровень
                                    </div>
                                    <div>
                                        ${level}
                                    </div>    
                                </div>
                            </strong>
                        </div>
                        <div class="statusBarElement">
                            <strong>
                                <div class="infoContainer">
                                    <div class="infoLabel">
                                        Очки
                                    </div>
                                    <div>
                                        ${score}
                                    </div>
                                </div>
                            </strong>
                        </div>
                        <div class="statusBarElement">
                            <strong>
                                <div class="infoContainer">
                                    <div class="infoLabel">
                                        Уничтожено противников
                                    </div>
                                    <div>
                                        ${shipDestroyed} 
                                    </div>
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
                        <div class="infoContainer">
                            <div class="infoLabel">
                                Жизни
                            </div>
                            <div>
                                ${lives}
                            </div>
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
        return `<div id="bombBar">
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
        return `<div id="superAbilityBar">
                    <div id="lightningElementContainer">
                        <div id="lightningElement" class="lightningIsOff"></div>
                    </div>
                    <div id="shineSectorsContainer">
                        <div id="shineSectorsBox">
                            ${sectors}
                        </div>
                    </div>
                </div>`;
    },

    inCenterTableNotifyTemplatePrint(message) {
        return `<div id="messageContainer">
                    <div id="messageElement" class="${config.menuColor}">                                                      
                        <strong>
                            ${message}
                        </strong>
                    </div>        
                </div>`;
    },

    cheatConsoleTemplatePrint() {
        return `<form id="cheatConsole">
                    <strong>
                        <div id="cheatMessageContainer"></div>
                        <div id="cheatInputContainer">
                            <p id="consoleSymbol">
                                >_
                            </p> 
                        <input id="cheatInput"
                               name="cheatInput"
                               class="${config.menuColor}"
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
        return `<p id="cheatMessage" class="${messageColor}">
                    ${message}
                </p>`;
    },

    debugPanelTemplatePrint(debugElementsDiv) {
        return `<div id="debugPanel">
                    <p id="debugPanelLabel">
                        debug panel
                    </p>
                    <div id="btnsContainer">
                        ${debugElementsDiv}
                    </div>    
                </div>`;
    },

    // пункты меню должны меняться динамически, анимация при появлении меню
    // анимация при нажатии
    pauseMenuBackgroundPrint() {
        return `<div id="pauseMenuBackground">
                    <div id="pauseMenuContainer">
                        <div id="pauseMenuLeftBlock">
                            <div class="pauseSideOptionBlock">
                                <div id="pauseLetfOptionDisplay">
                                    <button class="pauseMenuSideBtn">
                                        <i id="pauseMenuBack" class="fas fa-angle-double-left"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="pauseMenuSideBorder"></div>
                            <div class="pauseMenuSideBottomBracing"></div>
                        </div>
                        <div>
                            <div class="pauseMenuHorizontalBorder"></div>
                            <ul id="pauseMenuList">
                                <li class="pauseMenuOneList">
                                    <button class="pauseMenuBtn">
                                        Продолжить
                                    </button>
                                </li>
                                <li class="pauseMenuOneList">
                                    <button class="pauseMenuBtn">
                                        Перезапустить
                                    </button>
                                </li>
                                <li class="pauseMenuOneList">
                                    <button class="pauseMenuBtn">
                                        Выйти
                                    </button>
                                </li>
                            </ul>
                            <div class="pauseMenuHorizontalBorder"></div>
                        </div>
                        <div id="pauseMenuRightBlock">
                            <div class="pauseSideOptionBlock">
                                <div id="pauseRightOptionDisplay">
                                    <button class="pauseMenuSideBtn">
                                        <i id="pauseMenuCross" class="fas fa-times"></i>
                                    </button>
                                </div>
                            </div>
                            <div class="pauseMenuSideBorder"></div>
                            <div class="pauseMenuSideBottomBracing"></div>
                        </div>
                    </div>
                </div>`;
    }
}