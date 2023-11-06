import {helperController} from "../../controllers/helperController.js";

export class Planet {
    constructor(x, y, canvasHeight, context, possiblePositionsOnX, possiblePositionsOnY) {
        this.x = x;
        this.y = y;
        this.canvasHeight = canvasHeight;
        this.context = context;

        this.imageName = helperController.getRandomElementInArray(this.imageNames);

        this.image = new Image();
        this.image.src = `./src/images/${this.type}-${this.imageName}.png`;
        this.imageWidth = this.size;
        this.imageHeight = this.size;

        this.possiblePositionsOnXMin = possiblePositionsOnX.min;
        this.possiblePositionsOnXMax = possiblePositionsOnX.max;
    }

    type = "planet";
    imageNames = [
        "sun",
        "pink",
        "orange",
        "moon",
        "earth",
        "blue"
    ];
    maxSize = 1000;
    minSize = 500;
    appearanceChance = 30;

    size = helperController.getRandomInt(this.minSize, this.maxSize);

    speedLimit = 50;
    speed = this.speedLimit / this.size;
    // speed = 10;

    draw() {
        if (this.y === -this.size && helperController.randomAppearanceCelestialBody(this.appearanceChance)) return;

        this.context.drawImage(this.image, this.x, this.y, this.imageWidth, this.imageHeight);

        if (this.y > this.canvasHeight) {
            this.x = helperController.getRandomInt(this.possiblePositionsOnXMin, this.possiblePositionsOnXMax);
            this.size = helperController.getRandomInt(this.minSize, this.maxSize);
            this.y = -this.size;

            this.speed = this.speedLimit / this.size;
            // this.speed = 10;

            this.imageName = helperController.getRandomElementInArray(this.imageNames);

            this.image = new Image();
            this.image.src = `./src/images/${this.type}-${this.imageName}.png`;
            this.imageWidth = this.size;
            this.imageHeight = this.size;

        } else {
            this.y += this.speed;
        }
    }
}