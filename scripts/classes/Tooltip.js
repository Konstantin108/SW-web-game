import {renderer} from "../objects/renderer.js";
import {tooltipController} from "../controllers/tooltipController.js";
import {config} from "../config/config.js";

export class Tooltip {
    constructor(data) {
        this.data = data;
    }

    show(animation) {
        if (config[`tip_${this.data.name}Shown`]) return;
        renderer.renderTooltip(this.data, animation);
        config[`tip_${this.data.name}Shown`] = true;
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
        }, 500);
    }
}