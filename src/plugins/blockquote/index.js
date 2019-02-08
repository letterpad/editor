import BlockquoteNode from "./BlockquoteNode";
import { applyBlockquote } from "./BlockquoteUtils";
import BlockquoteButton from "./BlockquoteButton";
import { isMod } from "../../helper/keyboard-event";
import { hasBlock } from "../../helper/strategy";

/* eslint-disable no-unused-vars */
const BlockquotePlugin = options => ({
    onKeyDown(event, editor, next) {
        const type = "block-quote";
        if (isMod(event) && event.key === "/") {
            const isActive = hasBlock(editor.value, type);
            return applyBlockquote(editor, isActive ? "paragraph" : type);
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

export { BlockquotePlugin, BlockquoteNode, BlockquoteButton };
