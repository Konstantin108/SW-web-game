let arrowController = {
    arrowsArray: [],

    arrowCreate() {
        while (this.arrowsArray.length < player.shootingCount) {
            this.arrowsArray.push(new Arrow());
        }
    },

    arrowMove() {
        for (let i = 0; i < this.arrowsArray.length; i++) {
            if (this.arrowsArray[i]) {
                this.arrowsArray[i].makeStep();
            }
        }
        // console.log(`player\'s arrows - ${this.arrowsArray}`);
    }
}