import { onTab, onBackspace, onEnter } from "./ListUtils";

const ListKeyboardShortcut = (event, editor, next) => {
    switch (event.key) {
        case "Tab":
            return onTab(event, editor, next);
        case "Backspace":
            return onBackspace(event, editor, next);
        case "Enter": {
            return onEnter(event, editor, next);
        }
    }

    next();
};

export default ListKeyboardShortcut;
