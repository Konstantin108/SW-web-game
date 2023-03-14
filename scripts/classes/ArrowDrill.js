class ArrowDrill extends Arrow {
    selectorName = "arrow-drill";
    speed = 20;

    hit() {
        let blockagesArray = blockageController.blockagesArray;

        for (let i = 0; i < blockagesArray.length; i++) {
            if (blockagesArray[i].x == this.x && blockagesArray[i].y == this.y) {
                this.hit_x = this.x;
                this.hit_y = this.y;
                progressController.killEnemy(this, i);
                renderer.renderStatusBar();
            }
        }
        this.hit_x = null;
        this.hit_y = null;
    }
}