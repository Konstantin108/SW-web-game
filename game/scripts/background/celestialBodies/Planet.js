import {helperController} from "../../controllers/helperController.js";

export class Planet {
    static #type = "planet";
    static #imageNames = [
        "sun",
        "pink",
        "orange",
        "moon",
        "earth",
        "blue"
    ];
    static #maxSize = 1000;
    static #minSize = 500;
    static #appearanceChance = 30;
    static #speedLimit = 50;

    constructor(x, y, canvasHeight, context, possiblePositionsOnX, possiblePositionsOnY) {
        this._x = x;
        this._y = y;
        this._canvasHeight = canvasHeight;
        this._context = context;

        this._imageName = helperController.getRandomElementAndIndexInArray(Planet.#imageNames).element;

        this._size = helperController.getRandomInt(Planet.#minSize, Planet.#maxSize);
        this._speed = Planet.#speedLimit / this._size;

        this._image = new Image();
        this._image.src = `./src/images/${Planet.#type}-${this._imageName}.png`;
        this._imageWidth = this._size;
        this._imageHeight = this._size;

        this._possiblePositionsOnXMin = possiblePositionsOnX.min;
        this._possiblePositionsOnXMax = possiblePositionsOnX.max;
    };

    draw() {
        if (this._y === -this._size && helperController.randomAppearanceCelestialBody(Planet.#appearanceChance)) return;

        this._context.drawImage(this._image, this._x, this._y, this._imageWidth, this._imageHeight);

        if (this._y > this._canvasHeight) {
            this._x = helperController.getRandomInt(this._possiblePositionsOnXMin, this._possiblePositionsOnXMax);
            this._size = helperController.getRandomInt(Planet.#minSize, Planet.#maxSize);
            this._y = -this._size;

            this._speed = Planet.#speedLimit / this._size;

            this._imageName = helperController.getRandomElementAndIndexInArray(Planet.#imageNames).element;

            this._image = new Image();
            this._image.src = `./src/images/${Planet.#type}-${this._imageName}.png`;
            this._imageWidth = this._size;
            this._imageHeight = this._size;

        } else {
            this._y += this._speed;
        }
    };
}