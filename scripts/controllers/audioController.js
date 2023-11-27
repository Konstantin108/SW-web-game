import {config} from "../config/config.js";
import {renderer} from "../objects/renderer.js";
import {pause} from "../objects/pause.js";

export const audioController = {
    sounds: config.sounds,
    mainSoundThemeAudio: new Audio("../../src/sounds/30-seconds-to-mars-ill-attack.mp3"),
    soundIsPlaying: false,

    // грузятся 3 трэка один за другим, затем воспроизводятся зацикленно
    // можно ли склеить 3 трэка в один?
    // когда игра закончилась - музыка выключается, возможно включать новый трэк (разный для победы или проигрыша)
    // в главном меню будет своя музыкальная тема (возможно один короткий зацикленный трэк)

    // возможно после добавления главного меню музыку можно будет запускать сразу после старта игры

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
            let promise = this.mainSoundThemeAudio.play();
            promise.then(() => {
                this.soundIsPlaying = true;
            }).catch(error => console.log(error));
        } else {
            this.mainSoundThemeAudio.pause();
            this.soundIsPlaying = false;
        }
        renderer.renderAudioControlBtnTemplatePrint();
    }
}