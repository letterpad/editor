import {
    insertNewLineBeforeCodeBlock,
    deleteNewLineBeforeCodeBlock,
    isPrintableKeycode,
    preserveIndentationForCodeBlock,
    unindentClosingBlocks,
    handleCommandAInCodeBlock,
    getCodeBlockParent
} from "./CodeblockUtils";
import { isMod } from "../../helper/keyboard-event";

/* eslint-disable react/prop-types */
const codeblockKeyboardShortcut = (event, editor, next) => {
    const { value } = editor;

    if (
        value.selection.isExpanded &&
        !isMod(event) &&
        isPrintableKeycode(event.which)
    ) {
        editor.delete();
        return next();
    }

    if (!getCodeBlockParent(value)) return next();

    switch (event.key) {
        case "Enter":
            if (value.startOffset === 0) {
                const done = insertNewLineBeforeCodeBlock(editor);
                if (done) return next();
            }
            return preserveIndentationForCodeBlock(editor);

        case "Backspace":
            if (value.startOffset === 0) {
                return deleteNewLineBeforeCodeBlock(editor);
            }
            break;

        case "Tab":
            event.preventDefault();
            // insert 2 spaces
            editor.insertText("  ");
            return next();

        case "a":
            return handleCommandAInCodeBlock(event, editor);

        case "}":
        case ")":
        case "]":
            return unindentClosingBlocks(editor);

        default:
            return next();
    }
};

export default codeblockKeyboardShortcut;
