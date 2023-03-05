let blockageController = {
    blockagesArray: [],

    blockageCreate(blockagesCount) {
        while (this.blockagesArray.length < blockagesCount) {
            this.blockagesArray.push(new Blockage());
        }
    },

    blockageMove(blockagesArray) {
        for (let i = 0; i < blockagesArray.length; i++) {
            setInterval(() => blockagesArray[i].step(), blockagesArray[i].speed);
        }
        // console.log(`blockages - ${this.blockagesArray}`);
    }
}