import { PluginConfig } from "..";
import ListKeyboardShortcut from "./ListKeyboardShortcut";
import { Editor } from "slate";

const ListPlugin: PluginConfig["main"] = () => {
  return {
    onKeyDown(event: KeyboardEvent, editor: Editor, next: () => {}) {
      return ListKeyboardShortcut(event, editor, next);
    }
  };
};

export { ListPlugin };
