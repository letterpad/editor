import { hasBlock } from "../../helper/strategy";
import { PluginConfig } from "..";
import { isKeyboardEvent } from "../../helper/events";

const AudioPlugin: PluginConfig["slatePlugin"] = () => ({
  onKeyDown(event, editor, next) {
    const type = "audio";
    if (isKeyboardEvent(event) && event.key === "Enter") {
      const isActive = hasBlock(editor.value, type);
      if (isActive) {
        event.preventDefault();
        return editor.splitBlock(1).setBlocks("paragraph");
      }
    }
    return next();
  }
});

export { AudioPlugin };
