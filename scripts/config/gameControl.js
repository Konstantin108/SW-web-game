export const gameControl = {
    btnsSrc: new Map([
        ["KeyW", {
            label: null,
            src: "./src/images/w.png",
            alt: "w.png"
        }],
        ["KeyA", {
            label: null,
            src: "./src/images/a.png",
            alt: "a.png"
        }],
        ["KeyS", {
            label: null,
            src: "./src/images/s.png",
            alt: "s.png"
        }],
        ["KeyD", {
            label: null,
            src: "./src/images/d.png",
            alt: "d.png"
        }],
        ["ArrowUp", {
            label: null,
            src: "./src/images/up.png",
            alt: "up.png"
        }],
        ["ArrowLeft", {
            label: null,
            src: "./src/images/left.png",
            alt: "left.png"
        }],
        ["ArrowDown", {
            label: null,
            src: "./src/images/down.png",
            alt: "down.png"
        }],
        ["ArrowRight", {
            label: null,
            src: "./src/images/right.png",
            alt: "right.png"
        }],
        ["Numpad0", {
            label: "num",
            src: "./src/images/null.png",
            alt: "null.png"
        }],
        ["Space", {
            label: null,
            src: "./src/images/space.png",
            alt: "space.png"
        }],
        ["ControlLeft", {
            label: "left",
            src: "./src/images/ctrl.png",
            alt: "ctrl.png"
        }],
        ["ControlRight", {
            label: "right",
            src: "./src/images/ctrl.png",
            alt: "ctrl.png"
        }],
        ["Escape", {
            label: null,
            src: "./src/images/esc.png",
            alt: "esc.png"
        }],
        ["Pause", {
            label: null,
            src: "./src/images/pause.png",
            alt: "pause.png"
        }]
    ]),

    touchesSrc: new Map([
        ["touchArrowUp", {
            label: null,
            src: "./src/images/touch-arrow-up.png",
            alt: "touch-arrow-up.png"
        }],
        ["touchArrowLeft", {
            label: null,
            src: "./src/images/touch-arrow-left.png",
            alt: "touch-arrow-left.png"
        }],
        ["touchArrowDown", {
            label: null,
            src: "./src/images/touch-arrow-down.png",
            alt: "touch-arrow-down.png"
        }],
        ["touchArrowRight", {
            label: null,
            src: "./src/images/touch-arrow-right.png",
            alt: "touch-arrow-right.png"
        }],
        ["touchFingerLeft", {
            label: null,
            src: "./src/images/touch-finger-left.png",
            alt: "touch-finger-left.png"
        }],
        ["touchUseSuperAbilityBtn", {
            label: null,
            src: "./src/images/lightning.png",
            alt: "lightning.png"
        }],
        ["touchUseBombBtn", {
            label: null,
            src: "./src/images/bomb.png",
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
                    allBlockStyle: "",
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
                    text: "перемещение",
                    additionalMessage: null,
                },
                tooltipMobileMode: {
                    keyboardsBlockClass: "",
                    positionClass: "anyTooltipMobileMode",
                    imageClass: "tooltipImage",
                    tooltipBlockClass: "oneKeyboardBlockFlex",
                    allBlockStyle: "flexBox",
                    keyboards: [{
                        units: [
                            this.touchesSrc.get("touchArrowUp"),
                            this.touchesSrc.get("touchArrowDown"),
                            this.touchesSrc.get("touchArrowLeft"),
                            this.touchesSrc.get("touchArrowRight")
                        ]
                    }],
                    prologue: "используйте свайпы",
                    text: "для перемещения",
                    additionalMessage: "при движении работает автострельба",
                },
                description: "перемещение корабля игрока по карте",
            },
            {
                name: "shootBtnsArray",
                btns: ["Space", "Numpad5", "Numpad0"],
                tooltip: {
                    keyboardsBlockClass: "keyboardsBlockFlexColumn",
                    positionClass: "shootBtnsArrayDesktopMode",
                    imageClass: "",
                    tooltipBlockClass: "",
                    allBlockStyle: "",
                    keyboards: [
                        {units: [this.btnsSrc.get("Numpad0")]},
                        {units: [this.btnsSrc.get("Space")]}
                    ],
                    prologue: null,
                    text: "выстрел",
                    additionalMessage: null,
                },
                tooltipMobileMode: {
                    keyboardsBlockClass: "",
                    positionClass: "anyTooltipMobileMode",
                    imageClass: "tooltipImage",
                    tooltipBlockClass: "",
                    allBlockStyle: "flexBox",
                    keyboards: [{units: [this.touchesSrc.get("touchFingerLeft")]}],
                    prologue: "или коснитесь экрана",
                    text: "чтобы выстрелить",
                    additionalMessage: null,
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
                    allBlockStyle: "",
                    keyboards: [{units: [this.btnsSrc.get("ControlLeft")]}],
                    prologue: null,
                    text: "суперспособность",
                    additionalMessage: null,
                },
                tooltipMobileMode: {
                    keyboardsBlockClass: "",
                    positionClass: "anyTooltipMobileMode",
                    imageClass: "tooltipImage",
                    tooltipBlockClass: "",
                    allBlockStyle: "flexBox",
                    keyboards: [{units: [this.touchesSrc.get("touchUseSuperAbilityBtn")]}],
                    prologue: "коснитесь иконки",
                    text: "или используйте двойной тап",
                    additionalMessage: "чтобы активировать суперспособность",
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
                    allBlockStyle: "",
                    keyboards: [{units: [this.btnsSrc.get("ControlRight")]}],
                    prologue: null,
                    text: "использовать бомбу",
                    additionalMessage: null,
                },
                tooltipMobileMode: {
                    keyboardsBlockClass: "",
                    positionClass: "anyTooltipMobileMode",
                    imageClass: "tooltipImageBig",
                    tooltipBlockClass: "",
                    allBlockStyle: "flexBox",
                    keyboards: [{units: [this.touchesSrc.get("touchUseBombBtn")]}],
                    prologue: "коснитесь иконки",
                    text: "или коснитесь экрана двумя пальцами",
                    additionalMessage: "для активации бомбы",
                },
                description: "использовать бомбу"
            },
            {
                name: "pauseBtnsArray",
                btns: ["Escape", "Pause"],
                tooltip: {
                    keyboardsBlockClass: "flexBox",
                    positionClass: "pauseBtnsArrayDesktopMode",
                    imageClass: "",
                    tooltipBlockClass: "",
                    allBlockStyle: "",
                    keyboards: [
                        {units: [this.btnsSrc.get("Escape")]},
                        {units: [this.btnsSrc.get("Pause")]}
                    ],
                    prologue: null,
                    text: "остановить игру",
                    additionalMessage: null,
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