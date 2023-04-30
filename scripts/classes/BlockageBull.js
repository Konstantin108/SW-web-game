import {Blockage} from "./Blockage.js";

export class BlockageBull extends Blockage {
    lives = 5;
    shipDestroyedReward = 3;
    selectorName = "blockageBull";
    getDamageOutlookSelectorName = "blockageWhiteBull";
    arrowTypeSelectorName = "enemyArrowBomb";
}