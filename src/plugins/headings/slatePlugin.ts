import HeadingsKeyboardShortcut from "./HeadingsKeyboardShortcut";
import { hasBlock } from "../../helper/strategy";
import { PluginConfig } from "..";
import { isKeyboardEvent } from "../../helper/events";

const types = ["h1", "h2", "h3", "h4", "h5"];

const HeadingsPlugin: PluginConfig["slatePlugin"] = () => ({
  onKeyDown(event, editor, next) {
    if (!isKeyboardEvent(event)) return;
    if (event.key === "Enter") {
      var a = editor.value.blocks.first();
      if (!a) return next();
      const { type } = a.toJS();
      if (types.indexOf(type) >= 0) {
        let isActive = hasBlock(editor.value, type);
        if (isActive) {
          event.preventDefault();
          return editor.splitBlock(1).setBlocks("p");
        }
      }
    }

    return HeadingsKeyboardShortcut(event, editor, next);
  }
});

export { HeadingsPlugin };
