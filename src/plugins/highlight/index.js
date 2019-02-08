import HighlightMark from "./HighlightMark";
import HighlightButton from "./HighlightButton";
import { applyMarkStrategy } from "../../helper/strategy";
import { isMod } from "../../helper/keyboard-event";

/* eslint-disable no-unused-vars */
const HighlightPlugin = options => ({
    onKeyDown(event, editor, next) {
        if (!isMod(event) || event.key != "m") return next();
        event.preventDefault();
        applyMarkStrategy(editor, "highlight");
    }
});

export { HighlightPlugin, HighlightMark, HighlightButton };
