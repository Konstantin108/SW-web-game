import {config} from "../config/config.js";
import {renderer} from "./renderer.js";
import {player} from "./player.js";
import {boss} from "./boss.js";
import {cheatsController} from "../controllers/cheatsController.js";
import {helperController} from "../controllers/helperController.js";
import {game} from "../game.js";
import {progressController} from "../controllers/progressController.js";

export const debugPanel = {
    cheats: config.cheats,
    debugMode: null,

    debugModeStatusInit() {
        this.debugMode = config.debugMode;
    },

    callDebugPanel() {
        let showDebugPanelBtn = "Slash";
        let playerCanCallDebugPanel = true;

        document.addEventListener("keydown", function (event) {
            if (!debugPanel.debugMode) return;
            if (!playerCanCallDebugPanel) return;
            if (showDebugPanelBtn !== event.code) return;
            playerCanCallDebugPanel = false;
            renderer.renderDebugPanel();
            debugPanel.clickOnDebugPanelElementBtn();
            setTimeout(() => playerCanCallDebugPanel = true, 500);
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

        switch (element) {
            case "localStorage":
                console.log("localStorage:");
                console.log(localStorage);
                break;
            case "config":
                console.log("config:");
                console.log(config);
                break;
            case "boss":
                console.log("boss:");
                console.log(boss);
                break;
            case "player":
                console.log("player:");
                console.log(player);
                break;
            case "game":
                console.log("game:");
                console.log(game);
                break;
            case "cheatsController":
                console.log("cheatsController:");
                console.log(cheatsController);
                break;
            case "progressController":
                console.log("progressController:");
                console.log(progressController);
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
                let cheat = helperController.getObjectByName(this.cheats, element);
                cheatsController.matchPlayerInputAndCheatCode(cheat.code, cheatMessageContainer);
                break;
            default:
                break;
        }
    }
}