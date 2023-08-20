import {config} from "../config/config.js";
import {renderer} from "./renderer.js";

export const debugPanel = {
    debugMode: null,

    debugModeStatusInit() {
        this.debugMode = config.debugMode;
    },

    callDebugPanel() {
        let showDebugPanelBtn = "Slash";
        let playerCanCallDebugPanel = true;

        document.addEventListener("keydown", function (event) {
            if (!debugPanel.debugMode) return;
            if (!playerCanCallDebugPanel) return;
            if (showDebugPanelBtn !== event.code) return;
            playerCanCallDebugPanel = false;
            renderer.renderDebugPanel();
            setTimeout(() => playerCanCallDebugPanel = true, 500);
        });
    }
}