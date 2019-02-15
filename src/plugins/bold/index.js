import BoldMark from "./BoldMark";
import BoldButton from "./BoldButton";
import { applyMarkStrategy } from "../../helper/strategy";
import { isMod } from "../../helper/keyboard-event";
import bold from "../markdown/match/bold";

/* eslint-disable no-unused-vars */
const BoldPlugin = options => {
    return {
        onKeyDown(event, editor, next) {
            if (!isMod(event) || event.key != "b") return next();
            event.preventDefault();
            applyMarkStrategy(editor, "b");
        }
    };
};

export { BoldPlugin, BoldMark, BoldButton };
