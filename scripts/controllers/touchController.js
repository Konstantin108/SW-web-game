import {player} from "../objects/player.js";
import {explosion} from "../objects/explosion.js";
import {config} from "../config/config.js";
import {game} from "../game.js";

export const touchController = {
    arrowsSpeed: new Map([
        ["arrow", config.arrowAutoShootSpeed],
        ["arrow-drill", config.arrowDrillAutoShootSpeed],
        ["arrow-trinity", config.arrowTrinityAutoShootSpeed]
    ]),
    hammer: null,
    timerId: null,

    initTouch() {
        let threshold = 50;
        let deltaX = 0;
        let deltaY = 0;

        document.addEventListener("dblclick", (event) => event.preventDefault());
        document.addEventListener("mousedown", (event) => event.preventDefault());

        this.hammer = new Hammer.Manager(document.querySelector("body"));
        this.hammer.add(new Hammer.Pan());

        this.hammer.add(new Hammer.Tap({
            event: "doubletap",
            pointers: 1,
            taps: 2,
            time: 150,
            interval: 250,
            threshold: 20,
            posThreshold: 80
        }));

        this.hammer.add(new Hammer.Tap({
            event: "tap2fingers",
            pointers: 2,
            taps: 1,
            time: 150
        }));

        this.hammer.add(new Hammer.Tap({
            event: "tap",
            pointers: 1,
            taps: 1,
            time: 150
        }));

        this.hammer.get("doubletap").recognizeWith("tap");
        this.hammer.get("tap").requireFailure("doubletap");

        this.hammer.on("tap doubletap", (event) => {
            event.type === "doubletap" ? player.useSuperAbility() : player.shoot();
        });

        this.hammer.on("tap2fingers", () => explosion.explosionCall());

        this.hammer.on("panstart", () => {
            if (!this.timerId) this.timerId = setInterval(() => player.shoot(), touchController.setAutoShootSpeed());
            deltaX = 0;
            deltaY = 0;
        });

        this.hammer.on("panend", () => {
            clearInterval(this.timerId);
            this.timerId = null;
        });

        this.hammer.on("panleft", (event) => {
            if (!game.gameIsRunning) return;
            if (!player.canMove) return;
            if (Math.abs(event.deltaX - deltaX) <= threshold) return;
            player.setDirection("left");
            player.move();
            deltaX = event.deltaX;
            deltaY = event.deltaY;
        });

        this.hammer.on("panright", (event) => {
            if (!game.gameIsRunning) return;
            if (!player.canMove) return;
            if (Math.abs(event.deltaX - deltaX) <= threshold) return;
            player.setDirection("right");
            player.move();
            deltaX = event.deltaX;
            deltaY = event.deltaY;
        });

        this.hammer.on("pandown", (event) => {
            if (!game.gameIsRunning) return;
            if (!player.canMove) return;
            if (Math.abs(event.deltaY - deltaY) <= threshold) return;
            player.setDirection("down");
            player.move();
            deltaX = event.deltaX;
            deltaY = event.deltaY;
        });

        this.hammer.on("panup", (event) => {
            if (!game.gameIsRunning) return;
            if (!player.canMove) return;
            if (Math.abs(event.deltaY - deltaY) <= threshold) return;
            player.setDirection("up");
            player.move();
            deltaX = event.deltaX;
            deltaY = event.deltaY;
        });
    },

    disableTouch() {
        this.hammer.off("doubletap tap2fingers tap panstart panend panleft panright pandown panup");
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    },

    autoShoot() {
        if (!this.timerId) return
        clearInterval(this.timerId);
        this.timerId = setInterval(() => player.shoot(), this.setAutoShootSpeed());
    },

    setAutoShootSpeed() {
        return this.arrowsSpeed.get(player.arrowType);
    }
}