import { onSpace } from "./MarkdownUtils";
import { onBackspace, onEnter } from "../list/ListUtils";

const MarkdownKeyboardShortcut = (event, editor, next) => {
    switch (event.key) {
        case " ":
            return onSpace(event, editor, next);
        case "Backspace":
            return onBackspace(event, editor, next);
        case "Enter": {
            return onEnter(event, editor, next);
        }
    }

    return next();
};

export default MarkdownKeyboardShortcut;
