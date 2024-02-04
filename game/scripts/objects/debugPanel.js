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
import {touchController} from "../controllers/touchController.js";
import {audioController} from "../controllers/audioController.js";

export const debugPanel = {
    cheats: config.cheats,
    gameControl: config.gameControl,
    debugPanelElements: config.debugPanelElements,
    debugMode: null,
    playerCanCallDebugPanel: true,

    debugModeStatusInit() {
        this.debugMode = config.debugMode;
    },

    callDebugPanelKeyDownHandler() {
        let showDebugPanelBtn = helperController.getObjectByName(this.gameControl, "showDebugPanelBtn").btns;

        document.addEventListener("keydown", function (event) {
            if (!debugPanel.playerCanCallDebugPanel) return;
            if (!showDebugPanelBtn.includes(event.code)) return;
            debugPanel.callDebugPanel();
        });
    },

    callDebugPanel() {
        if (!debugPanel.debugMode) return;
        let mobileMode = false;

        if (helperController.isMobileDeviceCheck()) mobileMode = true;
        this.playerCanCallDebugPanel = false;
        renderer.renderDebugPanel(mobileMode);
        debugPanel.clickOnDebugPanelElementBtn();
        setTimeout(() => this.playerCanCallDebugPanel = true, 500);
        mobileMode = false;
    },

    clickOnDebugPanelElementBtn() {
        let selector = "debugPanelBtn";
        let btns = document.querySelectorAll(`.${selector}`);

        btns.forEach(btn => {
            btn.addEventListener("click", function () {
                debugPanel.debugPanelElementAction(this.value);
                audioController.playSoundEffect(selector);
            });
        });
    },

    debugPanelElementAction(element) {
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
            case "touchController":
                this.objectsInfoShow(element, touchController);
                break;
            case "audioController":
                this.objectsInfoShow(element, audioController);
                break;
            case "cheatsInfo":
                cheatsController.cheatsInfoForPlayer();
                break;
            case "pause":
                this.objectsInfoShow(element, pause);
                break;
            case "clearLocalStorage":
                localStorageController.clearLocalStorage();
                console.log(helperController.getObjectByName(this.debugPanelElements, element).message);
                break;
            case "clearConsole":
                console.clear();
                break;
            case "callBoss":
            case "killBoss":
            case "playerArrowsObjects":
            case "enemyArrowsObjects":
            case "blockagesObjects":
            case "bonusesObjects":
            case "bossGetDamageInfo":
            case "toggleInfinityMode":
            case "toggleInstantStart":
                cheat = helperController.getObjectByName(this.cheats, element);
                message = cheatsController.matchPlayerInputAndCheatCode(cheat.code, cheatMessageContainer);
                console.log(message);
                break;
            case "actualParamsInfo":
                cheat = helperController.getObjectByName(this.cheats, element);
                cheatsController.matchPlayerInputAndCheatCode(cheat.code, cheatMessageContainer);
                break;
            case "background":
                this.objectsInfoShow(element, background);
                break;
            default:
                break;
        }
    },

    objectsInfoShow(elementName, showObjects, showCount = false) {
        let element = helperController.getObjectByName(this.debugPanelElements, elementName);

        showCount
            ? console.log(`${element.message} ${showObjects.length}`)
            : console.log(element.message);
        Array.isArray(showObjects)
            ? showObjects.forEach(elem => console.log(elem))
            : console.log(showObjects);
    }
}