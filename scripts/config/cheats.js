export const cheats = {

    setCheatsParams() {
        // возможно сделать отдельный чит для сохранения действия читов в localStorage
        // дописать читы, которые будут выводить в console данные из localStorage и из config
        // дописать читы для смены фона игры
        // возможно дописать читы для замены изображений игрока и врагов
        return [
            {
                name: "toggleCheatsInfinityActiveMode",
                code: "infinitum",
                message: "infinity mode",
                toggleMessages: [
                    "on",
                    "off"
                ],
                toggle: true,
                limit: null,
                compound: false,
                // action
                // actionTime
                // к чему применяется бонус
                // будет ли сохраняться в localStorage
                // возможно запись в config
                // чит, который можно включить или выключить
                description: "включение или выключение опции сохранения действия читов в localStorage",
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
                limit: null,
                compound: true,
                // action
                // actionTime
                // к чему применяется бонус
                // будет ли сохраняться в localStorage
                // возможно запись в config
                // чит, который можно включить или выключить
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
                name: "testSimpleCheat",
                code: "testsich",
                message: "test simple on",
                toggleMessages: null,
                toggle: false,
                limit: null,
                compound: false,
                // action
                // actionTime
                // к чему применяется бонус
                // будет ли сохраняться в localStorage
                // возможно запись в config
                // чит, который можно включить или выключить
                description: "простой тестовый чит",
                help: "необходимо вводить только code",
                arbitaryValue: false,
                options: null
            },
            {
                name: "addLifes",
                code: "adderevitam",
                message: "added lifes",
                toggleMessages: null,
                toggle: false,
                limit: 999,
                compound: true,
                // action
                // actionTime
                // к чему применяется бонус
                // будет ли сохраняться в localStorage
                // возможно запись в config
                // чит, который можно включить или выключить
                description: "установить количество жизней",
                help: "необходимо вводить code + : + произвольное значение в цифрах",
                arbitaryValue: true,
                options: null
            }
        ]
    }
}