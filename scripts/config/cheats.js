export const cheats = {

    setCheatsParams() {
        return [
            {
                name: "toggleInfinityActiveMode",
                code: "infinitum",
                message: "infinity mode",
                toggleMessages: [
                    "on",
                    "off"
                ],
                toggle: true,
                paramName: "cheatsInfinityActiveMode",
                limit: null,
                compound: false,
                addNoteToGameConfig: true,
                description: "включение или выключение опции сохранения действия читов в localStorage",
                help: "необходимо вводить только code, повторный ввод code - отключает действие чита",
                arbitaryValue: false,
                options: null
            },
            {
                name: "toggleInvincibility",
                code: "invulnerability",
                message: "invincibility",
                toggleMessages: [
                    "on",
                    "off"
                ],
                toggle: true,
                paramName: "invincibility",
                limit: null,
                compound: false,
                addNoteToGameConfig: true,
                description: "включение или выключение неуязвимости",
                help: "необходимо вводить только code, повторный ввод code - отключает действие чита",
                arbitaryValue: false,
                options: null
            },
            {
                name: "colorChange",
                code: "lux",
                message: "set color",
                toggleMessages: null,
                toggle: false,
                paramName: "menuColor",
                limit: null,
                compound: true,
                addNoteToGameConfig: true,
                description: "изменение цвета меню",
                help: "необходимо вводить code + : + одна из опций",
                arbitaryValue: false,
                options: [
                    "rubrum",
                    "orange",
                    "aurum",
                    "viridis",
                    "claracaelum",
                    "caelum",
                    "purpura",
                    "album"
                ]
            },
            {
                name: "restoreLives",
                code: "aspirin",
                message: "lives restored",
                toggleMessages: null,
                toggle: false,
                paramName: "lives",
                limit: null,
                compound: false,
                addNoteToGameConfig: false,
                description: "восстановить жизни",
                help: "необходимо вводить только code",
                arbitaryValue: false,
                options: null
            },
            {
                name: "addLives",
                code: "adderevitam",
                message: "added lifes",
                toggleMessages: null,
                toggle: false,
                paramName: "lives",
                limit: 999,
                compound: true,
                addNoteToGameConfig: true,
                description: "установить количество жизней",
                help: "необходимо вводить code + : + произвольное значение в цифрах",
                arbitaryValue: true,
                options: null
            }
        ]
    }
}