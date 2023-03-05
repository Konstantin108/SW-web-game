let templatePrinter = {

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
                                    <div>
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
                                    <div>
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
                                    <div>
                                        Уничтожено кораблей
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
                            <div>
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
    }
}