import {renderer} from "./renderer.js";
import {game} from "../game.js";

export const pause = {
    animationRunningNow: false,
    activeMenuSector: null,
    thisActionNeedConfirmNow: null,
    menuStructure: [
        "mainMenuSector",
        "confirmSector"
    ],

    pauseBtnClickHandler() {
        let pauseBtn = "NumpadAdd";  // заменить клавиши

        document.addEventListener("keydown", function (event) {
            if (!game.playerCanStopGame) return;
            if (pause.animationRunningNow) return;
            if (event.code !== pauseBtn) return;
            pause.showOrHidePauseMenu();
        });
    },

    showOrHidePauseMenu() {
        if (pause.animationRunningNow) return;

        if (game.gameIsRunning) {
            game.stopGame();
            this.activeMenuSector = this.menuStructure[0];
        } else {
            game.startGameDelay(game.startGameDelaySecondsCount, true);
            this.activeMenuSector = null;
        }

        this.animationRunningNow = true;
        setTimeout(() => this.animationRunningNow = false, 200);
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
                this.activeMenuSector = this.menuStructure[1];
                this.thisActionNeedConfirmNow = btn.value;
                renderer.renderPauseMenuOptions();
            });
        });
    },

    cancelChoiceAction() {
        let cancelChoiceBtns = document.querySelectorAll(".cancelСhoice");
        if (!cancelChoiceBtns) return;
        let activeMenuSectorIndex = null;
        let activeMenuSectorIndexNew = null;

        cancelChoiceBtns.forEach(btn => {
            btn.addEventListener("click", () => {

                activeMenuSectorIndex = this.menuStructure.indexOf(this.activeMenuSector);
                activeMenuSectorIndexNew = activeMenuSectorIndex += -1;

                this.activeMenuSector = this.menuStructure[activeMenuSectorIndexNew];
                renderer.renderPauseMenuOptions("optionsContainer");
            });
        });
    },
}