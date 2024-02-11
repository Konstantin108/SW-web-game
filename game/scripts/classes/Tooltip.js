import {renderer} from "../objects/renderer.js";
import {tooltipController} from "../controllers/tooltipController.js";
import {config} from "../config/config.js";
import {helperController} from "../controllers/helperController.js";
import {audioController} from "../controllers/audioController.js";

export class Tooltip {
    constructor(data) {
        this.data = data;
    }

    show(animation, colorChange = false) {
        if (!colorChange) {
            if (config[`tip_${this.data.name}Shown`]) return;
        }

        let mobileMode = false;
        if (helperController.isMobileDeviceCheck()) {
            if (!this.data.tooltipMobileMode) return;
            mobileMode = true;
            renderer.renderBlockForTooltipsInMobilModeTemplatePrint();
        }
        renderer.renderTooltip(this.data, animation, mobileMode);
        config[`tip_${this.data.name}Shown`] = true;
        audioController.playSoundEffect("tooltip");
    }

    destroy() {
        let tooltipsArray = tooltipController.tooltipsArray;

        renderer.hideTooltip(this);
        setTimeout(() => {
            for (let i = 0; i <= tooltipsArray.length; i++) {
                if (tooltipsArray[i]) {
                    if (tooltipsArray[i].data.name === this.data.name) tooltipController.tooltipsArray.splice(i, 1);
                }
            }
            if (this.data.canShowAgain) config[`tip_${this.data.name}Shown`] = false;
        }, 500);
    }
}