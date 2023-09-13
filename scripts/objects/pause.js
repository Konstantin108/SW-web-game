import {renderer} from "./renderer.js";
import {game} from "../game.js";

export const pause = {

    // переименовать метод
    testPause() {
        let pauseBtn = "NumpadAdd";  // заменить клавиши
        let animationIsNotRunning = true;

        document.addEventListener("keydown", function (event) {
            if (!game.gameIsRunning) return;
            if (!game.playerCanStopGame) return;
            if (!animationIsNotRunning) return;
            if (event.code !== pauseBtn) return;
            animationIsNotRunning = false;
            renderer.renderPauseMenuBackground();  // переименовать метод
            setTimeout(() => animationIsNotRunning = true, 200);
        });
    }
}