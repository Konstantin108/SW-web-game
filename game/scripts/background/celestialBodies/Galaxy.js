import {helperController} from "../../controllers/helperController.js";

export class Galaxy {
    static #type = "galaxy";
    static #imageNames = [
        "black-hole",
        "black-hole2",
        "black-hole3",
        "black-hole4",
        "blue",
        "blue2",
        "milky-way",
        "purple",
        "santa-claus"
    ];
    static #maxSize = 2000;
    static #minSize = 1800;
    static #appearanceChance = 12;
    static #speed = .01;

    constructor(x, y, canvasHeight, context, possiblePositionsOnX, possiblePositionsOnY) {
        this._x = x;
        this._y = y;
        this._canvasHeight = canvasHeight;
        this._context = context;

        this._imageName = helperController.getRandomElementAndIndexInArray(Galaxy.#imageNames).element;

        this._size = helperController.getRandomInt(Galaxy.#minSize, Galaxy.#maxSize);

        this._image = new Image();
        this._image.src = `./src/images/${Galaxy.#type}-${this._imageName}.webp`;
        this._imageWidth = this._size;
        this._imageHeight = this._size;

        this._possiblePositionsOnXMin = possiblePositionsOnX.min;
        this._possiblePositionsOnXMax = possiblePositionsOnX.max;
    };

    draw() {
        if (this._y === -this._size && helperController.randomAppearanceCelestialBody(Galaxy.#appearanceChance)) return;

        this._context.drawImage(this._image, this._x, this._y, this._imageWidth, this._imageHeight);

        if (this._y > this._canvasHeight) {
            this._x = helperController.getRandomInt(this._possiblePositionsOnXMin, this._possiblePositionsOnXMax);
            this._size = helperController.getRandomInt(Galaxy.#minSize, Galaxy.#maxSize);
            this._y = -this._size;

            this._imageName = helperController.getRandomElementAndIndexInArray(Galaxy.#imageNames).element;

            this._image = new Image();
            this._image.src = `./src/images/${Galaxy.#type}-${this._imageName}.webp`;
            this._imageWidth = this._size;
            this._imageHeight = this._size;

        } else {
            this._y += Galaxy.#speed;
        }
    };
}