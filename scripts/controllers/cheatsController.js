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
import {bonuses} from "../config/bonuses.js";
import {debugPanel} from "../objects/debugPanel.js";

export const cheatsController = {
    cheats: config.cheats,
    cheatsInfinityActiveMode: "cheatsInfinityActiveMode",
    activatedCheatsParamsDataTempArray: new Map(),
    defaultConfigParamsArray: new Map(),

    callCheatConsole() {
        let showCheatConsoleBtn = "Backquote";
        let playerCanCallCheatConsole = true;

        document.addEventListener("keydown", function (event) {
            if (!playerCanCallCheatConsole) return;
            if (showCheatConsoleBtn !== event.code) return;
            playerCanCallCheatConsole = false;
            renderer.renderCheatConsole();
            cheatsController.inputCheat();
            setTimeout(() => playerCanCallCheatConsole = true, 500);
        });
    },

    inputCheat() {
        let inputElement = document.querySelector("#cheatInput");
        let form = document.querySelector("#cheatConsole");
        let cheatMessageContainer = document.querySelector("#cheatMessageContainer");

        helperController.returnFormattedValue(inputElement);

        form.addEventListener("submit", function (event) {
            event.preventDefault();
            let data = new FormData(this);
            let value = data.get("cheatInput");

            if (!value) return;
            cheatsController.matchPlayerInputAndCheatCode(value.toLowerCase(), cheatMessageContainer);
            this.reset();
        });
    },

    matchPlayerInputAndCheatCode(input, cheatMessageContainer = null) {
        let message = "incorrect";
        let messageColor = "cheatMessageRed";
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
                        count <= activatedCheat.limit ? activatedCheatParam = count : activatedCheatParam = activatedCheat.limit;
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

        if (activatedCheat) messageColor = "cheatMessageGreen";
        if (cheatMessageContainer) renderer.renderCheatMessage(message, messageColor, cheatMessageContainer);
        if (!activatedCheat) return;
        this.activateCheat(activatedCheat, activatedCheatParam, paramName);
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

        if (!config.debugActualParamsInfoShow) return;
        console.log("actual params in config and localStorage:");
        console.log(localStorage);
        console.log(config);
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
        let activatedCheatNamesInLocalStorage = [];

        if (localStorage.cheatsActivated) {
            localStorageController.getParamFromLocalStorage("cheatsActivated").split(",").forEach(cheatName => {
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

    // методы запуска читов
    toggleInfinityMode(paramName, toggle) {
        if (toggle === "on") {
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
                if (config.hasOwnProperty(paramKey) && config[paramKey] !== this.defaultConfigParamsArray.get(paramKey)) {
                    localStorageController.setParamToLocalStorage(paramKey, config[paramKey], false);
                }
            }

        } else {
            localStorageController.removeParamFromLocalStorage(paramName, false);
            localStorageController.clearLocalStorage();
        }
        let btnsBlockRefreshed = renderer.refreshDebugPanelBtnsBlock();
        if (btnsBlockRefreshed) debugPanel.clickOnDebugPanelElementBtn();
    },

    toggleInvincibility(paramName, toggle) {
        let status = null;

        if (toggle === "on") {
            status = true;
            config[paramName] = status;
            if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
                localStorageController.setParamToLocalStorage(paramName, status);
            }
            player[paramName] = config[paramName];
            crashChecker.invincibilityOffCallCancel();
            renderer.renderPlayer();
        } else {
            status = false;
            if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
                localStorageController.removeParamFromLocalStorage(paramName, status);
            }
            config[paramName] = status;
            crashChecker.invincibilityOff();
        }
    },

    colorChange(paramName, color) {
        if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
            localStorageController.setParamToLocalStorage(paramName, color);
        } else {
            config[paramName] = color;
        }
        renderer.renderStatusBar();
        renderer.renderSuperAbilityBar();
        renderer.renderSuperAbilityBarActivatedByCheat();
    },

    restoreLives(paramName) {
        player[paramName] = config[paramName];
        renderer.renderStatusBar();
    },

    addLives(paramName, livesCount) {
        if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
            localStorageController.setParamToLocalStorage(paramName, livesCount);
        } else {
            config[paramName] = livesCount;
        }
        player[paramName] = config[paramName];
        renderer.renderStatusBar();
    },

    callBoss(paramName) {
        progressController[paramName] = true;
        progressController.bossKilled = false;
        boss.anotherDestroyedReward = 10;
    },

    killBoss() {
        if (!boss.alive) return;

        let hitCoordinates = {
            hit_x: boss.x,
            hit_y: boss.y
        }
        boss.lives = 0;
        progressController.killBoss(boss.destroyedReward, hitCoordinates);
    },

    standartToggleCheatAction(paramName, toggle) {
        let status = null;

        if (toggle === "on") {
            status = true;
            config[paramName] = status;
            if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
                localStorageController.setParamToLocalStorage(paramName, status);
            }
        } else {
            status = false;
            if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
                localStorageController.removeParamFromLocalStorage(paramName, status);
            }
            config[paramName] = status;
        }
        let btnsBlockRefreshed = renderer.refreshDebugPanelBtnsBlock();
        if (btnsBlockRefreshed) debugPanel.clickOnDebugPanelElementBtn();
        return status;
    },

    toggleInstantStart(paramName, toggle) {
        let status = null;
        let delay = null;

        if (toggle === "on") {
            status = true;
            delay = -1;

            config[paramName] = status;
            config["startGameDelaySecondsCount"] = delay;
            if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
                localStorageController.setParamToLocalStorage(paramName, status);
                localStorageController.setParamToLocalStorage("startGameDelaySecondsCount", delay);
            }
        } else {
            status = false;
            delay = this.defaultConfigParamsArray.get("startGameDelaySecondsCount");

            if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
                localStorageController.removeParamFromLocalStorage(paramName, status);
                localStorageController.removeParamFromLocalStorage("startGameDelaySecondsCount", delay);
            }
            config[paramName] = status;
            config["startGameDelaySecondsCount"] = delay;
        }
        game.startGameDelaySet();
        let btnsBlockRefreshed = renderer.refreshDebugPanelBtnsBlock();
        if (btnsBlockRefreshed) debugPanel.clickOnDebugPanelElementBtn();
    },

    toggleDebugMode(paramName, toggle) {
        debugPanel[paramName] = this.standartToggleCheatAction(paramName, toggle);
        if (debugPanel[paramName]) return;
        let debugPanelElement = document.querySelector("#debugPanel");
        if (!debugPanelElement) return;
        renderer.renderDebugPanel();
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
        if (player.invincibility) player.invincibility = false;

        let hitData = [
            {
                x: player.x,
                y: player.y,
                crashDamage: config[paramName]
            }
        ];
        crashChecker.crashCheck(hitData);
        // если перезапуск игры будет без перезагрузки страницы,
        // то возвращать player.invincibility = true,
        // если player.invincibility был установлен читом toggleInvincibility()
    },

    togglePowerfulArrow(paramName, toggle) {
        let multiplier = null;

        if (toggle === 10) {
            multiplier = toggle
            config[paramName] = multiplier;
            if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
                localStorageController.setParamToLocalStorage(paramName, multiplier);
            }
        } else {
            multiplier = this.defaultConfigParamsArray.get(paramName);
            if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
                localStorageController.removeParamFromLocalStorage(paramName, multiplier);
            }
            config[paramName] = multiplier;
        }
    },

    explosion() {
        if (game.gameIsRunning) explosion.explode();
    },

    setBonusChance(paramName, percent) {
        config["bonuses"] = bonuses.setBonusesParams(percent);
        if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
            localStorageController.setParamToLocalStorage(paramName, percent, false);
        }
    },

    superAbilityIsAlwaysCharged(paramName, toggle) {
        let status = null;

        if (toggle === "on") {
            status = true;
            config[paramName] = status;
            config["superAbilityIsActivated"] = status;
            if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
                localStorageController.setParamToLocalStorage(paramName, status);
                localStorageController.setParamToLocalStorage("superAbilityIsActivated", status);
            }
            player[paramName] = config[paramName];
            player.superAbilityStatusInit();
            renderer.renderSuperAbilityBarActivatedByCheat();
        } else {
            status = false;
            if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
                localStorageController.removeParamFromLocalStorage(paramName, status);
                localStorageController.removeParamFromLocalStorage("superAbilityIsActivated", status);
            }
            config[paramName] = status;
            config["superAbilityIsActivated"] = status;
        }
    },

    offAllCheats() {
        config.cheatsActivated.forEach(cheatName => {
            let activatedCheat = helperController.getObjectByName(this.cheats, cheatName);

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
                config["superAbilityIsActivated"] = true;
                player.superAbilityStatusInit();
                renderer.renderSuperAbilityBarActivatedByCheat(true);
                break;
            default:
                break;
        }
    }
}