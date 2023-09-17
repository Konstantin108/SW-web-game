import {renderer} from "./renderer.js";
import {game} from "../game.js";

export const pause = {
    animationRunningNow: false,
    activeMenuSector: null,
    previousMenuSector: null,
    thisActionNeedConfirmNow: null,
    menuStructure: [
        "mainMenuSector",
        "gameOverMenuSector",
        "confirmSector"
    ],

    pauseBtnClickHandler() {
        let pauseBtn = "NumpadAdd";  // заменить клавиши

        document.addEventListener("keydown", function (event) {
            if (pause.animationRunningNow) return;
            if (game.gameOver) return;
            if (event.code !== pauseBtn) return;
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
            this.activeMenuSector = this.menuStructure[0];
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
                console.log(btn);
                previousMenuSectorIndex = this.menuStructure.indexOf(String(btn.value));

                this.activeMenuSector = this.menuStructure[previousMenuSectorIndex];
                renderer.renderPauseMenuOptions("optionsContainer");
            });
        });
    },
}