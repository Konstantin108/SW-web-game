let bonusController = {
    bonusTimerIdsArray: [],
    bonusesArray: [],

    bonusAppearanceListener() {
        this.bonusTimerIdsArray.push(setInterval(() => this.bonusCreate(), 5000));
    },

    bonusCreate() {
        if (helperController.randomEvent(config.bonuses.bonusChance)) {
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
        console.log("bonuses:")
        console.log(this.bonusesArray);
        console.log("bonusTimerIds:")
        console.log(this.bonusTimerIdsArray);
    }
}