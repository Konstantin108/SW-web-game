import {player} from "../objects/player.js";
import {explosion} from "../objects/explosion.js";
import {config} from "../config/config.js";
import {game} from "../game.js";
import {cheatsController} from "./cheatsController.js";
import {debugPanel} from "../objects/debugPanel.js";

export const touchController = {
    arrowsSpeed: {
        "arrow": config.arrowAutoShootSpeed,
        "arrow-drill": config.arrowDrillAutoShootSpeed,
        "arrow-trinity": config.arrowTrinityAutoShootSpeed
    },
    hammerBody: null,
    hammerContainer: null,
    timerId: null,
    autoShootIsOnNow: false,

    hammerBodyCreate() {
        let threshold = 50;
        let deltaX = 0;
        let deltaY = 0;

        this.hammerBody = new Hammer.Manager(document.querySelector("body"));
        this.hammerBody.add(new Hammer.Pan());

        this.hammerBody.on("panstart", () => {
            this.autoShootOn();
            deltaX = 0;
            deltaY = 0;
        });

        this.hammerBody.on("panend", () => {
            this.autoShootOff();
        });

        this.hammerBody.on("panleft", event => {
            if (!game.gameIsRunning) return;
            if (!player.canMove) return;
            if (Math.abs(event.deltaX - deltaX) <= threshold) return;
            player.setDirection("left");
            player.move();
            deltaX = event.deltaX;
            deltaY = event.deltaY;
        });

        this.hammerBody.on("panright", event => {
            if (!game.gameIsRunning) return;
            if (!player.canMove) return;
            if (Math.abs(event.deltaX - deltaX) <= threshold) return;
            player.setDirection("right");
            player.move();
            deltaX = event.deltaX;
            deltaY = event.deltaY;
        });

        this.hammerBody.on("pandown", event => {
            if (!game.gameIsRunning) return;
            if (!player.canMove) return;
            if (Math.abs(event.deltaY - deltaY) <= threshold) return;
            player.setDirection("down");
            player.move();
            deltaX = event.deltaX;
            deltaY = event.deltaY;
        });

        this.hammerBody.on("panup", event => {
            if (!game.gameIsRunning) return;
            if (!player.canMove) return;
            if (Math.abs(event.deltaY - deltaY) <= threshold) return;
            player.setDirection("up");
            player.move();
            deltaX = event.deltaX;
            deltaY = event.deltaY;
        });

        this.hammerBody.add(new Hammer.Tap({
            event: "doubletap",
            pointers: 1,
            taps: 2,
            time: 150,
            interval: 250,
            threshold: 20,
            posThreshold: 80
        }));

        this.hammerBody.add(new Hammer.Tap({
            event: "tap2fingers",
            pointers: 2,
            taps: 1,
            time: 150
        }));

        this.hammerBody.add(new Hammer.Tap({
            event: "tap",
            pointers: 1,
            taps: 1,
            time: 150
        }));

        this.hammerBody.get("doubletap").recognizeWith("tap");
        this.hammerBody.get("tap").requireFailure("doubletap");

        this.hammerBody.on("tap doubletap", event => {
            if (!event.target.classList.contains("touchActionOff")) {
                event.type === "tap" ? player.shoot() : player.useSuperAbility();
            }
        });

        this.hammerBody.on("tap2fingers", () => explosion.explosionCall());
    },

    hammerContainerCreate(id = "container") {
        this.hammerContainer = new Hammer.Manager(document.querySelector(`#${id}`));
        this.hammerContainer.add(new Hammer.Swipe());

        this.hammerContainer.on("swipeleft swiperight", () => {
            if (debugPanel.playerCanCallDebugPanel) debugPanel.callDebugPanel();
        });

        this.hammerContainer.on("swipedown swipeup", () => {
            if (cheatsController.playerCanCallCheatConsole) cheatsController.callCheatConsole();
        });
    },

    init() {
        document.addEventListener("dblclick", event => event.preventDefault());
        document.addEventListener("mousedown", event => event.preventDefault());
        this.hammerBodyCreate();
        this.hammerContainerCreate();
    },

    hammerBodyTouchDisable() {
        this.hammerBody.off("panstart panend panleft panright pandown panup doubletap tap2fingers tap");
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    },

    autoShootOn(changeArrowType = false) {
        if (changeArrowType) {
            if (!this.timerId) return
            clearInterval(this.timerId);
        }
        this.timerId = setInterval(() => player.shoot(), this.arrowsSpeed[player.arrowType]);
        this.autoShootIsOnNow = true;
    },

    autoShootOff() {
        clearInterval(this.timerId);
        this.timerId = null;
        this.autoShootIsOnNow = false;
    }
};