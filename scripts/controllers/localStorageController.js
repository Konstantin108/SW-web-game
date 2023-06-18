import {config} from "../config/config.js";

export const localStorageController = {

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
            config[param] = localStorage[param];
            this.addParamToParamsFromLocalStorage(param);
            return;
        }
        for (let key in localStorage) {
            if (!notUsedLocalStorageParams.includes(key)) {
                config[key] = localStorage[key];
                this.addParamToParamsFromLocalStorage(key);
            }
        }
    },

    addParamToParamsFromLocalStorage(param) {
        if (!config.paramsFromLocalStorage.includes(param)) {
            config.paramsFromLocalStorage.push(param);
        }
    },

    removeParamFromParamsFromLocalStorage(param) {
        config.paramsFromLocalStorage = config.paramsFromLocalStorage.filter(item => item !== param);
    },

    setParamsToLocalStorage(param, toggle) {
        if (!localStorage[param]) {
            localStorage.setItem(param, toggle);
            config[param] = toggle;
            this.setLocalStorageParamsToGameConfig(param);
        } else {
            localStorage.removeItem(param);
            config[param] = toggle;
            this.removeParamFromParamsFromLocalStorage(param);
        }
        console.log(localStorage);
        console.log(config);
    }

    // при запуске игры все изменения в localStorage записывать в config
    // в перемнную localStoragesProperties,
    // отдельным методом выводить localStoragesProperties,
    // добавить чит для удаления всех или выбранного значения из localStorage
}