import {config} from "../config/config.js";
import {renderer} from "../objects/renderer.js";
import {pause} from "../objects/pause.js";
import {helperController} from "./helperController.js";

export const audioController = {
    sounds: config.sounds,
    mainSoundThemes: config.soundSources.mainSoundThemes,
    soundEffects: config.soundSources.soundEffects,
    path: "/game/src/sounds/",
    mainSoundThemeAudio: null,
    sourceIndex: null,

    // в главном меню будет своя музыкальная тема (возможно один короткий зацикленный трэк)
    // возможно после добавления главного меню музыку можно будет запускать сразу после старта игры

    init(getRandomSource = false) {
        let source = null;
        let sourcePath = "";

        if (getRandomSource) {
            source = helperController.getRandomElementAndIndexInArray(this.mainSoundThemes.sources);
            sourcePath = this.path + source.element;
            this.sourceIndex = source.index;
            this.mainSoundThemeAudio = new Audio(sourcePath);
            this.mainSoundThemeAudio.volume = this.mainSoundThemes.volume;
        } else {
            this.sourceIndex >= this.mainSoundThemes.sources.length - 1 ? this.sourceIndex = 0 : this.sourceIndex += 1;
            sourcePath = this.path + this.mainSoundThemes.sources[this.sourceIndex];
            this.mainSoundThemeAudio = new Audio(sourcePath);
            this.mainSoundThemeAudio.volume = this.mainSoundThemes.volume;
            this.play(this.mainSoundThemeAudio);
        }
        this.mainSoundThemeAudio.onended = () => this.init();
    },

    soundOnOrOffClickHandler() {
        let audioControlBtn = document.querySelector("#audioControlBtn");
        if (audioControlBtn) audioControlBtn.addEventListener("click", () => {
            this.soundOnOrOff();
            this.playSoundEffect("roundBtn");
        });
    },

    soundOnOrOff(soundStatus = null) {
        let action = null;

        if (soundStatus === null) {
            this.sounds = !this.sounds;
            action = this.sounds;
        } else {
            action = soundStatus;
        }

        action && this.sounds && !pause.soundsMute ? this.play(this.mainSoundThemeAudio) : this.mainSoundThemeAudio.pause();
        renderer.renderAudioControlBtnTemplatePrint();
    },

    play(audio) {
        let promise = audio.play();
        promise.then().catch(error => console.log(error));
    },

    playSoundEffect(key) {
        if (!this.sounds) return;
        let sourcePath = this.path + this.soundEffects.sources[key];
        let soundEffect = new Audio(sourcePath);
        soundEffect.volume = this.soundEffects.volume;
        this.play(soundEffect);
    }
}