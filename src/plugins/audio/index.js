import AudioNode from "./AudioNode";
import { applyAudio } from "./AudioUtils";
import AudioButton from "./AudioButton";
import { isMod } from "../../helper/keyboard-event";
import { hasBlock } from "../../helper/strategy";

/* eslint-disable no-unused-vars */
const AudioPlugin = options => ({
    onKeyDown(event, editor, next) {
        const type = "audio";
        if (isMod(event) && event.key === "/") {
            const isActive = hasBlock(editor.value, type);
            return applyAudio(editor, isActive ? "paragraph" : type);
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

export { AudioPlugin, AudioNode, AudioButton };
