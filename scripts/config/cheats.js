export const cheats = {

    setCheatsParams() {
        // возможно сделать отдельный чит для сохранения действия читов в localStorage
        return [
            {
                name: "testCheat1",
                code: "chone",
                message: "cheat one on",
                // action
                // actionTime
                // к чему применяется бонус
                // будет ли сохранятться localStorage
                description: "тест чит №1"
            },
            {
                name: "testCheat2",
                code: "chtwo",
                message: "cheat two on",
                // action
                // actionTime
                // к чему применяется бонус
                // будет ли сохранятться localStorage
                description: "тест чит №2"
            }
        ]
    }
}