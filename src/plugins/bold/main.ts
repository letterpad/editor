import { applyMarkStrategy } from "../../helper/strategy";
import { isMod } from "../../helper/keyboard-event";
import { PluginConfig } from "..";
import { isKeyboardEvent } from "../../helper/events";

/* eslint-disable no-unused-vars */
export const BoldPlugin: PluginConfig["main"] = () => {
  return {
    onKeyDown(event, editor, next) {
      if (isKeyboardEvent(event)) {
        if (!isMod(event) || event.key != "b") return next();
        event.preventDefault();
        applyMarkStrategy(editor, "b");
      }
    }
  };
};
