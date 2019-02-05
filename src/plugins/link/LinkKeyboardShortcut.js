/* eslint-disable react/prop-types */
import { isMod } from "../../helper/keyboard-event";
import { insertLinkStrategy } from "./LinkUtils";

const LinkKeyboardShortcut = (event, editor, next) => {
    if (isMod(event) && event.key === "k") return insertLinkStrategy(editor);
    return next();
};

export default LinkKeyboardShortcut;
