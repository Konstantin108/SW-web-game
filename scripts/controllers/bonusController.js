let bonusController = {
    bonusesArray: [],

    bonusAppearanceListener() {
        setInterval(() => this.bonusCreate(), 5000);
    },

    bonusCreate() {
        if (helperController.randomEvent(config.bonusChance)) {
            this.bonusesArray.push(new Bonus());
        }
        this.bonusMove();
    },

    pickedCheck() {
        for (let i = 0; i < this.bonusesArray.length; i++) {
            this.bonusesArray[i].picked();
        }
    },

    bonusMove() {
        for (let i = 0; i < this.bonusesArray.length; i++) {
            if (this.bonusesArray[i]) {
                this.bonusesArray[i].makeStep();
            }
        }
        // console.log("bonuses")
        // console.log(this.bonusesArray);
    }
}