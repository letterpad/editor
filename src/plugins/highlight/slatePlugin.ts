import { applyMarkStrategy } from "../../helper/strategy";
import { isMod } from "../../helper/keyboard-event";
import { PluginConfig } from "..";
import { isKeyboardEvent } from "../../helper/events";

/* eslint-disable no-unused-vars */
const HighlightPlugin: PluginConfig["slatePlugin"] = () => ({
  onKeyDown(event, editor, next) {
    if (!isKeyboardEvent(event)) return next();
    if (!isMod(event) || event.key != "m") return next();
    event.preventDefault();
    applyMarkStrategy(editor, "highlight");
  }
});

export { HighlightPlugin };
