import {utilities} from "../utilities.js";

export class Planet {
    constructor(x, y, canvasHeight, context, possiblePoitionsOnX, possiblePoitionsOnY) {
        this.x = x;
        this.y = y;
        this.canvasHeight = canvasHeight;
        this.context = context;

        this.imageName = utilities.getRandomElementInArray(this.imageNames);

        this.image = new Image();
        this.image.src = `./images/${this.type}-${this.imageName}.png`;
        this.imageWidth = this.size;
        this.imageHeight = this.size;

        this.possiblePoitionsOnXMin = possiblePoitionsOnX.min;
        this.possiblePoitionsOnXMax = possiblePoitionsOnX.max;
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

    size = utilities.getRandomValue(this.minSize, this.maxSize);

    speedLimit = 50;
    speed = this.speedLimit / this.size;
    // speed = 10;

    draw() {
        if (this.y === -this.size && utilities.randomAppearanceCelestialBody(this.appearanceChance)) return;

        this.context.drawImage(this.image, this.x, this.y, this.imageWidth, this.imageHeight);

        if (this.y > this.canvasHeight) {
            this.x = utilities.getRandomValue(this.possiblePoitionsOnXMin, this.possiblePoitionsOnXMax);
            this.size = utilities.getRandomValue(this.minSize, this.maxSize);
            this.y = -this.size;

            this.speed = this.speedLimit / this.size;
            // this.speed = 10;

            this.imageName = utilities.getRandomElementInArray(this.imageNames);

            this.image = new Image();
            this.image.src = `./images/${this.type}-${this.imageName}.png`;
            this.imageWidth = this.size;
            this.imageHeight = this.size;

        } else {
            this.y += this.speed;
        }
    }
}