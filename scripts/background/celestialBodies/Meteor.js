import {helperController} from "../../controllers/helperController.js";

export class Meteor {
    constructor(x, y, canvasHeight, context, possiblePositionsOnX, possiblePositionsOnY) {
        this.x = x;
        this.y = y;
        this.canvasHeight = canvasHeight;
        this.context = context;
        this.degree = 0;
        this.directionInDegree = helperController.getRandomDirectionOfRotation(50);

        this.imageName = helperController.getRandomElementAndIndexInArray(this.imageNames).element;

        this.image = new Image();
        this.image.src = `./src/images/${this.type}-${this.imageName}.png`;
        this.imageWidth = this.size;
        this.imageHeight = this.size;

        this.possiblePositionsOnXMin = possiblePositionsOnX.min;
        this.possiblePositionsOnXMax = possiblePositionsOnX.max;

        this.possiblePositionsOnYMin = possiblePositionsOnY.min;
        this.possiblePositionsOnYMax = possiblePositionsOnY.max;
    }

    type = "meteor";
    imageNames = [
        "left-comet",
        "left-comet2",
        "left-comet3",
        "right-comet",
        "right-comet2",
        "right-comet3",
        "blue",
        "orange",
        "rock",
        "rock2",
        "rock3",
    ];
    noRotateNames = [
        "left-comet",
        "left-comet2",
        "left-comet3",
        "right-comet",
        "right-comet2",
        "right-comet3"
    ];
    maxSize = 60;
    minSize = 40;
    appearanceChance = 5;

    size = helperController.getRandomInt(this.minSize, this.maxSize);

    speedLimit = 20;
    speed = this.speedLimit / this.size;

    selfRotate() {
        this.degree += this.directionInDegree;

        this.context.save();
        this.context.translate(this.x, this.y);
        if (!this.noRotateNames.includes(this.imageName)) this.context.rotate(this.degree + Math.PI / 180);
        this.context.translate(-this.x, -this.y);
        this.context.drawImage(this.image, this.x, this.y, this.imageWidth, this.imageHeight);
        this.context.restore();
    }

    draw() {
        this.selfRotate();

        if (this.y === -this.size && helperController.randomAppearanceCelestialBody(this.appearanceChance)) return;

        if (this.y > this.canvasHeight) {
            this.x = helperController.getRandomInt(this.possiblePositionsOnXMin, this.possiblePositionsOnXMax);
            this.size = helperController.getRandomInt(this.minSize, this.maxSize);
            this.y = -this.size;

            this.speed = this.speedLimit / this.size;

            this.imageName = helperController.getRandomElementAndIndexInArray(this.imageNames).element;

            this.image = new Image();
            this.image.src = `./src/images/${this.type}-${this.imageName}.png`;
            this.imageWidth = this.size;
            this.imageHeight = this.size;

            if (this.noRotateNames.includes(this.imageName)) {
                if (helperController.randomEvent(50)) {
                    this.y = helperController.getRandomInt(this.possiblePositionsOnYMin, this.possiblePositionsOnYMax);
                    if (this.imageName.split("-")[0] === "left") this.x = this.possiblePositionsOnXMax;
                    if (this.imageName.split("-")[0] === "right") this.x = this.possiblePositionsOnXMin;
                }
            }

        } else {
            if (!this.noRotateNames.includes(this.imageName)) this.y += this.speed;
            if (this.imageName.split("-")[0] === "left") {
                this.y += this.speed * 20;
                this.x += -this.speed * 20;
            }
            if (this.imageName.split("-")[0] === "right") {
                this.y += this.speed * 20;
                this.x += this.speed * 20;
            }
        }
    }
}