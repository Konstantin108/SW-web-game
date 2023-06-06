import {renderer} from "../objects/renderer.js";
import {config} from "../config/config.js";

export const cheatsController = {
    cheats: config.cheats,

    callCheatConsole() {
        let showCheatConsoleBtn = "Backquote";
        let playerCanCallCheatConsole = true;

        document.addEventListener("keydown", function (event) {
            if (!playerCanCallCheatConsole) return;
            if (showCheatConsoleBtn === event.code) {
                playerCanCallCheatConsole = false;
                renderer.renderCheatConsole();
                setTimeout(() => playerCanCallCheatConsole = true, 500);
            }
        });
        this.inputCheat();
    },

    inputCheat() {
        let inputCheatBtns = [
            "Enter",
            "NumpadEnter"
        ];
        let isPressBtn = false;
        let input = null;

        document.body.addEventListener("click", function (event) {
            if (event.target.id != "cheatInput") return;
            if (input) return;
            input = event.target;
            input.addEventListener("keydown", function (event) {
                if (isPressBtn) return;
                if (inputCheatBtns.includes(event.code)) {
                    if (input.value) {
                        cheatsController.matchPlayerInputAndCheatCode(input.value);
                        input.value = "";
                    }
                    isPressBtn = true;
                }
            });
            input.addEventListener("keyup", function (event) {
                if (inputCheatBtns.includes(event.code)) isPressBtn = false;
            });
        });
    },

    matchPlayerInputAndCheatCode(input) {
        let message = "incorrect";

        let activatedCheat = this.cheats.find((cheat) => cheat.code === input);
        if (activatedCheat) message = activatedCheat.message;
        // здесь вызывать render сообщения в чит-меню
        // так же добавлять активный чит в массив в конфиге
        console.log(message);
    }
}