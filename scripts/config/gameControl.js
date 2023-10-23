export const gameControl = {
    btnsSrc: new Map(
        [
            [
                "KeyW",
                {
                    label: null,
                    src: "./images/w.png",
                    alt: "w.png"
                }
            ],
            [
                "KeyA",
                {
                    label: null,
                    src: "./images/a.png",
                    alt: "a.png"
                }
            ],
            [
                "KeyS",
                {
                    label: null,
                    src: "./images/s.png",
                    alt: "s.png"
                }
            ],
            [
                "KeyD",
                {
                    label: null,
                    src: "./images/d.png",
                    alt: "d.png"
                }
            ],
            [
                "ArrowUp",
                {
                    label: null,
                    src: "./images/up.png",
                    alt: "up.png"
                }
            ],
            [
                "ArrowLeft",
                {
                    label: null,
                    src: "./images/left.png",
                    alt: "left.png"
                }
            ],
            [
                "ArrowDown",
                {
                    label: null,
                    src: "./images/down.png",
                    alt: "down.png"
                }
            ],
            [
                "ArrowRight",
                {
                    label: null,
                    src: "./images/right.png",
                    alt: "right.png"
                }
            ],
            [
                "Numpad0",
                {
                    label: "num",
                    src: "./images/null.png",
                    alt: "null.png"
                }
            ],
            [
                "Space",
                {
                    label: null,
                    src: "./images/space.png",
                    alt: "space.png"
                }
            ],
            [
                "ControlLeft",
                {
                    label: "left",
                    src: "./images/ctrl.png",
                    alt: "ctrl.png"
                }
            ],
            [
                "ControlRight",
                {
                    label: "right",
                    src: "./images/ctrl.png",
                    alt: "ctrl.png"
                }
            ],
            [
                "Escape",
                {
                    label: null,
                    src: "./images/esc.png",
                    alt: "esc.png"
                }
            ],
            [
                "Pause",
                {
                    label: null,
                    src: "./images/pause.png",
                    alt: "pause.png"
                }
            ]
        ]
    ),

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
                    gridBlock: true,
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
                    text: "перемещение",
                },
                description: "перемещение корабля игрока на карте"
            },
            {
                name: "shootBtnsArray",
                btns: [
                    "Space",
                    "Numpad5",
                    "Numpad0",
                ],
                tooltip: {
                    keyboardsBlockClass: "keyboardsBlockFlexColumn",
                    gridBlock: false,
                    keyboards: [
                        {
                            units: [
                                this.btnsSrc.get("Numpad0")
                            ]
                        },
                        {
                            units: [
                                this.btnsSrc.get("Space")
                            ]
                        }
                    ],
                    text: "выстрел",
                },
                description: "выстрел"
            },
            {
                name: "useSuperAbilityBtn",
                btns: [
                    "ControlLeft"
                ],
                tooltip: {
                    keyboardsBlockClass: "keyboardsBlockFlexColumn",
                    gridBlock: false,
                    keyboards: [
                        {
                            units: [
                                this.btnsSrc.get("ControlLeft")
                            ]
                        }
                    ],
                    text: "суперспособность",
                },
                description: "использовать суперспособность"
            },
            {
                name: "useBombBtn",
                btns: [
                    "ControlRight"
                ],
                tooltip: {
                    keyboardsBlockClass: "keyboardsBlockFlexColumn",
                    gridBlock: false,
                    keyboards: [
                        {
                            units: [
                                this.btnsSrc.get("ControlRight")
                            ]
                        }
                    ],
                    text: "использовать бомбу",
                },
                description: "использовать бомбу"
            },
            {
                name: "pauseBtnsArray",
                btns: [
                    "Escape",
                    "Pause"
                ],
                tooltip: {
                    keyboardsBlockClass: "keyboardsBlockFlex",
                    gridBlock: false,
                    keyboards: [
                        {
                            units: [
                                this.btnsSrc.get("Escape")
                            ]
                        },
                        {
                            units: [
                                this.btnsSrc.get("Pause")
                            ]
                        }
                    ],
                    text: "остановить игру",
                },
                description: "вызов меню паузы"
            },
            {
                name: "showCheatConsoleBtn",
                btns: [
                    "Backquote"
                ],
                tooltip: null,
                description: "вызов меню ввода читов"
            },
            {
                name: "showDebugPanelBtn",
                btns: [
                    "Slash"
                ],
                tooltip: null,
                description: "вызов дебаг-панели"
            }
        ];
    }
}