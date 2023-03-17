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
        let playerPosition = document.querySelector(`[data-x="${player.x}"][data-y="${player.y}"]`);
        playerPosition.classList.remove("blockage");
        playerPosition.classList.remove("enemyArrow");
        playerPosition.classList.add(player.selectorName);
        if (player.invincibility) {
            playerPosition.classList.add("invincibility");
        }
        if (player.extraSelectorName) {
            playerPosition.classList.add(`${player.extraSelectorName}`);
        }
    },

    renderCrash() {
        let crashPosition = document.querySelector(`[data-x="${crashChecker.x}"][data-y="${crashChecker.y}"]`);
        crashPosition.classList.remove("blockage");
        crashPosition.classList.add("crash");
        setTimeout(() => {
            this.clear("crash");
        }, 500)
    },

    renderHit(object) {
        let hitPosition = null;

        if (object.selectorName == "blockage") {
            hitPosition = document.querySelector(`[data-x="${object.x}"][data-y="${object.y}"]`);
        } else {
            hitPosition = document.querySelector(`[data-x="${object.hit_x}"][data-y="${object.hit_y}"]`);
        }
        if (hitPosition) {
            hitPosition.classList.add("hit");
            hitPosition.classList.remove("blockage");
        }
        setTimeout(() => {
            this.clear("hit");
        }, 500)
    },

    renderExplosion() {
        let table = document.querySelector("table");

        table.classList.add("flash");
        setTimeout(() => {
            table.classList.add("explosion");
        }, 500);
        setTimeout(() => {
            table.classList.remove("flash");
        }, 2000);
        setTimeout(() => {
            table.classList.remove("explosion");
        }, 1800);
    },

    renderPickedBonus(bonus) {
        let pickedBonusPosition = document.querySelector(`[data-x="${bonus.picked_x}"][data-y="${bonus.picked_y}"]`);
        if (pickedBonusPosition) {
            pickedBonusPosition.classList.remove(`${bonus.name}`);
            pickedBonusPosition.classList.remove(player.selectorName);
            pickedBonusPosition.classList.add("picked");
        }
        setTimeout(() => {
            this.clear("picked");
        }, 500)
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

        hearts.forEach((heart) => {
            if (heart) {
                heart.classList.add(`${selector}`);
                setTimeout(() => {
                    heart.classList.remove(`${selector}`);
                }, 300)
            }
        });
        lostHearts.forEach((lostHeart) => {
            if (lostHeart) {
                lostHeart.classList.add(`${selector}`);
                setTimeout(() => {
                    lostHeart.classList.remove(`${selector}`);
                }, 300)
            }
        });
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