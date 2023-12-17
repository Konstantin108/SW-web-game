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
                                    <div class="infoLabel">
                                        уровень
                                    </div>
                                    <div>
                                        ${level}
                                    </div>    
                                </div>
                            </strong>
                        </div>
                        <div class="statusBarElement">
                            <strong>
                                <div class="infoContainer widePadding">
                                    <div class="infoLabel">
                                        очки
                                    </div>
                                    <div>
                                        ${score}
                                    </div>
                                </div>
                            </strong>
                        </div>
                        <div class="statusBarElement">
                            <strong>
                                <div class="infoContainer widePadding">
                                    <div class="infoLabel">
                                        уничтожено противников
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
                        <div class="infoContainer widePadding">
                            <div class="infoLabel">
                                жизни
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
                            ${message}
                        </strong>
                    </div>        
                </div>`;
    },

    cheatConsoleTemplatePrint(sizeClass) {
        return `<form id="cheatConsole" class="${sizeClass}">
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

    debugPanelTemplatePrint(debugElementsDiv, sizeClass) {
        return `<div id="debugPanel" class="${sizeClass}">
                    <p id="debugPanelLabel">
                        debug panel
                    </p>
                    <div id="btnsContainer">
                        ${debugElementsDiv}
                    </div>    
                </div>`;
    },

    pauseMenuPrint(sizeClass) {
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

    confirmBlockLabelPrint() {
        return `<div id="confirmTitle" class="${config.menuColor}">
                    вы уверены?
                </div>`;
    },

    statisticsBlockPrint(data) {
        return `<div id="statisticsBlock" class="${config.menuColor}">
                    <div id="statisticsTitle">
                        игра окончена
                    </div>
                    <div id="statisticsGridContainer">
                        ${data}
                    </div>
                </div>`;
    },

    bossLivesBarTemplatePrint(sectors, extraClass) {
        return `<div id="bossLivesBar" class="${extraClass}">
                    <img src="../../src/images/disk.png" alt="disk.png" class="disk">
                    <div id="bossLivesBarMetalElement">
                        <div id="bossLivesBarBlackElement">
                            ${sectors}
                        </div>  
                    </div>
                    <img src="../../src/images/disk.png" alt="disk.png" class="disk">                            
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
                            ${text} подсказки
                        </button>
                    </div>
                </div>`;
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
}