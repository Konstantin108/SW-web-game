import {utilities} from "../utilities.js";

export class Meteor {
    constructor(x, y, canvasHeight, context, possiblePoitionsOnX, possiblePoitionsOnY) {
        this.x = x;
        this.y = y;
        this.canvasHeight = canvasHeight;
        this.context = context;
        this.degree = 0;
        this.directionInDegree = utilities.getRandomDirectionOfRotation(50);

        this.imageName = utilities.getRandomElementInArray(this.imageNames);

        this.image = new Image();
        this.image.src = `./images/${this.type}-${this.imageName}.png`;
        this.imageWidth = this.size;
        this.imageHeight = this.size;

        this.possiblePoitionsOnXMin = possiblePoitionsOnX.min;
        this.possiblePoitionsOnXMax = possiblePoitionsOnX.max;

        this.possiblePoitionsOnYMin = possiblePoitionsOnY.min;
        this.possiblePoitionsOnYMax = possiblePoitionsOnY.max;
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

    size = utilities.getRandomValue(this.minSize, this.maxSize);

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

        if (this.y === -this.size && utilities.randomAppearanceCelestialBody(this.appearanceChance)) return;

        if (this.y > this.canvasHeight) {
            this.x = utilities.getRandomValue(this.possiblePoitionsOnXMin, this.possiblePoitionsOnXMax);
            this.size = utilities.getRandomValue(this.minSize, this.maxSize);
            this.y = -this.size;

            this.speed = this.speedLimit / this.size;

            this.imageName = utilities.getRandomElementInArray(this.imageNames);

            this.image = new Image();
            this.image.src = `./images/${this.type}-${this.imageName}.png`;
            this.imageWidth = this.size;
            this.imageHeight = this.size;

            if (this.noRotateNames.includes(this.imageName)) {
                if (utilities.randomEvent(50)) {
                    this.y = utilities.getRandomValue(this.possiblePoitionsOnYMin, this.possiblePoitionsOnYMax);
                    if (this.imageName.split("-")[0] === "left") this.x = this.possiblePoitionsOnXMax;
                    if (this.imageName.split("-")[0] === "right") this.x = this.possiblePoitionsOnXMin;
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