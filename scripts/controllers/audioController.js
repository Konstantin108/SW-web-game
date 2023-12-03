import {config} from "../config/config.js";
import {renderer} from "../objects/renderer.js";
import {pause} from "../objects/pause.js";
import {helperController} from "./helperController.js";

export const audioController = {
    sounds: config.sounds,
    mainSoundThemes: config.soundSources.mainSoundThemes,
    path: "../../src/sounds/",
    mainSoundThemeAudio: null,
    sourceIndex: null,
    soundIsPlaying: false,

    // когда игра закончилась - музыка выключается, возможно включать новый трэк (разный для победы или проигрыша)
    // в главном меню будет своя музыкальная тема (возможно один короткий зацикленный трэк)
    // возможно после добавления главного меню музыку можно будет запускать сразу после старта игры

    init(getRandomSource = false) {
        let source = null;
        let sourcePath = "";

        if (getRandomSource) {
            source = helperController.getRandomElementAndIndexInArray(this.mainSoundThemes);
            sourcePath = this.path + source.element;
            this.sourceIndex = source.index;
            this.mainSoundThemeAudio = new Audio(sourcePath);
        } else {
            this.sourceIndex >= this.mainSoundThemes.length - 1 ? this.sourceIndex = 0 : this.sourceIndex += 1;
            sourcePath = this.path + this.mainSoundThemes[this.sourceIndex];
            this.mainSoundThemeAudio = new Audio(sourcePath);
            this.play();
        }
        this.mainSoundThemeAudio.onended = () => this.init();
    },

    play() {
        let promise = this.mainSoundThemeAudio.play();
        promise.then(() => {
            this.soundIsPlaying = true;
        }).catch(error => console.log(error));
    },

    soundOnOrOffClickHandler() {
        let audioControlBtn = document.querySelector("#audioControlBtn");
        if (audioControlBtn) audioControlBtn.addEventListener("click", () => this.soundOnOrOff());
    },

    soundOnOrOff(soundStatus = null) {
        let action = null;

        if (soundStatus === null) {
            this.sounds = !this.sounds;
            action = this.sounds;
        } else {
            action = soundStatus;
        }

        if (action && this.sounds && !pause.soundsMute) {
            this.play();
        } else {
            this.mainSoundThemeAudio.pause();
            this.soundIsPlaying = false;
        }
        renderer.renderAudioControlBtnTemplatePrint();
    }
}