import {utilities} from "../utilities.js";

export class SlowStar {
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

    size = utilities.getRandomValue(this.minSize, this.maxSize);

    draw() {
        if (this.y === -this.size && utilities.randomAppearanceCelestialBody(this.appearanceChance)) return;

        this.context.drawImage(this.image, this.x, this.y, this.imageWidth, this.imageHeight);

        if (this.y > this.canvasHeight) {
            this.x = utilities.getRandomValue(this.possiblePoitionsOnXMin, this.possiblePoitionsOnXMax);
            this.size = utilities.getRandomValue(this.minSize, this.maxSize);
            this.y = -this.size;

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