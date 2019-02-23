import { applyBlockquote } from "./BlockquoteUtils";
import { isMod } from "../../helper/keyboard-event";
import { hasBlock } from "../../helper/strategy";
import { PluginConfig } from "..";
import { isKeyboardEvent } from "../../helper/events";

/* eslint-disable no-unused-vars */
const BlockquotePlugin: PluginConfig["slatePlugin"] = () => ({
  onKeyDown(event, editor, next) {
    const type = "blockquote";
    if (!isKeyboardEvent(event)) return;
    if (isMod(event) && event.key === "/") {
      const isActive = hasBlock(editor.value, type);
      return applyBlockquote(editor, isActive ? "paragraph" : type);
    } else if (event.key === "Enter") {
      const isActive = hasBlock(editor.value, type);
      if (isActive) {
        event.preventDefault();
        return editor.splitBlock(1).setBlocks("paragraph");
      }
    }
    return next();
  }
});

export { BlockquotePlugin };
