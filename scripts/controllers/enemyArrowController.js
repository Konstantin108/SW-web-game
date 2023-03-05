let enemyArrowController = {
    enemyArrowsArray: [],

    enemyArrowCreate(shootingBlockageData) {
        if (shootingBlockageData) {
            while (this.enemyArrowsArray.length < shootingBlockageData.shootingCount) {
                this.enemyArrowsArray.push(new EnemyArrow(shootingBlockageData.x, shootingBlockageData.y));
            }
        }
    },

    enemyArrowMove() {
        for (let i = 0; i < this.enemyArrowsArray.length; i++) {
            if (this.enemyArrowsArray[i]) {
                this.enemyArrowsArray[i].makeStep();
            }
        }
        // console.log(`enemy arrows - ${this.enemyArrowsArray}`);
    }
}