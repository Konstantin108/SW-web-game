import {config} from "../config/config.js";
import {game} from "../game.js";
import {renderer} from "../objects/renderer.js";
import {bonusController} from "../controllers/bonusController.js";
import {player} from "../objects/player.js";
import {cheatsController} from "../controllers/cheatsController.js";
import {helperController} from "../controllers/helperController.js";
import {touchController} from "../controllers/touchController.js";

export class Bonus {
    static #id = 0;
    static thisSelectorOverlay = [
        "enemyArrow"
    ];

    constructor(objectType, actionTime, x, y) {
        this.id = Bonus.#id++;
        this.objectType = objectType;
        this.actionTime = actionTime;
        this.selectorName = objectType.name;
        this.x = x;
        this.y = y;
        this.speed = config.bonuses.bonusSpeed;
        this.picked_x = null;
        this.picked_y = null;
        this.timerId = null;  // id таймера интервала для метода makeStep()
        this.timeBonusCanMakeStepTimerId = null;  // id таймера отсчёта времени до удаления interval для отключения makeStep()
    };

    #step() {
        if (!game.gameIsRunning) return;
        this.y += 1;
        if (this.y >= config.mapSizeY + 1) {
            renderer.clear(this.selectorName);
            this.remove();
        }
        this.getBonus(this.picked());
        renderer.clear(this.selectorName);
        renderer.renderMovingObjects(bonusController.bonusesArray, Bonus.thisSelectorOverlay);
        renderer.renderPlayer();

