import {utilities} from "../utilities.js";

export class Galaxy {
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

    type = "galaxy";
    imageNames = [
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
    maxSize = 2000;
    minSize = 1800;
    // maxSize = 500;
    // minSize = 460;
    chance = 10000;
    chanceOut = 5;
    // chanceOut = 9900;
    // speed = 4;
    speed = .01;

    size = Math.floor(Math.random() * (this.maxSize - this.minSize + 1)) + this.minSize;

    draw() {
        if (this.y === -this.size && (Math.random() * this.chance).toFixed(0) < this.chance - this.chanceOut) return;

        this.context.drawImage(this.image, this.x, this.y, this.imageWidth, this.imageHeight);

        if (this.y > this.canvasHeight) {
            this.x = Math.floor(Math.random() * (this.possiblePoitionsOnXMax - this.possiblePoitionsOnXMin + 1)) + this.possiblePoitionsOnXMin;

            this.size = Math.floor(Math.random() * (this.maxSize - this.minSize + 1)) + this.minSize;
            this.y = -this.size;

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