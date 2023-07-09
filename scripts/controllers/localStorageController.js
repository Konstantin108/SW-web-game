import {config} from "../config/config.js";
import {player} from "../objects/player.js";
import {helperController} from "./helperController.js";
import {cheatsController} from "./cheatsController.js";

export const localStorageController = {
    bonusNamesFromLocalStorage: [],

    setLocalStorageParamsToGameConfig(param = null) {
        let notUsedLocalStorageParams = [
            "length",
            "clear",
            "getItem",
            "key",
            "removeItem",
            "setItem"
        ];

        if (param) {
            this.dataProcessingFromLocalStorage(param);
            return;
        }
        for (let key in localStorage) {
            if (!notUsedLocalStorageParams.includes(key)) {
                this.dataProcessingFromLocalStorage(key, true);
                this.addLocalStorageParamNamesToGameConfig(key);
            }
        }
    },

    dataProcessingFromLocalStorage(param, playerParamsUpdate = false) {
        let localStorageParam = Number(localStorage[param]);
        let setLocalStorageParamDelay = config.startGameDelaySecondsCount * 1000 + 2100;

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

        if (helperController.getObjectByName(config.bonuses.bonusTypes, param)) {
            if (!this.bonusNamesFromLocalStorage.includes(param)) {
                setTimeout(() => {
                    cheatsController.getBonusForArbitaryTime(param, localStorage[param]);
                    cheatsController.activatedCheatsParamsDataTempArray[param] = localStorage[param];
                }, setLocalStorageParamDelay);
                this.bonusNamesFromLocalStorage.push(param);
            }
        }

        if (!playerParamsUpdate) return;
        if (player.hasOwnProperty(param)) player[param] = config[param];
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

    removeParamFromLocalStorage(param, value) {
        localStorage.removeItem(param);
        config[param] = value;
        this.removeLocalStorageParamNamesFromGameConfig(param);
    },

    clearLocalStorage() {
        localStorage.clear();
    },

    getParamFromLocalStorage(param) {
        return localStorage.getItem(param);
    },

    checkParamInLocalStorage(param) {
        return localStorage[param];
    }
}