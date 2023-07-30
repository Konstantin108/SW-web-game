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
                message: "infinity mode ",
                type: "toggleCheat",
                scope: [
                    "config"
                ],
                toggleOptions: [
                    "on",
                    "off"
                ],
                paramName: "cheatsInfinityActiveMode",
                limit: null,
                description: "включение или выключение опции сохранения действия читов в localStorage",
                help: this.helpArray.get("toggleCheat"),
                options: null
            },
            {
                name: "toggleInvincibility",
                code: "invulnerability",
                message: "invincibility ",
                type: "toggleCheat",
                scope: [
                    "config"
                ],
                toggleOptions: [
                    "on",
                    "off"
                ],
                paramName: "invincibility",
                limit: null,
                description: "включение или выключение неуязвимости",
                help: this.helpArray.get("toggleCheat"),
                options: null
            },
            {
                name: "colorChange",
                code: "lux",
                message: "set color",
                type: "optionsCheat",
                scope: [
                    "config"
                ],
                toggleOptions: null,
                paramName: "menuColor",
                limit: null,
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
                scope: [
                    "player"
                ],
                toggleOptions: null,
                paramName: "lives",
                limit: null,
                description: "восстановить жизни",
                help: this.helpArray.get("simpleCheat"),
                options: null
            },
            {
                name: "addLives",
                code: "adderevitam",
                message: "added lifes",
                type: "arbitaryValueCheat",
                scope: [
                    "config"
                ],
                toggleOptions: null,
                paramName: "lives",
                limit: 999,
                description: "установить количество жизней",
                help: this.helpArray.get("arbitaryValueCheat"),
                options: null
            },
            {
                name: "callBoss",
                code: "adventusbulla",
                message: "boss is coming",
                type: "simpleCheat",
                scope: [
                    "boss",
                    "progressController"
                ],
                toggleOptions: null,
                paramName: "bossExist",
                limit: null,
                description: "вызвать босса",
                help: this.helpArray.get("simpleCheat"),
                options: null
            },
            {
                name: "killBoss",
                code: "auferspiritum",
                message: "boss defeated",
                type: "simpleCheat",
                scope: [
                    "progressController"
                ],
                toggleOptions: null,
                paramName: null,
                limit: null,
                description: "убить босса",
                help: this.helpArray.get("simpleCheat"),
                options: null
            },
            {
                name: "toggleArrowPenetration",
                code: "terebro",
                message: "drill mode ",
                type: "toggleCheat",
                scope: [
                    "config"
                ],
                toggleOptions: [
                    "on",
                    "off"
                ],
                paramName: "arrowPenetration",
                limit: null,
                description: "включение или выключение свойства arrowPenetration для всех типов стрел игрока",
                help: this.helpArray.get("toggleCheat"),
                options: null
            },
            {
                name: "getShield",
                code: "utarmis",
                message: "shield seconds",
                type: "arbitaryValueCheat",
                scope: [
                    "bonusController"
                ],
                toggleOptions: null,
                paramName: "shield",
                limit: 199,
                description: "получить shield на определенное игроком количество секунд",
                help: this.helpArray.get("arbitaryValueCheat"),
                options: null
            },
            {
                name: "getDrill",
                code: "penetravit",
                message: "drill seconds",
                type: "arbitaryValueCheat",
                scope: [
                    "bonusController"
                ],
                toggleOptions: null,
                paramName: "drill",
                limit: 199,
                description: "получить arrowDrill на определенное игроком количество секунд",
                help: this.helpArray.get("arbitaryValueCheat"),
                options: null
            },
            {
                name: "getTrinity",
                code: "trinitas",
                message: "trinity seconds",
                type: "arbitaryValueCheat",
                scope: [
                    "bonusController"
                ],
                toggleOptions: null,
                paramName: "trinity",
                limit: 199,
                description: "получить arrowTrinity на определенное игроком количество секунд",
                help: this.helpArray.get("arbitaryValueCheat"),
                options: null
            },
            {
                name: "suicide",
                code: "mortem",
                message: "this is the end",
                type: "simpleCheat",
                scope: [
                    "player"
                ],
                toggleOptions: null,
                paramName: "lives",
                limit: null,
                description: "убить самого себя",
                help: this.helpArray.get("simpleCheat"),
                options: null
            },
            {
                name: "togglePowerfulArrow",
                code: "sagittapotens",
                message: "power x",
                type: "toggleCheat",
                scope: [
                    "config"
                ],
                toggleOptions: [
                    10,
                    1
                ],
                paramName: "power",
                limit: null,
                description: "включение или выключение увеличенного в 10 раз урона от всех типов стрел игрока",
                help: this.helpArray.get("toggleCheat"),
                options: null
            },
            {
                name: "explosion",
                code: "magnusmico",
                message: "big bang",
                type: "simpleCheat",
                scope: [
                    "explosion"
                ],
                toggleOptions: null,
                paramName: null,
                limit: null,
                description: "вызвать взрыв, который убивает всех врагов на экране и снимает щит с босса",
                help: this.helpArray.get("simpleCheat"),
                options: null
            },
            {
                name: "setBonusChance",
                code: "fortuna",
                message: "more bonuses",
                type: "arbitaryValueCheat",
                scope: [
                    "config",
                    "bonuses"
                ],
                toggleOptions: null,
                paramName: "bonusChance",
                limit: 100,
                description: "установить процент вероятности появления на карте бонусов",
                help: this.helpArray.get("arbitaryValueCheat"),
                options: null
            },
            {
                name: "superAbilityIsAlwaysCharged",
                code: "faculta",
                message: "super ability",
                type: "toggleCheat",
                scope: [
                    "undefined"  // пока не знаю
                ],
                toggleOptions: [
                    "on",
                    "off"
                ],
                paramName: "undefined",  // пока не знаю
                limit: null,
                description: "включение или выключение всегда полного заряда для использования супер способности",
                help: this.helpArray.get("toggleCheat"),
                options: null
            },
        ]
    }
}