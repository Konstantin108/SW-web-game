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
import {background} from "./background/background.js";
import {tooltipController} from "./controllers/tooltipController.js";
import {touchController} from "./controllers/touchController.js";
import {audioController} from "./controllers/audioController.js";

export const game = {
    gameLoadingSecondsCount: config.gameLoadingSecondsCount,
    startGameDelaySecondsCount: null,
    gameIsRunning: false,
    gameOver: false,
    playerCanStopGame: false,
    animationBan: false,

    init() {
        cheatsController.saveDefaultConfigParams();
        localStorageController.setLocalStorageParamsToGameConfig();
        this.startGameDelaySet();
        background.gameIsInitialized = true;
        renderer.render();
        renderer.hideLoadingScreen();
        cheatsController.callCheatConsoleKeyDownHandler();
        this.startGameDelay(this.startGameDelaySecondsCount + 1);
        pause.pauseBtnKeyDownHandler();
        player.superAbilityStatusInit();
        audioController.init(true);
        debugPanel.debugModeStatusInit();
        debugPanel.callDebugPanelKeyDownHandler();
        helperController.confirmToLeave();
        if (config.production) cheatsController.cheatsInfoForPlayer();
        if (config.debugActualParamsInfoShow) debugPanel.objectsInfoShow("actualParamsInfo", [localStorage, config]);
    },

    run() {
        this.gameIsRunning = true;
        this.animationBan = false;
        this.playerCanStopGame = true;
        background.animate();
        progressController.progress();
        blockageController.blockageMove(blockageController.blockagesArray);
        bonusController.bonusAppearanceListener();
        tooltipController.showMainGameControlTooltips(true);
        player.moveKeyDownHandler();
        player.shootKeyDownHandler();
        player.useSuperAbilityKeyDownHandler();
        player.useBombKeyDownHandler();
        audioController.mainSoundThemePaused = false;
        audioController.soundOnOrOff(true);
    },

    startGameDelaySet() {
        this.startGameDelaySecondsCount = config.startGameDelaySecondsCount;
    },

    startGameDelay(delay, resumeGame = false) {
        let message = "";
        let soundEffectKey = "";

        this.animationBan = true;
        this.playerCanStopGame = false;
        if (delay !== 0) {
            message = delay;
            soundEffectKey = "signalBeep";
        } else {
            message = "go";
            soundEffectKey = "signalStart";
        }
        if (delay < this.startGameDelaySecondsCount + 1 && delay >= 0) {
            renderer.renderInCenterTableNotify(message, 1);
            audioController.playSoundEffect(soundEffectKey);
        }
        if (delay > -1) {
            setTimeout(() => {
                return this.startGameDelay(delay += -1, resumeGame);
            }, 1000);
        } else {
            resumeGame ? this.resumeGame() : this.run();
        }
    },

    stopGame() {
        this.gameIsRunning = false;
        background.animate();
        bonusController.bonusAppearanceListenerTimerIdRemove();
        bonusController.allNewPropertiesForPlayerOffCallCancel();
        helperController.removeAllIntervalTimers(blockageController.blockageTimerIdsArray);
        helperController.removeAllTimeoutTimers(tooltipController.tooltipCreateTimerIdsArray);
        helperController.removeAllTimeoutTimers(tooltipController.tooltipDestroyTimerIdsArray);
        crashChecker.invincibilityOffCallCancel();
        boss.makeStepOff();
        boss.removeShieldTimerId();
        audioController.mainSoundThemePaused = true;
        audioController.soundOnOrOff(false);
    },

    resumeGame() {
        this.gameIsRunning = true;
        this.animationBan = false;
        this.playerCanStopGame = true;
        background.animate();
        blockageController.blockageMove(blockageController.blockagesArray);
        bonusController.bonusAppearanceListener();
        bonusController.resumeGameMakeStepOffCall();
        arrowController.arrowMove();
        enemyArrowController.enemyArrowMove();
        crashChecker.invincibilityOffCall(player.timeInInvincibilityOff * 1000);
        tooltipController.showMainGameControlTooltips();
        tooltipController.destroyAllTooltipsOnResumGame();
        boss.makeStep();
        boss.setShieldTimerIdOnResumeGame();
        player.offBonusCall();
        audioController.mainSoundThemePaused = false;
        audioController.soundOnOrOff(true);
    },

    over(win = false) {
        let message = "";
        let soundEffectKey = "";

        this.gameOver = true;
        if (win) {
            message = "you win";
            soundEffectKey = "gameWin";
        } else {
            message = "you lose";
            soundEffectKey = "gameLose";
        }
        renderer.renderInCenterTableNotify(message, 1);
        touchController.hammerBodyTouchDisable();
        audioController.playSoundEffect(soundEffectKey);
        setTimeout(() => pause.showStatistics(), 1100);
    }
}

touchController.init();
setTimeout(() => game.init(), game.gameLoadingSecondsCount);
// game.init();