import {config} from "../config/config.js";
import {renderer} from "./renderer.js";
import {player} from "./player.js";
import {boss} from "./boss.js";
import {cheatsController} from "../controllers/cheatsController.js";
import {helperController} from "../controllers/helperController.js";
import {game} from "../game.js";
import {progressController} from "../controllers/progressController.js";
import {pause} from "./pause.js";
import {background} from "../background/background.js";
import {tooltipController} from "../controllers/tooltipController.js";
import {localStorageController} from "../controllers/localStorageController.js";

export const debugPanel = {
    cheats: config.cheats,
    gameControl: config.gameControl,
    debugMode: null,

    debugModeStatusInit() {
        this.debugMode = config.debugMode;
    },

    callDebugPanel() {
        let showDebugPanelBtn = helperController.getObjectByName(this.gameControl, "showDebugPanelBtn").btns;
        let playerCanCallDebugPanel = true;
        let mobileMode = false;

        document.addEventListener("keydown", function (event) {
            if (!debugPanel.debugMode) return;
            if (!playerCanCallDebugPanel) return;
            if (!showDebugPanelBtn.includes(event.code)) return;
            if (navigator.userAgent.toLowerCase().match(/mobile/i)) mobileMode = true;
            playerCanCallDebugPanel = false;
            renderer.renderDebugPanel(mobileMode);
            debugPanel.clickOnDebugPanelElementBtn();
            setTimeout(() => playerCanCallDebugPanel = true, 500);
            mobileMode = false;
        });
    },

    clickOnDebugPanelElementBtn() {
        let btns = document.querySelectorAll(".debugPanelButton");

        btns.forEach(btn => {
            btn.addEventListener("click", function () {
                debugPanel.showDebugPanelElementInfo(this.value);
            });
        });
    },

    showDebugPanelElementInfo(element) {
        let cheatMessageContainer = document.querySelector("#cheatMessageContainer");
        let cheat = null;
        let message = null;

        switch (element) {
            case "localStorage":
                this.objectsInfoShow(element, localStorage);
                break;
            case "config":
                this.objectsInfoShow(element, config);
                break;
            case "boss":
                this.objectsInfoShow(element, boss);
                break;
            case "player":
                this.objectsInfoShow(element, player);
                break;
            case "game":
                this.objectsInfoShow(element, game);
                break;
            case "cheatsController":
                this.objectsInfoShow(element, cheatsController);
                break;
            case "progressController":
                this.objectsInfoShow(element, progressController);
                break;
            case "tooltipController":
                this.objectsInfoShow(element, tooltipController);
                break;
            case "background":
                this.objectsInfoShow(element, background);
                break;
            case "pause":
                this.objectsInfoShow(element, pause);
                break;
            case "cheatsInfo":
                cheatsController.cheatsInfoForPlayer();
                break;
            case "clearLocalStorage":
                localStorageController.clearLocalStorage();
                console.log(helperController.getObjectByName(config.debugPanelElements, element).message);
                break;
            case "clearConsole":
                console.clear();
                break;
            case "callBoss":
            case "killBoss":
            case "toggleInfinityMode":
            case "toggleInstantStart":
            case "playerArrowsObjects":
            case "enemyArrowsObjects":
            case "blockagesObjects":
            case "bonusesObjects":
            case "bossGetDamageInfo":
                cheat = helperController.getObjectByName(this.cheats, element);
                message = cheatsController.matchPlayerInputAndCheatCode(cheat.code, cheatMessageContainer);
                console.log(message);
                break;
            case "actualParamsInfo":
                cheat = helperController.getObjectByName(this.cheats, element);
                cheatsController.matchPlayerInputAndCheatCode(cheat.code, cheatMessageContainer);
                break;
            default:
                break;
        }
    },

    objectsInfoShow(elementName, showObjects, showCount = false) {
        let element = helperController.getObjectByName(config.debugPanelElements, elementName);

        if (showCount) {
            console.log(`${element.message} ${showObjects.length}`);
        } else {
            console.log(element.message);
        }

        if (Array.isArray(showObjects)) {
            showObjects.forEach(elem => console.log(elem));
        } else {
            console.log(showObjects);
        }
    }
}