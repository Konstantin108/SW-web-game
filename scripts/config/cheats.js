export const cheats = {

    setCheatsParams() {
        // возможно сделать отдельный чит для сохранения действия читов в localStorage
        return [
            {
                name: "colorChange",
                code: "lux",
                message: "set color",
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
                    "blue",
                    "orange"
                ]
            },
            {
                name: "testSimpleCheat",
                code: "testsich",
                message: "test simple on",
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