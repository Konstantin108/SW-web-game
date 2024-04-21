import {helperController} from "../../controllers/helperController.js";

export class Meteor {
    static #type = "meteor";
    static #imageNames = [
        "left-comet",
        "left-comet2",
        "left-comet3",
        "right-comet",
        "right-comet2",
        "right-comet3",
        "blue",
        "orange",
        "rock",
        "rock2",
        "rock3",
    ];
    static #noRotateNames = [
        "left-comet",
        "left-comet2",
        "left-comet3",
        "right-comet",
        "right-comet2",
        "right-comet3"
    ];
    static #maxSize = 60;
    static #minSize = 40;
    static #appearanceChance = 5;
    static #speedLimit = 20;

    constructor(x, y, canvasHeight, context, possiblePositionsOnX, possiblePositionsOnY) {
        this.x = x;
        this.y = y;
        this.canvasHeight = canvasHeight;
        this.context = context;
        this.degree = 0;
        this.directionInDegree = helperController.getRandomDirectionOfRotation(50);

        this.imageName = helperController.getRandomElementAndIndexInArray(Meteor.#imageNames).element;

        this.size = helperController.getRandomInt(Meteor.#minSize, Meteor.#maxSize);
        this.speed = Meteor.#speedLimit / this.size;

        this.image = new Image();
        this.image.src = `./src/images/${Meteor.#type}-${this.imageName}.png`;
        this.imageWidth = this.size;
        this.imageHeight = this.size;

        this.possiblePositionsOnXMin = possiblePositionsOnX.min;
        this.possiblePositionsOnXMax = possiblePositionsOnX.max;

        this.possiblePositionsOnYMin = possiblePositionsOnY.min;
        this.possiblePositionsOnYMax = possiblePositionsOnY.max;
    }

    #selfRotate() {
        this.degree += this.directionInDegree;

        this.context.save();
        this.context.translate(this.x, this.y);
        if (!Meteor.#noRotateNames.includes(this.imageName)) this.context.rotate(this.degree + Math.PI / 180);
        this.context.translate(-this.x, -this.y);
        this.context.drawImage(this.image, this.x, this.y, this.imageWidth, this.imageHeight);
        this.context.restore();
    }

    draw() {
        if (this.y === -this.size && helperController.randomAppearanceCelestialBody(Meteor.#appearanceChance)) return;

        this.#selfRotate();

        if (this.y > this.canvasHeight) {
            this.x = helperController.getRandomInt(this.possiblePositionsOnXMin, this.possiblePositionsOnXMax);
            this.size = helperController.getRandomInt(Meteor.#minSize, Meteor.#maxSize);
            this.y = -this.size;

            this.speed = Meteor.#speedLimit / this.size;

            this.imageName = helperController.getRandomElementAndIndexInArray(Meteor.#imageNames).element;

            this.image = new Image();
            this.image.src = `./src/images/${Meteor.#type}-${this.imageName}.png`;
            this.imageWidth = this.size;
            this.imageHeight = this.size;

            if (Meteor.#noRotateNames.includes(this.imageName)) {
                if (helperController.randomEvent(50)) {
                    this.y = helperController.getRandomInt(this.possiblePositionsOnYMin, this.possiblePositionsOnYMax);
                    if (this.imageName.split("-")[0] === "left") this.x = this.possiblePositionsOnXMax;
                    if (this.imageName.split("-")[0] === "right") this.x = this.possiblePositionsOnXMin;
                }
            }

        } else {
            if (!Meteor.#noRotateNames.includes(this.imageName)) this.y += this.speed;
            if (this.imageName.split("-")[0] === "left") {
                this.y += this.speed * 20;
                this.x += -this.speed * 20;
            }
            if (this.imageName.split("-")[0] === "right") {
                this.y += this.speed * 20;
                this.x += this.speed * 20;
            }
        }
    }
}