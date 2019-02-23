import { applyMarkStrategy } from "../../helper/strategy";
import { isMod } from "../../helper/keyboard-event";
import { MARK_TAGS } from "../../helper/constants";
import { PluginConfig } from "..";

export const ItalicPlugin: PluginConfig["main"] = () => {
  return {
    onKeyDown(event, editor, next) {
      if (!isMod(event) || event.key != "i") return next();
      event.preventDefault();
      applyMarkStrategy(editor, MARK_TAGS.em);
    }
  };
};
