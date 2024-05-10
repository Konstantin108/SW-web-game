import {helperController} from "../../controllers/helperController.js";

export class SlowStar {
    static #type = "star";
    static #imageNames = [
        "blue",
        "blue2",
        "blue3",
        "green",
        "green2",
        "green3",
        "green4",
        "orange",
        "orange2",
        "pink",
        "pink2",
        "purple",
        "purple2",
        "purple3",
        "purple4",
        "purple5",
        "white",
        "white2",
        "white3",
        "yellow"
    ];
    static #maxSize = 70;
    static #minSize = 30;
    static #appearanceChance = 3;
    static #speed = .05;

    constructor(x, y, canvasHeight, context, possiblePositionsOnX, possiblePositionsOnY) {
        this._x = x;
        this._y = y;
        this._canvasHeight = canvasHeight;
        this._context = context;

        this._imageName = helperController.getRandomElementAndIndexInArray(SlowStar.#imageNames).element;

        this._size = helperController.getRandomInt(SlowStar.#minSize, SlowStar.#maxSize);

        this._image = new Image();
        this._image.src = `./src/images/${SlowStar.#type}-${this._imageName}.png`;
        this._imageWidth = this._size;
        this._imageHeight = this._size;

        this._possiblePositionsOnXMin = possiblePositionsOnX.min;
        this._possiblePositionsOnXMax = possiblePositionsOnX.max;
    };

    draw() {
        if (this._y === -this._size && helperController.randomAppearanceCelestialBody(SlowStar.#appearanceChance)) return;

        this._context.drawImage(this._image, this._x, this._y, this._imageWidth, this._imageHeight);

        if (this._y > this._canvasHeight) {
            this._x = helperController.getRandomInt(this._possiblePositionsOnXMin, this._possiblePositionsOnXMax);
            this._size = helperController.getRandomInt(SlowStar.#minSize, SlowStar.#maxSize);
            this._y = -this._size;

            this._imageName = helperController.getRandomElementAndIndexInArray(SlowStar.#imageNames).element;

            this._image = new Image();
            this._image.src = `./src/images/${SlowStar.#type}-${this._imageName}.png`;
            this._imageWidth = this._size;
            this._imageHeight = this._size;

        } else {
            this._y += SlowStar.#speed;
        }
    };
}