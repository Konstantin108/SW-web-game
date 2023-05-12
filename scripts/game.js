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

export const game = {
    startGameDelaySecondsCount: config.startGameDelaySecondsCount,
    gameIsRunning: false,

    init() {
        renderer.render();
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
        boss.putBossBody();  // вызов босса при старте игры для отладки босса
        boss.makeStep();
        boss.onShield("blueShield", 1);  // создание щита босса при старте игры для отладки щита
    },

    startGameDelay(delay, resumeGame = false) {
        let message = "";

        if (delay != 0) {
            message = delay;
        } else {
            message = "GO";
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
            "Pause",
            "KeyP"
        ];

        document.addEventListener("keydown", function (event) {
            if (!game.gameIsRunning) return;
            if (pauseBtnsArray.includes(event.code)) {
                game.paused();
            }
        });
    },

    paused() {
        let text = "Игра остановлена! Хотите продолжить?\n\"ОК\" - продолжить играть\n\"Отмена\" - закончить игру"

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
        let result = "";

        this.stopGame();
        if (win) {
            result = `Игра пройдена! Поздравляю!\nТвой результат: кораблей уничтожено всего: ${progressController.shipDestroyer},\nНабранное количество очков всего: ${progressController.score}`
        } else {
            result = this.quit();
        }
        alert(result);
    }
}

game.init();
// game.startGameDelay(game.startGameDelaySecondsCount + 1);
game.startGameDelay(0);  // выключен отсчет
game.showPauseMenu();