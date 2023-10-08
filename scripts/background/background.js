import {Planet} from "./celestialBodies/Planet.js";
import {Star} from "./celestialBodies/Star.js";
import {SlowStar} from "./celestialBodies/SlowStar.js";
import {Meteor} from "./celestialBodies/Meteor.js";
import {Galaxy} from "./celestialBodies/Galaxy.js";
import {utilities} from "./utilities.js";
import {config} from "../config/config.js";

// background находится в отдельной папке и подключается в Space Shooter.html,
// так же надо подключать в game.js для связи с pause.js

// создать отдельный импортируемый объект для связи с game.js

// создать чит для вывода объектов canvas

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

let timer = null;


let galaxiesArray = createCelestialBody(Galaxy, config.galaxiesCount);
let planetsArray = createCelestialBody(Planet, config.planetsCount);
let slowStarsArray = createCelestialBody(SlowStar, config.slowStarsCount);
let starsArray = createCelestialBody(Star, config.starsCount);
let meteorsArray = createCelestialBody(Meteor, config.meteorsCount);

animate();


function createCelestialBody(bodyType, bodiesCount, specialValue = 0) {
    let bodiesArray = [];
    let x = null;
    let y = null;

    for (let i = 0; i < bodiesCount; i++) {
        x = utilities.getRandomPosition(possiblePoitionsOnX.max, possiblePoitionsOnX.min, specialValue);
        y = utilities.getRandomPosition(possiblePoitionsOnY.max, possiblePoitionsOnY.min, specialValue);
        bodiesArray.push(new bodyType(x, y, canvas.height, context, possiblePoitionsOnX, possiblePoitionsOnY));
    }
    return bodiesArray;
}

function animate() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    galaxiesArray.forEach(galaxy => galaxy.draw());
    slowStarsArray.forEach(slowStar => slowStar.draw());
    planetsArray.forEach(planet => planet.draw());
    starsArray.forEach(star => star.draw());
    meteorsArray.forEach(meteor => meteor.draw());

    timer = setTimeout(() => requestAnimationFrame(animate), 1);
}


let toggle = 0;

function pauseTest() {
    document.addEventListener("keydown", function (eb) {
        if (eb.code === "hjskjhdslk") {
            console.log("sd");
            if (!toggle) {
                clearTimeout(timer);
                toggle = 1;
            } else {
                animate();
                toggle = 0;
            }
        }
    });
}

pauseTest();