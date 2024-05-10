import {renderer} from "../objects/renderer.js";
import {config} from "../config/config.js";
import {localStorageController} from "./localStorageController.js";
import {player} from "../objects/player.js";
import {crashChecker} from "../objects/crashChecker.js";
import {helperController} from "./helperController.js";
import {progressController} from "./progressController.js";
import {boss} from "../objects/boss.js";
import {bonusController} from "./bonusController.js";
import {explosion} from "../objects/explosion.js";
import {game} from "../game.js";
import {debugPanel} from "../objects/debugPanel.js";
import {bonuses} from "../config/bonuses.js";
import {pause} from "../objects/pause.js";
import {tooltipController} from "./tooltipController.js";
import {audioController} from "./audioController.js";
import {templatePrinter} from "../objects/templatePrinter.js";

export const cheatsController = {
    cheats: config.cheats,
    cheatActiveStatus: config.cheatActiveStatus,
    translatedColorNames: config.translatedColorNames,
    bonusCodeNames: config.bonusCodeNames,
    gameControl: config.gameControl,
    cheatsInfinityActiveMode: "cheatsInfinityActiveMode",
    activatedCheatsParamsDataTempArray: new Map(),
    defaultConfigParamsArray: new Map(),
    playerCanCallCheatConsole: true,

    callCheatConsoleKeyDownHandler() {
        let showCheatConsoleBtn = helperController.getObjectByName(this.gameControl, "showCheatConsoleBtn").btns;

        document.addEventListener("keydown", function (event) {
            if (!cheatsController.playerCanCallCheatConsole) return;
            if (!showCheatConsoleBtn.includes(event.code)) return;
            cheatsController.callCheatConsole();
        });
    },

    callCheatConsole() {
        let mobileMode = helperController.isMobileDeviceCheck();

        this.playerCanCallCheatConsole = false;
        renderer.renderCheatConsole(mobileMode);
        cheatsController.inputCheat();
        setTimeout(() => this.playerCanCallCheatConsole = true, 500);
    },

    inputCheat() {
        let inputElement = document.querySelector("#cheatInput");
        let form = document.querySelector("#cheatConsole");
        let cheatMessageContainer = document.querySelector("#cheatMessageContainer");

        helperController.returnFormattedValue(inputElement);

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            let data = new FormData(this).get("cheatInput");
            if (data) cheatsController.matchPlayerInputAndCheatCode(data.toLowerCase(), cheatMessageContainer);
            this.reset();
        });
    },

    matchPlayerInputAndCheatCode(input, cheatMessageContainer = null) {
        let message = "incorrect";
        let messageColor = "cheatMessageRed";
        let soundEffectKey = "cheatInputIncorrect";
        let activatedCheat = null;
        let activatedCheatParam = null;
        let paramName = null;
        let removeNoteFromGameConfig = false;

        let compoundCode = input.split(":");
        let matchCheatObject = this.cheats.find((cheat) => cheat.code === compoundCode[0]);

        if (matchCheatObject) {

            if (matchCheatObject.debugTool && !config.debugMode) {
                if (cheatMessageContainer) renderer.renderCheatMessage(message, messageColor, cheatMessageContainer);
                return;
            }

            switch (matchCheatObject.type) {
                case "optionsCheat":
                    if (matchCheatObject.options.includes(compoundCode[1])) {
                        activatedCheat = matchCheatObject;
                        activatedCheatParam = compoundCode[1];
                        message = `${activatedCheat.message} ${activatedCheatParam}`;
                    }
                    break;
                case "simpleCheat":
                    if (compoundCode.length === 1) {
                        activatedCheat = matchCheatObject;
                        message = activatedCheat.message;
                    }
                    break;
                case "arbitaryValueCheat":
                    let count = Number(compoundCode[1]);
                    if (Number.isInteger(count) && count > 0) {
                        activatedCheat = matchCheatObject;
                        count <= activatedCheat.limit
                            ? activatedCheatParam = count
                            : activatedCheatParam = activatedCheat.limit;
                        message = `${activatedCheat.message} ${activatedCheatParam}`;
                    }
                    break;
                case "toggleCheat":
                    if (compoundCode.length === 1) {
                        activatedCheat = matchCheatObject;
                        if (!config[activatedCheat.paramName] || config[activatedCheat.paramName] === 1) {
                            activatedCheatParam = activatedCheat.toggleOptions[0];
                        } else {
                            activatedCheatParam = activatedCheat.toggleOptions[1];
                            removeNoteFromGameConfig = true;
                        }
                        message = `${activatedCheat.message}${activatedCheatParam}`;
                    }
                    break;
                default:
                    break;
            }

            paramName = matchCheatObject.paramName;

            this.editCheatNamesArrayInGameConfig(removeNoteFromGameConfig, matchCheatObject);

            if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) this.updateCheatNamesArrayInLocalStorageAfterCheatOn();
        }

        if (activatedCheat) {
            if (game.gameOver && !matchCheatObject.playerCanUseThisCheatAfterGameOver) {
                message = "you are dead";
            } else {
                messageColor = "cheatMessageGreen";
                soundEffectKey = "cheatInputCorrect";
                this.activateCheat(activatedCheat, activatedCheatParam, paramName);
                if (config.production) {
                    console.clear();
                    this.cheatsInfoForPlayer();
                }
            }
        }
        if (cheatMessageContainer) renderer.renderCheatMessage(message, messageColor, cheatMessageContainer);
        audioController.playSoundEffect(soundEffectKey);
        return message;
    },

    activateCheat(activatedCheat, activatedCheatParam = null, paramName = null) {
        switch (activatedCheat.code) {
            case "infinitum":
                this.toggleInfinityMode(paramName, activatedCheatParam)
                break;
            case "invulnerability":
                this.toggleInvincibility(paramName, activatedCheatParam)
                break;
            case "lux":
                this.colorChange(paramName, activatedCheatParam);
                break;
            case "aspirin":
                this.restoreLives(paramName);
                break;
            case "adderevitam":
                this.addLives(paramName, activatedCheatParam);
                break;
            case "adventusbulla":
                this.callBoss(paramName);
                break;
            case "auferspiritum":
                this.killBoss();
                break;
            case "terebro":
            case "dbgplrarrows":
            case "dbgenmarrows":
            case "dbgblockages":
            case "dbgbonuses":
            case "dbgbossinfo":
            case "dbgactual":
                this.standartToggleCheatAction(paramName, activatedCheatParam);
                break;
            case "dbginstant":
                this.toggleInstantStart(paramName, activatedCheatParam);
                break;
            case "dbgquickleave":
                this.toggleDisableConfirmToLeave(paramName, activatedCheatParam);
                break;
            case "respiceintus":
                this.toggleDebugMode(paramName, activatedCheatParam);
                break;
            case "utarmis":
            case "penetravit":
            case "trinitas":
                this.getBonusForArbitaryTime(paramName, activatedCheatParam);
                break;
            case "mortem":
                this.suicide(paramName);
                break;
            case "sagittapotens":
                this.togglePowerfulArrow(paramName, activatedCheatParam);
                break;
            case "magnusmico":
                this.explosion();
                break;
            case "fortuna":
                this.setBonusChance(paramName, activatedCheatParam);
                break;
            case "faculta":
                this.superAbilityIsAlwaysCharged(paramName, activatedCheatParam)
                break;
            case "avertas":
                this.offAllCheats();
                break;
            case "praemium":
                this.getSomeBonus(activatedCheatParam);
                break;
            default:
                break;
        }

        if (config.debugActualParamsInfoShow) debugPanel.objectsInfoShow("actualParamsInfo", [localStorage, config]);
    },

    editCheatNamesArrayInGameConfig(remove, cheat) {
        if (remove) {
            this.removeCheatNameFromGameConfig(cheat.name);
            this.updateCheatNamesArrayInLocalStorageAfterCheatOff();
        } else {
            if (cheat.needAddNoteToGameConfig) this.addCheatNameToGameConfig(cheat.name);
        }
    },

    addCheatNameToGameConfig(cheat) {
        helperController.addItemToArray(config.cheatsActivated, cheat);
    },

    removeCheatNameFromGameConfig(cheat) {
        config.cheatsActivated = helperController.removeItemFromArray(config.cheatsActivated, cheat);
    },

    updateCheatNamesArrayInLocalStorageAfterCheatOff() {
        if (!localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) return;
        if (!localStorage.cheatsActivated) return;
        localStorageController.setParamToLocalStorage("cheatsActivated", config.cheatsActivated, false);
    },

    updateCheatNamesArrayInLocalStorageAfterCheatOn() {
        let cheatsActivated = localStorageController.getParamFromLocalStorage("cheatsActivated");
        let activatedCheatNamesInLocalStorage = [];

        if (cheatsActivated) {
            cheatsActivated.split(",").forEach(cheatName => {
                helperController.addItemToArray(activatedCheatNamesInLocalStorage, cheatName);
            });
        }
        config.cheatsActivated.forEach(cheatName => helperController.addItemToArray(activatedCheatNamesInLocalStorage, cheatName));
        localStorageController.setParamToLocalStorage("cheatsActivated", activatedCheatNamesInLocalStorage, false);
    },

    saveDefaultConfigParams() {
        this.defaultConfigParamsArray.set("lives", config.lives);
        this.defaultConfigParamsArray.set("bonusChance", config.bonuses.bonusChance);
        this.defaultConfigParamsArray.set("power", config.power);
        this.defaultConfigParamsArray.set("startGameDelaySecondsCount", config.startGameDelaySecondsCount);
    },

    addOrRemoveParamsToLocalStorage(status, paramNamesArray, paramValuesArray = []) {
        if (!localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) return;

        status
            ? paramNamesArray.forEach((paramName, i) => localStorageController.setParamToLocalStorage(paramName, paramValuesArray[i] ?? status))
            : paramNamesArray.forEach((paramName, i) => localStorageController.removeParamFromLocalStorage(paramName, paramValuesArray[i] ?? status));
    },

    // методы запуска читов
    toggleInfinityMode(paramName, toggle) {
        if (!game.localStorageAvailable) {
            tooltipController.tooltipCreateAndDestroy(templatePrinter.localStorageUnavailableMessageTemplatePrint());
            return;
        }

        if (this.cheatActiveStatus[toggle]) {
            localStorageController.setParamToLocalStorage(paramName, true);

            this.updateCheatNamesArrayInLocalStorageAfterCheatOn();

            // добавление читов и их значений в localStorage
            let cheatsArray = [];
            config.cheatsActivated.forEach(cheatName => cheatsArray.push(helperController.getObjectByName(this.cheats, cheatName)));
            cheatsArray.forEach(item => {
                if (config.hasOwnProperty(item.paramName)) {
                    localStorageController.setParamToLocalStorage(item.paramName, config[item.paramName]);
                } else if (helperController.getObjectByName(config.bonuses.bonusTypes, item.paramName)) {
                    localStorageController.setParamToLocalStorage(item.paramName, this.activatedCheatsParamsDataTempArray.get(item.paramName), false);
                } else {
                    for (let key in config) {
                        if (config[key] instanceof Object && config[key].hasOwnProperty(item.paramName)) {
                            localStorageController.setParamToLocalStorage(item.paramName, config[key][item.paramName], false);
                        }
                    }
                }
            });

            for (let paramKey of this.defaultConfigParamsArray.keys()) {
                if (config.hasOwnProperty(String(paramKey)) && config[paramKey] !== this.defaultConfigParamsArray.get(paramKey)) {
                    localStorageController.setParamToLocalStorage(paramKey, config[paramKey], false);
                }
            }

        } else {
            localStorageController.removeParamFromLocalStorage(paramName, false);
            localStorageController.clearLocalStorage(["tips"]);
        }
    },

    toggleInvincibility(paramName, toggle) {
        if (this.cheatActiveStatus[toggle]) {
            player[paramName] = this.cheatActiveStatus[toggle];
            crashChecker.invincibilityOffCallCancel();
            renderer.renderPlayer();
        } else {
            crashChecker.invincibilityOff();
        }

        this.addOrRemoveParamsToLocalStorage(this.cheatActiveStatus[toggle], [paramName]);
        config[paramName] = this.cheatActiveStatus[toggle];
    },

    colorChange(paramName, color) {
        if (game.animationBan) return;

        localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)
            ? localStorageController.setParamToLocalStorage(paramName, color)
            : config[paramName] = color;
        renderer.renderStatusBar();
        renderer.renderSuperAbilityBar();
        renderer.renderSuperAbilityBarActivatedByCheat();
        renderer.renderPauseMenuOptions();
        renderer.renderPauseMenuSideBlocksBtn("back");
        renderer.renderPauseMenuSideBlocksBtn("cross");
        renderer.renderGameStopOrPlayBtnTemplatePrint(false, game.gameIsRunning);
        renderer.renderAudioControlBtnTemplatePrint();
        tooltipController.tooltipOnOrOff(false, false, true);
        tooltipController.tooltipsArray.forEach(tooltip => tooltip.show(false, true));
    },

    restoreLives(paramName) {
        player[paramName] = config[paramName];
        renderer.renderStatusBar();
    },

    addLives(paramName, livesCount) {
        localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)
            ? localStorageController.setParamToLocalStorage(paramName, livesCount)
            : config[paramName] = livesCount;
        player[paramName] = config[paramName];
        renderer.renderStatusBar();
    },

    callBoss(paramName) {
        if (game.animationBan) return;
        let delay = 0;

        game.playerCanStopGame = false;
        if (!game.gameIsRunning) {
            delay = 5000;
            pause.showOrHidePauseMenu(true);
        }
        if (progressController[paramName]) progressController[paramName] = false;
        setTimeout(() => game.playerCanStopGame = false, game.startGameDelaySecondsCount * 1000 - 2120);
        setTimeout(() => {
            progressController[paramName] = true;
            progressController.bossKilled = false;
            boss.anotherDestroyedReward = 10;
        }, delay);
    },

    killBoss() {
        if (game.animationBan) return;
        if (!boss.alive) return;
        let delay = 0;

        game.playerCanStopGame = false;
        if (!game.gameIsRunning) {
            delay = 5000;
            pause.showOrHidePauseMenu(true);
        }
        setTimeout(() => game.playerCanStopGame = false, game.startGameDelaySecondsCount * 1000 - 2120);
        setTimeout(() => {
            let hitCoordinates = {
                hit_x: boss.x,
                hit_y: boss.y
            }
            boss.lives = 0;
            progressController.killBoss(boss.destroyedReward, hitCoordinates);
        }, delay);
    },

    standartToggleCheatAction(paramName, toggle) {
        this.addOrRemoveParamsToLocalStorage(this.cheatActiveStatus[toggle], [paramName]);
        config[paramName] = this.cheatActiveStatus[toggle];
        return this.cheatActiveStatus[toggle];
    },

    toggleInstantStart(paramName, toggle) {
        let delay = null;

        this.cheatActiveStatus[toggle]
            ? delay = -1
            : delay = this.defaultConfigParamsArray.get("startGameDelaySecondsCount");

        this.addOrRemoveParamsToLocalStorage(
            this.cheatActiveStatus[toggle],
            [paramName, "startGameDelaySecondsCount"],
            [this.cheatActiveStatus[toggle], delay]
        );

        config[paramName] = this.cheatActiveStatus[toggle];
        config.startGameDelaySecondsCount = delay;
        game.startGameDelaySet();
    },

    toggleDisableConfirmToLeave(paramName, toggle) {
        config[paramName] = this.cheatActiveStatus[toggle];

        this.cheatActiveStatus[toggle]
            ? helperController.noConfirmToLeave()
            : helperController.confirmToLeave();

        this.addOrRemoveParamsToLocalStorage(this.cheatActiveStatus[toggle], [paramName]);
    },

    toggleDebugMode(paramName, toggle) {
        let debugPanelElement = null;
        let activatedCheat = null;

        debugPanel[paramName] = this.standartToggleCheatAction(paramName, toggle);
        if (debugPanel[paramName]) return;
        config.cheatsActivated.forEach(cheatName => {
            activatedCheat = helperController.getObjectByName(this.cheats, cheatName);
            if (activatedCheat.debugTool) {
                this.activateCheat(activatedCheat, "off", activatedCheat.paramName);
                this.editCheatNamesArrayInGameConfig(true, activatedCheat);
            }
        });
        debugPanelElement = document.querySelector("#debugPanel");
        if (debugPanelElement) renderer.renderDebugPanel();
    },

    getBonusForArbitaryTime(paramName, secondsCount) {
        if (paramName === "drill") {
            this.activatedCheatsParamsDataTempArray.delete("trinity");
            this.removeCheatNameFromGameConfig("getTrinity");
        }
        if (paramName === "trinity") {
            this.activatedCheatsParamsDataTempArray.delete("drill");
            this.removeCheatNameFromGameConfig("getDrill");
        }

        bonusController.playerBecomeBonus(paramName, secondsCount);
        this.activatedCheatsParamsDataTempArray.set(paramName, secondsCount);

        if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
            if (paramName === "drill") {
                localStorageController.removeParamFromLocalStorage("trinity");
                this.removeCheatNameFromGameConfig("getTrinity");
            }
            if (paramName === "trinity") {
                localStorageController.removeParamFromLocalStorage("drill");
                this.removeCheatNameFromGameConfig("getDrill");
            }
            this.updateCheatNamesArrayInLocalStorageAfterCheatOn();
            localStorageController.setParamToLocalStorage(paramName, secondsCount, false);
        }
    },

    suicide(paramName) {
        let delay = 0;

        if (!game.gameIsRunning) {
            delay = (game.startGameDelaySecondsCount + 1) * 1000;
            pause.showOrHidePauseMenu();
        }
        if (player.invincibility) player.invincibility = false;
        if (player.bonusShieldIsActivated) player.bonusShieldIsActivated = false;
        let hitData = [
            {
                x: player.x,
                y: player.y,
                crashDamage: config[paramName]
            }
        ];
        setTimeout(() => crashChecker.crashCheck(hitData), delay);
    },

    togglePowerfulArrow(paramName, toggle) {
        let multiplier = null;
        let status = null;

        if (toggle === 10) {
            multiplier = toggle;
            status = true;
        } else {
            multiplier = this.defaultConfigParamsArray.get(paramName);
            status = false;
        }

        this.addOrRemoveParamsToLocalStorage(status, [paramName], [multiplier]);
        config[paramName] = multiplier;
    },

    explosion() {
        if (game.gameIsRunning) explosion.explode();
    },

    setBonusChance(paramName, percent) {
        config.bonuses = bonuses.setBonusesParams(percent);
        if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
            localStorageController.setParamToLocalStorage(paramName, percent, false);
        }
    },

    superAbilityIsAlwaysCharged(paramName, toggle) {
        config[paramName] = this.cheatActiveStatus[toggle];

        if (this.cheatActiveStatus[toggle]) {
            player[paramName] = config[paramName];
            player.superAbilityStatusInit();
            renderer.renderSuperAbilityBarActivatedByCheat();
        }

        this.addOrRemoveParamsToLocalStorage(this.cheatActiveStatus[toggle], [paramName, "superAbilityIsActivated"]);
        config.superAbilityIsActivated = this.cheatActiveStatus[toggle];
    },

    offAllCheats() {
        let activatedCheat = null;

        config.cheatsActivated.forEach(cheatName => {
            activatedCheat = helperController.getObjectByName(this.cheats, cheatName);

            switch (activatedCheat.type) {
                case "toggleCheat":
                    this.activateCheat(activatedCheat, "off", activatedCheat.paramName);
                    break;
                case "optionsCheat":
                    this.activateCheat(activatedCheat, "viridis", activatedCheat.paramName);
                    break;
                case "arbitaryValueCheat":
                    if (activatedCheat.scope.includes("bonusController")) {
                        this.getBonusForArbitaryTime(activatedCheat.paramName, 0)
                    } else {
                        let param = this.defaultConfigParamsArray.get(activatedCheat.paramName);
                        this.activateCheat(activatedCheat, param, activatedCheat.paramName);
                    }
                    break;
                default:
                    break;
            }
        });
        config.cheatsActivated = [];
        config.paramsFromLocalStorage = [];
    },

    getSomeBonus(bonusName) {
        let bonus = null;

        switch (bonusName) {
            case "acus":
                bonus = helperController.getObjectByName(config.bonuses.bonusTypes, "drill");
                bonusController.playerBecomeBonus(bonus.name, bonus.actionTime / 1000);
                break;
            case "tribus":
                bonus = helperController.getObjectByName(config.bonuses.bonusTypes, "trinity");
                bonusController.playerBecomeBonus(bonus.name, bonus.actionTime / 1000);
                break;
            case "testa":
                bonus = helperController.getObjectByName(config.bonuses.bonusTypes, "shield");
                bonusController.playerBecomeBonus(bonus.name, bonus.actionTime / 1000);
                break;
            case "cor":
                bonusController.getLife();
                break;
            case "micare":
                bonusController.getBomb();
                break;
            case "radium":
                config.superAbilityIsActivated = true;
                player.superAbilityStatusInit();
                renderer.renderSuperAbilityBarActivatedByCheat(true);
                break;
            default:
                break;
        }
    },

    cheatsInfoForPlayer() {
        let cheatsInfoObject = {};
        let infoArray = null;
        let cheatActivated = " [активирован]";
        let code = "";

        this.cheats.forEach(cheat => {
            if (!cheat.debugTool) {
                switch (cheat.type) {
                    case "toggleCheat":
                    case "simpleCheat":
                        code = cheat.code;
                        if (config.cheatsActivated.includes(cheat.name)) code += cheatActivated;
                        cheatsInfoObject[code] = cheat.descriptionForPlayer;
                        break;
                    case "optionsCheat":
                        cheat.options.forEach(option => {
                            code = `${cheat.code}:${option}`;
                            if (config.cheatsActivated.includes(cheat.name)) {
                                if (config[cheat.paramName] === option) code += cheatActivated;
                            }
                            infoArray = this[cheat.optionsInfo];
                            cheatsInfoObject[code] = `${cheat.descriptionForPlayer} (${infoArray[option]})`;
                        });
                        break;
                    case "arbitaryValueCheat":
                        code = `${cheat.code}:${cheat.limit}`;
                        if (config.cheatsActivated.includes(cheat.name)) {
                            if (cheat.paramName === "drill" || cheat.paramName === "trinity") {
                                if (this.activatedCheatsParamsDataTempArray.get(cheat.paramName)) code += cheatActivated;
                            } else {
                                code += cheatActivated;
                            }
                        }
                        cheatsInfoObject[code] = cheat.descriptionForPlayer;
                        break;
                }
            }
        });

        console.log("Нажми клавишу ~ для вызова меню ввода читов");
        console.table(cheatsInfoObject);
    }
};