import {helperController} from "../../controllers/helperController.js";

export class SlowStar {
    constructor(x, y, canvasHeight, context, possiblePositionsOnX, possiblePositionsOnY) {
        this.x = x;
        this.y = y;
        this.canvasHeight = canvasHeight;
        this.context = context;

        this.imageName = helperController.getRandomElementAndIndexInArray(this.imageNames).element;

        this.image = new Image();
        this.image.src = `./src/images/${this.type}-${this.imageName}.png`;
        this.imageWidth = this.size;
        this.imageHeight = this.size;

        this.possiblePositionsOnXMin = possiblePositionsOnX.min;
        this.possiblePositionsOnXMax = possiblePositionsOnX.max;
    }

    type = "star";
    imageNames = [
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

    maxSize = 70;
    minSize = 30;
    appearanceChance = 3;
    speed = .05;

    size = helperController.getRandomInt(this.minSize, this.maxSize);

    draw() {
        if (this.y === -this.size && helperController.randomAppearanceCelestialBody(this.appearanceChance)) return;

        this.context.drawImage(this.image, this.x, this.y, this.imageWidth, this.imageHeight);

        if (this.y > this.canvasHeight) {
            this.x = helperController.getRandomInt(this.possiblePositionsOnXMin, this.possiblePositionsOnXMax);
            this.size = helperController.getRandomInt(this.minSize, this.maxSize);
            this.y = -this.size;

            this.imageName = helperController.getRandomElementAndIndexInArray(this.imageNames).element;

            this.image = new Image();
            this.image.src = `./src/images/${this.type}-${this.imageName}.png`;
            this.imageWidth = this.size;
            this.imageHeight = this.size;

        } else {
            this.y += this.speed;
        }
    }
}