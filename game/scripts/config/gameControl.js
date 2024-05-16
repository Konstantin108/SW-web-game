export const gameControl = {
    btnsSrc: {
        KeyW: {label: null, src: "w.webp"},
        KeyA: {label: null, src: "a.webp"},
        KeyS: {label: null, src: "s.webp"},
        KeyD: {label: null, src: "d.webp"},
        ArrowUp: {label: null, src: "up.webp"},
        ArrowLeft: {label: null, src: "left.webp"},
        ArrowDown: {label: null, src: "down.webp"},
        ArrowRight: {label: null, src: "right.webp"},
        Numpad0: {label: "num", src: "null.webp"},
        Space: {label: null, src: "space.webp"},
        ControlLeft: {label: "left", src: "ctrl.webp"},
        ControlRight: {label: "right", src: "ctrl.webp"},
        Escape: {label: null, src: "esc.webp"},
        Pause: {label: null, src: "pause.webp"}
    },

    touchesSrc: {
        touchArrowUp: {label: null, src: "touch-arrow-up.webp"},
        touchArrowLeft: {label: null, src: "touch-arrow-left.webp"},
        touchArrowDown: {label: null, src: "touch-arrow-down.webp"},
        touchArrowRight: {label: null, src: "touch-arrow-right.webp"},
        touchFingerLeft: {label: null, src: "touch-finger-left.webp"},
        touchUseSuperAbilityBtn: {label: null, src: "lightning.webp"},
        touchUseBombBtn: {label: null, src: "bomb.webp"}
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
                                this.btnsSrc.KeyW,
                                this.btnsSrc.KeyA,
                                this.btnsSrc.KeyS,
                                this.btnsSrc.KeyD
                            ]
                        },
                        {
                            units: [
                                this.btnsSrc.ArrowUp,
                                this.btnsSrc.ArrowLeft,
                                this.btnsSrc.ArrowDown,
                                this.btnsSrc.ArrowRight
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
                            this.touchesSrc.touchArrowUp,
                            this.touchesSrc.touchArrowDown,
                            this.touchesSrc.touchArrowLeft,
                            this.touchesSrc.touchArrowRight
                        ]
                    }],
                    prologue: "используйте свайпы",
                    text: "для перемещения",
                    additionalMessage: "при движении работает автострельба",
                },
                canShowAgain: false,
                canShowWhenTipsIsOff: false,
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
                        {units: [this.btnsSrc.Numpad0]},
                        {units: [this.btnsSrc.Space]}
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
                    keyboards: [{units: [this.touchesSrc.touchFingerLeft]}],
                    prologue: "или коснитесь экрана",
                    text: "чтобы выстрелить",
                    additionalMessage: null,
                },
                canShowAgain: false,
                canShowWhenTipsIsOff: false,
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
                    keyboards: [{units: [this.btnsSrc.ControlLeft]}],
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
                    keyboards: [{units: [this.touchesSrc.touchUseSuperAbilityBtn]}],
                    prologue: "коснитесь иконки",
                    text: "или используйте двойной тап",
                    additionalMessage: "чтобы активировать суперспособность",
                },
                canShowAgain: false,
                canShowWhenTipsIsOff: false,
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
                    keyboards: [{units: [this.btnsSrc.ControlRight]}],
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
                    keyboards: [{units: [this.touchesSrc.touchUseBombBtn]}],
                    prologue: "коснитесь иконки",
                    text: "или коснитесь экрана двумя пальцами",
                    additionalMessage: "для активации бомбы",
                },
                canShowAgain: false,
                canShowWhenTipsIsOff: false,
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
                        {units: [this.btnsSrc.Escape]},
                        {units: [this.btnsSrc.Pause]}
                    ],
                    prologue: null,
                    text: "остановить игру",
                    additionalMessage: null,
                },
                tooltipMobileMode: null,
                canShowAgain: false,
                canShowWhenTipsIsOff: false,
                description: "вызов меню паузы"
            },
            {
                name: "showCheatConsoleBtn",
                btns: ["Backquote"],
                tooltip: null,
                tooltipMobileMode: null,
                canShowAgain: false,
                canShowWhenTipsIsOff: false,
                description: "вызов меню ввода читов"
            },
            {
                name: "showDebugPanelBtn",
                btns: ["Slash"],
                tooltip: null,
                tooltipMobileMode: null,
                canShowAgain: false,
                canShowWhenTipsIsOff: false,
                description: "вызов дебаг-панели"
            }
        ];
    }
};