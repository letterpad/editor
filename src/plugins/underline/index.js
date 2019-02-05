import UnderlineMark from "./UnderlineMark";
import UnderlineButton from "./UnderlineButton";
import { applyMarkStrategy } from "../../helper/strategy";
import { isMod } from "../../helper/keyboard-event";
import { MARK_TAGS } from "../../helper/constants";

/* eslint-disable no-unused-vars */
const UnderlinePlugin = options => {
    return {
        onKeyDown(event, editor, next) {
            if (!isMod(event) || event.key != "u") return next();
            event.preventDefault();
            applyMarkStrategy(editor, MARK_TAGS.u);
        }
    };
};

export { UnderlinePlugin, UnderlineMark, UnderlineButton };
