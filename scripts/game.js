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
    startGameDelayNumber: config.startGameDelayNumber,
    gameIsRuned: false,

    init() {
        renderer.render();
    },

    run() {
        this.gameIsRuned = true;
        progressController.progress();
        blockageController.blockageMove(blockageController.blockagesArray);
        bonusController.bonusAppearanceListener();
        player.move();
        player.shoot();
        player.useBomb();
        player.useSuperAbility();
        boss.putBossBody();   // вызов босса при старте игры для отладки босса
    },

    startGameDelay(delay, resumeGame = false) {
        if (delay < this.startGameDelayNumber + 1 && delay >= 0) renderer.renderStartGameDelay(delay);
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
            if (!game.gameIsRuned) return;
            if (pauseBtnsArray.includes(event.code)) {
                game.paused();
            }
        });
    },

    paused() {
        let text = "Игра остановлена! Хотите продолжить?\n\"ОК\" - продолжить играть\n\"Отмена\" - закончить игру"

        if (this.gameIsRuned) this.stopGame();
        if (confirm(text)) {
            this.startGameDelay(this.startGameDelayNumber, true);
        } else {
            this.quitConfirm();
        }
    },

    stopGame() {
        this.gameIsRuned = false;
        bonusController.bonusAppearanceListenerTimerIdRemove();
        bonusController.allNewPropertiesForPlayerOffCallCancel();
        crashChecker.invincibilityOffCallCancel();
        helperController.removeAllTimers(blockageController.blockageTimerIdsArray);
    },

    resumeGame() {
        this.gameIsRuned = true;
        blockageController.blockageMove(blockageController.blockagesArray);
        bonusController.bonusAppearanceListener();
        bonusController.resumeGameMakeStepOffCall();
        crashChecker.invincibilityOffCall(player.timeInInvincibilityOff * 1000);
        arrowController.arrowMove();
        enemyArrowController.enemyArrowMove();
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
// game.startGameDelay(game.startGameDelayNumber + 1);
game.startGameDelay(0);   // выключен отсчет
game.showPauseMenu();