let renderer = {
    x: config.mapSizeX,
    y: config.mapSizeY,
    map: "",
    statusBar: null,
    container: document.querySelector("#container"),

    render() {
        let renderedMap = this.renderMap();

        this.container.insertAdjacentHTML("afterbegin", renderedMap);
        this.renderPlayer();
        this.renderStatusBar();
    },

    renderMap() {
        for (let row = 0; row < this.y + 1; row++) {
            this.map += "<tr>";
            for (let column = 0; column < this.x + 1; column++) {
                this.map += `<td data-x="${column}" data-y="${row}"></td>`;
            }
            this.map += "</tr>";
        }
        return `<table><tbody>${this.map}</tbody></table>`;
    },

    renderPlayer() {
        let playerColor = "";

        if (player.invincibility) {
            playerColor = "invincibility";
        } else {
            playerColor = "player";
        }
        let playerPosition = document.querySelector(`[data-x="${player.x}"][data-y="${player.y}"]`);
        playerPosition.classList.remove("blockage");
        playerPosition.classList.remove("enemyArrow");
        playerPosition.classList.add(playerColor);
    },

    renderCrash() {
        let crashPosition = document.querySelector(`[data-x="${crashChecker.x}"][data-y="${crashChecker.y}"]`);
        crashPosition.classList.remove("blockage");
        crashPosition.classList.add("crash");
        setTimeout(() => {
            this.clear("crash");
        }, 500)
    },

    renderHit(arrowsArray) {
        for (let i = 0; i < arrowsArray.length; i++) {
            let enemyHitPosition = document.querySelector(`[data-x="${arrowsArray[i].hit_x}"][data-y="${arrowsArray[i].hit_y}"]`);
            if (enemyHitPosition) enemyHitPosition.classList.add("hit");
            setTimeout(() => {
                this.clear("hit");
            }, 500)
        }
    },

    renderMovingObjects(objectsArray, selector) {
        for (let i = 0; i < objectsArray.length; i++) {
            let enemyArrowPosition = document.querySelector(`[data-x="${objectsArray[i].x}"][data-y="${objectsArray[i].y}"]`);
            if (enemyArrowPosition) enemyArrowPosition.classList.add(`${selector}`);
        }
    },

    renderStatusBar() {
        this.statusBar = `
                <div id="statusBarContainer">
                    <div id="statusBar">
                        <div id="skull"></div>
                        <div class="statusBarElement">
                            <strong>
                                <div class="infoContainer">
                                    <div>
                                        Уровень
                                    </div>
                                    <div>
                                        ${progressController.level}
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
                                        ${progressController.score}
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
                                        ${progressController.shipDestroyer} 
                                    </div>
                                </div>
                            </strong>
                        </div>
                            ${this.renderLivesBar()}
                    </div>
                </div>`;
        let statusBar = document.querySelector("#statusBarContainer");
        if (statusBar) this.container.removeChild(statusBar);
        this.container.insertAdjacentHTML("beforeend", this.statusBar);
    },

    renderLivesBar() {
        let livesCount = config.lives;
        let livesBar = null;
        let heartsBox = "";
        let lostLives = livesCount - player.lives;

        if (livesCount > 5) {
            livesBar = `<div class="statusBarElement">
                            <strong>
                                <div class="infoContainer">
                                    <div>
                                        Жизни
                                    </div>
                                    <div>
                                        ${player.lives}
                                    </div>
                                </div>
                            </strong>
                        </div>`;
        } else {
            for (let i = 0; i < player.lives; i++) {
                heartsBox += `<div class="heart"></div>`;
            }
            for (let i = 0; i < lostLives; i++) {
                heartsBox += `<div class="lostHeart"></div>`;
            }
            livesBar = `<div id="heartsBar">
                            ${heartsBox}
                        </div>`;
        }
        return livesBar
    },

    clear(selector) {
        let removeTargets = document.querySelectorAll(`.${selector}`);
        removeTargets.forEach(removeTarget => {
            removeTarget.classList.remove(`${selector}`);
        });
    }
}