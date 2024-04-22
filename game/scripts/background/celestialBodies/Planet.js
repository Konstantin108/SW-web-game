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
        this.x = x;
        this.y = y;
        this.canvasHeight = canvasHeight;
        this.context = context;

        this.imageName = helperController.getRandomElementAndIndexInArray(Planet.#imageNames).element;

        this.size = helperController.getRandomInt(Planet.#minSize, Planet.#maxSize);
        this.speed = Planet.#speedLimit / this.size;

        this.image = new Image();
        this.image.src = `./src/images/${Planet.#type}-${this.imageName}.png`;
        this.imageWidth = this.size;
        this.imageHeight = this.size;

        this.possiblePositionsOnXMin = possiblePositionsOnX.min;
        this.possiblePositionsOnXMax = possiblePositionsOnX.max;
    }

    draw() {
        if (this.y === -this.size && helperController.randomAppearanceCelestialBody(Planet.#appearanceChance)) return;

        this.context.drawImage(this.image, this.x, this.y, this.imageWidth, this.imageHeight);

        if (this.y > this.canvasHeight) {
            this.x = helperController.getRandomInt(this.possiblePositionsOnXMin, this.possiblePositionsOnXMax);
            this.size = helperController.getRandomInt(Planet.#minSize, Planet.#maxSize);
            this.y = -this.size;

            this.speed = Planet.#speedLimit / this.size;

            this.imageName = helperController.getRandomElementAndIndexInArray(Planet.#imageNames).element;

            this.image = new Image();
            this.image.src = `./src/images/${Planet.#type}-${this.imageName}.png`;
            this.imageWidth = this.size;
            this.imageHeight = this.size;

        } else {
            this.y += this.speed;
        }
    }
}