import {renderer} from "./renderer.js";
import {game} from "../game.js";

export const pause = {
    animationIsNotRunning: true,
    activeMenuSector: null,
    thisActionNeedConfirmNow: null,

    pauseBtnClickHandler() {
        let pauseBtn = "NumpadAdd";  // заменить клавиши

        document.addEventListener("keydown", function (event) {
            if (!game.playerCanStopGame) return;
            if (!pause.animationIsNotRunning) return;
            if (event.code !== pauseBtn) return;
            pause.showOrHidePauseMenu();
        });
    },

    showOrHidePauseMenu() {
        this.animationIsNotRunning = true;

        if (game.gameIsRunning) {
            game.stopGame();
            this.activeMenuSector = "mainMenuSector";
        } else {
            game.startGameDelay(game.startGameDelaySecondsCount, true);
            this.activeMenuSector = null;
        }

        this.animationIsNotRunning = false;
        setTimeout(() => this.animationIsNotRunning = true, 200);
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
                this.activeMenuSector = "confirmSector";
                this.thisActionNeedConfirmNow = btn.value;
                renderer.renderPauseMenuOptions();
            });
        });
    },

    // не работает
    // попробовать сначала с одной кнопкой
    cancelChoiceAction() {
        let cancelChoiceBtns = document.querySelectorAll(".cancelСhoice");
        if (!cancelChoiceBtns) return;

        cancelChoiceBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                this.activeMenuSector = "mainSector";
                renderer.renderPauseMenuOptions("optionsContainer");
            });
        });
    },
}