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
        this.x = x;
        this.y = y;
        this.canvasHeight = canvasHeight;
        this.context = context;

        this.imageName = helperController.getRandomElementAndIndexInArray(SlowStar.#imageNames).element;

        this.size = helperController.getRandomInt(SlowStar.#minSize, SlowStar.#maxSize);

        this.image = new Image();
        this.image.src = `./src/images/${SlowStar.#type}-${this.imageName}.png`;
        this.imageWidth = this.size;
        this.imageHeight = this.size;

        this.possiblePositionsOnXMin = possiblePositionsOnX.min;
        this.possiblePositionsOnXMax = possiblePositionsOnX.max;
    }

    draw() {
        if (this.y === -this.size && helperController.randomAppearanceCelestialBody(SlowStar.#appearanceChance)) return;

        this.context.drawImage(this.image, this.x, this.y, this.imageWidth, this.imageHeight);

        if (this.y > this.canvasHeight) {
            this.x = helperController.getRandomInt(this.possiblePositionsOnXMin, this.possiblePositionsOnXMax);
            this.size = helperController.getRandomInt(SlowStar.#minSize, SlowStar.#maxSize);
            this.y = -this.size;

            this.imageName = helperController.getRandomElementAndIndexInArray(SlowStar.#imageNames).element;

            this.image = new Image();
            this.image.src = `./src/images/${SlowStar.#type}-${this.imageName}.png`;
            this.imageWidth = this.size;
            this.imageHeight = this.size;

        } else {
            this.y += SlowStar.#speed;
        }
    }
}