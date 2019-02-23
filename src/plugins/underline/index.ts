import { applyMarkStrategy } from "../../helper/strategy";
import { isMod } from "../../helper/keyboard-event";
import { MARK_TAGS } from "../../helper/constants";
import { PluginConfig } from "..";

/* eslint-disable no-unused-vars */
export const UnderlinePlugin: PluginConfig["main"] = () => {
  return {
    onKeyDown(event, editor, next) {
      if (!isMod(event) || event.key != "u") return next();
      event.preventDefault();
      applyMarkStrategy(editor, MARK_TAGS.u);
    }
  };
};
