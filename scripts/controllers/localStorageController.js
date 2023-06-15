export const localStorageController = {

    addParamToLocalStorage() {
        if (!localStorage.cheatsInfinityActiveMode) localStorage.setItem("cheatsInfinityActiveMode", "off");
    },

    setLocalStorageParamsToGameConfig() {
        return localStorage.cheatsInfinityActiveMode;
    }

    // дописать здесь методы, которые будут записывать значения читов в localStorage,
    // извлекать при запуске игры и записывать в config
}