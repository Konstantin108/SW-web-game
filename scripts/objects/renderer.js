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
        return templatePrinter.mapTemplatePrint(this.map);
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
            let hitPosition = document.querySelector(`[data-x="${arrowsArray[i].hit_x}"][data-y="${arrowsArray[i].hit_y}"]`);
            if (hitPosition) {
                hitPosition.classList.add("hit");
                hitPosition.classList.remove("blockage");
            }
            setTimeout(() => {
                this.clear("hit");
            }, 500)
        }
    },

    renderPickedBonus(bonusesArray) {
        for (let i = 0; i < bonusesArray.length; i++) {
            let pickedBonusPosition = document.querySelector(`[data-x="${bonusesArray[i].picked_x}"][data-y="${bonusesArray[i].picked_y}"]`);
            if (pickedBonusPosition) {
                pickedBonusPosition.classList.add("picked");
                pickedBonusPosition.classList.remove(`${bonusesArray[i].name}`);
            }
            setTimeout(() => {
                this.clear("picked");
            }, 500)
        }
    },

    renderMovingObjects(objectsArray, thisSelectorOverlay = null) {
        for (let i = 0; i < objectsArray.length; i++) {
            let objectPosition = document.querySelector(`[data-x="${objectsArray[i].x}"][data-y="${objectsArray[i].y}"]`);
            if (objectPosition) {
                this.renderPriorityObjects(objectPosition, thisSelectorOverlay);
                objectPosition.classList.add(`${objectsArray[i].selectorName}`);
            }
        }
    },

    renderPriorityObjects(objectPosition, removingSelectors) {
        if (removingSelectors) {
            for (let i = 0; i <= removingSelectors.length; i++) {
                if (objectPosition.classList.contains(`${removingSelectors[i]}`)) objectPosition.classList.remove(`${removingSelectors[i]}`);
            }
        }
    },

    renderStatusBar() {
        this.statusBar = templatePrinter.statusBarTemplatePrint(progressController.level, progressController.score, progressController.shipDestroyer, this.renderLivesBar());
        let statusBar = document.querySelector("#statusBarContainer");

        if (statusBar) this.container.removeChild(statusBar);
        this.container.insertAdjacentHTML("beforeend", this.statusBar);
    },

    renderLivesBar() {          // если больше 5 жизней то будет отрисовано простое табло
        let livesCount = config.lives;
        let livesBar = null;
        let heartsBox = "";
        let lostLives = livesCount - player.lives;

        if (livesCount > 5) {
            livesBar = templatePrinter.livesBarTemplatePrint(player.lives);
        } else {
            for (let i = 0; i < player.lives; i++) {
                heartsBox += `<div class="heart"></div>`;
            }
            for (let i = 0; i < lostLives; i++) {
                heartsBox += `<div class="lostHeart"></div>`;
            }
            livesBar = templatePrinter.heartsBarTemplatePrint(heartsBox);
        }
        return livesBar;
    },

    renderHeartScaleAnimation() {
        let selector = "heartScale";
        let hearts = document.querySelectorAll(".heart");
        let lostHearts = document.querySelectorAll(".lostHeart");

        for (let heart = 0; heart <= hearts.length; heart++) {
            if (hearts[heart]) {
                hearts[heart].classList.add(`${selector}`);
                setTimeout(() => {
                    hearts[heart].classList.remove(`${selector}`);
                }, 300)
            }
        }
        for (let lostHeart = 0; lostHeart <= lostHearts.length; lostHeart++) {
            if (lostHearts[lostHeart]) {
                lostHearts[lostHeart].classList.add(`${selector}`);
                setTimeout(() => {
                    lostHearts[lostHeart].classList.remove(`${selector}`);
                }, 300)
            }
        }
    },

    renderScullChangeColor() {
        let scull = document.querySelector("#scull");
        let whiteScull = "whiteScull";
        let redScull = "redScull";

        scull.classList.remove(`${whiteScull}`);
        scull.classList.add(`${redScull}`);
        setTimeout(() => {
            scull.classList.remove(`${redScull}`);
            scull.classList.add(`${whiteScull}`);
        }, 300);
    },

    clear(selector) {
        let removeTargets = document.querySelectorAll(`.${selector}`);
        removeTargets.forEach(removeTarget => {
            removeTarget.classList.remove(`${selector}`);
        });
    }
}