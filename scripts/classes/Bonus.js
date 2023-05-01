import {config} from "../config/config.js";
import {helperController} from "../controllers/helperController.js";
import {game} from "../game.js";
import {renderer} from "../objects/renderer.js";
import {bonusController} from "../controllers/bonusController.js";
import {player} from "../objects/player.js";
import {crashChecker} from "../objects/crashChecker.js";

export class Bonus {
    static id = 0;
    id = Bonus.id++;
    objectType = helperController.getRandomType(config.bonuses.bonusTypes);
    selectorName = this.objectType.name;
    thisSelectorOverlay = [
        "enemyArrow"
    ];
    x = helperController.getRandomInt(0, config.mapSizeX);
    y = 0;
    speed = config.bonuses.bonusSpeed;
    picked_x = null;
    picked_y = null;

    step() {
        if (!game.gameIsRuned) return;
        let y_pos = this.y;
        y_pos += 1;
        if (y_pos <= config.mapSizeY) {
            this.y = y_pos;
        } else if (y_pos === config.mapSizeY + 1) {
            y_pos = config.mapSizeY + 2;
            this.y = y_pos;
            renderer.clear(this.selectorName);
            this.remove();
        }
        renderer.clear(this.selectorName);
        renderer.renderMovingObjects(bonusController.bonusesArray, this.thisSelectorOverlay);
        this.getBonus(this.picked());
        renderer.renderPlayer();
    }

    makeStep() {
        let timerId = setInterval(() => this.step(), this.speed);
        setTimeout(() => clearInterval(timerId), 30000);
    }

    picked() {
        let pickedBonus = null;

        if (player.x === this.x && player.y === this.y) {
            this.picked_x = this.x;
            this.picked_y = this.y;
            this.y = config.mapSizeY + 2;
            renderer.renderPickedBonus(this);
            pickedBonus = this;
            this.remove();
            // console.log(pickedBonus);    // данные подобранного бонуса
            return pickedBonus;
        }
        this.picked_x = null;
        this.picked_y = null;
    }

    getBonus(bonus) {
        if (bonus) this.setNewPropertiesForPlayer(bonus.objectType);
    }

    setNewPropertiesForPlayer(bonus) {
        if (bonus.playerArrowType) {
            renderer.clear(player.selectorName);
            player.selectorName = bonus.playerOutlook;
            player.arrowType = bonus.playerArrowType;
            player.bonusObjectNewArrowType = bonus;
            player.bonusNewArrowTypeIsActivated = true;
            renderer.renderPlayer();
            renderer.renderBonusBarElement("newArrowTypeBar", bonus);
            this.newPropertiesForPlayerOffCallCancel(player.bonusNewArrowTypeIsActivatedTimerId, player.calculateTimeInBonusNewArrowTypeOffTimerId);
            this.newPropertiesForPlayerOffCall(bonus);
            this.calculateTimeInBonusOff(bonus.actionTime / 1000, "newArrowType");
        }
        if (bonus.playerExtraOutlook) {
            crashChecker.invincibilityOff();
            player.extraSelectorName = bonus.playerExtraOutlook;
            player.bonusObjectShield = bonus;
            player.bonusShieldIsActivated = true;
            renderer.renderBonusBarElement("shieldBar", bonus);
            this.newPropertiesForPlayerOffCallCancel(player.bonusShieldIsActivatedTimerId, player.calculateTimeInBonusShieldOffTimerId);
            this.newPropertiesForPlayerOffCall(bonus);
            this.calculateTimeInBonusOff(bonus.actionTime / 1000, "shield");
        }
        if (bonus.name === "life") {
            if (player.lives < config.lives) {
                player.lives += 1;
                renderer.renderStatusBar();
                renderer.renderHeartScaleAnimation();
            }
        }
        if (bonus.name === "killAll") {
            if (player.bombsCount < config.maxBombsCount) {
                player.bombsCount += 1;
                renderer.renderBombBar();
            }
        }
    }

    newPropertiesForPlayerOff(bonus) {
        if (bonus.playerArrowType) {
            renderer.clear(player.selectorName);
            player.selectorName = "player";
            player.arrowType = "arrow";
            player.bonusNewArrowTypeIsActivated = false;
            renderer.renderPlayer();
            renderer.renderBonusBarElement("newArrowTypeBar");
        }
        if (bonus.playerExtraOutlook) {
            renderer.clear(player.extraSelectorName);
            player.extraSelectorName = null;
            player.bonusShieldIsActivated = false;
            renderer.renderBonusBarElement("shieldBar");
        }
    }

    newPropertiesForPlayerOffCall(bonus) {
        let timerId = setTimeout(() => this.newPropertiesForPlayerOff(bonus), bonus.actionTime);
        if (bonus.playerArrowType) {
            player.bonusNewArrowTypeIsActivatedTimerId = timerId;
        } else {
            player.bonusShieldIsActivatedTimerId = timerId;
        }
    }

    newPropertiesForPlayerOffCallCancel(bonusIsActivatedTimerId, calculateTimeInBonusOffTimerId) {
        if (bonusIsActivatedTimerId) clearTimeout(bonusIsActivatedTimerId);
        if (calculateTimeInBonusOffTimerId) clearTimeout(calculateTimeInBonusOffTimerId);
    }

    calculateTimeInBonusOff(bonusActionTime, calculateTimeInBonusOffType) {
        let calculateTimeInBonusOffTimerId = null;
        let tick = -1;

        if (!game.gameIsRuned) tick = 0;

        if (bonusActionTime > 0) {
            calculateTimeInBonusOffTimerId = setTimeout(() => {
                return this.calculateTimeInBonusOff(bonusActionTime += tick, calculateTimeInBonusOffType);
            }, 1000);
        }
        if (calculateTimeInBonusOffType === "newArrowType") {
            player.calculateTimeInBonusNewArrowTypeOffTimerId = calculateTimeInBonusOffTimerId;
            player.calculateTimeInBonusNewArrowTypeOff = bonusActionTime;
        } else {
            player.calculateTimeInBonusShieldOffTimerId = calculateTimeInBonusOffTimerId;
            player.calculateTimeInBonusShieldOff = bonusActionTime;
        }
    }

    remove() {
        let bonusArray = bonusController.bonusesArray;

        for (let i = 0; i <= bonusArray.length; i++) {
            if (bonusArray[i]) {
                if (bonusArray[i].id === this.id) {
                    bonusController.bonusesArray.splice(i, 1);
                }
            }
        }
    }
}