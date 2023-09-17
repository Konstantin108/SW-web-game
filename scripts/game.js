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
import {debugPanel} from "./objects/debugPanel.js";
import {pause} from "./objects/pause.js";

export const game = {
    startGameDelaySecondsCount: config.startGameDelaySecondsCount,
    gameIsRunning: false,
    gameOver: false,
    playerCanStopGame: false,
    cooldown: false,

    init() {
        cheatsController.saveDefaultConfigParams();
        localStorageController.setLocalStorageParamsToGameConfig();
        this.startGameDelaySet();
        renderer.render();
        cheatsController.callCheatConsole();
        this.startGameDelay(this.startGameDelaySecondsCount + 1);
        this.showPauseMenu();
        pause.pauseBtnClickHandler();  // в разработке
        player.superAbilityStatusInit();
        debugPanel.debugModeStatusInit();
        debugPanel.callDebugPanel();
        if (config.production) cheatsController.cheatsInfoForPlayer();
        if (!config.debugActualParamsInfoShow) return;
        debugPanel.objectsInfoShow("actualParamsInfo", [localStorage, config]);
    },

    run() {
        this.gameIsRunning = true;
        this.playerCanStopGame = true;
        this.cooldown = false;
        progressController.progress();
        blockageController.blockageMove(blockageController.blockagesArray);
        bonusController.bonusAppearanceListener();
        player.move();
        player.shoot();
        player.useBomb();
        player.useSuperAbility();
    },

    startGameDelaySet() {
        this.startGameDelaySecondsCount = config.startGameDelaySecondsCount;
    },

    startGameDelay(delay, resumeGame = false) {
        let message = "";

        this.cooldown = true;
        delay !== 0 ? message = delay : message = "go";
        this.playerCanStopGame = false;
        if (delay < this.startGameDelaySecondsCount + 1 && delay >= 0) renderer.renderInCenterTableNotify(message);
        if (delay > -1) {
            setTimeout(() => {
                return this.startGameDelay(delay += -1, resumeGame);
            }, 1000);
        } else {
            resumeGame ? this.resumeGame() : this.run();
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
        confirm(text) ? this.startGameDelay(this.startGameDelaySecondsCount, true) : this.quitConfirm();
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
        this.cooldown = false;
        this.playerCanStopGame = true;
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

        confirm(text) ? alert(this.quit()) : this.paused();
    },

    quit() {
        return `Игра окончена! Достигнут уровень: ${progressController.level}\nКораблей уничтожено: ${progressController.shipDestroyed}, Набранное количество очков: ${progressController.score}`;
    },

    over(win = false) {
        let message = "";

        this.stopGame();
        this.gameOver = true;
        win ? message = "you win" : message = "you lose";
        renderer.renderInCenterTableNotify(message);
        setTimeout(() => alert(this.quit()), 1100);
        // доработать game over
        // новое уведомление о набранных очках
        // удалить старый вариант паузы
        // возможно сделать широкое меню паузы
    }
}

game.init();