import {renderer} from "../objects/renderer.js";
import {config} from "../config/config.js";

export const cheatsController = {
    cheats: config.cheats,
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

    inputCheat() {
        let inputCheatBtns = [
            "Enter",
            "NumpadEnter"
        ];
        let isPressBtn = false;

        document.body.addEventListener("click", function (event) {

            console.log("событие по клику");

            if (event.target.id != "cheatInput") return;
            if (cheatsController.inputElement) return;
            cheatsController.inputElement = event.target;
            let cheatMessageContainer = cheatsController.inputElement.closest("#cheatConsole").querySelector("#cheatMessageContainer");
            cheatsController.inputElement.addEventListener("keydown", function (event) {
                if (isPressBtn) return;
                if (inputCheatBtns.includes(event.code)) {
                    if (cheatsController.inputElement.value) {
                        cheatsController.matchPlayerInputAndCheatCode(cheatsController.inputElement.value, cheatMessageContainer);
                        cheatsController.inputElement.value = "";
                    }
                    isPressBtn = true;
                }

                console.log("событие по нажатию  >>");

            });
            cheatsController.inputElement.addEventListener("keyup", function (event) {

                console.log("событие по отжатию  !!!");

                if (inputCheatBtns.includes(event.code)) isPressBtn = false;
            });
        });
    },

    matchPlayerInputAndCheatCode(input, cheatMessageContainer) {
        let message = "incorrect";
        let messageColor = "cheatMessageRed";

        let activatedCheat = this.cheats.find((cheat) => cheat.code === input);
        if (activatedCheat) {
            message = activatedCheat.message;
            messageColor = "cheatMessageGreen";
        }
        renderer.renderCheatMessage(message, messageColor, cheatMessageContainer)
        this.activateCheat(activatedCheat);
    },

    // если чит совпал, то применять его действие
    // использовать switch case
    activateCheat(activatedCheat) {
        if (!activatedCheat) return;
        console.log(activatedCheat)
    }
}