import YoutubeNode from "./YoutubeNode";
import { applyYoutube } from "./YoutubeUtils";
import YoutubeButton from "./YoutubeButton";
import { isMod } from "../../helper/keyboard-event";
import { hasBlock } from "../../helper/strategy";

/* eslint-disable no-unused-vars */
const YoutubePlugin = options => ({
    onKeyDown(event, editor, next) {
        const type = "Youtube";
        if (isMod(event) && event.key === "/") {
            const isActive = hasBlock(editor.value, type);
            return applyYoutube(editor, isActive ? "paragraph" : type);
        } else if (event.key === "Enter") {
            const isActive = hasBlock(editor.value, type);
            if (isActive) {
                event.preventDefault();
                return editor.splitBlock().setBlocks("paragraph");
            }
        }
        return next();
    }
});

export { YoutubePlugin, YoutubeNode, YoutubeButton };
