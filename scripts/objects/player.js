import {config} from "../config/config.js";
import {helperController} from "../controllers/helperController.js";
import {bonusController} from "../controllers/bonusController.js";
import {crashChecker} from "./crashChecker.js";
import {blockageController} from "../controllers/blockageController.js";
import {renderer} from "./renderer.js";
import {explosion} from "./explosion.js";
import {progressController} from "../controllers/progressController.js";
import {arrowController} from "../controllers/arrowController.js";
import {game} from "../game.js";
import {boss} from "./boss.js";

export const player = {
    lives: config.lives,
    invincibility: config.invincibility,
    invincibilityTimerId: null,  // id таймера до окончания действия неуязвимости
    timeInInvincibilityOffTimerId: null,  // id таймера delay в методе calculateTimeInInvincibilityOff()
    timeInInvincibilityOff: null,  // сюда записывается цифра - количество секунд до окончания неуязвимости
    x: helperController.getCenterMapOnX(),
    y: config.mapSizeY,
    selectorName: "player",
    extraSelectorName: null,
    arrowType: "arrow",
    canMove: true,
    bombsCount: config.startBombsCount,
    superAbilityDamage: config.superAbilityDamage,
    superAbilityIsActivated: config.superAbilityIsActivated,
    bonusNewArrowTypeIsActivated: config.bonusNewArrowTypeIsActivated,
    bonusShieldIsActivated: config.bonusShieldIsActivated,
    bonusNewArrowTypeIsActivatedTimerId: null,  // id таймера, который отменит действие бонуса усиление оружия
    bonusShieldIsActivatedTimerId: null,  // id таймера, который отменит действие бонуса щит
    calculateTimeInBonusNewArrowTypeOff: null,  // сюда записывается цифра - количество секунд до окончания действия бонуса усиление оружия
    calculateTimeInBonusShieldOff: null,  // сюда записывается цифра - количество секунд до окончания действия бонуса щит
    calculateTimeInBonusNewArrowTypeOffTimerId: null,  // id таймера delay в методе calculateTimeInBonusOff() для бонуса усиление оружия
    calculateTimeInBonusShieldOffTimerId: null,  // id таймера delay в методе calculateTimeInBonusOff() для бонуса щит
    bonusObjectNewArrowType: null,  // данные подобраного бонуса усиление оружия для возобновления действия после снятия игры с паузы
    bonusObjectShield: null,  // данные подобраного бонуса щит для возобновления действия после снятия игры с паузы,

    move() {
        let possibleDirections = [
            "Numpad4",
            "Numpad6",
            "Numpad2",
            "Numpad8",
            "Numpad7",
            "Numpad9",
            "Numpad1",
            "Numpad3",
            "ArrowLeft",
            "ArrowRight",
            "ArrowDown",
            "ArrowUp",
            "KeyA",
            "KeyD",
            "KeyS",
            "KeyW"
        ];

        document.addEventListener("keydown", function (event) {
            if (!game.gameIsRunning) return;
            if (!player.canMove) return;
            let x_value = player.x;
            let y_value = player.y;
            if (!possibleDirections.includes(event.code)) return;
            switch (event.code) {
                case possibleDirections[0]:
                case possibleDirections[8]:
                case possibleDirections[12]:
                    x_value += -1;
                    break;
                case possibleDirections[1]:
                case possibleDirections[9]:
                case possibleDirections[13]:
                    x_value += 1;
                    break;
                case possibleDirections[2]:
                case possibleDirections[10]:
                case possibleDirections[14]:
                    y_value += 1;
                    break;
                case possibleDirections[3]:
                case possibleDirections[11]:
                case possibleDirections[15]:
                    y_value += -1;
                    break;
                case possibleDirections[4]:
                    x_value += -1;
                    y_value += -1;
                    break;
                case possibleDirections[5]:
                    x_value += 1;
                    y_value += -1;
                    break;
                case possibleDirections[6]:
                    x_value += -1;
                    y_value += 1;
                    break;
                case possibleDirections[7]:
                    x_value += 1;
                    y_value += 1;
                    break;
                default:
                    break;
            }
            if (x_value <= config.mapSizeX && y_value <= config.mapSizeY && x_value >= 0 && y_value >= 0) {
                player.x = x_value;
                player.y = y_value;
            } else {
                x_value = player.x;
                y_value = player.y;
                player.x = x_value;
                player.y = y_value
            }
            bonusController.pickedCheck();
            crashChecker.crashCheck(blockageController.blockagesArray, true);
            crashChecker.crashCheck(boss.bodyCellsArrayForCrashChecker(boss.bodyX, boss.y, boss.crashDamage));
            crashChecker.crashCheck(boss.bodyCellsArrayForCrashChecker(boss.shieldBody.x, boss.shieldBody.y, boss.shieldCrashDamage));
            if (player.invincibility) renderer.clear("invincibility");
            renderer.clear(player.selectorName);
            if (player.extraSelectorName) renderer.clear(player.extraSelectorName);
            renderer.renderPlayer();
        });
    },

    shoot() {
        let shootBtnsArray = [
            "Space",
            "Numpad5",
            "Numpad0",
        ];
        let isPressBtn = false;

        document.addEventListener("keydown", function (event) {
            if (!game.gameIsRunning) return;
            if (!player.canMove) return;
            if (isPressBtn) return;
            if (!shootBtnsArray.includes(event.code)) return;
            arrowController.arrowCreate();
            arrowController.arrowMove();
            isPressBtn = true;
        });
        document.addEventListener("keyup", function (event) {
            if (shootBtnsArray.includes(event.code)) isPressBtn = false;
        });
    },

    offBonusNewArrowType() {
        renderer.clear(this.selectorName);
        this.selectorName = "player";
        this.arrowType = "arrow";
        this.bonusNewArrowTypeIsActivated = false;
        renderer.renderPlayer();
        renderer.renderBonusBarElement("newArrowTypeBar");
    },

    offBonusShield() {
        renderer.clear(this.extraSelectorName);
        this.extraSelectorName = null;
        this.bonusShieldIsActivated = false;
        renderer.renderBonusBarElement("shieldBar");
    },

    offBonusCall() {
        if (this.bonusObjectNewArrowType) this.bonusNewArrowTypeIsActivatedTimerId = setTimeout(() => this.offBonusNewArrowType(), this.calculateTimeInBonusNewArrowTypeOff * 1000);
        if (this.bonusObjectShield) this.bonusShieldIsActivatedTimerId = setTimeout(() => this.offBonusShield(), this.calculateTimeInBonusShieldOff * 1000);
    },

    useBomb() {
        let useBombBtn = "ControlRight";
        let isPressBtn = false;

        document.addEventListener("keydown", function (event) {
            if (!game.gameIsRunning) return;
            if (!player.canMove) return;
            if (isPressBtn) return;
            if (event.code !== useBombBtn) return;
            explosion.explosionCall();
            isPressBtn = true;
        });
        document.addEventListener("keyup", function (event) {
            if (event.code === useBombBtn) isPressBtn = false;
        });
    },

    useSuperAbility() {
        let blockagesArray = blockageController.blockagesArray;
        let useSuperAbilityBtn = "ControlLeft";
        let isPressBtn = false;

        document.addEventListener("keydown", function (event) {
            if (!game.gameIsRunning) return;
            if (!player.canMove) return;
            if (isPressBtn) return;
            if (event.code !== useSuperAbilityBtn) return;
            if (player.superAbilityIsActivated) {
                for (let i = 0; i < blockagesArray.length; i++) {
                    if (blockagesArray[i].x === player.x && blockagesArray[i].y < player.y && blockagesArray[i].y >= 0 ||
                        blockagesArray[i].x === player.x - 1 && blockagesArray[i].y < player.y - 1 && blockagesArray[i].y >= 0 ||
                        blockagesArray[i].x === player.x - 2 && blockagesArray[i].y < player.y - 2 && blockagesArray[i].y >= 0 ||
                        blockagesArray[i].x === player.x + 1 && blockagesArray[i].y < player.y - 1 && blockagesArray[i].y >= 0 ||
                        blockagesArray[i].x === player.x + 2 && blockagesArray[i].y < player.y - 2 && blockagesArray[i].y >= 0) {
                        progressController.killEnemy(blockagesArray[i], i, blockagesArray[i].shipDestroyedReward, -3);
                        renderer.renderStatusBar();
                    }
                }
                if (progressController.bossExist) {
                    if (boss.bodyX.includes(player.x) ||
                        boss.bodyX.includes(player.x - 1) ||
                        boss.bodyX.includes(player.x - 2) ||
                        boss.bodyX.includes(player.x + 1) ||
                        boss.bodyX.includes(player.x + 2)) {
                        boss.getDamage(player.superAbilityDamage, true);
                    }
                }
                if (boss.shieldBody.x.length) boss.bossShieldGetDamage(true);
                if (!config.superAbilityIsAlwaysCharged) {
                    player.superAbilityIsActivated = false;
                    renderer.renderSuperAbilityBar();
                }
                renderer.renderSuperAbility();
            } else {
                renderer.renderSuperAbilityBar(player.superAbilityIsActivated);
            }
            isPressBtn = true;
        });
        document.addEventListener("keyup", function (event) {
            if (event.code === useSuperAbilityBtn) isPressBtn = false;
        });
    }
}