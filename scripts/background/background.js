import {Planet} from "./celestialBodies/Planet.js";
import {Star} from "./celestialBodies/Star.js";
import {SlowStar} from "./celestialBodies/SlowStar.js";
import {Meteor} from "./celestialBodies/Meteor.js";
import {Galaxy} from "./celestialBodies/Galaxy.js";

let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let timer = null;

// возможно вынести в конфиг количество разных небесных тел и селекторы к ним
// background будет находится в отдельной папке и подключаться к index Space Shooter, так же надо подключать в game.js

let possiblePoitionsOnX = {
    "min": -200,
    "max": canvas.width + 200
}

let possiblePoitionsOnY = {
    "min": -200,
    "max": canvas.height + 200
}

// избавиться от дублирования
let planetsCount = 2;
let planetsArray = [];
for (let i = 0; i < planetsCount; i++) {
    let x = Math.floor(Math.random() * (possiblePoitionsOnX.max - possiblePoitionsOnX.min + 1)) + possiblePoitionsOnX.min;
    let y = Math.floor(Math.random() * (possiblePoitionsOnY.max - possiblePoitionsOnY.min + 1)) + possiblePoitionsOnY.min;
    planetsArray.push(new Planet(x, y, canvas.height, context, possiblePoitionsOnX));
}

let galaxiesCount = 3;
let galaxiesArray = [];
for (let i = 0; i < galaxiesCount; i++) {
    let x = Math.floor(Math.random() * ((possiblePoitionsOnX.max + 1500) - (possiblePoitionsOnX.min - 1500) + 1)) + (possiblePoitionsOnX.min - 1500);
    let y = Math.floor(Math.random() * ((possiblePoitionsOnY.max + 1500) - (possiblePoitionsOnY.min - 1500) + 1)) + (possiblePoitionsOnY.min - 1500);
    galaxiesArray.push(new Galaxy(x, y, canvas.height, context, possiblePoitionsOnX));
}

let starsCount = 40;
let starsArray = [];
for (let i = 0; i < starsCount; i++) {
    let x = Math.floor(Math.random() * (possiblePoitionsOnX.max - possiblePoitionsOnX.min + 1)) + possiblePoitionsOnX.min;
    let y = Math.floor(Math.random() * (possiblePoitionsOnY.max - possiblePoitionsOnY.min + 1)) + possiblePoitionsOnY.min;
    starsArray.push(new Star(x, y, canvas.height, context, possiblePoitionsOnX));
}

let slowStarsCount = 30;
let slowStarsArray = [];
for (let i = 0; i < slowStarsCount; i++) {
    let x = Math.floor(Math.random() * (possiblePoitionsOnX.max - possiblePoitionsOnX.min + 1)) + possiblePoitionsOnX.min;
    let y = Math.floor(Math.random() * (possiblePoitionsOnY.max - possiblePoitionsOnY.min + 1)) + possiblePoitionsOnY.min;
    slowStarsArray.push(new SlowStar(x, y, canvas.height, context, possiblePoitionsOnX));
}

let meteorsCount = 6;
let meteorsArray = [];
for (let i = 0; i < meteorsCount; i++) {
    let x = Math.floor(Math.random() * (possiblePoitionsOnX.max - possiblePoitionsOnX.min + 1)) + possiblePoitionsOnX.min;
    let y = Math.floor(Math.random() * (possiblePoitionsOnY.max - possiblePoitionsOnY.min + 1)) + possiblePoitionsOnY.min;
    meteorsArray.push(new Meteor(x, y, canvas.height, context, possiblePoitionsOnX, possiblePoitionsOnY));
}


animate();

function animate() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    galaxiesArray.forEach(galaxy => galaxy.draw());
    slowStarsArray.forEach(slowStar => slowStar.draw());
    planetsArray.forEach(planet => planet.draw());
    meteorsArray.forEach(meteor => meteor.draw());
    starsArray.forEach(star => star.draw());
    timer = setTimeout(() => requestAnimationFrame(animate), 1);
}


let toggle = 0;

function pause() {
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
    })
}

pause();