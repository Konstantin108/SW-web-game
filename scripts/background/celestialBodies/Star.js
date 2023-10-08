import {utilities} from "../utilities.js";

export class Star {
    constructor(x, y, canvasHeight, context, possiblePoitionsOnX, possiblePoitionsOnY) {
        this.x = x;
        this.y = y;
        this.canvasHeight = canvasHeight;
        this.context = context;

        this.imageName = utilities.getRandomElementInArray(this.imageNames);

        this.image = new Image();
        this.image.src = `../images/${this.type}-${this.imageName}.png`;
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
    maxSize = 14;
    minSize = 3;
    chance = 10000;
    chanceOut = 300;

    size = Math.floor(Math.random() * (this.maxSize - this.minSize + 1)) + this.minSize;

    speedLimit = 10;
    speed = this.speedLimit / this.size;

    draw() {
        if (this.y === -this.size && (Math.random() * this.chance).toFixed(0) < this.chance - this.chanceOut) return;

        this.context.drawImage(this.image, this.x, this.y, this.imageWidth, this.imageHeight);

        if (this.y > this.canvasHeight) {
            this.x = Math.floor(Math.random() * (this.possiblePoitionsOnXMax - this.possiblePoitionsOnXMin + 1)) + this.possiblePoitionsOnXMin;

            this.size = Math.floor(Math.random() * (this.maxSize - this.minSize + 1)) + this.minSize;
            this.y = -this.size;

            this.speed = this.speedLimit / this.size;

            this.imageName = utilities.getRandomElementInArray(this.imageNames);

            this.image = new Image();
            this.image.src = `../images/${this.type}-${this.imageName}.png`;
            this.imageWidth = this.size;
            this.imageHeight = this.size;

        } else {
            this.y += this.speed;
        }
    }
}