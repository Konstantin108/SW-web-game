export const gameControl = {
    btnsSrc: {
        KeyW: {label: null, src: "w.png"},
        KeyA: {label: null, src: "a.png"},
        KeyS: {label: null, src: "s.png"},
        KeyD: {label: null, src: "d.png"},
        ArrowUp: {label: null, src: "up.png"},
        ArrowLeft: {label: null, src: "left.png"},
        ArrowDown: {label: null, src: "down.png"},
        ArrowRight: {label: null, src: "right.png"},
        Numpad0: {label: "num", src: "null.png"},
        Space: {label: null, src: "space.png"},
        ControlLeft: {label: "left", src: "ctrl.png"},
        ControlRight: {label: "right", src: "ctrl.png"},
        Escape: {label: null, src: "esc.png"},
        Pause: {label: null, src: "pause.png"}
    },

    touchesSrc: {
        touchArrowUp: {label: null, src: "touch-arrow-up.png"},
        touchArrowLeft: {label: null, src: "touch-arrow-left.png"},
        touchArrowDown: {label: null, src: "touch-arrow-down.png"},
        touchArrowRight: {label: null, src: "touch-arrow-right.png"},
        touchFingerLeft: {label: null, src: "touch-finger-left.png"},
        touchUseSuperAbilityBtn: {label: null, src: "lightning.png"},
        touchUseBombBtn: {label: null, src: "bomb.png"}
    },

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
                                this.btnsSrc["KeyW"],
                                this.btnsSrc["KeyA"],
                                this.btnsSrc["KeyS"],
                                this.btnsSrc["KeyD"]
                            ]
                        },
                        {
                            units: [
                                this.btnsSrc["ArrowUp"],
                                this.btnsSrc["ArrowLeft"],
                                this.btnsSrc["ArrowDown"],
                                this.btnsSrc["ArrowRight"]
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
                            this.touchesSrc["touchArrowUp"],
                            this.touchesSrc["touchArrowDown"],
                            this.touchesSrc["touchArrowLeft"],
                            this.touchesSrc["touchArrowRight"]
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
                        {units: [this.btnsSrc["Numpad0"]]},
                        {units: [this.btnsSrc["Space"]]}
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
                    keyboards: [{units: [this.touchesSrc["touchFingerLeft"]]}],
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
                    keyboards: [{units: [this.btnsSrc["ControlLeft"]]}],
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
                    keyboards: [{units: [this.touchesSrc["touchUseSuperAbilityBtn"]]}],
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
                    keyboards: [{units: [this.btnsSrc["ControlRight"]]}],
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
                    keyboards: [{units: [this.touchesSrc["touchUseBombBtn"]]}],
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
                        {units: [this.btnsSrc["Escape"]]},
                        {units: [this.btnsSrc["Pause"]]}
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