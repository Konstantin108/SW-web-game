import {player} from "../objects/player.js";
import {game} from "../game.js";

let bodyHammer = new Hammer(document.querySelector("body"));
bodyHammer.get("pan").set({direction: Hammer.DIRECTION_ALL});

let touchPanelHammer = new Hammer(document.querySelector("#touchPanel"));
touchPanelHammer.get("pan").set({direction: Hammer.DIRECTION_ALL});

const threshold = 30;
let deltaX = 0;
let deltaY = 0;

touchPanelHammer.on("panstart", () => {
    deltaX = 0;
    deltaY = 0;
});

touchPanelHammer.on("panleft", (event) => {
    if (!game.gameIsRunning) return;
    if (!player.canMove) return;
    if (Math.abs(event.deltaX - deltaX) > threshold) {
        player.moveLeft()
        player.move();
        deltaX = event.deltaX;
        deltaY = event.deltaY;
    }
});

touchPanelHammer.on("panright", (event) => {
    if (!game.gameIsRunning) return;
    if (!player.canMove) return;
    if (Math.abs(event.deltaX - deltaX) > threshold) {
        player.moveRight();
        player.move();
        deltaX = event.deltaX;
        deltaY = event.deltaY;
    }
});

touchPanelHammer.on("pandown", (event) => {
    if (!game.gameIsRunning) return;
    if (!player.canMove) return;
    if (Math.abs(event.deltaY - deltaY) > threshold) {
        player.moveDown();
        player.move();
        deltaX = event.deltaX;
        deltaY = event.deltaY;
    }
});

touchPanelHammer.on("panup", (event) => {
    if (!game.gameIsRunning) return;
    if (!player.canMove) return;
    if (Math.abs(event.deltaY - deltaY) > threshold) {
        player.moveUp();
        player.move();
        deltaX = event.deltaX;
        deltaY = event.deltaY;
    }
});

export const touchController = {
    initTouch() {
        document.addEventListener("dblclick", (event) => event.preventDefault());
        document.addEventListener("mousedown", (event) => event.preventDefault());
    }
}