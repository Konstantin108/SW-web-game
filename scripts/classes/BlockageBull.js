import {Blockage} from "./Blockage.js";
import {config} from "../config/config.js";

export class BlockageBull extends Blockage {
    lives = config.blockageBullLives;
    shipDestroyedReward = config.blockageBullShipDestroyedRewars;
    selectorName = "blockageBull";
    getDamageOutlookSelectorName = "blockageWhiteBull";
    arrowTypeSelectorName = "enemyArrowBomb";
}