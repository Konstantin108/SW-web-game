export const templatePrinter = {

    mapTemplatePrint(map) {
        return `
                <table>
                    <tbody>
                        ${map}
                    </tbody>
                </table>`;
    },

    statusBarTemplatePrint(level, score, shipDestroyer, livesBar) {
        return `
                <div id="statusBarContainer">
                    <div id="statusBar">
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
                                        ${shipDestroyer} 
                                    </div>
                                </div>
                            </strong>
                        </div>
                            ${livesBar}
                    </div>
                </div>`;
    },

    livesBarTemplatePrint(lives) {
        return `
                <div class="statusBarElement">
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
        return `
                <div id="heartsBar">
                    ${heartsBox}
                </div>`;
    },

    bombBarTemplatePrint(bomb) {
        return `
                <div id="bombBar">
                    ${bomb}
                </div>`;
    },

    bonusShieldBarTemplatePrint(bonusShieldElement) {
        return `
                <div id="bonusShieldBar">
                    <div class="statusBarElement bonusBarElement">
                        <strong>
                            <div class="infoContainer">
                                <div class="infoLabel bonusLabel">
                                    ${bonusShieldElement}
                                </div>
                            </div>        
                        </strong>
                    </div>
                    <div class="statusBarElement bonusBarElement">
                        <strong>
                            <div class="infoContainer">
                                <div id="bonusShieldTimerLabel" class="infoLabel timerLabel">
                                    <div id="timerForBonusShield"></div>    
                                </div>
                            </div>
                        </strong>
                    </div>
                </div>`;
    },

    bonusNewArrowTypeTemplatePrint(bonusNewArrowTypeElement) {
        return `
                <div id="bonusNewArrowTypeBar">
                    <div class="statusBarElement bonusBarElement">
                        <strong>
                            <div class="infoContainer">
                                <div class="infoLabel bonusLabel">
                                    ${bonusNewArrowTypeElement}
                                </div>
                            </div>    
                        </strong>
                    </div>
                    <div class="statusBarElement bonusBarElement">
                        <strong>
                            <div class="infoContainer">
                                <div id="bonusNewArrowTypeTimerLabel" class="infoLabel timerLabel">
                                    <div id="timerForBonusNewArrowType"></div>    
                                </div>
                            </div>
                        </strong>
                    </div>
                </div>`;
    },

    superAbilityBarTemplatePrint(sectors) {
        return `
                <div id="superAbilityBar">
                    <div id="lightningElementContainer">
                        <div id="lightningElement" class="lightningIsOff"></div>
                    </div>
                    <div id="shineSectorsContainer">
                        <div id="shineSectorsBox">
                            ${sectors}
                        </div>
                    </div>
                </div>`;
    }
}