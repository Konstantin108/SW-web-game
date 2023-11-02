import {player} from "../objects/player.js";
import {game} from "../game.js";
import {explosion} from "../objects/explosion.js";
import {config} from "../config/config.js";

let hammer = new Hammer.Manager(document.querySelector("body"));
hammer.add(new Hammer.Pan());

hammer.add(new Hammer.Tap({
    event: "doubletap",
    pointers: 1,
    taps: 2,
    time: 250,
    interval: 450,
    threshold: 20,
    posThreshold: 80
}));

hammer.add(new Hammer.Tap({
    event: "tap2fingers",
    pointers: 2,
    taps: 1,
    time: 250
}));

hammer.on("doubletap", () => player.useSuperAbility());

hammer.on("tap2fingers", () => explosion.explosionCall());

let threshold = 30;
let deltaX = 0;
let deltaY = 0;

let timerId = null;

hammer.on("panstart", () => {
    if (!timerId) timerId = setInterval(() => player.shoot(), touchController.setAutoShootSpeed());
    deltaX = 0;
    deltaY = 0;
});

hammer.on("panend", () => {
    clearInterval(timerId);
    timerId = null;
});

hammer.on("panleft", (event) => {
    if (!game.gameIsRunning) return;
    if (!player.canMove) return;
    if (Math.abs(event.deltaX - deltaX) <= threshold) return;
    player.moveLeft()
    player.move();
    deltaX = event.deltaX;
    deltaY = event.deltaY;
});

hammer.on("panright", (event) => {
    if (!game.gameIsRunning) return;
    if (!player.canMove) return;
    if (Math.abs(event.deltaX - deltaX) <= threshold) return;
    player.moveRight();
    player.move();
    deltaX = event.deltaX;
    deltaY = event.deltaY;
});

hammer.on("pandown", (event) => {
    if (!game.gameIsRunning) return;
    if (!player.canMove) return;
    if (Math.abs(event.deltaY - deltaY) <= threshold) return;
    player.moveDown();
    player.move();
    deltaX = event.deltaX;
    deltaY = event.deltaY;
});

hammer.on("panup", (event) => {
    if (!game.gameIsRunning) return;
    if (!player.canMove) return;
    if (Math.abs(event.deltaY - deltaY) <= threshold) return;
    player.moveUp();
    player.move();
    deltaX = event.deltaX;
    deltaY = event.deltaY;
});

export const touchController = {
    arrowsSpeed: new Map([
        ["arrow", config.arrowAutoShootSpeed],
        ["arrow-drill", config.arrowDrillAutoShootSpeed],
        ["arrow-trinity", config.arrowTrinityAutoShootSpeed]
    ]),

    initTouch() {
        document.addEventListener("dblclick", (event) => event.preventDefault());
        document.addEventListener("mousedown", (event) => event.preventDefault());
    },

    disableTouch() {
        hammer.off("doubletap tap2fingers panstart panend panleft panright pandown panup");
        if (timerId) {
            clearInterval(timerId);
            timerId = null;
        }
    },

    autoShoot() {
        if (!timerId) return
        clearInterval(timerId);
        timerId = null;
        timerId = setInterval(() => player.shoot(), this.setAutoShootSpeed());
    },

    setAutoShootSpeed() {
        return this.arrowsSpeed.get(player.arrowType);
    }
}