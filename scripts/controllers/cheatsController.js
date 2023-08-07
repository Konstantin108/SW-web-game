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

export const cheatsController = {
    cheats: config.cheats,
    cheatsInfinityActiveMode: "cheatsInfinityActiveMode",
    activatedCheatsParamsDataTempArray: new Map(),

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

    matchPlayerInputAndCheatCode(input, cheatMessageContainer) {
        let message = "incorrect";
        let messageColor = "cheatMessageRed";
        let activatedCheat = null;
        let activatedCheatParam = null;
        let paramName = null;
        let removeNoteFromGameConfig = false;

        let compoundCode = input.split(":");
        let matchCheatObject = this.cheats.find((cheat) => cheat.code === compoundCode[0]);

        if (matchCheatObject) {
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
        renderer.renderCheatMessage(message, messageColor, cheatMessageContainer)
        this.activateCheat(activatedCheat, activatedCheatParam, paramName);
    },

    activateCheat(activatedCheat, activatedCheatParam = null, paramName = null) {
        if (!activatedCheat) return;

        switch (activatedCheat.code) {
            case "infinitum":
                this.toggleInfinityActiveMode(paramName, activatedCheatParam)
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
                this.toggleArrowPenetration(paramName, activatedCheatParam);
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
            default:
                break;
        }
        console.log(localStorage);  // отладка
        console.log(config);
    },

    editCheatNamesArrayInGameConfig(remove, cheat) {
        if (remove) {
            this.removeCheatNameFromGameConfig(cheat.name);
            this.updateCheatNamesArrayInLocalStorageAfterCheatOff();
        } else {
            if (cheat.type !== "simpleCheat") this.addCheatNameToGameConfig(cheat.name);
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

    toggleInfinityActiveMode(paramName, toggle) {
        if (toggle === "on") {
            localStorageController.setParamToLocalStorage(paramName, toggle);

            this.updateCheatNamesArrayInLocalStorageAfterCheatOn();

            // добавление читов и их значений в localStorage
            let cheatsArray = [];
            config.cheatsActivated.forEach(cheatName => {
                cheatsArray.push(config.cheats.find(elem => elem.name === cheatName));
            });
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
        } else {
            toggle = false;
            localStorageController.removeParamFromLocalStorage(paramName, toggle);
            localStorageController.clearLocalStorage();
        }
    },

    toggleInvincibility(paramName, toggle) {
        if (toggle === "on") {
            config[paramName] = true;
            if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
                localStorageController.setParamToLocalStorage(paramName, toggle);
            }
            player[paramName] = config[paramName];
            crashChecker.invincibilityOffCallCancel();
            renderer.renderPlayer();
        } else {
            toggle = false;
            if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
                localStorageController.removeParamFromLocalStorage(paramName, toggle);
            }
            config[paramName] = toggle;
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

    toggleArrowPenetration(paramName, toggle) {
        if (toggle === "on") {
            config[paramName] = true;
            if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
                localStorageController.setParamToLocalStorage(paramName, toggle);
            }
        } else {
            toggle = false;
            if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
                localStorageController.removeParamFromLocalStorage(paramName, toggle);
            }
            config[paramName] = toggle;
        }
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
        let hitData = [
            {
                x: player.x,
                y: player.y,
                crashDamage: config[paramName]
            }
        ];
        crashChecker.crashCheck(hitData);
    },

    togglePowerfulArrow(paramName, toggle) {
        if (toggle === 10) {
            config[paramName] = toggle;
            if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
                localStorageController.setParamToLocalStorage(paramName, toggle);
            }
        } else {
            toggle = 1;
            if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
                localStorageController.removeParamFromLocalStorage(paramName, toggle);
            }
            config[paramName] = toggle;
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
        if (toggle === "on") {
            config[paramName] = true;
            config["superAbilityIsActivated"] = true;
            if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
                localStorageController.setParamToLocalStorage(paramName, toggle);
                localStorageController.setParamToLocalStorage("superAbilityIsActivated", toggle);
            }
            player[paramName] = config[paramName];
            player.superAbilityStatusInit();
            renderer.renderSuperAbilityBarActivatedByCheat();
        } else {
            toggle = false;
            if (localStorageController.checkParamInLocalStorage(this.cheatsInfinityActiveMode)) {
                localStorageController.removeParamFromLocalStorage(paramName, toggle);
                localStorageController.removeParamFromLocalStorage("superAbilityIsActivated", toggle);
            }
            config[paramName] = toggle;
            config["superAbilityIsActivated"] = toggle;
        }
    },

    offAllCheats() {
        console.log("turn off all cheats");
    }
}