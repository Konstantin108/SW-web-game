import {Tooltip} from "../classes/Tooltip.js";
import {config} from "../config/config.js";
import {renderer} from "../objects/renderer.js";
import {game} from "../game.js";
import {helperController} from "./helperController.js";
import {localStorageController} from "./localStorageController.js";
import {audioController} from "./audioController.js";

export const tooltipController = {
    gameControl: config.gameControl,
    tooltipControlPanelShowDelaySeconds: config.tooltipControlPanelShowDelaySeconds,
    possibleDirectionsShowDelaySeconds: config.possibleDirectionsShowDelaySeconds,
    shootBtnsArrayShowDelaySeconds: config.shootBtnsArrayShowDelaySeconds,
    pauseBtnsArrayShowDelaySeconds: config.pauseBtnsArrayShowDelaySeconds,
    tooltipsArray: [],
    tooltipCreateTimerIdsArray: [],
    tooltipDestroyTimerIdsArray: [],
    hideTooltipControlPanelAnimationTimerId: null,

    tooltipCreateAndDestroy(gameControlObject) {
        if (!config.tips && !gameControlObject.canShowWhenTipsIsOff) return;
        let tooltip = new Tooltip(gameControlObject);

        this.tooltipsArray.push(tooltip);
        tooltip.show(true);
        if (game.gameIsRunning || gameControlObject.canShowAgain) {
            this.tooltipDestroyTimerIdsArray.push(setTimeout(() => tooltip.destroy(), 7800));
        }
    },

    showMainGameControlTooltips(startGame = false) {
        let possibleDirectionsGameControlObject = helperController.getObjectByName(this.gameControl, "possibleDirections");
        let shootBtnsArrayGameControlObject = helperController.getObjectByName(this.gameControl, "shootBtnsArray");
        let pauseBtnsArrayGameControlObject = helperController.getObjectByName(this.gameControl, "pauseBtnsArray");

        if (startGame) {
            renderer.tooltipControlPanelInTimerId = setTimeout(() => {
                tooltipController.tooltipOnOrOff(true, false, false);
            }, this.tooltipControlPanelShowDelaySeconds);
        }

        this.tooltipCreateTimerIdsArray.push(setTimeout(() => {
            tooltipController.tooltipCreateAndDestroy(possibleDirectionsGameControlObject);
        }, this.possibleDirectionsShowDelaySeconds));
        this.tooltipCreateTimerIdsArray.push(setTimeout(() => {
            tooltipController.tooltipCreateAndDestroy(shootBtnsArrayGameControlObject);
        }, this.shootBtnsArrayShowDelaySeconds));
        this.tooltipCreateTimerIdsArray.push(setTimeout(() => {
            tooltipController.tooltipCreateAndDestroy(pauseBtnsArrayGameControlObject);
        }, this.pauseBtnsArrayShowDelaySeconds));
    },

    tooltipControlPanelClickHandler() {
        let tooltipControlPanelBtn = document.querySelector("#tooltipControlPanelBtn");
        if (!tooltipControlPanelBtn) return;

        tooltipControlPanelBtn.addEventListener("click", () => {
            this.tooltipOnOrOff(false, true, false);
            audioController.playSoundEffect("roundBtn");
        });
    },

    tooltipControlPanelMouseEnterHandler() {
        if (!game.gameIsRunning) return;

        let tooltipControlPanelBtn = document.querySelector("#tooltipControlPanelBtn");
        if (!tooltipControlPanelBtn) return;

        tooltipControlPanelBtn.addEventListener("mouseenter", () => {
            if (renderer.tooltipControlPanelOutTimerId && !helperController.isMobileDeviceCheck()) {
                clearTimeout(renderer.tooltipControlPanelOutTimerId);
            }
        });
        tooltipControlPanelBtn.addEventListener("mouseleave", () => {
            if (!helperController.isMobileDeviceCheck()) {
                renderer.tooltipControlPanelOutTimerId = setTimeout(() => renderer.hideTooltipControlPanel(), 3000);
            }
        });
    },

    destroyAllTooltipsOnResumGame() {
        if (!this.tooltipsArray) return;
        let delay = 2000;

        this.tooltipsArray.forEach(tooltip => {
            this.tooltipDestroyTimerIdsArray.push(setTimeout(() => tooltip.destroy(), delay));
            delay += 2000;
        });
    },

    tooltipOnOrOff(animation, toggle, changeColorCheat, pause = false) {
        if (game.gameOver) return;
        if (game.gameIsRunning && !config.tips && !toggle) return;

        if (toggle) {
            helperController.getPropByNameAndReset(config, "tip_");
            this.tooltipsArray.forEach(tooltip => tooltip.destroy());
            if (config.tips) {
                helperController.removeAllTimeoutTimers(this.tooltipCreateTimerIdsArray);
                helperController.removeAllTimeoutTimers(this.tooltipDestroyTimerIdsArray);
                game.localStorageAvailable
                    ? localStorageController.setParamToLocalStorage("tips", false)
                    : config.tips = false;
            } else {
                if (game.gameIsRunning) this.showMainGameControlTooltips();
                game.localStorageAvailable
                    ? localStorageController.removeParamFromLocalStorage("tips", true)
                    : config.tips = true;
            }
        }

        renderer.renderTooltipControlPanel(animation, toggle, changeColorCheat, pause);
        this.tooltipControlPanelClickHandler();
        setTimeout(() => this.tooltipControlPanelMouseEnterHandler(), 100);
    }
};