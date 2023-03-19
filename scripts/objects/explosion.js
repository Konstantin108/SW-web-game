let explosion = {

    explode() {
        let blockagesArray = blockageController.blockagesArray;
        let playerHasBomb = true;

        if (player.bombsCount > 0) {
            player.bombsCount += -1;
            renderer.renderExplosion();
            for (let i = 0; i < blockagesArray.length; i++) {
                if (blockagesArray[i].y >= 0) {
                    progressController.killEnemy(blockagesArray[i], i, -8);
                }
            }
            renderer.renderStatusBar();
            renderer.renderBombBar();
        } else {
            playerHasBomb = false;
            renderer.renderBombBar(playerHasBomb);
        }
    }
}