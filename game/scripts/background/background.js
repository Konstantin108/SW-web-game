import {Planet} from "./celestialBodies/Planet.js";
import {Star} from "./celestialBodies/Star.js";
import {SlowStar} from "./celestialBodies/SlowStar.js";
import {Meteor} from "./celestialBodies/Meteor.js";
import {Galaxy} from "./celestialBodies/Galaxy.js";
import {config} from "../config/config.js";
import {game} from "../game.js";
import {helperController} from "../controllers/helperController.js";

let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext("2d");

export const background = {
    gameIsInitialized: false,
    timerId: null,
    galaxiesArray: null,
    planetsArray: null,
    slowStarsArray: null,
    starsArray: null,
    meteorsArray: null,
    possiblePositionsOnX: {
        "min": -200,
        "max": canvas.width + 200
    },
    possiblePositionsOnY: {
        "min": -200,
        "max": canvas.height + 200
    },

    createCelestialBody(bodyType, bodiesCount) {
        let bodiesArray = [];
        let x = null;
        let y = null;

        for (let i = 0; i < bodiesCount; i++) {
            x = helperController.getRandomInt(this.possiblePositionsOnX.max, this.possiblePositionsOnX.min);
            y = helperController.getRandomInt(this.possiblePositionsOnY.max, this.possiblePositionsOnY.min);
            bodiesArray.push(new bodyType(x, y, canvas.height, context, this.possiblePositionsOnX, this.possiblePositionsOnY));
        }
        return bodiesArray;
    },

    celestialBodiesCreateInit() {
        this.galaxiesArray = this.createCelestialBody(Galaxy, config.galaxiesCount);
        this.planetsArray = this.createCelestialBody(Planet, config.planetsCount);
        this.slowStarsArray = this.createCelestialBody(SlowStar, config.slowStarsCount);
        this.starsArray = this.createCelestialBody(Star, config.starsCount);
        this.meteorsArray = this.createCelestialBody(Meteor, config.meteorsCount);
    },

    animate() {
        // return;

        if (background.gameIsInitialized) {
            if (!game.gameIsRunning) {
                clearTimeout(background.timerId);
                return;
            }
        }

        context.fillRect(0, 0, canvas.width, canvas.height);

        background.galaxiesArray.forEach(galaxy => galaxy.draw());
        background.slowStarsArray.forEach(slowStar => slowStar.draw());
        background.planetsArray.forEach(planet => planet.draw());
        background.starsArray.forEach(star => star.draw());
        background.meteorsArray.forEach(meteor => meteor.draw());

        background.timerId = setTimeout(() => requestAnimationFrame(background.animate), 1);
    },

    canvasSizeOnWindowResizeInit() {
        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
};

background.celestialBodiesCreateInit();
background.animate();
background.canvasSizeOnWindowResizeInit();