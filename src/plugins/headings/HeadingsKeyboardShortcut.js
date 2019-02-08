import { isMod } from "../../helper/keyboard-event";
import { hasBlock } from "../../helper/strategy";
import { applyHeadings } from "./HeadingsUtils";

// @todo Add keyboard shortcut for headings. Maybe Ctrl + [1-6] ?
const HeadingsKeyboardShortcut = (event, editor, next) => {
    if (!isMod(event)) return next();
    let type = "";

    if (event.key === "1") {
        event.preventDefault();
        type = "heading-one";
    }
    if (event.key === "2") {
        event.preventDefault();
        type = "heading-two";
    }
    if (event.key === "3") {
        event.preventDefault();
        type = "heading-three";
    }
    if (event.key === "4") {
        event.preventDefault();
        type = "heading-four";
    }
    if (event.key === "5") {
        event.preventDefault();
        type = "heading-five";
    }
    if (type === "") {
        return next();
    }

    const isActive = hasBlock(editor.value, type);
    const blockToApply = isActive ? "paragraph" : type;
    return applyHeadings(editor, blockToApply);
};

export default HeadingsKeyboardShortcut;