        if (helperController.randomEvent(60)) Bonus.#removeStuckBonus(bonusController.bonusesArray);
    };

    makeStep() {
        this.timerId = setInterval(() => this.#step(), this.speed);
    };

    makeStepOff() {
        this.timeBonusCanMakeStepTimerId = setTimeout(() => clearInterval(this.timerId), 30000);
    };

    picked() {
        let pickedBonus = null;

        if (player.x === this.x && player.y === this.y) {
            this.picked_x = this.x;
            this.picked_y = this.y;
            this.y = config.mapSizeY + 2;
            renderer.renderPickedBonus(this);
            pickedBonus = this;
            this.remove();
            return pickedBonus;
        }
        this.picked_x = null;
        this.picked_y = null;
    };

    getBonus(bonus) {
        if (bonus) {
            this.#setNewPropertiesForPlayer(bonus.objectType);
            renderer.renderPlayer();
        }
    };

    #setNewPropertiesForPlayer(bonus) {
        if (bonus.playerArrowType) {
            renderer.clear(player.selectorName);
            player.selectorName = bonus.playerOutlook;
            player.arrowType = bonus.playerArrowType;
            player.bonusObjectNewArrowType = bonus;
            player.bonusNewArrowTypeIsActivated = true;
            renderer.renderBonusBarElement("newArrowTypeBar", bonus, this.actionTime);
            Bonus.#newPropertiesForPlayerOffCallCancel(player.bonusNewArrowTypeIsActivatedTimerId, player.calculateTimeInBonusNewArrowTypeOffTimerId);
            this.#newPropertiesForPlayerOffCall(bonus);
            this.#calculateTimeInBonusOff(this.actionTime / 1000, "newArrowType");
            touchController.autoShootOn(true);
        }
        if (bonus.playerExtraOutlook) {
            player.extraSelectorName = bonus.playerExtraOutlook;
            player.bonusObjectShield = bonus;
            player.bonusShieldIsActivated = true;
            renderer.renderBonusBarElement("shieldBar", bonus, this.actionTime);
            Bonus.#newPropertiesForPlayerOffCallCancel(player.bonusShieldIsActivatedTimerId, player.calculateTimeInBonusShieldOffTimerId);
            this.#newPropertiesForPlayerOffCall(bonus);
            this.#calculateTimeInBonusOff(this.actionTime / 1000, "shield");
        }
        if (bonus.name === "life") bonusController.getLife();
        if (bonus.name === "killAll") bonusController.getBomb();
    };

    #newPropertiesForPlayerOff(bonus) {
        if (bonus.playerArrowType) {
            renderer.clear(player.selectorName);
            player.selectorName = "player";
            player.bonusObjectNewArrowType = null;
            player.arrowType = "arrow";
            player.bonusNewArrowTypeIsActivated = false;
            renderer.renderPlayer();
            renderer.renderBonusBarElement("newArrowTypeBar");
            setTimeout(() => renderer.renderBonusBarElement("newArrowTypeBar"), 700);
            cheatsController.activatedCheatsParamsDataTempArray.delete("drill");
            cheatsController.activatedCheatsParamsDataTempArray.delete("trinity");
            cheatsController.removeCheatNameFromGameConfig("getDrill");
            cheatsController.removeCheatNameFromGameConfig("getTrinity");
            touchController.autoShootOn(true);
        }
        if (bonus.playerExtraOutlook) {
            renderer.clear(player.extraSelectorName);
            player.extraSelectorName = null;
            player.bonusObjectShield = null;
            player.bonusShieldIsActivated = false;
            renderer.renderBonusBarElement("shieldBar");
            setTimeout(() => renderer.renderBonusBarElement("shieldBar"), 700);
            cheatsController.activatedCheatsParamsDataTempArray.delete("shield");
            cheatsController.removeCheatNameFromGameConfig("getShield");
        }
    };

    #newPropertiesForPlayerOffCall(bonus) {
        let timerId = setTimeout(() => this.#newPropertiesForPlayerOff(bonus), this.actionTime);
        bonus.playerArrowType
            ? player.bonusNewArrowTypeIsActivatedTimerId = timerId
            : player.bonusShieldIsActivatedTimerId = timerId;
    };

    static #newPropertiesForPlayerOffCallCancel(bonusIsActivatedTimerId, calculateTimeInBonusOffTimerId) {
        if (bonusIsActivatedTimerId) clearTimeout(bonusIsActivatedTimerId);
        if (calculateTimeInBonusOffTimerId) clearTimeout(calculateTimeInBonusOffTimerId);
    };

    #calculateTimeInBonusOff(bonusActionTime, calculateTimeInBonusOffType) {
        let calculateTimeInBonusOffTimerId = null;
        let tick = -1;

        if (!game.gameIsRunning) tick = 0;

        if (bonusActionTime > 0) {
            calculateTimeInBonusOffTimerId = setTimeout(() => {
                return this.#calculateTimeInBonusOff(bonusActionTime += tick, calculateTimeInBonusOffType);
            }, 1000);
        }
        if (calculateTimeInBonusOffType === "newArrowType") {
            player.calculateTimeInBonusNewArrowTypeOffTimerId = calculateTimeInBonusOffTimerId;
            player.calculateTimeInBonusNewArrowTypeOff = bonusActionTime;
        } else {
            player.calculateTimeInBonusShieldOffTimerId = calculateTimeInBonusOffTimerId;
            player.calculateTimeInBonusShieldOff = bonusActionTime;
        }
    };

    static #removeStuckBonus(bonusesArray) {
        for (let i = 0; i <= bonusesArray.length; i++) {
            if (bonusesArray[i]) {
                let lastBonusInArray = bonusesArray.at(-1);
                if (lastBonusInArray) {
                    if (lastBonusInArray.id - bonusesArray[i].id > 6) bonusController.bonusesArray.splice(i, 1);
                }
            }
        }
    };

    remove(forceRemove = false) {
        let bonusesArray = bonusController.bonusesArray;

        Bonus.#removeStuckBonus(bonusesArray);
        for (let i = 0; i <= bonusesArray.length; i++) {
            if (bonusesArray[i]) {
                if (bonusesArray[i].y >= config.mapSizeY + 1 || forceRemove) {
                    renderer.renderPickedBonus(bonusesArray[i], false);
                    bonusController.bonusesArray.splice(i, 1);
                }
            }
        }
    };
}