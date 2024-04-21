import {Blockage} from "./Blockage.js";
import {config} from "../config/config.js";

export class BlockageBull extends Blockage {
    constructor(x, y) {
        super(x, y);
        this.lives = config.blockageBullLives;
        this.shipDestroyedReward = config.blockageBullShipDestroyedRewards;
        this.selectorName = "blockageBull";
        this.getDamageOutlookSelectorName = "blockageWhiteBull";
        this.arrowTypeSelectorName = "enemyArrowBomb";
    }
}