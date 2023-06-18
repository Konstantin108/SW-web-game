import {renderer} from "../objects/renderer.js";
import {config} from "../config/config.js";
import {localStorageController} from "./localStorageController.js";

export const cheatsController = {
    cheats: config.cheats,
    inputElement: null,

    // добавить функицю проверки включен ли режим бесконечного чита в config
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
        let paramNameForLocalStorage = null;

        let compoundCode = input.split(":");
        if (compoundCode.length > 1) {
            enteredCombination = compoundCode[0];
        }

        let matchCheatObject = this.cheats.find((cheat) => cheat.code === enteredCombination);
        if (matchCheatObject) {
            if (matchCheatObject.compound && !matchCheatObject.arbitaryValue) {
                if (matchCheatObject.options.includes(compoundCode[1])) {
                    activatedCheat = matchCheatObject;
                    activatedCheatParam = compoundCode[1];
                    message = `${activatedCheat.message} ${activatedCheatParam}`;
                }
            }
            if (!matchCheatObject.compound && !matchCheatObject.arbitaryValue) {
                activatedCheat = matchCheatObject;
                message = activatedCheat.message;
            }
            if (matchCheatObject.compound && matchCheatObject.arbitaryValue) {
                let count = Number(compoundCode[1]);
                if (Number.isInteger(count)) {
                    activatedCheat = matchCheatObject;
                    count <= activatedCheat.limit ? activatedCheatParam = count : activatedCheatParam = activatedCheat.limit;
                    message = `${activatedCheat.message} ${activatedCheatParam}`;
                }
            }
            if (matchCheatObject.toggle) {
                activatedCheat = matchCheatObject;
                if (config.cheatsInfinityActiveMode !== activatedCheat.toggleMessages[0]) {
                    activatedCheatParam = activatedCheat.toggleMessages[0];
                } else {
                    activatedCheatParam = activatedCheat.toggleMessages[1];
                }
                paramNameForLocalStorage = activatedCheat.paramNameForLocalStorage;
                message = `${activatedCheat.message} ${activatedCheatParam}`;
            }
        }
        if (activatedCheat) messageColor = "cheatMessageGreen";
        renderer.renderCheatMessage(message, messageColor, cheatMessageContainer)
        this.activateCheat(activatedCheat, activatedCheatParam, paramNameForLocalStorage);
    },

    activateCheat(activatedCheat, activatedCheatParam = null, paramNameForLocalStorage = null) {
        if (!activatedCheat) return;

        // доработать запуск различных читов
        switch (activatedCheat.code) {
            case "infinitum":
                localStorageController.setParamsToLocalStorage(paramNameForLocalStorage, activatedCheatParam);
                break;
            case "lux":
                this.colorChange(activatedCheatParam);
                break;
            case "testsich":
                this.testSimpleCheat();
                break;
            case "adderevitam":
                this.addLifes(activatedCheatParam);
                break;
            default:
                break;
        }
    },

    // доработать сброс установленного цвета
    colorChange(color) {
        config.menuColor = color;
        renderer.renderStatusBar();
        renderer.renderSuperAbilityBar();
    },

    testSimpleCheat() {
        console.log("testSimpleCheat()");
    },

    addLifes(livesCount) {
        console.log("addLifes()");
        console.log(livesCount);
    }
}