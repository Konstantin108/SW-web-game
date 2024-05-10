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
        this._x = x;
        this._y = y;
        this._canvasHeight = canvasHeight;
        this._context = context;
        this._degree = 0;
        this._directionInDegree = helperController.getRandomDirectionOfRotation(50);

        this._imageName = helperController.getRandomElementAndIndexInArray(Meteor.#imageNames).element;

        this._size = helperController.getRandomInt(Meteor.#minSize, Meteor.#maxSize);
        this._speed = Meteor.#speedLimit / this._size;

        this._image = new Image();
        this._image.src = `./src/images/${Meteor.#type}-${this._imageName}.png`;
        this._imageWidth = this._size;
        this._imageHeight = this._size;

        this._possiblePositionsOnXMin = possiblePositionsOnX.min;
        this._possiblePositionsOnXMax = possiblePositionsOnX.max;

        this._possiblePositionsOnYMin = possiblePositionsOnY.min;
        this._possiblePositionsOnYMax = possiblePositionsOnY.max;
    };

    #selfRotate() {
        this._degree += this._directionInDegree;

        this._context.save();
        this._context.translate(this._x, this._y);
        if (!Meteor.#noRotateNames.includes(this._imageName)) this._context.rotate(this._degree + Math.PI / 180);
        this._context.translate(-this._x, -this._y);
        this._context.drawImage(this._image, this._x, this._y, this._imageWidth, this._imageHeight);
        this._context.restore();
    };

    draw() {
        if (this._y === -this._size && helperController.randomAppearanceCelestialBody(Meteor.#appearanceChance)) return;

        this.#selfRotate();

        if (this._y > this._canvasHeight) {
            this._x = helperController.getRandomInt(this._possiblePositionsOnXMin, this._possiblePositionsOnXMax);
            this._size = helperController.getRandomInt(Meteor.#minSize, Meteor.#maxSize);
            this._y = -this._size;

            this._speed = Meteor.#speedLimit / this._size;

            this._imageName = helperController.getRandomElementAndIndexInArray(Meteor.#imageNames).element;

            this._image = new Image();
            this._image.src = `./src/images/${Meteor.#type}-${this._imageName}.png`;
            this._imageWidth = this._size;
            this._imageHeight = this._size;

            if (Meteor.#noRotateNames.includes(this._imageName)) {
                if (helperController.randomEvent(50)) {
                    this._y = helperController.getRandomInt(this._possiblePositionsOnYMin, this._possiblePositionsOnYMax);
                    if (this._imageName.split("-")[0] === "left") this._x = this._possiblePositionsOnXMax;
                    if (this._imageName.split("-")[0] === "right") this._x = this._possiblePositionsOnXMin;
                }
            }

        } else {
            if (!Meteor.#noRotateNames.includes(this._imageName)) this._y += this._speed;
            if (this._imageName.split("-")[0] === "left") {
                this._y += this._speed * 20;
                this._x += -this._speed * 20;
            }
            if (this._imageName.split("-")[0] === "right") {
                this._y += this._speed * 20;
                this._x += this._speed * 20;
            }
        }
    };
}