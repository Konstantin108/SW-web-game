import {progressController} from "./controllers/progressController.js";
import {blockageController} from "./controllers/blockageController.js";
import {bonusController} from "./controllers/bonusController.js";
import {player} from "./objects/player.js";
import {renderer} from "./objects/renderer.js";
import {helperController} from "./controllers/helperController.js";
import {crashChecker} from "./objects/crashChecker.js";

export const game = {
    gameIsRuned: false,

    run() {
        this.gameIsRuned = true;
        renderer.render();
        progressController.progress();
        blockageController.blockageMove(blockageController.blockagesArray);
        bonusController.bonusAppearanceListener();
        player.move();
        player.shoot();
        player.useBomb();
        player.useSuperAbility();
    },

    showPauseMenu() {
        let quitBtn = "Escape";

        document.addEventListener("keydown", function (event) {
            if (event.code === quitBtn) {
                game.paused();
            }
        });
    },

    paused() {
        let text = "Игра остановлена! Хотите продолжить?\n\"ОК\" - продолжить играть\n\"Отмена\" - закончить игру"

        if (this.gameIsRuned) this.stopGame();
        if (confirm(text)) {
            this.resumeGame();
            // alert("Игра возобновлена, но таймеры всё еще остановлены!");
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
        bonusController.bonusAppearanceListener();
        bonusController.resumeGameMakeStepOffCall();
        crashChecker.invincibilityOffCall(player.timeInInvincibilityOff * 1000);
        blockageController.blockageMove(blockageController.blockagesArray);
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

game.run();
game.showPauseMenu();