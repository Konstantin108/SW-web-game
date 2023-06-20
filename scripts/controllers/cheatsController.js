import {renderer} from "../objects/renderer.js";
import {config} from "../config/config.js";
import {localStorageController} from "./localStorageController.js";
import {player} from "../objects/player.js";
import {crashChecker} from "../objects/crashChecker.js";
import {helperController} from "./helperController.js";

export const cheatsController = {
    cheats: config.cheats,
    cheatsInfinityActiveMode: "cheatsInfinityActiveMode",
    inputElement: null,

    callCheatConsole() {
        let showCheatConsoleBtn = "Backquote";
        let playerCanCallCheatConsole = true;

        document.addEventListener("keydown", function (event) {
            if (!playerCanCallCheatConsole) return;
            if (showCheatConsoleBtn === event.code) {
                playerCanCallCheatConsole = false;
                renderer.renderCheatConsole();
                setTimeout(() => playerCanCallCheatConsole = true, 500);
                cheatsController.inputElement = null;
            }
        });
    },

    // вешать слушатель события на Enter по событию focused на input,
    // focused на input вешать при нажатии ~
    inputCheat() {
        let inputCheatBtns = [
            "Enter",
            "NumpadEnter"
        ];
        let isPressBtn = false;

        document.body.addEventListener("click", function (event) {
            if (event.target.id !== "cheatInput") return;
            if (cheatsController.inputElement) return;
            cheatsController.inputElement = event.target;
            let cheatMessageContainer = cheatsController.inputElement.closest("#cheatConsole").querySelector("#cheatMessageContainer");
            cheatsController.inputElement.addEventListener("keydown", function (event) {
                if (isPressBtn) return;
                if (inputCheatBtns.includes(event.code)) {
                    if (cheatsController.inputElement.value) {
                        cheatsController.matchPlayerInputAndCheatCode(cheatsController.inputElement.value.trim(), cheatMessageContainer);
                        cheatsController.inputElement.value = "";
                    }
                    isPressBtn = true;
                }
            });
            cheatsController.inputElement.addEventListener("keyup", function (event) {
                if (inputCheatBtns.includes(event.code)) isPressBtn = false;
            });
        });
    },

    matchPlayerInputAndCheatCode(input, cheatMessageContainer) {
        let message = "incorrect";
        let messageColor = "cheatMessageRed";
        let enteredCombination = input;
        let activatedCheat = null;
        let activatedCheatParam = null;
        let paramName = null;
        let removeNoteFromGameConfig = false;

        let compoundCode = input.split(":");
        if (compoundCode.length > 1) enteredCombination = compoundCode[0];

        let matchCheatObject = this.cheats.find((cheat) => cheat.code === enteredCombination);

        if (matchCheatObject) {
            switch (matchCheatObject.type) {
                case "optionsCheat":
                    if (matchCheatObject.options.includes(compoundCode[1])) {
                        activatedCheat = matchCheatObject;
                        activatedCheatParam = compoundCode[1];
                        message = `${activatedCheat.message} ${activatedCheatParam}`;
                    }
                    break;
                case "simpleCheat":
                    activatedCheat = matchCheatObject;
                    message = activatedCheat.message;
                    break;
                case "arbitaryValueCheat":
                    let count = Number(compoundCode[1]);
                    if (Number.isInteger(count) && count > 0) {
                        activatedCheat = matchCheatObject;
                        count <= activatedCheat.limit ? activatedCheatParam = count : activatedCheatParam = activatedCheat.limit;
                        message = `${activatedCheat.message} ${activatedCheatParam}`;
                    }
                    break;
                case "toggleCheat":
                    activatedCheat = matchCheatObject;
                    if (!config[activatedCheat.paramName]) {
                        activatedCheatParam = activatedCheat.toggleMessages[0];
                    } else {
                        activatedCheatParam = activatedCheat.toggleMessages[1];
                        removeNoteFromGameConfig = true;
                    }
                    message = `${activatedCheat.message} ${activatedCheatParam}`;
                    break;
                default:
                    break;
            }

            paramName = matchCheatObject.paramName;

            this.editCheatNamesArrayInGameConfig(removeNoteFromGameConfig, matchCheatObject);

            if (localStorageController.cheatsInfinityModeIsActive(this.cheatsInfinityActiveMode)) this.updateCheatNamesArrayInLocalStorageAfterCheatOn();
        }
        if (activatedCheat) messageColor = "cheatMessageGreen";
        renderer.renderCheatMessage(message, messageColor, cheatMessageContainer)
        this.activateCheat(activatedCheat, activatedCheatParam, paramName);
    },

    activateCheat(activatedCheat, activatedCheatParam = null, paramName = null) {
        if (!activatedCheat) return;

        switch (activatedCheat.code) {
            case "infinitum":
                this.toggleInfinityActiveMode(paramName, activatedCheatParam)
                break;
            case "invulnerability":
                this.toggleInvincibility(paramName, activatedCheatParam)
                break;
            case "lux":
                this.colorChange(paramName, activatedCheatParam);
                break;
            case "aspirin":
                this.restoreLives(paramName);
                break;
            case "adderevitam":
                this.addLives(paramName, activatedCheatParam);
                break;
            default:
                break;
        }
        console.log(localStorage);  // отладка
        console.log(config);
    },

    editCheatNamesArrayInGameConfig(remove, cheat) {
        if (!remove) {
            if (cheat.addNoteToGameConfig) this.addCheatNameToGameConfig(cheat.name);
        } else {
            this.removeCheatNameFromGameConfig(cheat.name);
            this.updateCheatNamesArrayInLocalStorageAfterCheatOff();
        }
    },

    addCheatNameToGameConfig(cheat) {
        helperController.addItemToArray(config.cheatsActivated, cheat);
    },

    removeCheatNameFromGameConfig(cheat) {
        config.cheatsActivated = helperController.removeItemFromArray(config.cheatsActivated, cheat);
    },

    updateCheatNamesArrayInLocalStorageAfterCheatOff() {
        if (!localStorageController.cheatsInfinityModeIsActive(this.cheatsInfinityActiveMode)) return;
        if (!localStorage.cheatsActivated) return;
        localStorageController.setParamToLocalStorage("cheatsActivated", config.cheatsActivated, false);
    },

    updateCheatNamesArrayInLocalStorageAfterCheatOn() {
        let activatedCheatNamesInLocalStorage = [];

        if (localStorage.cheatsActivated) {
            localStorageController.getParamFromLocalStorage("cheatsActivated").split(",").forEach(cheatName => helperController.addItemToArray(activatedCheatNamesInLocalStorage, cheatName));
        }
        config.cheatsActivated.forEach(cheatName => helperController.addItemToArray(activatedCheatNamesInLocalStorage, cheatName));
        localStorageController.setParamToLocalStorage("cheatsActivated", activatedCheatNamesInLocalStorage, false);
    },

    toggleInfinityActiveMode(paramName, toggle) {
        if (toggle === "on") {
            localStorageController.setParamToLocalStorage(paramName, toggle);

            this.updateCheatNamesArrayInLocalStorageAfterCheatOn();

            let cheatsArray = [];
            config.cheatsActivated.forEach(cheatName => {
                cheatsArray.push(config.cheats.find(elem => elem.name === cheatName));
            });
            cheatsArray.forEach(item => localStorageController.setParamToLocalStorage(item.paramName, config[item.paramName]));
        } else {
            toggle = false;
            localStorageController.removeParamFromLocalStorage(paramName, toggle);
            localStorageController.clearLocalStorage();
        }
    },

    toggleInvincibility(paramName, toggle) {
        if (toggle === "on") {
            config[paramName] = true;
            if (localStorageController.cheatsInfinityModeIsActive(this.cheatsInfinityActiveMode)) {
                localStorageController.setParamToLocalStorage(paramName, toggle);
            }
            player[paramName] = config[paramName];
            crashChecker.invincibilityOffCallCancel();
            renderer.renderPlayer();
        } else {
            toggle = false;
            if (localStorageController.cheatsInfinityModeIsActive(this.cheatsInfinityActiveMode)) {
                localStorageController.removeParamFromLocalStorage(paramName, toggle);
            }
            crashChecker.invincibilityOff();
        }
    },

    colorChange(paramName, color) {
        if (localStorageController.cheatsInfinityModeIsActive(this.cheatsInfinityActiveMode)) {
            localStorageController.setParamToLocalStorage(paramName, color);
        } else {
            config[paramName] = color;
        }
        renderer.renderStatusBar();
        renderer.renderSuperAbilityBar();
    },

    restoreLives(paramName) {
        player[paramName] = config[paramName];
        renderer.renderStatusBar();
    },

    addLives(paramName, livesCount) {
        if (localStorageController.cheatsInfinityModeIsActive(this.cheatsInfinityActiveMode)) {
            localStorageController.setParamToLocalStorage(paramName, livesCount);
        } else {
            config[paramName] = livesCount;
        }
        player[paramName] = config[paramName];
        renderer.renderStatusBar();
    }
}