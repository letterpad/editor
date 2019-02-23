import { PluginConfig } from "./../index";
import ListKeyboardShortcut from "./ListKeyboardShortcut";

export const ListPlugin: PluginConfig["main"] = () => {
  return {
    onKeyDown(...args) {
      return ListKeyboardShortcut(...args);
    }
  };
};
