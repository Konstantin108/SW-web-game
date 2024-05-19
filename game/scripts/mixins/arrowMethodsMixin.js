import {config} from "../config/config.js";
import {debugPanel} from "../objects/debugPanel.js";

export const arrowMethodsMixin = {
    arrowMove(arrowsArray, debugElementName, debugParamName, force) {
        if (!arrowsArray.length) return;
        arrowsArray.forEach(arrow => {
            if (arrow) arrow.makeStep(force);
        });
        if (config[debugParamName]) {
            debugPanel.objectsInfoShow(debugElementName, arrowsArray, true);
        }
    },

    arrowStop(arrowsArray) {
        if (arrowsArray.length) {
            arrowsArray.forEach(arrow => {
                if (arrow) arrow.removeObjectTimers();
            });
        }
    }
}