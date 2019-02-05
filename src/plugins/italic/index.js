import ItalicMark from "./ItalicMark";
import ItalicButton from "./ItalicButton";
import { applyMarkStrategy } from "../../helper/strategy";
import { isMod } from "../../helper/keyboard-event";
import { MARK_TAGS } from "../../helper/constants";

/* eslint-disable no-unused-vars */
const ItalicPlugin = options => {
    return {
        onKeyDown(event, editor, next) {
            if (!isMod(event) || event.key != "i") return next();
            event.preventDefault();
            applyMarkStrategy(editor, MARK_TAGS.em);
        }
    };
};

export { ItalicPlugin, ItalicMark, ItalicButton };
