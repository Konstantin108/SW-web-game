import {progressController} from "./controllers/progressController.js";
import {blockageController} from "./controllers/blockageController.js";
import {bonusController} from "./controllers/bonusController.js";
import {player} from "./objects/player.js";
import {renderer} from "./objects/renderer.js";
import {helperController} from "./controllers/helperController.js";
import {crashChecker} from "./objects/crashChecker.js";
import {arrowController} from "./controllers/arrowController.js";
import {enemyArrowController} from "./controllers/enemyArrowController.js";
import {config} from "./config/config.js";
import {boss} from "./objects/boss.js";
import {cheatsController} from "./controllers/cheatsController.js";
import {localStorageController} from "./controllers/localStorageController.js";

export const game = {
    startGameDelaySecondsCount: config.startGameDelaySecondsCount,
    gameIsRunning: false,
    playerCanStopGame: true,

    init() {
        renderer.render();
        cheatsController.callCheatConsole();
        cheatsController.inputCheat();
        localStorageController.addParamToLocalStorage();
    },

    run() {
        this.gameIsRunning = true;
        progressController.progress();
        blockageController.blockageMove(blockageController.blockagesArray);
        bonusController.bonusAppearanceListener();
        player.move();
        player.shoot();
        player.useBomb();
        player.useSuperAbility();
    },

    // добавить проверку, что игра в данный момент на паузе,
    // если этот метод вызван при выходе с паузы
    startGameDelay(delay, resumeGame = false) {
        let message = "";

        if (delay != 0) {
            message = delay;
        } else {
            message = "go";
        }
        if (delay < this.startGameDelaySecondsCount + 1 && delay >= 0) renderer.renderInCenterTableNotify(message);
        if (delay > -1) {
            setTimeout(() => {
                return this.startGameDelay(delay += -1, resumeGame);
            }, 1000);
        } else {
            if (resumeGame) {
                this.resumeGame();
            } else {
                this.run();
            }
        }
    },

    showPauseMenu() {
        let pauseBtnsArray = [
            "Escape",
            "Pause"
        ];

        document.addEventListener("keydown", function (event) {
            if (!game.gameIsRunning) return;
            if (!game.playerCanStopGame) return;
            if (pauseBtnsArray.includes(event.code)) game.paused();
        });
    },

    paused() {
        let text = "Игра остановлена! Хотите продолжить?\n\"ОК\" - продолжить играть\n\"Отмена\" - закончить игру";

        if (this.gameIsRunning) this.stopGame();
        if (confirm(text)) {
            this.startGameDelay(this.startGameDelaySecondsCount, true);
        } else {
            this.quitConfirm();
        }
    },

    stopGame() {
        this.gameIsRunning = false;
        bonusController.bonusAppearanceListenerTimerIdRemove();
        bonusController.allNewPropertiesForPlayerOffCallCancel();
        helperController.removeAllTimers(blockageController.blockageTimerIdsArray);
        crashChecker.invincibilityOffCallCancel();
        boss.makeStepOff();
        boss.removeShieldTimerId();
    },

    resumeGame() {
        this.gameIsRunning = true;
        blockageController.blockageMove(blockageController.blockagesArray);
        bonusController.bonusAppearanceListener();
        bonusController.resumeGameMakeStepOffCall();
        arrowController.arrowMove();
        enemyArrowController.enemyArrowMove();
        crashChecker.invincibilityOffCall(player.timeInInvincibilityOff * 1000);
        boss.makeStep();
        boss.setShieldTimerIdOnResumeGame();
        player.offBonusCall();
    },

    quitConfirm() {
        let text = "Вы уверены, что хотите закончить игру?";

        if (confirm(text)) {
            alert(this.quit());
        } else {
            this.paused();
        }
    },

    quit() {
        return `Игра окончена! Достигнут уровень: ${progressController.level}\nКораблей уничтожено: ${progressController.shipDestroyer}, Набранное количество очков: ${progressController.score}`;
    },

    over(win = false) {
        let message = "";

        this.stopGame();
        if (win) {
            message = "you win";
        } else {
            message = "you lose";
        }
        renderer.renderInCenterTableNotify(message);
        setTimeout(() => alert(this.quit()), 1100);
    }
}

game.init();
game.startGameDelay(game.startGameDelaySecondsCount + 1);
game.showPauseMenu();