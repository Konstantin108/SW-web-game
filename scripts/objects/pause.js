import {renderer} from "./renderer.js";
import {game} from "../game.js";
import {progressController} from "../controllers/progressController.js";
import {config} from "../config/config.js";

export const pause = {
    menuStructure: config.pauseMenuStructure,
    animationRunningNow: false,
    activeMenuSector: null,
    previousMenuSector: null,
    thisActionNeedConfirmNow: null,

    pauseBtnClickHandler() {
        let pauseBtnsArray = [
            "Escape",
            "Pause"
        ];

        document.addEventListener("keydown", function (event) {
            if (pause.animationRunningNow) return;
            if (game.gameOver) return;
            if (!pauseBtnsArray.includes(event.code)) return;
            pause.activeMenuSector = pause.menuStructure[0];
            pause.showOrHidePauseMenu();
        });
    },

    showOrHidePauseMenu(resumeGameForce = false) {
        if (pause.animationRunningNow) return;

        let delay = 1500;

        if (!resumeGameForce) {
            if (!game.playerCanStopGame) return;
            delay = 200;
        }

        if (game.gameIsRunning) {
            game.stopGame();
        } else {
            game.startGameDelay(game.startGameDelaySecondsCount, true);
            this.activeMenuSector = null;
        }

        this.animationRunningNow = true;
        setTimeout(() => this.animationRunningNow = false, delay);
        renderer.renderPauseMenu();
    },

    continueGameAction() {
        let continueGameBtns = document.querySelectorAll(".continueGame");
        if (!continueGameBtns) return;

        continueGameBtns.forEach(btn => {
            btn.addEventListener("click", () => pause.showOrHidePauseMenu());
        });
    },

    needConfirmAction() {
        let needConfirmBtns = document.querySelectorAll(".needConfirm");
        if (!needConfirmBtns) return;

        needConfirmBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                this.previousMenuSector = this.activeMenuSector;
                this.activeMenuSector = this.menuStructure[2];
                this.thisActionNeedConfirmNow = btn.value;
                renderer.renderPauseMenuOptions();
            });
        });
    },

    cancelChoiceAction() {
        let cancelChoiceBtns = document.querySelectorAll(".cancelСhoice");
        if (!cancelChoiceBtns) return;
        let previousMenuSectorIndex = null;

        cancelChoiceBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                previousMenuSectorIndex = this.menuStructure.indexOf(String(btn.value));
                this.activeMenuSector = this.menuStructure[previousMenuSectorIndex];
                renderer.renderPauseMenuOptions("optionsContainer");
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