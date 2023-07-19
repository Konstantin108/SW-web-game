import {renderer} from "../objects/renderer.js";
import {config} from "../config/config.js";
import {localStorageController} from "./localStorageController.js";
import {player} from "../objects/player.js";
import {crashChecker} from "../objects/crashChecker.js";
import {helperController} from "./helperController.js";
import {progressController} from "./progressController.js";
import {boss} from "../objects/boss.js";
import {bonusController} from "./bonusController.js";

export const cheatsController = {
    cheats: config.cheats,
    cheatsInfinityActiveMode: "cheatsInfinityActiveMode",
    inputElement: null,
    activatedCheatsParamsDataTempArray: new Map(),

    callCheatConsole() {
        let showCheatConsoleBtn = "Backquote";
        let playerCanCallCheatConsole = true;

        document.addEventListener("keydown", function (event) {
            if (!playerCanCallCheatConsole) return;
            if (showCheatConsoleBtn === event.code) {
                playerCanCallCheatConsole = false;
                renderer.renderCheatConsole();
                setTimeout(() => playerCanCallCheatConsole = true, 500);
                cheatsController.inputElement = null;
            }
        });
    },

    // вешать слушатель события на Enter по событию focused на input,
    // focused на input вешать при нажатии ~
    inputCheat() {
        let inputCheatBtns = [
            "Enter",
            "NumpadEnter"
        ];
        let isPressBtn = false;

        document.body.addEventListener("click", function (event) {
            if (event.target.id !== "cheatInput") return;
            if (cheatsController.inputElement) return;
            cheatsController.inputElement = event.target;
            let cheatMessageContainer = cheatsController.inputElement.closest("#cheatConsole").querySelector("#cheatMessageContainer");
            cheatsController.inputElement.addEventListener("keydown", function (event) {
                if (isPressBtn) return;
                if (inputCheatBtns.includes(event.code)) {
                    if (cheatsController.inputElement.value) {
                        cheatsController.matchPlayerInputAndCheatCode(cheatsController.inputElement.value.trim().toLowerCase(), cheatMessageContainer);
                        cheatsController.inputElement.value = "";
                    }
                    isPressBtn = true;
                }
            });
            cheatsController.inputElement.addEventListener("keyup", function (event) {
                if (inputCheatBtns.includes(event.code)) isPressBtn = false;
            });
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
                            activatedCheatParam = activatedCheat.toggleMessages[0];
                        } else {
                            activatedCheatParam = activatedCheat.toggleMessages[1];
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
            if (cheat.addNoteToGameConfig) this.addCheatNameToGameConfig(cheat.name);
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

            let cheatsArray = [];
            config.cheatsActivated.forEach(cheatName => {
                cheatsArray.push(config.cheats.find(elem => elem.name === cheatName));
            });
            cheatsArray.forEach(item => {
                if (helperController.getObjectByName(config.bonuses.bonusTypes, item.paramName)) {
                    localStorageController.setParamToLocalStorage(item.paramName, this.activatedCheatsParamsDataTempArray.get(item.paramName));
                } else {
                    localStorageController.setParamToLocalStorage(item.paramName, config[item.paramName]);
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
            localStorageController.setParamToLocalStorage(paramName, secondsCount);
        }
    },

    suicide(paramName) {
        let hitData = [{
            x: player.x,
            y: player.y,
            crashDamage: config[paramName]
        }]
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
    }
}