import {config} from "../config/config.js";
import {player} from "./player.js";
import {templatePrinter} from "./templatePrinter.js";
import {progressController} from "../controllers/progressController.js";
import {crashChecker} from "./crashChecker.js";
import {game} from "../game.js";
import {boss} from "./boss.js";
import {helperController} from "../controllers/helperController.js";

export const renderer = {
    x: config.mapSizeX,
    y: config.mapSizeY,
    map: "",
    statusBar: null,
    superAbilityBar: null,
    bombBar: null,
    bonusShieldBar: null,
    bonusNewArrowTypeBar: null,
    bonusShieldTimerId: null,
    bonusNewArrowTypeTimerId: null,
    cheatMessageRemoveTimerId: null,
    container: document.querySelector("#container"),

    render() {
        let renderedMap = this.renderMap();

        this.container.insertAdjacentHTML("afterbegin", renderedMap);
        this.renderPlayer();
        this.renderStatusBar();
        this.renderBombBar();
        this.renderBonusBarElement("shieldBar");
        this.renderBonusBarElement("newArrowTypeBar");
        this.renderSuperAbilityBar();
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
        playerPosition.classList.remove("blockage", "blockageBull");
        playerPosition.classList.remove("enemyArrowBomb");
        playerPosition.classList.add(player.selectorName);
        if (player.invincibility) playerPosition.classList.add("invincibility");
        if (player.extraSelectorName) playerPosition.classList.add(`${player.extraSelectorName}`);
    },

    renderBoss(selectorName, thisSelectorOverlay) {
        let bossPosition = document.querySelector(`[data-x="${boss.x}"][data-y="${boss.y}"]`);
        this.renderPriorityObjects(bossPosition, thisSelectorOverlay);
        bossPosition.classList.add(`${selectorName}`);
    },

    renderBossCreate() {
        let bossPosition = document.querySelector(`[data-x="${boss.x}"][data-y="${boss.y}"]`);
        bossPosition.classList.add("bossCreate");
        setTimeout(() => bossPosition.classList.remove("bossCreate"), 2000);
    },

    renderGetDamageBoss(selectorName, thisSelectorOverlay) {
        let bossPosition = document.querySelector(`[data-x="${boss.x}"][data-y="${boss.y}"]`);
        this.renderPriorityObjects(thisSelectorOverlay);
        bossPosition.classList.add(`${selectorName}`);
        setTimeout(() => this.clear(`${selectorName}`), 40);
    },

    renderBossDyingRandomExplosions(bossExplosionsCount) {
        let randomCoordinates = helperController.getRandomCoordinates(boss.bodyX, boss.y);
        let randomHitPosition = document.querySelector(`[data-x="${randomCoordinates.x}"][data-y="${randomCoordinates.y}"]`);

        randomHitPosition.classList.add("crash");
        setTimeout(() => randomHitPosition.classList.remove("crash"), 500);
        if (bossExplosionsCount > 0) {
            setTimeout(() => {
                return this.renderBossDyingRandomExplosions(bossExplosionsCount += -1);
            }, 200);
        }
    },

    renderKillBoss(thisSelectorOverlay, hitCoordinates) {
        let bossExplosionsCount = 32;

        let hitPosition = document.querySelector(`[data-x="${hitCoordinates.hit_x}"][data-y="${hitCoordinates.hit_y}"]`);
        hitPosition.classList.add("crash");
        setTimeout(() => hitPosition.classList.remove("crash"), 500);

        setTimeout(() => this.renderBossDyingRandomExplosions(bossExplosionsCount), 200);

        let bossPosition = document.querySelector(`[data-x="${boss.x}"][data-y="${boss.y}"]`);
        this.renderPriorityObjects(thisSelectorOverlay);
        setTimeout(() => bossPosition.classList.add("bossDyingDisappears"), 7500);
        setTimeout(() => {
            this.clear("bossDyingDisappears");
            this.clear("boss");
        }, 10500);
    },

    renderBossShieldHit(shieldBody, hitData) {
        for (let i = 0; i < shieldBody.x.length; i++) {
            let bossShieldHitPosition = document.querySelector(`[data-x="${shieldBody.x[i]}"][data-y="${shieldBody.y}"]`);
            if (bossShieldHitPosition) {
                if (hitData) bossShieldHitPosition.classList.remove(`${hitData.selectorName}`);
                bossShieldHitPosition.classList.add("bossShieldHit");
                setTimeout(() => bossShieldHitPosition.classList.remove("bossShieldHit"), 150);
            }
        }
    },

    renderBossShield(shieldBody, mode) {
        for (let i = 0; i < shieldBody.x.length; i++) {
            let bossShieldPosition = document.querySelector(`[data-x="${shieldBody.x[i]}"][data-y="${shieldBody.y}"]`);
            if (bossShieldPosition) {
                if (mode === "on") {
                    bossShieldPosition.classList.add("bossShield");
                } else {
                    bossShieldPosition.classList.remove("bossShield");
                    bossShieldPosition.classList.add("bossShieldOff");
                    setTimeout(() => bossShieldPosition.classList.remove("bossShieldOff"), 300);
                }
            }
        }
    },

    renderCrash() {
        let crashPosition = document.querySelector(`[data-x="${crashChecker.x}"][data-y="${crashChecker.y}"]`);
        crashPosition.classList.remove("blockage", "blockageBull");
        crashPosition.classList.add("crash");
        setTimeout(() => this.clear("crash"), 500);
    },

    renderGetDamageEnemy(hitData, selectorName) {
        let getDamageEnemyPosition = null;

        getDamageEnemyPosition = document.querySelector(`[data-x="${hitData.hit_x}"][data-y="${hitData.hit_y}"]`);
        if (getDamageEnemyPosition) {
            getDamageEnemyPosition.classList.add(`${selectorName}`);
            setTimeout(() => this.clear(`${selectorName}`), 40);
        }
    },

    renderHit(object) {
        let hitPosition = null;

        if (object.selectorName === "blockage" || object.selectorName === "blockageBull") {
            hitPosition = document.querySelector(`[data-x="${object.x}"][data-y="${object.y}"]`);
        } else {
            hitPosition = document.querySelector(`[data-x="${object.hit_x}"][data-y="${object.hit_y}"]`);
        }
        if (hitPosition) {
            hitPosition.classList.add("hit");
            hitPosition.classList.remove("blockage", "blockageBull");
            setTimeout(() => this.clear("hit"), 500);
        }
    },

    renderSuperAbility() {
        let superAbilityAbimationStartY = player.y - 1;
        let superAbilityAbimationStartX = player.x;

        for (let i = superAbilityAbimationStartY; i >= 0; i--) {
            let superAbilityFlashCenterLinePosition = document.querySelector(`[data-x="${superAbilityAbimationStartX}"][data-y="${i}"]`);
            if (superAbilityFlashCenterLinePosition) {
                superAbilityFlashCenterLinePosition.classList.add("superAbilityCenterLine");
            }
            if (i <= superAbilityAbimationStartY - 1) {
                let superAbilityFlashLeftSecondPosition = document.querySelector(`[data-x="${superAbilityAbimationStartX + 1}"][data-y="${i}"]`);
                if (superAbilityFlashLeftSecondPosition) {
                    superAbilityFlashLeftSecondPosition.classList.add("superAbilitySecondLine");
                }
                let superAbilityFlashRightSecondPosition = document.querySelector(`[data-x="${superAbilityAbimationStartX - 1}"][data-y="${i}"]`);
                if (superAbilityFlashRightSecondPosition) {
                    superAbilityFlashRightSecondPosition.classList.add("superAbilitySecondLine");
                }
            }
            if (i <= superAbilityAbimationStartY - 2) {
                let superAbilityFlashLeftThirdPosition = document.querySelector(`[data-x="${superAbilityAbimationStartX + 2}"][data-y="${i}"]`);
                if (superAbilityFlashLeftThirdPosition) {
                    superAbilityFlashLeftThirdPosition.classList.add("superAbilityThirdLine");
                }
                let superAbilityFlashRightThirdPosition = document.querySelector(`[data-x="${superAbilityAbimationStartX - 2}"][data-y="${i}"]`);
                if (superAbilityFlashRightThirdPosition) {
                    superAbilityFlashRightThirdPosition.classList.add("superAbilityThirdLine");
                }
            }
            setTimeout(() => {
                this.clear("superAbilityCenterLine");
                this.clear("superAbilitySecondLine");
                this.clear("superAbilityThirdLine");
            }, 200);
        }
    },

    renderExplosion() {
        let table = document.querySelector("table");

        table.classList.add("flash");
        setTimeout(() => table.classList.add("explosion"), 500);
        setTimeout(() => table.classList.remove("flash"), 2000);
        setTimeout(() => table.classList.remove("explosion"), 1800);
    },

    renderPickedBonus(bonus, playerPickUpThisBonus = true) {
        let pickedBonusPosition = null;

        if (playerPickUpThisBonus) {
            pickedBonusPosition = document.querySelector(`[data-x="${bonus.picked_x}"][data-y="${bonus.picked_y}"]`);
        } else {
            pickedBonusPosition = document.querySelector(`[data-x="${bonus.x}"][data-y="${bonus.y}"]`);
        }
        if (pickedBonusPosition) {
            pickedBonusPosition.classList.remove(`${bonus.name}`);
            pickedBonusPosition.classList.remove(player.selectorName);
            pickedBonusPosition.classList.add("picked");
            setTimeout(() => this.clear("picked"), 500);
        }
    },

    renderTeleportation(mode) {
        let selector = null;

        if (mode === "out") {
            selector = "teleportationOut";
        } else {
            selector = "teleportationIn";
        }
        let teleportationPosition = document.querySelector(`[data-x="${player.x}"][data-y="${player.y}"]`);
        teleportationPosition.classList.add(`${selector}`);
        setTimeout(() => teleportationPosition.classList.remove(`${selector}`), 500);
    },

    renderMovingObjects(objectsArray, thisSelectorOverlay = null) {
        let priorityRenderBossSelectors = [
            "boss",
            "bossWhite"
        ];

        for (let i = 0; i < objectsArray.length; i++) {
            let objectPosition = document.querySelector(`[data-x="${objectsArray[i].x}"][data-y="${objectsArray[i].y}"]`);
            if (objectPosition) {
                let canRenderObject = 0;
                for (let selector = 0; selector < priorityRenderBossSelectors.length; selector++) {
                    if (!objectPosition.classList.contains(`${priorityRenderBossSelectors[selector]}`)) canRenderObject += 1;
                }
                if (canRenderObject === 2) {
                    this.renderPriorityObjects(objectPosition, thisSelectorOverlay);
                    objectPosition.classList.add(`${objectsArray[i].selectorName}`);
                }
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

    renderBombBar(playerHasBomb = true) {
        let table = document.querySelector("table");
        let bombElement = document.querySelector("#bombBar");
        let bomb = null;

        if (bombElement) table.removeChild(bombElement);
        if (player.bombsCount < 1) {
            bomb = `<div class="bomb emptyBomb"></div>`;
        } else {
            bomb = `<div class="bomb activeBomb"></div>`;
        }

        if (!playerHasBomb) {
            bomb = `<div class="bomb redBomb"></div>`;
            setTimeout(() => this.renderBombBar(), 200);
        }

        this.bombBar = templatePrinter.bombBarTemplatePrint(bomb);
        table.insertAdjacentHTML("afterbegin", this.bombBar);
    },

    renderBonusBarElement(elementType, bonus = null) {
        let table = document.querySelector("table");
        let bonusBarDivElement = null;
        let bonusBarDivTimer = null;
        let bonusTimerLabel = null;
        let bonusBarDivElementId = null;
        let bonusElement = null;
        let bonusTimer = null;
        let timer = null;
        let bonusElementObject = null;

        if (elementType === "shieldBar") {
            bonusBarDivElementId = "bonusShieldBar";
            bonusBarDivTimer = "timerForBonusShield";
            bonusTimerLabel = "bonusShieldTimerLabel";
        } else {
            bonusBarDivElementId = "bonusNewArrowTypeBar";
            bonusBarDivTimer = "timerForBonusNewArrowType";
            bonusTimerLabel = "bonusNewArrowTypeTimerLabel";
        }

        bonusBarDivElement = document.querySelector(`#${bonusBarDivElementId}`);

        if (bonusBarDivElement) table.removeChild(bonusBarDivElement);

        if (bonus) {
            bonusElement = `<div class="${bonus.pickUpImageName}"></div>`;
            setTimeout(() => bonusElementObject = document.querySelector(`.${bonus.pickUpImageName}`), 10);

            timer = bonus.actionTime / 1000;

            if (elementType === "shieldBar") {
                clearTimeout(this.bonusShieldTimerId);
            } else {
                clearTimeout(this.bonusNewArrowTypeTimerId);
            }

            setTimeout(() => this.renderBonusTimer(timer, elementType, bonusBarDivTimer, bonusTimerLabel, bonusElementObject), 10);
        } else {
            bonusElement = `<div></div>`;
            bonusTimer = `<div id="${bonusBarDivTimer}"></div>`;
        }

        if (elementType === "shieldBar") {
            this.bonusShieldBar = templatePrinter.bonusBarElementTemplatePrint(bonusElement, bonusBarDivElementId, bonusTimerLabel, bonusBarDivTimer);
            table.insertAdjacentHTML("afterbegin", this.bonusShieldBar);
        } else {
            this.bonusNewArrowTypeBar = templatePrinter.bonusBarElementTemplatePrint(bonusElement, bonusBarDivElementId, bonusTimerLabel, bonusBarDivTimer);
            table.insertAdjacentHTML("afterbegin", this.bonusNewArrowTypeBar);
        }
    },

    renderBonusTimer(timer, elementType, timerElement, bonusTimerLabel, bonusElementObject) {
        if (!timer) return;
        let timerLabel = document.querySelector(`#${bonusTimerLabel}`);
        let timerDiv = document.querySelector(`#${timerElement}`)
        let timerData = `<div id="${timerElement}">${timer}</div>`;
        let thisTimerId = null;
        let tick = -1;

        if (!game.gameIsRunning) tick = 0;

        if (timerDiv) timerLabel.removeChild(timerDiv);
        timerLabel.insertAdjacentHTML("afterbegin", timerData);
        if (timer > 0) {
            thisTimerId = setTimeout(() => {
                return this.renderBonusTimer(timer += tick, elementType, timerElement, bonusTimerLabel, bonusElementObject);
            }, 1000);
        }

        if (timer <= 6) bonusElementObject.classList.add("blinkBeforeBonusOff");

        if (elementType === "shieldBar") {
            this.bonusShieldTimerId = thisTimerId;
        } else {
            this.bonusNewArrowTypeTimerId = thisTimerId;
        }
    },

    renderSuperAbilityBar(superAbilityIsActivated = true) {
        let table = document.querySelector("table");
        let superAbilityBarElement = document.querySelector("#superAbilityBar");
        let shineSectorsCount = config.superAbilityIsCharged;
        let shineSectorsBox = "";
        let shineSectorsIsOn = progressController.superAbilityCharge;
        let shineSectorsIsOff = shineSectorsCount - shineSectorsIsOn;

        if (superAbilityBarElement) table.removeChild(superAbilityBarElement);
        for (let i = 0; i < shineSectorsIsOff; i++) {
            shineSectorsBox += `<div class="shineSector shineSectorIsOff"></div>`;
        }
        for (let i = 0; i < shineSectorsIsOn; i++) {
            shineSectorsBox += `<div class="shineSector shineSectorIsOn"></div>`;
        }
        this.superAbilityBar = templatePrinter.superAbilityBarTemplatePrint(shineSectorsBox);
        table.insertAdjacentHTML("afterbegin", this.superAbilityBar);

        let lightningElement = document.querySelector("#lightningElement");
        if (shineSectorsIsOn === shineSectorsCount) {
            lightningElement.classList.remove("lightningIsOff");
            lightningElement.classList.add("lightningIsOn");
        } else {
            lightningElement.classList.remove("lightningIsOn");
            lightningElement.classList.add("lightningIsOff");
        }

        if (!superAbilityIsActivated) {
            lightningElement.classList.add("lightningIsOut");
            setTimeout(() => this.renderSuperAbilityBar(), 200);
        }
    },

    renderLivesBar() {  // если больше 5 жизней то будет отрисовано простое табло
        let livesCount = config.lives;
        let livesBar = null;
        let heartsBox = "";
        let lostLives = livesCount - player.lives;

        if (livesCount > 5) {
            livesBar = templatePrinter.livesBarTemplatePrint(player.lives);
        } else {
            for (let i = 0; i < player.lives; i++) {
                heartsBox += `<div class="heart availableHeart"></div>`;
            }
            for (let i = 0; i < lostLives; i++) {
                heartsBox += `<div class="heart lostHeart"></div>`;
            }
            livesBar = templatePrinter.heartsBarTemplatePrint(heartsBox);
        }
        return livesBar;
    },

    renderHeartScaleAnimation() {
        let selector = "heartScale";
        let hearts = document.querySelectorAll(".heart");
        let lostHearts = document.querySelectorAll(".lostHeart");

        hearts.forEach(heart => {
            if (heart) {
                heart.classList.add(`${selector}`);
                setTimeout(() => heart.classList.remove(`${selector}`), 300);
            }
        });
        lostHearts.forEach(lostHeart => {
            if (lostHeart) {
                lostHeart.classList.add(`${selector}`);
                setTimeout(() => lostHeart.classList.remove(`${selector}`), 300);
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
        removeTargets.forEach(removeTarget => removeTarget.classList.remove(`${selector}`));
    },

    renderInCenterTableNotify(message) {
        let table = document.querySelector("table");
        let messageElement = null;

        table.insertAdjacentHTML("afterbegin", templatePrinter.inCenterTableNotifyTemplatePrint(message));

        messageElement = document.querySelector("#messageContainer");
        if (messageElement) setTimeout(() => table.removeChild(messageElement), 1000);
    },

    renderCheatConsole() {
        let cheatConsole = null;

        if (document.querySelector("#cheatConsole") === null) {
            this.container.insertAdjacentHTML("afterbegin", templatePrinter.cheatConsoleTemplatePrint());
            cheatConsole = document.querySelector("#cheatConsole");
            cheatConsole.classList.add("cheatConsoleIn");
            setTimeout(() => cheatConsole.classList.remove("cheatConsoleIn"), 500);
        } else {
            cheatConsole = document.querySelector("#cheatConsole");
            cheatConsole.classList.add("cheatConsoleOut");
            setTimeout(() => this.container.removeChild(cheatConsole), 480);
        }
    },

    renderCheatMessage(message, messageColor, cheatMessageContainer) {
        let messageElement = null;

        cheatMessageContainer.innerHTML = '';
        if (this.cheatMessageRemoveTimerId) clearTimeout(this.cheatMessageRemoveTimerId);

        cheatMessageContainer.insertAdjacentHTML("afterbegin", templatePrinter.cheatMessageTemplatePrint(message, messageColor));
        messageElement = document.querySelector("#cheatMessage");
        if (messageElement) this.cheatMessageRemoveTimerId = setTimeout(() => cheatMessageContainer.removeChild(messageElement), 3000);
    }
}