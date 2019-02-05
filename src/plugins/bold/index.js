import BoldMark from "./BoldMark";
import BoldButton from "./BoldButton";
import { applyMarkStrategy } from "../../helper/strategy";
import { isMod } from "../../helper/keyboard-event";
import { MARK_TAGS } from "../../helper/constants";

/* eslint-disable no-unused-vars */
const BoldPlugin = options => {
    return {
        onKeyDown(event, editor, next) {
            if (!isMod(event) || event.key != "b") return next();
            event.preventDefault();
            applyMarkStrategy(editor, MARK_TAGS.strong);
        }
    };
};

export { BoldPlugin, BoldMark, BoldButton };
