import { PluginConfig } from "..";
import YoutubeNode from "./YoutubeNode";
import { applyYoutube } from "./YoutubeUtils";
import YoutubeButton from "./YoutubeButton";
import { hasBlock } from "../../helper/strategy";
import { Editor } from "slate-react";
import { isKeyboardEvent } from "../../helper/events";

export const YoutubePlugin: PluginConfig["main"] = () => {
  return {
    onKeyDown(event: KeyboardEvent, editor: Editor, next: () => {}) {
      if (isKeyboardEvent(event)) {
        const type = "Youtube";
        if (event.key === "Enter") {
          const isActive = hasBlock(editor.value, type);
          if (isActive) {
            event.preventDefault();
            return editor.splitBlock(1).setBlocks("paragraph");
          }
        }
      }
      return next();
    }
  };
};
