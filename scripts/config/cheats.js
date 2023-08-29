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
                name: "toggleInfinityMode",
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
                needAddNoteToGameConfig: true,
                debugTool: false,
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
                needAddNoteToGameConfig: true,
                debugTool: false,
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
                needAddNoteToGameConfig: true,
                debugTool: false,
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
                needAddNoteToGameConfig: false,
                debugTool: false,
                options: null
            },
            {
                name: "addLives",
                code: "adderevitam",
                message: "set lives count",
                type: "arbitaryValueCheat",
                scope: [
                    "config"
                ],
                toggleOptions: null,
                paramName: "lives",
                limit: 999,
                description: "установить количество жизней",
                help: this.helpArray.get("arbitaryValueCheat"),
                needAddNoteToGameConfig: true,
                debugTool: false,
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
                needAddNoteToGameConfig: false,
                debugTool: false,
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
                needAddNoteToGameConfig: false,
                debugTool: false,
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
                needAddNoteToGameConfig: true,
                debugTool: false,
                options: null
            },
            {
                name: "playerArrowsObjects",
                code: "dbgplrarrows",
                message: "player's arrows show ",
                type: "toggleCheat",
                scope: [
                    "config"
                ],
                toggleOptions: [
                    "on",
                    "off"
                ],
                paramName: "debugPlayerArrowsObjectsShow",
                limit: null,
                description: "включение или выключение вывода в консоль объектов класса Arrow (для отладки)",
                help: this.helpArray.get("toggleCheat"),
                needAddNoteToGameConfig: true,
                debugTool: true,
                options: null
            },
            {
                name: "enemyArrowsObjects",
                code: "dbgenmarrows",
                message: "enemy arrows show ",
                type: "toggleCheat",
                scope: [
                    "config"
                ],
                toggleOptions: [
                    "on",
                    "off"
                ],
                paramName: "debugEnemyArrowsObjectsShow",
                limit: null,
                description: "включение или выключение вывода в консоль объектов класса EnemyArrow (для отладки)",
                help: this.helpArray.get("toggleCheat"),
                needAddNoteToGameConfig: true,
                debugTool: true,
                options: null
            },
            {
                name: "blockagesObjects",
                code: "dbgblockages",
                message: "blockages show ",
                type: "toggleCheat",
                scope: [
                    "config"
                ],
                toggleOptions: [
                    "on",
                    "off"
                ],
                paramName: "debugBlockagesObjectsShow",
                limit: null,
                description: "включение или выключение вывода в консоль объектов класса Blockage (для отладки)",
                help: this.helpArray.get("toggleCheat"),
                needAddNoteToGameConfig: true,
                debugTool: true,
                options: null
            },
            {
                name: "bonusesObjects",
                code: "dbgbonuses",
                message: "bonuses show ",
                type: "toggleCheat",
                scope: [
                    "config"
                ],
                toggleOptions: [
                    "on",
                    "off"
                ],
                paramName: "debugBonusesObjectsShow",
                limit: null,
                description: "включение или выключение вывода в консоль объектов класса Bonus (для отладки)",
                help: this.helpArray.get("toggleCheat"),
                needAddNoteToGameConfig: true,
                debugTool: true,
                options: null
            },
            {
                name: "bossGetDamageInfo",
                code: "dbgbossinfo",
                message: "boss info show ",
                type: "toggleCheat",
                scope: [
                    "config"
                ],
                toggleOptions: [
                    "on",
                    "off"
                ],
                paramName: "debugBossGetDamageInfoShow",
                limit: null,
                description: "включение или выключение вывода в консоль параметров босса каждый раз при нанесении ему урона (для отладки)",
                help: this.helpArray.get("toggleCheat"),
                needAddNoteToGameConfig: true,
                debugTool: true,
                options: null
            },
            {
                name: "actualParamsInfo",
                code: "dbgactual",
                message: "actual params show ",
                type: "toggleCheat",
                scope: [
                    "config"
                ],
                toggleOptions: [
                    "on",
                    "off"
                ],
                paramName: "debugActualParamsInfoShow",
                limit: null,
                description: "включение или выключение вывода в консоль localStorage и config каждый раз при активации чита и при запуске игры (для отладки)",
                help: this.helpArray.get("toggleCheat"),
                needAddNoteToGameConfig: true,
                debugTool: true,
                options: null
            },
            {
                name: "toggleInstantStart",
                code: "dbginstant",
                message: "instant start mode ",
                type: "toggleCheat",
                scope: [
                    "config"
                ],
                toggleOptions: [
                    "on",
                    "off"
                ],
                paramName: "gameInstantStart",
                limit: null,
                description: "включение или выключение режима запуска игры без отсчета (для отладки)",
                help: this.helpArray.get("toggleCheat"),
                needAddNoteToGameConfig: true,
                debugTool: true,
                options: null
            },
            {
                name: "toggleDebugMode",
                code: "respiceintus",
                message: "debug mode ",
                type: "toggleCheat",
                scope: [
                    "config",
                ],
                toggleOptions: [
                    "on",
                    "off"
                ],
                paramName: "debugMode",
                limit: null,
                description: "включение или выключение вызова дебаг-панели по нажатию клавиши /",
                help: this.helpArray.get("toggleCheat"),
                needAddNoteToGameConfig: true,
                debugTool: false,
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
                needAddNoteToGameConfig: true,
                debugTool: false,
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
                needAddNoteToGameConfig: true,
                debugTool: false,
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
                needAddNoteToGameConfig: true,
                debugTool: false,
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
                needAddNoteToGameConfig: false,
                debugTool: false,
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
                needAddNoteToGameConfig: true,
                debugTool: false,
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
                needAddNoteToGameConfig: false,
                debugTool: false,
                options: null
            },
            {
                name: "setBonusChance",
                code: "fortuna",
                message: "set bonus chance",
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
                needAddNoteToGameConfig: true,
                debugTool: false,
                options: null
            },
            {
                name: "superAbilityIsAlwaysCharged",
                code: "faculta",
                message: "super ability ",
                type: "toggleCheat",
                scope: [
                    "config"
                ],
                toggleOptions: [
                    "on",
                    "off"
                ],
                paramName: "superAbilityIsAlwaysCharged",
                limit: null,
                description: "включение или выключение всегда полного заряда для использования супер способности",
                help: this.helpArray.get("toggleCheat"),
                needAddNoteToGameConfig: true,
                debugTool: false,
                options: null
            },
            {
                name: "offAllCheats",
                code: "avertas",
                message: "all cheats disabled",
                type: "simpleCheat",
                scope: null,
                toggleOptions: null,
                paramName: null,
                limit: null,
                description: "отключить действие всех читов",
                help: this.helpArray.get("simpleCheat"),
                needAddNoteToGameConfig: false,
                debugTool: false,
                options: null
            },
            {
                name: "getSomeBonus",
                code: "praemium",
                message: "get bonus",
                type: "optionsCheat",
                scope: [
                    "config",
                    "bonusController"
                ],
                toggleOptions: null,
                paramName: null,
                limit: null,
                description: "получить любой бонус",
                help: this.helpArray.get("optionsCheat"),
                needAddNoteToGameConfig: false,
                debugTool: false,
                options: [
                    "acus",
                    "tribus",
                    "testa",
                    "cor",
                    "micare",
                    "radium"
                ]
            }
        ]
    }
}