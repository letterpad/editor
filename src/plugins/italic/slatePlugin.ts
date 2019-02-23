import { applyMarkStrategy } from "../../helper/strategy";
import { isMod } from "../../helper/keyboard-event";
import { PluginConfig } from "..";
import { isKeyboardEvent } from "../../helper/events";

/* eslint-disable no-unused-vars */
export const ItalicPlugin: PluginConfig["main"] = () => {
  return {
    onKeyDown(event, editor, next) {
      if (isKeyboardEvent(event)) {
        if (!isMod(event) || event.key != "em") return next();
        event.preventDefault();
        applyMarkStrategy(editor, "em");
      }
    }
  };
};
