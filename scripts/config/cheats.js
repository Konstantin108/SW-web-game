export const cheats = {
    helpArray: new Map([
        ["toggleCheat", "необходимо вводить только code, повторный ввод code - отключает действие чита"],
        ["optionsCheat", "необходимо вводить code + : + одна из опций"],
        ["simpleCheat", "необходимо вводить только code"],
        ["arbitaryValueCheat", "необходимо вводить code + : + произвольное значение в цифрах"]
    ]),

    setCheatsParams() {
        return [
            {
                name: "toggleInfinityActiveMode",
                code: "infinitum",
                message: "infinity mode",
                type: "toggleCheat",
                scope: "config",
                toggleMessages: [
                    "on",
                    "off"
                ],
                paramName: "cheatsInfinityActiveMode",
                limit: null,
                addNoteToGameConfig: true,
                description: "включение или выключение опции сохранения действия читов в localStorage",
                help: this.helpArray.get("toggleCheat"),
                options: null
            },
            {
                name: "toggleInvincibility",
                code: "invulnerability",
                message: "invincibility",
                type: "toggleCheat",
                scope: "config",
                toggleMessages: [
                    "on",
                    "off"
                ],
                paramName: "invincibility",
                limit: null,
                addNoteToGameConfig: true,
                description: "включение или выключение неуязвимости",
                help: this.helpArray.get("toggleCheat"),
                options: null
            },
            {
                name: "colorChange",
                code: "lux",
                message: "set color",
                type: "optionsCheat",
                scope: "config",
                toggleMessages: null,
                paramName: "menuColor",
                limit: null,
                addNoteToGameConfig: true,
                description: "изменение цвета меню",
                help: this.helpArray.get("optionsCheat"),
                options: [
                    "rubrum",
                    "orange",
                    "aurum",
                    "viridis",
                    "claracaelum",
                    "caelum",
                    "purpura",
                    "album",
                    "ferrum",
                    "terra"
                ]
            },
            {
                name: "restoreLives",
                code: "aspirin",
                message: "lives restored",
                type: "simpleCheat",
                scope: "player",
                toggleMessages: null,
                paramName: "lives",
                limit: null,
                addNoteToGameConfig: false,
                description: "восстановить жизни",
                help: this.helpArray.get("simpleCheat"),
                options: null
            },
            {
                name: "addLives",
                code: "adderevitam",
                message: "added lifes",
                type: "arbitaryValueCheat",
                scope: "config",
                toggleMessages: null,
                paramName: "lives",
                limit: 999,
                addNoteToGameConfig: true,
                description: "установить количество жизней",
                help: this.helpArray.get("arbitaryValueCheat"),
                options: null
            },
            {
                name: "callBoss",
                code: "adventusbulla",
                message: "boss is coming",
                type: "simpleCheat",
                scope: "progressController",
                toggleMessages: null,
                paramName: "bossExist",
                limit: null,
                addNoteToGameConfig: false,
                description: "вызвать босса",
                help: this.helpArray.get("simpleCheat"),
                options: null
            },
            {
                name: "killBoss",
                code: "auferspiritum",
                message: "boss defeated",
                type: "simpleCheat",
                scope: "progressController",
                toggleMessages: null,
                paramName: null,
                limit: null,
                addNoteToGameConfig: false,
                description: "убить босса",
                help: this.helpArray.get("simpleCheat"),
                options: null
            },
            {
                name: "toggleArrowPenetration",
                code: "terebro",
                message: "drill mode",
                type: "toggleCheat",
                scope: "config",
                toggleMessages: [
                    "on",
                    "off"
                ],
                paramName: "arrowPenetration",
                limit: null,
                addNoteToGameConfig: true,
                description: "включение или выключение свойства arrowPenetration для всех типов стрел игрока",
                help: this.helpArray.get("toggleCheat"),
                options: null
            },
            {
                name: "getShield",
                code: "utarmis",
                message: "shield seconds",
                type: "arbitaryValueCheat",
                scope: "bonusController",
                toggleMessages: null,
                paramName: "shield",
                limit: 999,
                addNoteToGameConfig: true,
                description: "получить shield на определенное игроком количество секунд",
                help: this.helpArray.get("arbitaryValueCheat"),
                options: null
            },
            {
                name: "getDrill",
                code: "penetravit",
                message: "drill seconds",
                type: "arbitaryValueCheat",
                scope: "bonusController",
                toggleMessages: null,
                paramName: "drill",
                limit: 999,
                addNoteToGameConfig: true,
                description: "получить arrowDrill на определенное игроком количество секунд",
                help: this.helpArray.get("arbitaryValueCheat"),
                options: null
            },
            {
                name: "getTrinity",
                code: "trinitas",
                message: "trinity seconds",
                type: "arbitaryValueCheat",
                scope: "bonusController",
                toggleMessages: null,
                paramName: "trinity",
                limit: 999,
                addNoteToGameConfig: true,
                description: "получить arrowTrinity на определенное игроком количество секунд",
                help: this.helpArray.get("arbitaryValueCheat"),
                options: null
            }
        ]
    }
}