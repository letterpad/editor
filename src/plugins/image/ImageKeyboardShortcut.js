// import { keyboardEvent } from "@slate-editor/utils";
import { forceClickUploadButton } from "./ImageUtils";
import { isMod } from "../../helper/keyboard-event";

const ImageKeyboardShortcut = (event, editor, next) => {
    if (isMod(event) && event.shiftKey && event.key === "i") {
        return forceClickUploadButton(editor, next);
    }
    return;
};

export default ImageKeyboardShortcut;
