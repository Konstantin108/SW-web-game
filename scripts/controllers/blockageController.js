import {config} from "../config/config.js";
import {helperController} from "./helperController.js";
import {Blockage} from "../classes/Blockage.js";

export const blockageController = {
    blockageTimerIdsArray: [],
    blockagesArray: [],

    createPossiblePositions() {
        let possiblePositionsArray = [];

        for (let i = 0; i <= config.mapSizeX; i++) {
            possiblePositionsArray.push(i);
        }
        return possiblePositionsArray;
    },

    blockageCreate(blockagesCount) {
        let actualPossiblePositionsArray = this.createPossiblePositions();

        while (this.blockagesArray.length < blockagesCount) {
            let indexOfNumber = helperController.getRandomInt(0, actualPossiblePositionsArray.length);
            let x_pos = actualPossiblePositionsArray[indexOfNumber];
            if (x_pos) this.blockagesArray.push(new Blockage(x_pos, 0));
            actualPossiblePositionsArray.splice(indexOfNumber, 1);
        }
    },

    blockageMove(blockagesArray) {
        for (let i = 0; i < blockagesArray.length; i++) {
            this.blockageTimerIdsArray.push(setInterval(() => blockagesArray[i].step(), blockagesArray[i].speed));
        }
        // console.log("blockages:");
        // console.log(this.blockagesArray);
        // console.log("blockageTimerIds:");
        // console.log(this.blockageTimerIdsArray);
    }
}