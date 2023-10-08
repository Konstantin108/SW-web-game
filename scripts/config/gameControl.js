export const gameControl = {

    // возможно добавить пункт для вывода игроку в разделе "управление и подсказки"
    setGameControl() {
        return [
            {
                name: "possibleDirections",
                btns: [
                    "Numpad4",
                    "Numpad6",
                    "Numpad2",
                    "Numpad8",
                    "Numpad7",
                    "Numpad9",
                    "Numpad1",
                    "Numpad3",
                    "ArrowLeft",
                    "ArrowRight",
                    "ArrowDown",
                    "ArrowUp",
                    "KeyA",
                    "KeyD",
                    "KeyS",
                    "KeyW"
                ],
                description: "перемещение корабля игрока на карте"
            },
            {
                name: "shootBtnsArray",
                btns: [
                    "Space",
                    "Numpad5",
                    "Numpad0",
                ],
                description: "выстрел"
            },
            {
                name: "useSuperAbilityBtn",
                btns: [
                    "ControlLeft"
                ],
                description: "использовать суперспособность"
            },
            {
                name: "useBombBtn",
                btns: [
                    "ControlRight"
                ],
                description: "использовать бомбу"
            },
            {
                name: "pauseBtnsArray",
                btns: [
                    "Escape",
                    "Pause"
                ],
                description: "вызов меню паузы"
            },
            {
                name: "showCheatConsoleBtn",
                btns: [
                    "Backquote"
                ],
                description: "вызов меню ввода читов"
            },
            {
                name: "showDebugPanelBtn",
                btns: [
                    "Slash"
                ],
                description: "вызов дебаг-панели"
            }
        ];
    }
}