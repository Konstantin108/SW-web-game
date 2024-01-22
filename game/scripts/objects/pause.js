import {renderer} from "./renderer.js";
import {game} from "../game.js";
import {progressController} from "../controllers/progressController.js";
import {config} from "../config/config.js";
import {helperController} from "../controllers/helperController.js";
import {audioController} from "../controllers/audioController.js";

export const pause = {
    menuStructure: config.pauseMenuStructure,
    gameControl: config.gameControl,
    domain: config.domain,
    protocol: config.protocol,
    animationIsRunningNow: false,
    activeMenuSector: null,
    previousMenuSector: null,
    thisActionNeedConfirmNow: null,

    pauseBtnKeyDownHandler() {
        let pauseBtnsArray = helperController.getObjectByName(this.gameControl, "pauseBtnsArray").btns;

        document.addEventListener("keydown", function (event) {
            if (pause.animationIsRunningNow) return;
            if (game.gameOver) return;
            if (!pauseBtnsArray.includes(event.code)) return;
            pause.activeMenuSector = pause.menuStructure[0];
            pause.showOrHidePauseMenu();
        });
    },

    pauseBtnClickHandler() {
        let gameStopOrPlayBtnElement = document.querySelector("#gameStopOrPlayBtn");
        if (gameStopOrPlayBtnElement) gameStopOrPlayBtnElement.addEventListener("click", () => {
            if (pause.animationIsRunningNow) return;
            if (game.gameOver) return;
            pause.activeMenuSector = pause.menuStructure[0];
            pause.showOrHidePauseMenu();
        });
    },

    showOrHidePauseMenu(resumeGameForce = false) {
        if (pause.animationIsRunningNow) return;

        let delay = 1500;
        let gameIsRunningNow = null;
        let soundEffectKey = "";

        if (!resumeGameForce) {
            if (!game.playerCanStopGame) return;
            delay = 200;
        }

        if (game.gameIsRunning) {
            game.stopGame();
            gameIsRunningNow = false;
            soundEffectKey = "pauseShowMenu";
        } else {
            game.startGameDelay(game.startGameDelaySecondsCount, true);
            this.activeMenuSector = null;
            gameIsRunningNow = true;
            soundEffectKey = "pauseHideMenu";
        }

        this.animationIsRunningNow = true;
        setTimeout(() => this.animationIsRunningNow = false, delay);
        audioController.playSoundEffect(soundEffectKey);
        renderer.renderPauseMenu();
        renderer.renderGameStopOrPlayBtnTemplatePrint(false, gameIsRunningNow);
    },

    continueGameAction() {
        let continueGameBtns = document.querySelectorAll(".continueGame");
        if (!continueGameBtns) return;

        continueGameBtns.forEach(btn => {
            btn.addEventListener("click", () => pause.showOrHidePauseMenu());
        });
    },

    needConfirmAction() {
        let selector = "needConfirm";
        let needConfirmBtns = document.querySelectorAll(`.${selector}`);
        if (!needConfirmBtns) return;

        needConfirmBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                this.previousMenuSector = this.activeMenuSector;
                this.activeMenuSector = this.menuStructure[2];
                this.thisActionNeedConfirmNow = btn.value;
                renderer.renderPauseMenuOptions();
                audioController.playSoundEffect(selector);
            });
        });
    },

    confirmChoiceAction() {
        let selector = "confirmChoice";
        let confirmChoiceBtn = document.querySelector(`#${selector}`);

        if (confirmChoiceBtn) confirmChoiceBtn.addEventListener("click", () => {
            setTimeout(() => document.location.href = this.protocol + this.domain + confirmChoiceBtn.value, 200);
            audioController.playSoundEffect(selector);
        });
    },

    cancelChoiceAction() {
        let selector = "cancelChoice";
        let cancelChoiceBtns = document.querySelectorAll(`.${selector}`);
        if (!cancelChoiceBtns) return;
        let previousMenuSectorIndex = null;

        cancelChoiceBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                previousMenuSectorIndex = this.menuStructure.indexOf(String(btn.value));
                this.activeMenuSector = this.menuStructure[previousMenuSectorIndex];
                renderer.renderPauseMenuOptions("optionsContainer");
                audioController.playSoundEffect(selector);
            });
        });
    },

    showStatistics() {
        this.activeMenuSector = this.menuStructure[1];
        this.showOrHidePauseMenu();
    },

    getStatisticsData() {
        return [
            {
                "name": "достигнут уровень",
                "data": progressController.level
            },
            {
                "name": "противников уничтожено",
                "data": progressController.shipDestroyed
            },
            {
                "name": "босс уровня уничтожен",
                "data": progressController.bossDestroyed
            },
            {
                "name": "очков набрано",
                "data": progressController.score
            }
        ];
    }
}