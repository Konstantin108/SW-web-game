import {Planet} from "./celestialBodies/Planet.js";
import {Star} from "./celestialBodies/Star.js";
import {SlowStar} from "./celestialBodies/SlowStar.js";
import {Meteor} from "./celestialBodies/Meteor.js";
import {Galaxy} from "./celestialBodies/Galaxy.js";
import {utilities} from "./utilities.js";
import {config} from "../config/config.js";
import {game} from "../game.js";

export const background = {
    gameIsInitialized: false,
    timer: null,
    galaxiesArray: null,
    planetsArray: null,
    slowStarsArray: null,
    starsArray: null,
    meteorsArray: null,

    startOrStopCanvas() {
        animate();
    },

    celestialBodiesInit() {
        setBackgroundCelestialBodies();
    }
}

let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext("2d");

let possiblePoitionsOnX = {
    "min": -200,
    "max": canvas.width + 200
}
let possiblePoitionsOnY = {
    "min": -200,
    "max": canvas.height + 200
}


let galaxiesArray = createCelestialBody(Galaxy, config.galaxiesCount);
let planetsArray = createCelestialBody(Planet, config.planetsCount);
let slowStarsArray = createCelestialBody(SlowStar, config.slowStarsCount);
let starsArray = createCelestialBody(Star, config.starsCount);
let meteorsArray = createCelestialBody(Meteor, config.meteorsCount);

animate();


function createCelestialBody(bodyType, bodiesCount) {
    let bodiesArray = [];
    let x = null;
    let y = null;

    for (let i = 0; i < bodiesCount; i++) {
        x = utilities.getRandomValue(possiblePoitionsOnX.max, possiblePoitionsOnX.min);
        y = utilities.getRandomValue(possiblePoitionsOnY.max, possiblePoitionsOnY.min);
        bodiesArray.push(new bodyType(x, y, canvas.height, context, possiblePoitionsOnX, possiblePoitionsOnY));
    }
    return bodiesArray;
}

function animate() {
    // отключение canvas
    // return;

    if (background.gameIsInitialized) {
        if (!game.gameIsRunning) {
            clearTimeout(background.timer);
            return;
        }
    }

    context.fillRect(0, 0, canvas.width, canvas.height);

    galaxiesArray.forEach(galaxy => galaxy.draw());
    slowStarsArray.forEach(slowStar => slowStar.draw());
    planetsArray.forEach(planet => planet.draw());
    starsArray.forEach(star => star.draw());
    meteorsArray.forEach(meteor => meteor.draw());

    background.timer = setTimeout(() => requestAnimationFrame(animate), 1);
}

function setBackgroundCelestialBodies() {
    background.galaxiesArray = galaxiesArray;
    background.planetsArray = planetsArray;
    background.slowStarsArray = slowStarsArray;
    background.starsArray = starsArray;
    background.meteorsArray = meteorsArray;
}