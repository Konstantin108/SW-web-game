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
import {touchController} from "../controllers/touchController.js";

export const player = {
    lives: config.lives,
    invincibility: config.invincibility,
    gameControl: config.gameControl,
    invincibilityTimerId: null,  // id таймера до окончания действия неуязвимости
    timeInInvincibilityOffTimerId: null,  // id таймера delay в методе calculateTimeInInvincibilityOff()
    timeInInvincibilityOff: null,  // сюда записывается цифра - количество секунд до окончания неуязвимости
    x: helperController.getCenterMapOnAxis(config.mapSizeX),
    y: config.mapSizeY,
    x_current: null,
    y_current: null,
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

    moveKeyDownHandler() {
        let possibleDirections = helperController.getObjectByName(this.gameControl, "possibleDirections").btns;
        this.x_current = this.x;
        this.y_current = this.y;

        document.addEventListener("keydown", function (event) {
            if (!game.gameIsRunning) return;
            if (!player.canMove) return;
            if (!possibleDirections.includes(event.code)) return;
            switch (event.code) {
                case possibleDirections[0]:
                case possibleDirections[8]:
                case possibleDirections[12]:
                    player.setDirection("left");
                    break;
                case possibleDirections[1]:
                case possibleDirections[9]:
                case possibleDirections[13]:
                    player.setDirection("right");
                    break;
                case possibleDirections[2]:
                case possibleDirections[10]:
                case possibleDirections[14]:
                    player.setDirection("down");
                    break;
                case possibleDirections[3]:
                case possibleDirections[11]:
                case possibleDirections[15]:
                    player.setDirection("up");
                    break;
                case possibleDirections[4]:
                    player.setDirection("left");
                    player.setDirection("up");
                    break;
                case possibleDirections[5]:
                    player.setDirection("right");
                    player.setDirection("up");
                    break;
                case possibleDirections[6]:
                    player.setDirection("left");
                    player.setDirection("down");
                    break;
                case possibleDirections[7]:
                    player.setDirection("right");
                    player.setDirection("down");
                    break;
                default:
                    break;
            }
            player.move();
        });
    },

    setDirection(direction) {
        switch (direction) {
            case "left":
                this.x_current += -1;
                break;
            case "right":
                this.x_current += 1;
                break;
            case "down":
                this.y_current += 1;
                break;
            case "up":
                this.y_current += -1;
                break;
            default:
                break
        }
    },

    move() {
        if (this.x_current <= config.mapSizeX && this.y_current <= config.mapSizeY && this.x_current >= 0 && this.y_current >= 0) {
            player.x = this.x_current;
            player.y = this.y_current;
        } else {
            this.x_current = player.x;
            this.y_current = player.y;
        }
        bonusController.pickedCheck();
        crashChecker.crashCheck(blockageController.blockagesArray, true);
        crashChecker.crashCheck(boss.bodyCellsArrayForCrashChecker(boss.bodyX, boss.y, boss.crashDamage));
        crashChecker.crashCheck(boss.bodyCellsArrayForCrashChecker(boss.shieldBody.x, boss.shieldBody.y, boss.shieldCrashDamage));
        if (player.invincibility) renderer.clear("invincibility");
        renderer.clear(player.selectorName);
        if (player.extraSelectorName) renderer.clear(player.extraSelectorName);
        renderer.renderPlayer();
    },

    shootKeyDownHandler() {
        let shootBtnsArray = helperController.getObjectByName(this.gameControl, "shootBtnsArray").btns;
        let isPressBtn = false;

        document.addEventListener("keydown", function (event) {
            if (isPressBtn) return;
            if (touchController.autoShootIsOnNow) return;
            if (!shootBtnsArray.includes(event.code)) return;
            player.shoot();
            isPressBtn = true;
        });
        document.addEventListener("keyup", function (event) {
            if (shootBtnsArray.includes(event.code)) isPressBtn = false;
        });
    },

    shoot() {
        if (!game.gameIsRunning) return;
        if (!player.canMove) return;
        arrowController.arrowCreate();
        arrowController.arrowMove();
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
        if (this.bonusObjectNewArrowType) {
            this.bonusNewArrowTypeIsActivatedTimerId = setTimeout(() => this.offBonusNewArrowType(), this.calculateTimeInBonusNewArrowTypeOff * 1000);
        }
        if (this.bonusObjectShield) {
            this.bonusShieldIsActivatedTimerId = setTimeout(() => this.offBonusShield(), this.calculateTimeInBonusShieldOff * 1000);
        }
    },

    useBombKeyDownHandler() {
        let useBombBtn = helperController.getObjectByName(this.gameControl, "useBombBtn").btns;
        let isPressBtn = false;

        document.addEventListener("keydown", function (event) {
            if (isPressBtn) return;
            if (!useBombBtn.includes(event.code)) return;
            explosion.explosionCall();
            isPressBtn = true;
        });
        document.addEventListener("keyup", function (event) {
            if (useBombBtn.includes(event.code)) isPressBtn = false;
        });
    },

    useBombClickHandler() {
        let bombBar = document.querySelector("#bombBar");
        if (bombBar) bombBar.addEventListener("click", () => explosion.explosionCall());
    },

    superAbilityStatusInit() {
        if (config.superAbilityIsAlwaysCharged) {
            config.superAbilityIsActivated = config.superAbilityIsAlwaysCharged;
            this.superAbilityIsActivated = config.superAbilityIsAlwaysCharged;
        } else {
            this.superAbilityIsActivated = config.superAbilityIsActivated;
        }
    },

    useSuperAbilityKeyDownHandler() {
        let useSuperAbilityBtn = helperController.getObjectByName(this.gameControl, "useSuperAbilityBtn").btns;
        let isPressBtn = false;

        document.addEventListener("keydown", function (event) {
            if (isPressBtn) return;
            if (!useSuperAbilityBtn.includes(event.code)) return;
            player.useSuperAbility();
            isPressBtn = true;
        });
        document.addEventListener("keyup", function (event) {
            if (useSuperAbilityBtn.includes(event.code)) isPressBtn = false;
        });
    },

    useSuperAbilityClickHandler() {
        let lightningElementContainer = document.querySelector("#lightningElementContainer");
        if (lightningElementContainer) lightningElementContainer.addEventListener("click", () => this.useSuperAbility());
    },

    useSuperAbility() {
        if (!game.gameIsRunning) return;
        if (!player.canMove) return;
        let blockagesArray = blockageController.blockagesArray;

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
    }
};