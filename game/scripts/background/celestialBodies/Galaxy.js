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
        this.x = x;
        this.y = y;
        this.canvasHeight = canvasHeight;
        this.context = context;

        this.imageName = helperController.getRandomElementAndIndexInArray(Galaxy.#imageNames).element;

        this.size = helperController.getRandomInt(Galaxy.#minSize, Galaxy.#maxSize);

        this.image = new Image();
        this.image.src = `./src/images/${Galaxy.#type}-${this.imageName}.png`;
        this.imageWidth = this.size;
        this.imageHeight = this.size;

        this.possiblePositionsOnXMin = possiblePositionsOnX.min;
        this.possiblePositionsOnXMax = possiblePositionsOnX.max;
    }

    draw() {
        if (this.y === -this.size && helperController.randomAppearanceCelestialBody(Galaxy.#appearanceChance)) return;

        this.context.drawImage(this.image, this.x, this.y, this.imageWidth, this.imageHeight);

        if (this.y > this.canvasHeight) {
            this.x = helperController.getRandomInt(this.possiblePositionsOnXMin, this.possiblePositionsOnXMax);
            this.size = helperController.getRandomInt(Galaxy.#minSize, Galaxy.#maxSize);
            this.y = -this.size;

            this.imageName = helperController.getRandomElementAndIndexInArray(Galaxy.#imageNames).element;

            this.image = new Image();
            this.image.src = `./src/images/${Galaxy.#type}-${this.imageName}.png`;
            this.imageWidth = this.size;
            this.imageHeight = this.size;

        } else {
            this.y += Galaxy.#speed;
        }
    }
}