class ArrowDrill extends Arrow {
    selectorName = "arrow-drill";
    speed = 20;

    hit() {
        let blockagesArray = blockageController.blockagesArray;

        for (let i = 0; i < blockagesArray.length; i++) {
            if (blockagesArray[i].x == this.x && blockagesArray[i].y == this.y) {
                this.hit_x = this.x;
                this.hit_y = this.y;
                renderer.renderHit(this);
                progressController.scoreUp(config.shipDestroyedReward);
                progressController.shipDestroyer += 1;
                blockageController.blockagesArray[i] = new Blockage(helperController.getRandomInt(0, config.mapSizeX));
                renderer.renderStatusBar();
            }
        }
        this.hit_x = null;
        this.hit_y = null;
    }
}