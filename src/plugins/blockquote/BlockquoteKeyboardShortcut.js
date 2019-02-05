/* eslint-disable react/prop-types */
import { isMod } from "../../helper/keyboard-event";
import { applyBlockquote } from "./BlockquoteUtils";
import { hasBlock } from "../../helper/strategy";

const BlockquoteKeyboardShortcut = (event, editor, next) => {
    if (isMod(event) && event.key === "/") {
        const type = "block-quote";
        const isActive = hasBlock(editor.value, type);
        return applyBlockquote(editor, isActive ? "paragraph" : type);
    }
    return next();
};

export default BlockquoteKeyboardShortcut;
