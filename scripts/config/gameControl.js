export const gameControl = {
    btnsSrc: new Map([
        ["KeyW", {
            label: null,
            src: "./images/w.png",
            alt: "w.png"
        }],
        ["KeyA", {
            label: null,
            src: "./images/a.png",
            alt: "a.png"
        }],
        ["KeyS", {
            label: null,
            src: "./images/s.png",
            alt: "s.png"
        }],
        ["KeyD", {
            label: null,
            src: "./images/d.png",
            alt: "d.png"
        }],
        ["ArrowUp", {
            label: null,
            src: "./images/up.png",
            alt: "up.png"
        }],
        ["ArrowLeft", {
            label: null,
            src: "./images/left.png",
            alt: "left.png"
        }],
        ["ArrowDown", {
            label: null,
            src: "./images/down.png",
            alt: "down.png"
        }],
        ["ArrowRight", {
            label: null,
            src: "./images/right.png",
            alt: "right.png"
        }],
        ["Numpad0", {
            label: "num",
            src: "./images/null.png",
            alt: "null.png"
        }],
        ["Space", {
            label: null,
            src: "./images/space.png",
            alt: "space.png"
        }],
        ["ControlLeft", {
            label: "left",
            src: "./images/ctrl.png",
            alt: "ctrl.png"
        }],
        ["ControlRight", {
            label: "right",
            src: "./images/ctrl.png",
            alt: "ctrl.png"
        }],
        ["Escape", {
            label: null,
            src: "./images/esc.png",
            alt: "esc.png"
        }],
        ["Pause", {
            label: null,
            src: "./images/pause.png",
            alt: "pause.png"
        }]
    ]),

    touchesSrc: new Map([
        ["touchArrowUp", {
            label: null,
            src: "./images/touch-arrow-up.png",
            alt: "touch-arrow-up.png"
        }],
        ["touchArrowLeft", {
            label: null,
            src: "./images/touch-arrow-left.png",
            alt: "touch-arrow-left.png"
        }],
        ["touchArrowDown", {
            label: null,
            src: "./images/touch-arrow-down.png",
            alt: "touch-arrow-down.png"
        }],
        ["touchArrowRight", {
            label: null,
            src: "./images/touch-arrow-right.png",
            alt: "touch-arrow-right.png"
        }],
        ["touchFinger", {
            label: null,
            src: "./images/touch-finger.png",
            alt: "touch-finger.png"
        }],
        ["touchUseSuperAbilityBtn", {
            label: null,
            src: "./images/lightning.png",
            alt: "lightning.png"
        }],
        ["touchUseBombBtn", {
            label: null,
            src: "./images/bomb.png",
            alt: "bomb.png"
        }]
    ]),

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
                tooltip: {
                    keyboardsBlockClass: "",
                    positionClass: "possibleDirectionsDesktopMode",
                    imageClass: "",
                    tooltipBlockClass: "oneKeyboardBlockGrid",
                    keyboards: [
                        {
                            units: [
                                this.btnsSrc.get("KeyW"),
                                this.btnsSrc.get("KeyA"),
                                this.btnsSrc.get("KeyS"),
                                this.btnsSrc.get("KeyD")
                            ]
                        },
                        {
                            units: [
                                this.btnsSrc.get("ArrowUp"),
                                this.btnsSrc.get("ArrowLeft"),
                                this.btnsSrc.get("ArrowDown"),
                                this.btnsSrc.get("ArrowRight")
                            ]
                        }
                    ],
                    prologue: null,
                    text: "перемещение"
                },
                tooltipMobileMode: {
                    keyboardsBlockClass: "",
                    positionClass: "anyTooltipMobileMode",
                    imageClass: "tooltipImage",
                    tooltipBlockClass: "oneKeyboardBlockFlex",
                    keyboards: [{
                        units: [
                            this.touchesSrc.get("touchArrowUp"),
                            this.touchesSrc.get("touchArrowDown"),
                            this.touchesSrc.get("touchArrowLeft"),
                            this.touchesSrc.get("touchArrowRight")
                        ]
                    }],
                    prologue: "используйте свайпы",
                    text: "для перемещения"
                },
                description: "перемещение корабля игрока по карте"
            },
            {
                name: "shootBtnsArray",
                btns: ["Space", "Numpad5", "Numpad0"],
                tooltip: {
                    keyboardsBlockClass: "keyboardsBlockFlexColumn",
                    positionClass: "shootBtnsArrayDesktopMode",
                    imageClass: "",
                    tooltipBlockClass: "",
                    keyboards: [
                        {units: [this.btnsSrc.get("Numpad0")]},
                        {units: [this.btnsSrc.get("Space")]}
                    ],
                    prologue: null,
                    text: "выстрел"
                },
                tooltipMobileMode: {
                    keyboardsBlockClass: "",
                    positionClass: "anyTooltipMobileMode",
                    imageClass: "tooltipImage",
                    tooltipBlockClass: "",
                    keyboards: [{units: [this.touchesSrc.get("touchFinger")]}],
                    prologue: "коснитесь экрана",
                    text: "чтобы выстрелить"
                },
                description: "выстрел"
            },
            {
                name: "useSuperAbilityBtn",
                btns: ["ControlLeft"],
                tooltip: {
                    keyboardsBlockClass: "keyboardsBlockFlexColumn",
                    positionClass: "useSuperAbilityBtnDesktopMode",
                    imageClass: "",
                    tooltipBlockClass: "",
                    keyboards: [{units: [this.btnsSrc.get("ControlLeft")]}],
                    prologue: null,
                    text: "суперспособность"
                },
                tooltipMobileMode: {
                    keyboardsBlockClass: "",
                    positionClass: "anyTooltipMobileMode",
                    imageClass: "tooltipImage",
                    tooltipBlockClass: "",
                    keyboards: [{units: [this.touchesSrc.get("touchUseSuperAbilityBtn")]}],
                    prologue: "коснитесь иконки",
                    text: "чтобы использовать суперспособность"
                },
                description: "использовать суперспособность"
            },
            {
                name: "useBombBtn",
                btns: ["ControlRight"],
                tooltip: {
                    keyboardsBlockClass: "keyboardsBlockFlexColumn",
                    positionClass: "useBombBtnDesktopMode",
                    imageClass: "",
                    tooltipBlockClass: "",
                    keyboards: [{units: [this.btnsSrc.get("ControlRight")]}],
                    prologue: null,
                    text: "использовать бомбу"
                },
                tooltipMobileMode: {
                    keyboardsBlockClass: "",
                    positionClass: "anyTooltipMobileMode",
                    imageClass: "tooltipImageBig",
                    tooltipBlockClass: "",
                    keyboards: [{units: [this.touchesSrc.get("touchUseBombBtn")]}],
                    prologue: "коснитесь иконки",
                    text: "для активации бомбы"
                },
                description: "использовать бомбу"
            },
            {
                name: "pauseBtnsArray",
                btns: ["Escape", "Pause"],
                tooltip: {
                    keyboardsBlockClass: "keyboardsBlockFlex",
                    positionClass: "pauseBtnsArrayDesktopMode",
                    imageClass: "",
                    tooltipBlockClass: "",
                    keyboards: [
                        {units: [this.btnsSrc.get("Escape")]},
                        {units: [this.btnsSrc.get("Pause")]}
                    ],
                    prologue: null,
                    text: "остановить игру"
                },
                tooltipMobileMode: null,
                description: "вызов меню паузы"
            },
            {
                name: "showCheatConsoleBtn",
                btns: ["Backquote"],
                tooltip: null,
                tooltipMobileMode: null,
                description: "вызов меню ввода читов"
            },
            {
                name: "showDebugPanelBtn",
                btns: ["Slash"],
                tooltip: null,
                tooltipMobileMode: null,
                description: "вызов дебаг-панели"
            }
        ];
    }
}