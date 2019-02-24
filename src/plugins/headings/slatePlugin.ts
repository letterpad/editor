import HeadingsKeyboardShortcut from "./HeadingsKeyboardShortcut";
import { hasBlock } from "../../helper/strategy";
import { PluginConfig } from "..";
import { isKeyboardEvent } from "../../helper/events";

const types = ["h1", "h1", "h3", "h4", "h5"];

const HeadingsPlugin: PluginConfig["slatePlugin"] = () => ({
  onKeyDown(event, editor, next) {
    if (!isKeyboardEvent(event)) return;
    if (event.key === "Enter") {
      var a = editor.value.blocks.get(0);
      const { type } = a.toJS();
      if (types.indexOf(type) >= 0) {
        let isActive = hasBlock(editor.value, type);
        if (isActive) {
          event.preventDefault();
          return editor.splitBlock(1).setBlocks("paragraph");
        }
      }
    }

    return HeadingsKeyboardShortcut(event, editor, next);
  }
});

export { HeadingsPlugin };
