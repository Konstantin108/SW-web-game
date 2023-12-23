import {helperController} from "../../controllers/helperController.js";

export class Galaxy {
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
    appearanceChance = 12;
    speed = .01;
    // speed = 4;

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