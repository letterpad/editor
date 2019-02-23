import { hasBlock } from "../../helper/strategy";
import { PluginConfig } from "..";
import { isKeyboardEvent } from "../../helper/events";
import { Editor } from "slate-react";

const AudioPlugin: PluginConfig["main"] = () => ({
  onKeyDown(event: KeyboardEvent, editor: Editor, next: () => any) {
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
