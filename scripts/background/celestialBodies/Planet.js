import {utilities} from "../utilities.js";

// вынести типы тел
export class Planet {
    constructor(x, y, canvasHeight, context, possiblePoitionsOnX) {
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
    chance = 10000;
    chanceOut = 5;

    size = Math.floor(Math.random() * (this.maxSize - this.minSize + 1)) + this.minSize;

    speedLimit = 50;
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