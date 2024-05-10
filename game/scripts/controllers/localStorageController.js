import {config} from "../config/config.js";
import {player} from "../objects/player.js";
import {helperController} from "./helperController.js";
import {cheatsController} from "./cheatsController.js";
import {bonuses} from "../config/bonuses.js";
import {game} from "../game.js";
import {renderer} from "../objects/renderer.js";
import {debugPanel} from "../objects/debugPanel.js";

export const localStorageController = {
    notUsedLocalStorageParams: [
        "length",
        "clear",
        "getItem",
        "key",
        "removeItem",
        "setItem"
    ],
    bonusNamesFromLocalStorage: [],

    setLocalStorageParamsToGameConfig(param = null) {
        if (!game.localStorageAvailable) return;
        if (param) {
            this.dataProcessingFromLocalStorage(param);
            return;
        }
        for (let key in localStorage) {
            if (!this.notUsedLocalStorageParams.includes(key)) {
                this.dataProcessingFromLocalStorage(key, true);
                this.addLocalStorageParamNamesToGameConfig(key);
            }
        }
    },

    dataProcessingFromLocalStorage(param, playerParamsUpdate = false) {
        let localStorageParam = Number(localStorage[param]);
        let setLocalStorageParamsDelay = this.getStartGameDelaySecondsCount();

        if (config.hasOwnProperty(param)) {
            if (Number.isInteger(localStorageParam)) {
                config[param] = localStorageParam
            } else if (!Number.isInteger(localStorageParam) && localStorage[param] === "on" || localStorage[param] === "true") {
                config[param] = true;
            } else if (!Number.isInteger(localStorageParam) && localStorage[param] === "off" || localStorage[param] === "false") {
                config[param] = false;
            } else if (!Number.isInteger(localStorageParam) && param === "cheatsActivated") {
                localStorage[param].split(",").forEach(cheat => config.cheatsActivated.push(cheat));
            } else {
                config[param] = localStorage[param];
            }
        } else if (helperController.getObjectByName(config.bonuses.bonusTypes, param)) {
            if (!this.bonusNamesFromLocalStorage.includes(param)) {
                setTimeout(() => {
                    cheatsController.getBonusForArbitaryTime(param, localStorage[param]);
                    cheatsController.activatedCheatsParamsDataTempArray.set(param, localStorage[param]);
                }, setLocalStorageParamsDelay);
                this.bonusNamesFromLocalStorage.push(param);
            }
        } else {
            for (let key in config) {
                if (config[key] instanceof Object && config[key].hasOwnProperty(param)) config[key] = bonuses.setBonusesParams(localStorageParam);
            }
        }

        if (playerParamsUpdate && player.hasOwnProperty(param)) player[param] = config[param];
    },

    getStartGameDelaySecondsCount() {
        let startGameDelaySecondsCount = null;

        localStorage.hasOwnProperty("startGameDelaySecondsCount")
            ? startGameDelaySecondsCount = 1000
            : startGameDelaySecondsCount = config.startGameDelaySecondsCount * 1000 + 2100;
        return startGameDelaySecondsCount;
    },

    addLocalStorageParamNamesToGameConfig(param) {
        helperController.addItemToArray(config.paramsFromLocalStorage, param);
    },

    removeLocalStorageParamNamesFromGameConfig(param) {
        config.paramsFromLocalStorage = helperController.removeItemFromArray(config.paramsFromLocalStorage, param);
    },

    setParamToLocalStorage(param, value, addLocalStorageParamsToGameConfig = true) {
        localStorage.setItem(param, value);
        if (addLocalStorageParamsToGameConfig) this.setLocalStorageParamsToGameConfig(param);
    },

    removeParamFromLocalStorage(param, value = null) {
        localStorage.removeItem(param);
        if (value !== null) config[param] = value;
        this.removeLocalStorageParamNamesFromGameConfig(param);
    },

    clearLocalStorage(notRemoveParamsArray = []) {
        if (notRemoveParamsArray) {
            for (let key in localStorage) {
                if (!notRemoveParamsArray.includes(key)) localStorage.removeItem(key);
            }
        } else {
            localStorage.clear();
        }
    },

    getParamFromLocalStorage(param) {
        return localStorage.getItem(param);
    },

    checkParamInLocalStorage(param) {
        if (game.localStorageAvailable) return localStorage[param];
    },

    checkLocalStorageAvailable() {
        try {
            localStorage.setItem("check", "?");
            localStorage.removeItem("check");
            game.localStorageAvailable = true;  // true
        } catch (e) {
            game.localStorageAvailable = false;
        }
        let btnsBlockRefreshed = renderer.refreshDebugPanelBtnsBlock();
        if (btnsBlockRefreshed) debugPanel.clickOnDebugPanelElementBtn();
    },

    periodicCheckLocalStorageAvailable() {
        this.checkLocalStorageAvailable();
        setInterval(() => this.checkLocalStorageAvailable(), 1000);
    }
};