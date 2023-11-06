import {config} from "../config/config.js";
import {player} from "./player.js";
import {templatePrinter} from "./templatePrinter.js";
import {progressController} from "../controllers/progressController.js";
import {crashChecker} from "./crashChecker.js";
import {game} from "../game.js";
import {boss} from "./boss.js";
import {helperController} from "../controllers/helperController.js";
import {pause} from "./pause.js";
import {tooltipController} from "../controllers/tooltipController.js";

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
    tooltipControlPanelInTimerId: null,
    tooltipControlPanelOutTimerId: null,
    container: document.querySelector("#container"),
    body: document.querySelector("body"),

    render() {
        let renderedMap = this.renderMap();

        this.container.insertAdjacentHTML("afterbegin", renderedMap);
        this.renderPlayer();
        this.renderStatusBar();
        this.renderBombBar();
        this.renderBonusBarElement("shieldBar");
        this.renderBonusBarElement("newArrowTypeBar");
        this.renderSuperAbilityBar();
        this.renderSuperAbilityBarActivatedByCheat();
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

    hideLoadingScreen() {
        let loadingScreen = document.querySelector("#loadingScreen");
        if (loadingScreen) setTimeout(() => loadingScreen.parentElement.removeChild(loadingScreen), 500);
    },

    renderPlayer() {
        let playerPosition = document.querySelector(`[data-x="${player.x}"][data-y="${player.y}"]`);
        if (playerPosition.classList.contains("blockage")) playerPosition.classList.remove("blockage");
        if (playerPosition.classList.contains("blockageBull")) playerPosition.classList.remove("blockageBull");
        if (playerPosition.classList.contains("enemyArrowBomb")) playerPosition.classList.remove("enemyArrowBomb");
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
        setTimeout(() => this.renderBossLivesBar(), 1800);
    },

    renderGetDamageBoss(selectorName, thisSelectorOverlay) {
        let bossPosition = document.querySelector(`[data-x="${boss.x}"][data-y="${boss.y}"]`);
        this.renderPriorityObjects(thisSelectorOverlay);
        bossPosition.classList.add(`${selectorName}`);
        setTimeout(() => this.clear(`${selectorName}`), 40);

        this.renderBossLivesBar(true);
    },

    renderBossDyingRandomExplosions(bossExplosionsCount) {
        let randomCoordinates = helperController.getRandomCoordinates(boss.bodyX, boss.y);
        let randomHitPosition = document.querySelector(`[data-x="${randomCoordinates.x}"][data-y="${randomCoordinates.y}"]`);

        game.playerCanStopGame = false;
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

        game.playerCanStopGame = false;

        let hitPosition = document.querySelector(`[data-x="${hitCoordinates.hit_x}"][data-y="${hitCoordinates.hit_y}"]`);
        hitPosition.classList.add("crash");
        setTimeout(() => hitPosition.classList.remove("crash"), 500);

        setTimeout(() => this.renderBossDyingRandomExplosions(bossExplosionsCount), 200);

        let bossPosition = document.querySelector(`[data-x="${boss.x}"][data-y="${boss.y}"]`);
        this.renderPriorityObjects(thisSelectorOverlay);
        setTimeout(() => {
            bossPosition.classList.add("bossDyingDisappears");
            game.playerCanStopGame = false;
        }, 7500);
        setTimeout(() => {
            this.clear("bossDyingDisappears");
            this.clear("boss");
        }, 10300);
        setTimeout(() => game.playerCanStopGame = true, 13000);

        this.hideBossLivesBar();
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
                if (mode) {
                    bossShieldPosition.classList.add("bossShield");
                } else {
                    bossShieldPosition.classList.remove("bossShield");
                    bossShieldPosition.classList.add("bossShieldOff");
                    setTimeout(() => bossShieldPosition.classList.remove("bossShieldOff"), 300);
                }
            }
        }
    },

    renderBossLivesBar(getDamage = false) {
        let table = document.querySelector("table");
        let bossLivesBarElement = document.querySelector("#bossLivesBar");
        let bossLivesBar = null;
        let shineSectorsBox = "";
        let bossLivesBarShineSectorOnHide = "";
        let bossLivesBarSmoothAppearance = "";

        let remainder = config.bossLives % 20;
        let shineSectorsCount = (config.bossLives - remainder) / 20;
        if (remainder) shineSectorsCount += 1;

        let livesLeftCount = config.bossLives - boss.lives;
        let shineSectorsIsOff = Math.floor(livesLeftCount / 20);

        let shineSectorsIsOn = shineSectorsCount - shineSectorsIsOff;

        if (bossLivesBarElement) table.removeChild(bossLivesBarElement);

        if (!getDamage) {
            bossLivesBarShineSectorOnHide = "bossLivesBarShineSectorOnHide";
            bossLivesBarSmoothAppearance = "bossLivesBarSmoothAppearance";
        }

        for (let i = 0; i < shineSectorsIsOn - 1; i++) {
            shineSectorsBox += `<div class="bossLivesBarShineSectorOn ${bossLivesBarShineSectorOnHide}"></div>`;
        }

        shineSectorsBox += `<div class="bossLivesBarShineSectorOnLastElement bossLivesBarShineSectorOn ${bossLivesBarShineSectorOnHide}"></div>`;

        for (let i = 0; i < shineSectorsIsOff; i++) {
            shineSectorsBox += `<div class="bossLivesBarShineSectorOff"></div>`;
        }

        bossLivesBar = templatePrinter.bossLivesBarTemplatePrint(shineSectorsBox, bossLivesBarSmoothAppearance);
        table.insertAdjacentHTML("afterbegin", bossLivesBar);

        if (getDamage) this.renderGetDamageBossLivesBar();
    },

    renderGetDamageBossLivesBar() {
        let lastShineSector = document.querySelector(".bossLivesBarShineSectorOnLastElement");

        if (lastShineSector) {
            lastShineSector.classList.remove("bossLivesBarShineSectorOn");
            lastShineSector.classList.add("bossLivesBarShineSectorHit");
            setTimeout(() => {
                lastShineSector.classList.remove("bossLivesBarShineSectorHit");
                lastShineSector.classList.add("bossLivesBarShineSectorOn");
            }, 100);
        }
    },

    hideBossLivesBar() {
        let table = document.querySelector("table");
        let bossLivesBarElement = document.querySelector("#bossLivesBar");
        let bossLivesBarShineSectorOn = document.querySelectorAll(".bossLivesBarShineSectorOn");

        if (bossLivesBarShineSectorOn) {
            bossLivesBarShineSectorOn.forEach(elem => {
                elem.classList.remove("bossLivesBarShineSectorOn");
                elem.classList.add("bossLivesBarShineSectorOff");
            });
        }

        if (bossLivesBarElement) {
            setTimeout(() => bossLivesBarElement.classList.add("bossLivesBarHide"), 6800);
            setTimeout(() => table.removeChild(bossLivesBarElement), 7000);
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
        game.playerCanStopGame = false;
        setTimeout(() => table.classList.add("explosion"), 500);
        setTimeout(() => {
            table.classList.remove("flash");
            setTimeout(() => game.playerCanStopGame = true, 1500);
        }, 2000);
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

        mode === "out" ? selector = "teleportationOut" : selector = "teleportationIn";
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
        this.statusBar = templatePrinter.statusBarTemplatePrint(progressController.level, progressController.score, progressController.shipDestroyed, this.renderLivesBar());
        let statusBar = document.querySelector("#statusBarContainer");

        if (statusBar) this.container.removeChild(statusBar);
        this.container.insertAdjacentHTML("beforeend", this.statusBar);
    },

    renderBombBar(playerHasBomb = true) {
        let table = document.querySelector("table");
        let bombElement = document.querySelector("#bombBar");
        let bomb = null;

        if (bombElement) table.removeChild(bombElement);
        player.bombsCount < 1 ? bomb = `<div class="bomb emptyBomb"></div>` : bomb = `<div class="bomb activeBomb"></div>`;

        if (!playerHasBomb) {
            bomb = `<div class="bomb redBomb"></div>`;
            setTimeout(() => this.renderBombBar(), 200);
        }

        this.bombBar = templatePrinter.bombBarTemplatePrint(bomb);
        table.insertAdjacentHTML("afterbegin", this.bombBar);

        player.useBombClickHandler();
    },

    renderBonusBarElement(elementType, bonus = null, actionTime = null) {
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

            timer = actionTime / 1000;

            if (elementType === "shieldBar") {
                if (this.bonusShieldTimerId) clearTimeout(this.bonusShieldTimerId);
            } else {
                if (this.bonusNewArrowTypeTimerId) clearTimeout(this.bonusNewArrowTypeTimerId);
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
        let timerData = `<div id="${timerElement}" class="${config.menuColor}">${timer}</div>`;
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

        elementType === "shieldBar" ? this.bonusShieldTimerId = thisTimerId : this.bonusNewArrowTypeTimerId = thisTimerId;
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
            shineSectorsBox += `<div class="shineSector ${config.menuColor}Background"></div>`;
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

        player.useSuperAbilityClickHandler();
    },

    renderSuperAbilityBarActivatedByCheat(chargedByCheatForOneTime = false) {
        if (!config.superAbilityIsAlwaysCharged && !chargedByCheatForOneTime) return;

        let table = document.querySelector("table");
        let superAbilityBarElement = document.querySelector("#superAbilityBar");
        let shineSectorsCount = config.superAbilityIsCharged;
        let shineSectorsBox = "";

        if (superAbilityBarElement) table.removeChild(superAbilityBarElement);
        for (let i = 0; i < shineSectorsCount; i++) {
            shineSectorsBox += `<div class="shineSector ${config.menuColor}Background"></div>`;
        }
        this.superAbilityBar = templatePrinter.superAbilityBarTemplatePrint(shineSectorsBox);
        table.insertAdjacentHTML("afterbegin", this.superAbilityBar);

        let lightningElement = document.querySelector("#lightningElement");
        lightningElement.classList.remove("lightningIsOff");
        lightningElement.classList.add("lightningIsOn");

        player.useSuperAbilityClickHandler();

        let useSuperAbilityBtnGameControlObject = helperController.getObjectByName(config.gameControl, "useSuperAbilityBtn");
        tooltipController.tooltipCreateTimerIdsArray.push(setTimeout(() => {
            tooltipController.tooltipCreateAndDestroy(useSuperAbilityBtnGameControlObject);
        }, this.useSuperAbilityBtnShowDelaySeconds));
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
            heart.classList.add(`${selector}`);
            setTimeout(() => heart.classList.remove(`${selector}`), 300);
        });
        lostHearts.forEach(lostHeart => {
            lostHeart.classList.add(`${selector}`);
            setTimeout(() => lostHeart.classList.remove(`${selector}`), 300);
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

    renderInCenterTableNotify(message, hideDelaySecondsCount, className = "messageElement") {
        let table = document.querySelector("table");
        let messageElement = null;

        table.insertAdjacentHTML("afterbegin", templatePrinter.inCenterTableNotifyTemplatePrint(message, className));

        messageElement = document.querySelector("#messageContainer");
        if (messageElement) setTimeout(() => table.removeChild(messageElement), hideDelaySecondsCount * 1000);
    },

    renderPauseMenu() {
        let backgroundElement = null;
        let pauseMenuContainer = null;

        if (!document.querySelector("#pauseMenuBackground")) {
            this.body.insertAdjacentHTML("afterbegin", templatePrinter.pauseMenuPrint());
            backgroundElement = document.querySelector("#pauseMenuBackground");
            backgroundElement.classList.add("pauseOn");
            setTimeout(() => backgroundElement.classList.remove("pauseOn"), 210);

            this.renderPauseMenuOptions();
            setTimeout(() => this.renderPauseMenuSideBlocksBtn("cross", true), 200);

            tooltipController.tooltipOnOrOff(false, false, false, true);
        } else {
            backgroundElement = document.querySelector("#pauseMenuBackground");
            pauseMenuContainer = document.querySelector("#pauseMenuContainer");
            backgroundElement.classList.add("pauseOff");
            pauseMenuContainer.classList.remove("pauseElementAdd");
            pauseMenuContainer.classList.add("pauseElementRemove");
            setTimeout(() => this.body.removeChild(backgroundElement), 180);

            this.hideTooltipControlPanel(true);
        }
    },

    renderPauseMenuSideBlocksBtn(btnName, pauseOn = false) {
        if (btnName === "back" && String(pause.activeMenuSector) !== "confirmSector") return;
        if (btnName === "cross" && game.gameOver) return;
        if (game.gameIsRunning) return;

        let btn = helperController.getObjectByName(config.pauseMenuOptions, btnName);

        let container = document.querySelector(`#${btn.containerBlockId}`);
        let btnDiv = null
        let value = "";
        let classes = "";
        let internalClasses = "";

        if (btn.classes) btn.classes.forEach(className => classes += className + " ");
        classes += config.menuColor;

        if (btn.internalClasses) btn.internalClasses.forEach(internaClassName => internalClasses += internaClassName + " ");
        if (btnName === "cross" && pauseOn) classes += " pauseMenuCrossAdd";
        if (btn.referer) value = pause.previousMenuSector;
        let btnElement = `<div class="pauseMenuSideBtnBlock">
                            <button id="${btn.id}"
                                    class="${classes.trim()}"
                                    value="${value}">
                                <i class="${internalClasses.trim()}"></i>
                            </button>
                          </div>`;

        btnDiv = document.querySelector(`#${btn.id}`);
        if (btnDiv) container.removeChild(btnDiv.parentElement);
        container.insertAdjacentHTML("afterbegin", btnElement);

        pause.continueGameAction();
    },

    renderPauseMenuOneOptionAddClassOn(pauseMenuOptions, pauseMenuOptionsCount, index) {
        if (!pauseMenuOptions) return;
        if (game.gameIsRunning) return;

        pauseMenuOptions[index].classList.add("pauseMenuBtnOn", `${config.menuColor}`);
        if (index < pauseMenuOptionsCount - 1) {
            setTimeout(() => {
                return this.renderPauseMenuOneOptionAddClassOn(pauseMenuOptions, pauseMenuOptionsCount, index += 1);
            }, 50);
        }
    },

    renderPauseMenuStatisticsBlock(activeMenuSector, optionsBlock) {
        let data = null;
        let dataForPrinter = "";

        if (game.gameOver) {
            data = pause.getStatisticsData();
            if (data) {
                data.forEach(elem => {
                    dataForPrinter += `<div class="statisticsColumn statisticsLeftColumn">
                                            ${elem.name}
                                       </div>
                                       <div class="statisticsColumn statisticsRightColumn">
                                            ${elem.data}
                                       </div>`;
                });
            }
            optionsBlock += templatePrinter.statisticsBlockPrint(dataForPrinter);
        }
        optionsBlock += `<div>`;

        return optionsBlock;
    },

    renderOrRemovePauseMenuConfirmBlock(activeMenuSector, optionsBlock) {
        let menuListClasses = "";

        if (String(activeMenuSector) === "confirmSector") {
            menuListClasses = "listFlexStyle";
            optionsBlock += templatePrinter.confirmBlockLabelPrint();

            this.renderPauseMenuSideBlocksBtn("back");
            setTimeout(() => pause.cancelChoiceAction(), 10);
        } else {
            let backBtn = document.querySelector("#pauseMenuBack");
            if (backBtn) {
                let backBtnContainer = document.querySelector("#pauseLeftOptionDisplay");
                backBtn.classList.remove("pauseMenuBackAdd");
                backBtn.classList.add("pauseMenuBackRemove");
                setTimeout(() => backBtnContainer.removeChild(backBtn.parentElement), 180);
            }
        }
        optionsBlock += `<div class="${menuListClasses}">`;

        return optionsBlock;
    },

    renderBigPauseMenu() {
        if (!game.gameOver) return;
        let optionsBlock = document.querySelector("#pauseMenuList");
        let horizontalBorders = document.querySelectorAll(".pauseMenuHorizontalBorder");
        let sideBorders = document.querySelectorAll(".pauseMenuSideBorder");

        if (optionsBlock) optionsBlock.classList.add("pauseMenuListBigSize");
        if (horizontalBorders) horizontalBorders.forEach(elem => elem.classList.add("pauseMenuHorizontalBorderBigSize"));
        if (sideBorders) sideBorders.forEach(elem => elem.classList.add("pauseMenuSideBorderBigSize"));
    },

    renderPauseMenuOptions(defaultContainer = null) {
        if (game.gameIsRunning) return;
        let activeMenuSector = pause.activeMenuSector;
        let options = config.pauseMenuOptions;
        let menuList = null;
        let container = null;
        let pauseMenuOptions = null;
        let classes = "";
        let value = "";
        let optionsBlock = `<ul id="pauseMenuList">`;

        optionsBlock = this.renderPauseMenuStatisticsBlock(activeMenuSector, optionsBlock);
        optionsBlock = this.renderOrRemovePauseMenuConfirmBlock(activeMenuSector, optionsBlock);

        options.forEach(option => {
            if (option.renderSector.includes(activeMenuSector)) {
                container = document.querySelector(`#${option.containerBlockId}`);
                if (option.classes) option.classes.forEach(className => classes += className + " ");
                if (option.needConfirm) classes += "needConfirm";

                value = option.value;
                if (option.valueTransfer) value = pause.thisActionNeedConfirmNow;
                if (option.referer) value = pause.previousMenuSector;

                optionsBlock += `<li class="pauseMenuOneList">
                                    <button id="${option.id}"
                                            class="${classes.trim()}"
                                            value="${value}">
                                        ${option.title}
                                    </button>
                                 </li>`;
            }
            classes = "";
        });

        optionsBlock += "</div></ul>";

        if (defaultContainer) container = document.querySelector(`#${defaultContainer}`);

        menuList = document.querySelector("#pauseMenuList");
        if (menuList) container.removeChild(menuList);
        container.insertAdjacentHTML("afterbegin", optionsBlock);

        setTimeout(() => {
            pauseMenuOptions = document.querySelectorAll(".pauseMenuBtn");
            this.renderPauseMenuOneOptionAddClassOn(pauseMenuOptions, pauseMenuOptions.length, 0);
            pause.needConfirmAction();
        }, 150);

        setTimeout(() => this.renderPauseMenuSideBlocksBtn("cross"), 200);

        this.renderBigPauseMenu();
    },

    renderDebugPanel(mobileMode) {
        let debugPanel = null;
        let sizeClass = "debugPanelDesktopMode";

        if (mobileMode) sizeClass = "debugPanelMobileMode";

        if (!document.querySelector("#debugPanel")) {
            this.container.insertAdjacentHTML("beforeend", templatePrinter.debugPanelTemplatePrint(this.renderDebugPanelBtnsBlock(), sizeClass));
            debugPanel = document.querySelector("#debugPanel");
            debugPanel.classList.add("debugPanelIn");
            setTimeout(() => debugPanel.classList.remove("debugPanelIn"), 500);
        } else {
            debugPanel = document.querySelector("#debugPanel");
            debugPanel.classList.add("debugPanelOut");
            setTimeout(() => this.container.removeChild(debugPanel), 480);
        }
    },

    renderDebugPanelBtnsBlock() {
        let debugElements = config.debugPanelElements;
        let debugElementsDiv = `<div id="btnsBlock">`;
        let checked = "";
        let customClass = "";

        debugElements.forEach(elem => {
            if (config.cheatsActivated.includes(elem.name)) checked = "checked";
            if (elem.customClass) customClass = elem.customClass;
            if (elem.type === "button") {
                debugElementsDiv += `<div>
                                        <input id="${elem.name}"
                                               type="button"
                                               value="${elem.name}"
                                               class="debugPanelButton btnLabel ${customClass}">
                                     </div>`;
            } else {
                debugElementsDiv += `<div>
                                        <input id="${elem.name}"
                                               name="debug"
                                               type="checkbox"
                                               value="${elem.name}"
                                               class="debugPanelButton btnInputElement"
                                               ${checked}>
                                        <label class="btnInputLabel" for="${elem.name}">
                                            ${elem.name}
                                        </label>
                                     </div>`;
            }
            checked = "";
            customClass = "";
        });
        debugElementsDiv += "</div>";

        return debugElementsDiv;
    },

    refreshDebugPanelBtnsBlock() {
        let btnsBlock = document.querySelector("#btnsBlock");
        let btnsContainer = document.querySelector("#btnsContainer");
        let btnsBlockRefreshed = false;

        if (btnsBlock) {
            btnsContainer.removeChild(btnsBlock);
            btnsContainer.insertAdjacentHTML("afterbegin", this.renderDebugPanelBtnsBlock());
            btnsBlockRefreshed = true;
        }
        return btnsBlockRefreshed;
    },

    renderCheatConsole(mobileMode) {
        let cheatConsole = null;
        let cheatInput = null;
        let sizeClass = "cheatConsoleDesktopMode";

        if (mobileMode) sizeClass = "cheatConsoleMobileMode";

        if (!document.querySelector("#cheatConsole")) {
            this.container.insertAdjacentHTML("afterbegin", templatePrinter.cheatConsoleTemplatePrint(sizeClass));
            cheatConsole = document.querySelector("#cheatConsole");
            cheatConsole.classList.add("cheatConsoleIn");
            setTimeout(() => cheatConsole.classList.remove("cheatConsoleIn"), 500);

            cheatInput = document.querySelector("#cheatInput");
            setTimeout(() => cheatInput.focus(), 10);
        } else {
            cheatConsole = document.querySelector("#cheatConsole");
            cheatConsole.classList.add("cheatConsoleOut");
            setTimeout(() => this.container.removeChild(cheatConsole), 480);
        }
    },

    renderCheatMessage(message, messageColor, cheatMessageContainer) {
        let messageElement = null;

        cheatMessageContainer.innerHTML = "";
        if (this.cheatMessageRemoveTimerId) clearTimeout(this.cheatMessageRemoveTimerId);

        cheatMessageContainer.insertAdjacentHTML("afterbegin", templatePrinter.cheatMessageTemplatePrint(message, messageColor));
        messageElement = document.querySelector("#cheatMessage");
        if (messageElement) this.cheatMessageRemoveTimerId = setTimeout(() => cheatMessageContainer.removeChild(messageElement), 3000);
    },

    renderTooltip(data, animation, mobileMode) {
        let placeForTooltip = null;
        let dataTooltip = null;
        let tooltipDiv = null;
        let tooltipKeyboardsCount = null;
        let tooltipElement = "";
        let tooltipClasses = "tooltip ";

        if (mobileMode) {
            placeForTooltip = document.querySelector("#blockForTooltipsInMobilMode");
            dataTooltip = data.tooltipMobileMode;
        } else {
            placeForTooltip = document.querySelector("table");
            dataTooltip = data.tooltip;
        }

        if (dataTooltip.keyboards) tooltipKeyboardsCount = dataTooltip.keyboards.length;

        tooltipClasses += `${config.menuColor} `;
        tooltipClasses += dataTooltip.positionClass;
        if (animation) tooltipClasses += " tooltipAnimationIn";

        tooltipElement = `<div class="${dataTooltip.allBlockStyle}">`;

        if (dataTooltip.prologue) tooltipElement += `<p class="infoLabel tooltipElementText">
                                                        ${dataTooltip.prologue}
                                                    </p>`;

        tooltipElement += `<div class="${dataTooltip.keyboardsBlockClass}">`;

        if (tooltipKeyboardsCount) {
            for (let i = 0; i < tooltipKeyboardsCount; i++) {
                tooltipElement += `<div class="tooltipElement ${dataTooltip.tooltipBlockClass}">
                                        <div></div>`;

                if (dataTooltip.keyboards) {
                    for (let j = 0; j < dataTooltip.keyboards[i].units.length; j++) {

                        if (dataTooltip.keyboards[i].units[j].label) tooltipElement += `<div class="keyboardLabelDiv">
                                                                                            <p class="keyboardLabel">
                                                                                                ${dataTooltip.keyboards[i].units[j].label}
                                                                                            </p>`;

                        tooltipElement += `<img src="${dataTooltip.keyboards[i].units[j].src}"
                                                alt="${dataTooltip.keyboards[i].units[j].alt}"
                                                class="${dataTooltip.imageClass}">`;

                        if (dataTooltip.keyboards[i].units[j].label) tooltipElement += "</div>";

                        if (!j) tooltipElement += "<div></div>";
                    }
                }

                tooltipElement += "</div>";
                if (tooltipKeyboardsCount > 1 && i + 1 < tooltipKeyboardsCount) tooltipElement += `<p class="infoLabel tooltipElement">
                                                                                                        или
                                                                                                   </p>`;
            }
        }

        tooltipElement += "</div>";

        tooltipElement += `<p class="infoLabel tooltipElementText">
                                ${dataTooltip.text}
                           </p>`;

        tooltipElement += "</div>";

        if (dataTooltip.additionalMessage) tooltipElement += `<p class="infoLabel tooltipAdditionalMessage">
                                                                   ${dataTooltip.additionalMessage}
                                                              </p>`;

        tooltipDiv = document.querySelector(`#${data.name}`);
        if (tooltipDiv) placeForTooltip.removeChild(tooltipDiv);
        placeForTooltip.insertAdjacentHTML("afterbegin", templatePrinter.tooltipTemplatePrint(tooltipElement, data.name, tooltipClasses.trim()));
    },

    renderBlockForTooltipsInMobilModeTemplatePrint() {
        if (!document.querySelector("#blockForTooltipsInMobilMode")) {
            this.container.insertAdjacentHTML("afterend", templatePrinter.blockForTooltipsInMobilModeTemplatePrint());
        }
    },

    hideTooltip(tooltip) {
        let tooltipDiv = document.querySelector(`#${tooltip.data.name}`);

        if (!tooltipDiv) return;
        if (tooltipDiv.classList.contains("tooltipAnimationIn")) tooltipDiv.classList.remove("tooltipAnimationIn");
        tooltipDiv.classList.add("tooltipAnimationOut");
        setTimeout(() => tooltipDiv.parentElement.removeChild(tooltipDiv), 150);
    },

    renderTooltipControlPanel(animation, toggle, changeColorCheat, pause) {
        let tooltipControlPanel = null;
        let bulb = null;
        let text = "";
        let animationClass = "";

        tooltipControlPanel = document.querySelector("#tooltipControlPanel");
        if (changeColorCheat && !tooltipControlPanel) return;

        if (tooltipControlPanel) this.body.removeChild(tooltipControlPanel);

        if (config.tips) {
            text = "выключить";
            bulb = `<i id="bulbOn" class="fas fa-lightbulb"></i>`;
        } else {
            text = "включить";
            bulb = `<i id="bulbOff" class="far fa-lightbulb"></i>`;
        }

        if (!toggle && !changeColorCheat && !pause) this.tooltipControlPanelOutTimerId = setTimeout(() => this.hideTooltipControlPanel(), 7000);

        if (animation) animationClass = "tooltipControlPanelIn";
        if (pause) {
            animationClass = "pauseElementAdd";
            if (this.tooltipControlPanelInTimerId) clearTimeout(this.tooltipControlPanelInTimerId);
            if (this.tooltipControlPanelOutTimerId) clearTimeout(this.tooltipControlPanelOutTimerId);
        }

        this.body.insertAdjacentHTML("afterbegin", templatePrinter.tooltipControlPanelTemplatePrint(text, bulb, animationClass));
    },

    hideTooltipControlPanel(pause = false) {
        let animationClass = "";

        let tooltipControlPanel = document.querySelector("#tooltipControlPanel");
        if (!tooltipControlPanel) return;

        !pause ? animationClass = "tooltipControlPanelOut" : animationClass = "pauseElementRemove";

        tooltipControlPanel.classList.remove("tooltipControlPanelIn");
        tooltipControlPanel.classList.add(animationClass);
        if (tooltipController.hideTooltipControlPanelAnimationTimerId) clearTimeout(tooltipController.hideTooltipControlPanelAnimationTimerId);
        tooltipController.hideTooltipControlPanelAnimationTimerId = setTimeout(() => this.body.removeChild(tooltipControlPanel), 180);
    }
}