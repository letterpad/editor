import { PluginConfig } from "..";
import ListKeyboardShortcut from "./ListKeyboardShortcut";
import { isKeyboardEvent } from "../../helper/events";

const ListPlugin: PluginConfig["main"] = () => {
  return {
    onKeyDown(event, editor, next) {
      if (isKeyboardEvent(event)) {
        return ListKeyboardShortcut(event, editor, next);
      }
    }
  };
};

export { ListPlugin };
