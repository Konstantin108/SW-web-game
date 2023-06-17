import {config} from "../config/config.js";

export const localStorageController = {

    addParamToLocalStorage() {
        if (!localStorage.cheatsInfinityActiveMode) localStorage.setItem("cheatsInfinityActiveMode", "off");
    },

    setLocalStorageParamsToGameConfig() {
        return localStorage.cheatsInfinityActiveMode;
    },

    changeLocalStorageParamsInGameConfig(toggle) {
        localStorage.setItem("cheatsInfinityActiveMode", toggle);
        config.cheatsInfinityActiveMode = toggle;
    }

    // при запуске игры все изменения в localStorage записывать в config
    // в перемнную localStoragesProperties,
    // отдельным методом выводить localStoragesProperties,
    // добавить чит для удаления всех или выбранного значения из localStorage
}