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
                toggleMessages: null,
                paramName: "lives",
                limit: 999,
                addNoteToGameConfig: true,
                description: "установить количество жизней",
                help: this.helpArray.get("arbitaryValueCheat"),
                options: null
            }
        ]
    }
}